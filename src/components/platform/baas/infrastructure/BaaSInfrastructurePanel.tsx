
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Server, Database, Shield, Activity, 
  Zap, Globe, Settings, CheckCircle, AlertTriangle,
  TrendingUp, Monitor, HardDrive, Cpu
} from 'lucide-react';

const BaaSInfrastructurePanel = () => {
  const [selectedResource, setSelectedResource] = useState('compute');

  const infrastructureMetrics = [
    { label: 'CPU Usage', value: '68%', status: 'healthy', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Memory Usage', value: '72%', status: 'healthy', icon: <HardDrive className="w-4 h-4" /> },
    { label: 'Storage', value: '45%', status: 'healthy', icon: <Database className="w-4 h-4" /> },
    { label: 'Network I/O', value: '23%', status: 'optimal', icon: <Globe className="w-4 h-4" /> }
  ];

  const infrastructureResources = [
    {
      id: 'compute',
      name: 'Compute Resources',
      type: 'Supabase Edge Functions',
      status: 'operational',
      instances: 8,
      utilization: '68%',
      cost: 'R 2,450/month',
      icon: <Server className="w-5 h-5" />,
      description: 'Serverless compute for airtime processing'
    },
    {
      id: 'database',
      name: 'PostgreSQL Database',
      type: 'Supabase Database',
      status: 'operational',
      instances: 3,
      utilization: '45%',
      cost: 'R 1,890/month',
      icon: <Database className="w-5 h-5" />,
      description: 'Primary transaction and user data storage'
    },
    {
      id: 'storage',
      name: 'File Storage',
      type: 'Supabase Storage',
      status: 'operational',
      instances: 2,
      utilization: '32%',
      cost: 'R 680/month',
      icon: <HardDrive className="w-5 h-5" />,
      description: 'Document and media file storage'
    },
    {
      id: 'auth',
      name: 'Authentication',
      type: 'Supabase Auth',
      status: 'operational',
      instances: 4,
      utilization: '55%',
      cost: 'R 1,200/month',
      icon: <Shield className="w-5 h-5" />,
      description: 'Multi-factor authentication system'
    }
  ];

  const networkProviders = [
    { name: 'MTN', status: 'Operational', uptime: '99.98%', transactions: '45,234' },
    { name: 'Vodacom', status: 'Operational', uptime: '99.95%', transactions: '38,912' },
    { name: 'Devine Mobile', status: 'Operational', uptime: '99.89%', transactions: '21,456' },
    { name: 'Telkom', status: 'Maintenance', uptime: '98.45%', transactions: '12,847' },
    { name: 'Virgin Mobile', status: 'Operational', uptime: '99.92%', transactions: '8,934' }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'degraded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational': return <CheckCircle className="w-4 h-4" />;
      case 'maintenance': return <AlertTriangle className="w-4 h-4" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Infrastructure Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {infrastructureMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{metric.label}</p>
                    <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
                <Badge className={`${
                  metric.status === 'healthy' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {metric.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Infrastructure Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {infrastructureResources.map((resource) => (
          <Card 
            key={resource.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedResource === resource.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
            }`}
            onClick={() => setSelectedResource(resource.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    {resource.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{resource.name}</CardTitle>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(resource.status)}>
                        {getStatusIcon(resource.status)}
                        <span className="ml-1 capitalize">{resource.status}</span>
                      </Badge>
                      <Badge variant="outline">{resource.type}</Badge>
                    </div>
                  </div>
                </div>
                <Settings className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Instances</p>
                  <p className="text-sm font-semibold">{resource.instances}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Utilization</p>
                  <p className="text-sm font-semibold">{resource.utilization}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Monthly Cost</p>
                  <p className="text-sm font-semibold text-green-600">{resource.cost}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Network Provider Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Network Provider Infrastructure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {networkProviders.map((provider, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      provider.status === 'Operational' ? 'bg-green-500' : 'bg-orange-500'
                    }`}></div>
                    <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                  </div>
                  <Badge className={getStatusColor(provider.status)}>
                    {provider.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uptime:</span>
                    <span className="font-medium">{provider.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transactions:</span>
                    <span className="font-medium">{provider.transactions}</span>
                  </div>
                </div>
                
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      provider.status === 'Operational' ? 'bg-green-500' : 'bg-orange-500'
                    }`}
                    style={{ width: provider.uptime }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Management Panel */}
      {selectedResource && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Resource Management - {infrastructureResources.find(r => r.id === selectedResource)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Scaling</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Auto Scaling Rules
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Manual Scaling
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Load Balancing
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Monitoring</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Performance Metrics
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Health Checks
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Alert Configuration
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Operations</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
                    Deploy Update
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
                    Backup Resources
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-colors">
                    Maintenance Mode
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BaaSInfrastructurePanel;
