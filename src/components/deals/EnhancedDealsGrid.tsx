import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, Wifi, Zap, Star, TrendingUp, 
  ShoppingCart, Gift, Clock, CheckCircle 
} from 'lucide-react';
import USSDPaymentProcessor from '../ussd/USSDPaymentProcessor';

interface Deal {
  id: string;
  network: string;
  amount: number;
  price: number;
  original_price: number;
  deal_type: 'airtime' | 'data';
  discount_percentage: number;
  validity?: string;
  features: string[];
  popular?: boolean;
  limited_time?: boolean;
}

interface EnhancedDealsGridProps {
  deals: Deal[];
  onDealSelect: (deal: Deal) => void;
}

const EnhancedDealsGrid = ({ deals, onDealSelect }: EnhancedDealsGridProps) => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showUSSDPayment, setShowUSSDPayment] = useState(false);
  const [recipientPhone, setRecipientPhone] = useState('');

  const handleQuickBuy = (deal: Deal) => {
    setSelectedDeal(deal);
    setRecipientPhone('+27123456789'); // Default or from user input
    setShowUSSDPayment(true);
  };

  const handlePaymentComplete = (success: boolean, sessionId: string) => {
    setShowUSSDPayment(false);
    setSelectedDeal(null);
    if (success) {
      // Trigger receipt generation and WhatsApp/Email sending
      generateReceipts(sessionId);
    }
  };

  const generateReceipts = async (sessionId: string) => {
    // This would typically call your receipt generation service
    console.log('Generating receipts for session:', sessionId);
  };

  if (showUSSDPayment && selectedDeal) {
    // Transform deal to match USSDPaymentProcessor expected format
    const ussdDeal = {
      id: selectedDeal.id,
      network: selectedDeal.network,
      amount: selectedDeal.amount,
      price: selectedDeal.price,
      type: selectedDeal.deal_type // Map deal_type to type
    };

    return (
      <div className="space-y-4">
        <Button 
          onClick={() => setShowUSSDPayment(false)}
          variant="outline"
          className="mb-4"
        >
          ← Back to Deals
        </Button>
        <USSDPaymentProcessor 
          deal={ussdDeal}
          recipientPhone={recipientPhone}
          onPaymentComplete={handlePaymentComplete}
        />
      </div>
    );
  }

  const getNetworkIcon = (network: string) => {
    const icons = {
      'mtn': '🟡',
      'vodacom': '🔴',
      'divinely mobile': '💎',
      'telkom': '🟣'
    };
    return icons[network.toLowerCase() as keyof typeof icons] || '📱';
  };

  const sortedDeals = [...deals].sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return b.discount_percentage - a.discount_percentage;
  });

  return (
    <div className="space-y-6">
      {/* Featured Deals Banner */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white overflow-hidden relative">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-300" />
                Featured Deals
              </h2>
              <p className="text-blue-100 mb-4">Best value airtime & data packages</p>
              <Badge className="bg-yellow-500 text-yellow-900 font-bold">
                <Zap className="w-3 h-3 mr-1" />
                USSD Payment Available
              </Badge>
            </div>
            <div className="text-6xl opacity-20">
              📱
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedDeals.map((deal) => (
          <Card 
            key={deal.id} 
            className={`hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 relative overflow-hidden ${
              deal.popular ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {/* Popular Badge */}
            {deal.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 text-xs font-bold clip-path-badge">
                <Star className="w-3 h-3 inline mr-1" />
                POPULAR
              </div>
            )}

            {/* Limited Time Badge */}
            {deal.limited_time && (
              <div className="absolute top-0 left-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 text-xs font-bold">
                <Clock className="w-3 h-3 inline mr-1" />
                LIMITED
              </div>
            )}

            <CardContent className="p-6">
              {/* Network Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getNetworkIcon(deal.network)}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 capitalize">{deal.network}</h3>
                    <Badge variant="outline" className="text-xs">
                      {deal.deal_type === 'airtime' ? <Smartphone className="w-3 h-3 mr-1" /> : <Wifi className="w-3 h-3 mr-1" />}
                      {deal.deal_type}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">R{deal.amount}</div>
                  {deal.validity && (
                    <div className="text-xs text-gray-500">{deal.validity}</div>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">R{deal.price}</span>
                  {deal.original_price > deal.price && (
                    <span className="text-sm text-gray-400 line-through">R{deal.original_price}</span>
                  )}
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    {deal.discount_percentage}% OFF
                  </Badge>
                </div>
                <div className="text-xs text-gray-600">
                  You save R{deal.original_price - deal.price}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-4">
                {deal.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button 
                  onClick={() => handleQuickBuy(deal)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-11 font-semibold"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Quick USSD Buy
                </Button>
                
                <Button 
                  onClick={() => onDealSelect(deal)}
                  variant="outline"
                  className="w-full border-2 hover:bg-blue-50 h-11"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>

              {/* USSD Code Preview */}
              <div className="mt-3 p-2 bg-gray-50 rounded text-center">
                <div className="text-xs text-gray-500 mb-1">Quick USSD Code:</div>
                <div className="text-sm font-mono font-bold text-blue-600">
                  {deal.network.toLowerCase() === 'mtn' ? '*141#' : 
                   deal.network.toLowerCase() === 'vodacom' ? '*136#' :
                   deal.network.toLowerCase() === 'divinely mobile' ? '*180*2827#' : '*180#'}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile Optimization Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Smartphone className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-800">Mobile Optimized Experience</span>
          </div>
          <p className="text-sm text-blue-700">
            All purchases include instant WhatsApp & Email receipts for better customer service
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDealsGrid;
