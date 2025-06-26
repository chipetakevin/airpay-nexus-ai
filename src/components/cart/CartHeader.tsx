
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart as CartIcon, X, Store, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartHeaderProps {
  onClose: () => void;
  currentUser?: any;
  isVendor?: boolean;
}

const CartHeader = ({ onClose, currentUser, isVendor }: CartHeaderProps) => {
  const getWelcomeMessage = () => {
    if (!currentUser) return null;

    if (isVendor) {
      // Get vendor business name from localStorage
      const vendorData = localStorage.getItem('onecardVendor');
      if (vendorData) {
        try {
          const vendor = JSON.parse(vendorData);
          const businessName = vendor.businessName || vendor.companyName || 'Vendor';
          return (
            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <Store className="w-4 h-4" />
              <span className="font-medium">Welcome, {businessName}</span>
            </div>
          );
        } catch (error) {
          console.error('Error parsing vendor data:', error);
        }
      }
    } else {
      // Get customer name from localStorage
      const customerData = localStorage.getItem('onecardUser');
      if (customerData) {
        try {
          const customer = JSON.parse(customerData);
          const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim();
          if (fullName) {
            return (
              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <User className="w-4 h-4" />
                <span className="font-medium">Welcome, {fullName}</span>
              </div>
            );
          }
        } catch (error) {
          console.error('Error parsing customer data:', error);
        }
      }
    }

    return null;
  };

  return (
    <CardHeader className="pb-3 bg-[#5B7FE8]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Enhanced Clickable Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/9ca7fcec-0caf-4b50-9334-e7172bc98733.png" 
              alt="Divine Mobile Logo"
              className="h-8 w-auto object-contain filter brightness-110 contrast-110 saturate-110"
            />
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md">
              <CartIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-white">Smart Cart</CardTitle>
              <div className="text-xs text-blue-100 font-medium">Quick & Secure Checkout</div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-white/20 backdrop-blur-sm rounded-full ml-2 transition-colors text-white hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Welcome message section */}
      <div className="mt-3">
        {getWelcomeMessage()}
      </div>
    </CardHeader>
  );
};

export default CartHeader;
