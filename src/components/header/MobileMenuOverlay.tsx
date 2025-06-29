
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
        <nav className="p-6 space-y-3">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 text-lg ${
                isActive(item.path)
                  ? 'bg-[#75B8FA] text-white font-semibold shadow-lg'
                  : 'text-[#75B8FA] hover:bg-[#75B8FA]/10 font-medium border border-[#75B8FA]/20'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && (
                <Badge className="bg-[#75B8FA] text-white text-xs ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
          
          {/* Mobile Buy Airtime & Data Tab - Always show on home page */}
          {isHomePage && (
            <button
              onClick={() => {
                handleQuickShopClick();
                closeMenu();
              }}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 text-lg text-green-600 hover:bg-green-50 font-medium border-2 border-green-200 bg-green-50/50"
            >
              <CreditCard className="w-5 h-5" />
              <span>Buy Airtime & Data</span>
              <Badge className="bg-green-600 text-white text-xs ml-auto">
                Quick
              </Badge>
            </button>
          )}
          
          <div className="pt-4 border-t border-gray-200 mt-6">
            <Button
              onClick={() => {
                window.open('https://wa.me/27832466539', '_blank');
                closeMenu();
              }}
              className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white font-semibold text-lg py-4 h-auto"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              WhatsApp Support
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileMenuOverlay;
