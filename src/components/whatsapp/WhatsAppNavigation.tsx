
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();

  const handleExitToAIDeals = () => {
    // Seamless exit to AI-Powered Deals using correct design
    window.location.href = '/ai-powered-deals';
  };

  return (
    <div className="bg-gray-50 sticky top-0 z-10">
      <div className="p-1">
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
      
      {/* Seamless exit using correct design */}
      <div className="px-2 pb-2">
        <Button
          onClick={handleExitToAIDeals}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
          title="Get Started"
        >
          <span className="text-sm text-white font-bold">Get Started</span>
          <ArrowRight className="w-4 h-4 text-white ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default WhatsAppNavigation;
