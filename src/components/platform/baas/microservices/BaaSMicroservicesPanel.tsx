import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Network, Server, Container, Cpu, HardDrive, 
  GitBranch, Settings, Activity, CheckCircle, AlertTriangle,
  Play, Square, RotateCcw, Scale
} from 'lucide-react';

const BaaSMicroservicesPanel = () => {
  const [selectedService, setSelectedService] = useState('auth-service');

  const microservices = [
    {
      id: 'auth-service',
      name: 'Authentication Service',
      status: 'running',
      version: 'v2.1.4',
      instances: 3,
      cpu: '12%',
      memory: '245MB',
      icon: <Network className="w-5 h-5" />,
      description: 'Handles user authentication and JWT token management',
      endpoints: 8,
      requests: '125K/min'
    },
    {
      id: 'payment-service',
      name: 'Payment Processing',
      status: 'running',
      version: 'v1.8.2',
      instances: 5,
      cpu: '28%',
      memory: '512MB',
      icon: <Server className="w-5 h-5" />,
      description: 'Processes airtime and data payments',
      endpoints: 12,
      requests: '89K/min'
    },
    {
      id: 'notification-service',
      name: 'Notification Hub',
      status: 'running',
      version: 'v1.5.1',
      instances: 2,
      cpu: '8%',
      memory: '156MB',
      icon: <Container className="w-5 h-5" />,
      description: 'Handles SMS, email and push notifications',
      endpoints: 6,
      requests: '67K/min'
    },
    {
      id: 'analytics-service',
      name: 'Analytics Engine',
      status: 'warning',
      version: 'v2.0.3',
      instances: 4,
      cpu: '45%',
      memory: '892MB',
      icon: <Activity className="w-5 h-5" />,
      description: 'Real-time data processing and insights',
      endpoints: 15,
      requests: '156K/min'
    }
  ];

  const serviceMetrics = [
    { label: 'Total Services', value: '12', change: '+2', icon: <Container className="w-4 h-4" /> },
    { label: 'Running Instances', value: '34', change: '+6', icon: <Server className="w-4 h-4" /> },
    { label: 'CPU Usage', value: '23%', change: '-5%', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Memory Usage', value: '1.8GB', change: '+12%', icon: <HardDrive className="w-4 h-4" /> }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'stopped': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'stopped': return <Square className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Service Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {serviceMetrics.map((metric, index) => (
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
                  metric.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Microservices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <p className="text-sm text-gray-600">{service.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(service.status)}>
                        {getStatusIcon(service.status)}
                        <span className="ml-1 capitalize">{service.status}</span>
                      </Badge>
                      <Badge variant="outline">{service.version}</Badge>
                    </div>
                  </div>
                </div>
                <Settings className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Instances</p>
                    <p className="text-sm font-semibold">{service.instances}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">CPU</p>
                    <p className="text-sm font-semibold">{service.cpu}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Memory</p>
                    <p className="text-sm font-semibold">{service.memory}</p>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Endpoints</span>
                    <span className="font-medium">{service.endpoints}</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-600">Requests/min</span>
                    <span className="font-medium">{service.requests}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 px-3 py-1 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors">
                    <Play className="w-3 h-3 inline mr-1" />
                    Restart
                  </button>
                  <button className="flex-1 px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
                    <Scale className="w-3 h-3 inline mr-1" />
                    Scale
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Management Panel */}
      {selectedService && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              Service Management - {microservices.find(s => s.id === selectedService)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Deployment</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Rolling Update
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Blue-Green Deploy
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Canary Release
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Monitoring</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Service Metrics
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Health Checks
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Distributed Tracing
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Operations</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors">
                    Auto Scale
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
                    Circuit Breaker
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-colors">
                    Load Balancing
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

export default BaaSMicroservicesPanel;
