
export interface BankingValidationResult {
  isComplete: boolean;
  hasValidBankName: boolean;
  hasValidAccountNumber: boolean;
  hasValidBranchCode: boolean;
}

export const validateBankingForm = (formData: any, errors: any): BankingValidationResult => {
  const hasValidBankName = formData.bankName && 
                          formData.bankName.trim().length > 0 && 
                          !errors.bankName;
  
  const hasValidAccountNumber = formData.accountNumber && 
                               formData.accountNumber.length >= 8 && 
                               /^\d+$/.test(formData.accountNumber) &&
                               !errors.accountNumber;
  
  const hasValidBranchCode = formData.branchCode && 
                            formData.branchCode.trim().length > 0;

  const isComplete = hasValidBankName && hasValidAccountNumber && hasValidBranchCode;

  console.log('🔍 Banking validation:', {
    bankName: hasValidBankName,
    accountNumber: hasValidAccountNumber,
    branchCode: hasValidBranchCode,
    complete: isComplete
  });

  return {
    isComplete,
    hasValidBankName,
    hasValidAccountNumber,
    hasValidBranchCode
  };
};
