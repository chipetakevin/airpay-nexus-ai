
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AdminFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  adminRole: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  branchCode: string;
  rememberPassword: boolean;
  agreeTerms: boolean;
  twoFactorAuth: boolean;
}

export const useAdminRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<AdminFormData>({
    firstName: 'Kevin',
    lastName: 'Chipeta',
    email: 'chipetakevin@gmail.com',
    phoneNumber: '',
    countryCode: '+27',
    adminRole: 'Super Administrator',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    branchCode: '',
    rememberPassword: true,
    agreeTerms: false,
    twoFactorAuth: true
  });

  const [errors, setErrors] = useState<any>({});

  // Auto-save functionality
  useEffect(() => {
    const savedData = localStorage.getItem('adminRegistrationDraft');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({
          ...prev,
          ...parsedData,
          rememberPassword: true
        }));
      } catch (error) {
        console.log('Failed to load saved registration data');
      }
    }
  }, []);

  // Auto-save on form changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('adminRegistrationDraft', JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  // Auto-fill functionality
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      phoneNumber: '0123456789',
    }));
  }, []);

  const handleInputChange = (field: keyof AdminFormData, value: any) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      rememberPassword: true
    }));
    
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  };

  const handleBankSelect = (bankName: string, routing: string, branchCode: string) => {
    setFormData(prev => ({ 
      ...prev, 
      bankName, 
      routingNumber: routing,
      branchCode 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: any = {};
    
    const allowedEmails = ['chipetakevin@gmail.com', 'admin@myonecard.ai'];
    if (!allowedEmails.includes(formData.email)) {
      newErrors.email = 'Unauthorized email. Only approved admin emails are allowed.';
    }
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.bankName) newErrors.bankName = 'Bank selection is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const adminId = 'ADM' + Math.random().toString(36).substr(2, 8).toUpperCase();
      
      const adminData = {
        ...formData,
        adminId,
        registeredPhone: `${formData.countryCode}${formData.phoneNumber}`,
        cardType: 'onecard@myonecard.ai Platinum',
        accessLevel: 'Full System Access',
        cashbackBalance: 0,
        totalCustomers: 0,
        totalVendors: 0,
        systemCommission: 5.00,
        rememberPassword: true
      };

      localStorage.setItem('onecardAdmin', JSON.stringify(adminData));
      
      localStorage.setItem('userCredentials', JSON.stringify({
        email: formData.email,
        phone: `${formData.countryCode}${formData.phoneNumber}`,
        rememberPassword: true,
        userType: 'admin'
      }));

      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('adminAuthenticated', 'true');
      sessionStorage.setItem('userAuth', JSON.stringify({
        userId: adminId,
        cardNumber: adminId,
        userName: `${formData.firstName} ${formData.lastName}`,
        accountType: 'Administrator',
        accessLevel: 'Full System Access',
        authVerified: true,
        timestamp: new Date().toISOString()
      }));
      
      localStorage.removeItem('adminRegistrationDraft');

      toast({
        title: "Admin Registration Successful! 🔑",
        description: `onecard@myonecard.ai Platinum created: ****${adminId.slice(-4)}. Redirecting to Smart Deals now!`,
      });

      // Direct redirect to Smart Deals tab - fastest shopping experience
      window.location.replace('/portal?tab=onecard&verified=true');
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleBankSelect,
    handleSubmit
  };
};
