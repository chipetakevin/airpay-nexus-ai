
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Code, Globe, Zap, BarChart3, Key, Settings, 
  Activity, Clock, CheckCircle, AlertTriangle,
  ArrowUp, ArrowDown, Webhook, Database
} from 'lucide-react';

const BaaSAPIManagement = () => {
  const [selectedAPI, setSelectedAPI] = useState('rest');

  const apiEndpoints = [
    {
      id: 'rest',
      name: 'REST API',
      version: 'v2.1',
      requests: '1.2M/day',
      uptime: '99.98%',
      avgResponse: '45ms',
      endpoints: 156,
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: 'graphql',
      name: 'GraphQL API',
      version: 'v1.5',
      requests: '847K/day',
      uptime: '99.97%',
      avgResponse: '32ms',
      endpoints: 89,
      icon: <Code className="w-5 h-5" />
    },
    {
      id: 'webhooks',
      name: 'Webhooks',
      version: 'v1.0',
      requests: '124K/day',
      uptime: '99.99%',
      avgResponse: '12ms',
      endpoints: 24,
      icon: <Webhook className="w-5 h-5" />
    },
    {
      id: 'realtime',
      name: 'Real-time API',
      version: 'v1.2',
      requests: '2.4M/day',
      uptime: '99.95%',
      avgResponse: '8ms',
      endpoints: 45,
      icon: <Zap className="w-5 h-5" />
    }
  ];

  const apiMetrics = [
    { label: 'Total Requests', value: '4.6M', change: '+12%', icon: <Activity className="w-4 h-4" /> },
    { label: 'Success Rate', value: '99.94%', change: '+0.02%', icon: <CheckCircle className="w-4 h-4" /> },
    { label: 'Avg Response', value: '35ms', change: '-5ms', icon: <Clock className="w-4 h-4" /> },
    { label: 'Error Rate', value: '0.06%', change: '-0.01%', icon: <AlertTriangle className="w-4 h-4" /> }
  ];

  const topEndpoints = [
    { endpoint: '/api/v2/transactions', requests: '324K', response: '42ms', errors: '0.02%' },
    { endpoint: '/api/v2/users/profile', requests: '156K', response: '28ms', errors: '0.01%' },
    { endpoint: '/api/v2/airtime/purchase', requests: '289K', response: '67ms', errors: '0.08%' },
    { endpoint: '/api/v2/wallet/balance', requests: '198K', response: '15ms', errors: '0.00%' },
    { endpoint: '/api/v2/data/bundles', requests: '145K', response: '38ms', errors: '0.03%' }
  ];

  const apiKeys = [
    { name: 'Mobile App - iOS', usage: '45%', requests: '1.2M', status: 'active' },
    { name: 'Mobile App - Android', usage: '52%', requests: '1.4M', status: 'active' },
    { name: 'Web Dashboard', usage: '23%', requests: '645K', status: 'active' },
    { name: 'Partner Integration', usage: '18%', requests: '289K', status: 'active' },
    { name: 'Third-party Analytics', usage: '8%', requests: '124K', status: 'limited' }
  ];

  return (
    <div className="space-y-6">
      {/* API Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {apiMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{metric.label}</p>
                    <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {metric.change.startsWith('+') ? (
                    <ArrowUp className="w-3 h-3 text-green-500" />
                  ) : metric.change.startsWith('-') && metric.label !== 'Avg Response' && metric.label !== 'Error Rate' ? (
                    <ArrowDown className="w-3 h-3 text-red-500" />
                  ) : (
                    <ArrowDown className="w-3 h-3 text-green-500" />
                  )}
                  <span className={`text-xs ${
                    metric.change.startsWith('+') || (metric.change.startsWith('-') && (metric.label === 'Avg Response' || metric.label === 'Error Rate'))
                      ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {apiEndpoints.map((api) => (
          <Card 
            key={api.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedAPI === api.id ? 'ring-2 ring-purple-500 shadow-lg' : ''
            }`}
            onClick={() => setSelectedAPI(api.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    {api.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{api.name}</CardTitle>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span>{api.version}</span>
                      <span>•</span>
                      <span>{api.endpoints} endpoints</span>
                    </div>
                  </div>
                </div>
                <Settings className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Requests/Day</p>
                  <p className="text-sm font-semibold">{api.requests}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Uptime</p>
                  <p className="text-sm font-semibold text-green-600">{api.uptime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Avg Response</p>
                  <p className="text-sm font-semibold">{api.avgResponse}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Status</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-green-600">Active</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top API Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Top API Endpoints (Last 24 Hours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topEndpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{endpoint.endpoint}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-gray-600">{endpoint.requests} requests</span>
                    <span className="text-xs text-gray-600">{endpoint.response} avg</span>
                    <span className={`text-xs ${
                      parseFloat(endpoint.errors) < 0.05 ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {endpoint.errors} errors
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    parseFloat(endpoint.errors) < 0.05 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {parseFloat(endpoint.errors) < 0.05 ? 'Healthy' : 'Monitor'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Key Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Key Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {apiKeys.map((key, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{key.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-600">{key.requests} requests</span>
                      <div className="flex items-center gap-1">
                        <div className="w-16 h-1 bg-gray-200 rounded-full">
                          <div 
                            className="h-1 bg-purple-500 rounded-full" 
                            style={{ width: key.usage }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{key.usage}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    key.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {key.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              API Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">OpenAPI 3.0 Specification</h4>
                <p className="text-sm text-gray-600 mb-3">Complete API documentation with interactive examples</p>
                <button className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  View Documentation
                </button>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">SDK Downloads</h4>
                <p className="text-sm text-gray-600 mb-3">Official SDKs for popular programming languages</p>
                <div className="flex gap-2">
                  <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                    JavaScript
                  </button>
                  <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                    Python
                  </button>
                  <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                    PHP
                  </button>
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">API Testing</h4>
                <p className="text-sm text-gray-600 mb-3">Interactive API testing environment</p>
                <button className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Open API Explorer
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BaaSAPIManagement;
