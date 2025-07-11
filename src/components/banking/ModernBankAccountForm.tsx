import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, AlertCircle, Building2, Shield, Save, Eye, EyeOff } from 'lucide-react';
import { useBranchCodeAutoAssign } from '@/hooks/useBranchCodeAutoAssign';
import { useToast } from '@/hooks/use-toast';

interface SouthAfricanBank {
  name: string;
  code: string;
  universalBranchCode: string;
  branches: Array<{
    name: string;
    code: string;
    location: string;
    address: string;
    phone?: string;
    isMain?: boolean;
  }>;
  swiftCode?: string;
  website?: string;
}

const southAfricanBanks: SouthAfricanBank[] = [
  {
    name: "ABSA Bank",
    code: "632005",
    universalBranchCode: "632005",
    swiftCode: "ABSAZAJJ",
    website: "www.absa.co.za",
    branches: [
      { name: "Main Branch", code: "632005", location: "Johannesburg CBD", address: "15 Troye Street, Johannesburg", phone: "0860 111 234", isMain: true },
      { name: "Sandton City", code: "632020", location: "Sandton", address: "Sandton City Shopping Centre", phone: "011 217 0000" },
      { name: "Cape Town Main", code: "632109", location: "Cape Town CBD", address: "2 Adderley Street, Cape Town", phone: "021 441 9111" }
    ]
  },
  {
    name: "Standard Bank",
    code: "051001",
    universalBranchCode: "051001",
    swiftCode: "SBZAZAJJ",
    website: "www.standardbank.co.za",
    branches: [
      { name: "Head Office", code: "051001", location: "Johannesburg CBD", address: "5 Simmonds Street, Johannesburg", phone: "0860 123 000", isMain: true },
      { name: "Rosebank", code: "052053", location: "Rosebank", address: "The Zone Shopping Centre", phone: "011 636 9111" },
      { name: "V&A Waterfront", code: "025009", location: "Cape Town", address: "Victoria Wharf Shopping Centre", phone: "021 408 4000" }
    ]
  },
  {
    name: "First National Bank (FNB)",
    code: "250655",
    universalBranchCode: "250655",
    swiftCode: "FIRNZAJJ",
    website: "www.fnb.co.za",
    branches: [
      { name: "Main Branch", code: "250655", location: "Johannesburg CBD", address: "4 First Place, Bank City", phone: "087 575 9000", isMain: true },
      { name: "Eastgate", code: "251345", location: "Bedfordview", address: "Eastgate Shopping Centre", phone: "011 479 9000" },
      { name: "Claremont", code: "201409", location: "Cape Town", address: "Cavendish Square Shopping Centre", phone: "021 680 4000" }
    ]
  },
  {
    name: "Nedbank",
    code: "198765",
    universalBranchCode: "198765",
    swiftCode: "NEDSZAJJ",
    website: "www.nedbank.co.za",
    branches: [
      { name: "Head Office", code: "198765", location: "Sandton", address: "135 Rivonia Road, Sandown", phone: "0860 555 111", isMain: true },
      { name: "Canal Walk", code: "198851", location: "Cape Town", address: "Canal Walk Shopping Centre", phone: "021 555 8000" },
      { name: "Pavilion", code: "128745", location: "Durban", address: "Pavilion Shopping Centre", phone: "031 265 0000" }
    ]
  },
  {
    name: "Capitec Bank",
    code: "470010",
    universalBranchCode: "470010",
    swiftCode: "CABLZAJJ",
    website: "www.capitecbank.co.za",
    branches: [
      { name: "Head Office", code: "470010", location: "Stellenbosch", address: "1 Quantum Street, Techno Park", phone: "0860 102 043", isMain: true },
      { name: "Sandton", code: "470020", location: "Sandton", address: "Sandton City Shopping Centre", phone: "011 784 3000" },
      { name: "Canal Walk", code: "470030", location: "Cape Town", address: "Canal Walk Shopping Centre", phone: "021 555 2000" }
    ]
  }
];

interface ModernBankAccountFormProps {
  onBankingComplete: (bankingData: {
    bankName: string;
    accountNumber: string;
    branchCode: string;
    accountType: string;
  }) => void;
  onValidationError: (errors: Record<string, string>) => void;
  defaultValues?: {
    bankName?: string;
    accountNumber?: string;
    branchCode?: string;
  };
  autoSave?: boolean;
  className?: string;
}

const ModernBankAccountForm: React.FC<ModernBankAccountFormProps> = ({
  onBankingComplete,
  onValidationError,
  defaultValues = {},
  autoSave = true,
  className = ''
}) => {
  // Form state
  const [bankQuery, setBankQuery] = useState(defaultValues.bankName || '');
  const [accountNumber, setAccountNumber] = useState(defaultValues.accountNumber || '');
  const [selectedBank, setSelectedBank] = useState<SouthAfricanBank | null>(null);
  const [branchCode, setBranchCode] = useState(defaultValues.branchCode || '');
  const [accountType, setAccountType] = useState('savings');
  
  // UI state
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  
  // Refs for smart error handling
  const bankInputRef = useRef<HTMLInputElement>(null);
  const accountInputRef = useRef<HTMLInputElement>(null);
  
  const { getBranchCodeForBank } = useBranchCodeAutoAssign();
  const { toast } = useToast();

  // Load saved data on mount
  useEffect(() => {
    if (autoSave) {
      const savedAccount = localStorage.getItem('moderna_banking_account');
      const savedBank = localStorage.getItem('moderna_banking_bank');
      
      if (savedAccount && !accountNumber) {
        setAccountNumber(savedAccount);
      }
      
      if (savedBank && !bankQuery) {
        setBankQuery(savedBank);
        const bank = southAfricanBanks.find(b => b.name === savedBank);
        if (bank) {
          handleBankSelection(bank);
        }
      }
    }
  }, []);

  // Auto-save account number
  useEffect(() => {
    if (autoSave && accountNumber && accountNumber.length >= 8) {
      const timeoutId = setTimeout(() => {
        setIsAutoSaving(true);
        localStorage.setItem('moderna_banking_account', accountNumber);
        setTimeout(() => {
          setIsAutoSaving(false);
          setLastSaved(new Date());
        }, 500);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [accountNumber, autoSave]);

  // Auto-save bank selection
  useEffect(() => {
    if (autoSave && selectedBank) {
      localStorage.setItem('moderna_banking_bank', selectedBank.name);
    }
  }, [selectedBank, autoSave]);

  // Filter banks based on query
  const filteredBanks = southAfricanBanks.filter(bank =>
    bank.name.toLowerCase().includes(bankQuery.toLowerCase()) ||
    bank.code.includes(bankQuery)
  );

  // Handle bank selection with auto-fill
  const handleBankSelection = (bank: SouthAfricanBank) => {
    setSelectedBank(bank);
    setBankQuery(bank.name);
    setShowBankDropdown(false);
    
    // Auto-fill branch code
    const autoFilledBranchCode = getBranchCodeForBank(bank.name) || bank.universalBranchCode;
    setBranchCode(autoFilledBranchCode);
    
    // Clear bank error if it exists
    if (fieldErrors.bankName) {
      setFieldErrors(prev => ({ ...prev, bankName: '' }));
    }
    
    toast({
      title: "Bank Selected",
      description: `${bank.name} selected with auto-filled branch code`,
      duration: 2000
    });
  };

  // Handle account number input with validation
  const handleAccountNumberChange = (value: string) => {
    // Only allow digits
    const cleanValue = value.replace(/\D/g, '');
    setAccountNumber(cleanValue);
    
    // Clear account number error if it exists and length is valid
    if (fieldErrors.accountNumber && cleanValue.length >= 8) {
      setFieldErrors(prev => ({ ...prev, accountNumber: '' }));
    }
  };

  // Smart validation with field-specific error handling
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!selectedBank || !bankQuery) {
      errors.bankName = "Please select your bank from the dropdown";
    }
    
    if (!accountNumber || accountNumber.length < 8) {
      errors.accountNumber = "Please enter a valid account number (minimum 8 digits)";
    } else if (!/^\d+$/.test(accountNumber)) {
      errors.accountNumber = "Account number should only contain numbers";
    }
    
    if (!branchCode) {
      errors.branchCode = "Branch code is required (auto-filled from bank selection)";
    }
    
    setFieldErrors(errors);
    onValidationError(errors);
    
    // Smart scrolling to first error field
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField === 'bankName' && bankInputRef.current) {
        bankInputRef.current.focus();
        bankInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (firstErrorField === 'accountNumber' && accountInputRef.current) {
        accountInputRef.current.focus();
        accountInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    
    return true;
  };

  // Check if form is complete
  useEffect(() => {
    const isComplete = selectedBank && accountNumber.length >= 8 && branchCode && Object.keys(fieldErrors).length === 0;
    setIsFormComplete(isComplete);
    
    if (isComplete) {
      onBankingComplete({
        bankName: selectedBank.name,
        accountNumber,
        branchCode,
        accountType
      });
    }
  }, [selectedBank, accountNumber, branchCode, accountType, fieldErrors, onBankingComplete]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Bank Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="bankSearch" className="text-sm font-medium text-foreground">
            Select Your South African Bank *
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs text-primary hover:text-primary/80"
          >
            Auto-Detect
          </Button>
        </div>
        
        <div className="relative">
          <Input
            ref={bankInputRef}
            id="bankSearch"
            value={bankQuery}
            onChange={(e) => {
              setBankQuery(e.target.value);
              setShowBankDropdown(e.target.value.length > 0);
            }}
            onFocus={() => setShowBankDropdown(bankQuery.length > 0)}
            placeholder="Start typing your bank name (e.g., FNB, ABSA, Standard Bank)..."
            className={`${fieldErrors.bankName ? 'border-destructive ring-destructive/20' : ''} transition-all duration-200`}
          />
          
          {showBankDropdown && filteredBanks.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-b-md shadow-lg z-50 max-h-64 overflow-y-auto">
              {filteredBanks.map((bank) => (
                <div
                  key={bank.code}
                  className="px-4 py-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0 transition-colors"
                  onClick={() => handleBankSelection(bank)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">{bank.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Code: {bank.code} • Swift: {bank.swiftCode}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {bank.branches.length} branches • {bank.website}
                      </div>
                    </div>
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Inline error for bank selection */}
        {fieldErrors.bankName && (
          <div className="flex items-center gap-2 text-destructive text-sm animate-fade-in">
            <AlertCircle className="w-4 h-4" />
            <span>{fieldErrors.bankName}</span>
          </div>
        )}
      </div>

      {/* Selected Bank Details */}
      {selectedBank && (
        <Card className="border-primary/20 bg-primary/5 animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Check className="w-5 h-5 text-primary" />
              <span className="font-medium">Banking Details</span>
            </div>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium text-foreground">{selectedBank.name}</span> - {selectedBank.universalBranchCode}</p>
              <p className="text-muted-foreground">
                {selectedBank.branches.find(b => b.isMain)?.name || selectedBank.branches[0]?.name}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Account Number Input */}
      <div className="space-y-2">
        <Label htmlFor="accountNumber" className="text-sm font-medium text-foreground">
          Account Number *
        </Label>
        <div className="relative">
          <Input
            ref={accountInputRef}
            id="accountNumber"
            type={showAccountNumber ? "text" : "password"}
            value={accountNumber}
            onChange={(e) => handleAccountNumberChange(e.target.value)}
            placeholder="Enter your account number"
            className={`${fieldErrors.accountNumber ? 'border-destructive ring-destructive/20' : ''} pr-20 font-mono transition-all duration-200`}
            maxLength={15}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {isAutoSaving && (
              <Save className="w-4 h-4 text-primary animate-pulse" />
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowAccountNumber(!showAccountNumber)}
            >
              {showAccountNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        {/* Account number validation feedback */}
        {accountNumber && accountNumber.length < 8 && !fieldErrors.accountNumber && (
          <div className="text-xs text-muted-foreground">
            Need at least 8 digits ({accountNumber.length}/8)
          </div>
        )}
        
        {/* Auto-save indicator */}
        {lastSaved && autoSave && accountNumber.length >= 8 && (
          <div className="flex items-center gap-2 text-xs text-primary">
            <Shield className="w-3 h-3" />
            <span>Securely saved at {lastSaved.toLocaleTimeString()}</span>
          </div>
        )}
        
        {/* Inline error for account number */}
        {fieldErrors.accountNumber && (
          <div className="flex items-center gap-2 text-destructive text-sm animate-fade-in">
            <AlertCircle className="w-4 h-4" />
            <span>{fieldErrors.accountNumber}</span>
          </div>
        )}
      </div>

      {/* Branch Code - Auto-filled */}
      {selectedBank && (
        <div className="space-y-2 animate-fade-in">
          <Label htmlFor="branchCode" className="text-sm font-medium text-foreground">
            Branch Code *
          </Label>
          <div className="relative">
            <Input
              id="branchCode"
              value={branchCode}
              readOnly
              placeholder="Auto-filled from bank selection"
              className="bg-muted text-muted-foreground font-mono"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Check className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-primary">
            <Building2 className="w-3 h-3" />
            <span>Branch code automatically detected from your bank selection</span>
          </div>
        </div>
      )}

      {/* Account Type Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Account Type</Label>
        <div className="flex gap-2">
          {['savings', 'current', 'transmission'].map((type) => (
            <Button
              key={type}
              type="button"
              variant={accountType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setAccountType(type)}
              className="capitalize"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Success Confirmation */}
      {isFormComplete && (
        <Card className="border-primary bg-primary/5 animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Check className="w-5 h-5" />
              <span className="font-medium">Banking Information Complete!</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your banking details are securely saved and will be available for all future transactions.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Form Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          onClick={validateForm}
          className="flex-1"
          disabled={!selectedBank || !accountNumber || accountNumber.length < 8}
        >
          {isFormComplete ? 'Banking Details Confirmed' : 'Validate Banking Information'}
        </Button>
      </div>
    </div>
  );
};

export default ModernBankAccountForm;