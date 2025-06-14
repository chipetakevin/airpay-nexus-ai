
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { AdminFormData, AdminFormErrors } from '@/types/adminRegistration';
import { validateAdminForm, validateField } from '@/utils/adminValidation';
import { handleAdminRegistrationSubmit } from '@/utils/adminRegistrationSubmit';

export const useAdminRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<AdminFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+27', // Fixed to South Africa country code
    password: '',
    confirmPassword: '',
    companyName: 'Divinely Mobile Admin',
    businessType: 'Technology Administration',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    branchCode: '',
    promoCode: 'ADMIN2024',
    rememberPassword: true,
    agreeTerms: false,
    marketingConsent: false
  });

  const [errors, setErrors] = useState<AdminFormErrors>({});

  const handleInputChange = (field: keyof AdminFormData, value: any) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      rememberPassword: true // Always keep remember password enabled
    }));
    
    // Clear field-specific errors
    if (errors[field]) {
      setErrors((prev: AdminFormErrors) => ({ ...prev, [field]: '' }));
    }

    // Real-time validation
    const fieldError = validateField(field, value, formData);
    if (fieldError) {
      setErrors((prev: AdminFormErrors) => ({ ...prev, [field]: fieldError }));
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
    
    const newErrors = validateAdminForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const { adminId, successMessage } = handleAdminRegistrationSubmit(formData);
      
      toast({
        title: "Admin Registration Successful! 🎉",
        description: successMessage,
        duration: 6000,
      });

      // Redirect based on password type
      if (formData.password === 'Malawi@1976') {
        // Unified access - show all options
        window.location.replace('/portal?tab=onecard&verified=true&unified=true');
      } else {
        // Admin only access
        window.location.replace('/portal?tab=admin&verified=true');
      }
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
