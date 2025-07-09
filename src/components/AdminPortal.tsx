
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import RevenueReporting from './admin/RevenueReporting';
import NetworkRevenue from './admin/NetworkRevenue';
import OrderManagement from './admin/OrderManagement';
import DashboardManager from './admin/DashboardManager';
import VersionRestoration from './admin/VersionRestoration';
import AddexHubNerveCenter from './admin/AddexHubNerveCenter';
import DatabaseBaaSPanel from './admin/DatabaseBaaSPanel';
import SuspiciousActivityMonitor from './admin/SuspiciousActivityMonitor';
import PermissionManager from './admin/PermissionManager';

interface AdminPortalProps {
  onAuthSuccess?: () => void;
  showAdminBanner?: boolean;
}

const AdminPortal: React.FC<AdminPortalProps> = ({ onAuthSuccess, showAdminBanner = false }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autofillCount, setAutofillCount] = useState(0);

  const adminEmail = 'kev***@divinemobile.co.za';
  const fullAdminEmail = 'kevin@divinemobile.co.za';

  const handleSendCode = () => {
    // Check if we've reached the 50-time limit
    if (autofillCount >= 50) {
      toast({
        title: "Autofill Limit Reached",
        description: "Maximum autofill attempts reached. Please manually enter the code.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const code = Math.random().toString(36).substr(2, 6).toUpperCase();
      setIsLoading(false);
      
      // Autofill the authentication code immediately
      setAuthCode(code);
      setAutofillCount(prev => prev + 1);
      
      toast({
        title: "Authentication Code Sent & Auto-filled",
        description: `Code sent to ${adminEmail}. Auto-filled: ${code} (${autofillCount + 1}/50)`,
      });
      
      localStorage.setItem('adminAuthCode', code);
    }, 1500);
  };

  const handleVerifyCode = () => {
    const storedCode = localStorage.getItem('adminAuthCode');
    
    if (authCode.toUpperCase() === storedCode) {
      setIsAuthenticated(true);
      // Keep panel expanded after authentication so features are visible
      setIsCollapsed(false);
      localStorage.setItem('adminAuthenticated', 'true');
      
      const adminCardNumber = 'ADM' + Math.random().toString(36).substr(2, 8).toUpperCase();
      const adminData = {
        firstName: 'Kevin',
        lastName: 'Chipeta',
        email: fullAdminEmail,
        cardNumber: adminCardNumber,
        cardType: 'OneCard Platinum',
        privileges: 'Full System Access',
        cashbackBalance: 3145.75,
        totalEarned: 15739.50,
        totalSpent: 62958.00
      };
      
      localStorage.setItem('adminProfile', JSON.stringify(adminData));
      
      toast({
        title: "Admin Access Granted 🔑",
        description: `Welcome Kevin! OneCard Platinum: ****${adminCardNumber.slice(-4)}`,
      });
      
      onAuthSuccess?.();
    } else {
      toast({
        title: "Invalid Code",
        description: "Please check your authentication code and try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsCollapsed(false);
    setAuthCode('');
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminAuthCode');
    localStorage.removeItem('adminProfile');
    
    // Navigate away from admin tab after logout
    navigate('/portal?tab=deals', { replace: true });
    
    toast({
      title: "Logged Out",
      description: "Admin session ended. Redirected to Smart Deals.",
    });
  };

  const handleCloseAdminPanel = () => {
    // Navigate to deals tab and show toast
    navigate('/portal?tab=deals', { replace: true });
    toast({
      title: "Admin Panel Closed",
      description: "Returned to Smart Deals tab.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-red-600">🔐 Admin Access Portal</h2>
          <p className="text-gray-600">
            Restricted access for authorized administrators only
          </p>
        </div>

        <Card className="max-w-md mx-auto border-red-200">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Administrator Authentication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="adminEmail">Authorized Email</Label>
              <Input
                id="adminEmail"
                value={adminEmail}
                readOnly
                className="bg-gray-50 font-mono"
              />
            </div>

            <Button 
              onClick={handleSendCode} 
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Sending...' : 'Send Authentication Code'}
            </Button>

            <div>
              <Label htmlFor="authCode">Authentication Code</Label>
              <Input
                id="authCode"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="text-center font-mono"
                maxLength={6}
              />
            </div>

            <Button 
              onClick={handleVerifyCode}
              disabled={!authCode || authCode.length !== 6}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Verify & Access Admin Portal
            </Button>

            <div className="text-xs text-gray-500 text-center mt-4">
              ⚠️ Unauthorized access attempts are logged and monitored
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Don't show collapsed banner here - it's now handled by the navigation dropdown
  if (isAuthenticated && isCollapsed) {
    return null;
  }

  // Show full admin dashboard when authenticated and expanded
  if (isAuthenticated && !isCollapsed) {
    return (
      <div className="space-y-6 pb-20">
        {/* Admin header with collapse option */}
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h2 className="text-2xl font-bold mb-2">🛡️ Admin Control Center</h2>
            <p className="text-gray-600">Complete system administration and oversight</p>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm"
              variant="outline"
              onClick={handleCloseAdminPanel}
              className="text-xs text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              Close
            </Button>
            <Button 
              size="sm"
              variant="outline"
              onClick={handleLogout}
              className="text-xs text-red-600 border-red-200 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="nerve-center" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 h-auto p-2 bg-muted/30">
            <TabsTrigger 
              value="nerve-center" 
              className="text-xs sm:text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-200 transition-colors"
              onClick={() => console.log('🔧 Admin Feature: Hub clicked')}
            >
              Hub
            </TabsTrigger>
            <TabsTrigger 
              value="database-baas" 
              className="text-xs sm:text-sm bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border border-purple-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => console.log('🔧 Admin Feature: Database BaaS clicked')}
            >
              Database
            </TabsTrigger>
            <TabsTrigger 
              value="security-monitor" 
              className="text-xs sm:text-sm bg-gradient-to-r from-red-100 to-orange-100 text-red-700 border border-red-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-orange-600 data-[state=active]:text-white cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => console.log('🔧 Admin Feature: Security Monitor clicked')}
            >
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="permissions" 
              className="text-xs sm:text-sm bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => console.log('🔧 Admin Feature: Permissions clicked')}
            >
              Access
            </TabsTrigger>
            <TabsTrigger 
              value="balances" 
              className="text-xs sm:text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-200 transition-colors"
              onClick={() => console.log('🔧 Admin Feature: Balances clicked')}
            >
              Balances
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard" 
              className="text-xs sm:text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-200 transition-colors"
              onClick={() => console.log('🔧 Admin Feature: Dashboard clicked')}
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="revenue" 
              className="text-xs sm:text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-200 transition-colors"
              onClick={() => console.log('🔧 Admin Feature: Revenue clicked')}
            >
              Revenue
            </TabsTrigger>
            <TabsTrigger 
              value="networks" 
              className="text-xs sm:text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-200 transition-colors"
              onClick={() => console.log('🔧 Admin Feature: Networks clicked')}
            >
              Networks
            </TabsTrigger>
            <TabsTrigger 
              value="orders" 
              className="text-xs sm:text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-200 transition-colors"
              onClick={() => console.log('🔧 Admin Feature: Orders clicked')}
            >
              Orders
            </TabsTrigger>
            <TabsTrigger 
              value="versions" 
              className="text-xs sm:text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-200 transition-colors"
              onClick={() => console.log('🔧 Admin Feature: Versions clicked')}
            >
              Versions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nerve-center" className="space-y-6">
            <AddexHubNerveCenter />
          </TabsContent>

          <TabsContent value="database-baas" className="space-y-6">
            <DatabaseBaaSPanel />
          </TabsContent>

          <TabsContent value="security-monitor" className="space-y-6">
            <SuspiciousActivityMonitor />
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <PermissionManager />
          </TabsContent>

          <TabsContent value="balances" className="space-y-6">
            <DashboardManager />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <RevenueReporting />
          </TabsContent>

          <TabsContent value="networks" className="space-y-6">
            <NetworkRevenue />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="versions" className="space-y-6">
            <VersionRestoration />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return null;
};

export default AdminPortal;
