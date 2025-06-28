
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
  const [isAlertsCollapsed, setIsAlertsCollapsed] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
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
  }, [formData.marketingConsent]);

  const handleAlertsToggle = () => {
    setIsAlertsCollapsed(!isAlertsCollapsed);
  };

  // Enhanced form submit with privilege-based redirection
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsRegistering(true);
    
    try {
      await handleSubmit(e);
      
      // After successful registration, determine redirect based on user type
      const userCredentials = localStorage.getItem('userCredentials');
      if (userCredentials) {
        const credentials = JSON.parse(userCredentials);
        const userType = credentials.userType;
        const isUnified = credentials.password === 'Malawi@1976';
        
        toast({
          title: "Registration Successful! 🎉",
          description: `Redirecting to your ${userType} dashboard...`,
        });

        // Privilege-based redirection logic
        setTimeout(() => {
          if (isUnified) {
            // Unified profiles get full admin access
            window.location.href = '/portal?tab=admin-reg&verified=true';
          } else if (userType === 'vendor') {
            // Vendors get access to deals with vendor privileges
            window.location.href = '/portal?tab=deals&user=vendor&verified=true';
          } else if (userType === 'admin') {
            // Admins get admin registration access
            window.location.href = '/portal?tab=admin-reg&verified=true';
          } else {
            // Customers get standard deals access
            window.location.href = '/portal?tab=deals&user=customer&verified=true';
          }
        }, 2000);
      } else {
        // Fallback to deals tab if no user type detected
        setTimeout(() => {
          window.location.href = '/portal?tab=deals&verified=true';
        }, 2000);
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Registration Error",
        description: "Please check all fields and try again.",
        variant: "destructive"
      });
    } finally {
      setIsRegistering(false);
    }
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

      {/* Enhanced functional register button with privilege-based redirection */}
      <div className="fixed-register-button">
        <div className="register-button-container">
          <Button 
            onClick={handleFormSubmit}
            type="submit"
            className={`mobile-submit-button transition-all duration-300 ${
              isFormValid() 
                ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' 
                : 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800'
            }`}
            disabled={isRegistering}
          >
            {isRegistering ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Completing Registration...
              </div>
            ) : (
              <>
                {isFormValid() ? 'Register & Start Shopping 🛒' : 'Complete Form to Continue 📝'}
              </>
            )}
          </Button>
          
          {isFormValid() && !isRegistering && (
            <div className="text-xs text-center mt-2 text-green-600 bg-green-50 p-2 rounded-lg">
              ✅ Ready to register! You'll be redirected to your personalized shopping experience.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorRegistration;
