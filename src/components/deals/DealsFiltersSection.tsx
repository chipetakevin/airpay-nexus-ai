
import React from 'react';
import { Button } from '@/components/ui/button';

interface DealsFiltersSectionProps {
  selectedDealType: string;
  selectedNetwork: string;
  selectedAmount: string;
  onDealTypeChange: (dealType: string) => void;
  onNetworkChange: (network: string) => void;
  onAmountChange: (amount: string) => void;
  onClearFilters: () => void;
}

const DealsFiltersSection = ({
  selectedDealType,
  selectedNetwork,
  selectedAmount,
  onDealTypeChange,
  onNetworkChange,
  onAmountChange,
  onClearFilters
}: DealsFiltersSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium mb-2">Deal Type</label>
        <select
          value={selectedDealType}
          onChange={(e) => onDealTypeChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="airtime">Airtime</option>
          <option value="data">Data</option>
          <option value="sms">SMS</option>
          <option value="voice">Voice</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Networks & Retailers</label>
        <select
          value={selectedNetwork}
          onChange={(e) => onNetworkChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Networks & Retailers</option>
          
          {/* Primary Network Providers */}
          <optgroup label="🏢 Primary Networks">
            <option value="vodacom">Vodacom</option>
            <option value="mtn">MTN</option>
            <option value="cell c">Cell C</option>
            <option value="telkom">Telkom</option>
          </optgroup>
          
          {/* Alternative Networks */}
          <optgroup label="📱 Alternative Networks">
            <option value="lyca mobile">Lyca Mobile</option>
            <option value="virgin mobile">Virgin Mobile</option>
            <option value="sentech">Sentech</option>
            <option value="rain">Rain</option>
          </optgroup>
          
          {/* Specialized Airtime Retailers */}
          <optgroup label="🎯 Airtime Specialists">
            <option value="smartcall">SmartCall</option>
            <option value="myairtime">MyAirtime</option>
            <option value="surveila">Surveila</option>
            <option value="rebtel">Rebtel</option>
            <option value="doctorsim">DoctorSIM</option>
          </optgroup>
          
          {/* Major Retailers */}
          <optgroup label="🛒 Major Retailers">
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
          <optgroup label="🌐 Online Marketplaces">
            <option value="bidorbuy">BidorBuy</option>
            <option value="loot">Loot.co.za</option>
            <option value="wantitall">WantItAll</option>
            <option value="amazon">Amazon SA</option>
          </optgroup>
          
          {/* Network Stores */}
          <optgroup label="🏪 Network Stores">
            <option value="vodacom store">Vodacom Store</option>
            <option value="mtn store">MTN Store</option>
            <option value="cell c store">Cell C Store</option>
            <option value="telkom store">Telkom Store</option>
          </optgroup>
          
          {/* Specialty Retailers */}
          <optgroup label="🔧 Specialty Retailers">
            <option value="incredible connection">Incredible Connection</option>
            <option value="hifi corp">HiFi Corp</option>
            <option value="cash crusaders">Cash Crusaders</option>
            <option value="pep">PEP</option>
            <option value="ackermans">Ackermans</option>
            <option value="jet">Jet</option>
          </optgroup>
          
          {/* Petrol Stations */}
          <optgroup label="⛽ Petrol Stations & Convenience">
            <option value="sasol">Sasol</option>
            <option value="shell">Shell</option>
            <option value="bp">BP</option>
            <option value="total">Total</option>
            <option value="engen">Engen</option>
            <option value="7-eleven">7-Eleven</option>
          </optgroup>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Amount</label>
        <select
          value={selectedAmount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Amounts</option>
          <option value="10">R10</option>
          <option value="25">R25</option>
          <option value="50">R50</option>
          <option value="100">R100</option>
          <option value="200">R200</option>
          <option value="500">R500</option>
          <option value="1000">R1000</option>
        </select>
      </div>
      <div className="flex items-end">
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default DealsFiltersSection;
