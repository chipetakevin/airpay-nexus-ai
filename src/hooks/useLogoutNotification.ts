
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useLogoutNotification = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
    
    if (!isAuthenticated) return;

    // Show logout notification every 5 minutes (300000ms)
    const interval = setInterval(() => {
      toast({
        title: "Session Active",
        description: "You are still logged in. Logout is disabled for continuous access to Smart Deals.",
        duration: 5000,
      });
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [toast]);
};
