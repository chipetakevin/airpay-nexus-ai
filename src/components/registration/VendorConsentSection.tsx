
import React from 'react';
import { Label } from '@/components/ui/label';

interface VendorConsentProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
}

const VendorConsentSection: React.FC<VendorConsentProps> = ({
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
          disabled
        />
        <Label htmlFor="rememberPassword" className="text-gray-600">
          ✓ Remember my login details (Enabled for faster shopping)
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="agreeTerms"
          checked={formData.agreeTerms}
          onChange={(e) => onInputChange('agreeTerms', e.target.checked)}
        />
        <Label htmlFor="agreeTerms">I agree to the Business Terms & Conditions and Privacy Policy *</Label>
      </div>
      {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="marketingConsent"
          checked={formData.marketingConsent}
          onChange={(e) => onInputChange('marketingConsent', e.target.checked)}
        />
        <Label htmlFor="marketingConsent">I consent to receive business communications and updates</Label>
      </div>
    </div>
  );
};

export default VendorConsentSection;
