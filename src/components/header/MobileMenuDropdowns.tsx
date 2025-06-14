
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, ChevronUp, Shield, CreditCard, User, Store, Key, ShoppingCart, Settings
} from 'lucide-react';

interface MobileMenuDropdownsProps {
  toggleMenu: () => void;
}

const MobileMenuDropdowns = ({ toggleMenu }: MobileMenuDropdownsProps) => {
  const [showPortalDropdown, setShowPortalDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  return (
    <div className="space-y-0">
      {/* Portal Dropdown Category */}
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
        
        {/* Portal Dropdown Items */}
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

      {/* Admin Dropdown Category */}
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
        
        {/* Admin Dropdown Items */}
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
  );
};

export default MobileMenuDropdowns;
