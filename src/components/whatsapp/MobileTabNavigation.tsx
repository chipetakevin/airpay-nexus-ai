
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, Phone, Wifi, ShoppingCart } from 'lucide-react';

interface MobileTabNavigationProps {
  activeTab: string;
  cartCount: number;
  onTabChange: (tab: string) => void;
}

const MobileTabNavigation: React.FC<MobileTabNavigationProps> = ({
  activeTab,
  cartCount,
  onTabChange
}) => {
  const tabs = [
    { id: 'featured', label: '⭐ Featured', icon: Star },
    { id: 'airtime', label: '📞 Airtime', icon: Phone },
    { id: 'data', label: '📊 Data', icon: Wifi },
    { id: 'cart', label: '🛒 Cart', icon: ShoppingCart }
  ];

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 p-4 text-sm font-semibold transition-all duration-300 relative ${
              activeTab === tab.id
                ? 'text-green-600 bg-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">{tab.label.split(' ')[0]}</span>
              <span className="text-xs">{tab.label.split(' ').slice(1).join(' ')}</span>
            </div>
            {tab.id === 'cart' && cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center p-0 animate-bounce">
                {cartCount}
              </Badge>
            )}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileTabNavigation;
