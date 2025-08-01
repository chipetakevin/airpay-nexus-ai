
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
    <div className="md:hidden border-t bg-white relative z-50 max-h-[calc(100vh-4rem)] overflow-hidden shadow-xl">
      <ScrollArea className="h-full">
        <div className="container mx-auto px-3 py-2 space-y-0.5 pb-16">
          {/* Enhanced Authentication Section with Registration Links */}
          <MobileMenuAuth 
            isAuthenticated={isAuthenticated} 
            toggleMenu={toggleMenu} 
          />

          {/* Services Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 my-2">
            <p className="text-xs text-yellow-800 text-center font-medium">
              ⚠️ All services require completed registration with valid phone number and banking details
            </p>
          </div>

          {/* Enhanced Navigation Links */}
          <MobileMenuNavigation toggleMenu={toggleMenu} />
          
          {/* Portal and Admin Dropdowns - Only show if authenticated */}
          {isAuthenticated && <MobileMenuDropdowns toggleMenu={toggleMenu} />}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MobileMenu;
