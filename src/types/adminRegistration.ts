
export interface AdminFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  businessType: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  branchCode: string;
  promoCode: string;
  adminRole: string;
  rememberPassword: boolean;
  agreeTerms: boolean;
  marketingConsent: boolean;
  twoFactorAuth?: boolean;
}

export interface AdminFormErrors {
  [key: string]: string;
}
