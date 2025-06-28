
import React, { useState, useEffect } from 'react';
import VendorRegistrationHeader from './registration/VendorRegistrationHeader';
import VendorRegistrationForm from './registration/VendorRegistrationForm';
import VendorRegistrationButton from './registration/VendorRegistrationButton';
import VendorRegistrationAlerts from './registration/VendorRegistrationAlerts';
import { useVendorRegistration } from '@/hooks/useVendorRegistration';
import { useVendorRegistrationSubmit } from '@/hooks/useVendorRegistrationSubmit';
import { useToast } from '@/hooks/use-toast';

const VendorRegistration = () => {
  const [location, setLocation] = useState('Detecting location...');
  const [isAlertsCollapsed, setIsAlertsCollapsed] = useState(true);
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

  const { isRegistering, handleFormSubmit } = useVendorRegistrationSubmit(handleSubmit);

  // Stable effect for marketing consent changes
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (formData.marketingConsent && !isAlertsCollapsed) {
      timeoutId = setTimeout(() => {
        setIsAlertsCollapsed(true);
        toast({
          title: "Registration Info Collapsed 📋",
          description: "Collapsed for better navigation. Click to expand if needed.",
          duration: 2000
        });
      }, 300);
    } else if (!formData.marketingConsent && isAlertsCollapsed) {
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
  }, [formData.marketingConsent, isAlertsCollapsed, toast]);

  const handleAlertsToggle = () => {
    setIsAlertsCollapsed(!isAlertsCollapsed);
  };

  // Check if form is ready for submission
  const isFormValid = () => {
    const hasRequiredFields = formData.firstName && 
                             formData.lastName && 
                             formData.email && 
                             formData.phoneNumber && 
                             formData.companyName &&
                             formData.agreeTerms;
    
    const hasNoErrors = Object.keys(errors).length === 0;
    
    return hasRequiredFields && hasNoErrors;
  };

  return (
    <div className="min-h-screen pb-32 relative registration-scroll-container">
      <div className="space-y-6 registration-content-wrapper">
        <VendorRegistrationHeader />

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

export default VendorRegistration;
