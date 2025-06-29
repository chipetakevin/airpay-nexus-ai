
import React from 'react';
import { Label } from '@/components/ui/label';

interface AdminConsentProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
}

const AdminConsentSection: React.FC<AdminConsentProps> = ({
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
          ✓ Remember my admin credentials (Enforced for security)
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="twoFactorAuth"
          checked={formData.twoFactorAuth}
          onChange={(e) => onInputChange('twoFactorAuth', e.target.checked)}
        />
        <Label htmlFor="twoFactorAuth">Enable Two-Factor Authentication (Recommended)</Label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="agreeTerms"
          checked={formData.agreeTerms}
          onChange={(e) => onInputChange('agreeTerms', e.target.checked)}
        />
        <Label htmlFor="agreeTerms">I agree to the Administrator Terms & Conditions and Privacy Policy *</Label>
      </div>
      {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
    </div>
  );
};

export default AdminConsentSection;
