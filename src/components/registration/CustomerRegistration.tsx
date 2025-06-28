import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import LocationDetector from '../LocationDetector';
import PersonalInfoSection from './PersonalInfoSection';
import PhoneSection from './PhoneSection';
import EnhancedBankingSection from './EnhancedBankingSection';
import ConsentSection from './ConsentSection';
import RegistrationAlerts from './RegistrationAlerts';
import PermanentProfileInfo from './PermanentProfileInfo';
import { useCustomerRegistration } from '@/hooks/useCustomerRegistration';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { usePhoneAutofill } from '@/hooks/usePhoneAutofill';
import { useRegistrationGuard } from '@/hooks/useRegistrationGuard';
import { useBankingAutoSave } from '@/hooks/useBankingAutoSave';
import { useToast } from '@/hooks/use-toast';

const CustomerRegistration = () => {
  const [location, setLocation] = useState('Detecting location...');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, errors, handleInputChange, handleSubmit } = useCustomerRegistration();
  const { isAuthenticated, currentUser } = useMobileAuth();
  const { saveBankingInfo, detectedPhone } = usePhoneAutofill();
  const { userProfile, saveProfilePermanently, checkRegistrationStatus } = useRegistrationGuard();
  const { saveBankingInfo: savePermanentBanking, getBankingInfo } = useBankingAutoSave();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in and auto-fill form
    const userData = localStorage.getItem('onecardUser');
    const userAuth = localStorage.getItem('userAuthenticated');
    
    if (userAuth === 'true' && userData) {
      setIsLoggedIn(true);
      try {
        const parsedData = JSON.parse(userData);
        // Auto-fill form with existing user data
        Object.keys(parsedData).forEach(key => {
          if (formData.hasOwnProperty(key) && parsedData[key]) {
            handleInputChange(key as keyof typeof formData, parsedData[key]);
          }
        });
        
        // Also auto-fill phone number from registered phone
        if (parsedData.registeredPhone && !formData.phoneNumber) {
          const cleanPhone = parsedData.registeredPhone.replace('+27', '').replace(/^0/, '');
          handleInputChange('phoneNumber', cleanPhone);
        }
        
        // Auto-fill banking information
        const savedBanking = getBankingInfo();
        if (savedBanking.bankName && !formData.bankName) {
          handleInputChange('bankName', savedBanking.bankName);
          handleInputChange('accountNumber', savedBanking.accountNumber);
          handleInputChange('branchCode', savedBanking.branchCode);
        }
        
        toast({
          title: "Welcome Back! 👋",
          description: `Auto-filled your information, ${parsedData.firstName}! Profile & banking info permanently saved.`,
        });
      } catch (error) {
        console.error('Error parsing saved user data:', error);
      }
    } else {
      // Auto-fill banking for new users
      const savedBanking = getBankingInfo();
      if (savedBanking.bankName) {
        handleInputChange('bankName', savedBanking.bankName);
        handleInputChange('accountNumber', savedBanking.accountNumber);
        handleInputChange('branchCode', savedBanking.branchCode);
        
        toast({
          title: "Banking Info Restored! 💳",
          description: "Your saved banking information has been auto-filled.",
        });
      }
    }

    // Auto-fill detected phone number if available
    if (detectedPhone && !formData.phoneNumber && !isLoggedIn) {
      handleInputChange('phoneNumber', detectedPhone);
    }
  }, [detectedPhone, isLoggedIn]);

  const handleLogout = () => {
    // Don't clear user data - keep it permanently saved
    localStorage.removeItem('userAuthenticated');
    sessionStorage.clear();
    setIsLoggedIn(false);
    
    toast({
      title: "Logged Out Successfully",
      description: "Your profile information remains permanently saved for future logins.",
    });
    
    // Refresh the page to reset the form
    window.location.reload();
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save banking information permanently before submission
      if (formData.bankName && formData.accountNumber) {
        savePermanentBanking({
          bankName: formData.bankName,
          branchCode: formData.branchCode,
          accountNumber: formData.accountNumber,
          routingNumber: formData.routingNumber
        });
        
        // Also save using the legacy method for compatibility
        saveBankingInfo({
          bankName: formData.bankName,
          branchCode: formData.branchCode,
          accountNumber: formData.accountNumber
        });
      }
      
      // Save all profile data permanently
      saveProfilePermanently({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: `+27${formData.phoneNumber}`,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        isComplete: true
      });
      
      // Call the original submit handler
      await handleSubmit(e);
      
      // Refresh registration status
      setTimeout(() => {
        checkRegistrationStatus();
      }, 1000);
      
      toast({
        title: "Registration Complete! 🎉",
        description: "All information permanently saved. Ready for smart deals shopping!",
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Error",
        description: "Please check your information and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto px-2 sm:px-4">
      {/* Mobile-optimized header */}
      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Customer Registration
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Join AirPay and unlock smart deals with OneCard rewards
        </p>
      </div>

      {/* Logout button for logged in users */}
      {isLoggedIn && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
          <div className="text-sm text-green-700 flex-1">
            ✅ Profile permanently saved - ready for payments & services
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-red-300 text-red-600 hover:bg-red-50 w-full sm:w-auto"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout (Profile Saved)
          </Button>
        </div>
      )}

      <RegistrationAlerts location={location} />

      <LocationDetector onLocationUpdate={setLocation} />

      <form onSubmit={handleCustomSubmit} className="space-y-4 sm:space-y-6" autoComplete="on">
        <PersonalInfoSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <PhoneSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <EnhancedBankingSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <ConsentSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        {/* Enhanced Permanent Profile Save Section - Now Collapsible */}
        <PermanentProfileInfo showBankingDetails={true} />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-base sm:text-lg py-4 sm:py-6 font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            isLoggedIn ? 'Update Profile & Enable All Services 🚀' : 'Register & Enable All Services 🚀'
          )}
        </Button>

        {/* Mobile-friendly WhatsApp Integration Notice */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">📱</span>
            <span className="font-semibold text-green-800">Mobile & WhatsApp Ready!</span>
          </div>
          <p className="text-sm text-green-700">
            This registration works seamlessly on mobile devices and integrates with WhatsApp for instant service access.
          </p>
        </div>
      </form>
    </div>
  );
};

export default CustomerRegistration;
