
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Network, Container, Layers, Settings, 
  Activity, CheckCircle, AlertTriangle, Clock,
  Cpu, Memory, HardDrive, Zap, Users, Database
} from 'lucide-react';

const BaaSMicroservicesPanel = () => {
  const [selectedService, setSelectedService] = useState('auth');

  const microservices = [
    {
      id: 'auth',
      name: 'Authentication Service',
      status: 'healthy',
      instances: 4,
      cpu: '45%',
      memory: '2.1GB',
      requests: '24.5K/min',
      uptime: '99.98%',
      version: 'v2.1.3',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'transaction',
      name: 'Transaction Service',
      status: 'healthy',
      instances: 8,
      cpu: '67%',
      memory: '4.8GB',
      requests: '45.2K/min',
      uptime: '99.97%',
      version: 'v1.8.2',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'payment',
      name: 'Payment Gateway',
      status: 'warning',
      instances: 6,
      cpu: '82%',
      memory: '3.4GB',
      requests: '18.7K/min',
      uptime: '99.94%',
      version: 'v2.0.1',
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 'notification',
      name: 'Notification Service',
      status: 'healthy',
      instances: 3,
      cpu: '28%',
      memory: '1.2GB',
      requests: '12.8K/min',
      uptime: '99.99%',
      version: 'v1.5.4',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'analytics',
      name: 'Analytics Service',
      status: 'healthy',
      instances: 5,
      cpu: '56%',
      memory: '6.2GB',
      requests: '8.4K/min',
      uptime: '99.96%',
      version: 'v1.3.1',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'user',
      name: 'User Management',
      status: 'healthy',
      instances: 4,
      cpu: '39%',
      memory: '2.8GB',
      requests: '15.6K/min',
      uptime: '99.98%',
      version: 'v2.2.0',
      icon: <Users className="w-5 h-5" />
    }
  ];

  const containerMetrics = [
    { label: 'Running Containers', value: '127', change: '+3', icon: <Container className="w-4 h-4" /> },
    { label: 'Service Mesh', value: '18 services', change: '+2', icon: <Network className="w-4 h-4" /> },
    { label: 'Load Balancers', value: '12 active', change: '0', icon: <Layers className="w-4 h-4" /> },
    { label: 'Auto-scaling', value: '8 groups', change: '+1', icon: <Settings className="w-4 h-4" /> }
  ];

  const deploymentHistory = [
    { service: 'Authentication Service', version: 'v2.1.3', time: '2 hours ago', status: 'success' },
    { service: 'Transaction Service', version: 'v1.8.2', time: '6 hours ago', status: 'success' },
    { service: 'Payment Gateway', version: 'v2.0.1', time: '1 day ago', status: 'rollback' },
    { service: 'Notification Service', version: 'v1.5.4', time: '2 days ago', status: 'success' },
    { service: 'Analytics Service', version: 'v1.3.1', time: '3 days ago', status: 'success' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Container Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {containerMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{metric.label}</p>
                    <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  metric.change.startsWith('+') ? 'bg-green-100 text-green-600' : 
                  metric.change === '0' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-600'
                }`}>
                  {metric.change === '0' ? 'Stable' : metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Microservices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {microservices.map((service) => (
          <Card 
            key={service.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedService === service.id ? 'ring-2 ring-indigo-500 shadow-lg' : ''
            }`}
            onClick={() => setSelectedService(service.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    {service.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base">{service.name}</CardTitle>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span>{service.version}</span>
                      <span>•</span>
                      <span>{service.instances} instances</span>
                    </div>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getStatusColor(service.status)}`}>
                  {getStatusIcon(service.status)}
                  <span className="capitalize">{service.status}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Resource Usage */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Cpu className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">CPU</span>
                    </div>
                    <p className="text-sm font-semibold">{service.cpu}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Memory className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">Memory</span>
                    </div>
                    <p className="text-sm font-semibold">{service.memory}</p>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Requests/min</span>
                      <span className="font-medium">{service.requests}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Uptime</span>
                      <span className="font-medium text-green-600">{service.uptime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Management Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Deployments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deploymentHistory.map((deployment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{deployment.service}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-600">{deployment.version}</span>
                      <span className="text-xs text-gray-600">{deployment.time}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    deployment.status === 'success' ? 'bg-green-100 text-green-700' :
                    deployment.status === 'rollback' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {deployment.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Service Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Container Management</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors">
                    Scale Services
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
                    Deploy Update
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-colors">
                    Restart Service
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors">
                    Rollback
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Monitoring & Logs</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    View Service Logs
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Performance Metrics
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Health Checks
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BaaSMicroservicesPanel;
