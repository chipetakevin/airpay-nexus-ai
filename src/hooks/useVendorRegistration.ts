
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { VendorFormData } from '@/types/vendorRegistration';
import { useVendorFormState } from './useVendorFormState';
import { useVendorFormValidation } from './useVendorFormValidation';
import { useVendorFormSubmission } from './useVendorFormSubmission';

export const useVendorRegistration = () => {
  const { toast } = useToast();
  
  const {
    formData,
    showPassword,
    togglePasswordVisibility,
    handleInputChange: baseHandleInputChange,
    handleBankSelect,
    savePermanently
  } = useVendorFormState();

  const {
    errors,
    clearFieldError,
    validateFieldWithDelay,
    validateCompleteForm
  } = useVendorFormValidation(formData);

  const { processFormSubmission } = useVendorFormSubmission();

  const handleInputChange = useCallback((field: keyof VendorFormData, value: any) => {
    baseHandleInputChange(field, value);
    clearFieldError(field);
    validateFieldWithDelay(field, value);
  }, [baseHandleInputChange, clearFieldError, validateFieldWithDelay]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 Vendor form submission started with data:', formData);
    
    try {
      const validationErrors = validateCompleteForm();
      const errorCount = Object.keys(validationErrors).length;
      
      console.log(`📋 Validation completed: ${errorCount} errors found`);

      if (errorCount === 0) {
        console.log('✅ Vendor form is valid, proceeding with submission');
        
        // Enhanced submission process with OneCard integration
        try {
          await processFormSubmission(formData, savePermanently);
          
          console.log('✅ Vendor registration completed successfully');
          
          // Store OneCard information in localStorage for immediate access
          const vendorData = {
            ...formData,
            oneCardType: 'gold', // Vendors get gold cards
            registrationDate: new Date().toISOString(),
            userType: 'vendor'
          };
          
          localStorage.setItem('vendorUser', JSON.stringify(vendorData));
          localStorage.setItem('vendorRegistrationCompleted', 'true');
          
          toast({
            title: "Vendor Registration Complete! 🎉",
            description: "OneCard Gold account created successfully!",
            duration: 5000
          });
          
          return true;
        } catch (submissionError) {
          console.error('❌ Vendor registration submission failed:', submissionError);
          toast({
            title: "Registration Failed",
            description: "Unable to complete registration. Please try again.",
            variant: "destructive"
          });
          return false;
        }
      } else {
        // Show validation errors with specific field information
        const errorFields = Object.keys(validationErrors);
        const firstErrorField = errorFields[0];
        
        console.log('❌ Vendor form validation failed:', validationErrors);
        
        // Show specific error message
        const errorMessage = validationErrors[firstErrorField] || 'Please check the form fields';
        
        toast({
          title: "Please Complete Required Fields",
          description: errorMessage,
          variant: "destructive"
        });
        
        // Focus on first error field with better error handling
        setTimeout(() => {
          const firstErrorElement = document.getElementById(firstErrorField);
          if (firstErrorElement) {
            firstErrorElement.focus();
            firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
        
        return false;
      }
    } catch (error) {
      console.error('❌ Vendor form submission failed:', error);
      toast({
        title: "Vendor Registration Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }, [formData, validateCompleteForm, processFormSubmission, savePermanently, toast]);

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
