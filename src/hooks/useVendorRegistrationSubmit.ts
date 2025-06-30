
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
      // First run the form validation and data preparation - now expecting boolean return
      const isValid = await handleSubmit(e);
      
      if (!isValid) {
        // Form validation failed, don't proceed with registration
        return;
      }
      
      // Get the submitted form data from localStorage after successful validation
      const vendorData = localStorage.getItem('onecardVendor');
      const userCredentials = localStorage.getItem('userCredentials');
      
      if (vendorData && userCredentials) {
        const parsedVendorData = JSON.parse(vendorData);
        const parsedCredentials = JSON.parse(userCredentials);
        
        // Create permanent authentication session
        createPermanentSession(parsedCredentials, parsedVendorData);
        
        // Ensure registration completion flag is set
        localStorage.setItem('registrationCompleted', 'true');
        
        // Show success message
        toast({
          title: "🎉 Vendor Registration Complete!",
          description: `Welcome ${parsedVendorData.firstName}! You're now permanently logged in as a vendor.`,
          duration: 5000,
        });

        // Redirect to vendor portal after a short delay
        setTimeout(() => {
          window.location.href = '/portal?tab=vendor';
        }, 2000);
      }
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
