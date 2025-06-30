
import { useState, useCallback } from 'react';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { validateSouthAfricanBankAccount } from '@/utils/bankingValidation';
import { VendorFormData, VendorFormErrors } from '@/types/vendorRegistration';
import { validateVendorForm, validateField } from '@/utils/vendorValidation';

export const useVendorFormValidation = (formData: VendorFormData) => {
  const [errors, setErrors] = useState<VendorFormErrors>({});
  const { validateSouthAfricanMobile } = usePhoneValidation();

  const clearFieldError = useCallback((field: keyof VendorFormData) => {
    setErrors(prev => {
      if (prev[field]) {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const validateFieldWithDelay = useCallback((field: keyof VendorFormData, value: any) => {
    // Clear field-specific errors immediately
    clearFieldError(field);

    // Skip validation if value is empty for optional fields
    if (!value && field !== 'agreeTerms') {
      return () => {};
    }

    // Debounced validation to prevent flickering
    const timeoutId = setTimeout(() => {
      // Real-time validation for phone number
      if (field === 'phoneNumber' && value) {
        const phoneValidation = validateSouthAfricanMobile(value);
        if (!phoneValidation.isValid && phoneValidation.error) {
          setErrors(prev => ({ ...prev, phoneNumber: phoneValidation.error }));
        }
      }

      // Real-time validation for banking - only if value exists
      if (field === 'accountNumber' && value && value.trim()) {
        const bankValidation = validateSouthAfricanBankAccount(value);
        if (!bankValidation.isValid && bankValidation.error) {
          setErrors(prev => ({ ...prev, accountNumber: bankValidation.error }));
        }
      }

      // Real-time validation for other fields
      const fieldError = validateField(field, value, formData);
      if (fieldError) {
        setErrors(prev => ({ ...prev, [field]: fieldError }));
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formData, validateSouthAfricanMobile, clearFieldError]);

  const validateCompleteForm = useCallback(() => {
    console.log('🔍 Validating complete form with data:', formData);
    
    // Enhanced validation including phone number and banking
    const newErrors = validateVendorForm(formData);
    
    // Additional phone validation - only if phone number exists
    if (formData.phoneNumber && formData.phoneNumber.trim()) {
      const phoneValidation = validateSouthAfricanMobile(formData.phoneNumber);
      if (!phoneValidation.isValid) {
        newErrors.phoneNumber = phoneValidation.error || 'Invalid South African mobile number';
      }
    } else {
      newErrors.phoneNumber = 'Phone number is required';
    }

    // Enhanced banking validation - only validate if account number is provided
    if (formData.accountNumber && formData.accountNumber.trim()) {
      const bankValidation = validateSouthAfricanBankAccount(formData.accountNumber);
      if (!bankValidation.isValid) {
        newErrors.accountNumber = bankValidation.error || 'Invalid South African bank account number';
      }
      // Only require other banking fields if account number is provided
      if (!formData.bankName || !formData.bankName.trim()) {
        newErrors.bankName = 'Bank selection is required';
      }
      if (!formData.branchCode || !formData.branchCode.trim()) {
        newErrors.branchCode = 'Branch code is required';
      }
    } else {
      // If no account number, all banking fields are required
      if (!formData.bankName || !formData.bankName.trim()) {
        newErrors.bankName = 'Bank selection is required';
      }
      if (!formData.branchCode || !formData.branchCode.trim()) {
        newErrors.branchCode = 'Branch code is required';
      }
      newErrors.accountNumber = 'Account number is required';
    }
    
    console.log('❌ Validation errors found:', newErrors);
    setErrors(newErrors);
    return newErrors;
  }, [formData, validateSouthAfricanMobile]);

  return {
    errors,
    setErrors,
    clearFieldError,
    validateFieldWithDelay,
    validateCompleteForm
  };
};
