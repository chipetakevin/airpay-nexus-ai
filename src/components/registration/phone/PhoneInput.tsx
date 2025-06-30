
import React from 'react';
import { Input } from '@/components/ui/input';
import { Check, AlertTriangle } from 'lucide-react';

interface PhoneInputProps {
  phoneNumber: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhonePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  isValidPhone: boolean;
  error?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  phoneNumber,
  onPhoneChange,
  onPhonePaste,
  isValidPhone,
  error
}) => {
  return (
    <div className="flex">
      <div className="flex items-center px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
        <span className="text-sm font-medium text-gray-700">🇿🇦 +27</span>
      </div>
      <div className="relative flex-1">
        <Input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={onPhoneChange}
          onPaste={onPhonePaste}
          placeholder="832466539 (9 digits)"
          className={`rounded-l-none pr-10 ${
            error ? 'border-red-500' : 
            isValidPhone ? 'border-green-500' : 'border-gray-300'
          }`}
          maxLength={15}
          autoComplete="tel"
        />
        {isValidPhone && (
          <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
        )}
        {error && (
          <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
        )}
      </div>
    </div>
  );
};

export default PhoneInput;
