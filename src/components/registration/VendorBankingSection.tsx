
import React from 'react';
import { useVendorBankingSection } from '@/hooks/useVendorBankingSection';
import VendorBankingSectionLayout from './banking/VendorBankingSectionLayout';

interface VendorBankingProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
  onBankSelect: (bankName: string, routing: string, branchCode: string) => void;
  marketingConsent?: boolean;
}

const VendorBankingSection: React.FC<VendorBankingProps> = ({
  formData,
  errors,
  onInputChange,
  onBankSelect,
  marketingConsent = false
}) => {
  const {
    isAutoSaving,
    lastSaved,
    isCollapsed,
    isBankingComplete,
    handleBankSelect,
    handleAccountNumberChange,
    handleManualToggle
  } = useVendorBankingSection({
    formData,
    errors,
    onInputChange,
    onBankSelect,
    marketingConsent
  });

  return (
    <VendorBankingSectionLayout
      formData={formData}
      errors={errors}
      isAutoSaving={isAutoSaving}
      isBankingComplete={isBankingComplete}
      lastSaved={lastSaved}
      isCollapsed={isCollapsed}
      onBankSelect={handleBankSelect}
      onAccountNumberChange={handleAccountNumberChange}
      onManualToggle={handleManualToggle}
    />
  );
};

export default VendorBankingSection;
