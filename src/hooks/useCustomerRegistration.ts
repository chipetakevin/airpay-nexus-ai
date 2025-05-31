
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { FormData, FormErrors } from '@/types/customerRegistration';
import { validateEmail, validateAccountNumber } from '@/utils/formValidation';

export const useCustomerRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+27',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    branchCode: '',
    rememberPassword: true,
    agreeTerms: false,
    marketingConsent: false
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Auto-save functionality
  useEffect(() => {
    const savedData = localStorage.getItem('customerRegistrationDraft');
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
      localStorage.setItem('customerRegistrationDraft', JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      rememberPassword: true
    }));
    
    // Clear errors when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Real-time validation
    if (field === 'email' && value) {
      if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    }

    if (field === 'accountNumber' && value) {
      if (!validateAccountNumber(value)) {
        setErrors(prev => ({ ...prev, accountNumber: 'Account number must be 8-12 digits' }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: FormErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.bankName) newErrors.bankName = 'Bank selection is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!validateAccountNumber(formData.accountNumber)) newErrors.accountNumber = 'Invalid account number';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Generate unique OneCard account number
      const accountNumber = 'OC' + Math.random().toString(36).substr(2, 8).toUpperCase();
      
      const userData = {
        ...formData,
        cardNumber: accountNumber,
        registeredPhone: `${formData.countryCode}${formData.phoneNumber}`,
        cashbackBalance: 0,
        totalEarned: 0,
        totalSpent: 0,
        rememberPassword: true
      };

      // Store user data
      localStorage.setItem('onecardUser', JSON.stringify(userData));
      
      // Store credentials for authentication
      localStorage.setItem('userCredentials', JSON.stringify({
        email: formData.email,
        phone: `${formData.countryCode}${formData.phoneNumber}`,
        rememberPassword: true,
        userType: 'customer'
      }));

      // Set authentication flags
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.removeItem('customerRegistrationDraft');
      
      toast({
        title: "Registration Successful! 🎉",
        description: `OneCard created: ****${accountNumber.slice(-4)}. Redirecting to Smart Deals now!`,
      });

      // Force redirect to deals tab with timeout to ensure state updates
      setTimeout(() => {
        navigate('/?tab=deals', { replace: true });
        window.location.reload(); // Force refresh to ensure cart displays
      }, 1500);
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit
  };
};
