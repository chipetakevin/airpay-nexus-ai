import { useState, useEffect, useCallback } from 'react';
import CryptoJS from 'crypto-js';

interface BankingData {
  bankName: string;
  accountNumber: string;
  branchCode: string;
  accountType: string;
  lastSaved?: Date;
}

interface UseSecureBankingStorageReturn {
  bankingData: BankingData | null;
  saveBankingData: (data: Partial<BankingData>) => void;
  clearBankingData: () => void;
  isAutoSaving: boolean;
  lastSaved: Date | null;
  hasStoredData: boolean;
}

// Simple encryption key - in production, this should be more secure
const ENCRYPTION_KEY = 'moderna-banking-secure-key-2024';
const STORAGE_KEY = 'moderna_secure_banking_data';

export const useSecureBankingStorage = (): UseSecureBankingStorageReturn => {
  const [bankingData, setBankingData] = useState<BankingData | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Encrypt data before storing
  const encryptData = useCallback((data: string): string => {
    try {
      return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
    } catch (error) {
      console.error('Error encrypting data:', error);
      return data; // Fallback to unencrypted if encryption fails
    }
  }, []);

  // Decrypt data after retrieving
  const decryptData = useCallback((encryptedData: string): string => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Error decrypting data:', error);
      return encryptedData; // Fallback to treating as unencrypted
    }
  }, []);

  // Load stored banking data on mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const decryptedData = decryptData(storedData);
        if (decryptedData) {
          const parsedData = JSON.parse(decryptedData);
          // Convert lastSaved string back to Date object
          if (parsedData.lastSaved) {
            parsedData.lastSaved = new Date(parsedData.lastSaved);
            setLastSaved(parsedData.lastSaved);
          }
          setBankingData(parsedData);
        }
      }
    } catch (error) {
      console.error('Error loading banking data:', error);
      // Clear corrupted data
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [decryptData]);

  // Save banking data with encryption
  const saveBankingData = useCallback((newData: Partial<BankingData>) => {
    setIsAutoSaving(true);
    
    // Merge with existing data
    const updatedData: BankingData = {
      ...bankingData,
      ...newData,
      lastSaved: new Date()
    };

    try {
      const dataToStore = JSON.stringify(updatedData);
      const encryptedData = encryptData(dataToStore);
      localStorage.setItem(STORAGE_KEY, encryptedData);
      
      setBankingData(updatedData);
      setLastSaved(updatedData.lastSaved);
      
      // Simulate save delay for UX
      setTimeout(() => {
        setIsAutoSaving(false);
      }, 500);
      
      console.log('✅ Banking data securely saved');
    } catch (error) {
      console.error('Error saving banking data:', error);
      setIsAutoSaving(false);
    }
  }, [bankingData, encryptData]);

  // Clear all stored banking data
  const clearBankingData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setBankingData(null);
      setLastSaved(null);
      console.log('🗑️ Banking data cleared');
    } catch (error) {
      console.error('Error clearing banking data:', error);
    }
  }, []);

  const hasStoredData = bankingData !== null && Boolean(
    bankingData.bankName || 
    bankingData.accountNumber || 
    bankingData.branchCode
  );

  return {
    bankingData,
    saveBankingData,
    clearBankingData,
    isAutoSaving,
    lastSaved,
    hasStoredData
  };
};

export default useSecureBankingStorage;