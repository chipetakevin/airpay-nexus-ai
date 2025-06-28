
import React from 'react';
import { Card } from '@/components/ui/card';
import BankingCardHeader from './BankingCardHeader';
import CollapsedBankingView from './CollapsedBankingView';
import ExpandedBankingForm from './ExpandedBankingForm';

interface VendorBankingSectionLayoutProps {
  formData: any;
  errors: any;
  isAutoSaving: boolean;
  isBankingComplete: boolean;
  lastSaved: Date | null;
  isCollapsed: boolean;
  onBankSelect: (bankName: string, routing: string, branchCode: string) => void;
  onAccountNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onManualToggle: () => void;
}

const VendorBankingSectionLayout: React.FC<VendorBankingSectionLayoutProps> = ({
  formData,
  errors,
  isAutoSaving,
  isBankingComplete,
  lastSaved,
  isCollapsed,
  onBankSelect,
  onAccountNumberChange,
  onManualToggle
}) => {
  return (
    <Card className={`border-yellow-200 bg-yellow-50/30 mb-4 banking-section-mobile ${isCollapsed ? 'collapsed' : ''}`}>
      <BankingCardHeader
        isAutoSaving={isAutoSaving}
        isBankingComplete={isBankingComplete}
        lastSaved={lastSaved}
        isCollapsed={isCollapsed}
        onManualToggle={onManualToggle}
      />

      {isCollapsed && isBankingComplete ? (
        <CollapsedBankingView
          formData={formData}
          onToggle={onManualToggle}
        />
      ) : (
        <ExpandedBankingForm
          formData={formData}
          errors={errors}
          isBankingComplete={isBankingComplete}
          onBankSelect={onBankSelect}
          onAccountNumberChange={onAccountNumberChange}
        />
      )}
    </Card>
  );
};

export default VendorBankingSectionLayout;
