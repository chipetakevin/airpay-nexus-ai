
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronUp, CheckCircle, Building, Shield, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBranchCodeAutoAssign } from '@/hooks/useBranchCodeAutoAssign';

interface VendorBankingFormCompleteProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
  onBankSelect: (bankName: string, routing: string, branchCode: string) => void;
  marketingConsent?: boolean;
}

const VendorBankingFormComplete: React.FC<VendorBankingFormCompleteProps> = ({
  formData,
  errors,
  onInputChange,
  onBankSelect,
  marketingConsent = false
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [query, setQuery] = useState(formData.bankName || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const { toast } = useToast();
  const { SOUTH_AFRICAN_BANK_BRANCHES, autoAssignBranchCode } = useBranchCodeAutoAssign();

  const bankOptions = Object.keys(SOUTH_AFRICAN_BANK_BRANCHES);
  const filteredBanks = bankOptions.filter(bank => 
    bank.toLowerCase().includes(query.toLowerCase())
  );

  const isBankingComplete = formData.bankName && formData.accountNumber && formData.branchCode;

  // Auto-collapse when complete and marketing consent is given
  useEffect(() => {
    if (isBankingComplete && marketingConsent && !isCollapsed) {
      const timer = setTimeout(() => {
        setIsCollapsed(true);
        toast({
          title: "Banking Details Secured! 🔒",
          description: "Banking section collapsed for better navigation.",
          duration: 2000
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isBankingComplete, marketingConsent, isCollapsed, toast]);

  const handleBankSelect = (bankName: string) => {
    setQuery(bankName);
    setShowDropdown(false);
    onInputChange('bankName', bankName);
    
    // Auto-assign branch code
    autoAssignBranchCode(bankName, (branchCode) => {
      onInputChange('branchCode', branchCode);
      onBankSelect(bankName, '', branchCode);
    });
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    onInputChange('accountNumber', value);
  };

  const toggleCollapse = () => {
    if (!isBankingComplete && !isCollapsed) {
      toast({
        title: "Complete Banking Details",
        description: "Please fill all required banking information.",
        variant: "destructive"
      });
      return;
    }
    setIsCollapsed(!isCollapsed);
  };

  // Collapsed view
  if (isCollapsed && isBankingComplete) {
    return (
      <Card className="border-green-200 bg-green-50/30">
        <CardHeader 
          className="cursor-pointer hover:bg-green-100/50 transition-colors duration-200 py-4"
          onClick={toggleCollapse}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Banking Information Complete
                </CardTitle>
                <p className="text-sm text-green-600 mt-1">
                  {formData.bankName} • Account: ***{formData.accountNumber?.slice(-4)} • Branch: {formData.branchCode}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-700 border-green-300">
                <CheckCircle className="w-3 h-3 mr-1" />
                Secured
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-8 w-8 hover:bg-green-100 rounded-full"
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  // Expanded view
  return (
    <Card className="border-green-200 bg-green-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-green-700" />
            <div>
              <CardTitle className="text-xl text-green-800">
                Banking Information
              </CardTitle>
              <p className="text-sm text-green-600 mt-1">
                Secure banking details for administrative transactions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300">
              Auto-Detect
            </Badge>
            {isBankingComplete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapse}
                className="p-1 h-8 w-8 hover:bg-green-100 rounded-full"
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Bank Selection */}
        <div className="space-y-2">
          <Label htmlFor="bankSearch" className="text-sm font-medium text-green-800">
            Select Your South African Bank *
          </Label>
          <div className="relative">
            <Input
              id="bankSearch"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(e.target.value.length > 0);
              }}
              placeholder="Start typing your bank name (e.g., FNB, ABSA, Standard Bank)..."
              className={`${errors.bankName ? 'border-red-500' : 'border-green-300 focus:border-green-500'} bg-white`}
              onFocus={() => setShowDropdown(query.length > 0)}
            />
            
            {showDropdown && filteredBanks.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-green-300 rounded-b-md shadow-lg z-50 max-h-48 overflow-y-auto">
                {filteredBanks.map((bank) => (
                  <div
                    key={bank}
                    className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-green-100 last:border-b-0"
                    onClick={() => handleBankSelect(bank)}
                  >
                    <div className="font-medium text-gray-900">{bank}</div>
                    <div className="text-sm text-green-600">
                      Branch Code: {SOUTH_AFRICAN_BANK_BRANCHES[bank]?.universalBranchCode}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}
        </div>

        {/* Account Number */}
        <div className="space-y-2">
          <Label htmlFor="accountNumber" className="text-sm font-medium text-green-800">
            Account Number *
          </Label>
          <Input
            id="accountNumber"
            value={formData.accountNumber || ''}
            onChange={handleAccountNumberChange}
            placeholder="Enter account number"
            className={`${errors.accountNumber ? 'border-red-500' : 'border-green-300 focus:border-green-500'} bg-white font-mono`}
            maxLength={11}
          />
          {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
          {formData.accountNumber && formData.accountNumber.length >= 9 && (
            <p className="text-green-600 text-xs flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Valid account number format
            </p>
          )}
        </div>

        {/* Branch Code */}
        <div className="space-y-2">
          <Label htmlFor="branchCode" className="text-sm font-medium text-green-800">
            Branch Code
          </Label>
          <Input
            id="branchCode"
            value={formData.branchCode || ''}
            placeholder="Auto-filled from bank selection"
            readOnly
            className="bg-gray-50 border-green-200 font-mono text-green-700 font-semibold"
          />
          <div className="flex items-center gap-2 text-xs text-green-600">
            <Info className="w-3 h-3" />
            <span>Branch code automatically assigned from your bank selection</span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Secure Banking Protection</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• All banking details are encrypted and stored securely</li>
                <li>• Used only for commission payments and administrative transactions</li>
                <li>• Automatically validated against South African banking standards</li>
                <li>• Branch codes are verified and auto-assigned for accuracy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Completion Status */}
        {isBankingComplete && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-800">Banking Setup Complete!</h4>
                <p className="text-sm text-green-700 mt-1">
                  Your banking information has been validated and secured. This section will auto-collapse to improve navigation.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VendorBankingFormComplete;
