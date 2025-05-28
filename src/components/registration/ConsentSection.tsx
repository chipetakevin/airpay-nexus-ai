
import React from 'react';
import { Label } from '@/components/ui/label';
import { FormData, FormErrors } from '@/types/customerRegistration';

interface ConsentSectionProps {
  formData: FormData;
  errors: FormErrors;
  onInputChange: (field: keyof FormData, value: any) => void;
}

const ConsentSection: React.FC<ConsentSectionProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="rememberPassword"
          checked={formData.rememberPassword}
          onChange={(e) => onInputChange('rememberPassword', e.target.checked)}
        />
        <Label htmlFor="rememberPassword">Remember my login details</Label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="agreeTerms"
          checked={formData.agreeTerms}
          onChange={(e) => onInputChange('agreeTerms', e.target.checked)}
        />
        <Label htmlFor="agreeTerms">I agree to the Terms & Conditions and Privacy Policy *</Label>
      </div>
      {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="marketingConsent"
          checked={formData.marketingConsent}
          onChange={(e) => onInputChange('marketingConsent', e.target.checked)}
        />
        <Label htmlFor="marketingConsent">I consent to receive marketing communications</Label>
      </div>
    </div>
  );
};

export default ConsentSection;
