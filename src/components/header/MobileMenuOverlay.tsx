
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, CreditCard } from 'lucide-react';
import { navigationItems } from './NavigationConfig';

interface MobileMenuOverlayProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  isHomePage: boolean;
  handleQuickShopClick: () => void;
}

const MobileMenuOverlay = ({ isMenuOpen, closeMenu, isHomePage, handleQuickShopClick }: MobileMenuOverlayProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  if (!isMenuOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="md:hidden fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm"
        onClick={closeMenu}
      />
      
      {/* Mobile Menu */}
      <div 
        data-mobile-menu="content"
        className="md:hidden fixed left-0 right-0 top-16 bg-white shadow-2xl border-t-2 border-[#75B8FA]/20 z-[95] max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200"
      >
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 text-lg font-medium ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-[1.02]'
                  : 'text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-100'
              }`}
            >
              <div className="flex items-center justify-center w-8 h-8">
                {item.icon}
              </div>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge className={`text-xs px-3 py-1 ${
                  isActive(item.path) 
                    ? 'bg-white/20 text-white border-white/30' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
          
          {/* Buy Airtime & Data - Special styling to match green theme */}
          <button
            onClick={() => {
              handleQuickShopClick();
              closeMenu();
            }}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 text-lg font-medium text-green-700 hover:bg-green-50 border-2 border-green-200 bg-green-50/70 shadow-sm"
          >
            <div className="flex items-center justify-center w-8 h-8">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="flex-1">Buy Airtime & Data</span>
            <Badge className="bg-green-600 text-white text-xs px-3 py-1">
              Quick
            </Badge>
          </button>
          
          {/* WhatsApp Support - Full width green button */}
          <div className="pt-4 mt-4 border-t border-gray-100">
            <Button
              onClick={() => {
                window.open('https://wa.me/27832466539', '_blank');
                closeMenu();
              }}
              className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#25D366]/90 hover:to-[#128C7E]/90 text-white font-semibold text-lg py-6 h-auto rounded-2xl shadow-lg transform hover:scale-[1.02] transition-all duration-200"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              WhatsApp Support
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileMenuOverlay;
