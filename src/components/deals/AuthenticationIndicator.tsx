
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Shield, ShoppingCart, User } from 'lucide-react';

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  cardNumber?: string;
  vendorId?: string;
  adminId?: string;
  cardType?: string;
  userType?: string;
}

const AuthenticationIndicator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const authFlag = localStorage.getItem('userAuthenticated');
      const credentials = localStorage.getItem('userCredentials');
      
      if (authFlag === 'true' && credentials) {
        setIsAuthenticated(true);
        
        // Load user data based on type
        const userCreds = JSON.parse(credentials);
        let storedData = null;
        
        if (userCreds.userType === 'customer') {
          storedData = localStorage.getItem('onecardUser');
        } else if (userCreds.userType === 'vendor') {
          storedData = localStorage.getItem('onecardVendor');
        } else if (userCreds.userType === 'admin') {
          storedData = localStorage.getItem('onecardAdmin');
        }
        
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData({ ...parsedData, userType: userCreds.userType });
        }
      }
    };

    checkAuthentication();
  }, []);

  const handleAcknowledge = () => {
    setAcknowledged(true);
    // Store acknowledgment for this session
    sessionStorage.setItem('dealsAuthAcknowledged', 'true');
  };

  // Check if already acknowledged in this session
  useEffect(() => {
    const alreadyAcknowledged = sessionStorage.getItem('dealsAuthAcknowledged');
    if (alreadyAcknowledged === 'true') {
      setAcknowledged(true);
    }
  }, []);

  if (!isAuthenticated || acknowledged) {
    return null;
  }

  const getUserTypeLabel = () => {
    switch (userData?.userType) {
      case 'customer': return 'Customer';
      case 'vendor': return 'Vendor';
      case 'admin': return 'Administrator';
      default: return 'User';
    }
  };

  const getCardInfo = () => {
    if (userData?.cardNumber) return `****${userData.cardNumber.slice(-4)}`;
    if (userData?.vendorId) return `****${userData.vendorId.slice(-4)}`;
    if (userData?.adminId) return `****${userData.adminId.slice(-4)}`;
    return '';
  };

  return (
    <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-lg">
      <CardContent className="p-3 sm:p-4">
        {/* Mobile Layout */}
        <div className="block sm:hidden space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-800 text-sm">Authentication Verified</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-600">{getUserTypeLabel()}</span>
            </div>
          </div>
          
          <div className="text-xs text-gray-600">
            <div className="font-medium">{userData?.firstName} {userData?.lastName}</div>
            <div>OneCard {getCardInfo()}</div>
          </div>
          
          <Button
            onClick={handleAcknowledge}
            className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2 h-9"
            size="sm"
          >
            <Check className="w-4 h-4" />
            <span>Start Shopping</span>
            <ShoppingCart className="w-4 h-4" />
          </Button>
          
          <div className="text-xs text-green-700 text-center">
            ✅ Fast checkout • Auto-fill • Instant purchases
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Authentication Verified</span>
              </div>
              <div className="text-sm text-gray-600">
                {userData?.firstName} {userData?.lastName} | {getUserTypeLabel()} | OneCard {getCardInfo()}
              </div>
            </div>
            
            <Button
              onClick={handleAcknowledge}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
              size="sm"
            >
              <Check className="w-4 h-4" />
              <span>Start Shopping</span>
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="mt-2 text-xs text-green-700">
            ✅ Fast checkout enabled • Auto-fill ready • Instant purchases available
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthenticationIndicator;
