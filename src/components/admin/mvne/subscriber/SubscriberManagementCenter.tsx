import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  UserPlus, 
  Settings, 
  Upload, 
  Download,
  Search,
  Filter,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Phone,
  CreditCard,
  Globe
} from 'lucide-react';

interface Subscriber {
  id: string;
  msisdn: string;
  imsi: string;
  status: 'active' | 'suspended' | 'inactive';
  mvno: string;
  plan: string;
  created: string;
  lastActivity: string;
  usage: {
    voice: number;
    sms: number;
    data: number;
  };
}

interface BulkOperation {
  id: string;
  type: 'activation' | 'migration' | 'suspension' | 'data_update';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  total: number;
  processed: number;
  created: string;
  mvno: string;
}

const SubscriberManagementCenter = () => {
  const [totalSubscribers, setTotalSubscribers] = useState(1247893);
  const [activeSubscribers, setActiveSubscribers] = useState(1198456);
  const [bulkOperations, setBulkOperations] = useState(3);

  const subscribers: Subscriber[] = [
    {
      id: 'SUB001',
      msisdn: '27821234567',
      imsi: '655010123456789',
      status: 'active',
      mvno: 'EduConnect',
      plan: 'Student Basic',
      created: '2024-12-15',
      lastActivity: '2 hours ago',
      usage: { voice: 45, sms: 23, data: 67 }
    },
    {
      id: 'SUB002',
      msisdn: '27831234568',
      imsi: '655010123456790',
      status: 'active',
      mvno: 'YouthMobile',
      plan: 'Youth Unlimited',
      created: '2024-12-10',
      lastActivity: '15 min ago',
      usage: { voice: 78, sms: 156, data: 89 }
    },
    {
      id: 'SUB003',
      msisdn: '27841234569',
      imsi: '655010123456791',
      status: 'suspended',
      mvno: 'BizConnect',
      plan: 'Business Pro',
      created: '2024-11-28',
      lastActivity: '3 days ago',
      usage: { voice: 12, sms: 5, data: 0 }
    },
    {
      id: 'SUB004',
      msisdn: '27851234570',
      imsi: '655010123456792',
      status: 'active',
      mvno: 'FamilyLink',
      plan: 'Family Share',
      created: '2024-12-20',
      lastActivity: '1 hour ago',
      usage: { voice: 34, sms: 67, data: 45 }
    }
  ];

  const bulkOps: BulkOperation[] = [
    {
      id: 'BULK001',
      type: 'activation',
      status: 'processing',
      total: 5000,
      processed: 3456,
      created: '2025-01-06 10:30',
      mvno: 'EduConnect'
    },
    {
      id: 'BULK002',
      type: 'migration',
      status: 'completed',
      total: 2500,
      processed: 2500,
      created: '2025-01-05 14:15',
      mvno: 'YouthMobile'
    },
    {
      id: 'BULK003',
      type: 'data_update',
      status: 'pending',
      total: 8000,
      processed: 0,
      created: '2025-01-06 11:45',
      mvno: 'BizConnect'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'suspended':
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'inactive':
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'processing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'activation':
        return <UserPlus className="w-4 h-4 text-green-600" />;
      case 'migration':
        return <RefreshCw className="w-4 h-4 text-blue-600" />;
      case 'suspension':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'data_update':
        return <Settings className="w-4 h-4 text-purple-600" />;
      default:
        return <Settings className="w-4 h-4 text-gray-600" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSubscribers(prev => prev + Math.floor(Math.random() * 10));
      setActiveSubscribers(prev => prev + Math.floor(Math.random() * 8));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Subscriber Management Center</h2>
            <p className="text-muted-foreground">Self-service APIs, bulk operations & dynamic segmentation</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Badge className="bg-green-100 text-green-800">
            <Users className="w-4 h-4 mr-1" />
            {totalSubscribers.toLocaleString()} Total
          </Badge>
        </div>
      </div>

      {/* Subscriber Status Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              {activeSubscribers.toLocaleString()} active subscribers - {bulkOperations} bulk operations in progress
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                <RefreshCw className="w-3 h-3 mr-1" />
                Auto-sync
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Subscriber Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-700">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">{activeSubscribers.toLocaleString()}</div>
            <div className="text-sm text-green-600">Active Subscribers</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Total
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{totalSubscribers.toLocaleString()}</div>
            <div className="text-sm text-blue-600">Total Subscribers</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <RefreshCw className="w-8 h-8 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Running
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">{bulkOperations}</div>
            <div className="text-sm text-purple-600">Bulk Operations</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Globe className="w-8 h-8 text-orange-600" />
              <Badge variant="outline" className="bg-orange-100 text-orange-700">
                MVNOs
              </Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">8</div>
            <div className="text-sm text-orange-600">Active MVNOs</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscribers" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="bulk-ops">Bulk Operations</TabsTrigger>
          <TabsTrigger value="self-service">Self-Service APIs</TabsTrigger>
          <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
        </TabsList>

        <TabsContent value="subscribers" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Subscriber Search & Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Input placeholder="Search by MSISDN, IMSI, or ID..." className="flex-1" />
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              <div className="space-y-4">
                {subscribers.map((subscriber) => (
                  <div key={subscriber.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{subscriber.msisdn}</span>
                        <Badge variant="secondary" className="text-xs">
                          {subscriber.mvno}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {subscriber.plan}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(subscriber.status)}>
                          {subscriber.status.toUpperCase()}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Settings className="w-3 h-3 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">IMSI:</span>
                        <div className="font-medium">{subscriber.imsi}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Created:</span>
                        <div className="font-medium">{subscriber.created}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Activity:</span>
                        <div className="font-medium">{subscriber.lastActivity}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Voice:</span>
                        <div className="font-medium">{subscriber.usage.voice}%</div>
                      </div>
                      <div>
                        <span className="text-gray-500">SMS:</span>
                        <div className="font-medium">{subscriber.usage.sms}%</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Data:</span>
                        <div className="font-medium">{subscriber.usage.data}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk-ops" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Bulk Operations Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bulkOps.map((operation) => (
                  <div key={operation.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getOperationIcon(operation.type)}
                        <span className="font-medium capitalize">{operation.type.replace('_', ' ')}</span>
                        <Badge variant="secondary" className="text-xs">
                          {operation.mvno}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(operation.status)}>
                          {operation.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-500">{operation.created}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">Total:</span>
                        <div className="font-medium">{operation.total.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Processed:</span>
                        <div className="font-medium">{operation.processed.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Progress:</span>
                        <div className="font-medium">{Math.round((operation.processed / operation.total) * 100)}%</div>
                      </div>
                    </div>
                    {operation.status === 'processing' && (
                      <div className="mt-3">
                        <Progress value={(operation.processed / operation.total) * 100} className="h-2" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="self-service" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Self-Service API Endpoints</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile Update API</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SIM Swap API</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Plan Change API</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Usage Query API</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Daily API Calls</span>
                    <Badge variant="secondary">45,678</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Success Rate</span>
                    <Badge className="bg-green-100 text-green-800">99.8%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg Response Time</span>
                    <Badge className="bg-blue-100 text-blue-800">145ms</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rate Limit Hits</span>
                    <Badge variant="secondary">23</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segmentation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dynamic Segments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High Value Customers</span>
                    <Badge className="bg-purple-100 text-purple-800">12,456</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Youth Segment (18-25)</span>
                    <Badge className="bg-blue-100 text-blue-800">89,234</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Business Users</span>
                    <Badge className="bg-green-100 text-green-800">34,567</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Roaming Users</span>
                    <Badge className="bg-orange-100 text-orange-800">5,678</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segmentation Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Usage-Based Rules</span>
                    <Badge className="bg-green-100 text-green-800">8 Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Demographic Rules</span>
                    <Badge className="bg-blue-100 text-blue-800">5 Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Behavioral Rules</span>
                    <Badge className="bg-purple-100 text-purple-800">3 Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Geographic Rules</span>
                    <Badge className="bg-orange-100 text-orange-800">2 Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriberManagementCenter;