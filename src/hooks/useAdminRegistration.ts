
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useEnhancedAuth } from './useEnhancedAuth';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { usePermanentFormStorage } from './usePermanentFormStorage';
import { validateSouthAfricanBankAccount } from '@/utils/bankingValidation';

interface AdminFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  bankName: string;
  branchCode: string;
  accountNumber: string;
  routingNumber: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  department?: string;
}

export const useAdminRegistration = () => {
  const [formData, setFormData] = useState<AdminFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+27',
    bankName: '',
    branchCode: '',
    accountNumber: '',
    routingNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    department: 'System Administration'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AdminFormData, string>>>({});
  const { toast } = useToast();
  const { createPersistentSession } = useEnhancedAuth();
  const { validateSouthAfricanMobile } = usePhoneValidation();
  const { savePermanently, loadPermanentData, autoSave, autoFillForm } = usePermanentFormStorage('admin');

  // Enhanced initialization with auto-fill
  useEffect(() => {
    const initializeForm = () => {
      try {
        const savedData = loadPermanentData();
        if (savedData && Object.keys(savedData).length > 0) {
          console.log('🔄 Auto-filling admin form with saved data...', savedData);
          
          // Merge saved data with current form data
          setFormData(prev => ({
            ...prev,
            ...savedData
          }));
          
          toast({
            title: "📝 Admin Form Auto-Filled!",
            description: "Your previously saved admin information has been restored.",
            duration: 3000
          });
        } else {
          console.log('ℹ️ No saved admin data found - starting with clean form');
        }
      } catch (error) {
        console.error('Error initializing admin form:', error);
      }
    };

    initializeForm();
  }, []); // Only run once on mount

  const handleInputChange = (field: keyof AdminFormData, value: any) => {
    const updatedFormData = {
      ...formData,
      [field]: value
    };
    
    setFormData(updatedFormData);
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }

    // Enhanced auto-save with optimized debouncing
    autoSave(updatedFormData, 800);
  };

  const handleBankSelect = (bankName: string, routing: string, branchCode: string) => {
    handleInputChange('bankName', bankName);
    handleInputChange('branchCode', branchCode);
    handleInputChange('routingNumber', routing);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AdminFormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else {
      const phoneValidation = validateSouthAfricanMobile(formData.phoneNumber);
      if (!phoneValidation.isValid) {
        newErrors.phoneNumber = phoneValidation.error || 'Invalid South African mobile number';
      }
    }

    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) newErrors.agreeTerms = 'Terms acceptance is required';

    if (formData.accountNumber) {
      const bankValidation = validateSouthAfricanBankAccount(formData.accountNumber);
      if (!bankValidation.isValid) {
        newErrors.accountNumber = bankValidation.error || 'Invalid bank account number';
      }
    }

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
      const adminId = `ADM${Math.random().toString().substr(2, 6)}`;
      
      const normalizedPhone = formData.phoneNumber.replace(/\D/g, '');
      let finalPhone = normalizedPhone;
      
      if (normalizedPhone.startsWith('27')) {
        finalPhone = normalizedPhone.substring(2);
      } else if (normalizedPhone.startsWith('0')) {
        finalPhone = normalizedPhone.substring(1);
      }
      
      // Create user credentials with 15-day session for admin
      const userCredentials = {
        email: formData.email,
        password: formData.password,
        userType: 'admin',
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: finalPhone,
        registeredPhone: `+27${finalPhone}`,
        phoneNumber: finalPhone
      };

      const adminData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        adminId,
        phone: finalPhone,
        registeredPhone: `+27${finalPhone}`,
        phoneNumber: finalPhone,
        department: formData.department,
        bankName: formData.bankName,
        branchCode: formData.branchCode,
        accountNumber: formData.accountNumber,
        registrationDate: new Date().toISOString()
      };

      // Create 15-day admin session using enhanced auth
      createPersistentSession(adminData, userCredentials);
      
      console.log('✅ Admin registration completed with 15-day session expiry');

      
      // Store registration completion flags
      localStorage.setItem('registrationCompleted', 'true');
      localStorage.setItem('adminAuthenticated', 'true');
      
      // Save form data permanently
      await savePermanently(formData);

      // Trigger automatic collapse by dispatching storage event
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'registrationCompleted',
        newValue: 'true'
      }));

      console.log('📋 Registration form will automatically collapse to summary view');

      // Silent success - form will auto-collapse and redirect
      setTimeout(() => {
        window.location.href = '/portal?tab=admin';
      }, 1500);

    } catch (error) {
      console.error('Admin registration error:', error);
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive"
      });
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
