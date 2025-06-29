
import { useState, useEffect } from 'react';
import { useMobileAuth } from './useMobileAuth';
import { useToast } from './use-toast';

export const useWhatsAppRedirect = () => {
  const { isAuthenticated, currentUser } = useMobileAuth();
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const redirectToWhatsApp = () => {
    if (!isAuthenticated || !currentUser) {
      toast({
        title: "Registration Required",
        description: "Please register first to access WhatsApp shopping experience.",
        variant: "destructive",
      });
      return false;
    }

    const phoneNumber = "27832466539"; // Your WhatsApp Business number
    const userName = `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim();
    const userPhone = currentUser.registeredPhone || '';
    
    const message = encodeURIComponent(
      `👋 Hi Devine Mobile!\n\n` +
      `Welcome ${userName}!\n` +
      `Phone: ${userPhone}\n\n` +
      `I'm ready to start shopping for airtime and data through WhatsApp.\n\n` +
      `Please help me get started with your mobile services! 🛍️`
    );

    if (isMobile) {
      // On mobile, open WhatsApp app directly
      const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
      const fallbackUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      
      // Try to open WhatsApp app first
      window.location.href = whatsappUrl;
      
      // Fallback to web WhatsApp after a short delay
      setTimeout(() => {
        window.open(fallbackUrl, '_blank');
      }, 1000);
    } else {
      // On desktop, open WhatsApp Web
      const webUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(webUrl, '_blank');
    }

    toast({
      title: "Redirecting to WhatsApp",
      description: `Welcome ${userName}! Opening WhatsApp shopping experience...`,
      duration: 3000,
    });

    return true;
  };

  const redirectToInterface = () => {
    if (!isAuthenticated || !currentUser) {
      toast({
        title: "Registration Required", 
        description: "Please register to access the full shopping interface.",
        variant: "destructive",
      });
      // Redirect to registration
      window.location.href = '/portal?tab=registration';
      return;
    }

    // Redirect to WhatsApp Assistant page with user context
    window.location.href = '/whatsapp-assistant';
  };

  return {
    isMobile,
    isAuthenticated,
    currentUser,
    redirectToWhatsApp,
    redirectToInterface
  };
};
