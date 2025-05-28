
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  branchCode: string;
  rememberPassword: boolean;
  agreeTerms: boolean;
  marketingConsent: boolean;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  bankName?: string;
  accountNumber?: string;
  agreeTerms?: string;
}
