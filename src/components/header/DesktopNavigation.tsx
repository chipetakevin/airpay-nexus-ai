
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
      {/* Desktop Navigation - Fully Responsive */}
      <div className="hidden md:flex items-center justify-between w-full px-4 lg:px-8">
        
        {/* Main Navigation */}
        <nav className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8 2xl:space-x-12">
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
                className={`group relative px-3 md:px-4 lg:px-6 py-2 md:py-3 rounded-lg md:rounded-xl transition-all duration-300 flex items-center justify-center gap-1 md:gap-2 font-medium whitespace-nowrap hover:scale-105 transform min-w-[80px] md:min-w-[120px] lg:min-w-[140px] xl:min-w-[160px] ${
                  isActive(item.path)
                    ? 'bg-white text-[#75B8FA] shadow-xl shadow-white/30 border border-white/20'
                    : item.isHighlight
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl border border-white/10'
                      : 'text-white hover:bg-white/25 hover:text-white hover:shadow-xl hover:shadow-white/15 border border-transparent hover:border-white/20'
                }`}
              >
                <span className="text-base md:text-lg group-hover:scale-110 transition-all duration-300">{item.icon}</span>
                <span className="hidden md:inline text-xs lg:text-sm xl:text-base font-semibold">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 md:py-1 font-bold border-0 animate-pulse shadow-lg"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
        </nav>

        {/* Right Side Actions - Responsive */}
        <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6 xl:space-x-8 2xl:space-x-12">
          
          {/* Buy Airtime & Data Tab - Responsive */}
          {isHomePage && (
            <button
              onClick={handleQuickShopClick}
              className="relative px-3 md:px-4 lg:px-6 py-2 md:py-3 rounded-lg md:rounded-xl transition-all duration-300 flex items-center gap-1 md:gap-2 font-medium bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-xl hover:scale-105 min-w-[80px] md:min-w-[120px] lg:min-w-[140px] xl:min-w-[160px] justify-center"
            >
              <CreditCard className="w-4 md:w-5 h-4 md:h-5" />
              <span className="hidden md:inline text-xs lg:text-sm xl:text-base font-semibold">Buy Airtime</span>
              <span className="md:hidden text-xs font-semibold">Buy</span>
              <Badge className="bg-white text-emerald-600 text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 md:py-1 font-bold border-0 shadow-lg">
                Quick
              </Badge>
            </button>
          )}

          {/* Login/Logout Status - Responsive */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
              <div className="flex items-center gap-1 md:gap-2 bg-white/15 text-white px-2 md:px-4 lg:px-6 py-2 md:py-3 rounded-lg md:rounded-xl border border-white/20 min-w-[60px] md:min-w-[100px] lg:min-w-[120px] justify-center">
                <User className="w-3 md:w-4 h-3 md:h-4" />
                <span className="hidden lg:inline text-xs md:text-sm font-semibold">
                  {currentUser?.firstName || 'User'}
                </span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-red-500/15 text-white border-red-300/30 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold px-2 md:px-4 lg:px-6 py-2 md:py-3 rounded-lg md:rounded-xl hover:scale-105 min-w-[60px] md:min-w-[80px] lg:min-w-[100px]"
              >
                <LogOut className="w-3 md:w-4 h-3 md:h-4" />
                <span className="hidden lg:inline ml-1 md:ml-2 text-xs md:text-sm">Logout</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setShowLoginModal(true)}
              variant="outline"
              className="bg-white/15 text-white border-white/30 hover:bg-white hover:text-[#75B8FA] transition-all duration-300 font-semibold px-3 md:px-4 lg:px-6 py-2 md:py-3 rounded-lg md:rounded-xl hover:scale-105 min-w-[80px] md:min-w-[120px] lg:min-w-[140px] xl:min-w-[160px] justify-center"
            >
              <LogIn className="w-4 md:w-4 h-4 md:h-4" />
              <span className="hidden md:inline ml-1 md:ml-2 text-xs lg:text-sm xl:text-base">Login</span>
            </Button>
          )}

          {/* WhatsApp Support - Responsive */}
          <Button
            onClick={() => window.open('https://wa.me/27832466539', '_blank')}
            variant="outline"
            className="bg-white/15 text-white border-white/30 hover:bg-white hover:text-[#75B8FA] transition-all duration-300 font-semibold px-3 md:px-4 lg:px-6 py-2 md:py-3 rounded-lg md:rounded-xl hover:scale-105 min-w-[80px] md:min-w-[120px] lg:min-w-[140px] xl:min-w-[160px] justify-center shadow-lg"
            title="WhatsApp Support"
          >
            <MessageCircle className="w-4 md:w-4 h-4 md:h-4" />
            <span className="hidden md:inline ml-1 md:ml-2 text-xs lg:text-sm xl:text-base">Support</span>
          </Button>
        </div>
      </div>

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default DesktopNavigation;
