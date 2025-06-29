import { useState, useEffect } from 'react';

export const usePhoneAutofill = () => {
  const [detectedPhone, setDetectedPhone] = useState('');
  const [savedPhoneNumbers, setSavedPhoneNumbers] = useState<string[]>([]);
  const [savedBankingInfo, setSavedBankingInfo] = useState<any>(null);

  // Enhanced phone detection for all user types
  const detectRegisteredPhone = () => {
    const userCredentials = localStorage.getItem('userCredentials');
    const onecardUser = localStorage.getItem('onecardUser');
    const onecardVendor = localStorage.getItem('onecardVendor');
    const onecardAdmin = localStorage.getItem('onecardAdmin');
    
    let phoneNumber = '';
    
    try {
      // Check userCredentials first
      if (userCredentials) {
        const credentials = JSON.parse(userCredentials);
        phoneNumber = credentials.phone || credentials.registeredPhone || credentials.phoneNumber;
        
        // If still no phone, check userType and get from appropriate storage
        if (!phoneNumber && credentials.userType) {
          if (credentials.userType === 'customer' && onecardUser) {
            const userData = JSON.parse(onecardUser);
            phoneNumber = userData.registeredPhone || userData.phone || userData.phoneNumber;
          } else if (credentials.userType === 'vendor' && onecardVendor) {
            const vendorData = JSON.parse(onecardVendor);
            phoneNumber = vendorData.registeredPhone || vendorData.phone || vendorData.phoneNumber;
          } else if (credentials.userType === 'admin' && onecardAdmin) {
            const adminData = JSON.parse(onecardAdmin);
            phoneNumber = adminData.registeredPhone || adminData.phone || adminData.phoneNumber;
          }
        }
      }
      
      // Fallback: check each user type storage directly
      if (!phoneNumber) {
        [onecardUser, onecardVendor, onecardAdmin].forEach(storage => {
          if (storage && !phoneNumber) {
            try {
              const data = JSON.parse(storage);
              phoneNumber = data.registeredPhone || data.phone || data.phoneNumber;
            } catch (e) {
              console.error('Error parsing storage data:', e);
            }
          }
        });
      }
      
      return normalizePhoneNumber(phoneNumber);
    } catch (error) {
      console.error('Error detecting registered phone:', error);
      return '';
    }
  };

  // Load saved banking information
  const loadSavedBankingInfo = () => {
    try {
      const credentials = localStorage.getItem('userCredentials');
      if (credentials) {
        const parsed = JSON.parse(credentials);
        const userType = parsed.userType || 'customer';
        
        let bankingData = null;
        
        if (userType === 'customer') {
          const userData = localStorage.getItem('onecardUser');
          if (userData) {
            const user = JSON.parse(userData);
            if (user.bankName && user.accountNumber) {
              bankingData = {
                bankName: user.bankName,
                accountNumber: user.accountNumber.slice(-4),
                branchCode: user.branchCode
              };
            }
          }
        } else if (userType === 'vendor') {
          const vendorData = localStorage.getItem('onecardVendor');
          if (vendorData) {
            const vendor = JSON.parse(vendorData);
            if (vendor.bankName && vendor.accountNumber) {
              bankingData = {
                bankName: vendor.bankName,
                accountNumber: vendor.accountNumber.slice(-4),
                branchCode: vendor.branchCode
              };
            }
          }
        } else if (userType === 'admin') {
          const adminData = localStorage.getItem('onecardAdmin');
          if (adminData) {
            const admin = JSON.parse(adminData);
            if (admin.bankName && admin.accountNumber) {
              bankingData = {
                bankName: admin.bankName,
                accountNumber: admin.accountNumber.slice(-4),
                branchCode: admin.branchCode
              };
            }
          }
        }
        
        setSavedBankingInfo(bankingData);
      }
    } catch (error) {
      console.error('Error loading banking info:', error);
    }
  };

  useEffect(() => {
    const phone = detectRegisteredPhone();
    if (phone) {
      setDetectedPhone(phone);
      console.log('📱 Phone auto-detected for all user types:', phone);
    }
    
    loadSavedBankingInfo();
    loadSavedPhoneNumbers();
  }, []);

  const normalizePhoneNumber = (phone: string): string => {
    if (!phone) return '';
    
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Remove country code (27) if present
    if (cleanPhone.startsWith('27') && cleanPhone.length === 11) {
      return cleanPhone.substring(2);
    }
    
    // Remove leading zero if present
    if (cleanPhone.startsWith('0') && cleanPhone.length === 10) {
      return cleanPhone.substring(1);
    }
    
    // Return as-is if it's already 9 digits
    if (cleanPhone.length === 9) {
      return cleanPhone;
    }
    
    return cleanPhone;
  };

  const formatPhoneForDisplay = (phone: string): string => {
    const normalized = normalizePhoneNumber(phone);
    return normalized ? `+27${normalized}` : phone;
  };

  const savePhoneNumber = (phone: string) => {
    const normalized = normalizePhoneNumber(phone);
    if (normalized && normalized.length === 9) {
      const saved = JSON.parse(localStorage.getItem('savedPhoneNumbers') || '[]');
      if (!saved.includes(normalized)) {
        saved.unshift(normalized);
        // Keep only last 5 numbers
        if (saved.length > 5) saved.pop();
        localStorage.setItem('savedPhoneNumbers', JSON.stringify(saved));
        setSavedPhoneNumbers(saved);
      }
    }
  };

  const loadSavedPhoneNumbers = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('savedPhoneNumbers') || '[]');
      setSavedPhoneNumbers(saved);
    } catch (error) {
      console.error('Error loading saved phone numbers:', error);
    }
  };

  const autoFillPhone = () => {
    return detectedPhone;
  };

  return {
    detectedPhone,
    savedPhoneNumbers,
    savedBankingInfo,
    normalizePhoneNumber,
    formatPhoneForDisplay,
    savePhoneNumber,
    autoFillPhone
  };
};
