import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Phone, User, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleOneCardAccountProps {
  userData?: any;
  defaultCollapsed?: boolean;
  className?: string;
}

export const CollapsibleOneCardAccount = ({ 
  userData, 
  defaultCollapsed = false,
  className 
}: CollapsibleOneCardAccountProps) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const togglePhoneVisibility = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };

  const toggleCardVisibility = () => {
    setShowCardNumber(!showCardNumber);
  };

  // Get user data from localStorage if not provided
  const accountData = userData || JSON.parse(localStorage.getItem('onecardUser') || '{}');
  const fullName = accountData.firstName && accountData.lastName 
    ? `${accountData.firstName} ${accountData.lastName}`.toUpperCase()
    : 'KEVIN CHIPETA';

  return (
    <div className={cn("w-full", className)}>
      {/* Header Section - Always Visible */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Your OneCard Account</h3>
                <p className="text-sm text-gray-600">Account management & details</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapse}
              className="text-gray-600 hover:text-gray-900"
            >
              {isCollapsed ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronUp className="w-5 h-5" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Expandable Content */}
      <div className={cn(
        "transition-all duration-300 overflow-hidden",
        isCollapsed ? "max-h-0 opacity-0" : "max-h-[1000px] opacity-100"
      )}>
        <div className="pt-4 space-y-4">
          {/* AirPay OneCard - Styled like first image */}
          <Card className="bg-gradient-to-br from-yellow-400 to-yellow-500 border-yellow-300 shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-6 relative">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-xl">A</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black">AirPay</h3>
                    <p className="text-sm text-black/70">Powered by OneCard</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-sm">1</span>
                  </div>
                  <span className="text-black font-bold">CARD</span>
                </div>
              </div>

              {/* Card Number */}
              <div 
                className="text-center mb-6 cursor-pointer hover:bg-black/5 rounded-lg p-2 transition-colors"
                onClick={toggleCardVisibility}
              >
                <div className="text-3xl font-bold text-black tracking-[0.3em] mb-2">
                  {showCardNumber ? 'OCRA 50TG WG' : '•••• •••• ••'}
                </div>
                <div className="flex items-center justify-center gap-2">
                  {showCardNumber ? (
                    <EyeOff className="w-4 h-4 text-black/70" />
                  ) : (
                    <Eye className="w-4 h-4 text-black/70" />
                  )}
                  <p className="text-xs text-black/70">Click to {showCardNumber ? 'hide' : 'reveal'}</p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-black/70 mb-1">CARD HOLDER</p>
                  <p className="text-lg font-bold text-black">{fullName}</p>
                  <p className="text-sm text-black/60">Member Since 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-black/70 mb-1">VALID THRU</p>
                  <p className="text-xl font-bold text-black">06/28</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registered Phone Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 shadow-sm rounded-xl">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">Registered Phone</span>
                </div>
                <div 
                  className="flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-200/50 rounded-lg p-2 transition-colors"
                  onClick={togglePhoneVisibility}
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

          {/* Account Status Card */}
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 shadow-sm rounded-xl">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Account Status</span>
                </div>
                <div className="text-lg font-bold text-green-800">
                  {fullName}
                </div>
                <div className="text-sm text-green-700 bg-green-200/50 rounded-lg px-3 py-1 inline-block">
                  Active Member Since 2025
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Collapsed State Bottom Bar - AirPay Style */}
      {isCollapsed && (
        <div className="mt-4">
          <Card className="bg-gradient-to-r from-yellow-400 to-yellow-500 border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-black">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-sm">A</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm">AirPay • {fullName}</div>
                    <div className="text-xs opacity-75">OneCard Member</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleCollapse}
                  className="text-black hover:bg-black/10"
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};