
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import BankAutocomplete from '@/components/BankAutocomplete';

interface ExpandedBankingFormProps {
  formData: any;
  errors: any;
  isBankingComplete: boolean;
  onBankSelect: (bankName: string, routing: string, branchCode: string) => void;
  onAccountNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExpandedBankingForm: React.FC<ExpandedBankingFormProps> = ({
  formData,
  errors,
  isBankingComplete,
  onBankSelect,
  onAccountNumberChange
}) => {
  return (
    <CardContent className="space-y-4 pb-6">
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
          onChange={onAccountNumberChange}
          placeholder="Enter business account number (min 8 digits)"
          className={errors.accountNumber ? 'border-red-500' : 'border-yellow-300 focus:border-yellow-500'}
        />
        {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
        {formData.accountNumber && formData.accountNumber.length >= 8 && !errors.accountNumber && (
          <p className="text-green-600 text-xs flex items-center gap-1">
            <Check className="w-3 h-3" />
            Valid account number
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="branchCode">Branch Code</Label>
        <Input
          id="branchCode"
          value={formData.branchCode}
          placeholder="Auto-detected from bank selection"
          readOnly
          className="bg-gray-50 border-yellow-200"
        />
        <p className="text-xs text-yellow-600">
          ℹ️ Branch code auto-fills when you select your bank
        </p>
      </div>

      {!isBankingComplete && (formData.bankName || formData.accountNumber) && (
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-yellow-800">
              Completing Banking Setup...
            </span>
          </div>
          <p className="text-xs text-yellow-700">
            Fill all banking fields to secure and auto-collapse this section.
          </p>
        </div>
      )}
    </CardContent>
  );
};

export default ExpandedBankingForm;
