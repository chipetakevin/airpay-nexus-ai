
import { validateEmail, validateAccountNumber } from '@/utils/formValidation';
import { AdminFormData, AdminFormErrors } from '@/types/adminRegistration';

const validatePassword = (password: string) => {
  // Admin password must be the authorized password for full privileges
  return password === 'Malawi@1976';
};

export const validateAdminForm = (formData: AdminFormData): AdminFormErrors => {
  const errors: AdminFormErrors = {};
  
  if (!formData.firstName) errors.firstName = 'First name is required';
  if (!formData.lastName) errors.lastName = 'Last name is required';
  if (!formData.companyName) errors.companyName = 'Company name is required';
  if (!formData.email) errors.email = 'Email is required';
  if (!validateEmail(formData.email)) errors.email = 'Invalid email format';
  if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required';
  if (!formData.password) errors.password = 'Admin password is required';
  if (!validatePassword(formData.password)) errors.password = 'Invalid admin password. Enter authorized password for full privileges.';
  if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your admin password';
  if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
  if (!formData.bankName) errors.bankName = 'Bank selection is required';
  if (!formData.accountNumber) errors.accountNumber = 'Account number is required';
  if (!validateAccountNumber(formData.accountNumber)) errors.accountNumber = 'Invalid account number';
  if (!formData.agreeTerms) errors.agreeTerms = 'You must agree to terms and conditions';

  return errors;
};

export const validateField = (field: keyof AdminFormData, value: any, formData: AdminFormData): string => {
  if (field === 'email' && value && !validateEmail(value)) {
    return 'Please enter a valid email address';
  }

  if (field === 'password' && value && !validatePassword(value)) {
    return 'Enter authorized admin password for full privileges';
  }

  if (field === 'confirmPassword' && value && value !== formData.password) {
    return 'Passwords do not match';
  }

  if (field === 'accountNumber' && value && !validateAccountNumber(value)) {
    return 'Account number must be 8-12 digits';
  }

  return '';
};
