
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, Zap, Brain, MessageCircle, Scan, Settings, FileCheck, LogOut, LogIn, UserPlus
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
          <div className="container mx-auto px-4 py-4 space-y-2 pb-24">
            {/* Customer Authentication Section for Mobile */}
            {isAuthenticated ? (
              <div className="pb-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <CustomerProfileDropdown />
              </div>
            ) : (
              <div className="pb-4 border-b border-gray-200 space-y-2 sticky top-0 bg-white z-10">
                <Button
                  onClick={() => {
                    setShowLoginModal(true);
                    toggleMenu();
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 min-h-[44px]"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Customer Login
                </Button>
                <Link to="/portal?tab=registration" onClick={toggleMenu}>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-700 hover:bg-green-50 min-h-[44px]"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register Free Account
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Navigation Links with smooth scrolling and 44px touch targets */}
            <div className="space-y-1">
              <Link to="/devine-baas" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[44px] touch-manipulation" onClick={toggleMenu}>
                <Crown className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                <span className="font-medium">Divinely BaaS Platform</span>
              </Link>
              <Link to="/devine-baas" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 ml-4 min-h-[44px] touch-manipulation" onClick={toggleMenu}>
                <FileCheck className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span className="font-medium">Mobile Porting & RICA</span>
              </Link>
              <Link to="/baas-platform" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 ml-4 min-h-[44px] touch-manipulation" onClick={toggleMenu}>
                <Brain className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span className="font-medium">Mobile Divinely BaaS Portal</span>
              </Link>
              <Link to="/portal?tab=onecard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[44px] touch-manipulation" onClick={toggleMenu}>
                <Zap className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="font-medium">Smart Deals Portal</span>
              </Link>
              <Link to="/whatsapp-assistant" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[44px] touch-manipulation" onClick={toggleMenu}>
                <MessageCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="font-medium">WhatsApp Business</span>
              </Link>
              <Link to="/scan-to-text-ai" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[44px] touch-manipulation" onClick={toggleMenu}>
                <Scan className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span className="font-medium">AI Document Scanner</span>
              </Link>
              <Link to="/master-dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[44px] touch-manipulation" onClick={toggleMenu}>
                <Settings className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span className="font-medium">Master Dashboard</span>
              </Link>
            </div>
            
            {/* Enhanced Mobile Logout Section - Moved up with reduced bottom padding */}
            {isAuthenticated && (
              <div className="mt-4 pt-4 border-t-2 border-red-100 bg-red-50/50 rounded-lg p-3 sticky bottom-0 bg-white/95 backdrop-blur-sm">
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center justify-center gap-3 w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white p-4 rounded-lg transition-all duration-200 min-h-[48px] font-semibold shadow-lg touch-manipulation transform active:scale-95"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span>Logout Account</span>
                </button>
                <p className="text-xs text-red-600 text-center mt-2 font-medium">
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
