
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
  
  // Use refs to prevent infinite loops and track previous values
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();
  const isInitializedRef = useRef(false);
  const prevFormDataRef = useRef(formData);
  const prevMarketingConsentRef = useRef(marketingConsent);

  const validation = validateBankingForm(formData, errors);
  const isBankingComplete = validation.isComplete;

  // Stable auto-save function using useCallback
  const performAutoSave = useCallback(async () => {
    if (!formData.bankName && !formData.accountNumber && !formData.branchCode) {
      return;
    }

    setIsAutoSaving(true);
    try {
      await saveBankingInfo({
        bankName: formData.bankName || '',
        accountNumber: formData.accountNumber || '',
        branchCode: formData.branchCode || '',
        routingNumber: formData.routingNumber || ''
      });
      setLastSaved(new Date());
      console.log('✅ Banking info auto-saved successfully');
    } catch (error) {
      console.error('❌ Auto-save failed:', error);
    } finally {
      setIsAutoSaving(false);
    }
  }, [formData.bankName, formData.accountNumber, formData.branchCode, formData.routingNumber, saveBankingInfo]);

  // Intelligent collapse logic
  const handleIntelligentCollapse = useCallback(() => {
    if (isBankingComplete && marketingConsent && !isCollapsed) {
      console.log('🔄 Intelligent collapse triggered');
      setIsCollapsed(true);
      
      toast({
        title: "Banking Secured & Collapsed! 🔒",
        description: "Banking details saved and collapsed for better navigation.",
        duration: 2000
      });
      
      // Auto-save when collapsing
      performAutoSave();
    }
  }, [isBankingComplete, marketingConsent, isCollapsed, toast, performAutoSave]);

  // Auto-fill on mount (only once)
  useEffect(() => {
    if (isInitializedRef.current) return;
    
    const savedBankingInfo = getBankingInfo();
    
    if (savedBankingInfo.bankName && !formData.bankName) {
      onInputChange('bankName', savedBankingInfo.bankName);
      onBankSelect(savedBankingInfo.bankName, savedBankingInfo.routingNumber || '', savedBankingInfo.branchCode || '');
    }
    if (savedBankingInfo.accountNumber && !formData.accountNumber) {
      onInputChange('accountNumber', savedBankingInfo.accountNumber);
    }
    if (savedBankingInfo.branchCode && !formData.branchCode) {
      onInputChange('branchCode', savedBankingInfo.branchCode);
    }

    if (savedBankingInfo.bankName && savedBankingInfo.accountNumber) {
      toast({
        title: "Banking Auto-filled! 🏢",
        description: "Banking information restored from secure storage.",
        duration: 2000
      });
    }
    
    isInitializedRef.current = true;
  }, [getBankingInfo, onInputChange, onBankSelect, toast]);

  // Debounced auto-save effect
  useEffect(() => {
    // Only auto-save if form data has actually changed
    const hasDataChanged = 
      prevFormDataRef.current.bankName !== formData.bankName ||
      prevFormDataRef.current.accountNumber !== formData.accountNumber ||
      prevFormDataRef.current.branchCode !== formData.branchCode ||
      prevFormDataRef.current.routingNumber !== formData.routingNumber;

    if (!hasDataChanged) return;

    // Clear existing timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Set new timeout for debounced save
    autoSaveTimeoutRef.current = setTimeout(() => {
      performAutoSave();
    }, 2500); // Increased debounce time

    // Update previous form data
    prevFormDataRef.current = { ...formData };

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [formData, performAutoSave]);

  // Handle marketing consent changes
  useEffect(() => {
    const consentChanged = prevMarketingConsentRef.current !== marketingConsent;
    
    if (consentChanged) {
      if (marketingConsent && isBankingComplete) {
        // Delay collapse to avoid race conditions
        setTimeout(handleIntelligentCollapse, 500);
      } else if (!marketingConsent && isCollapsed) {
        setIsCollapsed(false);
        toast({
          title: "Banking Section Expanded 📋",
          description: "Banking details are now visible for review.",
          duration: 1500
        });
      }
      
      prevMarketingConsentRef.current = marketingConsent;
    }
  }, [marketingConsent, isBankingComplete, isCollapsed, handleIntelligentCollapse, toast]);

  // Handle banking completion changes
  useEffect(() => {
    if (!isBankingComplete && isCollapsed) {
      console.log('⚠️ Banking incomplete - expanding for completion');
      setIsCollapsed(false);
    }
  }, [isBankingComplete, isCollapsed]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  const handleBankSelect = async (bankName: string, routing: string, branchCode: string) => {
    onBankSelect(bankName, routing, branchCode);
    
    // Immediate save for bank selection
    try {
      await saveBankingInfo({
        bankName,
        branchCode,
        routingNumber: routing,
        accountNumber: formData.accountNumber || ''
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
    <Card className={`border-yellow-200 bg-yellow-50/30 mb-4 banking-section-mobile ${isCollapsed ? 'collapsed' : ''}`}>
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
