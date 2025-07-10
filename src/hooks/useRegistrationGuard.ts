
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cardNumber: string;
  bankName?: string;
  accountNumber?: string;
  isComplete: boolean;
}

export const useRegistrationGuard = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkRegistrationStatus = () => {
    setIsChecking(true);
    
    try {
      // Check for authentication first
      const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
      const credentials = localStorage.getItem('userCredentials');
      
      if (!isAuthenticated || !credentials) {
        setIsRegistered(false);
        setUserProfile(null);
        setIsChecking(false);
        return;
      }

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

      if (!userData) {
        setIsRegistered(false);
        setUserProfile(null);
        setIsChecking(false);
        return;
      }

      const parsedUserData = JSON.parse(userData);
      
      // Check if profile is complete
      const requiredFields = ['firstName', 'lastName', 'email'];
      const phoneField = parsedUserData.registeredPhone || parsedUserData.phoneNumber || parsedUserData.phone;
      
      const isComplete = requiredFields.every(field => 
        parsedUserData[field] && parsedUserData[field].trim() !== ''
      ) && phoneField && phoneField.trim() !== '';

      const profile: UserProfile = {
        firstName: parsedUserData.firstName || '',
        lastName: parsedUserData.lastName || '',
        email: parsedUserData.email || '',
        phoneNumber: phoneField || '',
        cardNumber: parsedUserData.cardNumber || parsedUserData.vendorId || parsedUserData.adminId || '',
        bankName: parsedUserData.bankName || '',
        accountNumber: parsedUserData.accountNumber || '',
        isComplete
      };

      setUserProfile(profile);
      setIsRegistered(isComplete);
      
    } catch (error) {
      console.error('Error checking registration status:', error);
      setIsRegistered(false);
      setUserProfile(null);
    } finally {
      setIsChecking(false);
    }
  };

  const requireRegistration = (allowedPaths: string[] = []) => {
    const currentPath = location.pathname + location.search;
    const isAllowedPath = allowedPaths.some(path => currentPath.includes(path));
    
    if (!isAllowedPath && !isRegistered && !isChecking) {
      // Silent redirect without toast notification
      navigate('/registration');
      return false;
    }
    
    return isRegistered;
  };

  const getStoredPhoneNumber = (): string => {
    if (userProfile?.phoneNumber) {
      return userProfile.phoneNumber;
    }
    
    // Fallback to credentials phone if available
    try {
      const credentials = localStorage.getItem('userCredentials');
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        return parsedCredentials.phone || '';
      }
    } catch (error) {
      console.error('Error getting stored phone:', error);
    }
    
    return '';
  };

  const saveProfilePermanently = (profileData: Partial<UserProfile>) => {
    try {
      const credentials = localStorage.getItem('userCredentials');
      if (!credentials) return;

      const userCreds = JSON.parse(credentials);
      const storageKey = userCreds.userType === 'customer' ? 'onecardUser' : 
                        userCreds.userType === 'vendor' ? 'onecardVendor' : 'onecardAdmin';
      
      const existingData = localStorage.getItem(storageKey);
      const parsedData = existingData ? JSON.parse(existingData) : {};
      
      // Merge with existing data
      const updatedData = {
        ...parsedData,
        ...profileData,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
      
      // Update the profile state
      checkRegistrationStatus();
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved permanently.",
      });
      
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Save Error",
        description: "Failed to save profile information.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkRegistrationStatus();
  }, [location]);

  return {
    isRegistered,
    userProfile,
    isChecking,
    requireRegistration,
    getStoredPhoneNumber,
    saveProfilePermanently,
    checkRegistrationStatus
  };
};
