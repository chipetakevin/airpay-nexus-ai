
import React, { createContext, useContext, ReactNode } from 'react';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';

interface AuthContextType {
  currentUser: any;
  isAuthenticated: boolean;
  sessionExpiry: Date | null;
  createPersistentSession: (userData: any, userCredentials: any) => void;
  logout: () => void;
  getStoredProfile: (email: string, userType: string) => any;
  checkPersistentSession: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const PersistentAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authHook = useEnhancedAuth();
  
  return (
    <AuthContext.Provider value={authHook}>
      {children}
    </AuthContext.Provider>
  );
};

export const usePersistentAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('usePersistentAuth must be used within a PersistentAuthProvider');
  }
  return context;
};
