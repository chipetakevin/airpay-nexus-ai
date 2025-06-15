
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePersistentAuth } from './usePersistentAuth';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  registeredPhone: string;
  bankName: string;
  branchCode: string;
  accountNumber: string;
  privacyConsent: boolean;
  smsConsent: boolean;
}

export const useCustomerRegistration = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    registeredPhone: '',
    bankName: '',
    branchCode: '',
    accountNumber: '',
    privacyConsent: false,
    smsConsent: false,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { toast } = useToast();
  const { createPersistentSession } = usePersistentAuth();

  const handleInputChange = (field: keyof FormData, value: any) => {
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
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.registeredPhone.trim()) newErrors.registeredPhone = 'Phone number is required';
    if (!formData.privacyConsent) newErrors.privacyConsent = 'Privacy consent is required';

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
        password: formData.password,
        userType: 'customer'
      };

      // Create user data
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        cardNumber,
        registeredPhone: formData.registeredPhone,
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
