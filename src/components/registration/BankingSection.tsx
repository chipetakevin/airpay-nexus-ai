
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData, FormErrors } from '@/types/customerRegistration';
import { validateSouthAfricanBankAccount } from '@/utils/bankingValidation';
import BankAutocomplete from '../BankAutocomplete';
import { useBranchCodeAutoAssign } from '@/hooks/useBranchCodeAutoAssign';
import { useToast } from '@/hooks/use-toast';

interface BankingSectionProps {
  formData: FormData;
  errors: FormErrors;
  onInputChange: (field: keyof FormData, value: any) => void;
}

const BankingSection: React.FC<BankingSectionProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  const { autoAssignBranchCode, loadSavedBankingInfo, getBranchCodeForBank } = useBranchCodeAutoAssign();
  const { toast } = useToast();

  // Auto-fill saved banking info on mount
  useEffect(() => {
    const savedInfo = loadSavedBankingInfo();
    if (savedInfo && savedInfo.bankName && !formData.bankName) {
      onInputChange('bankName', savedInfo.bankName);
      onInputChange('branchCode', savedInfo.branchCode);
      if (savedInfo.accountNumber && !formData.accountNumber) {
        onInputChange('accountNumber', savedInfo.accountNumber);
      }
      
      toast({
        title: "Banking Auto-Restored! 🏦",
        description: "Your saved banking information has been restored.",
      });
    }
  }, [loadSavedBankingInfo, onInputChange, formData.bankName, formData.accountNumber, toast]);

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    onInputChange('accountNumber', value);
  };

  const handleBankSelect = (bank: string, routing: string, branchCode: string) => {
    console.log(`🏦 Bank selected in BankingSection: ${bank}, Branch Code: ${branchCode}`);
    onInputChange('bankName', bank);
    
    // Get the correct branch code for the selected bank
    const correctBranchCode = getBranchCodeForBank(bank) || branchCode;
    onInputChange('branchCode', correctBranchCode);
    
    // Auto-assign and save branch code immediately
    if (correctBranchCode) {
      autoAssignBranchCode(bank, (code) => {
        onInputChange('branchCode', code);
      });
    }
    
    console.log(`✅ Branch code set: ${correctBranchCode} for ${bank}`);
  };

  const accountValidation = formData.accountNumber ? validateSouthAfricanBankAccount(formData.accountNumber) : null;

  return (
    <>
      <BankAutocomplete 
        onBankSelect={handleBankSelect}
        error={errors.bankName}
      />

      <div className="space-y-2">
        <Label htmlFor="accountNumber">South African Bank Account Number *</Label>
        <Input
          id="accountNumber"
          name="accountNumber"
          autoComplete="off"
          value={formData.accountNumber}
          onChange={handleAccountNumberChange}
          placeholder="Enter 9-11 digit account number"
          className={errors.accountNumber ? 'border-red-500' : accountValidation?.isValid ? 'border-green-500' : ''}
          maxLength={11}
        />
        {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
        {accountValidation?.isValid && (
          <p className="text-green-600 text-sm">✓ Valid South African bank account number</p>
        )}
        <div className="bg-blue-50 p-2 rounded border border-blue-200">
          <p className="text-xs text-blue-600">
            <strong>🏦 SA Bank Account:</strong> Enter your 9-11 digit account number (no spaces or dashes)
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="branchCode">Branch Code</Label>
        <Input
          id="branchCode"
          value={formData.branchCode || ''}
          placeholder={formData.branchCode ? formData.branchCode : "Select bank to auto-assign branch code"}
          readOnly
          className="bg-gray-50"
        />
        <div className="bg-green-50 p-2 rounded border border-green-200">
          <p className="text-xs text-green-600">
            ℹ️ Branch code automatically detected from your bank selection
            {formData.branchCode && (
              <span className="block mt-1">
                <strong>Current Branch Code: {formData.branchCode}</strong>
              </span>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default BankingSection;
