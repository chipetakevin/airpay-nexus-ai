import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRoleBasedAccess } from '@/hooks/useRoleBasedAccess';
import { Shield, Users, CreditCard, Settings, FileText, Package } from 'lucide-react';

export const RoleBasedAccessSummary = () => {
  const { permissions, getRoleDisplayName, user, loading } = useRoleBasedAccess();

  if (loading) {
    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-blue-600">Loading access permissions...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="mb-4 border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Guest Access - Limited Features</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getRoleColor = (role: string | null) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'vendor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'customer': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAccessibleFeatures = () => {
    const features = [];
    
    // Basic features for all authenticated users
    features.push({ icon: <Package className="w-4 h-4" />, name: 'Smart Deals', description: 'View and purchase deals' });
    features.push({ icon: <CreditCard className="w-4 h-4" />, name: 'OneCard', description: 'Manage your digital card' });

    // Vendor-specific features
    if (permissions.canAccessVendorFeatures) {
      features.push({ icon: <Users className="w-4 h-4" />, name: 'Vendor Dashboard', description: 'Manage business operations' });
      features.push({ icon: <Settings className="w-4 h-4" />, name: 'USSD Manager', description: 'GSM onboarding tools' });
    }

    // Admin-specific features
    if (permissions.canAccessAdminFeatures) {
      features.push({ icon: <Shield className="w-4 h-4" />, name: 'Control Center', description: 'Full system administration' });
      features.push({ icon: <FileText className="w-4 h-4" />, name: 'Reports & Analytics', description: 'Advanced reporting tools' });
      features.push({ icon: <Settings className="w-4 h-4" />, name: 'User Management', description: 'Manage all user accounts' });
      features.push({ icon: <Package className="w-4 h-4" />, name: 'Payroll System', description: 'Addex Pay administration' });
    }

    return features;
  };

  return (
    <Card className="mb-4 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Access Level
          </CardTitle>
          <Badge className={getRoleColor(permissions.role)}>
            {getRoleDisplayName(permissions.role)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600">
          Welcome back, <span className="font-medium">{user.user_metadata?.firstName || user.email?.split('@')[0] || 'User'}</span>! 
          You have access to the following features:
        </div>
        
        <div className="grid gap-2">
          {getAccessibleFeatures().map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
              <div className="text-blue-600">{feature.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-sm">{feature.name}</div>
                <div className="text-xs text-gray-500">{feature.description}</div>
              </div>
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                ✓ Enabled
              </Badge>
            </div>
          ))}
        </div>

        {permissions.role === 'customer' && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Customer Benefits:</strong> Access to exclusive deals, OneCard rewards, and personalized offers.
            </p>
          </div>
        )}

        {permissions.role === 'vendor' && (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <strong>Vendor Benefits:</strong> Manage your deals, track sales, access business analytics, and utilize GSM onboarding tools.
            </p>
          </div>
        )}

        {permissions.role === 'admin' && (
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <p className="text-sm text-red-800">
              <strong>Administrator Privileges:</strong> Full system access including user management, advanced reports, payroll administration, and platform control.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};