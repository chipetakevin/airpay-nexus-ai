
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, Zap, Brain, MessageCircle, Scan, Settings, FileCheck, LogOut, LogIn, UserPlus, ChevronDown, ChevronUp, Shield, CreditCard, User, Store, Key, ShoppingCart, Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import CustomerProfileDropdown from '../CustomerProfileDropdown';
import LoginModal from '../auth/LoginModal';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useToast } from '@/hooks/use-toast';

interface MobileMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenu = ({ isMenuOpen, toggleMenu }: MobileMenuProps) => {
  const { isAuthenticated } = useMobileAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPortalDropdown, setShowPortalDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('userAuthenticated');
    
    toast({
      title: "Logged Out Successfully",
      description: "Your account information has been saved for future logins.",
      duration: 3000,
    });
    
    window.location.href = '/';
  };

  if (!isMenuOpen) return null;

  return (
    <>
      <div className="md:hidden border-t bg-white relative z-50 max-h-[calc(100vh-4rem)] overflow-hidden">
        <ScrollArea className="h-full">
          <div className="container mx-auto px-3 py-2 space-y-0.5 pb-16">
            {/* Customer Authentication Section for Mobile - Ultra Compressed */}
            {isAuthenticated ? (
              <div className="pb-2 border-b border-gray-200 sticky top-0 bg-white z-10">
                <CustomerProfileDropdown />
              </div>
            ) : (
              <div className="pb-2 border-b border-gray-200 space-y-1 sticky top-0 bg-white z-10">
                <Button
                  onClick={() => {
                    setShowLoginModal(true);
                    toggleMenu();
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 min-h-[36px] text-xs"
                >
                  <LogIn className="w-3 h-3 mr-1" />
                  Customer Login
                </Button>
                <Link to="/portal?tab=registration" onClick={toggleMenu}>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-700 hover:bg-green-50 min-h-[36px] text-xs"
                  >
                    <UserPlus className="w-3 h-3 mr-1" />
                    Register Free Account
                  </Button>
                </Link>
              </div>
            )}

            {/* Ultra Compressed Mobile Navigation Links */}
            <div className="space-y-0">
              <Link to="/devine-baas" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
                <Crown className="w-3 h-3 text-yellow-600 flex-shrink-0" />
                <span className="font-medium text-xs">Divinely BaaS Platform</span>
              </Link>
              <Link to="/devine-baas" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 ml-2 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
                <FileCheck className="w-3 h-3 text-orange-600 flex-shrink-0" />
                <span className="font-medium text-xs">Mobile Porting & RICA</span>
              </Link>
              <Link to="/baas-platform" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 ml-2 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
                <Brain className="w-3 h-3 text-purple-600 flex-shrink-0" />
                <span className="font-medium text-xs">Mobile Divinely BaaS Portal</span>
              </Link>
              
              {/* New Smart Deals - Airtime and Data category */}
              <Link to="/portal?tab=deals" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-orange-50 active:bg-orange-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
                <Flame className="w-3 h-3 text-orange-600 flex-shrink-0" />
                <span className="font-medium text-xs">Smart Deals - Airtime and Data</span>
              </Link>
              
              <Link to="/deals" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
                <Zap className="w-3 h-3 text-blue-600 flex-shrink-0" />
                <span className="font-medium text-xs">Smart Deals Hub</span>
              </Link>
              <Link to="/whatsapp-assistant" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
                <MessageCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span className="font-medium text-xs">WhatsApp Business</span>
              </Link>
              
              {/* Portal Dropdown Category - Enhanced with all tabs */}
              <div>
                <button 
                  onClick={() => setShowPortalDropdown(!showPortalDropdown)}
                  className="flex items-center justify-between w-full gap-2 p-1.5 rounded-md hover:bg-purple-50 active:bg-purple-100 transition-all duration-200 min-h-[32px] touch-manipulation"
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-3 h-3 text-purple-600 flex-shrink-0" />
                    <span className="font-medium text-xs">Portal Services</span>
                  </div>
                  {showPortalDropdown ? (
                    <ChevronUp className="w-3 h-3 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-purple-600" />
                  )}
                </button>
                
                {/* Portal Dropdown Items - All 5 main tabs including new airtime/data option */}
                {showPortalDropdown && (
                  <div className="ml-4 mt-0.5 space-y-0 bg-purple-50/50 rounded-md p-1">
                    <Link to="/portal" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-orange-100 active:bg-orange-200 transition-all duration-200 min-h-[28px] touch-manipulation" onClick={toggleMenu}>
                      <ShoppingCart className="w-2.5 h-2.5 text-orange-700 flex-shrink-0" />
                      <span className="font-medium text-xs text-orange-700">Buy Airtime and Data (Customer Vendor Portal)</span>
                    </Link>
                    <Link to="/portal?tab=onecard" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-purple-100 active:bg-purple-200 transition-all duration-200 min-h-[28px] touch-manipulation" onClick={toggleMenu}>
                      <CreditCard className="w-2.5 h-2.5 text-purple-700 flex-shrink-0" />
                      <span className="font-medium text-xs text-purple-700">OneCard Dashboard</span>
                    </Link>
                    <Link to="/portal?tab=registration" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-green-100 active:bg-green-200 transition-all duration-200 min-h-[28px] touch-manipulation" onClick={toggleMenu}>
                      <User className="w-2.5 h-2.5 text-green-700 flex-shrink-0" />
                      <span className="font-medium text-xs text-green-700">Customer Register</span>
                    </Link>
                    <Link to="/portal?tab=vendor" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-100 active:bg-blue-200 transition-all duration-200 min-h-[28px] touch-manipulation" onClick={toggleMenu}>
                      <Store className="w-2.5 h-2.5 text-blue-700 flex-shrink-0" />
                      <span className="font-medium text-xs text-blue-700">Vendor Partner</span>
                    </Link>
                    <Link to="/portal?tab=admin-reg" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 min-h-[28px] touch-manipulation" onClick={toggleMenu}>
                      <Key className="w-2.5 h-2.5 text-gray-700 flex-shrink-0" />
                      <span className="font-medium text-xs text-gray-700">Admin Access</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/scan-to-text-ai" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
                <Scan className="w-3 h-3 text-purple-600 flex-shrink-0" />
                <span className="font-medium text-xs">AI Document Scanner</span>
              </Link>
              
              {/* Admin Dropdown Category - Ultra Compressed */}
              <div>
                <button 
                  onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                  className="flex items-center justify-between w-full gap-2 p-1.5 rounded-md hover:bg-red-50 active:bg-red-100 transition-all duration-200 min-h-[32px] touch-manipulation"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-red-600 flex-shrink-0" />
                    <span className="font-medium text-xs">Admin Tools</span>
                  </div>
                  {showAdminDropdown ? (
                    <ChevronUp className="w-3 h-3 text-red-600" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-red-600" />
                  )}
                </button>
                
                {/* Admin Dropdown Items - Ultra Compressed */}
                {showAdminDropdown && (
                  <div className="ml-4 mt-0.5 space-y-0 bg-red-50/50 rounded-md p-1">
                    <Link to="/portal?tab=admin" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-red-100 active:bg-red-200 transition-all duration-200 min-h-[28px] touch-manipulation" onClick={toggleMenu}>
                      <Shield className="w-2.5 h-2.5 text-red-700 flex-shrink-0" />
                      <span className="font-medium text-xs text-red-700">Admin Portal</span>
                    </Link>
                    <Link to="/master-dashboard" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-red-100 active:bg-red-200 transition-all duration-200 min-h-[28px] touch-manipulation" onClick={toggleMenu}>
                      <Settings className="w-2.5 h-2.5 text-red-700 flex-shrink-0" />
                      <span className="font-medium text-xs text-red-700">Master Dashboard</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Ultra Compressed Mobile Logout Section - Always Visible */}
            {isAuthenticated && (
              <div className="mt-2 pt-2 border-t-2 border-red-100 bg-red-50/50 rounded-md p-2 sticky bottom-0 bg-white/95 backdrop-blur-sm">
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white p-2.5 rounded-md transition-all duration-200 min-h-[36px] font-semibold shadow-lg touch-manipulation transform active:scale-95"
                >
                  <LogOut className="w-3 h-3 flex-shrink-0" />
                  <span className="text-xs">Logout Account</span>
                </button>
                <p className="text-xs text-red-600 text-center mt-0.5 font-medium">
                  Secure logout from your session
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Login Modal for Mobile */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default MobileMenu;
