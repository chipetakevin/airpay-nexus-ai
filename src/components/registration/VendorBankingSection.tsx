
import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  
  // Use refs to prevent infinite loops
  const prevMarketingConsentRef = useRef(marketingConsent);
  const prevIsBankingCompleteRef = useRef(false);
  const autoCollapseTimeoutRef = useRef<NodeJS.Timeout>();

  const validation = validateBankingForm(formData, errors);
  const isBankingComplete = validation.isComplete;

  // Auto-collapse logic with improved state management
  const handleAutoCollapse = useCallback(async () => {
    if (isBankingComplete && !isCollapsed) {
      console.log('🏦 Banking complete - triggering auto-collapse');
      
      // Clear any existing timeout
      if (autoCollapseTimeoutRef.current) {
        clearTimeout(autoCollapseTimeoutRef.current);
      }
      
      // Save banking info immediately
      setIsAutoSaving(true);
      try {
        await saveBankingInfo({
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          branchCode: formData.branchCode,
          routingNumber: formData.routingNumber
        });
        setLastSaved(new Date());
      } catch (error) {
        console.error('❌ Failed to save banking info:', error);
      } finally {
        setIsAutoSaving(false);
      }
      
      // Collapse with slight delay for smooth UX
      autoCollapseTimeoutRef.current = setTimeout(() => {
        setIsCollapsed(true);
        toast({
          title: "Banking Secured! 🔒",
          description: "Banking details saved and collapsed for better navigation.",
          duration: 2000
        });
      }, 500);
    }
  }, [isBankingComplete, isCollapsed, formData, saveBankingInfo, toast]);

  // Handle banking completion changes
  useEffect(() => {
    const wasIncomplete = prevIsBankingCompleteRef.current === false;
    const isNowComplete = isBankingComplete === true;
    
    if (wasIncomplete && isNowComplete && !isCollapsed) {
      handleAutoCollapse();
    }
    
    // Auto-expand if form becomes incomplete
    if (!isBankingComplete && isCollapsed) {
      console.log('⚠️ Banking incomplete - expanding for completion');
      setIsCollapsed(false);
    }
    
    prevIsBankingCompleteRef.current = isBankingComplete;
  }, [isBankingComplete, isCollapsed, handleAutoCollapse]);

  // Handle marketing consent changes
  useEffect(() => {
    const prevConsent = prevMarketingConsentRef.current;
    const currentConsent = marketingConsent;

    if (prevConsent !== currentConsent) {
      prevMarketingConsentRef.current = currentConsent;
      
      if (currentConsent && isBankingComplete && !isCollapsed) {
        console.log('📧 Marketing consent given - auto-collapsing banking section');
        handleAutoCollapse();
      }
      
      // Handle unchecking the marketing consent - expand banking section
      if (!currentConsent && isCollapsed && isBankingComplete) {
        console.log('📧 Marketing consent removed - expanding banking section');
        setIsCollapsed(false);
        
        toast({
          title: "Banking Section Expanded",
          description: "Banking details are now visible for review or editing.",
          duration: 2000
        });
      }
    }
  }, [marketingConsent, isBankingComplete, isCollapsed, handleAutoCollapse, toast]);

  // Auto-fill on mount
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
  }, []); // Only run once on mount

  // Optimized auto-save with debouncing
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
      }, 2000); // Increased delay for better performance

      return () => clearTimeout(timeoutId);
    }
  }, [formData.bankName, formData.accountNumber, formData.branchCode, formData.routingNumber, saveBankingInfo]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoCollapseTimeoutRef.current) {
        clearTimeout(autoCollapseTimeoutRef.current);
      }
    };
  }, []);

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
