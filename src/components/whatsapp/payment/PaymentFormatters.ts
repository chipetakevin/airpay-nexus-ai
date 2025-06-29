
import { useToast } from '@/hooks/use-toast';

// Format card number with spaces
export const formatCardNumber = (value: string) => {
  const cleanValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = cleanValue.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];
  
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  
  if (parts.length) {
    return parts.join(' ');
  } else {
    return cleanValue;
  }
};

// Format expiry date
export const formatExpiryDate = (value: string, toast: any) => {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length >= 2) {
    const month = cleanValue.substring(0, 2);
    const year = cleanValue.substring(2, 4);
    
    // Validate month
    if (parseInt(month) > 12) {
      toast({
        title: "Invalid Month",
        description: "Please enter a valid month (01-12)",
        variant: "destructive"
      });
      return '';
    }
    
    return `${month}/${year}`;
  }
  return cleanValue;
};

// Auto-detect and format South African phone numbers
export const formatPhoneNumber = (value: string) => {
  let cleanValue = value.replace(/\D/g, '');
  
  // Remove leading zeros
  if (cleanValue.startsWith('0')) {
    cleanValue = cleanValue.substring(1);
  }
  
  // Add South African country code if not present
  if (!cleanValue.startsWith('27')) {
    cleanValue = '27' + cleanValue;
  }
  
  return '+' + cleanValue;
};
