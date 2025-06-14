
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Store, 
  Shield, 
  RefreshCw,
  User,
  Settings 
} from 'lucide-react';
import { useUnifiedAuth } from '@/hooks/useUnifiedAuth';

const UnifiedProfileSwitcher = () => {
  const { currentUser, isUnifiedProfile, switchToUserType } = useUnifiedAuth();
  const [isSwitching, setIsSwitching] = useState(false);

  if (!isUnifiedProfile || !currentUser) {
    return null;
  }

  const handleSwitch = async (newType: 'customer' | 'vendor' | 'admin') => {
    setIsSwitching(true);
    const success = switchToUserType(newType);
    
    if (success) {
      setTimeout(() => {
        window.location.href = `/portal?tab=${newType === 'customer' ? 'onecard' : newType === 'admin' ? 'admin' : 'vendor'}`;
      }, 1000);
    }
    
    setIsSwitching(false);
  };

  const profileTypes = [
    {
      type: 'customer' as const,
      label: 'Customer',
      icon: User,
      description: 'OneCard & Smart Deals',
      color: 'bg-green-100 text-green-700 border-green-300'
    },
    {
      type: 'vendor' as const,
      label: 'Vendor',
      icon: Store,
      description: 'Business Portal',
      color: 'bg-blue-100 text-blue-700 border-blue-300'
    },
    {
      type: 'admin' as const,
      label: 'Admin',
      icon: Shield,
      description: 'Control Panel',
      color: 'bg-purple-100 text-purple-700 border-purple-300'
    }
  ];

  return (
    <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <RefreshCw className="w-4 h-4 text-orange-600" />
            <span className="font-semibold text-sm text-orange-800">Unified Profile Access</span>
            <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
              Active
            </Badge>
          </div>

          <div className="text-xs text-orange-700 mb-3">
            Current: <span className="font-medium capitalize">{currentUser.userType}</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {profileTypes.map((profile) => {
              const Icon = profile.icon;
              const isCurrent = profile.type === currentUser.userType;
              
              return (
                <Button
                  key={profile.type}
                  variant={isCurrent ? "default" : "outline"}
                  size="sm"
                  onClick={() => !isCurrent && handleSwitch(profile.type)}
                  disabled={isCurrent || isSwitching}
                  className={`justify-start h-auto p-2 ${isCurrent ? profile.color : 'hover:bg-gray-50'}`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <div className="text-left flex-1">
                    <div className="font-medium text-xs">{profile.label}</div>
                    <div className="text-xs opacity-75">{profile.description}</div>
                  </div>
                  {isCurrent && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Current
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnifiedProfileSwitcher;
