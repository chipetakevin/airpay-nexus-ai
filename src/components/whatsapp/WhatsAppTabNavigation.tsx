
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, MessageCircle, ShoppingCart } from 'lucide-react';

interface WhatsAppTabNavigationProps {
  activeTab: string;
  cartCount: number;
  onTabChange: (tab: string) => void;
}

const WhatsAppTabNavigation: React.FC<WhatsAppTabNavigationProps> = ({ 
  activeTab, 
  cartCount,
  onTabChange 
}) => {
  const tabs = [
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'cart', label: 'Cart', icon: ShoppingCart }
  ];

  return (
    <div className="flex bg-gray-50 p-1 mx-4 rounded-xl mb-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className={`flex-1 relative ${
              activeTab === tab.id 
                ? 'bg-black text-white hover:bg-gray-800' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {tab.label}
            {tab.id === 'cart' && cartCount > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0"
              >
                {cartCount}
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default WhatsAppTabNavigation;
