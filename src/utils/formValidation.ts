
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateAccountNumber = (accountNumber: string) => {
  return accountNumber.length >= 8 && accountNumber.length <= 12 && /^\d+$/.test(accountNumber);
};
