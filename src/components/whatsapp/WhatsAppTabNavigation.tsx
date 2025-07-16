
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
    <div className="mobile-tab-container">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <div key={tab.id} className="mobile-tab-item">
            <button
              onClick={() => onTabChange(tab.id)}
              className={`mobile-tab-trigger ${
                activeTab === tab.id ? 'active' : 'inactive'
              }`}
              aria-label={`Switch to ${tab.label} tab`}
            >
              <Icon className="w-5 h-5" />
              <span className="mobile-text-sm font-medium">{tab.label}</span>
              {tab.id === 'cart' && cartCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs h-5 w-5 rounded-full flex items-center justify-center p-0 border-2 border-background"
                  aria-label={`${cartCount} items in cart`}
                >
                  {cartCount}
                </Badge>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default WhatsAppTabNavigation;
