
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AdminPortal = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    twoFactorCode: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginData.twoFactorCode.length === 6 && /^\d+$/.test(loginData.twoFactorCode)) {
      setIsLoggedIn(true);
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the AirPay administration portal",
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
    setLoginData({ email: '', password: '', twoFactorCode: '' });
    toast({
      title: "Logged Out",
      description: "Admin session ended successfully",
    });
  };

  const redirectToSection = (section: string) => {
    toast({
      title: `Redirecting to ${section}`,
      description: `This would typically redirect to the ${section} management section`,
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
              ⚠️ <strong>Two-Factor Authentication Required:</strong> Admin access requires Google Authenticator setup for enhanced security.
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
              onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
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

          <Button type="submit" className="w-full">
            Access Admin Portal
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Administrative Dashboard</h2>
          <p className="text-gray-600">Welcome to the AirPay portal management system</p>
        </div>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏦 Customer Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Manage customer accounts, view balances, and handle support tickets
            </p>
            <Button 
              className="w-full" 
              onClick={() => redirectToSection('Customer Management')}
            >
              Manage Customers
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💳 OneCard Administration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Monitor cashback allocations, card status, and reward distributions
            </p>
            <Button 
              className="w-full" 
              onClick={() => redirectToSection('OneCard Administration')}
            >
              Manage OneCards
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Analytics & Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              View system analytics, transaction reports, and performance metrics
            </p>
            <Button 
              className="w-full" 
              onClick={() => redirectToSection('Analytics & Reports')}
            >
              View Reports
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚙️ System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Configure USSD settings, cashback rates, and system parameters
            </p>
            <Button 
              className="w-full" 
              onClick={() => redirectToSection('System Configuration')}
            >
              System Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔐 Security Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Manage admin users, audit logs, and security policies
            </p>
            <Button 
              className="w-full" 
              onClick={() => redirectToSection('Security Management')}
            >
              Security Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📱 USSD Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Configure USSD codes, menu structures, and service availability
            </p>
            <Button 
              className="w-full" 
              onClick={() => redirectToSection('USSD Management')}
            >
              Manage USSD
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPortal;
