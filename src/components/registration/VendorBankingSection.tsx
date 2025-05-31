
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BankAutocomplete from '../BankAutocomplete';

interface VendorBankingProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
  onBankSelect: (bankName: string, routing: string, branchCode: string) => void;
}

const VendorBankingSection: React.FC<VendorBankingProps> = ({
  formData,
  errors,
  onInputChange,
  onBankSelect
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Banking Information</h3>
      <BankAutocomplete 
        onBankSelect={onBankSelect}
        error={errors.bankName}
      />

      <div className="space-y-2">
        <Label htmlFor="accountNumber">Business Account Number *</Label>
        <Input
          id="accountNumber"
          name="accountNumber"
          autoComplete="off"
          value={formData.accountNumber}
          onChange={(e) => onInputChange('accountNumber', e.target.value)}
          placeholder="Enter business account number"
          className={errors.accountNumber ? 'border-red-500' : ''}
        />
        {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="branchCode">Branch Code</Label>
        <Input
          id="branchCode"
          value={formData.branchCode}
          placeholder="Auto-detected branch code"
          readOnly
          className="bg-gray-50"
        />
        <p className="text-xs text-gray-600">
          ℹ️ South African banks use branch codes for transactions
        </p>
      </div>
    </div>
  );
};

export default VendorBankingSection;
