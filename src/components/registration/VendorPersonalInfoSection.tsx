
import React from 'react';
import VendorBasicInfoSection from './VendorBasicInfoSection';
import VendorPasswordSection from './VendorPasswordSection';

interface VendorPersonalInfoProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

const VendorPersonalInfoSection: React.FC<VendorPersonalInfoProps> = ({
  formData,
  errors,
  onInputChange,
  showPassword,
  togglePasswordVisibility
}) => {
  return (
    <div className="space-y-6">
      <VendorBasicInfoSection 
        formData={formData}
        errors={errors}
        onInputChange={onInputChange}
      />

      <VendorPasswordSection 
        formData={formData}
        errors={errors}
        onInputChange={onInputChange}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
      />
    </div>
  );
};

export default VendorPersonalInfoSection;
