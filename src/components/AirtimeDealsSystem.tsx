

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
import { supabase } from '@/integrations/supabase/client';
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
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [scrapingStatus, setScrapingStatus] = useState<'idle' | 'scraping' | 'completed'>('idle');

  const triggerAutonomousScraping = async () => {
    try {
      setScrapingStatus('scraping');
      console.log('Triggering autonomous deal scraping...');
      
      const { data, error } = await supabase.functions.invoke('autonomous-deal-scraper', {
        body: { trigger: 'manual' }
      });
      
      if (error) {
        console.error('Error triggering scraper:', error);
        toast({
          title: "Scraping Error",
          description: "Failed to trigger autonomous deal scraping",
          variant: "destructive"
        });
      } else {
        console.log('Scraping completed:', data);
        setScrapingStatus('completed');
        
        // Wait a moment then reload deals
        setTimeout(() => {
          loadDeals(false);
          setScrapingStatus('idle');
        }, 2000);
      }
    } catch (error) {
      console.error('Scraping error:', error);
      setScrapingStatus('idle');
    }
  };

  const loadDeals = async (showToast = false) => {
    setIsLoading(true);
    try {
      const dealsData = await loadDealsFromSupabase();
      // Ensure we have both airtime and data deals
      const enhancedDeals = dealsData.length > 0 ? dealsData : getSampleDeals();
      setDeals(enhancedDeals);
      setLastRefresh(new Date());
      
      if (showToast) {
        toast({
          title: "Deals Updated",
          description: "Latest deals have been loaded successfully.",
          duration: 2000
        });
      }
    } catch (error) {
      console.error('Error loading deals:', error);
      if (showToast) {
        toast({
          title: "Error Loading Deals",
          description: "Unable to load deals. Using sample data.",
          variant: "destructive"
        });
      }
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

  const handleManualRefresh = async () => {
    // Trigger autonomous scraping first
    await triggerAutonomousScraping();
    // Then load deals with toast
    loadDeals(true);
  };

  // Auto-refresh effect with autonomous scraping
  useEffect(() => {
    // Initial load
    loadDeals();

    // Set up auto-refresh interval (60 seconds) with autonomous scraping
    const autoRefreshInterval = setInterval(async () => {
      console.log('Auto-refreshing deals with autonomous scraping...');
      await triggerAutonomousScraping();
    }, 60000); // 60 seconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(autoRefreshInterval);
    };
  }, []);

  const formatLastRefresh = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return `${diffInMinutes}m ago`;
    }
  };

  const getScrapingStatusIndicator = () => {
    switch (scrapingStatus) {
      case 'scraping':
        return (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-orange-600">Scraping retailers...</span>
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-blue-600">Fresh deals loaded</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600">Auto-scraping: 60s</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Authentication Indicator */}
      <AuthenticationIndicator />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">🔍 Smart Airtime & Data Deals</h3>
          <p className="text-gray-600 text-sm">AI-powered deal discovery from top SA retailers</p>
          <div className="flex flex-col sm:flex-row gap-2 mt-1">
            <span className="text-xs text-gray-500">Last updated: {formatLastRefresh(lastRefresh)}</span>
            {getScrapingStatusIndicator()}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Scanning: Takealot, Game, Vodacom, MTN, Cell C & more
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualRefresh}
            disabled={isLoading || scrapingStatus === 'scraping'}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading || scrapingStatus === 'scraping' ? 'animate-spin' : ''}`} />
            {scrapingStatus === 'scraping' ? 'Scraping...' : 'Refresh'}
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
          <label className="block text-sm font-medium mb-2">Network & Retailers</label>
          <select
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
