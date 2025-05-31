
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  MapPin, 
  Zap,
  ShoppingCart as CartIcon
} from 'lucide-react';
import { Deal, CartItem } from '@/types/deals';

interface DealCardProps {
  deal: Deal;
  onGrabDeal: (cartItem: CartItem) => void;
}

const DealCard = ({ deal, onGrabDeal }: DealCardProps) => {
  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'limited': return 'Limited';
      case 'out_of_stock': return 'Out of Stock';
      default: return 'Available';
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

  const handleGrabDeal = () => {
    const cartItem: CartItem = {
      id: deal.id,
      network: deal.network,
      amount: deal.amount,
      originalPrice: deal.original_price,
      discountedPrice: deal.discounted_price,
      discount: deal.discount_percentage,
      vendor: deal.vendor_name,
      dealType: 'airtime',
      bonus: deal.bonus,
      networkPrice: deal.network_price,
      markupAmount: deal.markup_amount
    };
    
    onGrabDeal(cartItem);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
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
            <Badge className="bg-blue-100 text-blue-800">
              Platform Price
            </Badge>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-xl font-bold">R{deal.amount} Airtime</div>
          <div className="flex items-center gap-2">
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
          onClick={handleGrabDeal}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          size="sm"
          disabled={deal.availability === 'out_of_stock'}
        >
          <CartIcon className="w-4 h-4 mr-2" />
          {deal.availability === 'out_of_stock' ? 'Out of Stock' : 'Get This Deal'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DealCard;
