
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LocationDetector from './LocationDetector';
import AdminPersonalInfoSection from './registration/AdminPersonalInfoSection';
import AdminBankingSection from './registration/AdminBankingSection';
import AdminConsentSection from './registration/AdminConsentSection';
import AdminRegistrationAlerts from './registration/AdminRegistrationAlerts';
import { useAdminRegistration } from '@/hooks/useAdminRegistration';

const AdminRegistration = () => {
  const [location, setLocation] = useState('Detecting location...');
  const { formData, errors, handleInputChange, handleBankSelect, handleSubmit } = useAdminRegistration();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-red-600">🔐 Admin Registration</h2>
        <p className="text-gray-600">Restricted registration for authorized administrators only</p>
      </div>

      <AdminRegistrationAlerts />

      <LocationDetector onLocationUpdate={setLocation} />

      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
        <AdminPersonalInfoSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <AdminBankingSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
          onBankSelect={handleBankSelect}
        />

        <AdminConsentSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <Button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
          Register & Start Shopping 🛒
        </Button>
      </form>
    </div>
  );
};

export default AdminRegistration;
