
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FormData, FormErrors } from '@/types/customerRegistration';
import { validateAccountNumber } from '@/utils/formValidation';
import { CreditCard, Check, Eye, EyeOff } from 'lucide-react';
import EnhancedSouthAfricanBankAutocomplete from '../banking/EnhancedSouthAfricanBankAutocomplete';
import { useBankingAutoSave } from '@/hooks/useBankingAutoSave';
import { useToast } from '@/hooks/use-toast';

interface EnhancedBankingSectionProps {
  formData: FormData;
  errors: FormErrors;
  onInputChange: (field: keyof FormData, value: any) => void;
}

const EnhancedBankingSection: React.FC<EnhancedBankingSectionProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  const { saveBankingInfo, getBankingInfo } = useBankingAutoSave();
  const { toast } = useToast();
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isBankingHidden, setIsBankingHidden] = useState(false);
  const [showBankingDetails, setShowBankingDetails] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Auto-fill banking information on component mount
  useEffect(() => {
    if (isInitialized) return;
    
    const initializeBanking = async () => {
      try {
        const savedBankingInfo = getBankingInfo();
        
        if (savedBankingInfo.bankName && !formData.bankName) {
          onInputChange('bankName', savedBankingInfo.bankName);
        }
        if (savedBankingInfo.accountNumber && !formData.accountNumber) {
          onInputChange('accountNumber', savedBankingInfo.accountNumber);
        }
        if (savedBankingInfo.branchCode && !formData.branchCode) {
          onInputChange('branchCode', savedBankingInfo.branchCode);
        }

        if (savedBankingInfo.bankName || savedBankingInfo.accountNumber) {
          setLastSaved(new Date());
          toast({
            title: "Banking Info Restored! 💳",
            description: "Your saved banking information has been loaded.",
            duration: 2000,
          });
        }
      } catch (error) {
        console.error('Failed to initialize banking:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeBanking();
  }, [formData.bankName, formData.accountNumber, formData.branchCode, getBankingInfo, onInputChange, toast, isInitialized]);

  // Check if banking should be collapsed
  useEffect(() => {
    const isComplete = formData.branchCode && formData.bankName && formData.accountNumber;
    if (isComplete && !isBankingHidden) {
      setIsBankingHidden(true);
      setShowBankingDetails(false);
    }
  }, [formData.branchCode, formData.bankName, formData.accountNumber, isBankingHidden]);

  // Auto-save banking information
  useEffect(() => {
    if (!isInitialized) return;
    
    const saveTimeout = setTimeout(() => {
      if (formData.bankName || formData.accountNumber || formData.branchCode) {
        setIsAutoSaving(true);
        
        saveBankingInfo({
          bankName: formData.bankName || '',
          accountNumber: formData.accountNumber || '',
          branchCode: formData.branchCode || '',
          routingNumber: formData.routingNumber || ''
        });
        
        setIsAutoSaving(false);
        setLastSaved(new Date());
      }
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [formData.bankName, formData.accountNumber, formData.branchCode, formData.routingNumber, saveBankingInfo, isInitialized]);

  const handleBankSelect = (bankName: string, routing: string, branchCode: string, bankDetails?: any) => {
    onInputChange('bankName', bankName);
    onInputChange('branchCode', branchCode);
    onInputChange('routingNumber', routing);
    
    // Immediate save for bank selection
    saveBankingInfo({
      bankName,
      branchCode,
      routingNumber: routing,
      accountNumber: formData.accountNumber || ''
    });
    
    setLastSaved(new Date());
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInputChange('accountNumber', value);
  };

  const toggleBankingVisibility = () => {
    setShowBankingDetails(!showBankingDetails);
  };

  // Collapsed view
  if (isBankingHidden && !showBankingDetails) {
    return (
      <Card className="border-green-200 bg-green-50/30 animate-fade-in">
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg flex items-center justify-between gap-2 text-green-800">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
              Banking Information Secured
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleBankingVisibility}
              className="text-green-700 hover:bg-green-100"
            >
              <Eye className="w-4 h-4 mr-1" />
              Show Details
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Banking Information Saved
              </span>
            </div>
            <div className="text-xs text-green-700 space-y-1">
              <p>• Bank: {formData.bankName}</p>
              <p>• Account: •••••{formData.accountNumber?.slice(-4)}</p>
              <p>• Branch Code: {formData.branchCode}</p>
              <p className="mt-2 text-green-600">
                ✓ Auto-saved and encrypted for secure transactions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 bg-green-50/30 animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center justify-between gap-2 text-green-800">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
            Banking Information (Optional)
          </div>
          <div className="flex items-center gap-2">
            {isBankingHidden && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleBankingVisibility}
                className="text-green-700 hover:bg-green-100"
              >
                <EyeOff className="w-4 h-4 mr-1" />
                Hide Details
              </Button>
            )}
            {isAutoSaving ? (
              <div className="flex items-center gap-1 text-xs text-blue-600">
                <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : lastSaved ? (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <Check className="w-3 h-3" />
                Auto-Saved
              </div>
            ) : null}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-green-700 mb-4">
          Add your banking details for seamless transactions and payments
        </div>

        <EnhancedSouthAfricanBankAutocomplete 
          onBankSelect={handleBankSelect}
          error={errors.bankName}
          defaultValue={formData.bankName}
          showBranchDetails={true}
          compact={false}
        />

        <div className="space-y-2">
          <Label htmlFor="accountNumber" className="text-sm font-medium text-green-700">
            Account Number
          </Label>
          <Input
            id="accountNumber"
            name="accountNumber"
            autoComplete="off"
            value={formData.accountNumber || ''}
            onChange={handleAccountNumberChange}
            placeholder="Enter your account number"
            className={errors.accountNumber ? 'border-red-500' : 'border-green-300 focus:border-green-500'}
          />
          {errors.accountNumber && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <span className="text-red-500">⚠️</span>
              {errors.accountNumber}
            </p>
          )}
          {formData.accountNumber && validateAccountNumber(formData.accountNumber) && (
            <p className="text-green-600 text-xs flex items-center gap-1">
              <Check className="w-3 h-3" />
              Valid account number format
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="branchCode" className="text-sm font-medium text-green-700">
            Branch Code
          </Label>
          <Input
            id="branchCode"
            value={formData.branchCode || ''}
            placeholder="Auto-detected from bank selection"
            readOnly
            className="bg-gray-50 border-green-200"
          />
          <p className="text-xs text-green-600">
            ℹ️ This information will be securely saved for future use
          </p>
        </div>

        {(formData.bankName || formData.accountNumber) && (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Banking Information Secured
              </span>
            </div>
            <p className="text-xs text-green-700">
              Your banking details are automatically encrypted and saved for future transactions.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedBankingSection;
