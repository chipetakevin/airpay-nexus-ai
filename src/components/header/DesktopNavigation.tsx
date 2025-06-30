
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, CreditCard } from 'lucide-react';
import { navigationItems } from './NavigationConfig';

interface DesktopNavigationProps {
  isHomePage: boolean;
  handleQuickShopClick: () => void;
}

const DesktopNavigation = ({ isHomePage, handleQuickShopClick }: DesktopNavigationProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              isActive(item.path)
                ? 'bg-white text-[#75B8FA] font-medium'
                : 'text-white hover:bg-white/20 hover:text-white font-medium'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge && (
              <Badge className="bg-[#75B8FA] text-white text-xs border-white">
                {item.badge}
              </Badge>
            )}
          </Link>
        ))}
        
        {/* Buy Airtime & Data Tab - Always show on home page */}
        {isHomePage && (
          <button
            onClick={handleQuickShopClick}
            className="relative px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium bg-white text-green-600 hover:bg-green-50 border-2 border-green-200"
          >
            <CreditCard className="w-4 h-4" />
            <span>Buy Airtime & Data</span>
            <Badge className="bg-green-600 text-white text-xs">
              Quick
            </Badge>
          </button>
        )}
      </nav>

      {/* WhatsApp Quick Access */}
      <div className="hidden md:flex items-center gap-3">
        <Button
          onClick={() => window.open('https://wa.me/27832466539', '_blank')}
          className="bg-white text-[#75B8FA] hover:bg-white/90 px-4 py-2 font-semibold"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp Support
        </Button>
      </div>
    </>
  );
};

export default DesktopNavigation;
