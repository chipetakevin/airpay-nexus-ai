
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Gift, Crown, X } from 'lucide-react';

interface EnhancedCartDisplayProps {
  isVisible: boolean;
  onClose: () => void;
  userName?: string;
}

const EnhancedCartDisplay = ({ isVisible, onClose, userName = "Kevin Chipeta" }: EnhancedCartDisplayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-2 right-2 text-white hover:bg-white/20 p-1 h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-lg font-bold">Smart Cart</CardTitle>
              <p className="text-blue-100 text-sm font-medium">Quick & Secure Checkout</p>
            </div>
          </div>
          
          {/* Welcome Message with solid background for maximum visibility */}
          <div className="mt-3 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-white/50 shadow-2xl">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-white" />
              <span className="text-white font-bold text-xl tracking-wide">
                Welcome, {userName}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {/* Cart Items Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Cart Items</h3>
            
            <Card className="bg-gray-50 border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-blue-600 text-white font-semibold px-3 py-1">
                      Divinely Mobile
                    </Badge>
                    <div>
                      <p className="font-bold text-gray-900 text-base">R100 airtime</p>
                      <p className="text-sm text-gray-600 font-medium">from Divinely Mobile</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">R64.00</p>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Purchase Mode */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Purchase For</h3>
            <div className="flex gap-3">
              <Button className="flex-1 bg-gray-100 text-gray-800 border-2 border-gray-300 hover:bg-gray-200 font-semibold">
                <User className="w-4 h-4 mr-2" />
                Myself
              </Button>
              <Button className="flex-1 bg-black text-white hover:bg-gray-800 font-semibold">
                <Gift className="w-4 h-4 mr-2" />
                Someone Else
              </Button>
            </div>
          </div>

          {/* Recipient Details */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-gray-900">Recipient Details</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  placeholder="Enter recipient's name"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900 font-medium placeholder-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Recipient Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter recipient's phone number"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900 font-medium placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedCartDisplay;
