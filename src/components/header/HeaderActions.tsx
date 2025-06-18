
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, User, LogIn, Store, Server } from 'lucide-react';
import CustomerProfileDropdown from '../CustomerProfileDropdown';
import LoginModal from '../auth/LoginModal';
import VendorLoginModal from '../auth/VendorLoginModal';
import { useMobileAuth } from '@/hooks/useMobileAuth';

interface HeaderActionsProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const HeaderActions = ({ isMenuOpen, toggleMenu }: HeaderActionsProps) => {
  const { isAuthenticated } = useMobileAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showVendorLoginModal, setShowVendorLoginModal] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-4">
        {/* Desktop Customer Profile or Login */}
        <div className="hidden md:block">
          {isAuthenticated ? (
            <CustomerProfileDropdown />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowLoginModal(true)}
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Customer Login
              </Button>
              <Button
                onClick={() => setShowVendorLoginModal(true)}
                variant="outline"
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                <Store className="w-4 h-4 mr-2" />
                Vendor Login
              </Button>
            </div>
          )}
        </div>

        {/* DGX Station Quick Access - Desktop */}
        <div className="hidden lg:block">
          <Link to="/dgx-station">
            <Button 
              variant="outline" 
              size="sm"
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <Server className="w-4 h-4 mr-2" />
              DGX Station
            </Button>
          </Link>
        </div>

        {/* Get Started Button - Moved to far right */}
        <Link to="/portal?tab=registration" className="hidden md:block">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg">
            Get Started
          </Button>
        </Link>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Login Modals */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <VendorLoginModal 
        isOpen={showVendorLoginModal}
        onClose={() => setShowVendorLoginModal(false)}
      />
    </>
  );
};

export default HeaderActions;
