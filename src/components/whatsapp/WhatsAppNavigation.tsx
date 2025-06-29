
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WhatsAppNavigationProps {
  activeView: 'chat' | 'shop' | 'cart';
  cartCount: number;
  onViewChange: (view: 'chat' | 'shop' | 'cart') => void;
}

const WhatsAppNavigation: React.FC<WhatsAppNavigationProps> = ({
  activeView,
  cartCount,
  onViewChange
}) => {
  return (
    <div className="bg-gray-50 p-1 sticky top-0 z-10">
      <div className="flex gap-1">
        <Button
          variant={activeView === 'shop' ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewChange('shop')}
          className="flex-1 h-6 text-xs"
        >
          Shop
        </Button>
        <Button
          variant={activeView === 'chat' ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewChange('chat')}
          className="flex-1 h-6 text-xs"
        >
          Chat
        </Button>
        <Button
          variant={activeView === 'cart' ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewChange('cart')}
          className="flex-1 h-6 text-xs relative"
        >
          Cart
          {cartCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white w-3 h-3 rounded-full text-xs flex items-center justify-center p-0 text-[10px]">
              {cartCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
};

export default WhatsAppNavigation;
