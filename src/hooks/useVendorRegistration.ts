
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
    
    const validationErrors = validateCompleteForm();

    if (Object.keys(validationErrors).length === 0) {
      await processFormSubmission(formData, savePermanently);
      return true;
    } else {
      // Show validation errors
      const errorFields = Object.keys(validationErrors);
      toast({
        title: "Please Complete Required Fields",
        description: `Missing or invalid: ${errorFields.join(', ')}`,
        variant: "destructive"
      });
      
      return Promise.reject(new Error('Validation failed'));
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
