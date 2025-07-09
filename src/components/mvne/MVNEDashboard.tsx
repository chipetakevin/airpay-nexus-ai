import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Server, 
  Shield, 
  Database,
  Wifi,
  Phone,
  MessageSquare,
  Globe,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

interface MVNOPartner {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'suspended';
  subscribers: number;
  revenue: number;
  uptime: number;
  lastActive: string;
}

const MVNEDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const mvnoPartners: MVNOPartner[] = [
    {
      id: 'mvno-001',
      name: 'TeleconnectSA',
      status: 'active',
      subscribers: 125000,
      revenue: 2500000,
      uptime: 99.8,
      lastActive: '2024-01-15T10:30:00Z'
    },
    {
      id: 'mvno-002',
      name: 'ConnectMobile',
      status: 'active',
      subscribers: 87500,
      revenue: 1750000,
      uptime: 99.6,
      lastActive: '2024-01-15T10:25:00Z'
    },
    {
      id: 'mvno-003',
      name: 'DigitalVoice',
      status: 'pending',
      subscribers: 0,
      revenue: 0,
      uptime: 0,
      lastActive: '2024-01-14T15:00:00Z'
    }
  ];

  const systemMetrics = {
    totalSubscribers: 212500,
    totalRevenue: 4250000,
    activeConnections: 195000,
    systemUptime: 99.7,
    dataTraffic: '1.2TB',
    voiceMinutes: '3.5M',
    smsCount: '850K',
    apiCalls: '12.3M'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          MVNE Control Center
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Monitor and manage Mobile Virtual Network Operator partners, system performance, and telecommunications infrastructure
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">
                  {systemMetrics.totalSubscribers.toLocaleString()}
                </p>
                <p className="text-sm text-blue-600">Total Subscribers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700">
                  {formatCurrency(systemMetrics.totalRevenue)}
                </p>
                <p className="text-sm text-green-600">Monthly Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-700">
                  {systemMetrics.activeConnections.toLocaleString()}
                </p>
                <p className="text-sm text-purple-600">Active Connections</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Server className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-700">
                  {systemMetrics.systemUptime}%
                </p>
                <p className="text-sm text-orange-600">System Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mvnos">MVNOs</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Service Usage Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Database className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-xl font-bold">{systemMetrics.dataTraffic}</p>
                    <p className="text-sm text-muted-foreground">Data Traffic</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Phone className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-xl font-bold">{systemMetrics.voiceMinutes}</p>
                    <p className="text-sm text-muted-foreground">Voice Minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="text-xl font-bold">{systemMetrics.smsCount}</p>
                    <p className="text-sm text-muted-foreground">SMS Messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Globe className="h-8 w-8 text-orange-500" />
                  <div>
                    <p className="text-xl font-bold">{systemMetrics.apiCalls}</p>
                    <p className="text-sm text-muted-foreground">API Calls</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Real-time monitoring of critical systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="font-semibold text-green-800">Core Network</p>
                    <p className="text-sm text-green-600">Operational</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="font-semibold text-green-800">Billing System</p>
                    <p className="text-sm text-green-600">Operational</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                  <Clock className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="font-semibold text-yellow-800">API Gateway</p>
                    <p className="text-sm text-yellow-600">Maintenance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mvnos" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">MVNO Partners</h2>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Add New MVNO
            </Button>
          </div>

          <div className="space-y-4">
            {mvnoPartners.map((mvno) => (
              <Card key={mvno.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{mvno.name}</CardTitle>
                      <CardDescription>Partner ID: {mvno.id}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(mvno.status)}>
                      {mvno.status.charAt(0).toUpperCase() + mvno.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-lg font-semibold">{mvno.subscribers.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Subscribers</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{formatCurrency(mvno.revenue)}</p>
                      <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{mvno.uptime}%</p>
                      <p className="text-sm text-muted-foreground">Uptime</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">
                        {new Date(mvno.lastActive).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Last Active</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Management</CardTitle>
              <CardDescription>Manage telecommunications services and configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-4" />
                <p>Service management interface coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Infrastructure</CardTitle>
              <CardDescription>Monitor network performance and infrastructure health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Wifi className="h-12 w-12 mx-auto mb-4" />
                <p>Network monitoring dashboard coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Analytics</CardTitle>
              <CardDescription>Comprehensive analytics and reporting for MVNE operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                <p>Advanced analytics dashboard coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MVNEDashboard;