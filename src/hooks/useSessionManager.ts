
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SessionInfo {
  loginTime: number;
  userType: string;
  userName: string;
  isActive: boolean;
}

export const useSessionManager = () => {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
    const credentials = localStorage.getItem('userCredentials');
    
    if (isAuthenticated && credentials) {
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
          }
        }
      } catch (error) {
        console.error('Error parsing session data:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (!sessionInfo) return;

    const checkSessionExpiry = () => {
      const currentTime = Date.now();
      const sessionDuration = currentTime - sessionInfo.loginTime;
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const WARNING_TIME = TWENTY_FOUR_HOURS - (10 * 60 * 1000); // 10 minutes before expiry

      if (sessionDuration >= WARNING_TIME && sessionDuration < TWENTY_FOUR_HOURS) {
        // Show warning notification
        const remainingMinutes = Math.ceil((TWENTY_FOUR_HOURS - sessionDuration) / (60 * 1000));
        
        toast({
          title: "🚨 Session Expiring Soon",
          description: `Your session will expire in ${remainingMinutes} minutes. WhatsApp notification will be sent.`,
          duration: 8000,
        });
      }

      if (sessionDuration >= TWENTY_FOUR_HOURS) {
        // Send WhatsApp notification and logout
        sendWhatsAppLogoutNotification();
        performLogout();
      }
    };

    // Check every minute
    const interval = setInterval(checkSessionExpiry, 60000);
    
    // Also check immediately
    checkSessionExpiry();

    return () => clearInterval(interval);
  }, [sessionInfo, toast]);

  const sendWhatsAppLogoutNotification = () => {
    const message = encodeURIComponent(
      `🔐 DIVINELY MOBILE - SESSION EXPIRED 📣\n\n` +
      `👤 User: ${sessionInfo?.userName}\n` +
      `🔑 Account Type: ${sessionInfo?.userType?.toUpperCase()}\n` +
      `⏰ Session Duration: 24 Hours\n` +
      `📅 Logged Out: ${new Date().toLocaleString()}\n\n` +
      `🚨 Your session has automatically expired after 24 hours for security purposes.\n\n` +
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
      description: "You have been automatically logged out after 24 hours.",
      variant: "destructive",
      duration: 8000,
    });
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  const getRemainingTime = () => {
    if (!sessionInfo) return null;
    
    const currentTime = Date.now();
    const sessionDuration = currentTime - sessionInfo.loginTime;
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    const remaining = TWENTY_FOUR_HOURS - sessionDuration;
    
    if (remaining <= 0) return null;
    
    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    
    return { hours, minutes, totalMs: remaining };
  };

  return {
    sessionInfo,
    getRemainingTime,
    sendWhatsAppLogoutNotification,
    performLogout
  };
};
