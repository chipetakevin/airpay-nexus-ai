
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Shield, User, Store } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LogoutSectionProps {
  userType: string;
  userName: string;
  isUnifiedProfile: boolean;
  onLogout: () => void;
}

const LogoutSection: React.FC<LogoutSectionProps> = ({
  userType,
  userName,
  isUnifiedProfile,
  onLogout
}) => {
  const { toast } = useToast();

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('userCredentials');
    localStorage.removeItem('onecardAdmin');
    localStorage.removeItem('onecardUser');
    localStorage.removeItem('onecardVendor');
    sessionStorage.removeItem('userAuth');
    
    toast({
      title: "🔐 Logged Out Successfully",
      description: "All sessions cleared. You can log back in anytime.",
      duration: 4000,
    });
    
    onLogout();
    
    // Redirect to home page
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  const getAccessBadges = () => {
    if (!isUnifiedProfile) {
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
          <Shield className="w-3 h-3 mr-1" />
          Admin Only
        </Badge>
      );
    }

    return (
      <div className="flex flex-wrap gap-1">
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
          <User className="w-3 h-3 mr-1" />
          Customer
        </Badge>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
          <Store className="w-3 h-3 mr-1" />
          Vendor
        </Badge>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
          <Shield className="w-3 h-3 mr-1" />
          Admin
        </Badge>
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300">
          <img src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" alt="Divine Mobile" className="w-3 h-3 mr-1" />
          Unified
        </Badge>
      </div>
    );
  };

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-green-800 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Authentication Status
          </h3>
          
          <div className="space-y-1">
            <p className="text-sm text-green-700">
              <strong>Logged in as:</strong> {userName}
            </p>
            <p className="text-sm text-green-700">
              <strong>Account Type:</strong> {userType.toUpperCase()}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-green-600 font-medium">Access Privileges:</p>
            {getAccessBadges()}
          </div>
        </div>

        {isUnifiedProfile && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-xs text-orange-700">
              🌟 <strong>Unified Profile Active</strong> - You have maximum access privileges across all portals (Customer, Vendor & Admin)
            </p>
          </div>
        )}

        <Button 
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          size="sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Secure Logout
        </Button>
        
        <p className="text-xs text-gray-600 text-center">
          Your credentials are remembered for easy re-login
        </p>
      </CardContent>
    </Card>
  );
};

export default LogoutSection;
