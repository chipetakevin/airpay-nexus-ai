
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Database, Shield, Server, Globe, 
  CheckCircle, AlertTriangle, Settings, Zap,
  Activity, Lock, Key, Monitor
} from 'lucide-react';

const SupabaseConfigPanel = () => {
  const [activeConfig, setActiveConfig] = useState('database');

  const supabaseServices = [
    {
      id: 'database',
      name: 'PostgreSQL Database',
      status: 'operational',
      version: '15.1',
      connections: '245/1000',
      storage: '12.4 GB',
      icon: <Database className="w-5 h-5" />,
      description: 'Primary transactional database with ACID compliance'
    },
    {
      id: 'auth',
      name: 'Authentication Service',
      status: 'operational',
      version: '2.64.2',
      users: '8,432',
      sessions: '1,247 active',
      icon: <Shield className="w-5 h-5" />,
      description: 'Multi-factor authentication with JWT tokens'
    },
    {
      id: 'functions',
      name: 'Edge Functions',
      status: 'operational',
      version: '1.8.1',
      deployments: '24 active',
      invocations: '847K/day',
      icon: <Server className="w-5 h-5" />,
      description: 'Serverless functions for transaction processing'
    },
    {
      id: 'realtime',
      name: 'Real-time Engine',
      status: 'operational',
      version: '2.1.0',
      channels: '156 active',
      connections: '2,847',
      icon: <Zap className="w-5 h-5" />,
      description: 'WebSocket connections for live updates'
    }
  ];

  const configSections = [
    {
      title: 'Database Configuration',
      items: [
        'Connection pooling: Enabled (50 connections)',
        'Row Level Security: Active on all tables',
        'Backup frequency: Every 6 hours',
        'Point-in-time recovery: 7 days',
        'Extensions: pgcrypto, uuid-ossp, postgis'
      ]
    },
    {
      title: 'Authentication Setup',
      items: [
        'Email/Password: Enabled',
        'Social providers: Google, Facebook, Apple',
        'Multi-factor auth: SMS + TOTP',
        'Session timeout: 24 hours',
        'Password policy: Strong enforcement'
      ]
    },
    {
      title: 'API Gateway',
      items: [
        'Auto-generated REST API: Active',
        'GraphQL endpoint: Enabled',
        'Rate limiting: 1000 req/min per IP',
        'CORS policy: Configured',
        'API versioning: v1, v2 available'
      ]
    }
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
    <div className="space-y-6">
      {/* Supabase Services Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supabaseServices.map((service) => (
          <Card 
            key={service.id}
            className={`cursor-pointer transition-all ${
              activeConfig === service.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setActiveConfig(service.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    {service.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base">{service.name}</CardTitle>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(service.status)}>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {service.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span className="font-medium">{service.version}</span>
                </div>
                {service.connections && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Connections:</span>
                    <span className="font-medium">{service.connections}</span>
                  </div>
                )}
                {service.users && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Users:</span>
                    <span className="font-medium">{service.users}</span>
                  </div>
                )}
                {service.deployments && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deployments:</span>
                    <span className="font-medium">{service.deployments}</span>
                  </div>
                )}
                {service.channels && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Channels:</span>
                    <span className="font-medium">{service.channels}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Configuration Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configuration Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {configSections.map((section, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900 mb-2">{section.title}</h4>
                  <ul className="space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600 flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Environment Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Production</span>
                  </div>
                  <p className="text-xs text-gray-600">Live environment</p>
                  <p className="text-xs text-gray-600">99.98% uptime</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">Staging</span>
                  </div>
                  <p className="text-xs text-gray-600">Testing environment</p>
                  <p className="text-xs text-gray-600">Latest: v2.1.4</p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-medium text-gray-900">Quick Actions</h5>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
                    <Database className="w-4 h-4 inline mr-2" />
                    Database Migration
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
                    <Server className="w-4 h-4 inline mr-2" />
                    Deploy Functions
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors">
                    <Key className="w-4 h-4 inline mr-2" />
                    Rotate API Keys
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-colors">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Security Audit
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

export default SupabaseConfigPanel;
