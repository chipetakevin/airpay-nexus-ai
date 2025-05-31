
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData, FormErrors } from '@/types/customerRegistration';
import { validateAccountNumber } from '@/utils/formValidation';
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
        <Label htmlFor="accountNumber">Account Number *</Label>
        <Input
          id="accountNumber"
          name="accountNumber"
          autoComplete="off"
          value={formData.accountNumber}
          onChange={(e) => onInputChange('accountNumber', e.target.value)}
          placeholder="Enter account number"
          className={errors.accountNumber ? 'border-red-500' : ''}
        />
        {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
        {formData.accountNumber && validateAccountNumber(formData.accountNumber) && (
          <p className="text-green-600 text-sm">✓ Valid account number format</p>
        )}
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
          ℹ️ South African banks use branch codes for transactions
        </p>
      </div>
    </>
  );
};

export default BankingSection;
