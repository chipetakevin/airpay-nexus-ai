
import { validateEmail, validateAccountNumber } from '@/utils/formValidation';
import { VendorFormData, VendorFormErrors } from '@/types/vendorRegistration';

const validatePassword = (password: string) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return minLength && hasUpperCase && hasLowerCase && hasNumber;
};

export const validateVendorForm = (formData: VendorFormData): VendorFormErrors => {
  const errors: VendorFormErrors = {};
  
  if (!formData.firstName) errors.firstName = 'First name is required';
  if (!formData.lastName) errors.lastName = 'Last name is required';
  if (!formData.companyName) errors.companyName = 'Company name is required';
  if (!formData.email) errors.email = 'Email is required';
  if (!validateEmail(formData.email)) errors.email = 'Invalid email format';
  if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required';
  if (!formData.password) errors.password = 'Password is required';
  if (!validatePassword(formData.password)) errors.password = 'Password does not meet requirements';
  if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password';
  if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
  if (!formData.bankName) errors.bankName = 'Bank selection is required';
  if (!formData.accountNumber) errors.accountNumber = 'Account number is required';
  if (!validateAccountNumber(formData.accountNumber)) errors.accountNumber = 'Invalid account number';
  if (!formData.agreeTerms) errors.agreeTerms = 'You must agree to terms and conditions';

  return errors;
};

export const validateField = (field: keyof VendorFormData, value: any, formData: VendorFormData): string => {
  if (field === 'email' && value && !validateEmail(value)) {
    return 'Please enter a valid email address';
  }

  if (field === 'password' && value && !validatePassword(value)) {
    return 'Password must meet security requirements';
  }

  if (field === 'confirmPassword' && value && value !== formData.password) {
    return 'Passwords do not match';
  }

  if (field === 'accountNumber' && value && !validateAccountNumber(value)) {
    return 'Account number must be 8-12 digits';
  }

  return '';
};
