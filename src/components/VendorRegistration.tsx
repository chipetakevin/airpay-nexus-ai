
import React from 'react';
import { VendorRegistrationProvider, useVendorRegistrationContext } from './registration/VendorRegistrationProvider';
import ExistingVendorSummary from './registration/ExistingVendorSummary';
import VendorRegistrationLayout from './registration/VendorRegistrationLayout';

const VendorRegistrationContent: React.FC = () => {
  const { existingRegistration, isFormCollapsed } = useVendorRegistrationContext();

  if (existingRegistration && isFormCollapsed) {
    return (
      <div className="w-full pt-4">
        <ExistingVendorSummary />
      </div>
    );
  }

  return <VendorRegistrationLayout />;
};

const VendorRegistration: React.FC = () => {
  return (
    <div className="w-full min-h-screen">
      <VendorRegistrationProvider>
        <VendorRegistrationContent />
      </VendorRegistrationProvider>
    </div>
  );
};

export default VendorRegistration;
