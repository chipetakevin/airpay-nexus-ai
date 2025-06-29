
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

  const isRegisteredNumber = (phoneNumber: string): boolean => {
    // Check if this number is associated with a registered user
    const credentials = localStorage.getItem('userCredentials');
    if (credentials) {
      try {
        const parsedCredentials = JSON.parse(credentials);
        return parsedCredentials.phone === phoneNumber;
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }
    return false;
  };

  const validatePhoneNumber = async (phoneNumber: string, cartItems: any[]) => {
    setIsValidating(true);
    setValidationError('');
    setRequiresTermsAcceptance(false);
    
    try {
      // Basic format validation
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        setValidationError('Phone number must be at least 10 digits');
        setIsValidating(false);
        return;
      }

      // For registered numbers, assume valid and skip RICA validation
      if (isRegisteredNumber(phoneNumber)) {
        const networkFromPrefix = detectNetworkFromPrefix(phoneNumber);
        setDetectedNetwork(networkFromPrefix);
        setRequiresTermsAcceptance(true); // Always require terms for SA regulations
        setIsValidating(false);
        return;
      }

      // For non-registered numbers, check RICA database
      const { data: ricaData, error } = await supabase
        .from('rica_validations')
        .select('*')
        .eq('phone_number', phoneNumber)
        .eq('status', 'verified')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('RICA validation error:', error);
      }

      let networkFromPrefix = 'Unknown';
      
      if (ricaData) {
        networkFromPrefix = ricaData.network_provider;
        setDetectedNetwork(networkFromPrefix);
        setRequiresTermsAcceptance(true); // Always require terms
      } else {
        networkFromPrefix = detectNetworkFromPrefix(phoneNumber);
        setDetectedNetwork(networkFromPrefix);
        
        // FIXED: Don't show error for unknown numbers - just require terms acceptance
        setRequiresTermsAcceptance(true); // Always require terms, even for unknown numbers
      }
      
      // FIXED: Remove network mismatch validation - allow all numbers when terms are accepted
      
    } catch (error) {
      console.error('Validation error:', error);
      setValidationError('Unable to validate number. Please try again.');
      setRequiresTermsAcceptance(true); // Still require terms
    } finally {
      setIsValidating(false);
    }
  };

  const acceptUnknownNumberTerms = () => {
    setAcceptedUnknownNumber(true);
    setValidationError('');
    setRequiresTermsAcceptance(true); // Ensure terms are still required
  };

  return {
    detectedNetwork,
    isValidating,
    validationError,
    acceptedUnknownNumber,
    requiresTermsAcceptance,
    validatePhoneNumber,
    acceptUnknownNumberTerms,
    setValidationError
  };
};
