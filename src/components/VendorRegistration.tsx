
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import LocationDetector from './LocationDetector';
import VendorPersonalInfoSection from './registration/VendorPersonalInfoSection';
import VendorBusinessInfoSection from './registration/VendorBusinessInfoSection';
import VendorBankingSection from './registration/VendorBankingSection';
import VendorConsentSection from './registration/VendorConsentSection';
import VendorRegistrationAlerts from './registration/VendorRegistrationAlerts';
import { useVendorRegistration } from '@/hooks/useVendorRegistration';
import { useToast } from '@/hooks/use-toast';

const VendorRegistration = () => {
  const [location, setLocation] = useState('Detecting location...');
  const [isAlertsCollapsed, setIsAlertsCollapsed] = useState(false);
  const { toast } = useToast();
  
  const { 
    formData, 
    errors, 
    showPassword, 
    togglePasswordVisibility, 
    handleInputChange, 
    handleBankSelect, 
    handleSubmit 
  } = useVendorRegistration();

  // Intelligent collapse behavior when marketing consent is given
  useEffect(() => {
    if (formData.marketingConsent && !isAlertsCollapsed) {
      setIsAlertsCollapsed(true);
      toast({
        title: "Registration Info Collapsed 📋",
        description: "Collapsed for better navigation. Click to expand if needed.",
        duration: 2000
      });
    } else if (!formData.marketingConsent && isAlertsCollapsed) {
      setIsAlertsCollapsed(false);
      toast({
        title: "Registration Info Expanded 📋",
        description: "Expanded to show helpful registration information.",
        duration: 2000
      });
    }
  }, [formData.marketingConsent, isAlertsCollapsed, toast]);

  const handleAlertsToggle = () => {
    setIsAlertsCollapsed(!isAlertsCollapsed);
  };

  return (
    <div className="min-h-screen pb-32 relative">
      <div className="space-y-6">
        {/* Mobile-optimized header */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white p-4 sm:p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-3">
            <div className="text-2xl sm:text-3xl">🛒</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1">Register & Start Shopping</h2>
              <p className="text-yellow-100 text-sm sm:text-base">Join AirPay as a business partner and start earning with OneCard Gold rewards!</p>
            </div>
          </div>
        </div>

        <VendorRegistrationAlerts 
          isCollapsed={isAlertsCollapsed} 
          onToggle={handleAlertsToggle}
        />

        <LocationDetector onLocationUpdate={setLocation} />

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
          <VendorPersonalInfoSection 
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />

          <VendorBusinessInfoSection 
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
          />

          <VendorBankingSection 
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onBankSelect={handleBankSelect}
            marketingConsent={formData.marketingConsent}
          />

          <VendorConsentSection 
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
          />
        </form>
      </div>

      {/* Fixed Register Button at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-lg py-6 font-semibold"
          >
            Register & Start Shopping 🛒
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VendorRegistration;
