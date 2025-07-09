import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  Phone,
  CreditCard,
  Settings,
  FileText,
  MessageSquare,
  Bell,
  Edit,
  Trash2,
  MoreHorizontal,
  Filter,
  Download,
  Upload,
  Eye,
  Lock,
  Unlock,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe
} from 'lucide-react';

export default function SubscriberManagementConsole() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);

  const subscribers = [
    {
      id: 'SUB001',
      msisdn: '+27821234567',
      imsi: '655010123456789',
      iccid: '8927102345678901234',
      name: 'John Doe',
      email: 'john.doe@email.com',
      status: 'active',
      plan: 'Premium Voice & Data',
      balance: 245.50,
      lastActivity: '2024-01-09 14:30',
      kyc: 'verified',
      rica: 'compliant',
      sim_status: 'active',
      network: '4G'
    },
    {
      id: 'SUB002',
      msisdn: '+27829876543',
      imsi: '655010987654321',
      iccid: '8927109876543210987',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      status: 'suspended',
      plan: 'Basic Data',
      balance: 12.80,
      lastActivity: '2024-01-08 09:15',
      kyc: 'pending',
      rica: 'pending',
      sim_status: 'suspended',
      network: '3G'
    },
    {
      id: 'SUB003',
      msisdn: '+27835551234',
      imsi: '655010555123456',
      iccid: '8927105551234567890',
      name: 'Mike Johnson',
      email: 'mike.j@email.com',
      status: 'active',
      plan: 'IoT Data Only',
      balance: 89.30,
      lastActivity: '2024-01-09 16:45',
      kyc: 'verified',
      rica: 'compliant',
      sim_status: 'active',
      network: '5G'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'suspended': return 'bg-yellow-500';
      case 'terminated': return 'bg-red-500';
      case 'pending': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getComplianceColor = (status) => {
    switch (status) {
      case 'verified':
      case 'compliant': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredSubscribers = subscribers.filter(sub => {
    const matchesSearch = sub.msisdn.includes(searchQuery) || 
                         sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sub.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || sub.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Subscriber Management</h2>
          <p className="text-muted-foreground">Unified subscriber profile and lifecycle management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Users className="w-4 h-4 mr-2" />
            Add Subscriber
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by MSISDN, name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="terminated">Terminated</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847,392</div>
            <p className="text-xs text-muted-foreground">+180 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,695,847</div>
            <p className="text-xs text-muted-foreground">94.7% active rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <UserX className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98,234</div>
            <p className="text-xs text-muted-foreground">3.4% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending KYC</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">53,311</div>
            <p className="text-xs text-muted-foreground">1.9% pending</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscriber Profiles</CardTitle>
          <CardDescription>
            Comprehensive subscriber data and quick actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSubscribers.map((subscriber) => (
              <div key={subscriber.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(subscriber.status)}`}></div>
                    <div>
                      <h4 className="font-semibold">{subscriber.name}</h4>
                      <p className="text-sm text-muted-foreground">{subscriber.msisdn}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{subscriber.plan}</Badge>
                    <Badge variant="secondary">{subscriber.network}</Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 lg:grid-cols-6 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">IMSI</span>
                    <p className="font-mono text-xs">{subscriber.imsi}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ICCID</span>
                    <p className="font-mono text-xs">{subscriber.iccid.slice(0, 12)}...</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Balance</span>
                    <p className="font-medium">R{subscriber.balance}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">KYC Status</span>
                    <p className={`font-medium ${getComplianceColor(subscriber.kyc)}`}>
                      {subscriber.kyc}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">RICA Status</span>
                    <p className={`font-medium ${getComplianceColor(subscriber.rica)}`}>
                      {subscriber.rica}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Activity</span>
                    <p className="text-xs">{subscriber.lastActivity}</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <CreditCard className="w-3 h-3 mr-1" />
                    Billing
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    SIM Swap
                  </Button>
                  {subscriber.status === 'active' ? (
                    <Button variant="outline" size="sm">
                      <Lock className="w-3 h-3 mr-1" />
                      Suspend
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Unlock className="w-3 h-3 mr-1" />
                      Activate
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="lifecycle" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lifecycle">Lifecycle Management</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="lifecycle" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Contract Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Expiring Contracts (30 days)</span>
                  <Badge variant="destructive">1,247</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Upgrade Eligible</span>
                  <Badge variant="default">8,935</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Renewal Due</span>
                  <Badge variant="secondary">2,456</Badge>
                </div>
                <Button className="w-full" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Manage Contracts
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Compliance Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    1,234 subscribers require RICA compliance update
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    567 KYC verifications pending review
                  </AlertDescription>
                </Alert>
                <Button className="w-full" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Compliance Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Operations</CardTitle>
              <CardDescription>
                Perform mass updates and operations on subscriber groups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Bell className="w-6 h-6 mb-2" />
                  Send Notifications
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <CreditCard className="w-6 h-6 mb-2" />
                  Update Billing
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Settings className="w-6 h-6 mb-2" />
                  Change Plans
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Lock className="w-6 h-6 mb-2" />
                  Suspend/Activate
                </Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Recent Bulk Operations</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Plan upgrade - Premium customers</span>
                    <Badge variant="default">Completed</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>SMS notification - Payment due</span>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>SIM replacement batch</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Churn Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">2.3%</div>
                  <p className="text-sm text-muted-foreground">Monthly Churn Rate</p>
                </div>
                <div className="mt-4 text-sm">
                  <div className="flex justify-between">
                    <span>High Risk</span>
                    <span>1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medium Risk</span>
                    <span>5,678</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Low Risk</span>
                    <span>2,840,480</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Voice Usage</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Data Usage</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>SMS Usage</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold">R148.50</div>
                  <p className="text-sm text-muted-foreground">ARPU (Average Revenue Per User)</p>
                </div>
                <div className="mt-4 text-sm">
                  <div className="flex justify-between">
                    <span>Premium Plans</span>
                    <span>R285</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard Plans</span>
                    <span>R125</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Basic Plans</span>
                    <span>R65</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation Rules</CardTitle>
              <CardDescription>
                Configure automated workflows for subscriber management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Auto-suspend on payment failure</h4>
                  <Badge variant="default">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Suspend services after 7 days of payment failure
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Welcome SMS for new subscribers</h4>
                  <Badge variant="default">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Send welcome message and setup instructions
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Contract renewal reminders</h4>
                  <Badge variant="secondary">Paused</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Notify subscribers 30 days before contract expiry
                </p>
              </div>
              <Button className="w-full" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Create New Rule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}