
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const usePhoneAutofill = () => {
  const [detectedPhone, setDetectedPhone] = useState('');
  const [savedBankingInfo, setSavedBankingInfo] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Auto-detect and fill phone number from registration
    const credentials = localStorage.getItem('userCredentials');
    const userData = localStorage.getItem('onecardUser');
    
    if (credentials) {
      try {
        const parsedCredentials = JSON.parse(credentials);
        if (parsedCredentials.phone) {
          setDetectedPhone(parsedCredentials.phone);
        }
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.phone) {
          setDetectedPhone(parsedUserData.phone);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Load saved banking information
    const bankingInfo = localStorage.getItem('savedBankingInfo');
    if (bankingInfo) {
      try {
        setSavedBankingInfo(JSON.parse(bankingInfo));
      } catch (error) {
        console.error('Error parsing banking info:', error);
      }
    }
  }, []);

  const saveBankingInfo = (bankInfo: any) => {
    const sanitizedInfo = {
      bankName: bankInfo.bankName,
      branchCode: bankInfo.branchCode,
      accountNumber: bankInfo.accountNumber ? '****' + bankInfo.accountNumber.slice(-4) : '', // Save only last 4 digits for security
      hasFullInfo: true
    };
    
    localStorage.setItem('savedBankingInfo', JSON.stringify(sanitizedInfo));
    setSavedBankingInfo(sanitizedInfo);
    
    toast({
      title: "Banking Info Saved",
      description: "Your banking details have been securely saved for future use.",
    });
  };

  const autoFillPhone = () => {
    return detectedPhone;
  };

  return {
    detectedPhone,
    savedBankingInfo,
    saveBankingInfo,
    autoFillPhone
  };
};
