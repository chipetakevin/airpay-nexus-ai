
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, CreditCard, ArrowRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'airtime' | 'data' | 'bundle' | 'gift';
  icon: string;
  description: string;
  features: string[];
  network?: string;
  validity?: string;
  popular?: boolean;
  discount?: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface MobileCartProps {
  cart: CartItem[];
  cartTotal: number;
  onQuantityUpdate: (productId: number, change: number) => void;
  onCheckout: () => void;
  onBrowseServices: () => void;
}

const MobileCart: React.FC<MobileCartProps> = ({
  cart,
  cartTotal,
  onQuantityUpdate,
  onCheckout,
  onBrowseServices
}) => {
  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-500 mb-6">Add some mobile services to get started!</p>
        <Button 
          onClick={onBrowseServices}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          Browse Services
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Your Order</h3>
      
      {/* Cart Items */}
      <div className="space-y-3">
        {cart.map((item) => (
          <Card key={item.id} className="p-4 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">{item.network || item.category}</Badge>
                    <span className="font-semibold text-sm">{item.name}</span>
                  </div>
                  <div className="text-xs text-gray-600">R{item.price} each</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onQuantityUpdate(item.id, -1)}
                    className="w-8 h-8 p-0 rounded-full hover:bg-red-100"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-bold min-w-[2rem] text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onQuantityUpdate(item.id, 1)}
                    className="w-8 h-8 p-0 rounded-full hover:bg-green-100"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="font-bold text-green-600 min-w-[4rem] text-right">
                  R{item.price * item.quantity}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Order Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold">Total:</span>
            <span className="text-2xl font-bold text-green-600">R{cartTotal}</span>
          </div>
          
          <div className="border-t border-green-200 pt-3">
            <Button 
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-14 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <CreditCard className="w-6 h-6 mr-3" />
              <span>Secure Checkout</span>
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-2">
              ✅ Instant delivery • 🔒 Secure payment • 📱 Mobile optimized
            </p>
            <p className="text-xs text-green-600 font-semibold">
              Complete your purchase safely and securely
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MobileCart;
