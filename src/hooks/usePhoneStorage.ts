
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface StoredPhone {
  number: string;
  phoneNumber: string;
  countryCode: string;
  userType: string;
  timestamp: string;
  fullNumber: string;
}

export const usePhoneStorage = () => {
  const { toast } = useToast();

  const savePhoneNumber = useCallback((phoneNumber: string, countryCode: string = '+27', userType: string = 'guest') => {
    try {
      // Ensure we preserve the full phone number without truncation
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      let finalPhone = cleanPhone;
      
      // Normalize different input formats to 9 digits
      if (cleanPhone.startsWith('27') && cleanPhone.length === 11) {
        finalPhone = cleanPhone.substring(2);
      } else if (cleanPhone.startsWith('0') && cleanPhone.length === 10) {
        finalPhone = cleanPhone.substring(1);
      }
      
      // Validate that we have exactly 9 digits
      if (finalPhone.length !== 9) {
        console.warn('Phone number must be exactly 9 digits, received:', finalPhone, 'length:', finalPhone.length);
        return;
      }

      // Validate it's a proper SA mobile number
      const firstTwoDigits = finalPhone.substring(0, 2);
      const validPrefixes = ['83', '84', '73', '74', '82', '71', '72', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '76', '81', '79', '87'];
      
      if (!validPrefixes.includes(firstTwoDigits)) {
        console.warn('Invalid SA mobile prefix:', firstTwoDigits);
        return;
      }

      const phoneData: StoredPhone = {
        number: finalPhone,
        phoneNumber: finalPhone,
        countryCode,
        userType,
        timestamp: new Date().toISOString(),
        fullNumber: `${countryCode}${finalPhone}`
      };

      // Get existing phones
      const existingPhones = JSON.parse(localStorage.getItem('savedPhoneNumbers') || '[]');
      
      // Check if this exact number already exists
      const existingIndex = existingPhones.findIndex((phone: StoredPhone) => 
        phone.phoneNumber === finalPhone || phone.number === finalPhone
      );
      
      if (existingIndex !== -1) {
        // Update existing entry
        existingPhones[existingIndex] = phoneData;
      } else {
        // Add new entry at the beginning
        existingPhones.unshift(phoneData);
      }
      
      // Keep only the most recent 10 numbers
      const limitedPhones = existingPhones.slice(0, 10);
      
      localStorage.setItem('savedPhoneNumbers', JSON.stringify(limitedPhones));
      
      console.log(`✅ Phone number saved successfully: ${finalPhone} (Full: ${countryCode}${finalPhone})`);
      
    } catch (error) {
      console.error('Error saving phone number:', error);
    }
  }, []);

  const getAllStoredPhones = useCallback((): StoredPhone[] => {
    try {
      const stored = localStorage.getItem('savedPhoneNumbers');
      if (!stored) return [];
      
      const phones = JSON.parse(stored);
      // Ensure all returned phones have exactly 9 digits
      return phones.filter((phone: StoredPhone) => {
        const cleanNumber = (phone.phoneNumber || phone.number || '').replace(/\D/g, '');
        return cleanNumber.length === 9;
      });
    } catch (error) {
      console.error('Error loading stored phones:', error);
      return [];
    }
  }, []);

  const autoFillPhone = useCallback((userType: string = 'guest') => {
    // First check for user-specific registered phone
    const userCredentials = localStorage.getItem('userCredentials');
    const userData = localStorage.getItem('onecardUser') || 
                     localStorage.getItem('onecardVendor') || 
                     localStorage.getItem('onecardAdmin');
    
    if (userCredentials || userData) {
      try {
        let registeredPhone = '';
        
        if (userCredentials) {
          const credentials = JSON.parse(userCredentials);
          registeredPhone = credentials.phone || credentials.phoneNumber || credentials.registeredPhone || '';
        }
        
        if (!registeredPhone && userData) {
          const user = JSON.parse(userData);
          registeredPhone = user.phone || user.phoneNumber || user.registeredPhone || '';
        }
        
        if (registeredPhone) {
          // Normalize registered phone to exactly 9 digits
          const cleanPhone = registeredPhone.replace(/\D/g, '');
          let finalPhone = cleanPhone;
          
          if (cleanPhone.startsWith('27') && cleanPhone.length === 11) {
            finalPhone = cleanPhone.substring(2);
          } else if (cleanPhone.startsWith('0') && cleanPhone.length === 10) {
            finalPhone = cleanPhone.substring(1);
          }
          
          if (finalPhone.length === 9) {
            console.log(`📱 Auto-filled registered phone: ${finalPhone} (from ${registeredPhone})`);
            return {
              phoneNumber: finalPhone,
              countryCode: '+27',
              source: 'registered'
            };
          }
        }
      } catch (error) {
        console.error('Error auto-filling registered phone:', error);
      }
    }
    
    // Fallback to most recent saved phone
    const storedPhones = getAllStoredPhones();
    if (storedPhones.length > 0) {
      const mostRecent = storedPhones[0];
      const phoneNumber = mostRecent.phoneNumber || mostRecent.number;
      
      if (phoneNumber && phoneNumber.length === 9) {
        console.log(`📱 Auto-filled recent phone: ${phoneNumber}`);
        return {
          phoneNumber,
          countryCode: mostRecent.countryCode || '+27',
          source: 'recent'
        };
      }
    }
    
    return null;
  }, [getAllStoredPhones]);

  return {
    savePhoneNumber,
    getAllStoredPhones,
    autoFillPhone
  };
};
