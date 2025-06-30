
import { useState } from 'react';
import { validateSouthAfricanMobile } from '@/utils/phoneValidation';
import { detectNetworkFromPrefix } from '@/utils/phoneFormatting';
import { useRicaValidation } from './useRicaValidation';

export const usePhoneValidation = () => {
  const ricaValidation = useRicaValidation();

  return {
    // Re-export validation utilities for backward compatibility
    validateSouthAfricanMobile,
    detectNetworkFromPrefix,
    
    // Re-export RICA validation functionality
    ...ricaValidation
  };
};
