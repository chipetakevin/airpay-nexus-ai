
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
    <CardHeader className="pb-3 bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 border-b border-purple-200 relative">
      {/* Enhanced fade overlay with stronger purple gradient matching main header */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-200/25 via-blue-200/20 to-indigo-200/25 backdrop-blur-sm"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Enhanced Clickable Logo with better visibility */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img 
                src="/lovable-uploads/e9a58c2c-0e41-4b09-8580-1f46b9a977d2.png" 
                alt="Divine Mobile Logo"
                className="h-8 w-auto object-contain filter brightness-110 contrast-110 saturate-110"
                style={{
                  filter: 'drop-shadow(0 2px 6px rgba(139, 92, 246, 0.25)) brightness(1.1) contrast(1.1) saturate(1.15)'
                }}
              />
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md">
                <CartIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-purple-800">Smart Cart</CardTitle>
                <div className="text-xs text-purple-600 font-medium">Quick & Secure Checkout</div>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-white/60 backdrop-blur-sm rounded-full ml-2 transition-colors text-purple-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Welcome message section */}
        <div className="mt-3">
          {getWelcomeMessage()}
        </div>
      </div>
    </CardHeader>
  );
};

export default CartHeader;
