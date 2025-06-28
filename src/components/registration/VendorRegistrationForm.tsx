
import React from 'react';
import VendorPersonalInfoSection from './VendorPersonalInfoSection';
import VendorBusinessInfoSection from './VendorBusinessInfoSection';
import VendorBankingSection from './VendorBankingSection';
import VendorConsentSection from './VendorConsentSection';
import LocationDetector from '../LocationDetector';

interface VendorRegistrationFormProps {
  formData: any;
  errors: any;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  handleInputChange: (field: string, value: any) => void;
  handleBankSelect: (bankName: string, routing: string, branchCode: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  location: string;
  setLocation: (location: string) => void;
}

const VendorRegistrationForm: React.FC<VendorRegistrationFormProps> = ({
  formData,
  errors,
  showPassword,
  togglePasswordVisibility,
  handleInputChange,
  handleBankSelect,
  onSubmit,
  location,
  setLocation
}) => {
  return (
    <>
      <LocationDetector onLocationUpdate={setLocation} />

      <form onSubmit={onSubmit} className="space-y-6 mobile-form-section" autoComplete="on">
        <VendorPersonalInfoSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />

        <VendorBusinessInfoSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <VendorBankingSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
          onBankSelect={handleBankSelect}
          marketingConsent={formData.marketingConsent}
        />

        <VendorConsentSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />
      </form>
    </>
  );
};

export default VendorRegistrationForm;
