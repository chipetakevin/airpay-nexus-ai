
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData, FormErrors } from '@/types/customerRegistration';
import { validateSouthAfricanBankAccount } from '@/utils/bankingValidation';
import BankAutocomplete from '../BankAutocomplete';

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
  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    onInputChange('accountNumber', value);
  };

  const accountValidation = formData.accountNumber ? validateSouthAfricanBankAccount(formData.accountNumber) : null;

  return (
    <>
      <BankAutocomplete 
        onBankSelect={(bank, routing, branchCode) => {
          onInputChange('bankName', bank);
          onInputChange('branchCode', branchCode);
        }}
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
          value={formData.branchCode}
          placeholder="Auto-filled based on bank selection"
          readOnly
          className="bg-gray-50"
        />
        <p className="text-xs text-gray-600">
          ℹ️ South African banks use 6-digit branch codes for transactions
        </p>
      </div>
    </>
  );
};

export default BankingSection;
