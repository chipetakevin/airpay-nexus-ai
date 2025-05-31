
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePhoneValidation = () => {
  const [detectedNetwork, setDetectedNetwork] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState('');

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

  const validatePhoneNumber = async (phoneNumber: string, cartItems: any[]) => {
    setIsValidating(true);
    setValidationError('');
    
    try {
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
      } else {
        networkFromPrefix = detectNetworkFromPrefix(phoneNumber);
        setDetectedNetwork(networkFromPrefix);
        
        if (networkFromPrefix === 'Unknown') {
          setValidationError('Phone number not found in RICA database or invalid format.');
        }
      }
      
      const networkMismatch = cartItems.some(item => 
        item.network.toLowerCase() !== networkFromPrefix.toLowerCase()
      );
      
      if (networkMismatch && cartItems.length > 0) {
        setValidationError(
          `This number belongs to ${networkFromPrefix}. Please select a ${networkFromPrefix} deal or use a different number.`
        );
      }
    } catch (error) {
      console.error('Validation error:', error);
      setValidationError('Unable to validate number. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  return {
    detectedNetwork,
    isValidating,
    validationError,
    validatePhoneNumber,
    setValidationError
  };
};
