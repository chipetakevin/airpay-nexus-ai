
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PersistentSession {
  userCredentials: any;
  userData: any;
  loginTime: number;
  expiresAt: number;
}

export const usePersistentAuth = () => {
  const [isSessionValid, setIsSessionValid] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAndValidateSession();
    
    // Check session validity every minute
    const interval = setInterval(checkAndValidateSession, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const checkAndValidateSession = () => {
    const persistentSession = localStorage.getItem('persistentSession');
    
    if (!persistentSession) {
      setIsSessionValid(false);
      return;
    }

    try {
      const session: PersistentSession = JSON.parse(persistentSession);
      const now = Date.now();
      
      if (now > session.expiresAt) {
        // Session expired
        clearSession();
        toast({
          title: "Session Expired",
          description: "Your 24-hour session has expired. Please log in again.",
          variant: "destructive",
        });
        setIsSessionValid(false);
        return;
      }

      // Session is still valid, restore authentication state
      localStorage.setItem('userCredentials', JSON.stringify(session.userCredentials));
      localStorage.setItem('userAuthenticated', 'true');
      
      // Restore user data based on type
      const userType = session.userCredentials.userType;
      if (userType === 'customer') {
        localStorage.setItem('onecardUser', JSON.stringify(session.userData));
      } else if (userType === 'vendor') {
        localStorage.setItem('onecardVendor', JSON.stringify(session.userData));
      } else if (userType === 'admin') {
        localStorage.setItem('onecardAdmin', JSON.stringify(session.userData));
      }

      setIsSessionValid(true);
    } catch (error) {
      console.error('Error parsing persistent session:', error);
      clearSession();
      setIsSessionValid(false);
    }
  };

  const createPersistentSession = (userCredentials: any, userData: any) => {
    const now = Date.now();
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    
    const session: PersistentSession = {
      userCredentials,
      userData,
      loginTime: now,
      expiresAt: now + TWENTY_FOUR_HOURS
    };

    localStorage.setItem('persistentSession', JSON.stringify(session));
    setIsSessionValid(true);

    toast({
      title: "Session Created",
      description: "You'll stay logged in for 24 hours, even if you close the browser.",
      duration: 3000,
    });
  };

  const clearSession = () => {
    localStorage.removeItem('persistentSession');
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userCredentials');
    localStorage.removeItem('onecardUser');
    localStorage.removeItem('onecardVendor');
    localStorage.removeItem('onecardAdmin');
    setIsSessionValid(false);
  };

  const getRemainingSessionTime = () => {
    const persistentSession = localStorage.getItem('persistentSession');
    
    if (!persistentSession) return null;
    
    try {
      const session: PersistentSession = JSON.parse(persistentSession);
      const now = Date.now();
      const remaining = session.expiresAt - now;
      
      if (remaining <= 0) return null;
      
      const hours = Math.floor(remaining / (60 * 60 * 1000));
      const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
      
      return { hours, minutes, totalMs: remaining };
    } catch (error) {
      return null;
    }
  };

  return {
    isSessionValid,
    createPersistentSession,
    clearSession,
    getRemainingSessionTime
  };
};
