
export const detectNetworkFromPrefix = (phone: string): string => {
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

export const normalizePhoneNumber = (phoneNumber: string): string => {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  if (cleanPhone.startsWith('27')) {
    return cleanPhone.substring(2); // Remove country code
  } else if (cleanPhone.startsWith('0')) {
    return cleanPhone.substring(1); // Remove leading 0
  }
  
  return cleanPhone;
};
