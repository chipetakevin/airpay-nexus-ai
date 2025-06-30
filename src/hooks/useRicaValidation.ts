
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { detectNetworkFromPrefix, normalizePhoneNumber } from '@/utils/phoneFormatting';
import { validateSouthAfricanMobile, isRegisteredNumber } from '@/utils/phoneValidation';

export const useRicaValidation = () => {
  const [detectedNetwork, setDetectedNetwork] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [acceptedUnknownNumber, setAcceptedUnknownNumber] = useState(false);
  const [requiresTermsAcceptance, setRequiresTermsAcceptance] = useState(false);

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
      const normalizedPhone = normalizePhoneNumber(phoneNumber);

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
    setValidationError
  };
};
