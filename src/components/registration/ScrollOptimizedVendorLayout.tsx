
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Store, ChevronUp } from 'lucide-react';
import VendorRegistrationForm from './VendorRegistrationForm';
import VendorRegistrationButton from './VendorRegistrationButton';
import CompactRegistrationInfo from './CompactRegistrationInfo';
import { useVendorRegistrationContext } from './VendorRegistrationProvider';

const ScrollOptimizedVendorLayout: React.FC = () => {
  const {
    location,
    setLocation,
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
    handleFormToggle
  } = useVendorRegistrationContext();

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Sticky header for better navigation */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b mb-4">
        <Card className="border-blue-200 bg-blue-50 mb-0">
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
                  Collapse
                </Button>
              )}
            </div>
            <p className="text-sm text-blue-700">
              Join our vendor network with enhanced earning potential
            </p>
          </CardHeader>
        </Card>
      </div>

      {/* Scrollable content area */}
      <div className="space-y-4 pb-20">
        {/* Compact registration info */}
        <CompactRegistrationInfo 
          marketingConsent={formData.marketingConsent}
          location={location}
        />

        {/* Main form */}
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

      {/* Fixed bottom button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t p-4 z-20">
        <div className="max-w-2xl mx-auto">
          <VendorRegistrationButton
            onClick={handleFormSubmit}
            isRegistering={isRegistering}
            isFormValid={isFormValid()}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollOptimizedVendorLayout;
