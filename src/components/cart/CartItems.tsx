
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CartItem } from '@/types/deals';

interface CartItemsProps {
  cartItems: CartItem[];
  onClearCart: () => void;
}

const CartItems = ({ cartItems, onClearCart }: CartItemsProps) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Cart Items</h3>
      {cartItems.map((item) => (
        <Card key={item.id} className="p-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline">{item.network}</Badge>
                <span className="text-sm font-medium">R{item.amount} {item.dealType}</span>
              </div>
              <div className="text-xs text-gray-600">
                from {item.vendor}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-green-600">R{item.discountedPrice.toFixed(2)}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClearCart}>
              ×
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CartItems;
