
export interface VendorFormData {
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
  rememberPassword: boolean;
  agreeTerms: boolean;
  marketingConsent: boolean;
}

export interface VendorFormErrors {
  [key: string]: string;
}
