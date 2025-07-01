
import { useState, useCallback, useRef, useEffect } from 'react';
import { useBankingAutoSave } from '@/hooks/useBankingAutoSave';
import { useToast } from '@/hooks/use-toast';
import { validateBankingForm } from '@/components/registration/banking/BankingFormValidator';

interface UseVendorBankingSectionProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
  onBankSelect: (bankName: string, routing: string, branchCode: string) => void;
  marketingConsent: boolean;
}

export const useVendorBankingSection = ({
  formData,
  errors,
  onInputChange,
  onBankSelect,
  marketingConsent
}: UseVendorBankingSectionProps) => {
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
  const processingRef = useRef(false);

  const validation = validateBankingForm(formData, errors);
  const isBankingComplete = validation.isComplete;

  // Debounced auto-save function
  const performAutoSave = useCallback(async () => {
    if (processingRef.current || (!formData.bankName && !formData.accountNumber && !formData.branchCode)) {
      return;
    }

    processingRef.current = true;
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
      processingRef.current = false;
    }
  }, [formData.bankName, formData.accountNumber, formData.branchCode, formData.routingNumber, saveBankingInfo]);

  // Intelligent collapse logic with 3-second delay
  const handleIntelligentCollapse = useCallback(() => {
    if (isBankingComplete && !isCollapsed && !processingRef.current) {
      console.log('🔄 Banking complete - auto-collapse in 3 seconds');
      
      // Auto-collapse after 3 seconds
      setTimeout(() => {
        setIsCollapsed(true);
        toast({
          title: "Banking Secured & Collapsed! 🔒",
          description: "Banking details saved and collapsed. Click to expand if needed.",
          duration: 3000
        });
        
        // Auto-save when collapsing
        performAutoSave();
      }, 3000);
    }
  }, [isBankingComplete, isCollapsed, toast, performAutoSave]);

  // Optimized bank selection handler
  const handleBankSelect = useCallback(async (bankName: string, routing: string, branchCode: string) => {
    if (processingRef.current) return;
    
    processingRef.current = true;
    onBankSelect(bankName, routing, branchCode);
    
    // Single save operation for bank selection
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
    } finally {
      processingRef.current = false;
    }
  }, [onBankSelect, saveBankingInfo, formData.accountNumber]);

  const handleAccountNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInputChange('accountNumber', value);
  }, [onInputChange]);

  const handleManualToggle = useCallback(() => {
    if (!isBankingComplete && isCollapsed) {
      toast({
        title: "Complete Banking Details",
        description: "Please fill all banking information before collapsing.",
        variant: "destructive"
      });
      return;
    }
    setIsCollapsed(!isCollapsed);
  }, [isBankingComplete, isCollapsed, toast]);

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

  // Optimized auto-save effect with better debouncing
  useEffect(() => {
    const hasDataChanged = 
      prevFormDataRef.current.bankName !== formData.bankName ||
      prevFormDataRef.current.accountNumber !== formData.accountNumber ||
      prevFormDataRef.current.branchCode !== formData.branchCode ||
      prevFormDataRef.current.routingNumber !== formData.routingNumber;

    if (!hasDataChanged || processingRef.current) return;

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      performAutoSave();
    }, 3000); // Increased debounce time to reduce flickering

    prevFormDataRef.current = { ...formData };

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [formData, performAutoSave]);

  // Handle banking completion changes - trigger auto-collapse
  useEffect(() => {
    if (isBankingComplete && !isCollapsed) {
      console.log('✅ Banking completed - triggering auto-collapse');
      handleIntelligentCollapse();
    }
  }, [isBankingComplete, isCollapsed, handleIntelligentCollapse]);

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

  return {
    isAutoSaving,
    lastSaved,
    isCollapsed,
    isBankingComplete,
    handleBankSelect,
    handleAccountNumberChange,
    handleManualToggle
  };
};
