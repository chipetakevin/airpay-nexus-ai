
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
            onChange={onChange}
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
