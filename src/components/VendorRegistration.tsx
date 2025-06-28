import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Store, ChevronDown, ChevronUp, CheckCircle, 
  AlertCircle, User, Clock, Shield 
} from 'lucide-react';
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
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [existingRegistration, setExistingRegistration] = useState(null);
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

  useEffect(() => {
    // Check for existing vendor registration
    const checkExistingRegistration = () => {
      const credentials = localStorage.getItem('userCredentials');
      const vendorData = localStorage.getItem('onecardVendor');
      
      if (credentials && vendorData) {
        try {
          const parsedCredentials = JSON.parse(credentials);
          const parsedVendorData = JSON.parse(vendorData);
          
          if (parsedCredentials.userType === 'vendor' && parsedVendorData.firstName) {
            setExistingRegistration({
              firstName: parsedVendorData.firstName,
              lastName: parsedVendorData.lastName,
              email: parsedVendorData.email,
              companyName: parsedVendorData.companyName,
              vendorId: parsedVendorData.vendorId,
              registrationDate: parsedVendorData.registrationDate || new Date().toISOString()
            });
            setIsFormCollapsed(true);
          }
        } catch (error) {
          console.error('Error checking existing vendor registration:', error);
        }
      }
    };

    checkExistingRegistration();
  }, []);

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

  const handleNewRegistration = () => {
    setIsFormCollapsed(false);
    setExistingRegistration(null);
    toast({
      title: "New Registration",
      description: "Starting fresh vendor registration process.",
    });
  };

  const handleFormToggle = () => {
    setIsFormCollapsed(!isFormCollapsed);
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

  if (existingRegistration && isFormCollapsed) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Existing Registration Summary */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
                <CheckCircle className="w-5 h-5" />
                Vendor Registration Complete
              </CardTitle>
              <Badge className="bg-blue-100 text-blue-700">
                <Store className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Business Owner</label>
                <p className="font-semibold text-gray-900">
                  {existingRegistration.firstName} {existingRegistration.lastName}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Vendor ID</label>
                <p className="font-mono text-sm text-blue-600 font-semibold">
                  {existingRegistration.vendorId}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Company Name</label>
                <p className="text-sm text-gray-700">
                  {existingRegistration.companyName}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Registration Date</label>
                <p className="text-sm text-gray-700">
                  {new Date(existingRegistration.registrationDate).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs text-gray-600">Email Address</label>
                <p className="text-sm text-gray-700">
                  {existingRegistration.email}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-blue-200">
              <Button
                onClick={handleFormToggle}
                variant="outline"
                className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                <ChevronDown className="w-4 h-4" />
                Edit Registration Details
              </Button>
              <Button
                onClick={handleNewRegistration}
                variant="outline"
                className="flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-100"
              >
                <Store className="w-4 h-4" />
                Register New Vendor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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

export default VendorRegistration;
