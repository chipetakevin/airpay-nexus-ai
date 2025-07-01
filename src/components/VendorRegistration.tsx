
import React from 'react';
import { VendorRegistrationProvider, useVendorRegistrationContext } from './registration/VendorRegistrationProvider';
import ExistingVendorSummary from './registration/ExistingVendorSummary';
import VendorRegistrationLayout from './registration/VendorRegistrationLayout';

const VendorRegistrationContent: React.FC = () => {
  const context = useVendorRegistrationContext();
  
  // Handle case where context might not be available
  if (!context) {
    return <VendorRegistrationLayout />;
  }
  
  const { existingRegistration, isFormCollapsed } = context;

  if (existingRegistration && isFormCollapsed) {
    return <ExistingVendorSummary />;
  }

  return <VendorRegistrationLayout />;
};

const VendorRegistration: React.FC = () => {
  return (
    <VendorRegistrationProvider>
      <div className="min-h-screen bg-gray-50">
        <VendorRegistrationContent />
      </div>
    </VendorRegistrationProvider>
  );
};

export default VendorRegistration;
