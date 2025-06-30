
import React from 'react';
import { FormData } from '@/types/customerRegistration';
import RefactoredPhoneSection from './phone/RefactoredPhoneSection';

interface PhoneSectionProps {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  onInputChange: (field: keyof FormData, value: any) => void;
}

const PhoneSection = ({ formData, errors, onInputChange }: PhoneSectionProps) => {
  return (
    <RefactoredPhoneSection
      formData={formData}
      errors={errors}
      onInputChange={onInputChange}
    />
  );
};

export default PhoneSection;
