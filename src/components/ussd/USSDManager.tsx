import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Smartphone, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Wifi, 
  Power,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Shield,
  History,
  Send
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OnboardingStats {
  totalActivations: number;
  successfulActivations: number;
  failedActivations: number;
  activeUsers: number;
}

interface USSDTransaction {
  id: string;
  msisdn: string;
  ussdCode: string;
  action: string;
  amount?: number;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
}

const USSDManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('onboarding');
  const [stats, setStats] = useState<OnboardingStats>({
    totalActivations: 1247,
    successfulActivations: 1198,
    failedActivations: 49,
    activeUsers: 1150
  });

  const [recentTransactions, setRecentTransactions] = useState<USSDTransaction[]>([
    {
      id: '1',
      msisdn: '+27821234567',
      ussdCode: '*123#',
      action: 'SIM Activation',
      status: 'success',
      timestamp: '2 minutes ago'
    },
    {
      id: '2',
      msisdn: '+27829876543',
      ussdCode: '*102*50#',
      action: 'Buy Airtime',
      amount: 50,
      status: 'success',
      timestamp: '5 minutes ago'
    },
    {
      id: '3',
      msisdn: '+27825551234',
      ussdCode: '*103*100#',
      action: 'Buy Data',
      amount: 100,
      status: 'pending',
      timestamp: '8 minutes ago'
    }
  ]);

  // Customer Onboarding Panel
  const CustomerOnboardingPanel = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Activations</p>
                <p className="text-2xl font-bold">{stats.totalActivations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Successful</p>
                <p className="text-2xl font-bold text-green-600">{stats.successfulActivations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-red-600">{stats.failedActivations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wifi className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-blue-600">{stats.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onboarding Flow Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Power className="w-5 h-5 mr-2" />
            Automatic SIM Activation Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Activation USSD Code</label>
              <Input value="*123#" readOnly className="bg-muted" />
            </div>
            <div>
              <label className="text-sm font-medium">Welcome Message</label>
              <Input value="Welcome to Divine Mobile!" placeholder="Enter welcome message..." />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Onboarding Languages</label>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="default">English</Badge>
              <Badge variant="secondary">isiZulu</Badge>
              <Badge variant="secondary">Afrikaans</Badge>
              <Badge variant="secondary">Setswana</Badge>
              <Button variant="outline" size="sm">+ Add Language</Button>
            </div>
          </div>
          
          <Button className="w-full">Update Configuration</Button>
        </CardContent>
      </Card>

      {/* Recent Activations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent SIM Activations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.filter(t => t.action === 'SIM Activation').map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.status === 'success' ? 'bg-green-500' : 
                    transaction.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <p className="font-medium">{transaction.msisdn}</p>
                    <p className="text-sm text-muted-foreground">{transaction.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={transaction.status === 'success' ? 'default' : 'destructive'}>
                    {transaction.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">{transaction.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Airtime & Data Purchase Panel
  const AirtimeDataPanel = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            USSD Purchase Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Airtime Purchase Code</label>
              <Input value="*102*[amount]#" readOnly className="bg-muted" />
            </div>
            <div>
              <label className="text-sm font-medium">Data Purchase Code</label>
              <Input value="*103*[amount]#" readOnly className="bg-muted" />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Available Denominations</label>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">R5</Badge>
              <Badge variant="outline">R10</Badge>
              <Badge variant="outline">R20</Badge>
              <Badge variant="outline">R50</Badge>
              <Badge variant="outline">R100</Badge>
              <Badge variant="outline">R200</Badge>
              <Button variant="outline" size="sm">+ Add Amount</Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Payment Methods</label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between p-2 border rounded">
                <span>Mobile Money (EFT)</span>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <span>Voucher System</span>
                <Badge variant="secondary">Inactive</Badge>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <span>Bank Transfer</span>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Today's Revenue</p>
                <p className="text-2xl font-bold">R12,450</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold">248</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">98.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Purchases */}
      <Card>
        <CardHeader>
          <CardTitle>Recent USSD Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.status === 'success' ? 'bg-green-500' : 
                    transaction.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <p className="font-medium">{transaction.msisdn}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.action} {transaction.amount && `- R${transaction.amount}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={transaction.status === 'success' ? 'default' : 'destructive'}>
                    {transaction.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">{transaction.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Analytics & Reports Panel
  const AnalyticsPanel = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            USSD System Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">87%</p>
              <p className="text-sm text-muted-foreground">Activation Success</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">2.3s</p>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">1,247</p>
              <p className="text-sm text-muted-foreground">Daily Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">94%</p>
              <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Most Used USSD Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge variant="outline">*123#</Badge>
                <span>SIM Activation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge variant="outline">*102#</Badge>
                <span>Buy Airtime</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <span className="text-sm text-muted-foreground">72%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge variant="outline">*101#</Badge>
                <span>Check Balance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
                <span className="text-sm text-muted-foreground">68%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="w-full">
              Export Activation Logs
            </Button>
            <Button variant="outline" className="w-full">
              Export Transaction Report
            </Button>
            <Button variant="outline" className="w-full">
              Export Analytics Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Security & Management Panel
  const SecurityPanel = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            USSD Security Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Session Timeout (minutes)</label>
              <Input type="number" value="5" />
            </div>
            <div>
              <label className="text-sm font-medium">Max PIN Attempts</label>
              <Input type="number" value="3" />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Encryption Level</label>
            <Select defaultValue="aes256">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aes128">AES-128</SelectItem>
                <SelectItem value="aes256">AES-256</SelectItem>
                <SelectItem value="rsa2048">RSA-2048</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Require SMS OTP for transactions</p>
            </div>
            <Badge variant="default">Enabled</Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Fraud Detection</p>
              <p className="text-sm text-muted-foreground">Monitor suspicious activity patterns</p>
            </div>
            <Badge variant="default">Active</Badge>
          </div>
        </CardContent>
      </Card>

      {/* USSD Code Management */}
      <Card>
        <CardHeader>
          <CardTitle>USSD Code Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-mono font-medium">*123#</p>
                <p className="text-sm text-muted-foreground">SIM Activation & Onboarding</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-mono font-medium">*102#</p>
                <p className="text-sm text-muted-foreground">Airtime Purchase Menu</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-mono font-medium">*103#</p>
                <p className="text-sm text-muted-foreground">Data Bundle Menu</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </div>
          
          <Button className="w-full">+ Add New USSD Code</Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Smartphone className="w-8 h-8 mr-3 text-primary" />
            USSD Manager
          </h1>
          <p className="text-muted-foreground">Divine Mobile GSM Customer Onboarding & Management</p>
        </div>
        <Badge variant="default" className="text-sm">
          <Wifi className="w-4 h-4 mr-1" />
          System Active
        </Badge>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="onboarding" className="flex items-center">
            <Power className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Onboarding</span>
            <span className="sm:hidden">Setup</span>
          </TabsTrigger>
          <TabsTrigger value="purchases" className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Purchases</span>
            <span className="sm:hidden">Pay</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Analytics</span>
            <span className="sm:hidden">Stats</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Security</span>
            <span className="sm:hidden">Config</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="onboarding" className="mt-6">
          <CustomerOnboardingPanel />
        </TabsContent>

        <TabsContent value="purchases" className="mt-6">
          <AirtimeDataPanel />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsPanel />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <SecurityPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default USSDManager;