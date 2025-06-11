
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, Zap, Brain, MessageCircle, Scan, Settings, FileCheck, LogOut
} from 'lucide-react';
import CustomerProfileDropdown from '../CustomerProfileDropdown';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useToast } from '@/hooks/use-toast';

interface MobileMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenu = ({ isMenuOpen, toggleMenu }: MobileMenuProps) => {
  const { isAuthenticated } = useMobileAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userCredentials');
    
    toast({
      title: "Logged Out Successfully",
      description: "Your account information has been saved for future logins.",
      duration: 3000,
    });
    
    window.location.href = '/';
  };

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden border-t bg-white">
      <div className="container mx-auto px-4 py-4 space-y-2">
        {/* Customer Profile for Mobile */}
        {isAuthenticated && (
          <div className="pb-4 border-b border-gray-200">
            <CustomerProfileDropdown />
          </div>
        )}

        {/* Mobile Navigation Links with 44px touch targets */}
        <Link to="/devine-baas" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px]" onClick={toggleMenu}>
          <Crown className="w-4 h-4 text-yellow-600" />
          <span className="font-medium">Divinely BaaS Platform</span>
        </Link>
        <Link to="/devine-baas" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors ml-4 min-h-[44px]" onClick={toggleMenu}>
          <FileCheck className="w-4 h-4 text-orange-600" />
          <span className="font-medium">Mobile Porting & RICA</span>
        </Link>
        <Link to="/baas-platform" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors ml-4 min-h-[44px]" onClick={toggleMenu}>
          <Brain className="w-4 h-4 text-purple-600" />
          <span className="font-medium">Mobile Divinely BaaS Portal</span>
        </Link>
        <Link to="/portal?tab=onecard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px]" onClick={toggleMenu}>
          <Zap className="w-4 h-4 text-blue-600" />
          <span className="font-medium">Smart Deals Portal</span>
        </Link>
        <Link to="/whatsapp-assistant" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px]" onClick={toggleMenu}>
          <MessageCircle className="w-4 h-4 text-green-600" />
          <span className="font-medium">WhatsApp Business</span>
        </Link>
        <Link to="/scan-to-text-ai" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px]" onClick={toggleMenu}>
          <Scan className="w-4 h-4 text-purple-600" />
          <span className="font-medium">AI Document Scanner</span>
        </Link>
        <Link to="/master-dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px]" onClick={toggleMenu}>
          <Settings className="w-4 h-4 text-red-600" />
          <span className="font-medium">Master Dashboard</span>
        </Link>
        
        {/* Mobile Logout Option - Only show if authenticated */}
        {isAuthenticated && (
          <>
            <div className="border-t border-gray-200 my-4"></div>
            <button 
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors w-full text-left min-h-[44px]"
            >
              <LogOut className="w-4 h-4 text-red-600" />
              <div className="pt-1">
                <span className="font-medium text-red-600">Logout</span>
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
