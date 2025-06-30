
import React from 'react';
import { Check, Phone } from 'lucide-react';

interface PhoneValidationMessageProps {
  value: string;
  isValid: boolean;
  fullNumber: string;
  error?: string;
}

const PhoneValidationMessage = ({
  value,
  isValid,
  fullNumber,
  error
}: PhoneValidationMessageProps) => {
  return (
    <>
      {/* Validation Messages */}
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
    </>
  );
};

export default PhoneValidationMessage;
