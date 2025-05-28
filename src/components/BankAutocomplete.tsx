
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface Bank {
  name: string;
  code: string;
  routing: string;
  branches: string[];
}

const bankData: Bank[] = [
  { 
    name: "Standard Bank", 
    code: "051001", 
    routing: "051001123", 
    branches: ["Johannesburg CBD", "Sandton", "Cape Town"] 
  },
  { 
    name: "ABSA Bank", 
    code: "632005", 
    routing: "632005456", 
    branches: ["Pretoria", "Durban", "Port Elizabeth"] 
  },
  { 
    name: "First National Bank (FNB)", 
    code: "250655", 
    routing: "250655789", 
    branches: ["Rosebank", "Bellville", "Bloemfontein"] 
  },
  { 
    name: "Nedbank", 
    code: "198765", 
    routing: "198765012", 
    branches: ["Centurion", "East London", "Kimberley"] 
  },
  { 
    name: "Capitec Bank", 
    code: "470010", 
    routing: "470010345", 
    branches: ["Stellenbosch", "George", "Polokwane"] 
  }
];

interface BankAutocompleteProps {
  onBankSelect: (bankName: string, routing: string) => void;
  error?: string;
}

const BankAutocomplete: React.FC<BankAutocompleteProps> = ({ onBankSelect, error }) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const filteredBanks = bankData.filter(bank => 
    bank.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setQuery(bank.name);
    setShowDropdown(false);
    onBankSelect(bank.name, bank.routing);
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    setShowDropdown(value.length > 0);
    if (value.length === 0) {
      setSelectedBank(null);
      onBankSelect('', '');
    }
  };

  return (
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
                {bank.name}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      {selectedBank && (
        <div className="text-sm text-gray-600">
          <p>✓ Bank selected: {selectedBank.name}</p>
          <p>Routing Number: {selectedBank.routing}</p>
        </div>
      )}
    </div>
  );
};

export default BankAutocomplete;
