
import React, { createContext, useContext, ReactNode } from 'react';
import { usePermanentAuth } from '@/hooks/usePermanentAuth';

interface AuthContextType {
  currentUser: any;
  isAuthenticated: boolean;
  createPermanentSession: (userData: any, userCredentials: any) => void;
  manualLogout: () => void;
  checkPermanentSession: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const PersistentAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authHook = usePermanentAuth();
  
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
