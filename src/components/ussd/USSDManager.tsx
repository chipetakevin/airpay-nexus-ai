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
  Send,
  Code,
  Database,
  Globe,
  Menu,
  Lock,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Search,
  Filter,
  Eye,
  EyeOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUSSDData } from '@/hooks/useUSSDData';
import MenuBuilder from './MenuBuilder';
import AdvancedCustomerSearch from './AdvancedCustomerSearch';
import AnalyticsDashboard from './AnalyticsDashboard';
import RealTimeSessionManager from './RealTimeSessionManager';

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
  const [activeTab, setActiveTab] = useState('codes-management');
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

  // USSD Codes Management Panel
  const USSDCodesManagement = () => (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">USSD Codes Management</h2>
        <Button className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add New USSD Code
        </Button>
      </div>

      {/* Add/Edit USSD Code Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-5 h-5 mr-2" />
            USSD Code Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">USSD Code</label>
              <Input placeholder="*120*123#" />
            </div>
            <div>
              <label className="text-sm font-medium">Service Name</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balance">Balance Inquiry</SelectItem>
                  <SelectItem value="topup">Airtime Top-up</SelectItem>
                  <SelectItem value="data">Data Bundles</SelectItem>
                  <SelectItem value="banking">Banking Services</SelectItem>
                  <SelectItem value="activation">SIM Activation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Menu Structure</label>
            <Textarea 
              placeholder="1. Check Balance&#10;2. Buy Airtime&#10;3. Buy Data&#10;4. Help" 
              rows={4}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Platform Assignment</label>
            <div className="flex flex-wrap gap-4 mt-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked />
                <span>GSM</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked />
                <span>WhatsApp</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked />
                <span>Website</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Status</span>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Reset</Button>
              <Button>Save Configuration</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing USSD Codes */}
      <Card>
        <CardHeader>
          <CardTitle>Active USSD Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { code: '*123#', service: 'SIM Activation & Onboarding', platforms: ['GSM', 'WhatsApp'], status: 'Active' },
              { code: '*102#', service: 'Airtime Purchase Menu', platforms: ['GSM', 'Website'], status: 'Active' },
              { code: '*103#', service: 'Data Bundle Menu', platforms: ['GSM', 'WhatsApp', 'Website'], status: 'Active' },
              { code: '*101#', service: 'Balance Check', platforms: ['GSM'], status: 'Active' },
              { code: '*120*123#', service: 'Banking Services', platforms: ['GSM', 'Website'], status: 'Inactive' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="font-mono">{item.code}</Badge>
                    <span className="font-medium">{item.service}</span>
                    <Badge variant={item.status === 'Active' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm text-muted-foreground">Platforms:</span>
                    {item.platforms.map((platform, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{platform}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Customer Registration & Management Panel
  const CustomerManagement = () => (
    <div className="space-y-6">
      {/* Header with Search and Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Registration & Management</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search customers by phone, name, or ID..." 
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Platform Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="gsm">GSM Only</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="website">Website</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">12,847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">GSM Users</p>
                <p className="text-2xl font-bold">8,234</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp Users</p>
                <p className="text-2xl font-bold">3,421</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Website Users</p>
                <p className="text-2xl font-bold">1,192</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>Unified Customer Database</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'John Doe', phone: '+27821234567', platform: 'WhatsApp', status: 'Active', registered: '2024-01-15' },
              { name: 'Jane Smith', phone: '+27829876543', platform: 'GSM', status: 'Active', registered: '2024-01-14' },
              { name: 'Mike Johnson', phone: '+27825551234', platform: 'Website', status: 'Inactive', registered: '2024-01-13' },
              { name: 'Sarah Wilson', phone: '+27823334444', platform: 'GSM', status: 'Active', registered: '2024-01-12' },
              { name: 'David Brown', phone: '+27827778888', platform: 'WhatsApp', status: 'Suspended', registered: '2024-01-11' }
            ].map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{customer.name}</span>
                    <Badge variant="outline">{customer.phone}</Badge>
                    <Badge variant={
                      customer.platform === 'WhatsApp' ? 'default' : 
                      customer.platform === 'GSM' ? 'secondary' : 'outline'
                    }>
                      {customer.platform}
                    </Badge>
                    <Badge variant={
                      customer.status === 'Active' ? 'default' : 
                      customer.status === 'Inactive' ? 'secondary' : 'destructive'
                    }>
                      {customer.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Registered: {customer.registered}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">
                    {customer.status === 'Active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // WhatsApp Integration Management
  const WhatsAppManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">WhatsApp Business Integration</h2>
        <Badge variant="default" className="text-sm">
          <MessageSquare className="w-4 h-4 mr-1" />
          Connected
        </Badge>
      </div>

      {/* WhatsApp Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            WhatsApp Business API Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Business Phone Number</label>
              <Input value="+27123456789" readOnly className="bg-muted" />
            </div>
            <div>
              <label className="text-sm font-medium">Webhook URL</label>
              <Input value="https://api.divine.com/whatsapp/webhook" readOnly className="bg-muted" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Welcome Message Template</label>
            <Textarea 
              placeholder="Welcome to Divine Mobile! How can we help you today?&#10;1. Check Balance&#10;2. Buy Airtime&#10;3. Buy Data&#10;4. Support" 
              rows={4}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Chatbot Fallback to USSD</label>
            <div className="flex items-center space-x-2 mt-2">
              <input type="checkbox" defaultChecked />
              <span className="text-sm">Enable automatic fallback to USSD for offline users</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Active WhatsApp Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { user: '+27821234567', session: 'Airtime Purchase', status: 'Active', duration: '2m 15s' },
              { user: '+27829876543', session: 'Balance Inquiry', status: 'Completed', duration: '45s' },
              { user: '+27825551234', session: 'Data Bundle', status: 'Pending Payment', duration: '5m 30s' }
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">{session.user}</Badge>
                  <span>{session.session}</span>
                  <Badge variant={
                    session.status === 'Active' ? 'default' : 
                    session.status === 'Completed' ? 'secondary' : 'destructive'
                  }>
                    {session.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{session.duration}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Website Integration Management
  const WebsiteManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Website Integration Management</h2>
        <Button variant="outline">
          <Globe className="w-4 h-4 mr-2" />
          View Portal
        </Button>
      </div>

      {/* Website Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Website Portal Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Portal URL</label>
              <Input value="https://portal.divine.com" readOnly className="bg-muted" />
            </div>
            <div>
              <label className="text-sm font-medium">API Endpoint</label>
              <Input value="https://api.divine.com/ussd" readOnly className="bg-muted" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Platform Switching</label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between p-2 border rounded">
                <span>Allow WhatsApp to Web transitions</span>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <span>Allow USSD to Web transitions</span>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <span>Cross-platform session sharing</span>
                <Badge variant="secondary">Beta</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Web Sessions Today</p>
                <p className="text-2xl font-bold">342</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Platform Switches</p>
                <p className="text-2xl font-bold">28</p>
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
                <p className="text-2xl font-bold">96.8%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

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

      {/* Comprehensive USSD Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-1">
          <TabsTrigger value="codes-management" className="flex items-center text-xs">
            <Code className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Codes</span>
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center text-xs">
            <Users className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Customers</span>
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center text-xs">
            <MessageSquare className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">WhatsApp</span>
          </TabsTrigger>
          <TabsTrigger value="website" className="flex items-center text-xs">
            <Globe className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Website</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center text-xs">
            <BarChart3 className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center text-xs">
            <Shield className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="codes-management" className="mt-6">
          <MenuBuilder />
        </TabsContent>

        <TabsContent value="customers" className="mt-6">
          <AdvancedCustomerSearch />
        </TabsContent>

        <TabsContent value="whatsapp" className="mt-6">
          <RealTimeSessionManager />
        </TabsContent>

        <TabsContent value="website" className="mt-6">
          <WebsiteManagement />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <SecurityPanel />
        </TabsContent>

        {/* Legacy tabs for backward compatibility */}
        <TabsContent value="onboarding" className="mt-6">
          <CustomerOnboardingPanel />
        </TabsContent>

        <TabsContent value="purchases" className="mt-6">
          <AirtimeDataPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default USSDManager;