
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface BankingInfo {
  bankName: string;
  accountNumber: string;
  branchCode: string;
  routingNumber?: string;
}

export const useBankingAutoSave = () => {
  const { toast } = useToast();

  // Save banking information permanently
  const saveBankingInfo = (bankingData: Partial<BankingInfo>) => {
    try {
      const existingData = getBankingInfo();
      const updatedData = { ...existingData, ...bankingData };
      
      // Save to multiple storage locations for redundancy
      localStorage.setItem('permanentBankingInfo', JSON.stringify(updatedData));
      sessionStorage.setItem('currentBankingInfo', JSON.stringify(updatedData));
      
      // Also save to user profile if available
      const userProfile = localStorage.getItem('onecardUser');
      if (userProfile) {
        try {
          const profile = JSON.parse(userProfile);
          profile.bankingInfo = updatedData;
          localStorage.setItem('onecardUser', JSON.stringify(profile));
        } catch (error) {
          console.log('Profile update skipped');
        }
      }

      console.log('✅ Banking information permanently saved');
      return true;
    } catch (error) {
      console.error('Failed to save banking information:', error);
      return false;
    }
  };

  // Load saved banking information
  const getBankingInfo = (): BankingInfo => {
    try {
      // Try to load from permanent storage first
      const permanentData = localStorage.getItem('permanentBankingInfo');
      if (permanentData) {
        return JSON.parse(permanentData);
      }

      // Fallback to session storage
      const sessionData = sessionStorage.getItem('currentBankingInfo');
      if (sessionData) {
        return JSON.parse(sessionData);
      }

      // Fallback to user profile
      const userProfile = localStorage.getItem('onecardUser');
      if (userProfile) {
        const profile = JSON.parse(userProfile);
        if (profile.bankingInfo) {
          return profile.bankingInfo;
        }
      }

      return {
        bankName: '',
        accountNumber: '',
        branchCode: '',
        routingNumber: ''
      };
    } catch (error) {
      console.error('Failed to load banking information:', error);
      return {
        bankName: '',
        accountNumber: '',
        branchCode: '',
        routingNumber: ''
      };
    }
  };

  // Auto-save banking info when any field changes
  const autoSaveBankingField = (field: keyof BankingInfo, value: string) => {
    if (value && value.trim()) {
      const currentData = getBankingInfo();
      const updatedData = { ...currentData, [field]: value };
      saveBankingInfo(updatedData);
    }
  };

  // Clear banking information
  const clearBankingInfo = () => {
    try {
      localStorage.removeItem('permanentBankingInfo');
      sessionStorage.removeItem('currentBankingInfo');
      
      // Also clear from user profile
      const userProfile = localStorage.getItem('onecardUser');
      if (userProfile) {
        try {
          const profile = JSON.parse(userProfile);
          delete profile.bankingInfo;
          localStorage.setItem('onecardUser', JSON.stringify(profile));
        } catch (error) {
          console.log('Profile banking clear skipped');
        }
      }

      toast({
        title: "Banking Information Cleared",
        description: "All saved banking details have been removed.",
      });
    } catch (error) {
      console.error('Failed to clear banking information:', error);
    }
  };

  return {
    saveBankingInfo,
    getBankingInfo,
    autoSaveBankingField,
    clearBankingInfo
  };
};
