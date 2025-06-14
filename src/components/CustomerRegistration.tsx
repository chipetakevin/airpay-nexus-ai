
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, LogOut } from 'lucide-react';
import LocationDetector from './LocationDetector';
import PersonalInfoSection from './registration/PersonalInfoSection';
import PhoneSection from './registration/PhoneSection';
import BankingSection from './registration/BankingSection';
import ConsentSection from './registration/ConsentSection';
import RegistrationAlerts from './registration/RegistrationAlerts';
import { useCustomerRegistration } from '@/hooks/useCustomerRegistration';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useToast } from '@/hooks/use-toast';

const CustomerRegistration = () => {
  const [location, setLocation] = useState('Detecting location...');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { formData, errors, handleInputChange, handleSubmit } = useCustomerRegistration();
  const { isAuthenticated, currentUser } = useMobileAuth();
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
        
        toast({
          title: "Welcome Back! 👋",
          description: `Auto-filled your information, ${parsedData.firstName}!`,
        });
      } catch (error) {
        console.error('Error parsing saved user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('onecardUser');
    localStorage.removeItem('userCredentials');
    sessionStorage.clear();
    setIsLoggedIn(false);
    
    toast({
      title: "Logged Out Successfully",
      description: "You have been securely logged out.",
    });
    
    // Refresh the page to reset the form
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Divinely Mobile Header with Enhanced Blue Flashing Effect */}
      <div className="divinely-mobile-form bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500 animate-float" />
            <div>
              <h2 className="dm-default-text">
                🌟 Divinely Mobile (Best Deals) 🌟
              </h2>
              <Badge className="divinely-mobile-default mt-2">
                🏆 DM DEFAULT NETWORK - PREMIUM REWARDS
              </Badge>
            </div>
          </div>
          
          {isLoggedIn && (
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          )}
        </div>
        
        <div className="text-blue-700 font-medium">
          {isLoggedIn ? (
            <p>✅ Welcome back! Your information has been auto-filled securely.</p>
          ) : (
            <p>🎯 Join Divinely Mobile and start earning OneCard rewards on every purchase!</p>
          )}
        </div>
      </div>

      <RegistrationAlerts />

      <LocationDetector onLocationUpdate={setLocation} />

      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
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

        <BankingSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <ConsentSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        {/* Enhanced Remember Password Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800">Secure Auto-Login Enabled</h3>
              <p className="text-sm text-blue-600">
                Your login details are securely encrypted and stored for faster future access to Smart Deals.
              </p>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 animate-pulse-glow"
        >
          {isLoggedIn ? 'Update & Continue Shopping 🛒' : 'Register & Start Shopping 🛒'}
        </Button>
      </form>
    </div>
  );
};

export default CustomerRegistration;
