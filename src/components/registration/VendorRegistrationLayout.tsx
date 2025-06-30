
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Store, ChevronUp } from 'lucide-react';
import VendorRegistrationForm from './VendorRegistrationForm';
import VendorRegistrationButton from './VendorRegistrationButton';
import VendorRegistrationAlerts from './VendorRegistrationAlerts';
import { useVendorRegistrationContext } from './VendorRegistrationProvider';

const VendorRegistrationLayout: React.FC = () => {
  const {
    location,
    setLocation,
    isAlertsCollapsed,
    existingRegistration,
    formData,
    errors,
    showPassword,
    togglePasswordVisibility,
    handleInputChange,
    handleBankSelect,
    handleFormSubmit,
    isRegistering,
    isFormValid,
    handleAlertsToggle,
    handleFormToggle
  } = useVendorRegistrationContext();

  return (
    <div className="min-h-screen pb-32 relative registration-scroll-container">
      <div className="space-y-6 registration-content-wrapper max-w-2xl mx-auto">
        {/* Header with Collapse Option */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
                <Store className="w-5 h-5" />
                Vendor Registration
              </CardTitle>
              {existingRegistration && (
                <Button
                  onClick={handleFormToggle}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <ChevronUp className="w-4 h-4" />
                  Collapse Form
                </Button>
              )}
            </div>
            <p className="text-sm text-blue-700">
              Join our vendor network with enhanced earning potential
            </p>
          </CardHeader>
        </Card>

        <VendorRegistrationAlerts 
          isCollapsed={isAlertsCollapsed} 
          onToggle={handleAlertsToggle}
          marketingConsent={formData.marketingConsent}
        />

        <VendorRegistrationForm
          formData={formData}
          errors={errors}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          handleInputChange={handleInputChange}
          handleBankSelect={handleBankSelect}
          onSubmit={handleFormSubmit}
          location={location}
          setLocation={setLocation}
        />
      </div>

      <VendorRegistrationButton
        onClick={handleFormSubmit}
        isRegistering={isRegistering}
        isFormValid={isFormValid()}
      />
    </div>
  );
};

export default VendorRegistrationLayout;
