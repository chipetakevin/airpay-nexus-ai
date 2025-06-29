
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDeviceStorage } from './useDeviceStorage';

interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'customer' | 'vendor' | 'admin';
  isUnifiedProfile: boolean;
  persistentSession: boolean;
}

export const useEnhancedAuth = () => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState<Date | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();
  const { saveProfilePermanently, getProfileByEmail } = useDeviceStorage();

  const PERSISTENT_SESSION_HOURS = 24;
  const UNIFIED_PASSWORD = 'Malawi@1976';

  const createPersistentSession = useCallback((userData: any, userCredentials: any) => {
    try {
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + PERSISTENT_SESSION_HOURS);

      const sessionData = {
        user: userData,
        credentials: userCredentials,
        expiryTime: expiryTime.toISOString(),
        deviceSession: true
      };

      localStorage.setItem('persistentAuthSession', JSON.stringify(sessionData));
      localStorage.setItem('userAuthenticated', 'true');
      setSessionExpiry(expiryTime);
      setIsAuthenticated(true);

      // Save profile permanently to device
      saveProfilePermanently({
        id: userData.cardNumber || userData.vendorId || userData.adminId,
        userType: userCredentials.userType,
        email: userCredentials.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.registeredPhone || userCredentials.phone,
        registrationData: userData,
        isComplete: true
      });

      toast({
        title: "Persistent Session Created",
        description: `You'll stay logged in for ${PERSISTENT_SESSION_HOURS} hours, even if you close the browser.`,
      });
    } catch (error) {
      console.error('Error creating persistent session:', error);
    }
  }, [saveProfilePermanently, toast]);

  const checkPersistentSession = useCallback(() => {
    try {
      const sessionData = localStorage.getItem('persistentAuthSession');
      if (!sessionData) return false;

      const parsed = JSON.parse(sessionData);
      const expiryTime = new Date(parsed.expiryTime);
      
      if (expiryTime <= new Date()) {
        clearSession();
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive"
        });
        return false;
      }

      // Restore session
      const authUser: AuthUser = {
        id: parsed.user.cardNumber || parsed.user.vendorId || parsed.user.adminId,
        email: parsed.credentials.email,
        firstName: parsed.user.firstName,
        lastName: parsed.user.lastName,
        userType: parsed.credentials.userType,
        isUnifiedProfile: parsed.credentials.password === UNIFIED_PASSWORD,
        persistentSession: true
      };

      setCurrentUser(authUser);
      setIsAuthenticated(true);
      setSessionExpiry(expiryTime);
      
      // Restore user data to localStorage
      localStorage.setItem('userCredentials', JSON.stringify(parsed.credentials));
      if (parsed.credentials.userType === 'customer') {
        localStorage.setItem('onecardUser', JSON.stringify(parsed.user));
      } else if (parsed.credentials.userType === 'vendor') {
        localStorage.setItem('onecardVendor', JSON.stringify(parsed.user));
      } else if (parsed.credentials.userType === 'admin') {
        localStorage.setItem('onecardAdmin', JSON.stringify(parsed.user));
      }

      return true;
    } catch (error) {
      console.error('Error checking persistent session:', error);
      return false;
    }
  }, [toast]);

  const clearSession = useCallback(() => {
    localStorage.removeItem('persistentAuthSession');
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userCredentials');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setSessionExpiry(null);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    toast({
      title: "Logged Out Successfully",
      description: "Your profile remains saved on this device for easy re-login.",
    });
  }, [clearSession, toast]);

  const getStoredProfile = useCallback((email: string, userType: string) => {
    return getProfileByEmail(email, userType);
  }, [getProfileByEmail]);

  useEffect(() => {
    if (isInitialized) return;

    // Initialize authentication state
    const initAuth = async () => {
      try {
        // Check for existing persistent session on load
        const hasValidSession = checkPersistentSession();
        
        if (!hasValidSession) {
          // Check legacy authentication
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
                // Convert legacy session to persistent session
                createPersistentSession(parsedData, userCreds);
              }
            } catch (error) {
              console.error('Error converting legacy session:', error);
            }
          }
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsInitialized(true);
      }
    };

    initAuth();

    // Set up session check interval
    const intervalId = setInterval(() => {
      if (isInitialized) {
        checkPersistentSession();
      }
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [isInitialized, checkPersistentSession, createPersistentSession]);

  return {
    currentUser,
    isAuthenticated,
    sessionExpiry,
    createPersistentSession,
    logout,
    getStoredProfile,
    checkPersistentSession
  };
};
