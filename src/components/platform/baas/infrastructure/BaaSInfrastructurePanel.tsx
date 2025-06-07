import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Database, HardDrive, Cpu, Ram, Network, 
  Cloud, Server, Monitor, Settings, CheckCircle,
  AlertTriangle, TrendingUp, Zap
} from 'lucide-react';

const BaaSInfrastructurePanel = () => {
  const [selectedService, setSelectedService] = useState('database');

  const infrastructureServices = [
    {
      id: 'database',
      name: 'PostgreSQL Database',
      status: 'healthy',
      uptime: '99.99%',
      connections: '2,847/5,000',
      storage: '1.2TB/2TB',
      icon: <Database className="w-5 h-5" />,
      metrics: {
        queries: '45.2K/min',
        avgResponseTime: '12ms',
        activeConnections: 2847
      }
    },
    {
      id: 'storage',
      name: 'Object Storage',
      status: 'healthy',
      uptime: '99.98%',
      usage: '847GB/2TB',
      files: '2.4M files',
      icon: <HardDrive className="w-5 h-5" />,
      metrics: {
        bandwidth: '2.1GB/s',
        requests: '120K/min',
        cdn: 'Global CDN Active'
      }
    },
    {
      id: 'compute',
      name: 'Compute Instances',
      status: 'scaling',
      instances: '24 active',
      cpu: '67% avg',
      memory: '4.2GB/8GB',
      icon: <Cpu className="w-5 h-5" />,
      metrics: {
        autoScaling: 'Enabled',
        loadBalancer: 'Active',
        containers: '127 running'
      }
    },
    {
      id: 'network',
      name: 'Network & CDN',
      status: 'optimal',
      latency: '45ms avg',
      bandwidth: '2.1Gbps',
      regions: '12 regions',
      icon: <Network className="w-5 h-5" />,
      metrics: {
        edge: '45 locations',
        ssl: '100% encrypted',
        ddos: 'Protected'
      }
    }
  ];

  const performanceMetrics = [
    { label: 'Database Queries', value: '2.4M', change: '+12%', icon: <Database className="w-4 h-4" /> },
    { label: 'Storage I/O', value: '1.2GB/s', change: '+8%', icon: <HardDrive className="w-4 h-4" /> },
    { label: 'CPU Utilization', value: '67%', change: '-3%', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Network Throughput', value: '2.1Gbps', change: '+15%', icon: <Network className="w-4 h-4" /> }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50';
      case 'optimal': return 'text-blue-600 bg-blue-50';
      case 'scaling': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'optimal': return <CheckCircle className="w-4 h-4" />;
      case 'scaling': return <TrendingUp className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
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

      {/* Infrastructure Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {infrastructureServices.map((service) => (
          <Card 
            key={service.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedService === service.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
            }`}
            onClick={() => setSelectedService(service.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    {service.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getStatusColor(service.status)}`}>
                      {getStatusIcon(service.status)}
                      <span className="capitalize">{service.status}</span>
                    </div>
                  </div>
                </div>
                <Settings className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  {service.id === 'database' && (
                    <>
                      <div>
                        <p className="text-xs text-gray-600">Connections</p>
                        <p className="text-sm font-semibold">{service.connections}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Storage Used</p>
                        <p className="text-sm font-semibold">{service.storage}</p>
                      </div>
                    </>
                  )}
                  {service.id === 'storage' && (
                    <>
                      <div>
                        <p className="text-xs text-gray-600">Usage</p>
                        <p className="text-sm font-semibold">{service.usage}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Files</p>
                        <p className="text-sm font-semibold">{service.files}</p>
                      </div>
                    </>
                  )}
                  {service.id === 'compute' && (
                    <>
                      <div>
                        <p className="text-xs text-gray-600">Instances</p>
                        <p className="text-sm font-semibold">{service.instances}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">CPU Usage</p>
                        <p className="text-sm font-semibold">{service.cpu}</p>
                      </div>
                    </>
                  )}
                  {service.id === 'network' && (
                    <>
                      <div>
                        <p className="text-xs text-gray-600">Latency</p>
                        <p className="text-sm font-semibold">{service.latency}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Bandwidth</p>
                        <p className="text-sm font-semibold">{service.bandwidth}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Additional Metrics */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="grid grid-cols-1 gap-1">
                    {Object.entries(service.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Service Management */}
      {selectedService && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Service Management - {infrastructureServices.find(s => s.id === selectedService)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Configuration</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Scaling Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Backup Configuration
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Security Settings
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
                    Log Analytics
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Alert Rules
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Operations</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
                    Scale Service
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
                    Create Backup
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-colors">
                    Restart Service
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
