
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Phone, Server, Users, BarChart, Settings, 
  Activity, Shield, Globe, Clock, TrendingUp,
  CheckCircle, AlertTriangle, XCircle
} from 'lucide-react';

const USSDManagement = () => {
  const [activeConnections, setActiveConnections] = useState(2847);
  const [systemStatus, setSystemStatus] = useState('operational');

  const networkStats = [
    { operator: 'MTN', connections: 1205, status: 'operational', responseTime: '1.2s' },
    { operator: 'Vodacom', connections: 892, status: 'operational', responseTime: '1.5s' },
    { operator: 'Cell C', connections: 456, status: 'degraded', responseTime: '2.8s' },
    { operator: 'Telkom', connections: 294, status: 'operational', responseTime: '1.8s' }
  ];

  const usageMetrics = [
    { service: 'Balance Check', count: 15420, percentage: 35 },
    { service: 'Airtime Purchase', count: 8750, percentage: 20 },
    { service: 'Data Purchase', count: 7845, percentage: 18 },
    { service: 'Transaction History', count: 6230, percentage: 14 },
    { service: 'Bill Payments', count: 3120, percentage: 7 },
    { service: 'Customer Support', count: 2635, percentage: 6 }
  ];

  const recentTransactions = [
    { id: 'TXN001', service: 'Airtime R50', status: 'completed', time: '14:32', network: 'MTN' },
    { id: 'TXN002', service: 'Data 1GB', status: 'completed', time: '14:30', network: 'Vodacom' },
    { id: 'TXN003', service: 'Balance Check', status: 'completed', time: '14:28', network: 'MTN' },
    { id: 'TXN004', service: 'Bill Payment', status: 'failed', time: '14:25', network: 'Cell C' },
    { id: 'TXN005', service: 'Airtime R20', status: 'processing', time: '14:23', network: 'Telkom' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'offline': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'degraded': return 'bg-orange-100 text-orange-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">USSD Management Dashboard</h2>
          <p className="text-gray-600">Monitor and manage USSD services across all networks</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(systemStatus)}>
            {getStatusIcon(systemStatus)}
            System {systemStatus}
          </Badge>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Sessions</p>
                <p className="text-2xl font-bold">{activeConnections.toLocaleString()}</p>
                <span className="text-sm text-green-600">+12% from yesterday</span>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Daily Transactions</p>
                <p className="text-2xl font-bold">44,000</p>
                <span className="text-sm text-green-600">+8% increase</span>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">98.7%</p>
                <span className="text-sm text-green-600">+0.3% improvement</span>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold">1.6s</p>
                <span className="text-sm text-red-600">+0.2s slower</span>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="networks">Networks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Network Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Network Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {networkStats.map((network, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(network.status)}
                        <div>
                          <span className="font-medium">{network.operator}</span>
                          <p className="text-sm text-gray-600">{network.connections} active sessions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-600">Response: {network.responseTime}</span>
                        <Badge className={getStatusColor(network.status)} variant="outline">
                          {network.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="w-5 h-5" />
                  Service Usage Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {usageMetrics.map((metric, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{metric.service}</span>
                        <span>{metric.count.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${metric.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="networks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Network Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {networkStats.map((network, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {network.operator}
                        <Badge className={getStatusColor(network.status)}>
                          {network.status}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Active Sessions:</span>
                        <span className="font-medium">{network.connections}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response Time:</span>
                        <span className="font-medium">{network.responseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Success Rate:</span>
                        <span className="font-medium text-green-600">98.5%</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Configure Network
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((txn, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <div>
                        <span className="font-medium">{txn.service}</span>
                        <p className="text-sm text-gray-600">{txn.id} • {txn.network}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">{txn.time}</span>
                      <Badge className={getStatusColor(txn.status)}>
                        {txn.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Usage analytics chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Peak Usage Time:</span>
                    <span className="font-medium">14:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Most Used Service:</span>
                    <span className="font-medium">Balance Check</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Error Rate:</span>
                    <span className="font-medium text-red-600">1.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Session Duration:</span>
                    <span className="font-medium">45s avg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Timeout (seconds)</label>
                  <input 
                    type="number" 
                    defaultValue="180" 
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Concurrent Sessions</label>
                  <input 
                    type="number" 
                    defaultValue="5000" 
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Language</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>English</option>
                    <option>Afrikaans</option>
                    <option>isiZulu</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Emergency Services</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
              </div>
              <Button className="w-full">Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default USSDManagement;
