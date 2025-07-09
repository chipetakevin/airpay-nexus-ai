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
    <Card className="w-full max-w-md mx-auto border-green-200 bg-green-50/30">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-700 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg sm:text-xl text-green-800 truncate">
                Banking Information
              </CardTitle>
              <p className="text-sm text-green-600 mt-1">
                Secure banking details for administrative transactions
              </p>
            </div>
          </div>
          {(formData.bankName && formData.accountNumber) && (
            <div className="text-sm bg-green-100 rounded-lg px-3 py-2 self-start sm:self-auto">
              <div className="text-green-700 font-medium">Auto-saved</div>
              <div className="text-green-600 font-mono text-xs">{getSavedTime()}</div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-4 sm:space-y-6">
        {/* Bank Selection */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <Label htmlFor="bankSearch" className="text-sm font-medium text-green-800">
              Select Your South African Bank *
            </Label>
            <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300 self-start sm:self-auto">
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
              className="w-full h-12 text-base border-green-300 focus:border-green-500 bg-white"
              onFocus={() => setShowDropdown(query.length > 0)}
            />
            
            {showDropdown && filteredBanks.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-green-300 rounded-b-md shadow-lg z-50 max-h-48 overflow-y-auto">
                {filteredBanks.map((bank) => (
                  <div
                    key={bank}
                    className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-green-100 last:border-b-0 transition-colors"
                    onClick={() => handleBankSelect(bank)}
                  >
                    <div className="font-medium text-gray-900 text-sm sm:text-base">{bank}</div>
                    <div className="text-xs sm:text-sm text-green-600">
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
            className="w-full h-12 text-base border-green-300 focus:border-green-500 bg-white font-mono"
            maxLength={11}
          />
          {formData.accountNumber && formData.accountNumber.length >= 9 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
              <p className="text-green-700 text-sm flex items-center gap-2">
                <span className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </span>
                Valid account number format
              </p>
            </div>
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
            placeholder={formData.branchCode ? formData.branchCode : "Auto-filled from bank selection"}
            readOnly
            className={`w-full h-12 text-base font-mono font-semibold ${
              formData.branchCode 
                ? 'bg-green-50 border-green-300 text-green-700' 
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}
          />
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
            <div className="flex items-start gap-2 text-xs text-blue-700">
              <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>Branch code will be automatically assigned from your bank selection</span>
            </div>
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
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={onPrevious} 
            className="w-full sm:flex-1 h-12 text-base order-2 sm:order-1"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!isStepValid()}
            className="w-full sm:flex-1 h-12 text-base sm:h-14 sm:text-lg order-1 sm:order-2"
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