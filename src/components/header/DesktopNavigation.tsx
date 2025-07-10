
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
      {/* Desktop Navigation - Consistent Spacing & Sizing */}
      <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
        <div className="flex items-center space-x-8 lg:space-x-10 xl:space-x-12">
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
                className={`group relative px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium whitespace-nowrap hover:scale-105 transform min-w-[140px] lg:min-w-[160px] ${
                  isActive(item.path)
                    ? 'bg-white text-[#75B8FA] shadow-xl shadow-white/30 border border-white/20'
                    : item.isHighlight
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl border border-white/10'
                      : 'text-white hover:bg-white/25 hover:text-white hover:shadow-xl hover:shadow-white/15 border border-transparent hover:border-white/20'
                }`}
              >
                <span className="text-lg group-hover:scale-110 transition-all duration-300">{item.icon}</span>
                <span className="text-sm lg:text-base font-semibold">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-[10px] px-2 py-1 font-bold border-0 animate-pulse shadow-lg"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
        </div>
      </nav>
        
      {/* Buy Airtime & Data Tab - Enhanced Spacing */}
      {isHomePage && (
        <button
          onClick={handleQuickShopClick}
          className="hidden md:flex relative px-6 py-3 rounded-xl transition-all duration-300 items-center gap-2 font-medium bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-xl hover:scale-105 min-w-[140px] justify-center"
        >
          <CreditCard className="w-5 h-5" />
          <span className="text-sm lg:text-base font-semibold">Buy Airtime</span>
          <Badge className="bg-white text-emerald-600 text-[10px] px-2 py-1 font-bold border-0 shadow-lg">
            Quick
          </Badge>
        </button>
      )}

      {/* Authentication Status & WhatsApp Support - Enhanced Spacing */}
      <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
        {/* Login/Logout Status - Enhanced Spacing */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2 bg-white/15 text-white px-4 py-3 rounded-xl border border-white/20 min-w-[100px] justify-center">
              <User className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {currentUser?.firstName || 'User'}
              </span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-red-500/15 text-white border-red-300/30 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold px-4 py-3 rounded-xl hover:scale-105 min-w-[100px]"
            >
              <LogOut className="w-4 h-4" />
              <span className="ml-2 text-sm">Logout</span>
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setShowLoginModal(true)}
            variant="outline"
            className="bg-white/15 text-white border-white/30 hover:bg-white hover:text-[#75B8FA] transition-all duration-300 font-semibold px-6 py-3 rounded-xl hover:scale-105 min-w-[100px] justify-center"
          >
            <LogIn className="w-4 h-4" />
            <span className="ml-2 text-sm">Login</span>
          </Button>
        )}

        {/* WhatsApp Support - Enhanced Spacing */}
        <Button
          onClick={() => window.open('https://wa.me/27832466539', '_blank')}
          variant="outline"
          className="bg-white/15 text-white border-white/30 hover:bg-white hover:text-[#75B8FA] transition-all duration-300 font-semibold px-6 py-3 rounded-xl hover:scale-105 min-w-[120px] justify-center shadow-lg"
          title="WhatsApp Support"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="ml-2 text-sm">Support</span>
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
