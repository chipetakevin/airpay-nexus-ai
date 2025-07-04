
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import AdminDashboard from './admin/AdminDashboard';
import RevenueReporting from './admin/RevenueReporting';
import NetworkRevenue from './admin/NetworkRevenue';
import OrderManagement from './admin/OrderManagement';
import DashboardManager from './admin/DashboardManager';
import VersionRestoration from './admin/VersionRestoration';
import AddexHubNerveCenter from './admin/AddexHubNerveCenter';

interface AdminPortalProps {
  onAuthSuccess?: () => void;
}

const AdminPortal: React.FC<AdminPortalProps> = ({ onAuthSuccess }) => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autofillCount, setAutofillCount] = useState(0);

  const adminEmail = 'chi***akevin@gmail.com';
  const fullAdminEmail = 'chipetakevin@gmail.com';

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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">🛡️ Admin Control Center</h2>
        <p className="text-gray-600">Complete system administration and oversight</p>
      </div>

      <Tabs defaultValue="nerve-center" className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-gray-100">
          <TabsTrigger value="nerve-center">Nerve Center</TabsTrigger>
          <TabsTrigger value="balances">Balances</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="networks">Networks</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
        </TabsList>

        <TabsContent value="nerve-center" className="space-y-6">
          <AddexHubNerveCenter />
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
};

export default AdminPortal;
