import { useState, useCallback } from 'react';
import { validateSouthAfricanMobile } from '@/utils/phoneValidation';
import { useToast } from '@/hooks/use-toast';

export interface PhoneValidationState {
  isValid: boolean;
  error: string;
  normalizedPhone: string;
  displayPhone: string;
}

export const useUnifiedPhoneValidation = () => {
  const { toast } = useToast();
  const [validationState, setValidationState] = useState<PhoneValidationState>({
    isValid: false,
    error: '',
    normalizedPhone: '',
    displayPhone: ''
  });

  const validatePhone = useCallback((phoneNumber: string): PhoneValidationState => {
    if (!phoneNumber) {
      return {
        isValid: false,
        error: 'Phone number is required',
        normalizedPhone: '',
        displayPhone: ''
      };
    }

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    let normalizedPhone = '';
    let displayPhone = phoneNumber;

    // Handle different input formats
    if (cleanPhone.startsWith('27') && cleanPhone.length === 11) {
      // International format: +27832466539
      normalizedPhone = cleanPhone.substring(2);
      displayPhone = `+${cleanPhone}`;
    } else if (cleanPhone.startsWith('0') && cleanPhone.length === 10) {
      // National format: 0832466539
      normalizedPhone = cleanPhone.substring(1);
      displayPhone = cleanPhone;
    } else if (cleanPhone.length === 9) {
      // Local format: 832466539 (preferred)
      normalizedPhone = cleanPhone;
      displayPhone = cleanPhone;
    } else {
      return {
        isValid: false,
        error: 'Please enter a valid 9-digit mobile number',
        normalizedPhone: '',
        displayPhone: phoneNumber
      };
    }

    const validation = validateSouthAfricanMobile(normalizedPhone);
    
    return {
      isValid: validation.isValid,
      error: validation.error || '',
      normalizedPhone,
      displayPhone
    };
  }, []);

  const processPhoneInput = useCallback((inputValue: string): string => {
    // Clean input - allow only digits
    let cleanValue = inputValue.replace(/\D/g, '');
    
    // Handle different input formats
    if (cleanValue.startsWith('27') && cleanValue.length >= 9) {
      // Remove country code if present
      cleanValue = cleanValue.substring(2);
    } else if (cleanValue.startsWith('0') && cleanValue.length >= 9) {
      // Remove leading 0 if present
      cleanValue = cleanValue.substring(1);
    }
    
    // Limit to 9 digits
    return cleanValue.substring(0, 9);
  }, []);

  const autoFillPhoneFromStorage = useCallback((userType: string = 'customer'): string => {
    try {
      // Try multiple storage sources
      const sources = [
        'userCredentials',
        `onecard${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
        'permanentUserData'
      ];

      for (const source of sources) {
        const data = localStorage.getItem(source);
        if (data) {
          const parsed = JSON.parse(data);
          const phone = parsed.phone || parsed.phoneNumber || parsed.registeredPhone;
          if (phone) {
            const processed = processPhoneInput(phone);
            if (processed.length === 9) {
              return processed;
            }
          }
        }
      }
    } catch (error) {
      console.error('Error auto-filling phone from storage:', error);
    }
    
    return '';
  }, [processPhoneInput]);

  const savePhoneToStorage = useCallback((phoneNumber: string, userType: string = 'customer') => {
    if (!phoneNumber || phoneNumber.length !== 9) return;

    try {
      const phoneData = {
        phone: phoneNumber,
        phoneNumber,
        registeredPhone: phoneNumber,
        savedAt: new Date().toISOString(),
        userType
      };

      // Save to multiple locations for persistence
      const storageKeys = [
        'userCredentials',
        `onecard${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
        'permanentUserData'
      ];

      storageKeys.forEach(key => {
        try {
          const existing = localStorage.getItem(key);
          if (existing) {
            const parsed = JSON.parse(existing);
            Object.assign(parsed, phoneData);
            localStorage.setItem(key, JSON.stringify(parsed));
          } else {
            localStorage.setItem(key, JSON.stringify(phoneData));
          }
        } catch (error) {
          console.error(`Error saving to ${key}:`, error);
        }
      });

      console.log('✅ Phone number saved to all storage locations:', phoneNumber);
    } catch (error) {
      console.error('Error saving phone to storage:', error);
    }
  }, []);

  return {
    validationState,
    validatePhone,
    processPhoneInput,
    autoFillPhoneFromStorage,
    savePhoneToStorage,
    setValidationState
  };
};