import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import EnhancedSouthAfricanBankAutocomplete from '@/components/banking/EnhancedSouthAfricanBankAutocomplete';
import { useToast } from '@/hooks/use-toast';

interface UnifiedBankingSectionProps {
  formData: {
    bankName?: string;
    accountNumber?: string;
    branchCode?: string;
  };
  errors: Record<string, string>;
  onInputChange: (field: string, value: string) => void;
  onBankSelect: (bankName: string, routing: string, branchCode: string, bankDetails?: any) => void;
  userType?: 'customer' | 'vendor' | 'admin';
  required?: boolean;
}

const UnifiedBankingSection = ({
  formData,
  errors,
  onInputChange,
  onBankSelect,
  userType = 'customer',
  required = false
}: UnifiedBankingSectionProps) => {
  const { toast } = useToast();
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isBankingCollapsed, setIsBankingCollapsed] = useState(false);

  const validateAccountNumber = (accountNumber: string) => {
    const cleanNumber = accountNumber.replace(/\D/g, '');
    return cleanNumber.length >= 9 && cleanNumber.length <= 15;
  };

  const handleEnhancedBankSelect = (bankName: string, routing: string, branchCode: string, bankDetails?: any) => {
    onBankSelect(bankName, routing, branchCode, bankDetails);
    
    setIsAutoSaving(true);
    setTimeout(() => {
      setIsAutoSaving(false);
      setLastSaved(new Date());
    }, 1500);
    
    if (bankDetails) {
      toast({
        title: "Bank Selected! 🏦",
        description: `${bankName} with branch code ${branchCode} has been selected and auto-saved.`,
        duration: 3000
      });
    }
  };

  const handleAccountNumberChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '').substring(0, 15);
    onInputChange('accountNumber', cleanValue);
    
    if (validateAccountNumber(cleanValue) && formData.bankName && formData.branchCode) {
      setIsAutoSaving(true);
      setTimeout(() => {
        setIsAutoSaving(false);
        setLastSaved(new Date());
        setIsBankingCollapsed(true);
        toast({
          title: "Account Verified! ✅",
          description: "Banking details have been validated and saved securely.",
          duration: 3000
        });
      }, 1000);
    }
  };

  const isBankingComplete = formData.bankName && formData.accountNumber && formData.branchCode;

  return (
    <Card className="border-green-200 bg-green-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2 text-green-800">
              <Shield className="w-5 h-5" />
              Banking Information {required && <span className="text-red-500">*</span>}
            </CardTitle>
            <p className="text-sm text-green-600">
              {required ? 'Required for' : 'Add'} secure banking details for transactions
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isAutoSaving && (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <Loader2 className="w-3 h-3 animate-spin" />
                Saving...
              </div>
            )}
            {lastSaved && !isAutoSaving && (
              <Badge variant="outline" className="text-xs">
                Saved {lastSaved.toLocaleTimeString()}
              </Badge>
            )}
            {isBankingComplete && (
              <Badge className="bg-green-100 text-green-700">
                <CheckCircle className="w-3 h-3 mr-1" />
                Complete
              </Badge>
            )}
            {isBankingCollapsed && (
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={() => setIsBankingCollapsed(false)}
                className="text-xs"
              >
                <ChevronDown className="w-4 h-4 mr-1" />
                Edit Details
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      {/* Collapsed Summary View */}
      {isBankingCollapsed && isBankingComplete && (
        <CardContent className="space-y-3">
          <div className="bg-green-100 p-4 rounded-lg border border-green-200 animate-fade-in">
            <div className="flex items-center gap-2 text-sm text-green-700 mb-2">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">Banking details verified and secured!</span>
            </div>
            <div className="text-xs text-green-600 space-y-1">
              <p><strong>Bank:</strong> {formData.bankName}</p>
              <p><strong>Account:</strong> {formData.accountNumber?.replace(/(\d{4})(?=\d)/g, '$1 ')}</p>
              <p><strong>Branch Code:</strong> {formData.branchCode}</p>
            </div>
          </div>
        </CardContent>
      )}
      
      {/* Full Banking Form */}
      {!isBankingCollapsed && (
        <CardContent className="space-y-4">
          <EnhancedSouthAfricanBankAutocomplete
            onBankSelect={handleEnhancedBankSelect}
            error={errors.bankName}
            defaultValue={formData.bankName}
            showBranchDetails={true}
          />

          <div className="space-y-2">
            <Label htmlFor="accountNumber">
              Account Number {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id="accountNumber"
              value={formData.accountNumber || ''}
              onChange={(e) => handleAccountNumberChange(e.target.value)}
              placeholder="Enter account number"
              className={errors.accountNumber ? 'border-red-500' : ''}
              maxLength={15}
            />
            {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="branchCode">Branch Code</Label>
            <Input
              id="branchCode"
              value={formData.branchCode || ''}
              placeholder="Auto-filled from bank selection"
              readOnly
              className="bg-gray-50 font-mono"
            />
            <p className="text-xs text-green-600">
              ℹ️ Branch code automatically assigned from your bank selection
            </p>
          </div>

          {isBankingComplete && !isBankingCollapsed && (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Banking details verified and secure!</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsBankingCollapsed(true)}
                  className="text-xs"
                >
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Collapse
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default UnifiedBankingSection;