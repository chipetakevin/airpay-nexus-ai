
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

  useEffect(() => {
    // Only apply session management on authenticated pages
    const isAuthenticatedPage = location.search.includes('tab=onecard') ||
                               location.search.includes('tab=admin') ||
                               (location.search.includes('tab=') && 
                                !location.search.includes('tab=deals') &&
                                !location.search.includes('tab=registration') &&
                                !location.search.includes('tab=vendor') &&
                                !location.search.includes('tab=unified-reports'));

    // Early return if not on authenticated page
    if (!isAuthenticatedPage) {
      setSessionInfo(null);
      return;
    }

    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
    const credentials = localStorage.getItem('userCredentials');
    
    if (!isAuthenticated || !credentials) {
      setSessionInfo(null);
      return;
    }
    
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
        
        // Check if this is Kevin Chipeta or admin
        const isKevinOrAdmin = (
          (parsedData.firstName === 'Kevin' && parsedData.lastName === 'Chipeta') ||
          userCreds.userType === 'admin'
        );
        
        if (isKevinOrAdmin) {
          // Get or set login time
          let loginTime = localStorage.getItem('sessionStartTime');
          if (!loginTime) {
            loginTime = Date.now().toString();
            localStorage.setItem('sessionStartTime', loginTime);
          }
          
          setSessionInfo({
            loginTime: parseInt(loginTime),
            userType: userCreds.userType,
            userName: `${parsedData.firstName} ${parsedData.lastName}`,
            isActive: true
          });
        } else {
          setSessionInfo(null);
        }
      } else {
        setSessionInfo(null);
      }
    } catch (error) {
      console.error('Error parsing session data:', error);
      setSessionInfo(null);
    }
  }, [location]);

  useEffect(() => {
    if (!sessionInfo) return;

    // Only apply session expiry logic if we have valid session info
    const isAuthenticatedPage = location.search.includes('tab=onecard') ||
                               location.search.includes('tab=admin') ||
                               (location.search.includes('tab=') && 
                                !location.search.includes('tab=deals') &&
                                !location.search.includes('tab=registration') &&
                                !location.search.includes('tab=vendor') &&
                                !location.search.includes('tab=unified-reports'));

    if (!isAuthenticatedPage) {
      return;
    }

    const checkSessionExpiry = () => {
      const currentTime = Date.now();
      const sessionDuration = currentTime - sessionInfo.loginTime;
      const FIVE_MINUTES = 5 * 60 * 1000; // 5 minutes in milliseconds
      const WARNING_TIME = FIVE_MINUTES - (30 * 1000); // 30 seconds before expiry

      if (sessionDuration >= WARNING_TIME && sessionDuration < FIVE_MINUTES) {
        // Show warning notification
        const remainingSeconds = Math.ceil((FIVE_MINUTES - sessionDuration) / 1000);
        
        toast({
          title: "🚨 Session Expiring Soon",
          description: `Your session will expire in ${remainingSeconds} seconds. WhatsApp notification will be sent.`,
          duration: 8000,
        });
      }

      if (sessionDuration >= FIVE_MINUTES) {
        // Send WhatsApp notification and logout
        sendWhatsAppLogoutNotification();
        performLogout();
      }
    };

    // Check every 5 seconds for more precise timing
    const interval = setInterval(checkSessionExpiry, 5000);
    
    // Also check immediately
    checkSessionExpiry();

    return () => clearInterval(interval);
  }, [sessionInfo, toast, location]);

  const sendWhatsAppLogoutNotification = () => {
    if (!sessionInfo) return;
    
    const message = encodeURIComponent(
      `🔐 DIVINELY MOBILE - SESSION EXPIRED 📣\n\n` +
      `👤 User: ${sessionInfo.userName}\n` +
      `🔑 Account Type: ${sessionInfo.userType?.toUpperCase()}\n` +
      `⏰ Session Duration: 5 Minutes\n` +
      `📅 Logged Out: ${new Date().toLocaleString()}\n\n` +
      `🚨 Your session has automatically expired after 5 minutes for security purposes.\n\n` +
      `Please log back in to continue using the system.\n\n` +
      `🌐 https://divinely-mobile.com\n` +
      `📱 OneCard System Security`
    );
    
    const whatsappUrl = `https://wa.me/27832466539?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Also show toast notification
    toast({
      title: "📣 WhatsApp Notification Sent",
      description: "Session expiry notification sent to +27832466539",
      duration: 5000,
    });
  };

  const performLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('sessionStartTime');
    
    toast({
      title: "🔐 Session Expired",
      description: "You have been automatically logged out after 5 minutes.",
      variant: "destructive",
      duration: 8000,
    });
    
    // Redirect to deals page instead of home
    setTimeout(() => {
      window.location.href = '/?tab=deals';
    }, 2000);
  };

  const getRemainingTime = () => {
    if (!sessionInfo) return null;
    
    const currentTime = Date.now();
    const sessionDuration = currentTime - sessionInfo.loginTime;
    const FIVE_MINUTES = 5 * 60 * 1000;
    const remaining = FIVE_MINUTES - sessionDuration;
    
    if (remaining <= 0) return null;
    
    const minutes = Math.floor(remaining / (60 * 1000));
    const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
    
    return { minutes, seconds, totalMs: remaining };
  };

  return {
    sessionInfo,
    getRemainingTime,
    sendWhatsAppLogoutNotification,
    performLogout
  };
};
