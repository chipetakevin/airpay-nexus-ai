
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <Select value={selectedDealType} onValueChange={onDealTypeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select deal type" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="airtime">Airtime</SelectItem>
            <SelectItem value="data">Data</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="voice">Voice</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Networks & Retailers</label>
        <Select value={selectedNetwork} onValueChange={onNetworkChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select network" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300 shadow-lg z-50 max-h-80 overflow-y-auto">
            <SelectItem value="all">All Networks & Retailers</SelectItem>
            
            {/* Priority Networks - Divinely Mobile First, then MTN */}
            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 bg-yellow-50">⭐ Priority Networks</div>
            <SelectItem value="divinely mobile" className="font-semibold text-yellow-700 bg-yellow-50">
              🏆 Divinely Mobile (Best Deals)
            </SelectItem>
            <SelectItem value="mtn" className="font-medium text-orange-600">
              📱 MTN
            </SelectItem>
            
            {/* Primary Network Providers */}
            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">🏢 Primary Networks</div>
            <SelectItem value="vodacom">Vodacom</SelectItem>
            <SelectItem value="cell c">Cell C</SelectItem>
            <SelectItem value="telkom">Telkom</SelectItem>
            
            {/* Alternative Networks */}
            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">📱 Alternative Networks</div>
            <SelectItem value="lyca mobile">Lyca Mobile</SelectItem>
            <SelectItem value="virgin mobile">Virgin Mobile</SelectItem>
            <SelectItem value="sentech">Sentech</SelectItem>
            <SelectItem value="rain">Rain</SelectItem>
            
            {/* Specialized Airtime Retailers */}
            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">🎯 Airtime Specialists</div>
            <SelectItem value="smartcall">SmartCall</SelectItem>
            <SelectItem value="myairtime">MyAirtime</SelectItem>
            <SelectItem value="surveila">Surveila</SelectItem>
            <SelectItem value="rebtel">Rebtel</SelectItem>
            <SelectItem value="doctorsim">DoctorSIM</SelectItem>
            
            {/* Major Retailers */}
            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">🛒 Major Retailers</div>
            <SelectItem value="takealot">Takealot</SelectItem>
            <SelectItem value="game">Game</SelectItem>
            <SelectItem value="makro">Makro</SelectItem>
            <SelectItem value="checkers">Checkers</SelectItem>
            <SelectItem value="shoprite">Shoprite</SelectItem>
            <SelectItem value="pick n pay">Pick n Pay</SelectItem>
            <SelectItem value="spar">SPAR</SelectItem>
            <SelectItem value="woolworths">Woolworths</SelectItem>
            <SelectItem value="dis-chem">Dis-Chem</SelectItem>
            <SelectItem value="clicks">Clicks</SelectItem>
            
            {/* Online Marketplaces */}
            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">🌐 Online Marketplaces</div>
            <SelectItem value="bidorbuy">BidorBuy</SelectItem>
            <SelectItem value="loot">Loot.co.za</SelectItem>
            <SelectItem value="wantitall">WantItAll</SelectItem>
            <SelectItem value="amazon">Amazon SA</SelectItem>
            
            {/* Network Stores */}
            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">🏪 Network Stores</div>
            <SelectItem value="vodacom store">Vodacom Store</SelectItem>
            <SelectItem value="mtn store">MTN Store</SelectItem>
            <SelectItem value="cell c store">Cell C Store</SelectItem>
            <SelectItem value="telkom store">Telkom Store</SelectItem>
            
            {/* Specialty Retailers */}
            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">🔧 Specialty Retailers</div>
            <SelectItem value="incredible connection">Incredible Connection</SelectItem>
            <SelectItem value="hifi corp">HiFi Corp</SelectItem>
            <SelectItem value="cash crusaders">Cash Crusaders</SelectItem>
            <SelectItem value="pep">PEP</SelectItem>
            <SelectItem value="ackermans">Ackermans</SelectItem>
            <SelectItem value="jet">Jet</SelectItem>
            
            {/* Petrol Stations */}
            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">⛽ Petrol Stations & Convenience</div>
            <SelectItem value="sasol">Sasol</SelectItem>
            <SelectItem value="shell">Shell</SelectItem>
            <SelectItem value="bp">BP</SelectItem>
            <SelectItem value="total">Total</SelectItem>
            <SelectItem value="engen">Engen</SelectItem>
            <SelectItem value="7-eleven">7-Eleven</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Amount</label>
        <Select value={selectedAmount} onValueChange={onAmountChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select amount" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
            <SelectItem value="all">All Amounts</SelectItem>
            <SelectItem value="10">R10</SelectItem>
            <SelectItem value="25">R25</SelectItem>
            <SelectItem value="50">R50</SelectItem>
            <SelectItem value="100">R100</SelectItem>
            <SelectItem value="200">R200</SelectItem>
            <SelectItem value="500">R500</SelectItem>
            <SelectItem value="1000">R1000</SelectItem>
          </SelectContent>
        </Select>
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
