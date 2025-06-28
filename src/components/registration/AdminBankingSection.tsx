import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Shield, Save, Check, History, EyeOff, Eye } from 'lucide-react';
import BankAutocomplete from '../BankAutocomplete';
import { useBankingAutoSave } from '@/hooks/useBankingAutoSave';
import { useToast } from '@/hooks/use-toast';

interface AdminBankingProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
  onBankSelect: (bankName: string, routing: string, branchCode: string) => void;
}

const AdminBankingSection: React.FC<AdminBankingProps> = ({
  formData,
  errors,
  onInputChange,
  onBankSelect
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
      onBankSelect(savedBankingInfo.bankName, savedBankingInfo.routingNumber || '', savedBankingInfo.branchCode);
    }
    if (savedBankingInfo.accountNumber && !formData.accountNumber) {
      onInputChange('accountNumber', savedBankingInfo.accountNumber);
    }

    if (savedBankingInfo.bankName || savedBankingInfo.accountNumber) {
      toast({
        title: "Admin Banking Auto-filled! 🛡️",
        description: "Your saved administrative banking information has been restored.",
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
    
    // Auto-hide if account number also exists
    if (formData.accountNumber && formData.accountNumber.length >= 8) {
      setTimeout(() => {
        setIsBankingHidden(true);
        setShowBankingDetails(false);
        toast({
          title: "Admin Banking Secured! 🔒",
          description: "Your complete administrative banking details have been permanently saved and secured.",
        });
      }, 1000);
    }
  };

  const toggleBankingVisibility = () => {
    setShowBankingDetails(!showBankingDetails);
  };

  // If banking is hidden, show compact summary
  if (isBankingHidden && !showBankingDetails) {
    return (
      <Card className="border-purple-200 bg-purple-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg flex items-center justify-between gap-2 text-purple-800">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              Administrator Banking Secured
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleBankingVisibility}
              className="text-purple-700 hover:bg-purple-100"
            >
              <Eye className="w-4 h-4 mr-1" />
              Show Details
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">
                Complete Administrator Banking Saved
              </span>
            </div>
            <div className="text-xs text-purple-700 space-y-1">
              <p>• Bank: {formData.bankName}</p>
              <p>• Account: •••••{formData.accountNumber?.slice(-4)}</p>
              <p>• Branch Code: {formData.branchCode}</p>
              <p className="mt-2 text-purple-600">
                ✓ Permanently saved for administrative operations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-purple-200 bg-purple-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center justify-between gap-2 text-purple-800">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            Administrator Banking Information (Auto-Saved)
          </div>
          <div className="flex items-center gap-2">
            {isBankingHidden && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleBankingVisibility}
                className="text-purple-700 hover:bg-purple-100"
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
          <Label htmlFor="accountNumber">Administrator Account Number *</Label>
          <Input
            id="accountNumber"
            name="accountNumber"
            autoComplete="off"
            value={formData.accountNumber}
            onChange={(e) => {
              const value = e.target.value;
              onInputChange('accountNumber', value);
              if (value.length >= 8) {
                autoSaveBankingField('accountNumber', value);
                
                // Auto-hide if bank and branch are also selected
                if (formData.bankName && formData.branchCode) {
                  setTimeout(() => {
                    setIsBankingHidden(true);
                    setShowBankingDetails(false);
                    toast({
                      title: "Admin Banking Secured! 🔒",
                      description: "Your complete administrative banking details have been permanently saved and secured.",
                    });
                  }, 1000);
                }
              }
            }}
            placeholder="Enter account number"
            className={errors.accountNumber ? 'border-red-500' : 'border-purple-300 focus:border-purple-500'}
          />
          {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
          {formData.accountNumber && formData.accountNumber.length >= 8 && (
            <p className="text-green-600 text-xs flex items-center gap-1">
              <Check className="w-3 h-3" />
              Administrator account saved securely
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
            className="bg-gray-50 border-purple-200"
          />
          <p className="text-xs text-purple-600">
            ℹ️ South African banks use branch codes for transactions
          </p>
        </div>

        {/* Enhanced Security Notice */}
        {(formData.bankName || formData.accountNumber) && (
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">
                Administrator Banking Secured
              </span>
            </div>
            <p className="text-xs text-purple-700">
              Your administrative banking details are encrypted with highest security standards and saved permanently for platform operations and administrative transactions.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminBankingSection;
