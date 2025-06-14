
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Phone, User, Eye, EyeOff } from 'lucide-react';

interface AccountInfoCardsProps {
  userData: any;
  showPhoneNumber: boolean;
  showCardNumber: boolean;
  onTogglePhoneVisibility: () => void;
  onToggleCardVisibility: () => void;
}

export const AccountInfoCards = ({ 
  userData, 
  showPhoneNumber, 
  showCardNumber, 
  onTogglePhoneVisibility, 
  onToggleCardVisibility 
}: AccountInfoCardsProps) => {
  return (
    <div className="space-y-4 mb-6">
      {/* OneCard Number Card */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
              <CreditCard className="w-4 h-4" />
              <span className="text-sm font-medium">OneCard Number</span>
            </div>
            <div 
              className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200/50 rounded-lg p-2 transition-colors"
              onClick={onToggleCardVisibility}
            >
              <div className="text-2xl font-bold text-gray-800 tracking-wider">
                {showCardNumber ? '****PP7F' : '••••••••'}
              </div>
              {showCardNumber ? (
                <EyeOff className="w-4 h-4 text-gray-600" />
              ) : (
                <Eye className="w-4 h-4 text-gray-600" />
              )}
            </div>
            <p className="text-xs text-gray-600">Click to {showCardNumber ? 'hide' : 'reveal'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Registered Phone Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">Registered Phone</span>
            </div>
            <div 
              className="flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-200/50 rounded-lg p-2 transition-colors"
              onClick={onTogglePhoneVisibility}
            >
              <div className="text-xl font-bold text-blue-800">
                {showPhoneNumber ? '+27832455650' : '•••••••••••••'}
              </div>
              {showPhoneNumber ? (
                <EyeOff className="w-4 h-4 text-blue-600" />
              ) : (
                <Eye className="w-4 h-4 text-blue-600" />
              )}
            </div>
            <p className="text-xs text-blue-600">Click to {showPhoneNumber ? 'hide' : 'reveal'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Account Holder Card */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Account Holder</span>
            </div>
            <div className="text-lg font-bold text-green-800">
              {userData.firstName?.toUpperCase()} {userData.lastName?.toUpperCase() || 'KEVIN CHIPETA'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
