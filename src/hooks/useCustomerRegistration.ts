
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePersistentAuth } from './usePersistentAuth';
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
    rememberPassword: true, // Fixed: changed from string to boolean
    agreeTerms: false,
    marketingConsent: false,
  });

  const [errors, setErrors] = useState<Partial<CustomerFormData>>({});
  const { toast } = useToast();
  const { createPersistentSession } = usePersistentAuth();

  const handleInputChange = (field: keyof CustomerFormData, value: any) => {
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
    const newErrors: Partial<CustomerFormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
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
      
      // Create user credentials
      const userCredentials = {
        email: formData.email,
        password: 'auto-generated-password',
        userType: 'customer'
      };

      // Create user data
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        cardNumber,
        registeredPhone: `${formData.countryCode}${formData.phoneNumber}`,
        bankName: formData.bankName,
        branchCode: formData.branchCode,
        accountNumber: formData.accountNumber,
        balance: 0,
        registrationDate: new Date().toISOString()
      };

      // Store in localStorage for immediate access
      localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
      localStorage.setItem('onecardUser', JSON.stringify(userData));
      localStorage.setItem('userAuthenticated', 'true');

      // Create persistent 24-hour session
      createPersistentSession(userCredentials, userData);

      toast({
        title: "Registration Successful! 🎉",
        description: "Your OneCard has been created! You'll stay logged in for 24 hours.",
        duration: 4000,
      });

      // Auto redirect to OneCard dashboard
      setTimeout(() => {
        window.location.href = '/portal?tab=onecard';
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
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
