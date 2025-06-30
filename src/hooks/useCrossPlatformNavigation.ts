
import { useNavigate } from 'react-router-dom';
import { useMobileAuth } from './useMobileAuth';
import { useToast } from './use-toast';

export const useCrossPlatformNavigation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useMobileAuth();
  const { toast } = useToast();

  const navigateToWhatsAppAssistant = () => {
    if (!isAuthenticated || !currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please complete registration to access WhatsApp Assistant.",
        variant: "destructive",
      });
      navigate('/portal?tab=registration');
      return;
    }

    toast({
      title: "Switching to WhatsApp Interface",
      description: `Welcome ${currentUser.firstName}! Opening your personalized shopping assistant...`,
      duration: 2000,
    });

    setTimeout(() => {
      navigate('/whatsapp-assistant');
    }, 500);
  };

  const navigateToPortalDeals = () => {
    toast({
      title: "Opening Smart Deals",
      description: "Accessing comprehensive deals dashboard...",
      duration: 2000,
    });

    setTimeout(() => {
      navigate('/portal?tab=deals');
    }, 500);
  };

  const navigateToPortalDashboard = () => {
    if (!isAuthenticated || !currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please complete registration to access your dashboard.",
        variant: "destructive",
      });
      navigate('/portal?tab=registration');
      return;
    }

    toast({
      title: "Opening Portal Dashboard",
      description: "Accessing your comprehensive account dashboard...",
      duration: 2000,
    });

    setTimeout(() => {
      navigate('/portal?tab=onecard');
    }, 500);
  };

  return {
    navigateToWhatsAppAssistant,
    navigateToPortalDeals,
    navigateToPortalDashboard,
    isAuthenticated,
    currentUser
  };
};
