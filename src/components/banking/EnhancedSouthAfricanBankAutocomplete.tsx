import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, MapPin, Phone, Globe, Building2, ChevronUp, ChevronDown } from 'lucide-react';
import { useBranchCodeAutoAssign } from '@/hooks/useBranchCodeAutoAssign';

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
  logo?: string;
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
      { name: "Cape Town Main", code: "632109", location: "Cape Town CBD", address: "2 Adderley Street, Cape Town", phone: "021 441 9111" },
      { name: "Durban Point", code: "632242", location: "Durban", address: "176 Victoria Embankment, Durban", phone: "031 313 2222" },
      { name: "Pretoria Central", code: "632166", location: "Pretoria", address: "230 Visagie Street, Pretoria", phone: "012 427 4000" }
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
      { name: "V&A Waterfront", code: "025009", location: "Cape Town", address: "Victoria Wharf Shopping Centre", phone: "021 408 4000" },
      { name: "Umhlanga Ridge", code: "052546", location: "Umhlanga", address: "Umhlanga Ridge Town Centre", phone: "031 580 5000" },
      { name: "Brooklyn Mall", code: "012142", location: "Pretoria", address: "Brooklyn Mall, Pretoria", phone: "012 346 1000" }
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
      { name: "Claremont", code: "201409", location: "Cape Town", address: "Cavendish Square Shopping Centre", phone: "021 680 4000" },
      { name: "Gateway", code: "250705", location: "Umhlanga", address: "Gateway Theatre of Shopping", phone: "031 580 2000" },
      { name: "Menlyn Park", code: "251745", location: "Pretoria", address: "Menlyn Park Shopping Centre", phone: "012 348 7000" }
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
      { name: "Pavilion", code: "128745", location: "Durban", address: "Pavilion Shopping Centre", phone: "031 265 0000" },
      { name: "Wonderpark", code: "167742", location: "Pretoria", address: "Wonderpark Shopping Centre", phone: "012 543 8000" },
      { name: "Centurion Mall", code: "140805", location: "Centurion", address: "Centurion Mall", phone: "012 663 4000" }
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
      { name: "Canal Walk", code: "470030", location: "Cape Town", address: "Canal Walk Shopping Centre", phone: "021 555 2000" },
      { name: "Gateway", code: "470040", location: "Umhlanga", address: "Gateway Theatre of Shopping", phone: "031 566 8000" },
      { name: "Brooklyn Mall", code: "470050", location: "Pretoria", address: "Brooklyn Mall", phone: "012 460 7000" }
    ]
  },
  {
    name: "Discovery Bank",
    code: "679000",
    universalBranchCode: "679000",
    swiftCode: "DISCZA22",
    website: "www.discovery.co.za",
    branches: [
      { name: "Sandton", code: "679000", location: "Sandton", address: "1 Discovery Place, Sandton", phone: "0860 756 777", isMain: true },
      { name: "Cape Town", code: "679001", location: "Cape Town", address: "Discovery Place, Bellville", phone: "021 529 1000" }
    ]
  },
  {
    name: "African Bank",
    code: "430000",
    universalBranchCode: "430000",
    swiftCode: "AFRCZAJJ",
    website: "www.africanbank.co.za",
    branches: [
      { name: "Head Office", code: "430000", location: "Midrand", address: "59 16th Road, Midrand", phone: "0860 11 9999", isMain: true },
      { name: "Johannesburg", code: "430010", location: "Johannesburg CBD", address: "88 Marshall Street", phone: "011 371 0000" }
    ]
  },
  {
    name: "Investec Bank",
    code: "580105",
    universalBranchCode: "580105",
    swiftCode: "INVEZAJJ",
    website: "www.investec.com",
    branches: [
      { name: "Sandton", code: "580105", location: "Sandton", address: "100 Grayston Drive, Sandton", phone: "011 286 7000", isMain: true },
      { name: "Cape Town", code: "580205", location: "Cape Town", address: "36 Hans Strijdom Avenue", phone: "021 416 1000" }
    ]
  }
];

interface EnhancedSouthAfricanBankAutocompleteProps {
  onBankSelect: (bankName: string, routing: string, branchCode: string, bankDetails?: any) => void;
  onBranchSelect?: (branchDetails: any) => void;
  onBranchCodeChange?: (branchCode: string) => void;
  error?: string;
  defaultValue?: string;
  showBranchDetails?: boolean;
  compact?: boolean;
  showBranchCodeField?: boolean;
}

const EnhancedSouthAfricanBankAutocomplete: React.FC<EnhancedSouthAfricanBankAutocompleteProps> = ({
  onBankSelect,
  onBranchSelect,
  onBranchCodeChange,
  error,
  defaultValue = '',
  showBranchDetails = true,
  compact = false,
  showBranchCodeField = true
}) => {
  const [query, setQuery] = useState(defaultValue);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedBank, setSelectedBank] = useState<SouthAfricanBank | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isDetailsCollapsed, setIsDetailsCollapsed] = useState(false);
  const [isProcessingSelection, setIsProcessingSelection] = useState(false);
  const [hasAutoCollapsed, setHasAutoCollapsed] = useState(false);
  const { getBranchCodeForBank } = useBranchCodeAutoAssign();

  // Auto-detect bank from saved data
  useEffect(() => {
    if (defaultValue) {
      const bank = southAfricanBanks.find(b => 
        b.name.toLowerCase().includes(defaultValue.toLowerCase())
      );
      if (bank) {
        setSelectedBank(bank);
        setQuery(bank.name);
        const mainBranch = bank.branches.find(b => b.isMain) || bank.branches[0];
        setSelectedBranch(mainBranch);
        
        // Immediately get and set the branch code
        const branchCode = getBranchCodeForBank(bank.name) || mainBranch.code;
        onBankSelect(bank.name, '', branchCode, {
          bank,
          branch: mainBranch,
          swiftCode: bank.swiftCode
        });
      }
    }
  }, [defaultValue, onBankSelect, getBranchCodeForBank]);

  // Add scroll detection to collapse details when scrolling down
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If scrolling down and details are not collapsed, collapse them
      if (currentScrollY > lastScrollY && currentScrollY > 50 && !isDetailsCollapsed && selectedBank) {
        setIsDetailsCollapsed(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDetailsCollapsed, selectedBank]);

  const filteredBanks = southAfricanBanks.filter(bank =>
    bank.name.toLowerCase().includes(query.toLowerCase()) ||
    bank.code.includes(query) ||
    bank.branches.some(branch => 
      branch.location.toLowerCase().includes(query.toLowerCase())
    )
  );

  const handleBankSelect = async (bank: SouthAfricanBank) => {
    setIsProcessingSelection(true);
    
    // Smooth bank selection with loading state
    setTimeout(() => {
      setSelectedBank(bank);
      setQuery(bank.name);
      setShowDropdown(false);
      
      // Auto-select main branch or first branch
      const mainBranch = bank.branches.find(b => b.isMain) || bank.branches[0];
      setSelectedBranch(mainBranch);
      
      // Get the correct branch code immediately
      const branchCode = getBranchCodeForBank(bank.name) || bank.universalBranchCode || mainBranch.code;
      
      // Call onBankSelect with the proper branch code to update parent form
      onBankSelect(bank.name, bank.universalBranchCode || '', branchCode, {
        bank,
        branch: mainBranch,
        swiftCode: bank.swiftCode,
        branchCode: branchCode
      });

      // Call branch code change callback
      if (onBranchCodeChange) {
        onBranchCodeChange(branchCode);
      }

      if (onBranchSelect) {
        onBranchSelect({
          ...mainBranch,
          branchCode: branchCode
        });
      }

      // Auto-collapse after 3 seconds similar to phone validation
      if (!hasAutoCollapsed) {
        setTimeout(() => {
          setIsDetailsCollapsed(true);
          setHasAutoCollapsed(true);
        }, 3000);
      }

      setIsProcessingSelection(false);
      console.log(`✅ Enhanced Bank selected: ${bank.name}, Branch Code: ${branchCode}, Universal Code: ${bank.universalBranchCode}`);
    }, 300); // Brief loading state for smooth UX
  };

  const handleBranchSelect = (branch: any) => {
    setSelectedBranch(branch);
    if (selectedBank) {
      const branchCode = getBranchCodeForBank(selectedBank.name) || branch.code;
      onBankSelect(selectedBank.name, '', branchCode, {
        bank: selectedBank,
        branch,
        swiftCode: selectedBank.swiftCode
      });

      if (onBranchSelect) {
        onBranchSelect(branch);
      }
    }
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    setShowDropdown(value.length > 0);
    if (value.length === 0) {
      setSelectedBank(null);
      setSelectedBranch(null);
      onBankSelect('', '', '');
    }
  };

  const detectBankFromAccount = async () => {
    setIsDetecting(true);
    // Simulate bank detection logic
    setTimeout(() => {
      if (query.length >= 3) {
        const detectedBank = southAfricanBanks[0]; // Example detection
        handleBankSelect(detectedBank);
      }
      setIsDetecting(false);
    }, 1000);
  };

  if (compact) {
    return (
      <div className="space-y-2">
        <Label htmlFor="bankSearch" className="text-sm font-medium">
          Select Your Bank *
        </Label>
        <div className="relative">
          <Input
            id="bankSearch"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Start typing your bank name..."
            className={error ? 'border-red-500' : ''}
            onFocus={() => setShowDropdown(query.length > 0)}
          />
          
          {showDropdown && filteredBanks.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-[60] max-h-32 overflow-y-auto">
              {filteredBanks.slice(0, 3).map((bank) => (
                <div
                  key={bank.code}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleBankSelect(bank)}
                >
                  <div className="font-medium">{bank.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {error && <p className="text-red-500 text-xs">{error}</p>}
        
        {selectedBank && selectedBranch && (
          <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
            ✓ {selectedBank.name} - {selectedBranch.name} ({selectedBranch.code})
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="bankSearch" className="text-sm font-medium">
            Select Your South African Bank *
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={detectBankFromAccount}
            disabled={isDetecting}
            className="text-xs"
          >
            {isDetecting ? "Detecting..." : "Auto-Detect"}
          </Button>
        </div>
        
        <div className="relative">
          <Input
            id="bankSearch"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Start typing your bank name (e.g., FNB, ABSA, Standard Bank)..."
            className={error ? 'border-red-500' : ''}
            onFocus={() => setShowDropdown(query.length > 0)}
          />
          
          {showDropdown && filteredBanks.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-[60] max-h-64 overflow-y-auto">
              {filteredBanks.map((bank) => (
                <div
                  key={bank.code}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleBankSelect(bank)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{bank.name}</div>
                      <div className="text-sm text-gray-500">
                        Code: {bank.code} • Swift: {bank.swiftCode}
                      </div>
                      <div className="text-xs text-gray-400">
                        {bank.branches.length} branches • {bank.website}
                      </div>
                    </div>
                    <Building2 className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Processing indicator */}
        {isProcessingSelection && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-2 rounded border border-green-200 animate-fade-in">
            <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Processing bank selection...</span>
          </div>
        )}
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Branch Code Field - Auto-filled from bank selection */}
      {showBranchCodeField && selectedBank && !isDetailsCollapsed && (
        <div className="space-y-2 animate-fade-in">
          <Label htmlFor="branchCode" className="text-sm font-medium text-gray-700">
            Branch Code *
          </Label>
          <div className="relative">
            <Input
              id="branchCode"
              value={selectedBank.universalBranchCode || selectedBranch?.code || ''}
              readOnly
              placeholder="Auto-filled from bank selection"
              className="bg-gray-50 text-gray-600 font-mono border-gray-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Check className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-600">
            <Building2 className="w-3 h-3" />
            <span>Branch code automatically detected from your bank selection</span>
          </div>
        </div>
      )}

      {/* Banking Information Saved Confirmation - Auto-collapse after 3 seconds */}
      {selectedBank && selectedBranch && !isDetailsCollapsed && (
        <Card className="border-green-200 bg-green-50/30 animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-medium">Banking Information Saved</span>
            </div>
            <p className="text-sm text-green-700">
              Your banking details are permanently saved and will be available for all future transactions.
            </p>
          </CardContent>
        </Card>
      )}

      {selectedBank && showBranchDetails && (
        <>
          {!isDetailsCollapsed ? (
            <Card className="border-green-200 bg-green-50/30 animate-fade-in">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-green-800 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {selectedBank.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-700">
                      Selected
                    </Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsDetailsCollapsed(true)}
                      className="text-green-600 hover:text-green-800 p-1 h-6 w-6"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Bank Code:</span>
                    <span className="font-mono">{selectedBank.code}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Swift Code:</span>
                    <span className="font-mono">{selectedBank.swiftCode}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-green-700">Select Branch</Label>
                  <select
                    value={selectedBranch?.code || ''}
                    onChange={(e) => {
                      const branch = selectedBank.branches.find(b => b.code === e.target.value);
                      if (branch) handleBranchSelect(branch);
                    }}
                    className="w-full px-3 py-2 text-sm border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white z-[70]"
                  >
                    {selectedBank.branches.map((branch) => (
                      <option key={branch.code} value={branch.code}>
                        {branch.name} - {branch.location} {branch.isMain ? "(Main)" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedBranch && (
                  <div className="bg-white p-3 rounded-lg border border-green-200 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Branch Selected & Code Assigned</span>
                    </div>
                    
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3 h-3" />
                        <span><strong>Branch:</strong> {selectedBranch.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span><strong>Location:</strong> {selectedBranch.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 text-center">#</span>
                        <span><strong>Branch Code:</strong> {selectedBranch.code}</span>
                      </div>
                      {selectedBranch.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          <span><strong>Phone:</strong> {selectedBranch.phone}</span>
                        </div>
                      )}
                      {selectedBank.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3" />
                          <span><strong>Website:</strong> {selectedBank.website}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-green-200 pt-2">
                      <div className="flex items-center gap-2 text-xs text-green-700">
                        <Check className="w-3 h-3" />
                        <span>Branch code automatically assigned and ready for use</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div 
              className="bg-green-50 p-3 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 transition-colors animate-fade-in"
              onClick={() => setIsDetailsCollapsed(false)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-700">Banking Details</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-green-700">
                    {selectedBank.name} - {selectedBranch?.code}
                  </span>
                  <ChevronDown className="w-3 h-3 text-green-600" />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EnhancedSouthAfricanBankAutocomplete;
