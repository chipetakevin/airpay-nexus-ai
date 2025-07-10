
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, CreditCard, LogIn, LogOut, User } from 'lucide-react';
import { navigationItems } from './NavigationConfig';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import LoginModal from '../auth/LoginModal';
import { useToast } from '@/hooks/use-toast';

interface DesktopNavigationProps {
  isHomePage: boolean;
  handleQuickShopClick: () => void;
}

const DesktopNavigation = ({ isHomePage, handleQuickShopClick }: DesktopNavigationProps) => {
  const location = useLocation();
  const { isAuthenticated, currentUser } = useMobileAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { toast } = useToast();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('userCredentials');
    localStorage.removeItem('sessionStartTime');
    
    toast({
      title: "🔐 Logged Out Successfully",
      description: "Your profile information remains saved for quick re-login.",
      duration: 3000,
    });
    
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <>
      {/* Desktop Navigation - Enhanced Spacing & Appeal */}
      <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
        <div className={`flex items-center ${isHomePage ? 'space-x-12 lg:space-x-16 xl:space-x-20' : 'space-x-6 lg:space-x-8'}`}>
          {navigationItems
            .filter(item => {
              // Remove Home tab on desktop, keep essential items on homepage
              if (item.path === '/') return false;
              if (isHomePage) {
                return ['/portal?tab=deals', '/whatsapp-assistant'].includes(item.path);
              }
              return true;
            })
            .map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative px-6 lg:px-8 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 text-sm font-medium whitespace-nowrap hover:scale-105 transform ${
                  isActive(item.path)
                    ? 'bg-white text-[#75B8FA] shadow-xl shadow-white/30 border border-white/20'
                    : item.isHighlight
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl border border-white/10'
                      : 'text-white hover:bg-white/25 hover:text-white hover:shadow-xl hover:shadow-white/15 border border-transparent hover:border-white/20'
                }`}
              >
                <span className="text-xl group-hover:scale-125 transition-all duration-300">{item.icon}</span>
                <span className="hidden lg:inline text-base font-bold tracking-wide">{item.label}</span>
                <span className="lg:hidden text-base font-bold">{item.label.split(' ')[0]}</span>
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-[11px] px-3 py-1.5 font-black border-0 animate-pulse shadow-lg"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
        </div>
      </nav>
        
      {/* Buy Airtime & Data Tab - Compact Design */}
      {isHomePage && (
        <button
          onClick={handleQuickShopClick}
          className="hidden md:flex relative px-3 py-2.5 rounded-xl transition-all duration-300 items-center gap-2 text-sm font-medium bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg hover:scale-105"
        >
          <CreditCard className="w-5 h-5" />
          <span className="hidden lg:inline text-sm font-semibold">Buy Airtime</span>
          <Badge className="bg-white text-emerald-600 text-[10px] px-2 py-1 font-bold border-0">
            Quick
          </Badge>
        </button>
      )}

      {/* Authentication Status & WhatsApp Support - Compact */}
      <div className="hidden md:flex items-center space-x-3">
        {/* Login/Logout Status */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-1">
            <div className="flex items-center gap-1 bg-white/10 text-white px-2 py-1.5 rounded-lg">
              <User className="w-4 h-4" />
              <span className="text-xs font-medium hidden lg:inline">
                {currentUser?.firstName || 'User'}
              </span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="bg-red-500/10 text-white border-red-300/30 hover:bg-red-500 hover:text-white transition-all duration-200 font-medium px-2 py-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden xl:inline ml-1 text-xs">Logout</span>
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setShowLoginModal(true)}
            variant="outline"
            size="sm"
            className="bg-white/10 text-white border-white/30 hover:bg-white hover:text-[#75B8FA] transition-all duration-200 font-medium px-2 py-1.5"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden xl:inline ml-1 text-xs">Login</span>
          </Button>
        )}

        {/* WhatsApp Support - Icon Only */}
        <Button
          onClick={() => window.open('https://wa.me/27832466539', '_blank')}
          variant="outline"
          size="sm"
          className="bg-white/10 text-white border-white/30 hover:bg-white hover:text-[#75B8FA] transition-all duration-200 font-medium px-2 py-1.5 shadow-sm"
          title="WhatsApp Support"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden xl:inline ml-1 text-xs font-semibold">Support</span>
        </Button>
      </div>

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default DesktopNavigation;
