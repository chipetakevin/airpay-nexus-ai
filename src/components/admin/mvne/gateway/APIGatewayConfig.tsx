import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Globe, 
  Shield, 
  Zap, 
  Activity, 
  Key, 
  Clock,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Settings,
  Eye,
  TrendingUp,
  Users,
  Lock,
  Network
} from 'lucide-react';

interface APIRoute {
  id: string;
  path: string;
  method: string;
  service: string;
  status: 'active' | 'deprecated' | 'disabled';
  rateLimit: string;
  authentication: boolean;
  responseTime: number;
  requests24h: number;
}

interface TrafficMetric {
  timestamp: string;
  requests: number;
  errors: number;
  latency: number;
}

interface Consumer {
  id: string;
  name: string;
  type: 'partner' | 'internal' | 'external';
  apiKey: string;
  requests: number;
  quota: number;
  status: 'active' | 'suspended' | 'rate_limited';
}

const APIGatewayConfig = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState('production');
  const [totalRequests, setTotalRequests] = useState(2547891);

  const apiRoutes: APIRoute[] = [
    {
      id: 'RT001',
      path: '/api/v1/subscribers',
      method: 'POST',
      service: 'Subscriber Service',
      status: 'active',
      rateLimit: '1000/hour',
      authentication: true,
      responseTime: 145,
      requests24h: 12450
    },
    {
      id: 'RT002',
      path: '/api/v1/cdrs',
      method: 'POST',
      service: 'CDR Processing',
      status: 'active',
      rateLimit: '5000/hour',
      authentication: true,
      responseTime: 89,
      requests24h: 45678
    },
    {
      id: 'RT003',
      path: '/api/v1/billing/rate',
      method: 'POST',
      service: 'Rating Engine',
      status: 'active',
      rateLimit: '10000/hour',
      authentication: true,
      responseTime: 67,
      requests24h: 89234
    },
    {
      id: 'RT004',
      path: '/api/v1/sms/send',
      method: 'POST',
      service: 'SMSC Service',
      status: 'active',
      rateLimit: '2000/hour',
      authentication: true,
      responseTime: 234,
      requests24h: 23456
    },
    {
      id: 'RT005',
      path: '/api/v1/auth/token',
      method: 'POST',
      service: 'Auth Service',
      status: 'active',
      rateLimit: '100/hour',
      authentication: false,
      responseTime: 56,
      requests24h: 3421
    }
  ];

  const trafficMetrics: TrafficMetric[] = [
    { timestamp: '00:00', requests: 890, errors: 12, latency: 145 },
    { timestamp: '04:00', requests: 650, errors: 8, latency: 134 },
    { timestamp: '08:00', requests: 1450, errors: 23, latency: 156 },
    { timestamp: '12:00', requests: 1680, errors: 18, latency: 167 },
    { timestamp: '16:00', requests: 1520, errors: 15, latency: 142 },
    { timestamp: '20:00', requests: 1180, errors: 9, latency: 138 },
    { timestamp: '23:59', requests: 920, errors: 6, latency: 129 }
  ];

  const consumers: Consumer[] = [
    {
      id: 'CON001',
      name: 'Partner MNO Alpha',
      type: 'partner',
      apiKey: 'pk_live_****7891',
      requests: 45678,
      quota: 50000,
      status: 'active'
    },
    {
      id: 'CON002',
      name: 'Internal Dashboard',
      type: 'internal',
      apiKey: 'sk_int_****2345',
      requests: 12890,
      quota: 100000,
      status: 'active'
    },
    {
      id: 'CON003',
      name: 'Third Party App',
      type: 'external',
      apiKey: 'pk_ext_****5678',
      requests: 8945,
      quota: 10000,
      status: 'rate_limited'
    },
    {
      id: 'CON004',
      name: 'Mobile App SDK',
      type: 'external',
      apiKey: 'pk_mob_****9012',
      requests: 23456,
      quota: 25000,
      status: 'active'
    }
  ];

  const kongConfig = `# Kong API Gateway Configuration
services:
  - name: subscriber-service
    url: http://mvne-api:8000
    routes:
      - name: subscribers-route
        paths: ["/api/v1/subscribers"]
        methods: ["GET", "POST", "PUT", "DELETE"]
        plugins:
          - name: rate-limiting
            config:
              minute: 100
              hour: 1000
          - name: key-auth
          - name: prometheus
            
  - name: cdr-service
    url: http://mvne-api:8000
    routes:
      - name: cdr-route
        paths: ["/api/v1/cdrs"]
        methods: ["POST"]
        plugins:
          - name: rate-limiting
            config:
              minute: 500
              hour: 5000
          - name: key-auth
          - name: request-transformer
            config:
              add:
                headers: ["X-Service: CDR"]

  - name: rating-service
    url: http://cgrates:2012
    routes:
      - name: rating-route
        paths: ["/api/v1/billing"]
        methods: ["POST"]
        plugins:
          - name: rate-limiting
            config:
              minute: 1000
              hour: 10000
          - name: key-auth
          - name: response-transformer
            config:
              add:
                headers: ["X-Processed-By: CGRateS"]

consumers:
  - username: partner-mno-alpha
    keyauth_credentials:
      - key: pk_live_partner_alpha_key_12345
    plugins:
      - name: rate-limiting
        config:
          minute: 500
          hour: 5000
          
  - username: internal-dashboard
    keyauth_credentials:
      - key: sk_int_dashboard_key_67890
    plugins:
      - name: rate-limiting
        config:
          minute: 1000
          hour: 100000

plugins:
  - name: prometheus
    config:
      per_consumer: true
      status_code_metrics: true
      latency_metrics: true
      
  - name: cors
    config:
      origins: ["*"]
      methods: ["GET", "POST", "PUT", "DELETE"]
      headers: ["Accept", "Content-Type", "Authorization"]
      
  - name: request-id
    config:
      header_name: X-Request-ID
      
  - name: correlation-id
    config:
      header_name: X-Correlation-ID`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'deprecated':
      case 'rate_limited':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'disabled':
      case 'suspended':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'partner':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'internal':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'external':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'text-blue-600 bg-blue-50';
      case 'POST':
        return 'text-green-600 bg-green-50';
      case 'PUT':
        return 'text-orange-600 bg-orange-50';
      case 'DELETE':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">API Gateway Configuration</h2>
            <p className="text-muted-foreground">Kong gateway, routing & traffic management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="development">Development</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Globe className="w-4 h-4 mr-1" />
            GATEWAY ACTIVE
          </Badge>
        </div>
      </div>

      {/* Gateway Status Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              API Gateway operational - {totalRequests.toLocaleString()} requests processed today
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="w-3 h-3 mr-1" />
                99.8% Uptime
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Gateway Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Globe className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Total
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{totalRequests.toLocaleString()}</div>
            <div className="text-sm text-blue-600">API Requests Today</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Network className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-700">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">{apiRoutes.filter(r => r.status === 'active').length}</div>
            <div className="text-sm text-green-600">API Routes</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Registered
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">{consumers.length}</div>
            <div className="text-sm text-purple-600">API Consumers</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-orange-600" />
              <Badge variant="outline" className="bg-orange-100 text-orange-700">
                Average
              </Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">142ms</div>
            <div className="text-sm text-orange-600">Response Time</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="routes" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="routes">API Routes</TabsTrigger>
          <TabsTrigger value="consumers">Consumers</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Analytics</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  API Routes & Services
                </CardTitle>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiRoutes.map((route) => (
                  <div key={route.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge className={getMethodColor(route.method)}>
                          {route.method}
                        </Badge>
                        <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {route.path}
                        </code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(route.status)}>
                          {route.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Service:</span> {route.service}
                      </div>
                      <div>
                        <span className="font-medium">Rate Limit:</span> {route.rateLimit}
                      </div>
                      <div>
                        <span className="font-medium">Response Time:</span> {route.responseTime}ms
                      </div>
                      <div>
                        <span className="font-medium">Requests (24h):</span> {route.requests24h.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        {route.authentication ? (
                          <Lock className="w-4 h-4 text-green-600" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-xs text-gray-500">
                          {route.authentication ? 'Auth Required' : 'Public'}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consumers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {consumers.map((consumer) => (
              <Card key={consumer.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{consumer.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getTypeColor(consumer.type)}>
                        {consumer.type}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(consumer.status)}>
                        {consumer.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm">
                    <span className="text-gray-500">API Key:</span>
                    <code className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                      {consumer.apiKey}
                    </code>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Usage</span>
                      <span>{consumer.requests.toLocaleString()} / {consumer.quota.toLocaleString()}</span>
                    </div>
                    <Progress value={(consumer.requests / consumer.quota) * 100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Requests:</span>
                      <div className="font-medium">{consumer.requests.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Quota:</span>
                      <div className="font-medium">{consumer.quota.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Key className="w-3 h-3 mr-1" />
                      Rotate Key
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-3 h-3 mr-1" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request Volume Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Request Volume (24h)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trafficMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="requests" fill="#3b82f6" />
                      <Bar dataKey="errors" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Response Time Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Response Time Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trafficMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="latency" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Kong Gateway Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-96 mb-4">
                <pre className="text-sm">
                  <code>{kongConfig}</code>
                </pre>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Settings className="w-4 h-4 mr-2" />
                  Apply Configuration
                </Button>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Validate Config
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Export YAML
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default APIGatewayConfig;