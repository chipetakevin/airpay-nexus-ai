
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface UnifiedUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userType: 'customer' | 'vendor' | 'admin';
  cardNumber?: string;
  vendorId?: string;
  adminId?: string;
  registeredPhone?: string;
  isUnifiedProfile?: boolean; // Special flag for admin/vendor/customer unity
}

const UNIFIED_PASSWORD = 'Malawi@1976';

export const useUnifiedAuth = () => {
  const [currentUser, setCurrentUser] = useState<UnifiedUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAuthStatus();
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userAuthenticated' || e.key === 'userCredentials') {
        checkAuthStatus();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const checkAuthStatus = () => {
    const authFlag = localStorage.getItem('userAuthenticated');
    const credentials = localStorage.getItem('userCredentials');
    
    if (authFlag === 'true' && credentials) {
      try {
        const userCreds = JSON.parse(credentials);
        let userData = null;
        
        if (userCreds.userType === 'customer') {
          userData = localStorage.getItem('onecardUser');
        } else if (userCreds.userType === 'vendor') {
          userData = localStorage.getItem('onecardVendor');
        } else if (userCreds.userType === 'admin') {
          userData = localStorage.getItem('onecardAdmin');
        }
        
        if (userData) {
          const parsedData = JSON.parse(userData);
          setCurrentUser({
            id: parsedData.cardNumber || parsedData.vendorId || parsedData.adminId || 'user-id',
            email: userCreds.email,
            firstName: parsedData.firstName,
            lastName: parsedData.lastName,
            userType: userCreds.userType,
            cardNumber: parsedData.cardNumber,
            vendorId: parsedData.vendorId,
            adminId: parsedData.adminId,
            registeredPhone: parsedData.registeredPhone || userCreds.phone,
            isUnifiedProfile: userCreds.password === UNIFIED_PASSWORD
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  };

  const loginAsVendor = async (email: string, password: string) => {
    try {
      // Check if vendor exists
      const vendorData = {
        firstName: 'Admin',
        lastName: 'Vendor',
        email,
        vendorId: `VN${Math.random().toString().substr(2, 8)}`,
        businessName: 'Admin Business',
        phone: '+265991234567',
        balance: 0
      };

      const userCredentials = {
        email,
        password,
        userType: 'vendor'
      };

      // Store vendor data
      localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
      localStorage.setItem('onecardVendor', JSON.stringify(vendorData));
      localStorage.setItem('userAuthenticated', 'true');

      // Update state
      setCurrentUser({
        id: vendorData.vendorId,
        email,
        firstName: vendorData.firstName,
        lastName: vendorData.lastName,
        userType: 'vendor',
        vendorId: vendorData.vendorId,
        registeredPhone: vendorData.phone,
        isUnifiedProfile: password === UNIFIED_PASSWORD
      });
      setIsAuthenticated(true);

      toast({
        title: "Vendor Login Successful! 🎉",
        description: password === UNIFIED_PASSWORD ? "Unified profile access enabled" : "Welcome to Vendor Portal",
      });

      return { success: true };
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An error occurred during vendor login",
        variant: "destructive"
      });
      return { success: false };
    }
  };

  const switchToUserType = (newUserType: 'customer' | 'vendor' | 'admin') => {
    if (!currentUser?.isUnifiedProfile) {
      toast({
        title: "Access Denied",
        description: "Only unified profiles can switch user types",
        variant: "destructive"
      });
      return false;
    }

    try {
      const currentCredentials = JSON.parse(localStorage.getItem('userCredentials') || '{}');
      const updatedCredentials = {
        ...currentCredentials,
        userType: newUserType
      };

      localStorage.setItem('userCredentials', JSON.stringify(updatedCredentials));
      
      // Update current user
      setCurrentUser(prev => prev ? { ...prev, userType: newUserType } : null);

      toast({
        title: "Profile Switched",
        description: `Now accessing as ${newUserType}`,
      });

      return true;
    } catch (error) {
      console.error('Error switching profile:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userCredentials');
    localStorage.removeItem('onecardUser');
    localStorage.removeItem('onecardVendor');
    localStorage.removeItem('onecardAdmin');
    setCurrentUser(null);
    setIsAuthenticated(false);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return {
    currentUser,
    isAuthenticated,
    userType: currentUser?.userType,
    isUnifiedProfile: currentUser?.isUnifiedProfile,
    loginAsVendor,
    switchToUserType,
    logout,
    checkAuthStatus
  };
};
