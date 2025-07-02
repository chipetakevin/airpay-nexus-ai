import { useState } from 'react';

// South African validation patterns
const SA_MOBILE_REGEX = /^0[6-8][0-9]{8}$/;
const SA_ID_REGEX = /^[0-9]{13}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[a-zA-Z\s'-]{2,50}$/;

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export interface FormData {
  phoneNumber: string;
  currentNetwork: string;
  targetNetwork: string;
  fullName: string;
  idNumber: string;
  dateOfBirth: string;
  contactEmail: string;
  contactMobile: string;
  simType: string;
  priority: string;
  scheduledCutover: string;
  consentOwnership: boolean;
  consentDataProcessing: boolean;
  digitalSignature: string;
  documents: any[];
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: any, formData?: FormData): ValidationResult => {
    let isValid = true;
    let message = '';

    switch (name) {
      case 'fullName':
        if (!value || value.trim().length === 0) {
          isValid = false;
          message = 'Full name is required';
        } else if (!NAME_REGEX.test(value.trim())) {
          isValid = false;
          message = 'Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes';
        }
        break;

      case 'idNumber':
        if (!value || value.trim().length === 0) {
          isValid = false;
          message = 'ID number is required';
        } else if (!SA_ID_REGEX.test(value.replace(/\s/g, ''))) {
          isValid = false;
          message = 'Please enter a valid 13-digit South African ID number';
        } else {
          // Basic SA ID checksum validation
          const id = value.replace(/\s/g, '');
          if (!validateSAIDChecksum(id)) {
            isValid = false;
            message = 'Invalid South African ID number checksum';
          }
        }
        break;

      case 'dateOfBirth':
        if (!value) {
          isValid = false;
          message = 'Date of birth is required';
        } else {
          const birthDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          
          if (birthDate > today) {
            isValid = false;
            message = 'Date of birth cannot be in the future';
          } else if (age < 18) {
            isValid = false;
            message = 'You must be at least 18 years old to port a number';
          } else if (age > 120) {
            isValid = false;
            message = 'Please enter a valid date of birth';
          }
        }
        break;

      case 'contactEmail':
        if (!value || value.trim().length === 0) {
          isValid = false;
          message = 'Email address is required';
        } else if (!EMAIL_REGEX.test(value.trim())) {
          isValid = false;
          message = 'Please enter a valid email address (e.g., john@example.com)';
        }
        break;

      case 'contactMobile':
        if (!value || value.trim().length === 0) {
          isValid = false;
          message = 'Contact mobile number is required';
        } else if (!SA_MOBILE_REGEX.test(value.replace(/\s/g, ''))) {
          isValid = false;
          message = 'Please enter a valid 10-digit South African mobile number starting with 0';
        }
        break;

      case 'phoneNumber':
        if (!value || value.trim().length === 0) {
          isValid = false;
          message = 'Phone number to port is required';
        } else if (!SA_MOBILE_REGEX.test(value.replace(/\s/g, ''))) {
          isValid = false;
          message = 'Please enter a valid 10-digit South African mobile number starting with 0';
        } else if (formData?.contactMobile && value.replace(/\s/g, '') === formData.contactMobile.replace(/\s/g, '')) {
          isValid = false;
          message = 'Phone number to port cannot be the same as contact mobile number';
        }
        break;

      case 'currentNetwork':
        if (!value || value.trim().length === 0) {
          isValid = false;
          message = 'Current network provider is required';
        }
        break;

      case 'targetNetwork':
        if (!value || value.trim().length === 0) {
          isValid = false;
          message = 'Target network provider is required';
        } else if (formData?.currentNetwork && value === formData.currentNetwork) {
          isValid = false;
          message = 'Target network must be different from current network';
        }
        break;

      case 'simType':
        if (!value || !['physical', 'esim'].includes(value)) {
          isValid = false;
          message = 'Please select a valid SIM type';
        }
        break;

      case 'scheduledCutover':
        if (value) {
          const scheduledDate = new Date(value);
          const now = new Date();
          const minDate = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
          
          if (scheduledDate < minDate) {
            isValid = false;
            message = 'Scheduled cutover must be at least 2 hours from now';
          }
        }
        break;

      case 'consentOwnership':
        if (!value) {
          isValid = false;
          message = 'You must confirm ownership of the number';
        }
        break;

      case 'consentDataProcessing':
        if (!value) {
          isValid = false;
          message = 'You must consent to data processing for POPIA compliance';
        }
        break;

      case 'digitalSignature':
        if (!value || value.trim().length === 0) {
          isValid = false;
          message = 'Digital signature is required';
        } else if (value.trim().length < 2) {
          isValid = false;
          message = 'Please enter your full name as digital signature';
        }
        break;
    }

    return { isValid, message };
  };

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    let isFormValid = true;

    // Validate all required fields
    const fieldsToValidate = [
      'fullName', 'idNumber', 'dateOfBirth', 'contactEmail', 'contactMobile',
      'phoneNumber', 'currentNetwork', 'targetNetwork', 'simType',
      'consentOwnership', 'consentDataProcessing'
    ];

    fieldsToValidate.forEach(field => {
      const result = validateField(field, formData[field as keyof FormData], formData);
      if (!result.isValid) {
        newErrors[field] = result.message;
        isFormValid = false;
      }
    });

    // Document validation
    if (!formData.documents || formData.documents.length === 0) {
      newErrors.documents = 'At least one supporting document is required';
      isFormValid = false;
    }

    setErrors(newErrors);
    return isFormValid;
  };

  const handleFieldChange = (name: string, value: any, formData?: FormData) => {
    // Mark field as touched
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate field if it's been touched
    if (touched[name]) {
      const result = validateField(name, value, formData);
      setErrors(prev => ({
        ...prev,
        [name]: result.isValid ? '' : result.message
      }));
    }
  };

  const clearErrors = () => {
    setErrors({});
    setTouched({});
  };

  return {
    errors,
    touched,
    validateField,
    validateForm,
    handleFieldChange,
    clearErrors
  };
};

// Utility functions
const validateSAIDChecksum = (id: string): boolean => {
  if (id.length !== 13) return false;
  
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    if (i % 2 === 0) {
      sum += parseInt(id[i]);
    } else {
      const doubled = parseInt(id[i]) * 2;
      sum += doubled > 9 ? doubled - 9 : doubled;
    }
  }
  
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(id[12]);
};

export const formatSAMobileNumber = (value: string): string => {
  // Remove all non-digits
  const cleaned = value.replace(/\D/g, '');
  
  // Format as 082 123 4567
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
};

export const formatSAIDNumber = (value: string): string => {
  // Remove all non-digits
  const cleaned = value.replace(/\D/g, '');
  
  // Format as 8001015009087
  return cleaned.slice(0, 13);
};

export const sanitizeInput = (input: string): string => {
  // Remove potentially harmful characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
};