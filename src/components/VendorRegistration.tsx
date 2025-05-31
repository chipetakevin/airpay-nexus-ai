
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LocationDetector from './LocationDetector';
import VendorPersonalInfoSection from './registration/VendorPersonalInfoSection';
import VendorBusinessInfoSection from './registration/VendorBusinessInfoSection';
import VendorBankingSection from './registration/VendorBankingSection';
import VendorConsentSection from './registration/VendorConsentSection';
import VendorRegistrationAlerts from './registration/VendorRegistrationAlerts';
import { useVendorRegistration } from '@/hooks/useVendorRegistration';

const VendorRegistration = () => {
  const [location, setLocation] = useState('Detecting location...');
  const { formData, errors, handleInputChange, handleBankSelect, handleSubmit } = useVendorRegistration();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Vendor Registration</h2>
        <p className="text-gray-600">Join AirPay as a business partner and start earning with OneCard Gold rewards!</p>
      </div>

      <VendorRegistrationAlerts />

      <LocationDetector onLocationUpdate={setLocation} />

      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
        <VendorPersonalInfoSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
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
        />

        <VendorConsentSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <Button type="submit" className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800">
          Register & Start Shopping 🛒
        </Button>
      </form>
    </div>
  );
};

export default VendorRegistration;
