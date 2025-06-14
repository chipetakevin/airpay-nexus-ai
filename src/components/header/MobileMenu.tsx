
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, Zap, Brain, MessageCircle, Scan, Settings, FileCheck, LogOut, LogIn, UserPlus, ChevronDown, ChevronUp, Shield
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
          <div className="container mx-auto px-4 py-3 space-y-1 pb-20">
            {/* Customer Authentication Section for Mobile - Compressed */}
            {isAuthenticated ? (
              <div className="pb-3 border-b border-gray-200 sticky top-0 bg-white z-10">
                <CustomerProfileDropdown />
              </div>
            ) : (
              <div className="pb-3 border-b border-gray-200 space-y-1 sticky top-0 bg-white z-10">
                <Button
                  onClick={() => {
                    setShowLoginModal(true);
                    toggleMenu();
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 min-h-[40px] text-sm"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Customer Login
                </Button>
                <Link to="/portal?tab=registration" onClick={toggleMenu}>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-700 hover:bg-green-50 min-h-[40px] text-sm"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register Free Account
                  </Button>
                </Link>
              </div>
            )}

            {/* Compressed Mobile Navigation Links */}
            <div className="space-y-0.5">
              <Link to="/devine-baas" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[40px] touch-manipulation" onClick={toggleMenu}>
                <Crown className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                <span className="font-medium text-sm">Divinely BaaS Platform</span>
              </Link>
              <Link to="/devine-baas" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 ml-3 min-h-[40px] touch-manipulation" onClick={toggleMenu}>
                <FileCheck className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span className="font-medium text-sm">Mobile Porting & RICA</span>
              </Link>
              <Link to="/baas-platform" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 ml-3 min-h-[40px] touch-manipulation" onClick={toggleMenu}>
                <Brain className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span className="font-medium text-sm">Mobile Divinely BaaS Portal</span>
              </Link>
              <Link to="/portal?tab=onecard" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[40px] touch-manipulation" onClick={toggleMenu}>
                <Zap className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="font-medium text-sm">Smart Deals Portal</span>
              </Link>
              <Link to="/whatsapp-assistant" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[40px] touch-manipulation" onClick={toggleMenu}>
                <MessageCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="font-medium text-sm">WhatsApp Business</span>
              </Link>
              <Link to="/scan-to-text-ai" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[40px] touch-manipulation" onClick={toggleMenu}>
                <Scan className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span className="font-medium text-sm">AI Document Scanner</span>
              </Link>
              
              {/* Admin Dropdown Category */}
              <div>
                <button 
                  onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                  className="flex items-center justify-between w-full gap-2 p-2.5 rounded-lg hover:bg-red-50 active:bg-red-100 transition-all duration-200 min-h-[40px] touch-manipulation"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span className="font-medium text-sm">Admin</span>
                  </div>
                  {showAdminDropdown ? (
                    <ChevronUp className="w-4 h-4 text-red-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-red-600" />
                  )}
                </button>
                
                {/* Admin Dropdown Items */}
                {showAdminDropdown && (
                  <div className="ml-6 mt-1 space-y-0.5 bg-red-50/50 rounded-lg p-2">
                    <Link to="/portal?tab=admin-reg" className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-100 active:bg-red-200 transition-all duration-200 min-h-[36px] touch-manipulation" onClick={toggleMenu}>
                      <UserPlus className="w-3 h-3 text-red-700 flex-shrink-0" />
                      <span className="font-medium text-sm text-red-700">Admin Registration</span>
                    </Link>
                    <Link to="/master-dashboard" className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-100 active:bg-red-200 transition-all duration-200 min-h-[36px] touch-manipulation" onClick={toggleMenu}>
                      <Settings className="w-3 h-3 text-red-700 flex-shrink-0" />
                      <span className="font-medium text-sm text-red-700">Master Dashboard</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Enhanced Mobile Logout Section - Fully Visible */}
            {isAuthenticated && (
              <div className="mt-3 pt-3 border-t-2 border-red-100 bg-red-50/50 rounded-lg p-3 sticky bottom-0 bg-white/95 backdrop-blur-sm">
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white p-3 rounded-lg transition-all duration-200 min-h-[44px] font-semibold shadow-lg touch-manipulation transform active:scale-95"
                >
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">Logout Account</span>
                </button>
                <p className="text-xs text-red-600 text-center mt-1 font-medium">
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
