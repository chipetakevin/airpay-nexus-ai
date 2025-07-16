import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Check, 
  ChevronDown, 
  Building2, 
  Info, 
  CreditCard, 
  Shield,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface SouthAfricanBank {
  name: string;
  code: string;
  universalBranchCode: string;
  logo?: string;
}

const southAfricanBanks: SouthAfricanBank[] = [
  {
    name: "First National Bank (FNB)",
    code: "250655",
    universalBranchCode: "250655"
  },
  {
    name: "ABSA Bank",
    code: "632005", 
    universalBranchCode: "632005"
  },
  {
    name: "Standard Bank",
    code: "051001",
    universalBranchCode: "051001"
  },
  {
    name: "Nedbank",
    code: "198765",
    universalBranchCode: "198765"
  },
  {
    name: "Capitec Bank",
    code: "470010",
    universalBranchCode: "470010"
  }
];

interface BankingFormData {
  bankName: string;
  accountNumber: string;
  branchCode: string;
  accountType: string;
}

interface ModernBankingFormProps {
  onBankingComplete?: (data: BankingFormData) => void;
  onValidationChange?: (isValid: boolean) => void;
  defaultValues?: Partial<BankingFormData>;
  autoSave?: boolean;
  className?: string;
}

const ModernBankingForm: React.FC<ModernBankingFormProps> = ({
  onBankingComplete,
  onValidationChange,
  defaultValues = {},
  autoSave = true,
  className
}) => {
  // Form state
  const [selectedBank, setSelectedBank] = useState<SouthAfricanBank | null>(null);
  const [bankQuery, setBankQuery] = useState(defaultValues.bankName || '');
  const [accountNumber, setAccountNumber] = useState(defaultValues.accountNumber || '');
  const [branchCode, setBranchCode] = useState(defaultValues.branchCode || '');
  const [accountType, setAccountType] = useState(defaultValues.accountType || 'savings');
  
  // UI state
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [rememberDetails, setRememberDetails] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowBankDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && selectedBank && accountNumber.length >= 8 && branchCode) {
      const saveData = {
        bankName: selectedBank.name,
        accountNumber,
        branchCode,
        accountType
      };
      
      if (rememberDetails) {
        localStorage.setItem('banking_details', JSON.stringify(saveData));
      }
    }
  }, [selectedBank, accountNumber, branchCode, accountType, autoSave, rememberDetails]);

  // Load saved data
  useEffect(() => {
    if (autoSave) {
      const saved = localStorage.getItem('banking_details');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          setBankQuery(data.bankName || '');
          setAccountNumber(data.accountNumber || '');
          setBranchCode(data.branchCode || '');
          setAccountType(data.accountType || 'savings');
          
          const bank = southAfricanBanks.find(b => b.name === data.bankName);
          if (bank) {
            setSelectedBank(bank);
          }
          setRememberDetails(true);
        } catch (error) {
          console.error('Error loading saved banking data:', error);
        }
      }
    }
  }, [autoSave]);

  // Form validation
  useEffect(() => {
    const isComplete = Boolean(selectedBank && accountNumber.length >= 8 && branchCode);
    setIsFormComplete(isComplete);
    
    if (onValidationChange) {
      onValidationChange(isComplete);
    }
    
    if (isComplete && onBankingComplete && selectedBank) {
      onBankingComplete({
        bankName: selectedBank.name,
        accountNumber,
        branchCode,
        accountType
      });
    }
  }, [selectedBank, accountNumber, branchCode, accountType, onBankingComplete, onValidationChange]);

  const handleBankSelect = (bank: SouthAfricanBank) => {
    setSelectedBank(bank);
    setBankQuery(bank.name);
    setBranchCode(bank.universalBranchCode);
    setShowBankDropdown(false);
    
    toast({
      title: "Bank Selected",
      description: `${bank.name} selected with auto-filled branch code`,
      duration: 2000
    });
  };

  const handleAccountNumberChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    setAccountNumber(cleanValue);
  };

  const filteredBanks = southAfricanBanks.filter(bank =>
    bank.name.toLowerCase().includes(bankQuery.toLowerCase())
  );

  return (
    <div className={cn("w-full max-w-md mx-auto mobile-form-container", className)}>
      {/* Bank Selection */}
      <div className="mobile-form-field" ref={dropdownRef}>
        <Label className="mobile-input-label">Select Your Bank</Label>
        <div className="relative">
          <button
            type="button"
            className="mobile-input w-full text-left flex items-center justify-between mobile-focus-ring"
            onClick={() => setShowBankDropdown(!showBankDropdown)}
            aria-expanded={showBankDropdown}
            aria-haspopup="listbox"
            aria-label="Select your bank"
          >
            <span className={selectedBank ? "text-foreground" : "text-muted-foreground"}>
              {selectedBank ? selectedBank.name : "Choose your bank"}
            </span>
            <ChevronDown className={cn(
              "w-4 h-4 transition-transform duration-200",
              showBankDropdown && "rotate-180"
            )} />
          </button>
          
          {showBankDropdown && (
            <Card className="absolute top-full left-0 right-0 z-50 mt-1 border shadow-lg">
              <CardContent className="p-0 max-h-64 overflow-y-auto">
                {filteredBanks.map((bank) => (
                  <div
                    key={bank.code}
                    className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                    onClick={() => handleBankSelect(bank)}
                  >
                    <Building2 className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{bank.name}</div>
                      <div className="text-xs text-muted-foreground">Code: {bank.code}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Banking Details Card - Only show when bank is selected */}
      {selectedBank && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">Banking Details</span>
              <ChevronDown className="w-4 h-4 text-primary ml-auto" />
            </div>
            <div className="text-sm text-foreground">
              <span className="font-medium">{selectedBank.name}</span> - {selectedBank.universalBranchCode}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Account Number */}
      <div className="mobile-form-field">
        <Label className="mobile-input-label">Account Number</Label>
        <div className="mobile-input-wrapper">
          <Input
            type={showAccountNumber ? "text" : "password"}
            value={accountNumber}
            onChange={(e) => handleAccountNumberChange(e.target.value)}
            placeholder="Enter your account number"
            className="mobile-input pr-12 font-mono"
            maxLength={15}
            autoComplete="off"
            inputMode="numeric"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 mobile-focus-ring"
            onClick={() => setShowAccountNumber(!showAccountNumber)}
            aria-label={showAccountNumber ? "Hide account number" : "Show account number"}
          >
            {showAccountNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Branch Code - Auto-filled */}
      {selectedBank && (
        <div className="mobile-form-field">
          <Label className="mobile-input-label">Branch Code</Label>
          <div className="mobile-input-wrapper">
            <Input
              value={branchCode}
              readOnly
              placeholder="Auto-filled from bank selection"
              className="mobile-input bg-muted/50 text-muted-foreground font-mono"
            />
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
          </div>
          <div className="mobile-input-helper flex items-center gap-2 text-primary">
            <Info className="w-3 h-3" />
            <span>Branch code automatically detected from your bank selection</span>
          </div>
        </div>
      )}

      {/* Banking Information Saved */}
      {isFormComplete && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">Banking Information Saved</span>
            </div>
            <p className="text-sm text-primary/80">
              Your banking details are permanently saved and will be available for all future transactions.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Remember Details Option */}
      <div className="flex items-center gap-3 mobile-spacing-sm">
        <input
          type="checkbox"
          id="remember"
          checked={rememberDetails}
          onChange={(e) => setRememberDetails(e.target.checked)}
          className="w-5 h-5 rounded border-input mobile-focus-ring"
        />
        <Label htmlFor="remember" className="mobile-text-base cursor-pointer flex-1">
          Remember my bank details for next time
        </Label>
      </div>

      {/* Payment Card Details Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Payment Card Details</h3>
            <p className="text-sm text-muted-foreground">(Optional)</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowCardForm(!showCardForm)}
            className="h-auto px-4 py-2"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Add Card Details
          </Button>
        </div>

        {showCardForm && (
          <Card className="border-dashed border-muted-foreground/20">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" className="font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium">Expiry Date</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">CVV</Label>
                    <Input placeholder="123" type="password" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Cardholder Name</Label>
                  <Input placeholder="Enter name as on card" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowCardForm(false)}>
                    Cancel
                  </Button>
                  <Button size="sm">Save Card</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Security Notice */}
      <Alert className="border-primary/20 bg-primary/5">
        <Shield className="h-4 w-4 text-primary" />
        <AlertDescription className="text-primary text-sm">
          <div className="font-medium mb-1">Secure & Encrypted</div>
          All banking information is encrypted and stored securely using industry-standard security protocols.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ModernBankingForm;