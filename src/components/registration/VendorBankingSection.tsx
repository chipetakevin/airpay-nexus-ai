
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
  marketingConsent?: boolean;
}

const VendorBankingSection: React.FC<VendorBankingProps> = ({
  formData,
  errors,
  onInputChange,
  onBankSelect,
  marketingConsent = false
}) => {
  const { saveBankingInfo, getBankingInfo } = useBankingAutoSave();
  const { toast } = useToast();
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const validation = validateBankingForm(formData, errors);
  const isBankingComplete = validation.isComplete;

  // Enhanced auto-collapse with immediate response
  useEffect(() => {
    if (isBankingComplete && !isCollapsed) {
      console.log('🏦 Banking complete - triggering auto-collapse');
      
      // Immediate collapse without delay
      setIsCollapsed(true);
      
      toast({
        title: "Banking Secured! 🔒",
        description: "Banking details saved and collapsed for better navigation.",
        duration: 2000
      });
    }
    
    // Auto-expand if form becomes incomplete
    if (!isBankingComplete && isCollapsed) {
      console.log('⚠️ Banking incomplete - expanding for completion');
      setIsCollapsed(false);
    }
  }, [isBankingComplete, isCollapsed, toast]);

  // New effect: Auto-collapse when marketing consent is given and banking is complete
  useEffect(() => {
    if (marketingConsent && isBankingComplete && !isCollapsed) {
      console.log('📧 Marketing consent given - auto-collapsing banking section');
      
      // Force save banking info immediately
      const saveAndCollapse = async () => {
        setIsAutoSaving(true);
        try {
          await saveBankingInfo({
            bankName: formData.bankName,
            accountNumber: formData.accountNumber,
            branchCode: formData.branchCode,
            routingNumber: formData.routingNumber
          });
          
          setLastSaved(new Date());
          setIsCollapsed(true);
          
          toast({
            title: "Banking Auto-Secured! 🔒✉️",
            description: "Banking details saved and collapsed after consent confirmation.",
            duration: 3000
          });
        } catch (error) {
          console.error('❌ Failed to save banking info on consent:', error);
        } finally {
          setIsAutoSaving(false);
        }
      };
      
      saveAndCollapse();
    }
  }, [marketingConsent, isBankingComplete, isCollapsed, formData, saveBankingInfo, toast]);

  // Auto-fill on mount with enhanced detection
  useEffect(() => {
    const savedBankingInfo = getBankingInfo();
    
    if (savedBankingInfo.bankName && !formData.bankName) {
      onInputChange('bankName', savedBankingInfo.bankName);
      onBankSelect(savedBankingInfo.bankName, savedBankingInfo.routingNumber || '', savedBankingInfo.branchCode);
    }
    if (savedBankingInfo.accountNumber && !formData.accountNumber) {
      onInputChange('accountNumber', savedBankingInfo.accountNumber);
    }
    if (savedBankingInfo.branchCode && !formData.branchCode) {
      onInputChange('branchCode', savedBankingInfo.branchCode);
    }

    if (savedBankingInfo.bankName && savedBankingInfo.accountNumber && savedBankingInfo.branchCode) {
      toast({
        title: "Banking Auto-filled! 🏢",
        description: "Complete banking information restored from secure storage.",
      });
    }
  }, []);

  // Optimized auto-save with reduced frequency
  useEffect(() => {
    if (formData.bankName || formData.accountNumber || formData.branchCode) {
      setIsAutoSaving(true);
      
      const timeoutId = setTimeout(async () => {
        try {
          await saveBankingInfo({
            bankName: formData.bankName,
            accountNumber: formData.accountNumber,
            branchCode: formData.branchCode,
            routingNumber: formData.routingNumber
          });
          
          setIsAutoSaving(false);
          setLastSaved(new Date());
          console.log('✅ Banking info saved successfully');
        } catch (error) {
          console.error('❌ Failed to save banking info:', error);
          setIsAutoSaving(false);
        }
      }, 1000); // Increased delay to reduce excessive saving

      return () => clearTimeout(timeoutId);
    }
  }, [formData.bankName, formData.accountNumber, formData.branchCode, formData.routingNumber, saveBankingInfo]);

  const handleBankSelect = async (bankName: string, routing: string, branchCode: string) => {
    onBankSelect(bankName, routing, branchCode);
    
    try {
      await saveBankingInfo({
        bankName,
        branchCode,
        routingNumber: routing,
        accountNumber: formData.accountNumber
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save bank selection:', error);
    }
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInputChange('accountNumber', value);
  };

  const handleManualToggle = () => {
    if (!isBankingComplete && isCollapsed) {
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
    <Card className="border-yellow-200 bg-yellow-50/30 mb-4">
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
