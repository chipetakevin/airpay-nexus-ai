import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface StoredPhone {
  number: string;
  countryCode: string;
  fullNumber: string;
  userType: 'customer' | 'vendor' | 'admin' | 'guest';
  timestamp: string;
  frequency: number;
}

export const usePhoneStorage = () => {
  const [storedPhones, setStoredPhones] = useState<StoredPhone[]>([]);
  const { toast } = useToast();

  // Load stored phones on mount
  useEffect(() => {
    loadStoredPhones();
  }, []);

  const loadStoredPhones = useCallback(() => {
    try {
      const stored = localStorage.getItem('savedPhoneNumbers');
      if (stored) {
        const phones = JSON.parse(stored);
        setStoredPhones(phones);
      }
    } catch (error) {
      console.error('Error loading stored phones:', error);
    }
  }, []);

  const savePhoneNumber = useCallback((
    phoneNumber: string, 
    countryCode: string = '+27', 
    userType: 'customer' | 'vendor' | 'admin' | 'guest' = 'guest'
  ) => {
    if (!phoneNumber) return;

    try {
      const cleanNumber = phoneNumber.replace(/\D/g, '');
      const fullNumber = `${countryCode}${cleanNumber}`;
      
      const existing = storedPhones.find(p => p.fullNumber === fullNumber);
      let updatedPhones: StoredPhone[];

      if (existing) {
        // Update frequency and timestamp
        updatedPhones = storedPhones.map(p => 
          p.fullNumber === fullNumber 
            ? { ...p, frequency: p.frequency + 1, timestamp: new Date().toISOString(), userType }
            : p
        );
      } else {
        // Add new phone
        const newPhone: StoredPhone = {
          number: cleanNumber,
          countryCode,
          fullNumber,
          userType,
          timestamp: new Date().toISOString(),
          frequency: 1
        };
        updatedPhones = [...storedPhones, newPhone];
      }

      // Sort by frequency and timestamp
      updatedPhones.sort((a, b) => {
        if (a.frequency !== b.frequency) return b.frequency - a.frequency;
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });

      // Keep only last 10 phones
      updatedPhones = updatedPhones.slice(0, 10);

      localStorage.setItem('savedPhoneNumbers', JSON.stringify(updatedPhones));
      setStoredPhones(updatedPhones);

      console.log(`📱 Phone ${fullNumber} saved for ${userType}`);
    } catch (error) {
      console.error('Error saving phone number:', error);
    }
  }, [storedPhones]);

  const getMostRecentPhone = useCallback((userType?: string): StoredPhone | null => {
    const filtered = userType 
      ? storedPhones.filter(p => p.userType === userType)
      : storedPhones;
    
    return filtered.length > 0 ? filtered[0] : null;
  }, [storedPhones]);

  const getAllStoredPhones = useCallback(() => {
    return storedPhones;
  }, [storedPhones]);

  const autoFillPhone = useCallback((userType?: string) => {
    const phone = getMostRecentPhone(userType);
    if (phone) {
      toast({
        title: "Phone Auto-filled! 📱",
        description: `Using your saved number: ${phone.fullNumber}`,
        duration: 2000
      });
      return {
        phoneNumber: phone.number,
        countryCode: phone.countryCode,
        fullNumber: phone.fullNumber
      };
    }
    return null;
  }, [getMostRecentPhone, toast]);

  const clearStoredPhones = useCallback(() => {
    localStorage.removeItem('savedPhoneNumbers');
    setStoredPhones([]);
    toast({
      title: "Phone Numbers Cleared",
      description: "All saved phone numbers have been removed.",
    });
  }, [toast]);

  return {
    storedPhones,
    savePhoneNumber,
    getMostRecentPhone,
    getAllStoredPhones,
    autoFillPhone,
    clearStoredPhones,
    loadStoredPhones
  };
};
