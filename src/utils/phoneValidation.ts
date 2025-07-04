
export interface PhoneValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateSouthAfricanMobile = (phoneNumber: string): PhoneValidationResult => {
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
    // CRITICAL: Block any numbers starting with 0 in local format
    if (cleanPhone.startsWith('0')) {
      return { isValid: false, error: 'Mobile numbers cannot start with 0. Use format: 832466539' };
    }
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

export const isRegisteredNumber = (phoneNumber: string): boolean => {
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
