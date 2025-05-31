
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
            <span className="text-sm font-medium">Network & Retailers:</span>
            <select 
              value={selectedNetwork} 
              onChange={(e) => onNetworkChange(e.target.value)}
              className="px-2 py-1 border rounded text-sm"
            >
              <option value="all">All Networks & Retailers</option>
              
              {/* Network Providers */}
              <optgroup label="Network Providers">
                <option value="mtn">MTN</option>
                <option value="vodacom">Vodacom</option>
                <option value="cell c">Cell C</option>
                <option value="telkom">Telkom</option>
                <option value="rain">Rain</option>
              </optgroup>
              
              {/* Major Retailers */}
              <optgroup label="Major Retailers">
                <option value="takealot">Takealot</option>
                <option value="game">Game</option>
                <option value="makro">Makro</option>
                <option value="checkers">Checkers</option>
                <option value="shoprite">Shoprite</option>
                <option value="pick n pay">Pick n Pay</option>
                <option value="spar">SPAR</option>
                <option value="woolworths">Woolworths</option>
                <option value="dis-chem">Dis-Chem</option>
                <option value="clicks">Clicks</option>
              </optgroup>
              
              {/* Online Marketplaces */}
              <optgroup label="Online Marketplaces">
                <option value="bidorbuy">BidorBuy</option>
                <option value="loot">Loot.co.za</option>
                <option value="wantitall">WantItAll</option>
                <option value="amazon">Amazon SA</option>
              </optgroup>
              
              {/* Network Stores */}
              <optgroup label="Network Stores">
                <option value="vodacom store">Vodacom Store</option>
                <option value="mtn store">MTN Store</option>
                <option value="cell c store">Cell C Store</option>
                <option value="telkom store">Telkom Store</option>
              </optgroup>
              
              {/* Specialty Retailers */}
              <optgroup label="Specialty Retailers">
                <option value="incredible connection">Incredible Connection</option>
                <option value="hifi corp">HiFi Corp</option>
                <option value="cash crusaders">Cash Crusaders</option>
                <option value="pep">PEP</option>
                <option value="ackermans">Ackermans</option>
                <option value="jet">Jet</option>
              </optgroup>
              
              {/* Petrol Stations */}
              <optgroup label="Petrol Stations & Convenience">
                <option value="sasol">Sasol</option>
                <option value="shell">Shell</option>
                <option value="bp">BP</option>
                <option value="total">Total</option>
                <option value="engen">Engen</option>
                <option value="7-eleven">7-Eleven</option>
              </optgroup>
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
