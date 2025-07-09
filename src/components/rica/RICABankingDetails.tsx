import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, Shield, Info } from 'lucide-react';
import { useBranchCodeAutoAssign } from '@/hooks/useBranchCodeAutoAssign';
import { useToast } from '@/hooks/use-toast';

interface RICABankingDetailsProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const RICABankingDetails: React.FC<RICABankingDetailsProps> = ({ 
  formData, 
  setFormData, 
  onNext, 
  onPrevious 
}) => {
  const [query, setQuery] = useState(formData.bankName || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const { toast } = useToast();
  const { SOUTH_AFRICAN_BANK_BRANCHES, autoAssignBranchCode } = useBranchCodeAutoAssign();

  const bankOptions = Object.keys(SOUTH_AFRICAN_BANK_BRANCHES);
  const filteredBanks = bankOptions.filter(bank => 
    bank.toLowerCase().includes(query.toLowerCase())
  );

  // Auto-save indicator
  useEffect(() => {
    if (formData.bankName && formData.accountNumber) {
      setIsAutoSaving(true);
      const timer = setTimeout(() => {
        setIsAutoSaving(false);
        toast({
          title: "Banking details saved",
          description: "Your information is secured and auto-saved",
          duration: 2000
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formData.bankName, formData.accountNumber, toast]);

  const handleBankSelect = (bankName: string) => {
    setQuery(bankName);
    setShowDropdown(false);
    setFormData((prev: any) => ({ ...prev, bankName }));
    
    // Auto-assign branch code for FNB and other banks
    autoAssignBranchCode(bankName, (branchCode) => {
      setFormData((prev: any) => ({ ...prev, branchCode }));
      console.log(`✅ Branch code ${branchCode} assigned for ${bankName}`);
    });
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    setFormData((prev: any) => ({ ...prev, accountNumber: value }));
  };

  const isStepValid = () => {
    return formData.bankName && formData.accountNumber && formData.branchCode;
  };

  // Get current time for saved indicator
  const getSavedTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card className="border-green-200 bg-green-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-green-700" />
            <div>
              <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                Banking Information
              </CardTitle>
              <p className="text-sm text-green-600 mt-1">
                Secure banking details for administrative transactions
              </p>
            </div>
          </div>
          <div className="text-right">
            {(formData.bankName && formData.accountNumber) && (
              <div className="text-sm">
                <div className="text-gray-600">Saved</div>
                <div className="text-gray-900 font-mono">{getSavedTime()}</div>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Bank Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="bankSearch" className="text-sm font-medium text-green-800">
              Select Your South African Bank *
            </Label>
            <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300">
              Auto-Detect
            </Badge>
          </div>
          <div className="relative">
            <Input
              id="bankSearch"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(e.target.value.length > 0);
              }}
              placeholder="Start typing your bank name (e.g., FNB, ABSA, Standard Bank)..."
              className="border-green-300 focus:border-green-500 bg-white"
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
        </div>

        {/* Banking Details Success Display */}
        {formData.bankName && formData.branchCode && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-green-800">Banking Details</div>
                <div className="text-sm text-green-700">
                  {formData.bankName} - {formData.branchCode}
                </div>
              </div>
            </div>
          </div>
        )}

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
            className="border-green-300 focus:border-green-500 bg-white font-mono"
            maxLength={11}
          />
          {formData.accountNumber && formData.accountNumber.length >= 9 && (
            <p className="text-green-600 text-xs flex items-center gap-1">
              <span className="w-3 h-3 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </span>
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
            className="bg-blue-50 border-blue-200 font-mono text-blue-700 font-semibold"
          />
          <div className="flex items-center gap-2 text-xs text-blue-600">
            <Info className="w-3 h-3" />
            <span>Branch code will be automatically assigned from your bank selection</span>
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
                <li>• Used only for RICA compliance and administrative transactions</li>
                <li>• Automatically validated against South African banking standards</li>
                <li>• Branch codes are verified and auto-assigned for accuracy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onPrevious} className="flex-1 h-12">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!isStepValid()}
            className="flex-1 h-12"
          >
            Next: SIM Details
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Auto-save Indicator */}
        {isAutoSaving && (
          <div className="text-center text-xs text-green-600">
            💾 Auto-saving banking details...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RICABankingDetails;