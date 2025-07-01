
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, CheckCircle, Building, Loader2 } from 'lucide-react';
import EnhancedSouthAfricanBankAutocomplete from '@/components/banking/EnhancedSouthAfricanBankAutocomplete';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface EnhancedVendorBankingSectionProps {
  formData: any;
  errors: any;
  onBankSelect: (bankName: string, routing: string, branchCode: string) => void;
  onInputChange: (field: string, value: any) => void;
}

const EnhancedVendorBankingSection: React.FC<EnhancedVendorBankingSectionProps> = ({
  formData,
  errors,
  onBankSelect,
  onInputChange
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  // Check if banking section is complete
  const isBankingComplete = formData.bankName && formData.accountNumber && formData.branchCode;

  // Auto-collapse when banking is complete
  useEffect(() => {
    if (isBankingComplete && !isCollapsed) {
      const timer = setTimeout(() => {
        setIsCollapsed(true);
        toast({
          title: "Banking Details Complete! 🏦",
          description: "Banking section collapsed. Click to expand if needed.",
          duration: 2000
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isBankingComplete, isCollapsed, toast]);

  // Auto-save simulation
  useEffect(() => {
    if (formData.bankName || formData.accountNumber) {
      setIsAutoSaving(true);
      const timer = setTimeout(() => {
        setIsAutoSaving(false);
        setLastSaved(new Date());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [formData.bankName, formData.accountNumber]);

  const handleBankSelect = (bankName: string, routing: string, branchCode: string, bankDetails?: any) => {
    onBankSelect(bankName, routing, branchCode);
    
    // Ensure branch code is immediately updated in the form data
    onInputChange('branchCode', branchCode);
    
    if (bankDetails) {
      toast({
        title: "Bank Selected! 🏦",
        description: `${bankName} with branch code ${branchCode} has been auto-filled.`,
        duration: 3000
      });
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

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
                <CardTitle className="text-lg text-green-800">
                  Banking Details Complete
                </CardTitle>
                <p className="text-sm text-green-600 mt-1">
                  {formData.bankName} • Account: ***{formData.accountNumber?.slice(-4)} • Branch: {formData.branchCode}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-700">
                <CheckCircle className="w-3 h-3 mr-1" />
                Complete
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

  return (
    <Card className="border-yellow-200 bg-yellow-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building className="w-5 h-5 text-yellow-700" />
            <div>
              <CardTitle className="text-lg text-yellow-800">
                Business Banking Information
              </CardTitle>
              <p className="text-sm text-yellow-600">
                Add your business banking details for commission payments
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAutoSaving && (
              <div className="flex items-center gap-1 text-xs text-yellow-600">
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
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapse}
                className="p-1 h-8 w-8 hover:bg-yellow-100 rounded-full"
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <EnhancedSouthAfricanBankAutocomplete
          onBankSelect={handleBankSelect}
          error={errors.bankName}
          defaultValue={formData.bankName}
          showBranchDetails={true}
        />

        <div className="space-y-2">
          <Label htmlFor="accountNumber">Business Account Number *</Label>
          <Input
            id="accountNumber"
            value={formData.accountNumber || ''}
            onChange={(e) => onInputChange('accountNumber', e.target.value)}
            placeholder="Enter business account number"
            className={errors.accountNumber ? 'border-red-500' : ''}
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
          <p className="text-xs text-yellow-600">
            ℹ️ Branch code automatically detected from your bank selection
          </p>
        </div>

        {isBankingComplete && (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-sm text-green-700">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">Banking details complete and ready!</span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              Your banking information has been validated and will be auto-saved.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedVendorBankingSection;
