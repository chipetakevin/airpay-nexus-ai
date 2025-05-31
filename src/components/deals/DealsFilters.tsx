
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Filter } from 'lucide-react';

interface DealsFiltersProps {
  selectedNetwork: string;
  selectedAmount: string;
  onNetworkChange: (network: string) => void;
  onAmountChange: (amount: string) => void;
}

const DealsFilters = ({
  selectedNetwork,
  selectedAmount,
  onNetworkChange,
  onAmountChange
}: DealsFiltersProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Network:</span>
            <select 
              value={selectedNetwork} 
              onChange={(e) => onNetworkChange(e.target.value)}
              className="px-2 py-1 border rounded text-sm"
            >
              <option value="all">All Networks</option>
              <option value="mtn">MTN</option>
              <option value="vodacom">Vodacom</option>
              <option value="cell c">Cell C</option>
              <option value="telkom">Telkom</option>
              <option value="rain">Rain</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Amount:</span>
            <select 
              value={selectedAmount} 
              onChange={(e) => onAmountChange(e.target.value)}
              className="px-2 py-1 border rounded text-sm"
            >
              <option value="all">All Amounts</option>
              <option value="25">R25</option>
              <option value="50">R50</option>
              <option value="100">R100</option>
              <option value="200">R200</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealsFilters;
