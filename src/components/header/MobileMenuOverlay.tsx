
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, LogIn, LogOut, User } from 'lucide-react';
import { navigationItems } from './NavigationConfig';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import LoginModal from '../auth/LoginModal';
import { useToast } from '@/hooks/use-toast';

interface MobileMenuOverlayProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  isHomePage: boolean;
  handleQuickShopClick: () => void;
}

const MobileMenuOverlay = ({ isMenuOpen, closeMenu, isHomePage, handleQuickShopClick }: MobileMenuOverlayProps) => {
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
    
    closeMenu();
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

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
        className="md:hidden fixed left-0 right-0 top-16 bg-white shadow-2xl border-t-2 border-[#75B8FA]/20 z-[95] max-h-[calc(100vh-4rem)] overflow-y-auto"
      >
        <nav className="p-4 space-y-2">
          {/* Authentication Status - Top Priority */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            {isAuthenticated ? (
              <div className="space-y-3">
                {/* User Info */}
                <div className="flex items-center gap-3 bg-green-50 px-4 py-3 rounded-xl border-2 border-green-200">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-800">
                      {currentUser?.firstName || 'User'}
                    </p>
                    <p className="text-xs text-green-600">
                      {currentUser?.userType?.toUpperCase()} Account
                    </p>
                  </div>
                </div>
                
                {/* Logout Button */}
                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-200"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  setShowLoginModal(true);
                  closeMenu();
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-200"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Navigation Items */}
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
        </nav>
        
        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </div>
    </>
  );
};

export default MobileMenuOverlay;
