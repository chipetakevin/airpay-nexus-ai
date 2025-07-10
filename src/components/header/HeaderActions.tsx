
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
  toggleMenu: (e?: React.MouseEvent) => void;
}

const HeaderActions = ({ isMenuOpen, toggleMenu }: HeaderActionsProps) => {
  const { isAuthenticated } = useMobileAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showVendorLoginModal, setShowVendorLoginModal] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-4">
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
