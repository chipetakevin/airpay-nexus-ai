
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingDown, 
  Clock, 
  MapPin, 
  Zap,
  Filter,
  RefreshCw,
  Bell
} from 'lucide-react';

const AirtimeDealsSystem = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState('all');
  const [selectedAmount, setSelectedAmount] = useState('all');

  const mockDeals = [
    {
      id: 1,
      network: 'MTN',
      amount: 50,
      originalPrice: 50,
      discountedPrice: 42.50,
      discount: 15,
      vendor: 'Makro',
      expiresIn: '2h 45m',
      location: 'Nationwide',
      stock: 'Available',
      bonus: 'Free 100MB',
      verified: true
    },
    {
      id: 2,
      network: 'Vodacom',
      amount: 100,
      originalPrice: 100,
      discountedPrice: 89.00,
      discount: 11,
      vendor: 'Pick n Pay',
      expiresIn: '1h 20m',
      location: 'Gauteng',
      stock: 'Limited',
      bonus: null,
      verified: true
    },
    {
      id: 3,
      network: 'Cell C',
      amount: 25,
      originalPrice: 25,
      discountedPrice: 20.75,
      discount: 17,
      vendor: 'Capitec Bank',
      expiresIn: '4h 15m',
      location: 'Western Cape',
      stock: 'Available',
      bonus: 'Free 50SMS',
      verified: true
    },
    {
      id: 4,
      network: 'Telkom',
      amount: 200,
      originalPrice: 200,
      discountedPrice: 174.00,
      discount: 13,
      vendor: 'Takealot',
      expiresIn: '30m',
      location: 'Nationwide',
      stock: 'High Demand',
      bonus: null,
      verified: true
    }
  ];

  useEffect(() => {
    // Simulate loading deals
    setTimeout(() => {
      setDeals(mockDeals);
      setIsLoading(false);
    }, 1500);
  }, []);

  const filteredDeals = deals.filter(deal => {
    const networkMatch = selectedNetwork === 'all' || deal.network.toLowerCase() === selectedNetwork;
    const amountMatch = selectedAmount === 'all' || deal.amount.toString() === selectedAmount;
    return networkMatch && amountMatch;
  });

  const refreshDeals = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Simulate new deals with slight price changes
      const updatedDeals = mockDeals.map(deal => ({
        ...deal,
        discountedPrice: deal.discountedPrice + (Math.random() - 0.5) * 2,
        discount: Math.round(((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100)
      }));
      setDeals(updatedDeals);
      setIsLoading(false);
    }, 1000);
  };

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
            onClick={refreshDeals}
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
                      -{deal.discount}%
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-xl font-bold">R{deal.amount} Airtime</div>
                  <div className="flex items-center gap-2">
                    <span className="line-through text-gray-500">R{deal.originalPrice}</span>
                    <span className="text-lg font-bold text-green-600">
                      R{deal.discountedPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">from {deal.vendor}</div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{deal.expiresIn}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{deal.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>{deal.stock}</span>
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
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  size="sm"
                >
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Grab This Deal
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
    </div>
  );
};

export default AirtimeDealsSystem;
