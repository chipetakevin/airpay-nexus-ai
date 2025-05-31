
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart as CartIcon, X } from 'lucide-react';

interface CartHeaderProps {
  onClose: () => void;
}

const CartHeader = ({ onClose }: CartHeaderProps) => {
  return (
    <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-green-50 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <CartIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-gray-800">Smart Cart</CardTitle>
            <div className="text-xs text-gray-600">Quick & Secure Checkout</div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="h-8 w-8 p-0 hover:bg-gray-200 rounded-full"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </CardHeader>
  );
};

export default CartHeader;
