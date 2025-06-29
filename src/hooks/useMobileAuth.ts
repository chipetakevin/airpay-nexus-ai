
import { useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userType: 'customer' | 'vendor' | 'admin';
  cardNumber?: string;
  vendorId?: string;
  adminId?: string;
  registeredPhone?: string; // Add registered phone to the interface
}

export const useMobileAuth = () => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const authFlag = localStorage.getItem('userAuthenticated');
      const credentials = localStorage.getItem('userCredentials');
      
      if (authFlag === 'true' && credentials) {
        try {
          const userCreds = JSON.parse(credentials);
          let userData = null;
          
          // Get user data based on type
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
              registeredPhone: parsedData.registeredPhone || userCreds.phone // Use registered phone
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

    checkAuthStatus();
    
    // Listen for storage changes to update auth state
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userAuthenticated' || e.key === 'userCredentials') {
        checkAuthStatus();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    currentUser,
    isAuthenticated,
    userType: currentUser?.userType
  };
};
