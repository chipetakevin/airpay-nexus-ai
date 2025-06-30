
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone } from 'lucide-react';
import { FormData } from '@/types/customerRegistration';
import EnhancedPhoneInput from '@/components/forms/EnhancedPhoneInput';

interface RefactoredPhoneSectionProps {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  onInputChange: (field: keyof FormData, value: any) => void;
}

const RefactoredPhoneSection = ({ formData, errors, onInputChange }: RefactoredPhoneSectionProps) => {
  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-blue-800">
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
          Mobile Number *
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EnhancedPhoneInput
          value={formData.phoneNumber}
          onChange={(value) => onInputChange('phoneNumber', value)}
          onCountryCodeChange={(code) => onInputChange('countryCode', code)}
          userType="customer"
          error={errors.phoneNumber}
          countryCode={formData.countryCode}
          autoFill={true}
          showSuggestions={true}
          label="Mobile Number *"
          placeholder="832466539"
        />
      </CardContent>
    </Card>
  );
};

export default RefactoredPhoneSection;
