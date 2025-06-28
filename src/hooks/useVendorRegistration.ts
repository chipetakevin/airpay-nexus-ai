
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { VendorFormData, VendorFormErrors } from '@/types/vendorRegistration';
import { validateVendorForm, validateField } from '@/utils/vendorValidation';
import { useVendorAutoSave } from '@/hooks/useVendorAutoSave';
import { handleVendorRegistrationSubmit } from '@/utils/vendorRegistrationSubmit';

export const useVendorRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState<VendorFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+27',
    password: '',
    confirmPassword: '',
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

  const [errors, setErrors] = useState<VendorFormErrors>({});

  const { loadSavedData } = useVendorAutoSave(formData);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = loadSavedData();
    if (savedData) {
      setFormData(prev => ({ ...prev, ...savedData }));
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleInputChange = (field: keyof VendorFormData, value: any) => {
    // Special handling for phone number to ensure proper formatting
    if (field === 'phoneNumber') {
      let cleanValue = value.replace(/\D/g, '');
      
      if (cleanValue.startsWith('0')) {
        cleanValue = cleanValue.substring(1);
      }
      
      if (cleanValue.length > 9) {
        cleanValue = cleanValue.substring(0, 9);
      }
      
      value = cleanValue;
    }
    
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      rememberPassword: true
    }));
    
    // Clear field-specific errors
    if (errors[field]) {
      setErrors((prev: VendorFormErrors) => ({ ...prev, [field]: '' }));
    }

    // Real-time validation
    const fieldError = validateField(field, value, formData);
    if (fieldError) {
      setErrors((prev: VendorFormErrors) => ({ ...prev, [field]: fieldError }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateVendorForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Complete the registration process
      const { vendorId, successMessage } = handleVendorRegistrationSubmit(formData);
      
      // Store registration completion flag
      localStorage.setItem('registrationCompleted', 'true');
      localStorage.setItem('userAuthenticated', 'true');
      
      toast({
        title: "Vendor Registration Successful! 🎉",
        description: successMessage,
      });

      // Return success - redirection will be handled by the component
      return Promise.resolve(true);
    } else {
      // Show validation errors
      const errorFields = Object.keys(newErrors);
      toast({
        title: "Please Complete Required Fields",
        description: `Missing: ${errorFields.join(', ')}`,
        variant: "destructive"
      });
      
      return Promise.reject(new Error('Validation failed'));
    }
  };

  return {
    formData,
    errors,
    showPassword,
    togglePasswordVisibility,
    handleInputChange,
    handleBankSelect,
    handleSubmit
  };
};
