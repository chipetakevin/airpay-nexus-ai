
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone } from 'lucide-react';
import { VendorFormData, VendorFormErrors } from '@/types/vendorRegistration';

interface VendorPhoneSectionProps {
  formData: VendorFormData;
  errors: VendorFormErrors;
  onInputChange: (field: keyof VendorFormData, value: any) => void;
}

const VendorPhoneSection = ({ formData, errors, onInputChange }: VendorPhoneSectionProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Remove any non-numeric characters
    value = value.replace(/\D/g, '');
    
    // Remove leading zero if present (since we have +27 prefix)
    if (value.startsWith('0')) {
      value = value.substring(1);
    }
    
    // Limit to 9 digits (SA mobile numbers without leading zero)
    if (value.length > 9) {
      value = value.substring(0, 9);
    }
    
    onInputChange('phoneNumber', value);
  };

  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
          <Phone className="w-5 h-5" />
          Business Phone Number
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-blue-700">
            Business Mobile Number *
          </Label>
          <div className="flex">
            <div className="flex items-center px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
              <span className="text-sm font-medium text-gray-700">🇿🇦 +27</span>
            </div>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              placeholder="812345678 (without leading 0)"
              className={`rounded-l-none ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
              maxLength={9}
              autoComplete="tel"
            />
          </div>
          {formData.phoneNumber && (
            <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
              ✅ Full Number: +27{formData.phoneNumber}
            </div>
          )}
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
          <p className="text-xs text-blue-600">
            Your business contact number will be permanently saved for vendor services and communications.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorPhoneSection;
