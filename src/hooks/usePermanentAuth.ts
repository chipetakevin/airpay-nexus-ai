
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PermanentAuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'customer' | 'vendor' | 'admin';
  phone: string;
  permanentSession: boolean;
}

export const usePermanentAuth = () => {
  const [currentUser, setCurrentUser] = useState<PermanentAuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Create permanent session that never expires
  const createPermanentSession = useCallback((userCredentials: any, userData: any) => {
    try {
      const permanentSession = {
        userCredentials,
        userData,
        createdAt: new Date().toISOString(),
        isPermanent: true,
        deviceFingerprint: generateDeviceFingerprint()
      };

      // Store in multiple locations for maximum persistence
      localStorage.setItem('permanentUserSession', JSON.stringify(permanentSession));
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('sessionType', 'permanent');
      
      // Also store in IndexedDB for additional persistence
      storePermanentSessionInIndexedDB(permanentSession);
      
      setCurrentUser({
        id: userData.cardNumber || userData.vendorId || userData.adminId,
        email: userCredentials.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userType: userCredentials.userType,
        phone: userData.phone || userCredentials.phone,
        permanentSession: true
      });
      
      setIsAuthenticated(true);

      toast({
        title: "Permanent Session Created! 🔒",
        description: "You'll stay logged in permanently until you manually logout.",
        duration: 3000,
      });

      console.log('✅ Permanent session created for user:', userCredentials.email);
    } catch (error) {
      console.error('Error creating permanent session:', error);
    }
  }, [toast]);

  // Check for permanent session on load
  const checkPermanentSession = useCallback(() => {
    try {
      const permanentSession = localStorage.getItem('permanentUserSession');
      const authFlag = localStorage.getItem('userAuthenticated');
      
      if (permanentSession && authFlag === 'true') {
        const session = JSON.parse(permanentSession);
        
        // Restore user data
        localStorage.setItem('userCredentials', JSON.stringify(session.userCredentials));
        
        if (session.userCredentials.userType === 'customer') {
          localStorage.setItem('onecardUser', JSON.stringify(session.userData));
        } else if (session.userCredentials.userType === 'vendor') {
          localStorage.setItem('onecardVendor', JSON.stringify(session.userData));
        } else if (session.userCredentials.userType === 'admin') {
          localStorage.setItem('onecardAdmin', JSON.stringify(session.userData));
        }
        
        setCurrentUser({
          id: session.userData.cardNumber || session.userData.vendorId || session.userData.adminId,
          email: session.userCredentials.email,
          firstName: session.userData.firstName,
          lastName: session.userData.lastName,
          userType: session.userCredentials.userType,
          phone: session.userData.phone || session.userCredentials.phone,
          permanentSession: true
        });
        
        setIsAuthenticated(true);
        
        console.log('✅ Permanent session restored for:', session.userCredentials.email);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking permanent session:', error);
      return false;
    }
  }, []);

  // Manual logout only
  const manualLogout = useCallback(() => {
    try {
      // Clear all authentication data
      localStorage.removeItem('permanentUserSession');
      localStorage.removeItem('userAuthenticated');
      localStorage.removeItem('sessionType');
      localStorage.removeItem('userCredentials');
      localStorage.removeItem('onecardUser');
      localStorage.removeItem('onecardVendor');
      localStorage.removeItem('onecardAdmin');
      
      // Clear from IndexedDB
      clearPermanentSessionFromIndexedDB();
      
      setCurrentUser(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Manually Logged Out 👋",
        description: "You have been successfully logged out. All sessions cleared.",
        duration: 3000,
      });
      
      console.log('✅ Manual logout completed');
    } catch (error) {
      console.error('Error during manual logout:', error);
    }
  }, [toast]);

  // Initialize on mount
  useEffect(() => {
    checkPermanentSession();
  }, [checkPermanentSession]);

  return {
    currentUser,
    isAuthenticated,
    createPermanentSession,
    manualLogout,
    checkPermanentSession
  };
};

// Generate device fingerprint for additional security
const generateDeviceFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx?.fillText('fingerprint', 2, 2);
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join('|');
  
  return btoa(fingerprint).substring(0, 32);
};

// IndexedDB storage for additional persistence
const storePermanentSessionInIndexedDB = async (session: any) => {
  try {
    const request = indexedDB.open('OnecardPermanentAuth', 1);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('sessions')) {
        db.createObjectStore('sessions', { keyPath: 'id' });
      }
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(['sessions'], 'readwrite');
      const store = transaction.objectStore('sessions');
      store.put({ id: 'permanent', ...session });
    };
  } catch (error) {
    console.error('IndexedDB storage failed:', error);
  }
};

const clearPermanentSessionFromIndexedDB = async () => {
  try {
    const request = indexedDB.open('OnecardPermanentAuth', 1);
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(['sessions'], 'readwrite');
      const store = transaction.objectStore('sessions');
      store.delete('permanent');
    };
  } catch (error) {
    console.error('IndexedDB clear failed:', error);
  }
};
