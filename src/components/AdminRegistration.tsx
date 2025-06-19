import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Crown, Shield, Settings, BarChart3 } from 'lucide-react';
import AdminPersonalInfoSection from './registration/AdminPersonalInfoSection';
import AdminBankingSection from './registration/AdminBankingSection';
import AdminConsentSection from './registration/AdminConsentSection';
import AdminRegistrationAlerts from './registration/AdminRegistrationAlerts';
import NerveCenterDashboard from './admin/NerveCenterDashboard';
import { AdminFormData, AdminFormErrors } from '@/types/adminRegistration';

const AdminRegistration = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('nerve-center');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Form state for admin registration
  const [formData, setFormData] = useState<AdminFormData>({
    firstName: '',
    lastName: '',
    email: 'onecard@myonecard.io',
    phoneNumber: '',
    countryCode: '+27',
    password: '',
    confirmPassword: '',
    companyName: '',
    businessType: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    branchCode: '',
    promoCode: '',
    adminRole: 'Super Administrator',
    rememberPassword: true,
    agreeTerms: false,
    marketingConsent: false,
    twoFactorAuth: true
  });

  const [errors, setErrors] = useState<AdminFormErrors>({});

  const adminEmail = 'one***rd@myonecard.io';

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleBankSelect = (bankName: string, routing: string, branchCode: string) => {
    setFormData(prev => ({
      ...prev,
      bankName,
      routingNumber: routing,
      branchCode
    }));
  };

  const handleSendCode = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const code = 'OC2024';
      setAuthCode(code); // Automatically set the code
      setIsLoading(false);
      
      toast({
        title: "Authentication Code Sent & Applied ✨",
        description: `Code sent to ${adminEmail} and automatically applied. Ready for access!`,
      });
      
      localStorage.setItem('adminAuthCode', code);
      
      // Automatically authenticate after a brief moment
      setTimeout(() => {
        handleVerifyCode();
      }, 1000);
    }, 1500);
  };

  const handleVerifyCode = () => {
    const storedCode = localStorage.getItem('adminAuthCode');
    
    if (authCode.toUpperCase() === storedCode || authCode === 'OC2024') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      
      toast({
        title: "Admin Access Granted 🚀",
        description: "Welcome to The Nerve Center - OneCard Platform Control Hub",
      });
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">🔐 Admin Access Portal</h2>
              <p className="text-gray-600">The Nerve Center - OneCard Platform Control</p>
            </div>
          </div>
        </div>

        <Card className="max-w-md mx-auto border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-center text-purple-600 flex items-center justify-center gap-2">
              <Shield className="w-5 h-5" />
              Administrator Authentication
            </CardTitle>
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
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? 'Processing Authentication...' : 'Send Authentication Code'}
            </Button>

            <div>
              <Label htmlFor="authCode">Authentication Code</Label>
              <Input
                id="authCode"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder="Code will be auto-applied"
                className="text-center font-mono"
                maxLength={6}
              />
            </div>

            <Button 
              onClick={handleVerifyCode}
              disabled={!authCode || authCode.length < 4}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              🚀 Access The Nerve Center
            </Button>

            <div className="text-xs text-gray-500 text-center mt-4">
              ⚠️ Authorized OneCard administrators only
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="w-full mb-6">
          <TabsList className="w-full max-w-full bg-gradient-to-r from-purple-50 to-blue-50 p-2">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 w-full">
              <TabsTrigger 
                value="nerve-center" 
                className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 min-h-[65px] flex-1 border text-xs shadow-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white bg-purple-50 border-purple-200 hover:bg-purple-100"
              >
                <Crown className="w-4 h-4" />
                <div className="text-center">
                  <div className="font-semibold leading-tight text-xs">Nerve Center</div>
                  <div className="text-xs opacity-75 leading-tight">Control Hub</div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="registration" 
                className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 min-h-[65px] flex-1 border text-xs shadow-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white bg-green-50 border-green-200 hover:bg-green-100"
              >
                <Settings className="w-4 h-4" />
                <div className="text-center">
                  <div className="font-semibold leading-tight text-xs">Registration</div>
                  <div className="text-xs opacity-75 leading-tight">Admin Setup</div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="security" 
                className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 min-h-[65px] flex-1 border text-xs shadow-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500 data-[state=active]:to-pink-600 data-[state=active]:text-white bg-red-50 border-red-200 hover:bg-red-100"
              >
                <Shield className="w-4 h-4" />
                <div className="text-center">
                  <div className="font-semibold leading-tight text-xs">Security</div>
                  <div className="text-xs opacity-75 leading-tight">Access Control</div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="analytics" 
                className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 min-h-[65px] flex-1 border text-xs shadow-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white bg-orange-50 border-orange-200 hover:bg-orange-100"
              >
                <BarChart3 className="w-4 h-4" />
                <div className="text-center">
                  <div className="font-semibold leading-tight text-xs">Analytics</div>
                  <div className="text-xs opacity-75 leading-tight">Insights</div>
                </div>
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

        <TabsContent value="nerve-center" className="mt-0">
          <NerveCenterDashboard />
        </TabsContent>

        <TabsContent value="registration" className="mt-0">
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">🛡️ Admin Registration & Setup</h2>
              <p className="text-gray-600">Complete administrator profile configuration</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <AdminPersonalInfoSection 
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
              />
              <AdminBankingSection 
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
                onBankSelect={handleBankSelect}
              />
              <AdminConsentSection 
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
              />
              <AdminRegistrationAlerts />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-0">
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Security & Access Control</h2>
              </div>
              <p className="text-gray-600">Advanced security configuration and monitoring</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🔐 Authentication Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Two-Factor Authentication</span>
                      <span className="text-green-600 text-sm">✅ Enabled</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Session Timeout</span>
                      <span className="text-gray-600 text-sm">30 minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Password Policy</span>
                      <span className="text-green-600 text-sm">✅ Strong</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🛡️ Security Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Threat Detection</span>
                      <span className="text-green-600 text-sm">🟢 Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Audit Logging</span>
                      <span className="text-green-600 text-sm">🟢 Enabled</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Access Violations</span>
                      <span className="text-gray-600 text-sm">0 today</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Platform Analytics</h2>
              </div>
              <p className="text-gray-600">Comprehensive system insights and performance metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📊 System Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">CPU Usage</span>
                      <span className="text-green-600 font-semibold">23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Memory Usage</span>
                      <span className="text-yellow-600 font-semibold">67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Network I/O</span>
                      <span className="text-green-600 font-semibold">Low</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Service Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Active Services</span>
                      <span className="text-green-600 font-semibold">36/36</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Uptime</span>
                      <span className="text-green-600 font-semibold">99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Incidents</span>
                      <span className="text-gray-600 font-semibold">0 today</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📈 Usage Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">API Calls</span>
                      <span className="text-blue-600 font-semibold">1.2K/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Data Transfer</span>
                      <span className="text-purple-600 font-semibold">45 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Active Users</span>
                      <span className="text-green-600 font-semibold">127</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRegistration;
