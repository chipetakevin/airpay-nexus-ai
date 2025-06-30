import { useState, useEffect } from 'react';

interface StoredPhone {
  number: string;
  countryCode: string;
  fullNumber: string;
  userType: string;
  frequency: number;
  lastUsed: string;
}

export const usePhoneStorage = () => {
  const [storedPhones, setStoredPhones] = useState<StoredPhone[]>([]);

  useEffect(() => {
    loadStoredPhones();
  }, []);

  const loadStoredPhones = () => {
    try {
      const stored = localStorage.getItem('savedPhoneNumbers');
      if (stored) {
        const phones = JSON.parse(stored);
        setStoredPhones(phones);
      }
    } catch (error) {
      console.error('Error loading stored phone numbers:', error);
    }
  };

  const savePhoneNumber = (phoneNumber: string, countryCode: string = '+27', userType: string = 'guest') => {
    try {
      // Clean the phone number to 9 digits
      const cleanNumber = phoneNumber.replace(/\D/g, '');
      let finalNumber = cleanNumber;
      
      // Normalize to 9 digits
      if (cleanNumber.startsWith('27')) {
        finalNumber = cleanNumber.substring(2);
      } else if (cleanNumber.startsWith('0')) {
        finalNumber = cleanNumber.substring(1);
      }

      if (finalNumber.length !== 9) return;

      const fullNumber = `${countryCode}${finalNumber}`;
      
      // Load existing phones
      const stored = localStorage.getItem('savedPhoneNumbers');
      let phones: StoredPhone[] = stored ? JSON.parse(stored) : [];
      
      // Check if phone already exists
      const existingIndex = phones.findIndex(p => p.fullNumber === fullNumber);
      
      if (existingIndex >= 0) {
        // Update existing phone
        phones[existingIndex].frequency += 1;
        phones[existingIndex].lastUsed = new Date().toISOString();
        phones[existingIndex].userType = userType; // Update user type
      } else {
        // Add new phone
        phones.push({
          number: finalNumber,
          countryCode,
          fullNumber,
          userType,
          frequency: 1,
          lastUsed: new Date().toISOString()
        });
      }

      // Sort by frequency and recency
      phones.sort((a, b) => {
        if (a.frequency !== b.frequency) {
          return b.frequency - a.frequency;
        }
        return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
      });

      // Keep only top 10 most used numbers
      phones = phones.slice(0, 10);

      // Save back to localStorage
      localStorage.setItem('savedPhoneNumbers', JSON.stringify(phones));
      setStoredPhones(phones);

      // Also save to session storage for immediate access
      sessionStorage.setItem('lastUsedPhone', JSON.stringify({
        number: finalNumber,
        countryCode,
        fullNumber,
        userType
      }));

      console.log(`📱 Phone number permanently saved: ${fullNumber} for ${userType}`);
      
    } catch (error) {
      console.error('Error saving phone number:', error);
    }
  };

  const autoFillPhone = (userType: string = 'guest') => {
    try {
      // First try to get the most recent phone for this user type
      const phones = storedPhones.filter(p => p.userType === userType);
      if (phones.length > 0) {
        return {
          phoneNumber: phones[0].number,
          countryCode: phones[0].countryCode
        };
      }

      // Fallback to most frequently used phone
      if (storedPhones.length > 0) {
        return {
          phoneNumber: storedPhones[0].number,
          countryCode: storedPhones[0].countryCode
        };
      }

      // Last resort: check session storage
      const lastUsed = sessionStorage.getItem('lastUsedPhone');
      if (lastUsed) {
        const phone = JSON.parse(lastUsed);
        return {
          phoneNumber: phone.number,
          countryCode: phone.countryCode
        };
      }

      return null;
    } catch (error) {
      console.error('Error auto-filling phone:', error);
      return null;
    }
  };

  const getAllStoredPhones = () => {
    return storedPhones;
  };

  const getPhonesByUserType = (userType: string) => {
    return storedPhones.filter(p => p.userType === userType);
  };

  const clearStoredPhones = () => {
    localStorage.removeItem('savedPhoneNumbers');
    sessionStorage.removeItem('lastUsedPhone');
    setStoredPhones([]);
  };

  // Load saved banking info (maintaining existing functionality)
  const loadSavedBankingInfo = () => {
    try {
      const savedInfo = localStorage.getItem('savedBankingInfo');
      return savedInfo ? JSON.parse(savedInfo) : null;
    } catch (error) {
      console.error('Error loading saved banking info:', error);
      return null;
    }
  };

  return {
    storedPhones,
    savePhoneNumber,
    autoFillPhone,
    getAllStoredPhones,
    getPhonesByUserType,
    clearStoredPhones,
    loadSavedBankingInfo
  };
};
