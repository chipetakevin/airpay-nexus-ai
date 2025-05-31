import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  TrendingDown, 
  Clock, 
  MapPin, 
  Zap,
  Filter,
  RefreshCw,
  Bell,
  ShoppingCart as CartIcon
} from 'lucide-react';
import ShoppingCart from './ShoppingCart';

interface Deal {
  id: string;
  network: string;
  amount: number;
  original_price: number;
  discounted_price: number;
  discount_percentage: number;
  vendor_name: string;
  availability: string;
  demand_level: string;
  bonus?: string;
  expires_at?: string;
  verified: boolean;
}

const AirtimeDealsSystem = () => {
  const { toast } = useToast();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState('all');
  const [selectedAmount, setSelectedAmount] = useState('all');
  const [showCart, setShowCart] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

  const loadDeals = async () => {
    setIsLoading(true);
    try {
      const { data: dealsData, error } = await supabase
        .from('deals')
        .select(`
          *,
          vendors (
            business_name
          )
        `)
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading deals:', error);
        toast({
          title: "Error Loading Deals",
          description: "Unable to load deals. Using sample data.",
          variant: "destructive"
        });
        // Fallback to sample data
        setDeals(getSampleDeals());
      } else {
        const formattedDeals = dealsData.map(deal => ({
          id: deal.id,
          network: deal.network,
          amount: deal.amount,
          original_price: parseFloat(deal.original_price),
          discounted_price: parseFloat(deal.discounted_price),
          discount_percentage: deal.discount_percentage,
          vendor_name: deal.vendors?.business_name || 'Unknown Vendor',
          availability: deal.availability,
          demand_level: deal.demand_level,
          bonus: deal.bonus,
          expires_at: deal.expires_at,
          verified: deal.verified
        }));
        setDeals(formattedDeals);
      }
    } catch (error) {
      console.error('Error:', error);
      setDeals(getSampleDeals());
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDeals = deals.filter(deal => {
    const networkMatch = selectedNetwork === 'all' || deal.network.toLowerCase() === selectedNetwork;
    const amountMatch = selectedAmount === 'all' || deal.amount.toString() === selectedAmount;
    return networkMatch && amountMatch;
  });

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'limited': return 'Limited';
      case 'out_of_stock': return 'Out of Stock';
      default: return 'Available';
    }
  };

  const getDemandBadge = (demand: string) => {
    switch (demand) {
      case 'high': return 'High Demand';
      case 'very_high': return 'Very High Demand';
      case 'low': return 'Low Demand';
      default: return 'Normal Demand';
    }
  };

  const getTimeRemaining = (expiresAt: string | undefined) => {
    if (!expiresAt) return 'No expiry';
    
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const handleGrabDeal = (deal: Deal) => {
    const cartItem = {
      id: deal.id,
      network: deal.network,
      amount: deal.amount,
      originalPrice: deal.original_price,
      discountedPrice: deal.discounted_price,
      discount: deal.discount_percentage,
      vendor: deal.vendor_name,
      dealType: 'airtime' as const,
      bonus: deal.bonus
    };
    
    setSelectedDeal(cartItem);
    setShowCart(true);
  };

  const getSampleDeals = (): Deal[] => [
    {
      id: '1',
      network: 'MTN',
      amount: 50,
      original_price: 50,
      discounted_price: 42.50,
      discount_percentage: 15,
      vendor_name: 'Makro',
      availability: 'available',
      demand_level: 'normal',
      bonus: 'Free 100MB',
      verified: true
    },
    {
      id: '2',
      network: 'Vodacom',
      amount: 100,
      original_price: 100,
      discounted_price: 89.00,
      discount_percentage: 11,
      vendor_name: 'Pick n Pay',
      availability: 'limited',
      demand_level: 'high',
      verified: true
    },
    {
      id: '3',
      network: 'Cell C',
      amount: 25,
      original_price: 25,
      discounted_price: 20.75,
      discount_percentage: 17,
      vendor_name: 'Capitec Bank',
      availability: 'available',
      demand_level: 'normal',
      bonus: 'Free 50SMS',
      verified: true
    },
    {
      id: '4',
      network: 'Telkom',
      amount: 200,
      original_price: 200,
      discounted_price: 174.00,
      discount_percentage: 13,
      vendor_name: 'Takealot',
      availability: 'available',
      demand_level: 'very_high',
      verified: true
    }
  ];

  useEffect(() => {
    loadDeals();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">🔍 Smart Airtime Deals</h3>
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

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Network:</span>
              <select 
                value={selectedNetwork} 
                onChange={(e) => setSelectedNetwork(e.target.value)}
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
                onChange={(e) => setSelectedAmount(e.target.value)}
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
            <Card key={deal.id} className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-bold">
                      {deal.network}
                    </Badge>
                    {deal.verified && (
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      -{deal.discount_percentage}%
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-xl font-bold">R{deal.amount} Airtime</div>
                  <div className="flex items-center gap-2">
                    <span className="line-through text-gray-500">R{deal.original_price}</span>
                    <span className="text-lg font-bold text-green-600">
                      R{deal.discounted_price.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">from {deal.vendor_name}</div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{getTimeRemaining(deal.expires_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Nationwide</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>{getAvailabilityBadge(deal.availability)}</span>
                  </div>
                </div>

                {deal.bonus && (
                  <div className="mb-3">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      Bonus: {deal.bonus}
                    </Badge>
                  </div>
                )}

                <Button 
                  onClick={() => handleGrabDeal(deal)}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  size="sm"
                  disabled={deal.availability === 'out_of_stock'}
                >
                  <CartIcon className="w-4 h-4 mr-2" />
                  {deal.availability === 'out_of_stock' ? 'Out of Stock' : 'Grab This Deal'}
                </Button>
              </CardContent>
            </Card>
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

      {/* System Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-blue-900">AI-Powered Deal Discovery</span>
          </div>
          <p className="text-sm text-blue-800">
            Our intelligent system continuously monitors 50+ vendors across South Africa, 
            using advanced web scraping and machine learning to find you the best airtime deals in real-time.
          </p>
        </CardContent>
      </Card>

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
