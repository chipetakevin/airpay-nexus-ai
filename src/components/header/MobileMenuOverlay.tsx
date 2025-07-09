
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CreditCard, LogIn, LogOut, User, Shield, MessageCircle, ShoppingCart, Phone } from 'lucide-react';
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
  const [showAdminPasswordInput, setShowAdminPasswordInput] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const { toast } = useToast();
  const isActive = (path: string) => location.pathname === path;

  const handleAdminPortalAccess = () => {
    if (adminPassword === 'Malawi@1976') {
      // Set admin authentication
      localStorage.setItem('adminAuthenticated', 'true');
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('userCredentials', JSON.stringify({
        userType: 'admin',
        password: 'Malawi@1976',
        firstName: 'Kevin',
        isUnifiedProfile: true
      }));
      
      toast({
        title: "🔐 Admin Access Granted",
        description: "Welcome Kevin! Redirecting to Admin Portal...",
        duration: 2000,
      });
      
      closeMenu();
      setShowAdminPasswordInput(false);
      setAdminPassword('');
      
      // Navigate to admin portal
      setTimeout(() => {
        window.location.href = '/portal?tab=admin-reg';
      }, 1000);
    } else {
      toast({
        title: "❌ Access Denied",
        description: "Invalid admin password. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      setAdminPassword('');
    }
  };

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
                      {(() => {
                        const adminAuth = localStorage.getItem('adminAuthenticated') === 'true';
                        const storedCredentials = localStorage.getItem('userCredentials');
                        if (adminAuth && storedCredentials) {
                          const credentials = JSON.parse(storedCredentials);
                          if (credentials.password === 'Malawi@1976') {
                            return 'Kevin';
                          }
                        }
                        return currentUser?.firstName || 'User';
                      })()}
                    </p>
                    <p className="text-xs text-green-600">
                      {(() => {
                        const adminAuth = localStorage.getItem('adminAuthenticated') === 'true';
                        const storedCredentials = localStorage.getItem('userCredentials');
                        if (adminAuth && storedCredentials) {
                          const credentials = JSON.parse(storedCredentials);
                          if (credentials.password === 'Malawi@1976') {
                            return 'ADMIN Account';
                          }
                        }
                        return currentUser?.userType?.toUpperCase() + ' Account' || 'User Account';
                      })()}
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
              <Link
                to="/rica-registration"
                onClick={closeMenu}
                className="block w-full"
              >
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-200"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Main Navigation Menu - Matching Second Image */}
          
          {/* Home */}
          <Link
            to="/"
            onClick={closeMenu}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 text-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
          >
            <div className="flex items-center justify-center w-8 h-8">
              <User className="w-5 h-5" />
            </div>
            <span className="flex-1">Home</span>
          </Link>

          {/* Deals Hub */}
          <Link
            to="/portal?tab=deals"
            onClick={closeMenu}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 text-lg font-medium text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-100"
          >
            <div className="flex items-center justify-center w-8 h-8">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <span className="flex-1">Deals Hub</span>
            <Badge className="bg-blue-100 text-blue-700 text-xs px-3 py-1">
              USSD
            </Badge>
          </Link>

          {/* WhatsApp Shopping */}
          <Link
            to="/whatsapp-store"
            onClick={closeMenu}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 text-lg font-medium text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-100"
          >
            <div className="flex items-center justify-center w-8 h-8">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="flex-1">WhatsApp Shopping</span>
            <Badge className="bg-blue-100 text-blue-700 text-xs px-3 py-1">
              AI
            </Badge>
          </Link>

          {/* Number Porting */}
          <Link
            to="/number-porting"
            onClick={closeMenu}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 text-lg font-medium text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-100"
          >
            <div className="flex items-center justify-center w-8 h-8">
              <Phone className="w-5 h-5" />
            </div>
            <span className="flex-1">Number Porting</span>
            <Badge className="bg-blue-100 text-blue-700 text-xs px-3 py-1">
              NEW
            </Badge>
          </Link>

          {/* Portal - Admin Access with Password */}
          {showAdminPasswordInput ? (
            <div className="w-full space-y-3 px-6 py-4 rounded-2xl bg-orange-50 border-2 border-orange-200">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-600" />
                <span className="text-lg font-medium text-orange-800">Admin Portal Access</span>
              </div>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full"
                onKeyPress={(e) => e.key === 'Enter' && handleAdminPortalAccess()}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleAdminPortalAccess}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm"
                >
                  Access Portal
                </Button>
                <Button
                  onClick={() => {
                    setShowAdminPasswordInput(false);
                    setAdminPassword('');
                  }}
                  variant="outline"
                  className="flex-1 text-sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAdminPasswordInput(true)}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 text-lg font-medium text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-100"
            >
              <div className="flex items-center justify-center w-8 h-8">
                <Shield className="w-5 h-5" />
              </div>
              <span className="flex-1">Portal</span>
            </button>
          )}
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
