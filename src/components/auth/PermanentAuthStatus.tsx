
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, User, Store, Crown, LogOut, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { usePersistentAuth } from '@/components/auth/PersistentAuthProvider';
import { useToast } from '@/hooks/use-toast';

const PermanentAuthStatus = () => {
  const { currentUser, isAuthenticated, manualLogout } = usePersistentAuth();
  const [showDetails, setShowDetails] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
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
      case 'customer': return <User className="w-4 h-4" />;
      case 'vendor': return <Store className="w-4 h-4" />;
      case 'admin': return <Shield className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getUserTypeColor = () => {
    switch (currentUser.userType) {
      case 'customer': return 'bg-green-100 text-green-700 border-green-300';
      case 'vendor': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'admin': return 'bg-purple-100 text-purple-700 border-purple-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="fixed top-16 right-4 z-40 max-w-sm">
      <Card className={`border-2 shadow-lg transition-all duration-300 ${currentUser.isUnifiedProfile ? 'border-orange-300 bg-gradient-to-r from-orange-50 to-yellow-50' : 'border-green-300 bg-green-50'}`}>
        <CardContent className="p-2">
          {/* Compact Status Bar - Always Visible */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <Badge variant="outline" className={`${getUserTypeColor()} text-xs`}>
                {getUserTypeIcon()}
                <span className="ml-1 capitalize">{currentUser.userType.charAt(0)}</span>
              </Badge>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-6 w-6 p-0 hover:bg-white/50"
            >
              {isCollapsed ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </Button>
          </div>

          {/* Collapsible Details */}
          {!isCollapsed && (
            <div className="space-y-2 pt-2 border-t border-gray-200 mt-2">
              <div className="text-xs">
                <div className="font-semibold text-green-800">Permanently Logged In</div>
                <div className="text-gray-600">Session active until manual logout</div>
              </div>

              <div className="text-xs text-gray-700">
                <div className="font-medium">{currentUser.firstName} {currentUser.lastName}</div>
                <div>{currentUser.email}</div>
                <div>ID: ****{currentUser.id.slice(-4)}</div>
              </div>

              {currentUser.isUnifiedProfile && (
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300 text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    Unified
                  </Badge>
                </div>
              )}

              {currentUser.isUnifiedProfile && (
                <div className="text-xs text-orange-700 bg-orange-100 p-2 rounded">
                  🌟 <strong>Unified Access:</strong> Customer, Vendor & Admin privileges
                </div>
              )}

              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="w-full bg-red-50 border-red-300 text-red-700 hover:bg-red-100 h-7"
              >
                <LogOut className="w-3 h-3 mr-1" />
                Logout
              </Button>
            </div>
          )}

          {/* Lock Icon Indicator */}
          <div className="text-center mt-1">
            <div className="inline-flex items-center text-xs text-gray-500">
              🔒
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermanentAuthStatus;
