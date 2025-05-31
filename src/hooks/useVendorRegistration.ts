
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validateAccountNumber } from '@/utils/formValidation';

interface VendorFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  companyName: string;
  businessType: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  branchCode: string;
  promoCode: string;
  rememberPassword: boolean;
  agreeTerms: boolean;
  marketingConsent: boolean;
}

export const useVendorRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<VendorFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+27',
    companyName: '',
    businessType: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    branchCode: '',
    promoCode: 'ONECARD2024',
    rememberPassword: true,
    agreeTerms: false,
    marketingConsent: false
  });

  const [errors, setErrors] = useState<any>({});

  // Auto-save functionality
  useEffect(() => {
    const savedData = localStorage.getItem('vendorRegistrationDraft');
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
      localStorage.setItem('vendorRegistrationDraft', JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleInputChange = (field: keyof VendorFormData, value: any) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      rememberPassword: true
    }));
    
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }

    if (field === 'email' && value) {
      if (!validateEmail(value)) {
        setErrors((prev: any) => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    }

    if (field === 'accountNumber' && value) {
      if (!validateAccountNumber(value)) {
        setErrors((prev: any) => ({ ...prev, accountNumber: 'Account number must be 8-12 digits' }));
      }
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
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.bankName) newErrors.bankName = 'Bank selection is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!validateAccountNumber(formData.accountNumber)) newErrors.accountNumber = 'Invalid account number';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const vendorId = 'VND' + Math.random().toString(36).substr(2, 8).toUpperCase();
      
      const vendorData = {
        ...formData,
        vendorId,
        registeredPhone: `${formData.countryCode}${formData.phoneNumber}`,
        cardType: 'OneCard Gold',
        cashbackBalance: 0,
        totalEarned: 0,
        totalSpent: 0,
        commissionRate: 10.00,
        rememberPassword: true
      };

      localStorage.setItem('onecardVendor', JSON.stringify(vendorData));
      
      localStorage.setItem('userCredentials', JSON.stringify({
        email: formData.email,
        phone: `${formData.countryCode}${formData.phoneNumber}`,
        rememberPassword: true,
        userType: 'vendor'
      }));

      localStorage.setItem('userAuthenticated', 'true');
      localStorage.removeItem('vendorRegistrationDraft');
      
      toast({
        title: "Vendor Registration Successful! 🎉",
        description: `OneCard Gold created: ****${vendorId.slice(-4)}. Redirecting to Smart Deals now!`,
      });

      navigate('/?tab=deals');
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
