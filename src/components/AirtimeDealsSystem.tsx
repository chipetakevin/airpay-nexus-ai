import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  RefreshCw,
  Bell
} from 'lucide-react';
import { Deal, CartItem } from '@/types/deals';
import { loadDealsFromSupabase, getSampleDeals } from '@/services/dealsService';
import DealsFilters from './deals/DealsFilters';
import DealCard from './deals/DealCard';
import SystemInfo from './deals/SystemInfo';
import ShoppingCart from './ShoppingCart';
import AuthenticationIndicator from './deals/AuthenticationIndicator';

const AirtimeDealsSystem = () => {
  const { toast } = useToast();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState('all');
  const [selectedAmount, setSelectedAmount] = useState('all');
  const [selectedDealType, setSelectedDealType] = useState('all');
  const [showCart, setShowCart] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<CartItem | null>(null);

  const loadDeals = async () => {
    setIsLoading(true);
    try {
      const dealsData = await loadDealsFromSupabase();
      // Ensure we have both airtime and data deals
      const enhancedDeals = dealsData.length > 0 ? dealsData : getSampleDeals();
      setDeals(enhancedDeals);
    } catch (error) {
      console.error('Error loading deals:', error);
      toast({
        title: "Error Loading Deals",
        description: "Unable to load deals. Using sample data.",
        variant: "destructive"
      });
      setDeals(getSampleDeals());
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDeals = deals.filter(deal => {
    const networkMatch = selectedNetwork === 'all' || deal.network.toLowerCase() === selectedNetwork.toLowerCase();
    const amountMatch = selectedAmount === 'all' || deal.amount === parseInt(selectedAmount);
    const dealTypeMatch = selectedDealType === 'all' || deal.deal_type === selectedDealType;
    return networkMatch && amountMatch && dealTypeMatch;
  });

  const handleGrabDeal = (cartItem: CartItem) => {
    setSelectedDeal(cartItem);
    setShowCart(true);
  };

  useEffect(() => {
    loadDeals();
  }, []);

  return (
    <div className="space-y-6">
      {/* Authentication Indicator */}
      <AuthenticationIndicator />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">🔍 Smart Airtime & Data Deals</h3>
          <p className="text-gray-600 text-sm">AI-powered deal discovery from top SA vendors</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadDeals}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Alerts
          </Button>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Deal Type</label>
          <select
            value={selectedDealType}
            onChange={(e) => setSelectedDealType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="airtime">Airtime</option>
            <option value="data">Data</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Network</label>
          <select
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Networks</option>
            <option value="mtn">MTN</option>
            <option value="vodacom">Vodacom</option>
            <option value="cell c">Cell C</option>
            <option value="telkom">Telkom</option>
            <option value="rain">Rain</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Amount</label>
          <select
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Amounts</option>
            <option value="10">R10</option>
            <option value="25">R25</option>
            <option value="50">R50</option>
            <option value="100">R100</option>
            <option value="500">R500</option>
          </select>
        </div>
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedNetwork('all');
              setSelectedAmount('all');
              setSelectedDealType('all');
            }}
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Deals Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDeals.map(deal => (
            <DealCard
              key={deal.id}
              deal={deal}
              onGrabDeal={handleGrabDeal}
            />
          ))}
        </div>
      )}

      {filteredDeals.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              No deals found for the selected filters. Try adjusting your criteria.
            </div>
          </CardContent>
        </Card>
      )}

      <SystemInfo />

      {/* Shopping Cart Modal */}
      {showCart && (
        <ShoppingCart 
          initialDeal={selectedDeal}
          onClose={() => {
            setShowCart(false);
            setSelectedDeal(null);
          }}
        />
      )}
    </div>
  );
};

export default AirtimeDealsSystem;
