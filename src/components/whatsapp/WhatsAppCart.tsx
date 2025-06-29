
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, Plus, Minus, Trash2, 
  CreditCard, MessageCircle, ArrowLeft,
  CheckCircle, Loader2
} from 'lucide-react';
import { CartItem } from '@/hooks/useWhatsAppShopping';

interface WhatsAppCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, change: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onBackToShopping: () => void;
  isProcessing?: boolean;
}

const WhatsAppCart: React.FC<WhatsAppCartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onBackToShopping,
  isProcessing = false
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600 mb-4">Add some products to get started!</p>
        <Button 
          onClick={onBackToShopping} 
          className="bg-green-600 hover:bg-green-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Cart Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Cart ({itemCount})</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToShopping}
          disabled={isProcessing}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Continue Shopping
        </Button>
      </div>

      {/* Cart Items - Scrollable */}
      <div className="flex-1 space-y-2 overflow-y-auto max-h-60">
        {items.map((item) => (
          <Card key={item.id} className="border border-gray-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-gray-600">{item.network}</div>
                    {item.type && (
                      <Badge variant="outline" className="text-xs mt-1">
                        {item.type.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      disabled={isProcessing}
                      className="w-6 h-6 p-0 rounded-full hover:bg-red-100"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      disabled={isProcessing}
                      className="w-6 h-6 p-0 rounded-full hover:bg-green-100"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="text-right min-w-[60px]">
                    <div className="font-medium text-sm text-green-600">R{item.price * item.quantity}</div>
                    <div className="text-xs text-gray-500">R{item.price} each</div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    disabled={isProcessing}
                    className="w-6 h-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cart Summary - Fixed at bottom */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 mt-auto">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-green-600">R{total}</span>
            </div>
            
            <div className="text-xs text-center text-gray-600 bg-white p-2 rounded-lg border">
              ✅ Instant delivery • 🔒 Secure payment • 📱 WhatsApp receipt
            </div>
            
            <Button
              onClick={onCheckout}
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 h-12 text-base font-semibold"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Payment...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Checkout via WhatsApp
                  <CheckCircle className="w-4 h-4" />
                </div>
              )}
            </Button>
            
            {isProcessing && (
              <div className="text-xs text-center text-blue-600 bg-blue-50 p-2 rounded-lg">
                💳 Processing payment securely... Receipt will be sent to your registered WhatsApp number.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppCart;
