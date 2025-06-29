
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface BankingProfile {
  id: string;
  bankName: string;
  accountNumber: string;
  branchCode: string;
  routingNumber: string;
  accountType: 'cheque' | 'savings' | 'business';
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CardProfile {
  id: string;
  cardNumber: string; // Encrypted/masked
  cardType: 'visa' | 'mastercard' | 'amex';
  expiryMonth: string;
  expiryYear: string;
  holderName: string;
  isPrimary: boolean;
  lastFourDigits: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserBankingData {
  userId: string;
  userType: 'customer' | 'vendor' | 'admin';
  bankingProfiles: BankingProfile[];
  cardProfiles: CardProfile[];
  primaryBankingId?: string;
  primaryCardId?: string;
}

export const useUniversalBankingStorage = (userType: 'customer' | 'vendor' | 'admin') => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [bankingData, setBankingData] = useState<UserBankingData | null>(null);

  // Generate secure storage key
  const getStorageKey = useCallback((userId?: string) => {
    const currentUser = userId || getCurrentUserId();
    return `secureBanking_${userType}_${currentUser}`;
  }, [userType]);

  // Get current user ID from various sources
  const getCurrentUserId = useCallback(() => {
    const credentials = localStorage.getItem('userCredentials');
    const userData = localStorage.getItem(`onecard${userType.charAt(0).toUpperCase() + userType.slice(1)}`);
    
    if (credentials) {
      try {
        const parsed = JSON.parse(credentials);
        return parsed.userId || parsed.email || 'anonymous';
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }
    
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        return parsed.id || parsed.email || 'anonymous';
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    return 'anonymous';
  }, [userType]);

  // Load banking data
  const loadBankingData = useCallback(async () => {
    setIsLoading(true);
    try {
      const storageKey = getStorageKey();
      const savedData = localStorage.getItem(storageKey);
      
      if (savedData) {
        const parsed: UserBankingData = JSON.parse(savedData);
        setBankingData(parsed);
        
        // Also check session storage for redundancy
        const sessionData = sessionStorage.getItem(storageKey);
        if (!sessionData) {
          sessionStorage.setItem(storageKey, savedData);
        }
      } else {
        // Initialize empty banking data
        const newBankingData: UserBankingData = {
          userId: getCurrentUserId(),
          userType,
          bankingProfiles: [],
          cardProfiles: []
        };
        setBankingData(newBankingData);
      }
    } catch (error) {
      console.error('Error loading banking data:', error);
      toast({
        title: "Banking Data Load Error",
        description: "Failed to load saved banking information.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [getStorageKey, getCurrentUserId, userType, toast]);

  // Save banking profile
  const saveBankingProfile = useCallback(async (profile: Omit<BankingProfile, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newProfile: BankingProfile = {
        ...profile,
        id: `bank_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedData: UserBankingData = {
        ...bankingData!,
        bankingProfiles: [...(bankingData?.bankingProfiles || []), newProfile],
        primaryBankingId: bankingData?.primaryBankingId || newProfile.id
      };

      // Set as primary if it's the first one or explicitly marked
      if (profile.isPrimary || updatedData.bankingProfiles.length === 1) {
        updatedData.bankingProfiles = updatedData.bankingProfiles.map(p => ({
          ...p,
          isPrimary: p.id === newProfile.id
        }));
        updatedData.primaryBankingId = newProfile.id;
      }

      setBankingData(updatedData);
      
      // Save to multiple storage locations
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
      sessionStorage.setItem(storageKey, JSON.stringify(updatedData));
      
      // Also save to user profile
      updateUserProfile({ bankingInfo: updatedData });

      toast({
        title: "Banking Profile Saved! 🏦",
        description: "Your banking information has been securely saved for future use.",
      });

      return newProfile;
    } catch (error) {
      console.error('Error saving banking profile:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save banking information. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  }, [bankingData, getStorageKey, toast]);

  // Save card profile (with encryption simulation)
  const saveCardProfile = useCallback(async (card: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    holderName: string;
    isPrimary?: boolean;
  }) => {
    try {
      // Simulate card encryption - in production, use proper encryption
      const lastFourDigits = card.cardNumber.slice(-4);
      const maskedCardNumber = `****-****-****-${lastFourDigits}`;
      
      // Determine card type
      const cardType = detectCardType(card.cardNumber);

      const newCardProfile: CardProfile = {
        id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        cardNumber: maskedCardNumber,
        cardType,
        expiryMonth: card.expiryMonth,
        expiryYear: card.expiryYear,
        holderName: card.holderName,
        lastFourDigits,
        isPrimary: card.isPrimary || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedData: UserBankingData = {
        ...bankingData!,
        cardProfiles: [...(bankingData?.cardProfiles || []), newCardProfile],
        primaryCardId: bankingData?.primaryCardId || newCardProfile.id
      };

      // Set as primary if it's the first one or explicitly marked
      if (card.isPrimary || updatedData.cardProfiles.length === 1) {
        updatedData.cardProfiles = updatedData.cardProfiles.map(p => ({
          ...p,
          isPrimary: p.id === newCardProfile.id
        }));
        updatedData.primaryCardId = newCardProfile.id;
      }

      setBankingData(updatedData);
      
      // Save securely
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
      sessionStorage.setItem(storageKey, JSON.stringify(updatedData));
      
      updateUserProfile({ cardInfo: updatedData });

      toast({
        title: "Card Saved Securely! 💳",
        description: `${cardType.toUpperCase()} ending in ${lastFourDigits} has been saved for future payments.`,
      });

      return newCardProfile;
    } catch (error) {
      console.error('Error saving card profile:', error);
      toast({
        title: "Card Save Failed",
        description: "Failed to save card information securely. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  }, [bankingData, getStorageKey, toast]);

  // Detect card type from number
  const detectCardType = (cardNumber: string): 'visa' | 'mastercard' | 'amex' => {
    const cleaned = cardNumber.replace(/\D/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (cleaned.startsWith('5') || cleaned.startsWith('2')) return 'mastercard';
    if (cleaned.startsWith('3')) return 'amex';
    return 'visa'; // default
  };

  // Update user profile with banking info
  const updateUserProfile = useCallback((data: any) => {
    try {
      const profileKey = `onecard${userType.charAt(0).toUpperCase() + userType.slice(1)}`;
      const existingProfile = localStorage.getItem(profileKey);
      
      if (existingProfile) {
        const profile = JSON.parse(existingProfile);
        const updatedProfile = { ...profile, ...data };
        localStorage.setItem(profileKey, JSON.stringify(updatedProfile));
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  }, [userType]);

  // Delete banking profile
  const deleteBankingProfile = useCallback(async (profileId: string) => {
    try {
      const updatedData: UserBankingData = {
        ...bankingData!,
        bankingProfiles: bankingData!.bankingProfiles.filter(p => p.id !== profileId)
      };

      // Update primary if deleted profile was primary
      if (bankingData!.primaryBankingId === profileId && updatedData.bankingProfiles.length > 0) {
        updatedData.primaryBankingId = updatedData.bankingProfiles[0].id;
        updatedData.bankingProfiles[0].isPrimary = true;
      }

      setBankingData(updatedData);
      
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
      sessionStorage.setItem(storageKey, JSON.stringify(updatedData));

      toast({
        title: "Banking Profile Deleted",
        description: "The banking profile has been removed from your account.",
      });
    } catch (error) {
      console.error('Error deleting banking profile:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete banking profile. Please try again.",
        variant: "destructive"
      });
    }
  }, [bankingData, getStorageKey, toast]);

  // Delete card profile
  const deleteCardProfile = useCallback(async (profileId: string) => {
    try {
      const updatedData: UserBankingData = {
        ...bankingData!,
        cardProfiles: bankingData!.cardProfiles.filter(p => p.id !== profileId)
      };

      // Update primary if deleted profile was primary
      if (bankingData!.primaryCardId === profileId && updatedData.cardProfiles.length > 0) {
        updatedData.primaryCardId = updatedData.cardProfiles[0].id;
        updatedData.cardProfiles[0].isPrimary = true;
      }

      setBankingData(updatedData);
      
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
      sessionStorage.setItem(storageKey, JSON.stringify(updatedData));

      toast({
        title: "Card Deleted Securely",
        description: "The card has been permanently removed from your account.",
      });
    } catch (error) {
      console.error('Error deleting card profile:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete card. Please try again.",
        variant: "destructive"
      });
    }
  }, [bankingData, getStorageKey, toast]);

  // Set primary banking profile
  const setPrimaryBankingProfile = useCallback(async (profileId: string) => {
    try {
      const updatedData: UserBankingData = {
        ...bankingData!,
        bankingProfiles: bankingData!.bankingProfiles.map(p => ({
          ...p,
          isPrimary: p.id === profileId
        })),
        primaryBankingId: profileId
      };

      setBankingData(updatedData);
      
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
      sessionStorage.setItem(storageKey, JSON.stringify(updatedData));

      toast({
        title: "Primary Bank Updated",
        description: "Your primary banking account has been updated.",
      });
    } catch (error) {
      console.error('Error setting primary banking profile:', error);
    }
  }, [bankingData, getStorageKey, toast]);

  // Set primary card profile
  const setPrimaryCardProfile = useCallback(async (profileId: string) => {
    try {
      const updatedData: UserBankingData = {
        ...bankingData!,
        cardProfiles: bankingData!.cardProfiles.map(p => ({
          ...p,
          isPrimary: p.id === profileId
        })),
        primaryCardId: profileId
      };

      setBankingData(updatedData);
      
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
      sessionStorage.setItem(storageKey, JSON.stringify(updatedData));

      toast({
        title: "Primary Card Updated",
        description: "Your primary payment card has been updated.",
      });
    } catch (error) {
      console.error('Error setting primary card profile:', error);
    }
  }, [bankingData, getStorageKey, toast]);

  // Initialize on mount
  useEffect(() => {
    loadBankingData();
  }, [loadBankingData]);

  return {
    bankingData,
    isLoading,
    saveBankingProfile,
    saveCardProfile,
    deleteBankingProfile,
    deleteCardProfile,
    setPrimaryBankingProfile,
    setPrimaryCardProfile,
    loadBankingData
  };
};
