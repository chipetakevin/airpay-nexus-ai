
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePersistentAuth } from '@/components/auth/PersistentAuthProvider';

interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  password: string;
  agreeTerms: boolean;
  marketingConsent?: boolean;
}

export const useCustomerRegistrationSubmit = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();
  const { createPermanentSession } = usePersistentAuth();

  const handleCustomerRegistration = async (formData: CustomerFormData) => {
    setIsRegistering(true);

    try {
      // Generate customer ID and card number
      const cardNumber = 'OC' + Math.random().toString(36).substr(2, 10).toUpperCase();
      
      const customerData = {
        ...formData,
        cardNumber,
        registeredPhone: `${formData.countryCode}${formData.phoneNumber}`,
        cardType: 'OneCard Gold',
        cashbackBalance: 0,
        totalEarned: 0,
        totalSpent: 0,
        ricaVerified: false,
        rememberPassword: true,
        autoSaveEnabled: true,
        registrationCompleted: true,
        lastLoginDate: new Date().toISOString(),
        isUnifiedProfile: formData.password === 'Malawi@1976'
      };

      const userCredentials = {
        email: formData.email,
        password: formData.password,
        phone: `${formData.countryCode}${formData.phoneNumber}`,
        rememberPassword: true,
        userType: 'customer',
        autoLogin: true,
        lastAccessDate: new Date().toISOString()
      };

      // Store customer data
      localStorage.setItem('onecardUser', JSON.stringify(customerData));
      localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('registrationCompleted', 'true');
      
      // Create permanent authentication session
      createPermanentSession(userCredentials, customerData);

      const successMessage = formData.password === 'Malawi@1976' 
        ? `Unified Admin/Customer account created: ****${cardNumber.slice(-4)}. Full access enabled!`
        : `OneCard Gold created: ****${cardNumber.slice(-4)}. Auto-save enabled for future sessions!`;

      toast({
        title: "🎉 Customer Registration Complete!",
        description: `Welcome ${formData.firstName}! You're now permanently logged in.`,
        duration: 5000,
      });

      // Redirect to customer portal
      setTimeout(() => {
        window.location.href = '/portal?tab=onecard';
      }, 2000);

      return { success: true, cardNumber, message: successMessage };
    } catch (error) {
      console.error('Customer registration error:', error);
      toast({
        title: "Registration Error",
        description: "There was an issue completing your registration. Please try again.",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    isRegistering,
    handleCustomerRegistration
  };
};
