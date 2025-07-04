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
                  onClick={toggleCardVisibility}
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

          {/* Account Holder Card */}
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Account Holder</span>
                </div>
                <div className="text-lg font-bold text-green-800">
                  {fullName}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Collapsed State Bottom Bar */}
      {isCollapsed && (
        <div className="mt-4">
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5" />
                  <div>
                    <div className="font-bold text-sm">{fullName}</div>
                    <div className="text-xs opacity-90">OneCard Account</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleCollapse}
                  className="text-white hover:bg-white/20"
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