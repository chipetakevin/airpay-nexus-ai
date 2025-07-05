import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { universalDataStorage, UniversalFormData, LocalStorageOptions } from '@/services/universalDataStorage';
import { supabase } from '@/integrations/supabase/client';

interface UseUniversalFormStorageOptions {
  formType: UniversalFormData['formType'];
  storageKey: string;
  autoSave?: boolean;
  autoSaveDelay?: number;
}

export const useUniversalFormStorage = (options: UseUniversalFormStorageOptions) => {
  const { formType, storageKey, autoSave = true, autoSaveDelay = 2000 } = options;
  const { toast } = useToast();
  
  const [userId, setUserId] = useState<string | undefined>();
  const [isStoring, setIsStoring] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [storageStatus, setStorageStatus] = useState({
    localStorage: false,
    database: false,
    errors: [] as string[]
  });

  // Get current user
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id);
    };
    getCurrentUser();
  }, []);

  // Store form data universally (local + database)
  const storeFormData = useCallback(async (
    formData: Record<string, any>, 
    isComplete: boolean = false,
    showToast: boolean = true
  ) => {
    if (!formData || Object.keys(formData).length === 0) {
      console.warn('No form data to store');
      return { success: false, error: 'No data provided' };
    }

    setIsStoring(true);
    
    try {
      const universalData: UniversalFormData = {
        formType,
        formData,
        userId,
        isComplete,
        submissionSource: 'web'
      };

      const localOptions: LocalStorageOptions = {
        storageKey,
        storageType: 'localStorage'
      };

      const result = await universalDataStorage.storeUniversalData(universalData, localOptions);
      
      setStorageStatus(result);
      setLastSaved(new Date());

      if (result.localStorage && result.database) {
        if (showToast) {
          toast({
            title: "Data Saved Successfully! 💾",
            description: "Your information has been saved both locally and securely in the cloud.",
            duration: 3000
          });
        }
        return { success: true };
      } else if (result.localStorage) {
        if (showToast) {
          toast({
            title: "Data Saved Locally 📱",
            description: "Your information is saved locally. Will sync to cloud when connection is available.",
            variant: "default"
          });
        }
        return { success: true, partial: true };
      } else {
        throw new Error(result.errors.join(', ') || 'Storage failed');
      }
    } catch (error) {
      console.error('❌ Form storage error:', error);
      if (showToast) {
        toast({
          title: "Storage Error",
          description: "Failed to save data. Please try again.",
          variant: "destructive"
        });
      }
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setIsStoring(false);
    }
  }, [formType, storageKey, userId, toast]);

  // Store user profile data
  const storeUserProfile = useCallback(async (profileData: Record<string, any>, userType: string) => {
    if (!userId) {
      console.warn('No user ID available for profile storage');
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const result = await universalDataStorage.storeUserProfile(userId, userType, profileData);
      
      if (result.success) {
        toast({
          title: "Profile Updated! 👤",
          description: "Your profile has been saved successfully.",
          duration: 3000
        });
      }
      
      return result;
    } catch (error) {
      console.error('❌ Profile storage error:', error);
      toast({
        title: "Profile Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive"
      });
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }, [userId, toast]);

  // Store banking information
  const storeBankingData = useCallback(async (bankingData: Record<string, any>, userType: string) => {
    if (!userId) {
      console.warn('No user ID available for banking storage');
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const result = await universalDataStorage.storeBankingProfile(userId, userType, bankingData);
      
      if (result.success) {
        toast({
          title: "Banking Details Saved! 🏦",
          description: "Your banking information has been securely stored.",
          duration: 3000
        });
      }
      
      return result;
    } catch (error) {
      console.error('❌ Banking storage error:', error);
      toast({
        title: "Banking Error",
        description: "Failed to save banking details. Please try again.",
        variant: "destructive"
      });
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }, [userId, toast]);

  // Store payment card information
  const storePaymentCard = useCallback(async (cardData: Record<string, any>, userType: string) => {
    if (!userId) {
      console.warn('No user ID available for card storage');
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const result = await universalDataStorage.storePaymentCard(userId, userType, cardData);
      
      if (result.success) {
        toast({
          title: "Payment Card Saved! 💳",
          description: "Your payment card has been securely stored.",
          duration: 3000
        });
      }
      
      return result;
    } catch (error) {
      console.error('❌ Card storage error:', error);
      toast({
        title: "Card Error",
        description: "Failed to save payment card. Please try again.",
        variant: "destructive"
      });
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }, [userId, toast]);

  // Store OneCard reward
  const storeOneCardReward = useCallback(async (rewardData: Record<string, any>, userType: string) => {
    if (!userId) {
      console.warn('No user ID available for reward storage');
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const result = await universalDataStorage.storeOneCardReward(userId, userType, rewardData);
      
      if (result.success) {
        toast({
          title: "Reward Recorded! 🎉",
          description: `Cashback of R${rewardData.rewardAmount} has been processed.`,
          duration: 3000
        });
      }
      
      return result;
    } catch (error) {
      console.error('❌ Reward storage error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }, [userId, toast]);

  // Load form data from storage
  const loadFormData = useCallback(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        setLastSaved(parsed.timestamp ? new Date(parsed.timestamp) : null);
        return parsed;
      }
      return null;
    } catch (error) {
      console.error('❌ Form load error:', error);
      return null;
    }
  }, [storageKey]);

  // Load user data from database
  const loadUserData = useCallback(async (userType?: string) => {
    if (!userId) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const result = await universalDataStorage.loadUserData(userId, userType);
      return result;
    } catch (error) {
      console.error('❌ User data load error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }, [userId]);

  // Sync local storage with database
  const syncWithDatabase = useCallback(async () => {
    if (!userId) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const result = await universalDataStorage.syncLocalWithDatabase(userId);
      
      if (result.success) {
        toast({
          title: "Data Synced! 🔄",
          description: "Your local data has been synchronized with the cloud.",
          duration: 3000
        });
      }
      
      return result;
    } catch (error) {
      console.error('❌ Sync error:', error);
      toast({
        title: "Sync Error",
        description: "Failed to sync data. Please try again.",
        variant: "destructive"
      });
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }, [userId, toast]);

  // Auto-save functionality with debouncing
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const scheduleAutoSave = useCallback((formData: Record<string, any>) => {
    if (!autoSave) return;
    
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    
    const timeout = setTimeout(() => {
      storeFormData(formData, false, false);
    }, autoSaveDelay);
    
    setAutoSaveTimeout(timeout);
  }, [autoSave, autoSaveDelay, autoSaveTimeout, storeFormData]);

  // Cleanup auto-save timeout
  useEffect(() => {
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [autoSaveTimeout]);

  return {
    // Core storage functions
    storeFormData,
    storeUserProfile,
    storeBankingData,
    storePaymentCard,
    storeOneCardReward,
    
    // Data loading functions
    loadFormData,
    loadUserData,
    
    // Sync functions
    syncWithDatabase,
    scheduleAutoSave,
    
    // State
    isStoring,
    lastSaved,
    storageStatus,
    userId
  };
};