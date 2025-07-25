
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FormData, FormErrors } from '@/types/customerRegistration';
import { validateAccountNumber } from '@/utils/formValidation';
import { CreditCard, Save, Check, History, EyeOff, Eye } from 'lucide-react';
import BankAutocomplete from '../BankAutocomplete';
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
  const { saveBankingInfo, getBankingInfo, autoSaveBankingField } = useBankingAutoSave();
  const { toast } = useToast();
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isBankingHidden, setIsBankingHidden] = useState(false);
  const [showBankingDetails, setShowBankingDetails] = useState(true);

  // Check if banking info should be hidden (when branch code exists)
  useEffect(() => {
    if (formData.branchCode && formData.bankName && formData.accountNumber) {
      setIsBankingHidden(true);
      setShowBankingDetails(false);
    }
  }, [formData.branchCode, formData.bankName, formData.accountNumber]);

  // Auto-fill banking information on component mount
  useEffect(() => {
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
      toast({
        title: "Banking Info Auto-filled! 💳",
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
  }, [formData.bankName, formData.accountNumber, formData.branchCode, formData.routingNumber]);

  const handleBankSelect = (bankName: string, routing: string, branchCode: string) => {
    onInputChange('bankName', bankName);
    onInputChange('branchCode', branchCode);
    onInputChange('routingNumber', routing);
    
    // Immediately save bank selection
    const bankingData = {
      bankName,
      branchCode,
      routingNumber: routing,
      accountNumber: formData.accountNumber
    };
    
    saveBankingInfo(bankingData);
    setLastSaved(new Date());
    
    // Auto-hide if account number also exists
    if (formData.accountNumber && formData.accountNumber.length >= 8) {
      setTimeout(() => {
        setIsBankingHidden(true);
        setShowBankingDetails(false);
        toast({
          title: "Banking Information Secured! 🔒",
          description: "Your complete banking details have been permanently saved and secured.",
        });
      }, 1000);
    }
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInputChange('accountNumber', value);
    
    // Auto-save account number after user stops typing
    if (value.length >= 8) {
      autoSaveBankingField('accountNumber', value);
      
      // Auto-hide if bank and branch are also selected
      if (formData.bankName && formData.branchCode) {
        setTimeout(() => {
          setIsBankingHidden(true);
          setShowBankingDetails(false);
          toast({
            title: "Banking Information Secured! 🔒",
            description: "Your complete banking details have been permanently saved and secured.",
          });
        }, 1000);
      }
    }
  };

  const toggleBankingVisibility = () => {
    setShowBankingDetails(!showBankingDetails);
  };

  // If banking is hidden, show compact summary
  if (isBankingHidden && !showBankingDetails) {
    return (
      <Card className="border-green-200 bg-green-50/30">
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
                Complete Banking Information Saved
              </span>
            </div>
            <div className="text-xs text-green-700 space-y-1">
              <p>• Bank: {formData.bankName}</p>
              <p>• Account: •••••{formData.accountNumber?.slice(-4)}</p>
              <p>• Branch Code: {formData.branchCode}</p>
              <p className="mt-2 text-green-600">
                ✓ Permanently saved and encrypted for all transactions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 bg-green-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center justify-between gap-2 text-green-800">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
            Banking Information (Auto-Saved)
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
                Saved
              </div>
            ) : null}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <BankAutocomplete 
          onBankSelect={handleBankSelect}
          error={errors.bankName}
        />

        <div className="space-y-2">
          <Label htmlFor="accountNumber" className="text-sm font-medium text-green-700">
            Account Number *
          </Label>
          <Input
            id="accountNumber"
            name="accountNumber"
            autoComplete="off"
            value={formData.accountNumber}
            onChange={handleAccountNumberChange}
            placeholder="Enter account number"
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
              Valid account number format · Auto-saved
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="branchCode" className="text-sm font-medium text-green-700">
            Branch Code
          </Label>
          <Input
            id="branchCode"
            value={formData.branchCode}
            placeholder="Auto-filled based on bank selection"
            readOnly
            className="bg-gray-50 border-green-200"
          />
          <p className="text-xs text-green-600">
            ℹ️ South African banks use branch codes for transactions
          </p>
        </div>

        {/* Confirmation Message */}
        {(formData.bankName || formData.accountNumber) && (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Banking Information Secured
              </span>
            </div>
            <p className="text-xs text-green-700">
              Your banking details are automatically encrypted and saved permanently for future transactions, payments, and services.
            </p>
            {formData.branchCode && formData.accountNumber && (
              <p className="text-xs text-green-600 mt-1">
                ✓ Complete banking setup will be automatically secured in a moment...
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedBankingSection;
