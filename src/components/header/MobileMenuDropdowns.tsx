
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, ChevronUp, Shield, CreditCard, User, Store, Key, ShoppingCart, Settings, X
} from 'lucide-react';

interface MobileMenuDropdownsProps {
  toggleMenu: () => void;
}

const MobileMenuDropdowns = ({ toggleMenu }: MobileMenuDropdownsProps) => {
  const [showPortalDropdown, setShowPortalDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  const handleExitToHome = () => {
    // Seamless navigation to landing homepage
    if (window.location.pathname === '/') {
      // Already on home page, scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to homepage
      window.location.href = '/';
    }
    toggleMenu(); // Close the menu
  };

  return (
    <div className="space-y-1">
      {/* Exit Button at the top */}
      <div className="flex justify-end mb-2">
        <button
          onClick={handleExitToHome}
          className="w-8 h-8 p-0 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 flex items-center justify-center"
          title="Exit to Home"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Portal Dropdown Category - More Compact */}
      <div>
        <button 
          onClick={() => setShowPortalDropdown(!showPortalDropdown)}
          className="flex items-center justify-between w-full gap-2 p-2 rounded-md hover:bg-purple-50 active:bg-purple-100 transition-all duration-200 min-h-[36px] touch-manipulation"
        >
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span className="font-medium text-sm">Smart Deals Portal</span>
          </div>
          {showPortalDropdown ? (
            <ChevronUp className="w-4 h-4 text-purple-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-purple-600" />
          )}
        </button>
        
        {/* Portal Dropdown Items - Horizontal Layout for Compactness */}
        {showPortalDropdown && (
          <div className="ml-2 mt-1 space-y-1 bg-purple-50/50 rounded-md p-2">
            <div className="grid grid-cols-2 gap-2">
              <Link to="/portal" className="flex items-center gap-1.5 p-2 rounded-md hover:bg-orange-100 active:bg-orange-200 transition-all duration-200 touch-manipulation" onClick={toggleMenu}>
                <ShoppingCart className="w-3 h-3 text-orange-700 flex-shrink-0" />
                <span className="font-medium text-xs text-orange-700">Buy Deals</span>
              </Link>
              <Link to="/portal?tab=onecard" className="flex items-center gap-1.5 p-2 rounded-md hover:bg-purple-100 active:bg-purple-200 transition-all duration-200 touch-manipulation" onClick={toggleMenu}>
                <CreditCard className="w-3 h-3 text-purple-700 flex-shrink-0" />
                <span className="font-medium text-xs text-purple-700">OneCard</span>
              </Link>
              <Link to="/portal?tab=registration" className="flex items-center gap-1.5 p-2 rounded-md hover:bg-green-100 active:bg-green-200 transition-all duration-200 touch-manipulation" onClick={toggleMenu}>
                <User className="w-3 h-3 text-green-700 flex-shrink-0" />
                <span className="font-medium text-xs text-green-700">Customer</span>
              </Link>
              <Link to="/portal?tab=vendor" className="flex items-center gap-1.5 p-2 rounded-md hover:bg-blue-100 active:bg-blue-200 transition-all duration-200 touch-manipulation" onClick={toggleMenu}>
                <Store className="w-3 h-3 text-blue-700 flex-shrink-0" />
                <span className="font-medium text-xs text-blue-700">Vendor</span>
              </Link>
            </div>
            <Link to="/portal?tab=admin-reg" className="flex items-center gap-1.5 p-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 touch-manipulation w-full" onClick={toggleMenu}>
              <Key className="w-3 h-3 text-gray-700 flex-shrink-0" />
              <span className="font-medium text-xs text-gray-700">Admin Access</span>
            </Link>
          </div>
        )}
      </div>

      {/* Admin Dropdown Category - More Compact */}
      <div>
        <button 
          onClick={() => setShowAdminDropdown(!showAdminDropdown)}
          className="flex items-center justify-between w-full gap-2 p-2 rounded-md hover:bg-red-50 active:bg-red-100 transition-all duration-200 min-h-[36px] touch-manipulation"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span className="font-medium text-sm">Admin Tools</span>
          </div>
          {showAdminDropdown ? (
            <ChevronUp className="w-4 h-4 text-red-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-red-600" />
          )}
        </button>
        
        {/* Admin Dropdown Items - Horizontal Layout */}
        {showAdminDropdown && (
          <div className="ml-2 mt-1 space-y-1 bg-red-50/50 rounded-md p-2">
            <div className="grid grid-cols-2 gap-2">
              <Link to="/portal?tab=admin" className="flex items-center gap-1.5 p-2 rounded-md hover:bg-red-100 active:bg-red-200 transition-all duration-200 touch-manipulation" onClick={toggleMenu}>
                <Shield className="w-3 h-3 text-red-700 flex-shrink-0" />
                <span className="font-medium text-xs text-red-700">Admin Portal</span>
              </Link>
              <Link to="/master-dashboard" className="flex items-center gap-1.5 p-2 rounded-md hover:bg-red-100 active:bg-red-200 transition-all duration-200 touch-manipulation" onClick={toggleMenu}>
                <Settings className="w-3 h-3 text-red-700 flex-shrink-0" />
                <span className="font-medium text-xs text-red-700">Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenuDropdowns;
