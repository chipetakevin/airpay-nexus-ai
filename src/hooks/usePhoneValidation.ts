
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePhoneValidation = () => {
  const [detectedNetwork, setDetectedNetwork] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [acceptedUnknownNumber, setAcceptedUnknownNumber] = useState(false);
  const [requiresTermsAcceptance, setRequiresTermsAcceptance] = useState(false);

  const detectNetworkFromPrefix = (phone: string): string => {
    const cleanPhone = phone.replace(/\D/g, '');
    let prefix = '';
    
    // Handle different formats and extract the first 3 digits after country code
    if (cleanPhone.startsWith('27')) {
      prefix = cleanPhone.substring(2, 5);
    } else if (cleanPhone.startsWith('0')) {
      prefix = cleanPhone.substring(0, 3);
    } else {
      prefix = cleanPhone.substring(0, 3);
    }
    
    const networkMap: { [key: string]: string } = {
      '083': 'MTN', '084': 'MTN', '073': 'MTN', '074': 'MTN',
      '082': 'Vodacom', '071': 'Vodacom', '072': 'Vodacom',
      '060': 'Vodacom', '061': 'Vodacom', '062': 'Vodacom',
      '063': 'Vodacom', '064': 'Vodacom', '065': 'Vodacom',
      '066': 'Vodacom', '067': 'Vodacom', '068': 'Vodacom', '069': 'Vodacom',
      '076': 'Cell C',
      '081': 'Telkom', '079': 'Telkom',
      '087': 'Rain'
    };

    return networkMap[prefix] || 'Unknown';
  };

  const validateSouthAfricanMobile = (phoneNumber: string): { isValid: boolean; error?: string } => {
    if (!phoneNumber) {
      return { isValid: false, error: 'Phone number is required' };
    }

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    
    // Handle different input formats
    let normalizedPhone = '';
    
    if (cleanPhone.startsWith('27')) {
      // International format: +27832466539 (11 digits total)
      if (cleanPhone.length !== 11) {
        return { isValid: false, error: 'International format must be 11 digits (+27xxxxxxxxx)' };
      }
      normalizedPhone = cleanPhone.substring(2); // Remove country code
    } else if (cleanPhone.startsWith('0')) {
      // National format: 0832466539 (10 digits total)
      if (cleanPhone.length !== 10) {
        return { isValid: false, error: 'National format must be 10 digits (0xxxxxxxxx)' };
      }
      normalizedPhone = cleanPhone.substring(1); // Remove leading 0
    } else {
      // Local format: 832466539 (9 digits) - This is our preferred format
      if (cleanPhone.length !== 9) {
        return { isValid: false, error: 'Mobile number must be 9 digits (xxxxxxxxx)' };
      }
      normalizedPhone = cleanPhone;
    }
    
    // Check if it's a valid mobile prefix (first 2 digits after removing country code and 0)
    const prefix = normalizedPhone.substring(0, 2);
    const validPrefixes = ['83', '84', '73', '74', '82', '71', '72', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '76', '81', '79', '87'];
    
    if (!validPrefixes.includes(prefix)) {
      return { isValid: false, error: 'Invalid South African mobile number prefix' };
    }
    
    return { isValid: true };
  };

  const isRegisteredNumber = (phoneNumber: string): boolean => {
    // Check if this number is associated with a registered user
    const credentials = localStorage.getItem('userCredentials');
    if (credentials) {
      try {
        const parsedCredentials = JSON.parse(credentials);
        // Check against stored phone (9-digit format)
        const cleanInput = phoneNumber.replace(/\D/g, '');
        let normalizedInput = cleanInput;
        
        if (cleanInput.startsWith('27')) {
          normalizedInput = cleanInput.substring(2);
        } else if (cleanInput.startsWith('0')) {
          normalizedInput = cleanInput.substring(1);
        }
        
        return parsedCredentials.phone === normalizedInput || parsedCredentials.phoneNumber === normalizedInput;
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }
    return false;
  };

  const validatePhoneNumber = async (phoneNumber: string, cartItems: any[] = []) => {
    setIsValidating(true);
    setValidationError('');
    setRequiresTermsAcceptance(false);
    
    try {
      // First validate South African mobile number format
      const saValidation = validateSouthAfricanMobile(phoneNumber);
      if (!saValidation.isValid) {
        setValidationError(saValidation.error || 'Invalid South African mobile number');
        setIsValidating(false);
        return;
      }

      // Normalize phone for database lookup
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      let normalizedPhone = cleanPhone;
      
      if (cleanPhone.startsWith('27')) {
        normalizedPhone = cleanPhone.substring(2);
      } else if (cleanPhone.startsWith('0')) {
        normalizedPhone = cleanPhone.substring(1);
      }

      // For registered numbers, assume valid and skip RICA validation
      if (isRegisteredNumber(normalizedPhone)) {
        const networkFromPrefix = detectNetworkFromPrefix(normalizedPhone);
        setDetectedNetwork(networkFromPrefix);
        setRequiresTermsAcceptance(true);
        setIsValidating(false);
        return;
      }

      // For non-registered numbers, check RICA database
      const fullPhoneForRica = `+27${normalizedPhone}`;
      const { data: ricaData, error } = await supabase
        .from('rica_validations')
        .select('*')
        .eq('phone_number', fullPhoneForRica)
        .eq('status', 'verified')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('RICA validation error:', error);
      }

      let networkFromPrefix = 'Unknown';
      
      if (ricaData) {
        networkFromPrefix = ricaData.network_provider;
        setDetectedNetwork(networkFromPrefix);
        setRequiresTermsAcceptance(true);
      } else {
        networkFromPrefix = detectNetworkFromPrefix(normalizedPhone);
        setDetectedNetwork(networkFromPrefix);
        setRequiresTermsAcceptance(true);
      }
      
    } catch (error) {
      console.error('Validation error:', error);
      setValidationError('Unable to validate number. Please try again.');
      setRequiresTermsAcceptance(true);
    } finally {
      setIsValidating(false);
    }
  };

  const acceptUnknownNumberTerms = () => {
    setAcceptedUnknownNumber(true);
    setValidationError('');
    setRequiresTermsAcceptance(true);
  };

  return {
    detectedNetwork,
    isValidating,
    validationError,
    acceptedUnknownNumber,
    requiresTermsAcceptance,
    validatePhoneNumber,
    acceptUnknownNumberTerms,
    validateSouthAfricanMobile,
    setValidationError
  };
};
