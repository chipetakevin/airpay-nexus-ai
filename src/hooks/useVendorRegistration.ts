
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { VendorFormData, VendorFormErrors } from '@/types/vendorRegistration';
import { validateVendorForm, validateField } from '@/utils/vendorValidation';
import { useVendorAutoSave } from '@/hooks/useVendorAutoSave';
import { handleVendorRegistrationSubmit } from '@/utils/vendorRegistrationSubmit';

export const useVendorRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { validateSouthAfricanMobile } = usePhoneValidation();
  
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
      // Allow only digits, plus, and spaces for better UX
      value = value.replace(/[^\d+\s]/g, '');
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

    // Real-time validation for phone number
    if (field === 'phoneNumber' && value) {
      const phoneValidation = validateSouthAfricanMobile(value);
      if (!phoneValidation.isValid && phoneValidation.error) {
        setErrors((prev: VendorFormErrors) => ({ ...prev, phoneNumber: phoneValidation.error }));
      }
    }

    // Real-time validation for other fields
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
    
    // Enhanced validation including phone number
    const newErrors = validateVendorForm(formData);
    
    // Additional phone validation
    if (formData.phoneNumber) {
      const phoneValidation = validateSouthAfricanMobile(formData.phoneNumber);
      if (!phoneValidation.isValid) {
        newErrors.phoneNumber = phoneValidation.error || 'Invalid South African mobile number';
      }
    }
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Normalize phone number for consistent storage
      const normalizedPhone = formData.phoneNumber.replace(/\D/g, '');
      let finalPhone = normalizedPhone;
      
      if (normalizedPhone.startsWith('27')) {
        finalPhone = normalizedPhone.substring(2);
      } else if (normalizedPhone.startsWith('0')) {
        finalPhone = normalizedPhone.substring(1);
      }

      // Update formData with normalized phone before submission
      const updatedFormData = {
        ...formData,
        phoneNumber: finalPhone
      };

      // Complete the registration process with consistent phone storage
      const { vendorId, successMessage } = handleVendorRegistrationSubmit(updatedFormData);
      
      // Store registration completion flag
      localStorage.setItem('registrationCompleted', 'true');
      localStorage.setItem('userAuthenticated', 'true');
      
      console.log('✅ Vendor registration completed with phone:', finalPhone);
      
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
        description: `Missing or invalid: ${errorFields.join(', ')}`,
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
