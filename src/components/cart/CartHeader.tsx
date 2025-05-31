
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart as CartIcon, ArrowLeft } from 'lucide-react';

interface CartHeaderProps {
  onClose: () => void;
}

const CartHeader = ({ onClose }: CartHeaderProps) => {
  return (
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CartIcon className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-lg">Smart Shopping Cart</CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>
    </CardHeader>
  );
};

export default CartHeader;
