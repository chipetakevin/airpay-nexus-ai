
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

interface SessionInfo {
  loginTime: number;
  userType: string;
  userName: string;
  isActive: boolean;
}

export const useSessionManager = () => {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const { toast } = useToast();
  const location = useLocation();

  // COMPLETELY DISABLE session management on deals page and for all users
  const isDealsPage = location.pathname === '/' && location.search.includes('tab=deals');
  const isDealsRoute = location.pathname.includes('/deals') || location.pathname === '/portal' && location.search.includes('tab=deals');
  const shouldDisableSession = true; // DISABLED: Always disable session management

  useEffect(() => {
    // COMPLETELY DISABLE all session management
    setSessionInfo(null);
    return;
  }, [location, shouldDisableSession]);

  useEffect(() => {
    // COMPLETELY DISABLE session expiry logic
    return;
  }, [sessionInfo, toast, location, shouldDisableSession]);

  const sendWhatsAppLogoutNotification = () => {
    // DISABLED: No session notifications
    return;
  };

  const performLogout = () => {
    // DISABLED: No automatic logout
    return;
  };

  const getRemainingTime = () => {
    // DISABLED: No session timing
    return null;
  };

  // Always return disabled session functions
  return {
    sessionInfo: null,
    getRemainingTime: () => null,
    sendWhatsAppLogoutNotification: () => {},
    performLogout: () => {}
  };
};
