import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, Zap, Crown, TrendingUp, Award, 
  Smartphone, Wifi, Clock, Shield
} from 'lucide-react';
import { Deal } from '@/types/deals';

interface EnhancedDealsGridProps {
  deals: Deal[];
  onAddToCart: (deal: Deal) => void;
  isLoading?: boolean;
}

const EnhancedDealsGrid: React.FC<EnhancedDealsGridProps> = ({ 
  deals, 
  onAddToCart, 
  isLoading = false 
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<string>('all');

  // Enhanced deals with Devine Mobile priority
  const enhancedDeals = useMemo(() => {
    const devineMobileDeals = [
      {
        id: 'dm-001',
        vendor_id: 'devine-mobile',
        vendor_name: 'Devine Mobile',
        network: 'Devine Mobile',
        deal_type: 'airtime',
        amount: 50,
        original_price: 50,
        discounted_price: 40,
        discount_percentage: 20,
        bonus: '🔥 EXCLUSIVE: Extra 25% airtime + 100MB data',
        demand_level: 'high',
        availability: 'available',
        active: true,
        verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'dm-002',
        vendor_id: 'devine-mobile',
        vendor_name: 'Devine Mobile',
        network: 'Devine Mobile',
        deal_type: 'data',
        amount: 1000,
        original_price: 149,
        discounted_price: 99,
        discount_percentage: 34,
        bonus: '🎁 EXCLUSIVE: 2GB for 1GB price + WhatsApp free',
        demand_level: 'very_high',
        availability: 'available',
        active: true,
        verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'dm-003',
        vendor_id: 'devine-mobile',
        vendor_name: 'Devine Mobile',
        network: 'Devine Mobile',
        deal_type: 'data',
        amount: 5000,
        original_price: 599,
        discounted_price: 399,
        discount_percentage: 33,
        bonus: '💎 VIP DEAL: 5GB + 2GB bonus + unlimited WhatsApp',
        demand_level: 'very_high',
        availability: 'available',
        active: true,
        verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    // Combine Devine Mobile deals (priority) with regular deals
    const allDeals = [...devineMobileDeals, ...deals];
    
    // Sort by priority: Devine Mobile first, then by discount percentage
    return allDeals.sort((a, b) => {
      if (a.network === 'Devine Mobile' && b.network !== 'Devine Mobile') return -1;
      if (a.network !== 'Devine Mobile' && b.network === 'Devine Mobile') return 1;
      return (b.discount_percentage || 0) - (a.discount_percentage || 0);
    });
  }, [deals]);

  const filteredDeals = useMemo(() => {
    if (selectedNetwork === 'all') return enhancedDeals;
    return enhancedDeals.filter(deal => deal.network === selectedNetwork);
  }, [enhancedDeals, selectedNetwork]);

  const networks = useMemo(() => {
    const networkSet = new Set(enhancedDeals.map(deal => deal.network));
    return ['all', ...Array.from(networkSet)];
  }, [enhancedDeals]);

  const getDealIcon = (dealType: string) => {
    switch (dealType) {
      case 'airtime': return <Smartphone className="w-4 h-4" />;
      case 'data': return <Wifi className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getDemandColor = (demandLevel: string) => {
    switch (demandLevel) {
      case 'very_high': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const isDevineExclusive = (network: string) => network === 'Devine Mobile';

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Network Filter */}
      <div className="flex flex-wrap gap-2">
        {networks.map((network) => (
          <button
            key={network}
            onClick={() => setSelectedNetwork(network)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedNetwork === network
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {network === 'all' ? 'All Networks' : network}
            {network === 'Devine Mobile' && (
              <Crown className="w-3 h-3 ml-1 inline" />
            )}
          </button>
        ))}
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.map((deal, index) => (
          <Card 
            key={deal.id} 
            className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${
              isDevineExclusive(deal.network) 
                ? 'ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' 
                : 'hover:shadow-lg'
            }`}
          >
            {/* Exclusive Badge */}
            {isDevineExclusive(deal.network) && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-1 z-10">
                <div className="flex items-center justify-center gap-1 text-xs font-bold">
                  <Crown className="w-3 h-3" />
                  DEVINE EXCLUSIVE
                  <Crown className="w-3 h-3" />
                </div>
              </div>
            )}

            {/* Top Badges */}
            <div className={`absolute top-3 right-3 z-10 space-y-1 ${isDevineExclusive(deal.network) ? 'top-8' : ''}`}>
              {deal.demand_level === 'very_high' && (
                <Badge className="bg-red-500 text-white animate-pulse">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  HOT
                </Badge>
              )}
              {deal.discount_percentage && deal.discount_percentage >= 30 && (
                <Badge className="bg-green-500 text-white">
                  <Award className="w-3 h-3 mr-1" />
                  BEST VALUE
                </Badge>
              )}
            </div>

            <CardContent className={`p-6 ${isDevineExclusive(deal.network) ? 'pt-8' : ''}`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${
                    isDevineExclusive(deal.network) 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {getDealIcon(deal.deal_type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{deal.network}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      {getDealIcon(deal.deal_type)}
                      <span className="capitalize">{deal.deal_type}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`w-3 h-3 rounded-full ${getDemandColor(deal.demand_level)} animate-pulse`}></div>
              </div>

              {/* Amount & Type */}
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-gray-900">
                  {deal.deal_type === 'data' ? `${deal.amount}MB` : `R${deal.amount}`}
                </div>
                {deal.deal_type === 'data' && deal.amount >= 1000 && (
                  <div className="text-sm text-gray-600">
                    ({(deal.amount / 1000).toFixed(1)}GB)
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg line-through text-gray-400">R{deal.original_price}</span>
                  <span className={`text-2xl font-bold ${
                    isDevineExclusive(deal.network) ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    R{deal.discounted_price}
                  </span>
                </div>
                <div className={`text-sm font-medium ${
                  isDevineExclusive(deal.network) ? 'text-orange-600' : 'text-green-600'
                }`}>
                  Save {deal.discount_percentage}%
                </div>
              </div>

              {/* Bonus */}
              {deal.bonus && (
                <div className={`p-3 rounded-lg mb-4 text-sm ${
                  isDevineExclusive(deal.network)
                    ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border border-orange-200'
                    : 'bg-blue-50 text-blue-800 border border-blue-200'
                }`}>
                  {deal.bonus}
                </div>
              )}

              {/* Expires */}
              {deal.expires_at && (
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                  <Clock className="w-3 h-3" />
                  <span>Expires: {new Date(deal.expires_at).toLocaleDateString()}</span>
                </div>
              )}

              {/* Action Button */}
              <Button 
                onClick={() => onAddToCart(deal)}
                className={`w-full ${
                  isDevineExclusive(deal.network)
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                <Star className="w-4 h-4 mr-2" />
                {isDevineExclusive(deal.network) ? 'Get Exclusive Deal' : 'Add to Cart'}
              </Button>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Verified</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span>Instant</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDeals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-2">No deals available</div>
          <div className="text-sm text-gray-400">Try selecting a different network</div>
        </div>
      )}
    </div>
  );
};

export default EnhancedDealsGrid;
