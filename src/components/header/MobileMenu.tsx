
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MobileMenuAuth from './MobileMenuAuth';
import MobileMenuNavigation from './MobileMenuNavigation';
import MobileMenuDropdowns from './MobileMenuDropdowns';
import { useMobileAuth } from '@/hooks/useMobileAuth';

interface MobileMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenu = ({ isMenuOpen, toggleMenu }: MobileMenuProps) => {
  const { isAuthenticated } = useMobileAuth();

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden border-t bg-white relative z-50 max-h-[calc(100vh-4rem)] overflow-hidden">
      <ScrollArea className="h-full">
        <div className="container mx-auto px-3 py-2 space-y-0.5 pb-16">
          {/* Customer Authentication Section */}
          <MobileMenuAuth 
            isAuthenticated={isAuthenticated} 
            toggleMenu={toggleMenu} 
          />

          {/* Main Navigation Links */}
          <MobileMenuNavigation toggleMenu={toggleMenu} />
          
          {/* Portal and Admin Dropdowns */}
          <MobileMenuDropdowns toggleMenu={toggleMenu} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default MobileMenu;
