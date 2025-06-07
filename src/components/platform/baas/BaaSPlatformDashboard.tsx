
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, Shield, Server, Activity, 
  BarChart, Zap, Settings, Globe,
  CheckCircle, TrendingUp, Users, DollarSign
} from 'lucide-react';

// Import all the panel components
import BaaSInfrastructurePanel from './infrastructure/BaaSInfrastructurePanel';
import BaaSSecurityPanel from './security/BaaSSecurityPanel';
import BaaSAPIManagement from './api/BaaSAPIManagement';
import BaaSAnalyticsDashboard from './analytics/BaaSAnalyticsDashboard';
import BaaSMicroservicesPanel from './microservices/BaaSMicroservicesPanel';
import BaaSRealtimePanel from './realtime/BaaSRealtimePanel';
import SupabaseConfigPanel from './core/SupabaseConfigPanel';
import TransactionProcessorPanel from './core/TransactionProcessorPanel';

const BaaSPlatformDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const platformMetrics = [
    {
      label: 'Total API Calls',
      value: '2.4M',
      change: '+12%',
      icon: <Activity className="w-5 h-5" />,
      color: 'text-blue-600'
    },
    {
      label: 'Active Users',
      value: '8,432',
      change: '+8%',
      icon: <Users className="w-5 h-5" />,
      color: 'text-green-600'
    },
    {
      label: 'Revenue (MTD)',
      value: 'R 1.2M',
      change: '+15%',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-purple-600'
    },
    {
      label: 'System Uptime',
      value: '99.98%',
      change: '+0.02%',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-emerald-600'
    }
  ];

  const serviceStatus = [
    { name: 'Authentication', status: 'operational', uptime: '99.98%' },
    { name: 'Database', status: 'operational', uptime: '99.95%' },
    { name: 'Edge Functions', status: 'operational', uptime: '99.92%' },
    { name: 'Real-time', status: 'operational', uptime: '99.89%' },
    { name: 'Storage', status: 'operational', uptime: '99.94%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'degraded': return 'bg-orange-100 text-orange-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Devine Mobile BaaS Platform
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enterprise-grade Backend-as-a-Service platform powered by Supabase infrastructure
          </p>
        </div>

        {/* Platform Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {platformMetrics.map((metric, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      metric.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 ${metric.color}`}>
                    {metric.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Platform Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 w-full max-w-4xl">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="supabase" className="text-xs">Supabase</TabsTrigger>
              <TabsTrigger value="transactions" className="text-xs">Transactions</TabsTrigger>
              <TabsTrigger value="infrastructure" className="text-xs">Infrastructure</TabsTrigger>
              <TabsTrigger value="security" className="text-xs">Security</TabsTrigger>
              <TabsTrigger value="api" className="text-xs">API</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
              <TabsTrigger value="realtime" className="text-xs">Real-time</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Service Status */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    Service Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {serviceStatus.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            service.status === 'operational' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span className="font-medium">{service.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">{service.uptime}</span>
                          <Badge className={getStatusColor(service.status)}>
                            {service.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setActiveTab('supabase')}
                      className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                    >
                      <Database className="w-4 h-4 inline mr-2" />
                      Configure Supabase
                    </button>
                    <button 
                      onClick={() => setActiveTab('transactions')}
                      className="w-full text-left p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
                    >
                      <Activity className="w-4 h-4 inline mr-2" />
                      Transaction Monitor
                    </button>
                    <button 
                      onClick={() => setActiveTab('security')}
                      className="w-full text-left p-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
                    >
                      <Shield className="w-4 h-4 inline mr-2" />
                      Security Center
                    </button>
                    <button 
                      onClick={() => setActiveTab('analytics')}
                      className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors"
                    >
                      <BarChart className="w-4 h-4 inline mr-2" />
                      View Analytics
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="supabase">
            <SupabaseConfigPanel />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionProcessorPanel />
          </TabsContent>

          <TabsContent value="infrastructure">
            <BaaSInfrastructurePanel />
          </TabsContent>

          <TabsContent value="security">
            <BaaSSecurityPanel />
          </TabsContent>

          <TabsContent value="api">
            <BaaSAPIManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <BaaSAnalyticsDashboard />
          </TabsContent>

          <TabsContent value="realtime">
            <BaaSRealtimePanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BaaSPlatformDashboard;
