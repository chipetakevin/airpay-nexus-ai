
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePermanentAuth } from './usePermanentAuth';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { usePermanentFormStorage } from './usePermanentFormStorage';
import { usePhoneStorage } from './usePhoneStorage';
import { validateSouthAfricanBankAccount } from '@/utils/bankingValidation';
import { FormData as CustomerFormData } from '@/types/customerRegistration';

export const useCustomerRegistration = () => {
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+27',
    bankName: '',
    branchCode: '',
    accountNumber: '',
    routingNumber: '',
    rememberPassword: true,
    agreeTerms: false,
    marketingConsent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerFormData, string>>>({});
  const { toast } = useToast();
  const { createPermanentSession } = usePermanentAuth();
  const { validateSouthAfricanMobile } = usePhoneValidation();
  const { savePermanently, loadPermanentData, autoSave } = usePermanentFormStorage('customer');
  const { savePhoneNumber, autoFillPhone } = usePhoneStorage();

  // Load saved data on mount
  useState(() => {
    const savedData = loadPermanentData();
    if (savedData) {
      setFormData(prev => ({ ...prev, ...savedData }));
      toast({
        title: "Form Auto-filled! 📝",
        description: "Your previously saved information has been restored.",
        duration: 2000
      });
    } else {
      // Try to auto-fill phone if no saved data
      const autoFilled = autoFillPhone('customer');
      if (autoFilled) {
        setFormData(prev => ({
          ...prev,
          phoneNumber: autoFilled.phoneNumber,
          countryCode: autoFilled.countryCode
        }));
      }
    }
  });

  const handleInputChange = (field: keyof CustomerFormData, value: any) => {
    const updatedFormData = {
      ...formData,
      [field]: value
    };
    
    setFormData(updatedFormData);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }

    // Save phone number when it's updated
    if (field === 'phoneNumber' && value) {
      savePhoneNumber(value, formData.countryCode, 'customer');
    }

    // Auto-save permanently with debouncing
    autoSave(updatedFormData, 1500);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerFormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    
    // Enhanced phone validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else {
      const phoneValidation = validateSouthAfricanMobile(formData.phoneNumber);
      if (!phoneValidation.isValid) {
        newErrors.phoneNumber = phoneValidation.error || 'Invalid South African mobile number';
      }
    }

    // Enhanced banking validation
    if (formData.accountNumber) {
      const bankValidation = validateSouthAfricanBankAccount(formData.accountNumber);
      if (!bankValidation.isValid) {
        newErrors.accountNumber = bankValidation.error || 'Invalid South African bank account number';
      }
    }
    
    if (!formData.agreeTerms) newErrors.agreeTerms = 'Terms acceptance is required';

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
      // Generate card number
      const cardNumber = `OC${Math.random().toString().substr(2, 8)}`;
      
      // Normalize phone number for consistent storage
      const normalizedPhone = formData.phoneNumber.replace(/\D/g, '');
      let finalPhone = normalizedPhone;
      
      if (normalizedPhone.startsWith('27')) {
        finalPhone = normalizedPhone.substring(2);
      } else if (normalizedPhone.startsWith('0')) {
        finalPhone = normalizedPhone.substring(1);
      }
      
      // Create user credentials with permanent session flag
      const userCredentials = {
        email: formData.email,
        password: 'auto-generated-password',
        userType: 'customer',
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: finalPhone,
        registeredPhone: `+27${finalPhone}`,
        phoneNumber: finalPhone,
        permanentSession: true // Flag for permanent session
      };

      // Create user data with consistent phone storage
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        cardNumber,
        phone: finalPhone,
        registeredPhone: `+27${finalPhone}`,
        phoneNumber: finalPhone,
        bankName: formData.bankName,
        branchCode: formData.branchCode,
        accountNumber: formData.accountNumber,
        balance: 0,
        cashbackBalance: 0,
        totalEarned: 0,
        registrationDate: new Date().toISOString()
      };

      // Store permanent session flags
      localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
      localStorage.setItem('onecardUser', JSON.stringify(userData));
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('registrationCompleted', 'true');
      localStorage.setItem('permanentSession', 'true');
      localStorage.setItem('sessionType', 'permanent');

      // Create permanent session that NEVER expires
      createPermanentSession(userCredentials, userData);

      // Save form data permanently
      await savePermanently(formData);

      console.log('✅ Customer registration completed with PERMANENT session - never expires');

      // Trigger automatic collapse by dispatching storage event
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'registrationCompleted',
        newValue: 'true'
      }));

      console.log('📋 Registration form will automatically collapse to summary view');

      // Silent success - no toast, form will auto-collapse and redirect
      setTimeout(() => {
        window.location.href = '/portal?tab=onecard';
      }, 1500);

    } catch (error) {
      console.error('Registration error:', error);
      // Only show error toasts, not success
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
    handleSubmit
  };
};
