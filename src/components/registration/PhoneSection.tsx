
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData, FormErrors } from '@/types/customerRegistration';

interface PhoneSectionProps {
  formData: FormData;
  errors: FormErrors;
  onInputChange: (field: keyof FormData, value: any) => void;
}

const PhoneSection: React.FC<PhoneSectionProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  return (
    <div className="space-y-2">
      <Label>Phone Number *</Label>
      <div className="flex gap-2">
        <select 
          value={formData.countryCode}
          onChange={(e) => onInputChange('countryCode', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md w-32"
        >
          <option value="+27">🇿🇦 +27</option>
          <option value="+1">🇺🇸 +1</option>
          <option value="+44">🇬🇧 +44</option>
          <option value="+91">🇮🇳 +91</option>
          <option value="+234">🇳🇬 +234</option>
        </select>
        <Input
          name="phoneNumber"
          autoComplete="tel"
          placeholder="Enter phone number"
          value={formData.phoneNumber}
          onChange={(e) => onInputChange('phoneNumber', e.target.value)}
          className={`flex-1 ${errors.phoneNumber ? 'border-red-500' : ''}`}
        />
      </div>
      {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
    </div>
  );
};

export default PhoneSection;
