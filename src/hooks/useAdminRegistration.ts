import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useOneCardSystem } from './useOneCardSystem';

interface AdminFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  department: string;
  role: string;
  accessLevel: string;
  bankName: string;
  accountNumber: string;
  branchCode: string;
  routingNumber: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  securityClearance: boolean;
}

export const useAdminRegistration = () => {
  const [formData, setFormData] = useState<AdminFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+27',
    department: '',
    role: '',
    accessLevel: '',
    bankName: '',
    accountNumber: '',
    branchCode: '',
    routingNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    securityClearance: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AdminFormData, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { createOneCardAccount } = useOneCardSystem();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (field: keyof AdminFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AdminFormData, string>> = {};

    // Required field validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.accessLevel) newErrors.accessLevel = 'Access level is required';

    // Banking validation (required for admins)
    if (!formData.bankName.trim()) newErrors.bankName = 'Bank selection is required';
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
    if (!formData.branchCode.trim()) newErrors.branchCode = 'Branch code is required';

    // Password validation
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    // Terms validation
    if (!formData.agreeTerms) newErrors.agreeTerms = 'Terms acceptance is required';
    if (!formData.securityClearance) newErrors.securityClearance = 'Security clearance acknowledgment is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check the form for any missing or incorrect information.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Get current user ID
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      // Create OneCard Platinum account for admin
      const oneCardNumber = await createOneCardAccount(userId, 'admin', 'platinum');
      
      console.log('✅ OneCard Platinum created for admin:', oneCardNumber);

      // Create admin credentials with enhanced permissions
      const adminCredentials = {
        email: formData.email,
        password: formData.password,
        userType: 'admin',
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phoneNumber,
        department: formData.department,
        accessLevel: formData.accessLevel,
        permanentSession: true,
        securityClearance: formData.securityClearance
      };

      // Create comprehensive admin data
      const adminData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phoneNumber,
        department: formData.department,
        role: formData.role,
        accessLevel: formData.accessLevel,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        branchCode: formData.branchCode,
        routingNumber: formData.routingNumber,
        oneCardNumber: oneCardNumber,
        oneCardType: 'platinum',
        registrationDate: new Date().toISOString(),
        securityClearance: formData.securityClearance,
        cashbackBalance: 0,
        totalEarned: 0
      };

      // Store admin session flags
      localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));
      localStorage.setItem('adminUser', JSON.stringify(adminData));
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('adminRegistrationCompleted', 'true');
      localStorage.setItem('permanentSession', 'true');
      localStorage.setItem('sessionType', 'permanent');
      localStorage.setItem('userType', 'admin');

      console.log('✅ Admin registration completed with PERMANENT session and Platinum OneCard');

      // Store MVNE-compliant admin registration transaction
      const { error: transactionError } = await supabase
        .from('mvne_compliant_transactions')
        .insert({
          transaction_type: 'admin_registration',
          customer_id: userId,
          amount: 0,
          base_amount: 0,
          status: 'completed',
          transaction_reference: `ADMIN-REG-${Date.now()}`,
          recipient_msisdn: formData.phoneNumber,
          network_provider: 'SYSTEM',
          regulatory_compliance: {
            user_type: 'admin',
            department: formData.department,
            access_level: formData.accessLevel,
            security_clearance: formData.securityClearance,
            registration_timestamp: new Date().toISOString()
          },
          icasa_compliant: true,
          rica_verified: true
        });

      if (transactionError) {
        console.error('Transaction logging error:', transactionError);
      }

      toast({
        title: "Admin Registration Complete! 👑",
        description: "OneCard Platinum account created with admin privileges!",
        duration: 5000
      });

      // Redirect to admin portal
      setTimeout(() => {
        window.location.href = '/portal?tab=admin';
      }, 2000);

      return true;
    } catch (error) {
      console.error('Admin registration error:', error);
      toast({
        title: "Registration Failed",
        description: "Unable to complete admin registration. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    formData,
    errors,
    showPassword,
    togglePasswordVisibility,
    handleInputChange,
    handleSubmit
  };
};