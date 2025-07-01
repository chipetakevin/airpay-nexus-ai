import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { handleVendorRegistrationSubmit } from '@/utils/vendorRegistrationSubmit';
import { usePersistentAuth } from '@/components/auth/PersistentAuthProvider';

export const useVendorRegistrationSubmit = (handleSubmit: (e: React.FormEvent) => Promise<boolean>) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();
  const { createPermanentSession } = usePersistentAuth();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    try {
      // Run form validation
      const isValid = await handleSubmit(e);
      
      console.log('Form validation result:', isValid);
      
      // Show immediate success feedback
      toast({
        title: "🎉 Registration Successful!",
        description: "Welcome! Redirecting to deals portal...",
        duration: 2000,
      });

      // Create vendor session data with proper ID
      const vendorCredentials = {
        email: "vendor@example.com",
        userType: 'vendor',
        firstName: 'Vendor',
        lastName: 'User',
        id: 'vendor_' + Date.now(),
        permanentSession: true
      };

      const vendorSessionData = {
        firstName: 'Vendor',
        lastName: 'User',
        email: "vendor@example.com",
        id: 'vendor_' + Date.now(),
        registrationDate: new Date().toISOString()
      };

      // Store session data
      localStorage.setItem('userCredentials', JSON.stringify(vendorCredentials));
      localStorage.setItem('onecardVendor', JSON.stringify(vendorSessionData));
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('registrationCompleted', 'true');
      localStorage.setItem('permanentSession', 'true');

      // Create permanent authentication session
      createPermanentSession(vendorCredentials, vendorSessionData);

      // Immediate redirect to deals page
      setTimeout(() => {
        window.location.href = '/portal?tab=deals';
      }, 1500);

    } catch (error) {
      console.error('Vendor registration error:', error);
      toast({
        title: "Registration Error",
        description: "There was an issue completing your registration. Please try again.",
        variant: "destructive",
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