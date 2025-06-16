
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
    email: 'onecard@myonecard.ai', // Set default admin email to onecard@myonecard.ai
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
    adminRole: 'Super Administrator', // Initialize with Super Administrator
    rememberPassword: true,
    agreeTerms: false,
    marketingConsent: false,
    twoFactorAuth: false
  });

  const [errors, setErrors] = useState<AdminFormErrors>({});

  const handleInputChange = (field: keyof AdminFormData, value: any) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      rememberPassword: true, // Always keep remember password enabled
      adminRole: 'Super Administrator' // Always keep admin role as Super Administrator
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
    
    // Ensure administrator role is always set to "Super Administrator"
    const formDataWithRole = {
      ...formData,
      adminRole: 'Super Administrator'
    };
    
    const newErrors = validateAdminForm(formDataWithRole);
    
    // Additional password validation for admin access
    if (formDataWithRole.password !== 'Malawi@1976') {
      newErrors.password = 'Invalid admin password. Full privileges require authorized password.';
    }
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const { adminId, successMessage } = handleAdminRegistrationSubmit(formDataWithRole);
      
      toast({
        title: "Super Administrator Registration Successful! 🎉",
        description: successMessage,
        duration: 6000,
      });

      // Redirect based on password validation - only authorized password gets full access
      if (formDataWithRole.password === 'Malawi@1976') {
        // Full privileges - unified access to all portals
        window.location.replace('/portal?tab=onecard&verified=true&unified=true&admin=true');
      } else {
        // This should never happen due to validation above, but keeping as fallback
        toast({
          title: "Access Denied",
          description: "Invalid credentials for admin registration.",
          variant: "destructive"
        });
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
