
import React from 'react';
import UnifiedMobileNavigation from './UnifiedMobileNavigation';
import RegistrationGate from './auth/RegistrationGate';

const RicaServicesSection = () => {
  return (
    <RegistrationGate 
      serviceName="RICA services and mobile navigation"
      requireBankingInfo={false}
      allowedPaths={['/portal?tab=registration']}
    >
      <UnifiedMobileNavigation />
    </RegistrationGate>
  );
};

export default RicaServicesSection;
