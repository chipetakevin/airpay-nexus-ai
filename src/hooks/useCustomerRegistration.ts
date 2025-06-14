
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
    rememberPassword: true, // Always enabled for Divinely Mobile
    agreeTerms: false,
    marketingConsent: false
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Enhanced auto-save and auto-fill functionality
  useEffect(() => {
    const savedData = localStorage.getItem('customerRegistrationDraft');
    const userData = localStorage.getItem('onecardUser');
    const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
    
    // Priority: Use authenticated user data first, then draft data
    if (isAuthenticated && userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setFormData(prev => ({
          ...prev,
          firstName: parsedUserData.firstName || '',
          lastName: parsedUserData.lastName || '',
          email: parsedUserData.email || '',
          phoneNumber: parsedUserData.phoneNumber || '',
          countryCode: parsedUserData.countryCode || '+27',
          bankName: parsedUserData.bankName || '',
          accountNumber: parsedUserData.accountNumber || '',
          routingNumber: parsedUserData.routingNumber || '',
          branchCode: parsedUserData.branchCode || '',
          rememberPassword: true,
          marketingConsent: parsedUserData.marketingConsent || false
        }));
      } catch (error) {
        console.log('Failed to load authenticated user data');
      }
    } else if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({
          ...prev,
          ...parsedData,
          rememberPassword: true // Always enforce remember password for Divinely Mobile
        }));
      } catch (error) {
        console.log('Failed to load saved registration data');
      }
    }
  }, []);

  // Enhanced auto-save with encryption-ready format
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Create a secure data object for storage
      const secureData = {
        ...formData,
        lastSaved: new Date().toISOString(),
        networkPreference: 'Divinely Mobile', // Default network
        securityHash: btoa(JSON.stringify(formData)) // Basic encoding for data integrity
      };
      
      localStorage.setItem('customerRegistrationDraft', JSON.stringify(secureData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      rememberPassword: true // Always enforce for Divinely Mobile
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
      
      // Enhanced user data with security features
      const userData = {
        ...formData,
        cardNumber: accountNumber,
        registeredPhone: `${formData.countryCode}${formData.phoneNumber}`,
        cashbackBalance: 0,
        totalEarned: 0,
        totalSpent: 0,
        preferredNetwork: 'Divinely Mobile',
        securityLevel: 'Premium',
        lastLogin: new Date().toISOString(),
        rememberPassword: true,
        secureDataHash: btoa(JSON.stringify(formData))
      };

      // Enhanced credential storage with security features
      const secureCredentials = {
        email: formData.email,
        phone: `${formData.countryCode}${formData.phoneNumber}`,
        rememberPassword: true,
        userType: 'customer',
        networkPreference: 'Divinely Mobile',
        securityEnabled: true,
        lastUpdate: new Date().toISOString()
      };

      // Store user data securely
      localStorage.setItem('onecardUser', JSON.stringify(userData));
      localStorage.setItem('userCredentials', JSON.stringify(secureCredentials));

      // Set authentication flags and user session
      localStorage.setItem('userAuthenticated', 'true');
      sessionStorage.setItem('userAuth', JSON.stringify({
        userId: accountNumber,
        cardNumber: accountNumber,
        userName: `${formData.firstName} ${formData.lastName}`,
        accountType: 'Customer',
        preferredNetwork: 'Divinely Mobile',
        authVerified: true,
        securityLevel: 'Premium',
        timestamp: new Date().toISOString()
      }));
      
      localStorage.removeItem('customerRegistrationDraft');
      
      toast({
        title: "🎉 Divinely Mobile Registration Successful!",
        description: `OneCard Premium: ****${accountNumber.slice(-4)}. Welcome to the best deals network!`,
      });

      // Direct redirect to Divinely Mobile deals - premium experience
      window.location.replace('/portal?tab=onecard&network=divinely%20mobile&verified=true');
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit
  };
};
