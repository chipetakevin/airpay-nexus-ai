
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
    
    // Handle different input formats but preserve all digits up to 9
    let normalizedPhone = inputValue;
    
    // If starts with 27 (country code), remove it
    if (normalizedPhone.startsWith('27') && normalizedPhone.length === 11) {
      normalizedPhone = normalizedPhone.substring(2);
    }
    // If starts with 0 (national format), remove it  
    else if (normalizedPhone.startsWith('0') && normalizedPhone.length === 10) {
      normalizedPhone = normalizedPhone.substring(1);
    }
    
    // Intelligently prevent invalid patterns
    if (normalizedPhone.length > 0) {
      // First digit cannot be 0
      if (normalizedPhone[0] === '0') {
        return; // Silently ignore
      }
      
      // Second digit cannot be 0
      if (normalizedPhone.length > 1 && normalizedPhone[1] === '0') {
        return; // Silently ignore
      }
    }
    
    // Only allow up to 9 digits for SA mobile numbers
    if (normalizedPhone.length <= 9) {
      onChange(normalizedPhone);
    }
  };

  const handleSuggestionSelect = (phone: any) => {
    // Extract the 9-digit number from stored phone data
    const phoneNumber = phone.phoneNumber || phone.number || '';
    const countryCode = phone.countryCode || '+27';
    
    // Ensure we have exactly 9 digits
    if (phoneNumber && phoneNumber.length === 9) {
      onChange(phoneNumber);
      if (onCountryCodeChange) {
        onCountryCodeChange(countryCode);
      }
      
      // Immediately validate and save
      const validation = validateSouthAfricanMobile(phoneNumber);
      if (validation.isValid) {
        savePhoneNumber(phoneNumber, countryCode, userType);
        setLastSavedValue(phoneNumber);
      }
    }
    inputRef.current?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    const cleanPasted = pastedText.replace(/\D/g, '');
    
    let normalizedPhone = cleanPasted;
    
    // Handle different paste formats
    if (cleanPasted.startsWith('27') && cleanPasted.length === 11) {
      normalizedPhone = cleanPasted.substring(2); // Remove +27
    } else if (cleanPasted.startsWith('0') && cleanPasted.length === 10) {
      normalizedPhone = cleanPasted.substring(1); // Remove leading 0
    }
    
    // Only proceed if we have exactly 9 digits
    if (normalizedPhone.length === 9) {
      e.preventDefault();
      onChange(normalizedPhone);
      
      const validation = validateSouthAfricanMobile(normalizedPhone);
      if (validation.isValid && normalizedPhone !== lastSavedValue) {
        savePhoneNumber(normalizedPhone, countryCode, userType);
        setLastSavedValue(normalizedPhone);
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
      
      <PhoneInstructions 
        isValid={isValid}
        hasValue={!!value}
      />
    </div>
  );
};

export default EnhancedPhoneInput;
