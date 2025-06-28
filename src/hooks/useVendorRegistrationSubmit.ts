
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useVendorRegistrationSubmit = (handleSubmit: (e: React.FormEvent) => Promise<boolean>) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsRegistering(true);
    
    try {
      await handleSubmit(e);
      
      // After successful registration, determine redirect based on user type
      const userCredentials = localStorage.getItem('userCredentials');
      if (userCredentials) {
        const credentials = JSON.parse(userCredentials);
        const userType = credentials.userType;
        const isUnified = credentials.password === 'Malawi@1976';
        
        toast({
          title: "Registration Successful! 🎉",
          description: `Redirecting to your ${userType} dashboard...`,
        });

        // Privilege-based redirection logic
        setTimeout(() => {
          if (isUnified) {
            // Unified profiles get full admin access
            window.location.href = '/portal?tab=admin-reg&verified=true';
          } else if (userType === 'vendor') {
            // Vendors get access to deals with vendor privileges
            window.location.href = '/portal?tab=deals&user=vendor&verified=true';
          } else if (userType === 'admin') {
            // Admins get admin registration access
            window.location.href = '/portal?tab=admin-reg&verified=true';
          } else {
            // Customers get standard deals access
            window.location.href = '/portal?tab=deals&user=customer&verified=true';
          }
        }, 2000);
      } else {
        // Fallback to deals tab if no user type detected
        setTimeout(() => {
          window.location.href = '/portal?tab=deals&verified=true';
        }, 2000);
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Registration Error",
        description: "Please check all fields and try again.",
        variant: "destructive"
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    isRegistering,
    handleFormSubmit
  };
};
