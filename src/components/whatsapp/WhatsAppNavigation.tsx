
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
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

  const handleExitToHome = () => {
    // Seamless navigation to landing homepage
    if (location.pathname === '/') {
      // Already on home page, scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to homepage
      window.location.href = '/';
    }
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
      
      {/* Exit to Home Button positioned below navigation tabs */}
      <div className="px-2 pb-2">
        <Button
          onClick={handleExitToHome}
          variant="outline"
          size="sm"
          className="w-full h-8 rounded-full bg-white/90 backdrop-blur-sm border-gray-300 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
          title="Exit to Home"
        >
          <X className="w-4 h-4 text-gray-600 mr-2" />
          <span className="text-xs text-gray-600">Exit to Home</span>
        </Button>
      </div>
    </div>
  );
};

export default WhatsAppNavigation;
