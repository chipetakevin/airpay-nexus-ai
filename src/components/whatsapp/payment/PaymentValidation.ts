
// Luhn algorithm validation
export const validateCardNumber = (number: string) => {
  const cleanNumber = number.replace(/\s+/g, '');
  if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;
  
  let sum = 0;
  let alternate = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let n = parseInt(cleanNumber.charAt(i), 10);
    
    if (alternate) {
      n *= 2;
      if (n > 9) n = (n % 10) + 1;
    }
    
    sum += n;
    alternate = !alternate;
  }
  
  return sum % 10 === 0;
};

// Card type detection
export const detectCardType = (number: string) => {
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]|^2[2-7]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/
  };
  
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(number)) {
      return type;
    }
  }
  return '';
};

// Validate card holder name (first and last name required)
export const validateCardholderName = (name: string) => {
  const nameParts = name.trim().split(' ');
  return nameParts.length >= 2 && nameParts.every(part => part.length > 0);
};

// Validate form
export const validatePaymentForm = (formData: any, currentStep: number) => {
  const newErrors: Record<string, string> = {};
  
  if (!validateCardNumber(formData.cardNumber.replace(/\s/g, ''))) {
    newErrors.cardNumber = 'Invalid card number';
  }
  
  if (!formData.expiryDate || formData.expiryDate.length !== 5) {
    newErrors.expiryDate = 'Invalid expiry date';
  } else {
    const [month, year] = formData.expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      newErrors.expiryDate = 'Card has expired';
    }
  }
  
  if (!formData.cvv || formData.cvv.length < 3) {
    newErrors.cvv = 'Invalid CVV';
  }
  
  if (!validateCardholderName(formData.cardholderName)) {
    newErrors.cardholderName = 'Please enter first and last name as they appear on card';
  }
  
  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address';
  }
  
  if (!formData.phone) {
    newErrors.phone = 'Phone number is required';
  }
  
  if (currentStep === 2) {
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
  }
  
  return newErrors;
};
