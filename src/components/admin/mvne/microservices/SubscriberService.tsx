import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Users, 
  Database, 
  Shield, 
  Activity, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  Settings,
  Phone,
  UserPlus,
  UserX,
  Eye
} from 'lucide-react';

interface Subscriber {
  id: string;
  imsi: string;
  msisdn: string;
  imei?: string;
  status: 'active' | 'suspended' | 'terminated' | 'provisioning';
  operatorId: string;
  profileId: string;
  createdAt: string;
  lastActivity: string;
}

interface ServiceMetric {
  timestamp: string;
  provisioned: number;
  activated: number;
  suspended: number;
  errors: number;
}

const SubscriberService = () => {
  const [serviceStatus, setServiceStatus] = useState('running');
  const [totalSubscribers, setTotalSubscribers] = useState(127845);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [recentSubscribers] = useState<Subscriber[]>([
    {
      id: 'SUB001',
      imsi: '655010123456789',
      msisdn: '+27821234567',
      imei: '123456789012345',
      status: 'active',
      operatorId: 'OP001',
      profileId: 'PROF_PREMIUM',
      createdAt: '2 min ago',
      lastActivity: '1 min ago'
    },
    {
      id: 'SUB002',
      imsi: '655010987654321',
      msisdn: '+27829876543',
      status: 'provisioning',
      operatorId: 'OP002',
      profileId: 'PROF_BASIC',
      createdAt: '5 min ago',
      lastActivity: '3 min ago'
    },
    {
      id: 'SUB003',
      imsi: '655010555555555',
      msisdn: '+27825555555',
      status: 'suspended',
      operatorId: 'OP001',
      profileId: 'PROF_ENTERPRISE',
      createdAt: '1 hour ago',
      lastActivity: '30 min ago'
    }
  ]);

  const serviceMetrics: ServiceMetric[] = [
    { timestamp: '00:00', provisioned: 450, activated: 425, suspended: 15, errors: 3 },
    { timestamp: '04:00', provisioned: 320, activated: 310, suspended: 8, errors: 2 },
    { timestamp: '08:00', provisioned: 680, activated: 670, suspended: 18, errors: 5 },
    { timestamp: '12:00', provisioned: 920, activated: 890, suspended: 25, errors: 8 },
    { timestamp: '16:00', provisioned: 750, activated: 735, suspended: 20, errors: 6 },
    { timestamp: '20:00', provisioned: 580, activated: 570, suspended: 12, errors: 4 },
    { timestamp: '23:59', provisioned: 420, activated: 410, suspended: 8, errors: 2 }
  ];

  const statusDistribution = [
    { status: 'Active', count: 89420, percentage: 85.2 },
    { status: 'Suspended', count: 8950, percentage: 8.5 },
    { status: 'Provisioning', count: 4230, percentage: 4.0 },
    { status: 'Terminated', count: 2410, percentage: 2.3 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'running':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'provisioning':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'suspended':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'terminated':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSubscribers(prev => prev + Math.floor(Math.random() * 10));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Subscriber Service</h2>
            <p className="text-muted-foreground">HSS/HLR integration & subscriber lifecycle management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="provisioning">Provisioning</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className={getStatusColor(serviceStatus)}>
            <Activity className="w-4 h-4 mr-1" />
            {serviceStatus.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Service Status Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              Subscriber service operational - {totalSubscribers.toLocaleString()} active subscribers
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <Shield className="w-3 h-3 mr-1" />
                99.7% Uptime
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Service Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Total
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{totalSubscribers.toLocaleString()}</div>
            <div className="text-sm text-blue-600">Active Subscribers</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <UserPlus className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-700">
                Today
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">1,247</div>
            <div className="text-sm text-green-600">New Provisioned</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-purple-600" />
              <Badge variant="secondary" className="text-xs">
                Live
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">99.7%</div>
            <div className="text-sm text-purple-600">Service Uptime</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-8 h-8 text-orange-600" />
              <Badge variant="outline" className="bg-orange-100 text-orange-700">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">4,892</div>
            <div className="text-sm text-orange-600">Auth Sessions</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Service Performance (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={serviceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="activated" 
                    stackId="1"
                    stroke="#22c55e" 
                    fill="#22c55e" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="provisioned" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.4}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="suspended" 
                    stackId="1"
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subscriber Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Subscriber Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusDistribution.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.status}</span>
                    <span className="text-sm text-gray-600">{item.count.toLocaleString()} ({item.percentage}%)</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Subscriber Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Recent Subscriber Activity
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Manage
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSubscribers.map((subscriber) => (
              <div key={subscriber.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">{subscriber.msisdn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(subscriber.status)}>
                      {subscriber.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">IMSI:</span> {subscriber.imsi}
                  </div>
                  <div>
                    <span className="font-medium">Operator:</span> {subscriber.operatorId}
                  </div>
                  <div>
                    <span className="font-medium">Profile:</span> {subscriber.profileId}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span> {subscriber.createdAt}
                  </div>
                </div>
                {subscriber.imei && (
                  <div className="text-xs text-gray-500 mt-2">
                    IMEI: {subscriber.imei}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriberService;