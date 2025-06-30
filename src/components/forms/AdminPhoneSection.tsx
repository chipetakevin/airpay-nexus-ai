
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Shield } from 'lucide-react';
import EnhancedPhoneInput from '@/components/forms/EnhancedPhoneInput';

interface AdminPhoneSectionProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
}

const AdminPhoneSection = ({ formData, errors, onInputChange }: AdminPhoneSectionProps) => {
  return (
    <Card className="border-purple-200 bg-purple-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-purple-800">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
          Administrator Contact Number *
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EnhancedPhoneInput
          value={formData.phoneNumber || ''}
          onChange={(value) => onInputChange('phoneNumber', value)}
          onCountryCodeChange={(code) => onInputChange('countryCode', code)}
          userType="admin"
          error={errors.phoneNumber}
          countryCode={formData.countryCode || '+27'}
          autoFill={true}
          showSuggestions={true}
          label="Administrator Contact Number *"
          placeholder="832466539"
        />
      </CardContent>
    </Card>
  );
};

export default AdminPhoneSection;
