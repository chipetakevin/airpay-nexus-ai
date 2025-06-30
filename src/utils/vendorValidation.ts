
import { validateEmail, validateAccountNumber } from '@/utils/formValidation';
import { VendorFormData, VendorFormErrors } from '@/types/vendorRegistration';

const validatePassword = (password: string) => {
  if (!password || password.length < 8) return false;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return hasUpperCase && hasLowerCase && hasNumber;
};

export const validateVendorForm = (formData: VendorFormData): VendorFormErrors => {
  const errors: VendorFormErrors = {};
  
  // Personal information validation
  if (!formData.firstName || !formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  }
  
  if (!formData.lastName || !formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }
  
  if (!formData.companyName || !formData.companyName.trim()) {
    errors.companyName = 'Company name is required';
  }
  
  // Email validation
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Invalid email format';
  }
  
  // Phone validation
  if (!formData.phoneNumber || !formData.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required';
  }
  
  // Password validation
  if (!formData.password || !formData.password.trim()) {
    errors.password = 'Password is required';
  } else if (!validatePassword(formData.password)) {
    errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
  }
  
  if (!formData.confirmPassword || !formData.confirmPassword.trim()) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  // Banking validation
  if (!formData.bankName || !formData.bankName.trim()) {
    errors.bankName = 'Bank selection is required';
  }
  
  if (!formData.accountNumber || !formData.accountNumber.trim()) {
    errors.accountNumber = 'Account number is required';
  } else if (!validateAccountNumber(formData.accountNumber)) {
    errors.accountNumber = 'Invalid account number format';
  }
  
  if (!formData.branchCode || !formData.branchCode.trim()) {
    errors.branchCode = 'Branch code is required';
  }
  
  // Terms agreement validation
  if (!formData.agreeTerms) {
    errors.agreeTerms = 'You must agree to terms and conditions';
  }

  return errors;
};

export const validateField = (field: keyof VendorFormData, value: any, formData: VendorFormData): string => {
  if (field === 'email' && value && !validateEmail(value)) {
    return 'Please enter a valid email address';
  }

  if (field === 'password' && value && !validatePassword(value)) {
    return 'Password must be at least 8 characters with uppercase, lowercase, and number';
  }

  if (field === 'confirmPassword' && value && value !== formData.password) {
    return 'Passwords do not match';
  }

  if (field === 'accountNumber' && value && !validateAccountNumber(value)) {
    return 'Account number must be 8-12 digits';
  }

  return '';
};
