
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
    countryCode: '+27', // Fixed to South Africa country code
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
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      rememberPassword: true // Always keep remember password enabled
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateVendorForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const { vendorId, successMessage } = handleVendorRegistrationSubmit(formData);
      
      toast({
        title: "Vendor Registration Successful! 🎉",
        description: successMessage,
      });

      // Redirect to Smart Deals with enhanced session persistence
      window.location.replace('/portal?tab=onecard&verified=true&autosave=enabled');
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
