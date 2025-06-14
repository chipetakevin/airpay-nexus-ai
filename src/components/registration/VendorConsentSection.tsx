
import React from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

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
        <Label htmlFor="rememberPassword" className="text-gray-600 flex items-center gap-2">
          ✓ Remember my login details (Enabled for faster shopping)
          <Badge variant="secondary" className="text-xs">
            Auto-Enabled
          </Badge>
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

      {/* Enhanced Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
        <div className="text-sm text-blue-700">
          <strong>🔐 Enhanced Password Management:</strong>
          <ul className="mt-2 space-y-1 text-xs">
            <li>• Auto-save keeps your registration safe</li>
            <li>• Password reset available via email OTP</li>
            <li>• Use unified password (Malawi@1976) for admin access</li>
            <li>• Credentials remembered for faster future logins</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VendorConsentSection;
