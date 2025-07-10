
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
      {/* Desktop Navigation - Cleaner Layout */}
      <nav className="hidden md:flex items-center space-x-2 lg:space-x-3">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium whitespace-nowrap ${
              isActive(item.path)
                ? 'bg-white text-[#75B8FA] shadow-sm'
                : 'text-white hover:bg-white/15 hover:text-white'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span className="hidden lg:inline">{item.label}</span>
            <span className="lg:hidden">{item.label.split(' ')[0]}</span>
            {item.badge && (
              <Badge 
                variant="secondary" 
                className="bg-yellow-400 text-black text-xs px-1.5 py-0.5 font-semibold border-0 ml-1"
              >
                {item.badge}
              </Badge>
            )}
          </Link>
        ))}
        
        {/* Buy Airtime & Data Tab - Compact Design */}
        {isHomePage && (
          <button
            onClick={handleQuickShopClick}
            className="relative px-2 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 text-sm font-medium bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-sm"
          >
            <CreditCard className="w-4 h-4" />
            <span className="hidden xl:inline text-xs">Buy Airtime</span>
            <Badge className="bg-white text-emerald-600 text-xs px-1 py-0.5 font-semibold border-0">
              Quick
            </Badge>
          </button>
        )}
      </nav>

      {/* Authentication Status & WhatsApp Support - Compact */}
      <div className="hidden md:flex items-center space-x-1">
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
