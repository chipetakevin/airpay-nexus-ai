
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LocationDetector from './LocationDetector';
import PersonalInfoSection from './registration/PersonalInfoSection';
import PhoneSection from './registration/PhoneSection';
import BankingSection from './registration/BankingSection';
import ConsentSection from './registration/ConsentSection';
import RegistrationAlerts from './registration/RegistrationAlerts';
import { useCustomerRegistration } from '@/hooks/useCustomerRegistration';

const CustomerRegistration = () => {
  const [location, setLocation] = useState('Detecting location...');
  const { formData, errors, handleInputChange, handleSubmit } = useCustomerRegistration();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Customer Registration</h2>
        <p className="text-gray-600">Join AirPay and start earning OneCard rewards on every purchase!</p>
      </div>

      <RegistrationAlerts />

      <LocationDetector onLocationUpdate={setLocation} />

      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
        <PersonalInfoSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <PhoneSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <BankingSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <ConsentSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Register & Start Shopping 🛒
        </Button>
      </form>
    </div>
  );
};

export default CustomerRegistration;
