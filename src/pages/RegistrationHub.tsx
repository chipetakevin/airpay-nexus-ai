import React from 'react';
import MobileLayout from '@/components/navigation/MobileLayout';
import SmartServicesNavigation from '@/components/navigation/SmartServicesNavigation';

const RegistrationHub = () => {
  return (
    <MobileLayout showTopNav={false} showBottomNav={true}>
      <SmartServicesNavigation 
        defaultTab="register"
        showRegistrationForms={true}
        backgroundGradient="from-green-400 via-blue-500 to-purple-600"
      />
    </MobileLayout>
  );
};

export default RegistrationHub;