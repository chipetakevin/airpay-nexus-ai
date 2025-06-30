
import React from 'react';
import { VendorRegistrationProvider, useVendorRegistrationContext } from './registration/VendorRegistrationProvider';
import ExistingVendorSummary from './registration/ExistingVendorSummary';
import VendorRegistrationLayout from './registration/VendorRegistrationLayout';

const VendorRegistrationContent: React.FC = () => {
  const { existingRegistration, isFormCollapsed } = useVendorRegistrationContext();

  if (existingRegistration && isFormCollapsed) {
    return <ExistingVendorSummary />;
  }

  return <VendorRegistrationLayout />;
};

const VendorRegistration: React.FC = () => {
  return (
    <VendorRegistrationProvider>
      <VendorRegistrationContent />
    </VendorRegistrationProvider>
  );
};

export default VendorRegistration;
