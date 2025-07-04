
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
  const [isProcessingSelection, setIsProcessingSelection] = useState(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState(true);
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
    
    // CRITICAL: Prevent numbers starting with 0 across all forms
    if (inputValue.startsWith('0')) {
      return; // Block any input starting with 0
    }
    
    // Handle different input formats but preserve all digits up to 9
    let normalizedPhone = inputValue;
    
    // If starts with 27 (country code), remove it
    if (normalizedPhone.startsWith('27') && normalizedPhone.length === 11) {
      normalizedPhone = normalizedPhone.substring(2);
    }
    
    // Intelligently prevent invalid patterns
    if (normalizedPhone.length > 0) {
      // First digit cannot be 0 (additional safeguard)
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

  const parseSAMobileNumber = (numberString: string) => {
    const digits = numberString.replace(/\D/g, '');
    
    // Handle different SA number formats
    if (digits.startsWith('27') && digits.length === 11) {
      return {
        isValid: true,
        nineDigit: digits.substring(2),
        international: '+' + digits,
        countryCode: '+27'
      };
    }
    
    if (digits.startsWith('0') && digits.length === 10) {
      return {
        isValid: true,
        nineDigit: digits.substring(1),
        international: '+27' + digits.substring(1),
        countryCode: '+27'
      };
    }
    
    if (digits.length === 9 && !digits.startsWith('0')) {
      return {
        isValid: true,
        nineDigit: digits,
        international: '+27' + digits,
        countryCode: '+27'
      };
    }
    
    return { isValid: false };
  };

  const handleSuggestionSelect = async (phone: any) => {
    setIsProcessingSelection(true);
    
    try {
      // Smart SA number parsing
      const fullNumber = phone.fullNumber || `+27${phone.phoneNumber || phone.number}`;
      const parsed = parseSAMobileNumber(fullNumber);
      
      if (parsed.isValid) {
        // Smooth autofill with loading state
        setTimeout(() => {
          onChange(parsed.nineDigit);
          if (onCountryCodeChange) {
            onCountryCodeChange(parsed.countryCode);
          }
          
          // Immediate validation and save
          const validation = validateSouthAfricanMobile(parsed.nineDigit);
          if (validation.isValid) {
            savePhoneNumber(parsed.nineDigit, parsed.countryCode, userType);
            setLastSavedValue(parsed.nineDigit);
          }
          
          // Hide suggestions with smooth transition
          setSuggestionsVisible(false);
          
          // Auto-focus to next field or current field
          setTimeout(() => {
            inputRef.current?.focus();
            // Simulate moving to next field in form
            const event = new Event('focusNext', { bubbles: true });
            inputRef.current?.dispatchEvent(event);
          }, 300);
          
          setIsProcessingSelection(false);
        }, 150); // Brief loading state for smooth UX
      } else {
        setIsProcessingSelection(false);
      }
    } catch (error) {
      console.error('Error processing suggestion selection:', error);
      setIsProcessingSelection(false);
    }
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
        showSuggestions={showSuggestions && relevantPhones.length > 0 && !value && suggestionsVisible}
        onSuggestionSelect={handleSuggestionSelect}
      />

      {/* Processing indicator */}
      {isProcessingSelection && (
        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 p-2 rounded border border-blue-200 animate-fade-in">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm">Processing selection...</span>
        </div>
      )}

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
