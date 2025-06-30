
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
  placeholder = "Enter your phone number",
  countryCode = '+27',
  autoFill = true,
  showSuggestions = true
}: EnhancedPhoneInputProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasAutoFilled, setHasAutoFilled] = useState(false);
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
    
    // Clean input - allow only digits, spaces, and common separators
    inputValue = inputValue.replace(/[^\d\s\-\(\)]/g, '');
    
    onChange(inputValue);
  };

  const handleSuggestionSelect = (phone: any) => {
    onChange(phone.number);
    if (onCountryCodeChange) {
      onCountryCodeChange(phone.countryCode);
    }
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    const validation = validateSouthAfricanMobile(pastedText);
    
    if (validation.isValid) {
      e.preventDefault();
      const cleanNumber = pastedText.replace(/\D/g, '');
      onChange(cleanNumber);
      savePhoneNumber(cleanNumber, countryCode, userType);
    }
  };

  const validation = value ? validateSouthAfricanMobile(value) : null;
  const isValid = validation?.isValid || false;
  const relevantPhones = getAllStoredPhones().slice(0, 5);

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
                  {phone.frequency > 1 && (
                    <Badge variant="secondary" className="text-xs">
                      {phone.frequency}x
                    </Badge>
                  )}
                  {phone.userType !== 'guest' && (
                    <Badge variant="outline" className="text-xs">
                      {phone.userType}
                    </Badge>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Phone Input */}
      <div className="relative">
        <div className="flex">
          {/* Country Code Selector */}
          <div className="flex items-center px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
            <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
              🇿🇦 {countryCode}
            </span>
          </div>
          
          {/* Phone Number Input */}
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              id="phoneInput"
              type="tel"
              value={value}
              onChange={handlePhoneChange}
              onPaste={handlePaste}
              placeholder={placeholder}
              className={`rounded-l-none pr-10 ${
                error ? 'border-red-500' : 
                isValid ? 'border-green-500' : 'border-gray-300'
              }`}
              maxLength={15}
              autoComplete="tel"
            />
            
            {/* Validation Icon */}
            {isValid && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
            )}
          </div>
        </div>

        {/* Dropdown for suggestions when typing */}
        {showDropdown && relevantPhones.length > 0 && value.length >= 2 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
            {relevantPhones
              .filter(phone => phone.number.includes(value.replace(/\D/g, '')))
              .map((phone, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => handleSuggestionSelect(phone)}
                >
                  <Phone className="w-3 h-3 text-gray-400" />
                  <span className="flex-1 font-mono text-sm">{phone.fullNumber}</span>
                  <div className="flex items-center gap-1">
                    {phone.frequency > 1 && (
                      <Badge variant="secondary" className="text-xs">
                        {phone.frequency}x
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {phone.userType}
                    </Badge>
                  </div>
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Validation Messages */}
      {value && isValid && (
        <div className="text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200">
          ✅ Valid SA Mobile: {countryCode}{value}
          <br />
          💾 Auto-saved for future use
        </div>
      )}
      
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <Phone className="w-3 h-3" />
          {error}
        </p>
      )}
      
      {/* Usage Instructions */}
      <div className="bg-blue-50 p-2 rounded border border-blue-200">
        <p className="text-xs text-blue-600">
          <strong>📱 SA Mobile Format:</strong> Enter in any format - we'll save it automatically
        </p>
        <ul className="text-xs text-blue-600 mt-1 space-y-1">
          <li>• 832466539 (9 digits)</li>
          <li>• 0832466539 (10 digits with 0)</li>
          <li>• +27832466539 (with +27)</li>
        </ul>
      </div>
    </div>
  );
};

export default EnhancedPhoneInput;
