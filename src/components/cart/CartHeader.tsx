
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
            <div className="flex items-center gap-3 text-sm text-white bg-white/20 px-4 py-2.5 rounded-xl border border-white/30 backdrop-blur-sm shadow-sm">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Store className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold tracking-wide">Welcome, {businessName}</span>
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
              <div className="flex items-center gap-3 text-sm text-white bg-white/20 px-4 py-2.5 rounded-xl border border-white/30 backdrop-blur-sm shadow-sm">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold tracking-wide">Welcome, {fullName}</span>
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
    <CardHeader className="pb-4 bg-gradient-to-br from-[#75B8FA] via-[#6BA5E7] to-[#5A92D4] relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Enhanced Clickable Logo with better visibility */}
            <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
              <div className="p-1.5 bg-white/90 rounded-lg shadow-sm">
                <img 
                  src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" 
                  alt="Divine Mobile Logo"
                  className="h-7 w-7 object-contain"
                />
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/90 rounded-xl shadow-sm">
                <CartIcon className="w-5 h-5 text-[#75B8FA]" />
              </div>
              <div className="text-center">
                <CardTitle className="text-xl font-bold text-white drop-shadow-sm tracking-tight">Smart Cart</CardTitle>
                <div className="text-sm text-white/90 font-semibold tracking-wide">Quick & Secure Checkout</div>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-9 w-9 p-0 hover:bg-white/20 rounded-full ml-3 transition-all duration-200 text-white hover:text-white hover:scale-110 border border-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Enhanced Welcome message section */}
        <div className="mt-4">
          {getWelcomeMessage()}
        </div>
      </div>
    </CardHeader>
  );
};

export default CartHeader;
