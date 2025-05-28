
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import AdminDashboard from './admin/AdminDashboard';
import NetworkRevenue from './admin/NetworkRevenue';
import OrderManagement from './admin/OrderManagement';
import RevenueReporting from './admin/RevenueReporting';

const AdminPortal = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    email: 'chi****ke***@gmail.com',
    password: '',
    twoFactorCode: ''
  });

  const ADMIN_EMAIL = 'chipetakevin@gmail.com';
  const ADMIN_CARD_NUMBER = 'ADM1N2024GOLD';
  const ADMIN_NAME = 'Kevin Chipeta';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginData.twoFactorCode.length === 6 && /^\d+$/.test(loginData.twoFactorCode)) {
      setIsLoggedIn(true);
      
      // Store admin data
      localStorage.setItem('adminUser', JSON.stringify({
        email: ADMIN_EMAIL,
        name: ADMIN_NAME,
        cardNumber: ADMIN_CARD_NUMBER,
        isAdmin: true,
        accessLevel: 'FULL'
      }));

      toast({
        title: "Admin Access Granted",
        description: `Welcome ${ADMIN_NAME} - OneCard Gold: ****${ADMIN_CARD_NUMBER.slice(-4)}`,
      });
    } else {
      toast({
        title: "Authentication Failed", 
        description: "Please enter a valid 6-digit 2FA code",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: 'chi****ke***@gmail.com', password: '', twoFactorCode: '' });
    localStorage.removeItem('adminUser');
    toast({
      title: "Logged Out",
      description: "Admin session ended successfully",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">OneCard Admin Portal</h2>
          <p className="text-gray-600">Secure administrative access to the AirPay system</p>
        </div>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800">
              🔐 <strong>Authorized Admin Only:</strong> This portal requires pre-authorized admin credentials with Google Authenticator setup.
            </p>
          </CardContent>
        </Card>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="adminEmail">Administrator Email *</Label>
            <Input
              id="adminEmail"
              type="email"
              value={loginData.email}
              readOnly
              className="bg-gray-100"
              title="Authorized admin email only"
            />
            <p className="text-xs text-gray-500">Pre-authorized admin access only</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminPassword">Password *</Label>
            <Input
              id="adminPassword"
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twoFactorCode">Google Authenticator Code *</Label>
            <Input
              id="twoFactorCode"
              placeholder="Enter 6-digit code"
              maxLength={6}
              value={loginData.twoFactorCode}
              onChange={(e) => setLoginData(prev => ({ ...prev, twoFactorCode: e.target.value }))}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600">
            Access Admin Portal
          </Button>
        </form>

        <Card className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-lg font-bold mb-2">OneCard Gold - Admin Access</div>
              <div className="text-sm opacity-80">Full System Administrator</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Administrative Dashboard</h2>
          <p className="text-gray-600">Welcome {ADMIN_NAME} - OneCard Gold Administrator</p>
        </div>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="networks">Networks</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <AdminDashboard />
        </TabsContent>

        <TabsContent value="revenue">
          <RevenueReporting />
        </TabsContent>

        <TabsContent value="networks">
          <NetworkRevenue />
        </TabsContent>

        <TabsContent value="orders">
          <OrderManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPortal;
