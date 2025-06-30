
import React, { useState, useEffect, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useBranchCodeAutoAssign } from '@/hooks/useBranchCodeAutoAssign';

interface Bank {
  name: string;
  code: string;
  branchCode: string;
  branches: Array<{
    name: string;
    code: string;
    location: string;
  }>;
}

const bankData: Bank[] = [
  { 
    name: "Standard Bank", 
    code: "051001", 
    branchCode: "051001",
    branches: [
      { name: "Head Office", code: "051001", location: "Johannesburg CBD" },
      { name: "Rosebank", code: "052053", location: "Rosebank" },
      { name: "V&A Waterfront", code: "025009", location: "Cape Town" }
    ]
  },
  { 
    name: "ABSA Bank", 
    code: "632005", 
    branchCode: "632005",
    branches: [
      { name: "Main Branch", code: "632005", location: "Johannesburg CBD" },
      { name: "Sandton City", code: "632020", location: "Sandton" },
      { name: "Cape Town Main", code: "632109", location: "Cape Town CBD" }
    ]
  },
  { 
    name: "First National Bank (FNB)", 
    code: "250655", 
    branchCode: "250655",
    branches: [
      { name: "Main Branch", code: "250655", location: "Johannesburg CBD" },
      { name: "Eastgate", code: "251345", location: "Bedfordview" },
      { name: "Claremont", code: "201409", location: "Cape Town" }
    ]
  },
  { 
    name: "Nedbank", 
    code: "198765", 
    branchCode: "198765",
    branches: [
      { name: "Head Office", code: "198765", location: "Sandton" },
      { name: "Canal Walk", code: "198851", location: "Cape Town" },
      { name: "Pavilion", code: "128745", location: "Durban" }
    ]
  },
  { 
    name: "Capitec Bank", 
    code: "470010", 
    branchCode: "470010",
    branches: [
      { name: "Head Office", code: "470010", location: "Stellenbosch" },
      { name: "Sandton", code: "470020", location: "Sandton" },
      { name: "Canal Walk", code: "470030", location: "Cape Town" }
    ]
  }
];

interface BankAutocompleteProps {
  onBankSelect: (bankName: string, routing: string, branchCode: string) => void;
  error?: string;
  selectedBankName?: string;
  selectedBranchCode?: string;
}

const BankAutocomplete: React.FC<BankAutocompleteProps> = ({ 
  onBankSelect, 
  error, 
  selectedBankName = '',
  selectedBranchCode = ''
}) => {
  const [query, setQuery] = useState(selectedBankName);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  const [displayedBranchCode, setDisplayedBranchCode] = useState(selectedBranchCode);
  const { getBranchCodeForBank } = useBranchCodeAutoAssign();

  // Memoize the filtered banks to prevent unnecessary recalculations
  const filteredBanks = React.useMemo(() => 
    bankData.filter(bank => 
      bank.name.toLowerCase().includes(query.toLowerCase())
    ), [query]
  );

  // Initialize with selected bank if provided (only once)
  useEffect(() => {
    if (selectedBankName && !selectedBank) {
      const bank = bankData.find(b => b.name === selectedBankName);
      if (bank) {
        setSelectedBank(bank);
        setQuery(bank.name);
        const mainBranch = bank.branches[0];
        setSelectedBranch(mainBranch);
        
        const branchCode = getBranchCodeForBank(bank.name) || bank.branchCode;
        setDisplayedBranchCode(branchCode);
      }
    }
  }, [selectedBankName, selectedBank, getBranchCodeForBank]);

  // Stable callback to prevent unnecessary re-renders
  const handleBankSelect = useCallback((bank: Bank) => {
    setSelectedBank(bank);
    setQuery(bank.name);
    setShowDropdown(false);
    
    const branchCode = getBranchCodeForBank(bank.name) || bank.branchCode;
    const mainBranch = bank.branches[0];
    setSelectedBranch(mainBranch);
    setDisplayedBranchCode(branchCode);
    
    // Single call to onBankSelect to prevent multiple updates
    onBankSelect(bank.name, '', branchCode);
  }, [getBranchCodeForBank, onBankSelect]);

  const handleBranchSelect = useCallback((branch: any) => {
    setSelectedBranch(branch);
    if (selectedBank) {
      const branchCodeToUse = getBranchCodeForBank(selectedBank.name) || branch.code;
      setDisplayedBranchCode(branchCodeToUse);
      onBankSelect(selectedBank.name, '', branchCodeToUse);
    }
  }, [selectedBank, getBranchCodeForBank, onBankSelect]);

  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    setShowDropdown(value.length > 0);
    if (value.length === 0) {
      setSelectedBank(null);
      setSelectedBranch(null);
      setDisplayedBranchCode('');
      onBankSelect('', '', '');
    }
  }, [onBankSelect]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bankSearch">Select Your South African Bank *</Label>
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
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-50 max-h-48 overflow-y-auto">
              {filteredBanks.map((bank) => (
                <div
                  key={bank.code}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleBankSelect(bank)}
                >
                  <div className="font-medium">{bank.name}</div>
                  <div className="text-sm text-gray-500">Branch Code: {getBranchCodeForBank(bank.name) || bank.branchCode}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {selectedBank && (
        <div className="space-y-2">
          <Label htmlFor="branchSelect">Select Branch (Optional)</Label>
          <select
            id="branchSelect"
            value={selectedBranch?.code || ''}
            onChange={(e) => {
              const branch = selectedBank.branches.find(b => b.code === e.target.value);
              if (branch) handleBranchSelect(branch);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {selectedBank.branches.map((branch) => (
              <option key={branch.code} value={branch.code}>
                {branch.name} - {branch.location} (Code: {branch.code})
              </option>
            ))}
          </select>
          
          {selectedBranch && (
            <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="space-y-1">
                <p className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <strong>Bank:</strong> {selectedBank.name}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <strong>Branch:</strong> {selectedBranch.name}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <strong>Location:</strong> {selectedBranch.location}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <strong>Branch Code:</strong> <span className="font-mono font-bold text-green-700">{displayedBranchCode}</span>
                </p>
              </div>
              <p className="text-xs text-green-600 mt-2 border-t border-green-200 pt-2">
                ✅ Branch code automatically assigned and ready for use
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BankAutocomplete;
