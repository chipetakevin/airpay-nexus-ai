
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface Bank {
  name: string;
  code: string;
  routing: string;
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
    routing: "051001123",
    branchCode: "051001",
    branches: [
      { name: "Johannesburg CBD", code: "051001", location: "Johannesburg, Gauteng" },
      { name: "Sandton City", code: "051002", location: "Sandton, Gauteng" },
      { name: "Cape Town Main", code: "051003", location: "Cape Town, Western Cape" }
    ]
  },
  { 
    name: "ABSA Bank", 
    code: "632005", 
    routing: "632005456",
    branchCode: "632005",
    branches: [
      { name: "Pretoria Central", code: "632005", location: "Pretoria, Gauteng" },
      { name: "Durban Point", code: "632006", location: "Durban, KwaZulu-Natal" },
      { name: "Port Elizabeth Main", code: "632007", location: "Port Elizabeth, Eastern Cape" }
    ]
  },
  { 
    name: "First National Bank (FNB)", 
    code: "250655", 
    routing: "250655789",
    branchCode: "250655",
    branches: [
      { name: "Rosebank", code: "250655", location: "Rosebank, Gauteng" },
      { name: "Bellville", code: "250656", location: "Bellville, Western Cape" },
      { name: "Bloemfontein Central", code: "250657", location: "Bloemfontein, Free State" }
    ]
  },
  { 
    name: "Nedbank", 
    code: "198765", 
    routing: "198765012",
    branchCode: "198765",
    branches: [
      { name: "Centurion Mall", code: "198765", location: "Centurion, Gauteng" },
      { name: "East London CBD", code: "198766", location: "East London, Eastern Cape" },
      { name: "Kimberley Main", code: "198767", location: "Kimberley, Northern Cape" }
    ]
  },
  { 
    name: "Capitec Bank", 
    code: "470010", 
    routing: "470010345",
    branchCode: "470010",
    branches: [
      { name: "Stellenbosch", code: "470010", location: "Stellenbosch, Western Cape" },
      { name: "George Mall", code: "470011", location: "George, Western Cape" },
      { name: "Polokwane Central", code: "470012", location: "Polokwane, Limpopo" }
    ]
  }
];

interface BankAutocompleteProps {
  onBankSelect: (bankName: string, routing: string, branchCode: string) => void;
  error?: string;
}

const BankAutocomplete: React.FC<BankAutocompleteProps> = ({ onBankSelect, error }) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<any>(null);

  const filteredBanks = bankData.filter(bank => 
    bank.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setQuery(bank.name);
    setShowDropdown(false);
    
    // Auto-select main branch by default
    const mainBranch = bank.branches[0];
    setSelectedBranch(mainBranch);
    onBankSelect(bank.name, bank.routing, mainBranch.code);
  };

  const handleBranchSelect = (branch: any) => {
    setSelectedBranch(branch);
    if (selectedBank) {
      onBankSelect(selectedBank.name, selectedBank.routing, branch.code);
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

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bankSearch">Select Your Bank *</Label>
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
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-50 max-h-48 overflow-y-auto">
              {filteredBanks.map((bank) => (
                <div
                  key={bank.code}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleBankSelect(bank)}
                >
                  <div className="font-medium">{bank.name}</div>
                  <div className="text-sm text-gray-500">Code: {bank.code}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {selectedBank && (
        <div className="space-y-2">
          <Label htmlFor="branchSelect">Select Branch (Auto-detected)</Label>
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
            <div className="text-sm text-gray-600 bg-green-50 p-2 rounded">
              <p>✓ Bank: {selectedBank.name}</p>
              <p>✓ Branch: {selectedBranch.name}</p>
              <p>✓ Location: {selectedBranch.location}</p>
              <p>✓ Branch Code: {selectedBranch.code}</p>
              <p>✓ Routing Number: {selectedBank.routing}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BankAutocomplete;
