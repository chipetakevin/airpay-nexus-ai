
export interface BankingValidationResult {
  isValid: boolean;
  error?: string;
  formattedValue?: string;
}

// South African bank account number validation
export const validateSouthAfricanBankAccount = (accountNumber: string): BankingValidationResult => {
  const cleanNumber = accountNumber.replace(/\D/g, '');
  
  // South African bank account numbers are typically 9-11 digits
  if (cleanNumber.length < 9 || cleanNumber.length > 11) {
    return {
      isValid: false,
      error: 'South African bank account numbers must be 9-11 digits'
    };
  }
  
  // Check for valid SA bank account patterns
  const firstDigit = cleanNumber.charAt(0);
  if (!['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(firstDigit)) {
    return {
      isValid: false,
      error: 'Invalid South African bank account number format'
    };
  }
  
  return {
    isValid: true,
    formattedValue: cleanNumber
  };
};

// South African bank card number validation (16 digits)
export const validateSouthAfricanBankCard = (cardNumber: string): BankingValidationResult => {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  // South African bank cards are 16 digits
  if (cleanNumber.length !== 16) {
    return {
      isValid: false,
      error: 'South African bank cards must be exactly 16 digits'
    };
  }
  
  // Basic Luhn algorithm check for card validation
  if (!isValidLuhn(cleanNumber)) {
    return {
      isValid: false,
      error: 'Invalid bank card number'
    };
  }
  
  // Check for South African bank card prefixes
  const prefix = cleanNumber.substring(0, 4);
  const validPrefixes = [
    '4000', '4001', '4002', '4003', // Visa
    '5100', '5200', '5300', '5400', '5500', // Mastercard
    '6000', '6001', '6002', // Maestro
  ];
  
  const hasValidPrefix = validPrefixes.some(validPrefix => 
    prefix.startsWith(validPrefix.substring(0, 4))
  );
  
  if (!hasValidPrefix) {
    console.warn('Card prefix not in common SA range, but accepting');
  }
  
  return {
    isValid: true,
    formattedValue: formatCardNumber(cleanNumber)
  };
};

// Luhn algorithm for card validation
const isValidLuhn = (cardNumber: string): boolean => {
  let sum = 0;
  let alternate = false;
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);
    
    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit = (digit % 10) + 1;
      }
    }
    
    sum += digit;
    alternate = !alternate;
  }
  
  return sum % 10 === 0;
};

// Format card number for display
const formatCardNumber = (cardNumber: string): string => {
  return cardNumber.replace(/(.{4})/g, '$1 ').trim();
};

// South African branch code validation
export const validateSouthAfricanBranchCode = (branchCode: string): BankingValidationResult => {
  const cleanCode = branchCode.replace(/\D/g, '');
  
  // SA branch codes are typically 6 digits
  if (cleanCode.length !== 6) {
    return {
      isValid: false,
      error: 'South African branch codes must be exactly 6 digits'
    };
  }
  
  return {
    isValid: true,
    formattedValue: cleanCode
  };
};
