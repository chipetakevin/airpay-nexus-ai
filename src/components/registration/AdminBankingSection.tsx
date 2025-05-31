
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BankAutocomplete from '../BankAutocomplete';

interface AdminBankingProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
  onBankSelect: (bankName: string, routing: string, branchCode: string) => void;
}

const AdminBankingSection: React.FC<AdminBankingProps> = ({
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
        <Label htmlFor="accountNumber">Administrator Account Number *</Label>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="routingNumber">Routing Number</Label>
          <Input
            id="routingNumber"
            value={formData.routingNumber}
            placeholder="Auto-filled based on bank selection"
            readOnly
            className="bg-gray-50"
          />
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
        </div>
      </div>
    </div>
  );
};

export default AdminBankingSection;
