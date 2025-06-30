
import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';

interface PhoneValidationInfoProps {
  phoneNumber: string;
  isValidPhone: boolean;
  error?: string;
  formatPhoneForDisplay: (number: string) => string;
}

const PhoneValidationInfo: React.FC<PhoneValidationInfoProps> = ({
  phoneNumber,
  isValidPhone,
  error,
  formatPhoneForDisplay
}) => {
  return (
    <>
      {phoneNumber && isValidPhone && (
        <div className="text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200">
          ✅ Valid SA Mobile: {formatPhoneForDisplay(phoneNumber)}
          <br />
          💾 Auto-saved for future use
        </div>
      )}
      
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          {error}
        </p>
      )}
      
      <div className="bg-blue-50 p-2 rounded border border-blue-200">
        <p className="text-xs text-blue-600">
          <strong>📱 SA Mobile Format:</strong> Enter your number in any format:
        </p>
        <ul className="text-xs text-blue-600 mt-1 space-y-1">
          <li>• 832466539 (9 digits - preferred)</li>
          <li>• 0832466539 (10 digits with 0)</li>
          <li>• +27832466539 (11 digits with +27)</li>
        </ul>
        <p className="text-xs text-blue-500 mt-2">
          <strong>Valid networks:</strong> MTN, Vodacom, Cell C, Telkom, Rain
        </p>
      </div>
    </>
  );
};

export default PhoneValidationInfo;
