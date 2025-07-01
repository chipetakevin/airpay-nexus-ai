
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, User, Store, Crown, LogOut, CheckCircle, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { usePersistentAuth } from '@/components/auth/PersistentAuthProvider';
import { useToast } from '@/hooks/use-toast';

const PermanentAuthStatus = () => {
  const { currentUser, isAuthenticated, manualLogout } = usePersistentAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  const handleLogout = () => {
    toast({
      title: "🔐 Logging Out...",
      description: "Clearing all authentication data.",
    });
    
    manualLogout();
    
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  const getUserTypeIcon = () => {
    switch (currentUser.userType) {
      case 'customer': return <User className="w-3 h-3" />;
      case 'vendor': return <Store className="w-3 h-3" />;
      case 'admin': return <Shield className="w-3 h-3" />;
      default: return <User className="w-3 h-3" />;
    }
  };

  const getUserTypeColor = () => {
    switch (currentUser.userType) {
      case 'customer': return 'bg-green-500 text-white';
      case 'vendor': return 'bg-blue-500 text-white';
      case 'admin': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-2 sm:p-4">
      <div className="max-w-sm mx-auto">
        {/* Expanded Details - Slides up from bottom */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden mb-2 ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <Card className={`border shadow-lg backdrop-blur-md ${
            currentUser.isUnifiedProfile 
              ? 'border-orange-300 bg-gradient-to-r from-orange-50/98 to-yellow-50/98' 
              : 'border-green-300 bg-green-50/98'
          }`}>
            <CardContent className="p-3 space-y-3">
              {/* Session Status */}
              <div className="text-center">
                <div className="text-sm font-semibold text-green-800 flex items-center justify-center gap-1">
                  <Shield className="w-4 h-4" />
                  Permanently Authenticated
                </div>
                <div className="text-xs text-gray-600">Active until manual logout</div>
              </div>

              {/* User Details */}
              <div className="bg-white/80 rounded-lg p-2 space-y-1">
                <div className="text-sm font-medium text-gray-800">
                  {currentUser.firstName} {currentUser.lastName}
                </div>
                <div className="text-xs text-gray-600">{currentUser.email}</div>
                <div className="text-xs text-gray-500">ID: ****{currentUser.id.slice(-4)}</div>
              </div>

              {/* Unified Profile Benefits */}
              {currentUser.isUnifiedProfile && (
                <div className="bg-gradient-to-r from-orange-100/80 to-yellow-100/80 rounded-lg p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Crown className="w-3 h-3 text-orange-600" />
                    <span className="text-xs font-medium text-orange-800">Unified Access</span>
                  </div>
                  <div className="text-xs text-orange-700">
                    Customer, Vendor & Admin privileges enabled
                  </div>
                </div>
              )}

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="w-full bg-red-50/80 border-red-300 text-red-700 hover:bg-red-100/80 h-8 text-xs"
              >
                <LogOut className="w-3 h-3 mr-1" />
                Secure Logout
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Collapsed Status Bar - Always visible at bottom */}
        <Card className={`border shadow-lg backdrop-blur-md ${
          currentUser.isUnifiedProfile 
            ? 'border-orange-300 bg-gradient-to-r from-orange-50/95 to-yellow-50/95' 
            : 'border-green-300 bg-green-50/95'
        }`}>
          <CardContent className="p-2">
            <div className="flex items-center justify-between gap-2">
              {/* Status Section */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                  <Badge className={`${getUserTypeColor()} text-xs px-2 py-0 h-5 flex items-center gap-1`}>
                    {getUserTypeIcon()}
                    <span className="capitalize">{currentUser.userType.charAt(0)}</span>
                  </Badge>
                  {currentUser.isUnifiedProfile && (
                    <Badge className="bg-orange-500 text-white text-xs px-1 py-0 h-5 flex items-center">
                      <Crown className="w-2 h-2" />
                    </Badge>
                  )}
                </div>
                
                {/* User name - hidden on very small screens */}
                <span className="text-xs text-gray-700 font-medium truncate hidden xs:block">
                  {currentUser.firstName}
                </span>
              </div>
              
              {/* Security Icon */}
              <div className="flex items-center gap-2">
                <Lock className="w-3 h-3 text-gray-500 flex-shrink-0" />
                
                {/* Expand/Collapse Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-6 w-6 p-0 hover:bg-white/50 flex-shrink-0"
                >
                  {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PermanentAuthStatus;
