
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LocationDetector from './LocationDetector';
import AdminPersonalInfoSection from './registration/AdminPersonalInfoSection';
import AdminBankingSection from './registration/AdminBankingSection';
import AdminConsentSection from './registration/AdminConsentSection';
import AdminRegistrationAlerts from './registration/AdminRegistrationAlerts';
import LogoutSection from './auth/LogoutSection';
import { useAdminRegistration } from '@/hooks/useAdminRegistration';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const AdminRegistration = () => {
  const [location, setLocation] = useState('Detecting location...');
  const { formData, errors, handleInputChange, handleBankSelect, handleSubmit } = useAdminRegistration();
  const { currentUser, isAuthenticated } = useMobileAuth();

  // Show logout section if already authenticated
  if (isAuthenticated && currentUser) {
    const credentials = localStorage.getItem('userCredentials');
    const isUnifiedProfile = credentials ? JSON.parse(credentials).isUnifiedProfile : false;
    
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-green-600">✅ Already Authenticated</h2>
          <p className="text-gray-600">You are currently logged in as an administrator</p>
        </div>

        <LogoutSection 
          userType={currentUser.userType}
          userName={`${currentUser.firstName} ${currentUser.lastName}`}
          isUnifiedProfile={isUnifiedProfile}
          onLogout={() => window.location.reload()}
        />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">🚀 Quick Access</h3>
          <div className="space-y-2">
            <Button 
              onClick={() => window.location.href = '/portal?tab=admin'}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="sm"
            >
              Go to Admin Portal
            </Button>
            <Button 
              onClick={() => window.location.href = '/portal?tab=onecard'}
              variant="outline"
              className="w-full"
              size="sm"
            >
              Go to OneCard Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
