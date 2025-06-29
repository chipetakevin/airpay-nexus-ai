
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, UserPlus, CreditCard, ArrowRight } from 'lucide-react';

interface TabSwitcherProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isAuthenticated?: boolean;
  userName?: string;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ 
  currentTab, 
  onTabChange, 
  isAuthenticated = false,
  userName 
}) => {
  if (currentTab === 'registration') {
    return (
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-lg border border-orange-200 mb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">
              Ready to Shop?
            </span>
          </div>
          <Button
            onClick={() => onTabChange('deals')}
            variant="outline"
            size="sm"
            className="bg-white hover:bg-orange-50 border-orange-300 text-orange-700 font-medium"
          >
            <CreditCard className="w-4 h-4 mr-1" />
            Smart Deals
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-orange-600">
          Browse exclusive deals and start shopping immediately
        </div>
      </div>
    );
  }

  if (currentTab === 'deals') {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200 mb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              {isAuthenticated ? `Welcome ${userName}!` : 'New Customer?'}
            </span>
          </div>
          <Button
            onClick={() => onTabChange('registration')}
            variant="outline"
            size="sm"
            className="bg-white hover:bg-green-50 border-green-300 text-green-700 font-medium"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            {isAuthenticated ? 'Account' : 'Register'}
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
        <div className="mt-2 flex items-center gap-2">
          {isAuthenticated ? (
            <Badge className="bg-green-600 text-white text-xs">
              ✓ Authenticated
            </Badge>
          ) : (
            <span className="text-xs text-green-600">
              Register for exclusive deals and faster checkout
            </span>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default TabSwitcher;
