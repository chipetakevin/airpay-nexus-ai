
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
  const [isAlertsCollapsed, setIsAlertsCollapsed] = useState(true); // Start collapsed for better UX
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

  // Stable effect for marketing consent changes - prevent infinite loops
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (formData.marketingConsent && !isAlertsCollapsed) {
      // Delay collapse to prevent race conditions
      timeoutId = setTimeout(() => {
        setIsAlertsCollapsed(true);
        toast({
          title: "Registration Info Collapsed 📋",
          description: "Collapsed for better navigation. Click to expand if needed.",
          duration: 2000
        });
      }, 300);
    } else if (!formData.marketingConsent && isAlertsCollapsed) {
      // Only expand if user explicitly unchecked consent
      timeoutId = setTimeout(() => {
        setIsAlertsCollapsed(false);
        toast({
          title: "Registration Info Expanded 📋",
          description: "Expanded to show helpful registration information.",
          duration: 2000
        });
      }, 100);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [formData.marketingConsent]); // Simplified dependency

  const handleAlertsToggle = () => {
    setIsAlertsCollapsed(!isAlertsCollapsed);
  };

  // Enhanced form submit with better error handling
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      handleSubmit(e);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "Please check all fields and try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen pb-32 relative registration-scroll-container">
      <div className="space-y-6 registration-content-wrapper">
        {/* Enhanced mobile-optimized header */}
        <div className="mobile-registration-header">
          <div className="flex items-center gap-3">
            <div className="text-2xl sm:text-3xl">🛒</div>
            <div>
              <h2 className="mobile-registration-title">Register & Start Shopping</h2>
              <p className="mobile-registration-subtitle">Join AirPay as a business partner and start earning with OneCard Gold rewards!</p>
            </div>
          </div>
        </div>

        <VendorRegistrationAlerts 
          isCollapsed={isAlertsCollapsed} 
          onToggle={handleAlertsToggle}
        />

        <LocationDetector onLocationUpdate={setLocation} />

        <form onSubmit={handleFormSubmit} className="space-y-6 mobile-form-section" autoComplete="on">
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

      {/* Enhanced fixed register button - always visible */}
      <div className="fixed-register-button">
        <div className="register-button-container">
          <Button 
            onClick={handleFormSubmit}
            type="submit"
            className="mobile-submit-button bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800"
            disabled={Object.keys(errors).length > 0}
          >
            Register & Start Shopping 🛒
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VendorRegistration;
