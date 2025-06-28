
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CreditCard, Save, Check, History, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import BankAutocomplete from '../BankAutocomplete';
import { useBankingAutoSave } from '@/hooks/useBankingAutoSave';
import { useToast } from '@/hooks/use-toast';

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

  // Check if banking form is complete
  const isBankingComplete = () => {
    return formData.bankName && 
           formData.accountNumber && 
           formData.accountNumber.length >= 8 && 
           formData.branchCode && 
           !errors.bankName && 
           !errors.accountNumber;
  };

  // Auto-collapse when banking is complete
  useEffect(() => {
    if (isBankingComplete()) {
      setIsCollapsed(true);
    }
  }, [formData.bankName, formData.accountNumber, formData.branchCode, errors.bankName, errors.accountNumber]);

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
  }, [formData.bankName, formData.accountNumber, formData.branchCode, formData.routingNumber]);

  const handleBankSelect = (bankName: string, routing: string, branchCode: string) => {
    onBankSelect(bankName, routing, branchCode);
    
    // Immediately save bank selection
    const bankingData = {
      bankName,
      branchCode,
      routingNumber: routing,
      accountNumber: formData.accountNumber
    };
    
    saveBankingInfo(bankingData);
    setLastSaved(new Date());
    
    // Show success message when both bank and account are complete
    if (formData.accountNumber && formData.accountNumber.length >= 8) {
      setTimeout(() => {
        toast({
          title: "Business Banking Secured! 🔒",
          description: "Your complete business banking details have been permanently saved and secured.",
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
      
      // Show success message when both bank and account are complete
      if (formData.bankName && formData.branchCode) {
        setTimeout(() => {
          toast({
            title: "Business Banking Secured! 🔒",
            description: "Your complete business banking details have been permanently saved and secured.",
          });
        }, 1000);
      }
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card className="border-yellow-200 bg-yellow-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center justify-between gap-2 text-yellow-800">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
            Business Banking Information (Auto-Saved)
          </div>
          <div className="flex items-center gap-2">
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
            {isBankingComplete() && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapse}
                className="p-1 h-auto text-yellow-700 hover:text-yellow-800"
              >
                {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      {/* Collapsed State - Show only confirmation */}
      {isCollapsed && isBankingComplete() ? (
        <CardContent className="pt-0">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <div>
                  <span className="text-sm font-medium text-green-800">
                    Business Banking Secured ✅
                  </span>
                  <p className="text-xs text-green-700 mt-1">
                    {formData.bankName} • Account ending in {formData.accountNumber.slice(-4)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapse}
                className="text-green-700 hover:text-green-800 p-2"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      ) : (
        // Expanded State - Show full form
        <CardContent className="space-y-4">
          <BankAutocomplete 
            onBankSelect={handleBankSelect}
            error={errors.bankName}
          />

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Business Account Number *</Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              autoComplete="off"
              value={formData.accountNumber}
              onChange={handleAccountNumberChange}
              placeholder="Enter business account number"
              className={errors.accountNumber ? 'border-red-500' : 'border-yellow-300 focus:border-yellow-500'}
            />
            {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
            {formData.accountNumber && formData.accountNumber.length >= 8 && (
              <p className="text-green-600 text-xs flex items-center gap-1">
                <Check className="w-3 h-3" />
                Account number saved permanently
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="branchCode">Branch Code</Label>
            <Input
              id="branchCode"
              value={formData.branchCode}
              placeholder="Auto-detected branch code"
              readOnly
              className="bg-gray-50 border-yellow-200"
            />
            <p className="text-xs text-yellow-600">
              ℹ️ South African banks use branch codes for transactions
            </p>
          </div>

          {/* Confirmation Message - Show when data exists but not complete */}
          {(formData.bankName || formData.accountNumber) && !isBankingComplete() && (
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium text-yellow-800">
                  Completing Banking Setup...
                </span>
              </div>
              <p className="text-xs text-yellow-700">
                Please complete all banking fields to secure your business details.
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default VendorBankingSection;
