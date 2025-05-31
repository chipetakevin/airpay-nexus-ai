
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface VendorBusinessInfoProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
}

const VendorBusinessInfoSection: React.FC<VendorBusinessInfoProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Business Information</h3>
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name * (Will appear on OneCard Gold)</Label>
        <Input
          id="companyName"
          name="companyName"
          autoComplete="organization"
          value={formData.companyName}
          onChange={(e) => onInputChange('companyName', e.target.value)}
          placeholder="Enter your business name"
          className={errors.companyName ? 'border-red-500' : ''}
        />
        {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessType">Business Type</Label>
        <Input
          id="businessType"
          name="businessType"
          value={formData.businessType}
          onChange={(e) => onInputChange('businessType', e.target.value)}
          placeholder="e.g., Retail, Restaurant, Service Provider"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="promoCode">Promo Code (Auto-generated)</Label>
        <Input
          id="promoCode"
          value={formData.promoCode}
          readOnly
          className="bg-gray-50"
        />
        <p className="text-sm text-gray-600">✓ Extracted from OneCard Global System</p>
      </div>
    </div>
  );
};

export default VendorBusinessInfoSection;
