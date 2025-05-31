
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Deal, CartItem } from '@/types/deals';
import DealCard from './DealCard';

interface DealsGridProps {
  deals: Deal[];
  isLoading: boolean;
  onGrabDeal: (cartItem: CartItem) => void;
}

const DealsGrid = ({ deals, isLoading, onGrabDeal }: DealsGridProps) => {
  if (isLoading) {
    return (
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
    );
  }

  if (deals.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-gray-500">
            No deals found for the selected filters. Try adjusting your criteria.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {deals.map(deal => (
        <DealCard
          key={deal.id}
          deal={deal}
          onGrabDeal={onGrabDeal}
        />
      ))}
    </div>
  );
};

export default DealsGrid;
