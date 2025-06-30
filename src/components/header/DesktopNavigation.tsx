
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
      {/* Enhanced Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-2">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium group ${
              isActive(item.path)
                ? 'bg-white text-[#75B8FA] shadow-lg border border-white/20'
                : 'text-white hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-md'
            }`}
          >
            <div className={`transition-transform duration-200 ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-105'}`}>
              {item.icon}
            </div>
            <span className="text-sm tracking-wide">{item.label}</span>
            {item.badge && (
              <Badge className={`text-xs font-semibold border transition-all duration-200 ${
                isActive(item.path) 
                  ? 'bg-[#75B8FA] text-white border-[#75B8FA]' 
                  : 'bg-white/90 text-[#75B8FA] border-white/50 group-hover:bg-white group-hover:shadow-sm'
              }`}>
                {item.badge}
              </Badge>
            )}
            
            {/* Active indicator */}
            {isActive(item.path) && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
            )}
          </Link>
        ))}
        
        {/* Enhanced Buy Airtime & Data Tab - Only show on home page */}
        {isHomePage && (
          <button
            onClick={handleQuickShopClick}
            className="relative px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl border border-green-400/30 group"
          >
            <CreditCard className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            <span className="text-sm tracking-wide">Buy Airtime & Data</span>
            <Badge className="bg-white/90 text-green-600 text-xs font-semibold border border-white/50 group-hover:bg-white group-hover:shadow-sm">
              Quick
            </Badge>
            
            {/* Pulse effect for attention */}
            <div className="absolute inset-0 rounded-xl bg-green-400/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        )}
      </nav>

      {/* Enhanced WhatsApp Quick Access */}
      <div className="hidden md:flex items-center gap-3">
        <Button
          onClick={() => window.open('https://wa.me/27832466539', '_blank')}
          className="bg-white text-[#75B8FA] hover:bg-white/95 px-4 py-2.5 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group"
        >
          <MessageCircle className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110" />
          <span className="text-sm tracking-wide">WhatsApp Support</span>
        </Button>
      </div>
    </>
  );
};

export default DesktopNavigation;
