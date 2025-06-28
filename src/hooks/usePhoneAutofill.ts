import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const usePhoneAutofill = () => {
  const [detectedPhone, setDetectedPhone] = useState('');
  const [savedPhoneNumbers, setSavedPhoneNumbers] = useState<string[]>([]);
  const [savedBankingInfo, setSavedBankingInfo] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load all saved phone numbers
    const savedNumbers = localStorage.getItem('savedPhoneNumbers');
    if (savedNumbers) {
      try {
        const parsedNumbers = JSON.parse(savedNumbers);
        setSavedPhoneNumbers(parsedNumbers);
        // Set the most recent number as detected
        if (parsedNumbers.length > 0) {
          setDetectedPhone(parsedNumbers[0]);
        }
      } catch (error) {
        console.error('Error parsing saved phone numbers:', error);
      }
    }

    // Auto-detect and fill phone number from various sources
    const credentials = localStorage.getItem('userCredentials');
    const userData = localStorage.getItem('onecardUser');
    
    if (credentials) {
      try {
        const parsedCredentials = JSON.parse(credentials);
        if (parsedCredentials.phone) {
          const normalizedPhone = normalizePhoneNumber(parsedCredentials.phone);
          setDetectedPhone(normalizedPhone);
          savePhoneNumber(normalizedPhone);
        }
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.phone || parsedUserData.registeredPhone) {
          const phone = parsedUserData.phone || parsedUserData.registeredPhone;
          const normalizedPhone = normalizePhoneNumber(phone);
          setDetectedPhone(normalizedPhone);
          savePhoneNumber(normalizedPhone);
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

  const normalizePhoneNumber = (phone: string): string => {
    if (!phone) return '';
    
    // Remove all non-numeric characters
    let cleanPhone = phone.replace(/\D/g, '');
    
    // Handle different formats
    if (cleanPhone.startsWith('27')) {
      // Remove country code to get local format
      cleanPhone = cleanPhone.substring(2);
    } else if (cleanPhone.startsWith('0')) {
      // Remove leading zero
      cleanPhone = cleanPhone.substring(1);
    }
    
    // Ensure it's a valid 9-digit SA mobile number
    if (cleanPhone.length === 9) {
      return cleanPhone;
    }
    
    return phone; // Return original if can't normalize
  };

  const savePhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) return;
    
    const normalizedPhone = normalizePhoneNumber(phoneNumber);
    
    // Get existing saved numbers
    const existingNumbers = JSON.parse(localStorage.getItem('savedPhoneNumbers') || '[]');
    
    // Add new number if not already saved (move to front if exists)
    const updatedNumbers = [normalizedPhone, ...existingNumbers.filter((num: string) => num !== normalizedPhone)];
    
    // Keep only the last 5 numbers
    const numbersToSave = updatedNumbers.slice(0, 5);
    
    localStorage.setItem('savedPhoneNumbers', JSON.stringify(numbersToSave));
    setSavedPhoneNumbers(numbersToSave);
    
    toast({
      title: "Phone Number Saved",
      description: "Your phone number has been permanently saved for future use.",
    });
  };

  const saveBankingInfo = (bankInfo: any) => {
    const sanitizedInfo = {
      bankName: bankInfo.bankName,
      branchCode: bankInfo.branchCode,
      accountNumber: bankInfo.accountNumber ? '****' + bankInfo.accountNumber.slice(-4) : '',
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

  const formatPhoneForDisplay = (phone: string): string => {
    const normalized = normalizePhoneNumber(phone);
    return `+27${normalized}`;
  };

  return {
    detectedPhone,
    savedPhoneNumbers,
    savedBankingInfo,
    saveBankingInfo,
    savePhoneNumber,
    autoFillPhone,
    normalizePhoneNumber,
    formatPhoneForDisplay
  };
};
