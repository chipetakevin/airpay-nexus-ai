
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useBankingAutoSave } from '@/hooks/useBankingAutoSave';
import { useToast } from '@/hooks/use-toast';
import { validateBankingForm } from './banking/BankingFormValidator';
import BankingCardHeader from './banking/BankingCardHeader';
import CollapsedBankingView from './banking/CollapsedBankingView';
import ExpandedBankingForm from './banking/ExpandedBankingForm';

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
  const { saveBankingInfo, getBankingInfo, autoSaveBankingField } = useBankingAutoSave();
  const { toast } = useToast();
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const validation = validateBankingForm(formData, errors);
  const isBankingComplete = validation.isComplete;

  // Intelligent auto-collapse with immediate trigger
  useEffect(() => {
    if (isBankingComplete && !isCollapsed) {
      console.log('🏦 Banking form complete - auto-collapsing...');
      
      toast({
        title: "Business Banking Secured! 🔒",
        description: "Banking details completed and auto-collapsed for better navigation.",
        duration: 3000
      });
      
      setIsCollapsed(true);
    }
    
    if (!isBankingComplete && isCollapsed) {
      console.log('⚠️ Banking form incomplete - expanding...');
      setIsCollapsed(false);
    }
  }, [
    formData.bankName, 
    formData.accountNumber, 
    formData.branchCode, 
    errors.bankName, 
    errors.accountNumber,
    isBankingComplete,
    isCollapsed,
    toast
  ]);

  // Auto-fill banking information on component mount
  useEffect(() => {
    const savedBankingInfo = getBankingInfo();
    
    if (savedBankingInfo.bankName && !formData.bankName) {
      onInputChange('bankName', savedBankingInfo.bankName);
      onBankSelect(savedBankingInfo.bankName, savedBankingInfo.routingNumber || '', savedBankingInfo.branchCode);
    }
    if (savedBankingInfo.accountNumber && !formData.accountNumber) {
      onInputChange('accountNumber', savedBankingInfo.accountNumber);
    }

    if (savedBankingInfo.bankName || savedBankingInfo.accountNumber) {
      toast({
        title: "Business Banking Auto-filled! 🏢",
        description: "Your saved banking information has been restored.",
      });
    }
  }, []);

  // Auto-save banking information when fields change
  useEffect(() => {
    if (formData.bankName || formData.accountNumber || formData.branchCode) {
      setIsAutoSaving(true);
      
      const timeoutId = setTimeout(() => {
        saveBankingInfo({
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          branchCode: formData.branchCode,
          routingNumber: formData.routingNumber
        });
        
        setIsAutoSaving(false);
        setLastSaved(new Date());
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [formData.bankName, formData.accountNumber, formData.branchCode, formData.routingNumber, saveBankingInfo]);

  const handleBankSelect = (bankName: string, routing: string, branchCode: string) => {
    onBankSelect(bankName, routing, branchCode);
    
    const bankingData = {
      bankName,
      branchCode,
      routingNumber: routing,
      accountNumber: formData.accountNumber
    };
    
    saveBankingInfo(bankingData);
    setLastSaved(new Date());
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInputChange('accountNumber', value);
    
    if (value.length >= 8) {
      autoSaveBankingField('accountNumber', value);
    }
  };

  const handleManualToggle = () => {
    if (isCollapsed && !isBankingComplete) {
      toast({
        title: "Complete Banking Details",
        description: "Please fill all banking information before collapsing.",
        variant: "destructive"
      });
      return;
    }
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card className="border-yellow-200 bg-yellow-50/30">
      <BankingCardHeader
        isAutoSaving={isAutoSaving}
        isBankingComplete={isBankingComplete}
        lastSaved={lastSaved}
        isCollapsed={isCollapsed}
        onManualToggle={handleManualToggle}
      />

      {isCollapsed && isBankingComplete ? (
        <CollapsedBankingView
          formData={formData}
          onToggle={handleManualToggle}
        />
      ) : (
        <ExpandedBankingForm
          formData={formData}
          errors={errors}
          isBankingComplete={isBankingComplete}
          onBankSelect={handleBankSelect}
          onAccountNumberChange={handleAccountNumberChange}
        />
      )}
    </Card>
  );
};

export default VendorBankingSection;
