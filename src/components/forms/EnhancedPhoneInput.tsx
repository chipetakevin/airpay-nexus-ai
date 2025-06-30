
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, ChevronDown, History, Check, 
  Star, Clock, User 
} from 'lucide-react';
import { usePhoneStorage } from '@/hooks/usePhoneStorage';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';

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
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasAutoFilled, setHasAutoFilled] = useState(false);
  const [showSuggestions, setShowSuggestionsState] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
    storedPhones, 
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

  // Auto-save when user types a valid number
  useEffect(() => {
    if (value && value.length >= 9) {
      const validation = validateSouthAfricanMobile(value);
      if (validation.isValid) {
        savePhoneNumber(value, countryCode, userType);
      }
    }
  }, [value, countryCode, userType, savePhoneNumber, validateSouthAfricanMobile]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    
    // Clean input - allow only digits
    inputValue = inputValue.replace(/\D/g, '');
    
    // Limit to 9 digits for SA mobile numbers (without country code)
    if (inputValue.length <= 9) {
      onChange(inputValue);
    }
  };

  const handleSuggestionSelect = (phone: any) => {
    onChange(phone.number);
    if (onCountryCodeChange) {
      onCountryCodeChange(phone.countryCode);
    }
    setShowSuggestionsState(false);
    inputRef.current?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    const validation = validateSouthAfricanMobile(pastedText);
    
    if (validation.isValid) {
      e.preventDefault();
      const cleanNumber = pastedText.replace(/\D/g, '');
      // Extract 9 digits for display
      let displayNumber = cleanNumber;
      if (cleanNumber.startsWith('27')) {
        displayNumber = cleanNumber.substring(2);
      } else if (cleanNumber.startsWith('0')) {
        displayNumber = cleanNumber.substring(1);
      }
      onChange(displayNumber);
      savePhoneNumber(displayNumber, countryCode, userType);
    }
  };

  const validation = value ? validateSouthAfricanMobile(value) : null;
  const isValid = validation?.isValid || false;
  const relevantPhones = getAllStoredPhones().slice(0, 3);

  // Format the full number for display in validation message
  const fullNumber = value ? `${countryCode}${value}` : '';

  return (
    <div className="space-y-2">
      <Label htmlFor="phoneInput" className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      
      {/* Saved Numbers Quick Access */}
      {showSuggestions && relevantPhones.length > 0 && !value && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <History className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Recent Numbers</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {relevantPhones.map((phone, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionSelect(phone)}
                className="h-auto p-2 border-blue-300 hover:bg-blue-100"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  <span className="text-xs font-mono">{phone.fullNumber}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Phone Input - Matching the attached image format */}
      <div className="flex gap-2">
        {/* Country Code Selector with SA Flag */}
        <div className="relative">
          <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg min-w-[120px] h-12">
            <div className="flex items-center gap-2">
              <span className="text-lg">🇿🇦</span>
              <span className="font-medium text-gray-700">{countryCode}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        
        {/* Phone Number Input */}
        <div className="relative flex-1">
          <div className="flex items-center px-4 py-3 bg-white border border-gray-300 rounded-lg h-12">
            <Phone className="w-5 h-5 text-gray-400 mr-3" />
            <Input
              ref={inputRef}
              id="phoneInput"
              type="tel"
              value={value}
              onChange={handlePhoneChange}
              onPaste={handlePaste}
              placeholder={placeholder}
              className={`border-0 bg-transparent p-0 focus:ring-0 text-lg font-medium ${
                error ? 'text-red-600' : 
                isValid ? 'text-green-600' : 'text-gray-900'
              }`}
              maxLength={9}
              autoComplete="tel"
            />
          </div>
        </div>
      </div>

      {/* Validation Messages - Matching the attached image */}
      {value && isValid && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
          <Check className="w-4 h-4" />
          <div>
            <p className="font-medium">Valid South African mobile number:</p>
            <p className="font-mono text-sm">{fullNumber}</p>
          </div>
        </div>
      )}
      
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-2 bg-red-50 p-2 rounded border border-red-200">
          <Phone className="w-4 h-4" />
          {error}
        </p>
      )}
      
      {/* Usage Instructions */}
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700 font-medium mb-1">
          📱 Enter your 9-digit SA mobile number
        </p>
        <div className="text-xs text-blue-600 space-y-1">
          <p>• Without country code: <span className="font-mono">832466539</span></p>
          <p>• System will save: <span className="font-mono">+27832466539</span></p>
          <p>• Numbers are permanently stored for future use</p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPhoneInput;
