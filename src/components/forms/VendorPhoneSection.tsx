
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone } from 'lucide-react';
import { VendorFormData } from '@/types/vendorRegistration';
import EnhancedPhoneInput from '@/components/forms/EnhancedPhoneInput';

interface VendorPhoneSectionProps {
  formData: VendorFormData;
  errors: Partial<Record<keyof VendorFormData, string>>;
  onInputChange: (field: keyof VendorFormData, value: any) => void;
}

const VendorPhoneSection = ({ formData, errors, onInputChange }: VendorPhoneSectionProps) => {
  return (
    <Card className="border-green-200 bg-green-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-green-800">
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
          Business Contact Number (Required)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EnhancedPhoneInput
          value={formData.phoneNumber}
          onChange={(value) => onInputChange('phoneNumber', value)}
          onCountryCodeChange={(code) => onInputChange('countryCode', code)}
          userType="vendor"
          error={errors.phoneNumber}
          countryCode={formData.countryCode}
          autoFill={true}
          showSuggestions={true}
          label="Business Phone Number *"
          placeholder="Enter business contact number"
        />
      </CardContent>
    </Card>
  );
};

export default VendorPhoneSection;
