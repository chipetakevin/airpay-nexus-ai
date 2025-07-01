
import React, { useState, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { usePhoneStorage } from '@/hooks/usePhoneStorage';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import PhoneInputField from './phone/PhoneInputField';
import PhoneSuggestions from './phone/PhoneSuggestions';
import PhoneValidationMessage from './phone/PhoneValidationMessage';
import PhoneInstructions from './phone/PhoneInstructions';

interface EnhancedPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onCountryCodeChange?: (code: string) => void;
  userType?: 'customer' | 'vendor' | 'admin' | 'guest';
  error?: string;
  label?: string;
  placeholder?: string;
  countryCode?: string;
  autoFill?: boolean;
  showSuggestions?: boolean;
}

const EnhancedPhoneInput = ({
  value,
  onChange,
  onCountryCodeChange,
  userType = 'guest',
  error,
  label = "Mobile Number *",
  placeholder = "832466539",
  countryCode = '+27',
  autoFill = true,
  showSuggestions = true
}: EnhancedPhoneInputProps) => {
  const [hasAutoFilled, setHasAutoFilled] = useState(false);
  const [lastSavedValue, setLastSavedValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
    savePhoneNumber, 
    autoFillPhone,
    getAllStoredPhones 
  } = usePhoneStorage();
  
  const { validateSouthAfricanMobile } = usePhoneValidation();

  // Auto-fill on mount if enabled and no value exists
  useEffect(() => {
    if (autoFill && !value && !hasAutoFilled) {
      const autoFilled = autoFillPhone(userType);
      if (autoFilled) {
        onChange(autoFilled.phoneNumber);
        if (onCountryCodeChange) {
          onCountryCodeChange(autoFilled.countryCode);
        }
        setHasAutoFilled(true);
      }
    }
  }, [autoFill, value, userType, autoFillPhone, onChange, onCountryCodeChange, hasAutoFilled]);

  // Auto-save when user types a valid number (prevent duplicate saves)
  useEffect(() => {
    if (value && value.length >= 9 && value !== lastSavedValue) {
      const validation = validateSouthAfricanMobile(value);
      if (validation.isValid) {
        savePhoneNumber(value, countryCode, userType);
        setLastSavedValue(value);
      }
    }
  }, [value, countryCode, userType, savePhoneNumber, validateSouthAfricanMobile, lastSavedValue]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    
    // Clean input - allow only digits
    inputValue = inputValue.replace(/\D/g, '');
    
    // Ensure we preserve all 9 digits for SA mobile numbers
    if (inputValue.length <= 9) {
      onChange(inputValue);
    }
  };

  const handleSuggestionSelect = (phone: any) => {
    // Ensure full phone number is preserved when selecting from suggestions
    const fullNumber = phone.number || phone.phoneNumber || '';
    onChange(fullNumber);
    if (onCountryCodeChange) {
      onCountryCodeChange(phone.countryCode);
    }
    inputRef.current?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    const validation = validateSouthAfricanMobile(pastedText);
    
    if (validation.isValid) {
      e.preventDefault();
      const cleanNumber = pastedText.replace(/\D/g, '');
      // Extract exactly 9 digits for display, preserving the full number
      let displayNumber = cleanNumber;
      if (cleanNumber.startsWith('27') && cleanNumber.length === 11) {
        displayNumber = cleanNumber.substring(2); // Keep all 9 digits
      } else if (cleanNumber.startsWith('0') && cleanNumber.length === 10) {
        displayNumber = cleanNumber.substring(1); // Keep all 9 digits
      }
      
      // Ensure we have exactly 9 digits
      if (displayNumber.length === 9) {
        onChange(displayNumber);
        if (displayNumber !== lastSavedValue) {
          savePhoneNumber(displayNumber, countryCode, userType);
          setLastSavedValue(displayNumber);
        }
      }
    }
  };

  const validation = value ? validateSouthAfricanMobile(value) : null;
  const isValid = validation?.isValid || false;
  const relevantPhones = getAllStoredPhones().slice(0, 3);
  const fullNumber = value ? `${countryCode}${value}` : '';

  return (
    <div className="space-y-2">
      <Label htmlFor="phoneInput" className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      
      <PhoneSuggestions
        suggestions={relevantPhones}
        showSuggestions={showSuggestions && relevantPhones.length > 0 && !value}
        onSuggestionSelect={handleSuggestionSelect}
      />

      <PhoneInputField
        value={value}
        onChange={handlePhoneChange}
        onPaste={handlePaste}
        placeholder={placeholder}
        error={error}
        isValid={isValid}
        inputRef={inputRef}
      />

      <PhoneValidationMessage
        value={value}
        isValid={isValid}
        fullNumber={fullNumber}
        error={error}
      />
      
      <PhoneInstructions />
    </div>
  );
};

export default EnhancedPhoneInput;
