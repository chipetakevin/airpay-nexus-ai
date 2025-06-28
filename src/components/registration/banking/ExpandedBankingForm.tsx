
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, AlertCircle } from 'lucide-react';
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
  const isAccountValid = formData.accountNumber && 
                        formData.accountNumber.length >= 8 && 
                        /^\d+$/.test(formData.accountNumber) &&
                        !errors.accountNumber;

  return (
    <CardContent className="space-y-4 pb-6">
      <BankAutocomplete 
        onBankSelect={onBankSelect}
        error={errors.bankName}
      />

      <div className="space-y-2">
        <Label htmlFor="accountNumber" className="text-sm font-medium text-yellow-700">
          Business Account Number *
        </Label>
        <Input
          id="accountNumber"
          name="accountNumber"
          type="tel"
          autoComplete="off"
          value={formData.accountNumber}
          onChange={onAccountNumberChange}
          placeholder="Enter business account number (min 8 digits)"
          className={errors.accountNumber ? 'border-red-500' : 'border-yellow-300 focus:border-yellow-500'}
        />
        {errors.accountNumber && (
          <p className="text-red-500 text-xs flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.accountNumber}
          </p>
        )}
        {isAccountValid && (
          <p className="text-green-600 text-xs flex items-center gap-1">
            <Check className="w-3 h-3" />
            Valid account number
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="branchCode" className="text-sm font-medium text-yellow-700">
          Branch Code
        </Label>
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

      {/* Enhanced completion indicator */}
      {!isBankingComplete && (formData.bankName || formData.accountNumber) && (
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-yellow-800">
              Completing Banking Setup...
            </span>
          </div>
          <p className="text-xs text-yellow-700">
            Fill all banking fields to secure and auto-collapse this section for better navigation.
          </p>
        </div>
      )}

      {/* Success indicator */}
      {isBankingComplete && (
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-1">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Banking Information Complete!
            </span>
          </div>
          <p className="text-xs text-green-700">
            This section will automatically collapse to improve navigation flow.
          </p>
        </div>
      )}
    </CardContent>
  );
};

export default ExpandedBankingForm;
