import React, { useState, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Phone, Check, AlertCircle } from 'lucide-react';
import { useUnifiedPhoneValidation } from '@/hooks/useUnifiedPhoneValidation';
import { useToast } from '@/hooks/use-toast';

interface UnifiedPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  userType?: 'customer' | 'vendor' | 'admin';
  error?: string;
  label?: string;
  placeholder?: string;
  autoFill?: boolean;
  required?: boolean;
}

const UnifiedPhoneInput = ({
  value,
  onChange,
  userType = 'customer',
  error,
  label = 'Mobile Number',
  placeholder = '832466539',
  autoFill = true,
  required = true
}: UnifiedPhoneInputProps) => {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasAutoFilled, setHasAutoFilled] = useState(false);
  const [focused, setFocused] = useState(false);
  
  const {
    validatePhone,
    processPhoneInput,
    autoFillPhoneFromStorage,
    savePhoneToStorage
  } = useUnifiedPhoneValidation();

  // Auto-fill on mount
  useEffect(() => {
    if (autoFill && !value && !hasAutoFilled) {
      const autoFilledPhone = autoFillPhoneFromStorage(userType);
      if (autoFilledPhone) {
        onChange(autoFilledPhone);
        setHasAutoFilled(true);
        toast({
          title: "Phone Auto-filled! 📱",
          description: `Your saved number ${autoFilledPhone} has been loaded.`,
          duration: 2000
        });
      }
    }
  }, [autoFill, value, hasAutoFilled, userType, autoFillPhoneFromStorage, onChange, toast]);

  // Auto-save valid phone numbers
  useEffect(() => {
    if (value && value.length === 9) {
      const validation = validatePhone(value);
      if (validation.isValid) {
        savePhoneToStorage(value, userType);
      }
    }
  }, [value, userType, validatePhone, savePhoneToStorage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const processedValue = processPhoneInput(e.target.value);
    onChange(processedValue);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    const processedValue = processPhoneInput(pastedText);
    if (processedValue) {
      onChange(processedValue);
      e.preventDefault();
    }
  };

  const validation = validatePhone(value);
  const showError = error || (!validation.isValid && value.length > 0);
  const errorMessage = error || validation.error;

  return (
    <div className="space-y-2">
      <Label htmlFor="phone-input" className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      <div className="flex gap-2">
        {/* Country Code */}
        <div className="flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-lg min-w-[120px] h-12">
          <div className="flex items-center gap-2">
            <span className="text-lg">🇿🇦</span>
            <span className="font-medium text-gray-700">+27</span>
          </div>
        </div>
        
        {/* Phone Input */}
        <div className="relative flex-1">
          <div className={`flex items-center px-4 py-3 bg-white border rounded-lg h-12 transition-colors ${
            focused ? 'border-blue-500 ring-1 ring-blue-500' : 
            showError ? 'border-red-500' : 
            validation.isValid ? 'border-green-500' : 'border-gray-300'
          }`}>
            <Phone className="w-5 h-5 text-gray-400 mr-3" />
            <Input
              ref={inputRef}
              id="phone-input"
              type="tel"
              value={value}
              onChange={handleChange}
              onPaste={handlePaste}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={placeholder}
              className="border-0 bg-transparent p-0 focus:ring-0 text-lg font-medium focus:outline-none"
              maxLength={9}
              autoComplete="tel"
            />
            
            {/* Status Icon */}
            <div className="ml-2">
              {validation.isValid && value.length === 9 && (
                <Check className="w-5 h-5 text-green-500" />
              )}
              {showError && value.length > 0 && (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {showError && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errorMessage}
        </p>
      )}
      
      {validation.isValid && value.length === 9 && !showError && (
        <p className="text-sm text-green-600 flex items-center gap-1">
          <Check className="w-4 h-4" />
          Valid South African mobile: +27{value}
        </p>
      )}
      
      {value.length > 0 && value.length < 9 && !showError && (
        <p className="text-sm text-gray-500">
          Enter {9 - value.length} more digit{9 - value.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

export default UnifiedPhoneInput;