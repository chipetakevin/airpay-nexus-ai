
import React from 'react';
import { Input } from '@/components/ui/input';
import { Phone, Check } from 'lucide-react';

interface PhoneInputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  isValid: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

  const PhoneInputField = ({
    value,
    onChange,
    onPaste,
    placeholder,
    error,
    isValid,
    inputRef
  }: PhoneInputFieldProps) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;
      
      // Clean input - allow only digits
      inputValue = inputValue.replace(/\D/g, '');
      
      // Handle different formats but preserve natural input
      let processedValue = inputValue;
      
      // If starts with country code 27, remove it
      if (processedValue.startsWith('27') && processedValue.length === 11) {
        processedValue = processedValue.substring(2);
      }
      // If starts with 0 (national format), remove the 0
      else if (processedValue.startsWith('0') && processedValue.length === 10) {
        processedValue = processedValue.substring(1);
      }
      
      // Limit to 9 digits maximum
      if (processedValue.length > 9) {
        processedValue = processedValue.substring(0, 9);
      }
      
      // Create synthetic event with processed value
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: processedValue
        }
      };
      
      onChange(syntheticEvent);
    };
  return (
    <div className="flex gap-2">
      {/* Country Code Selector with SA Flag */}
      <div className="relative">
        <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg min-w-[120px] h-12">
          <div className="flex items-center gap-2">
            <span className="text-lg">🇿🇦</span>
            <span className="font-medium text-gray-700">+27</span>
          </div>
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
            onChange={handleChange}
            onPaste={onPaste}
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
  );
};

export default PhoneInputField;
