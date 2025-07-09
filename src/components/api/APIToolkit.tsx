import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  Code, 
  Key, 
  Monitor, 
  Play,
  Settings,
  BarChart3,
  Users,
  Database,
  Globe,
  Lock,
  AlertTriangle,
  CheckCircle,
  Activity,
  FileText,
  Terminal,
  Zap,
  Eye,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Search,
  Copy,
  ExternalLink,
  Clock,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  TrendingUp,
  XCircle,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface APIEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  status: 'active' | 'inactive' | 'deprecated';
  security: 'public' | 'authenticated' | 'admin';
  lastUsed: string;
  requestCount: number;
  errorRate: number;
}

interface SecurityMetric {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface LogEntry {
  id: string;
  timestamp: string;
  method: string;
  endpoint: string;
  status: number;
  responseTime: number;
  ip: string;
  userAgent: string;
  level: 'info' | 'warning' | 'error';
}

const APIToolkit = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('endpoints');
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([
    {
      id: '1',
      name: 'User Authentication',
      method: 'POST',
      path: '/api/v1/auth/login',
      description: 'Authenticate user credentials and issue JWT tokens',
      status: 'active',
      security: 'public',
      lastUsed: '2 minutes ago',
      requestCount: 15847,
      errorRate: 0.2
    },
    {
      id: '2',
      name: 'User Profile',
      method: 'GET',
      path: '/api/v1/users/profile',
      description: 'Retrieve authenticated user profile information',
      status: 'active',
      security: 'authenticated',
      lastUsed: '5 minutes ago',
      requestCount: 9234,
      errorRate: 0.1
    },
    {
      id: '3',
      name: 'Payment Processing',
      method: 'POST',
      path: '/api/v1/payments/process',
      description: 'Process secure payment transactions',
      status: 'active',
      security: 'authenticated',
      lastUsed: '1 hour ago',
      requestCount: 3456,
      errorRate: 0.5
    },
    {
      id: '4',
      name: 'USSD Session Management',
      method: 'POST',
      path: '/api/v1/ussd/sessions',
      description: 'Create and manage USSD communication sessions',
      status: 'active',
      security: 'authenticated',
      lastUsed: '30 minutes ago',
      requestCount: 12890,
      errorRate: 0.3
    },
    {
      id: '5',
      name: 'Admin Analytics',
      method: 'GET',
      path: '/api/v1/admin/analytics',
      description: 'Retrieve comprehensive system analytics data',
      status: 'active',
      security: 'admin',
      lastUsed: '2 hours ago',
      requestCount: 1247,
      errorRate: 0.0
    }
  ]);

  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([
    { label: 'Auth Success Rate', value: '99.8%', status: 'good', trend: 'stable' },
    { label: 'Failed Logins', value: '0.2%', status: 'good', trend: 'down' },
    { label: 'Rate Limit Hits', value: '12/hour', status: 'warning', trend: 'up' },
    { label: 'Security Incidents', value: '0', status: 'good', trend: 'stable' }
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 120000).toISOString(),
      method: 'POST',
      endpoint: '/api/v1/auth/login',
      status: 200,
      responseTime: 145,
      ip: '192.168.1.100',
      userAgent: 'Divine Mobile App v2.1.0',
      level: 'info'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      method: 'GET',
      endpoint: '/api/v1/users/profile',
      status: 200,
      responseTime: 89,
      ip: '192.168.1.101',
      userAgent: 'Divine Mobile App v2.1.0',
      level: 'info'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      method: 'POST',
      endpoint: '/api/v1/payments/process',
      status: 500,
      responseTime: 2300,
      ip: '192.168.1.102',
      userAgent: 'PostmanRuntime/7.32.0',
      level: 'error'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      method: 'POST',
      endpoint: '/api/v1/ussd/sessions',
      status: 201,
      responseTime: 156,
      ip: '10.0.0.45',
      userAgent: 'USSD Gateway v1.0',
      level: 'info'
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 1200000).toISOString(),
      method: 'GET',
      endpoint: '/api/v1/admin/analytics',
      status: 401,
      responseTime: 12,
      ip: '203.0.113.42',
      userAgent: 'curl/7.68.0',
      level: 'warning'
    }
  ]);

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-500';
      case 'POST': return 'bg-green-500';
      case 'PUT': return 'bg-orange-500';
      case 'DELETE': return 'bg-red-500';
      case 'PATCH': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'deprecated': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSecurityIcon = (security: string) => {
    switch (security) {
      case 'public': return <Globe className="w-4 h-4" />;
      case 'authenticated': return <Key className="w-4 h-4" />;
      case 'admin': return <Shield className="w-4 h-4" />;
      default: return <Lock className="w-4 h-4" />;
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'text-blue-600';
      case 'warning': return 'text-orange-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const testEndpoint = (endpoint: APIEndpoint) => {
    toast({
      title: "Testing Endpoint",
      description: `Testing ${endpoint.method} ${endpoint.path}...`,
    });
    
    // Simulate API test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      toast({
        title: success ? "Test Successful" : "Test Failed",
        description: success 
          ? `${endpoint.name} responded in 124ms with status 200`
          : `${endpoint.name} failed with status 500`,
        variant: success ? "default" : "destructive"
      });
    }, 2000);
  };

  const generateAPIKey = () => {
    const key = 'dk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    toast({
      title: "API Key Generated",
      description: `New API key: ${key}`,
    });
  };

  const runSecurityScan = () => {
    toast({
      title: "Security Scan Started",
      description: "Running comprehensive security analysis...",
    });
    
    setTimeout(() => {
      toast({
        title: "Security Scan Complete",
        description: "No vulnerabilities detected. All endpoints secure.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 md:p-6 border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">API Toolkit</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Comprehensive API management, security, and monitoring for Divine Mobile
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-blue-600">
              {endpoints.length}
            </div>
            <div className="text-muted-foreground">Active APIs</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-green-600">
              99.8%
            </div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-orange-600">
              {logs.length}
            </div>
            <div className="text-muted-foreground">Recent Logs</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-purple-600">
              0
            </div>
            <div className="text-muted-foreground">Incidents</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border shadow-sm overflow-hidden">
          <TabsList className="w-full h-auto p-2 bg-transparent">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 w-full">
              <TabsTrigger 
                value="endpoints" 
                className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all hover:bg-muted/50"
              >
                <Code className="w-4 h-4" />
                <span className="text-xs font-medium">Endpoints</span>
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all hover:bg-muted/50"
              >
                <Shield className="w-4 h-4" />
                <span className="text-xs font-medium">Security</span>
              </TabsTrigger>
              <TabsTrigger 
                value="monitoring" 
                className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all hover:bg-muted/50"
              >
                <Monitor className="w-4 h-4" />
                <span className="text-xs font-medium">Monitoring</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all hover:bg-muted/50"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs font-medium">Analytics</span>
              </TabsTrigger>
              <TabsTrigger 
                value="testing" 
                className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all hover:bg-muted/50"
              >
                <Play className="w-4 h-4" />
                <span className="text-xs font-medium">Testing</span>
              </TabsTrigger>
              <TabsTrigger 
                value="docs" 
                className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all hover:bg-muted/50"
              >
                <FileText className="w-4 h-4" />
                <span className="text-xs font-medium">Documentation</span>
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          <TabsContent value="endpoints" className="mt-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">API Endpoints</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={generateAPIKey}>
                    <Key className="w-4 h-4 mr-2" />
                    Generate API Key
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Endpoint
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4">
                {endpoints.map((endpoint) => (
                  <Card key={endpoint.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge className={`${getMethodColor(endpoint.method)} text-white`}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                            {endpoint.path}
                          </code>
                          <Badge variant="outline" className={`${getStatusColor(endpoint.status)} text-white border-0`}>
                            {endpoint.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            {getSecurityIcon(endpoint.security)}
                            <span className="capitalize">{endpoint.security}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => testEndpoint(endpoint)}
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Test
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Requests:</span>
                          <div className="font-medium">{endpoint.requestCount.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Error Rate:</span>
                          <div className={`font-medium ${endpoint.errorRate > 1 ? 'text-red-600' : 'text-green-600'}`}>
                            {endpoint.errorRate}%
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Used:</span>
                          <div className="font-medium">{endpoint.lastUsed}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <div className="font-medium capitalize">{endpoint.status}</div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Security Overview</h3>
                <Button onClick={runSecurityScan} className="bg-primary hover:bg-primary/90">
                  <Shield className="w-4 h-4 mr-2" />
                  Run Security Scan
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {securityMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{metric.label}</p>
                          <p className="text-lg font-bold">{metric.value}</p>
                        </div>
                        <div className={`p-2 rounded-lg ${getMetricStatusColor(metric.status)}`}>
                          {metric.status === 'good' ? <CheckCircle className="w-4 h-4" /> :
                           metric.status === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                           <XCircle className="w-4 h-4" />}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="w-5 h-5" />
                      Authentication Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { method: 'JWT Tokens', status: 'active', users: '15,847', security: 'high' },
                        { method: 'OAuth 2.0', status: 'active', users: '8,234', security: 'high' },
                        { method: 'API Keys', status: 'active', users: '2,456', security: 'medium' },
                        { method: 'Basic Auth', status: 'deprecated', users: '156', security: 'low' }
                      ].map((auth, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{auth.method}</div>
                            <div className="text-sm text-muted-foreground">{auth.users} users</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={auth.status === 'active' ? 'default' : 'secondary'}>
                              {auth.status}
                            </Badge>
                            <Badge variant={
                              auth.security === 'high' ? 'default' : 
                              auth.security === 'medium' ? 'secondary' : 'destructive'
                            }>
                              {auth.security}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Security Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { event: 'Failed login attempt detected', time: '2 min ago', severity: 'warning', source: 'IP: 203.0.113.42' },
                        { event: 'Rate limit exceeded', time: '15 min ago', severity: 'warning', source: 'API Key: dk_***abc123' },
                        { event: 'New API key generated', time: '1 hour ago', severity: 'info', source: 'Admin: admin@divinemobile.co.za' },
                        { event: 'User role updated to admin', time: '3 hours ago', severity: 'info', source: 'Admin: admin@divine.com' },
                        { event: 'Suspicious USSD pattern detected', time: '6 hours ago', severity: 'warning', source: 'USSD Gateway' }
                      ].map((event, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            event.severity === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <div className="font-medium">{event.event}</div>
                            <div className="text-sm text-muted-foreground">{event.source}</div>
                            <div className="text-xs text-muted-foreground">{event.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="mt-0">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Activity className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Response Time</p>
                        <p className="text-lg font-bold">124ms</p>
                        <p className="text-xs text-green-600">↓ 12ms from yesterday</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Requests/min</p>
                        <p className="text-lg font-bold">1,247</p>
                        <p className="text-xs text-green-600">↑ 8% from last hour</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Error Rate</p>
                        <p className="text-lg font-bold">0.2%</p>
                        <p className="text-xs text-green-600">↓ 0.1% from yesterday</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Real-time API Logs
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {logs.map((log) => (
                      <div key={log.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                        <div className="w-16 text-xs text-muted-foreground font-mono">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                        <Badge className={`${getMethodColor(log.method)} text-white text-xs`}>
                          {log.method}
                        </Badge>
                        <code className="text-xs bg-white px-2 py-1 rounded flex-1 min-w-0 truncate">
                          {log.endpoint}
                        </code>
                        <Badge variant={log.status < 400 ? 'default' : 'destructive'}>
                          {log.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground w-12 text-right">
                          {log.responseTime}ms
                        </span>
                        <span className={`text-xs ${getLogLevelColor(log.level)} w-16 text-center`}>
                          {log.level.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground w-24 truncate">
                          {log.ip}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Requests', value: '2.4M', change: '+12%', period: 'this month' },
                  { label: 'Unique Users', value: '15.8K', change: '+8%', period: 'this week' },
                  { label: 'Avg Response', value: '124ms', change: '-3%', period: 'last 24h' },
                  { label: 'Data Transfer', value: '847GB', change: '+15%', period: 'this month' }
                ].map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-lg font-bold">{stat.value}</p>
                        </div>
                        <div className={`text-sm font-medium ${
                          stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{stat.period}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Most Used Endpoints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {endpoints
                        .sort((a, b) => b.requestCount - a.requestCount)
                        .slice(0, 5)
                        .map((endpoint) => (
                        <div key={endpoint.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge className={`${getMethodColor(endpoint.method)} text-white text-xs`}>
                              {endpoint.method}
                            </Badge>
                            <div>
                              <div className="font-medium text-sm">{endpoint.name}</div>
                              <div className="text-xs text-muted-foreground">{endpoint.path}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{endpoint.requestCount.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">requests</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Error Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { code: '401', count: 89, description: 'Unauthorized', trend: 'up' },
                        { code: '404', count: 45, description: 'Not Found', trend: 'down' },
                        { code: '500', count: 12, description: 'Internal Server Error', trend: 'stable' },
                        { code: '429', count: 8, description: 'Rate Limited', trend: 'up' },
                        { code: '403', count: 3, description: 'Forbidden', trend: 'down' }
                      ].map((error, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="destructive">{error.code}</Badge>
                            <span className="text-sm">{error.description}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{error.count}</span>
                            <span className={`text-xs ${
                              error.trend === 'up' ? 'text-red-600' : 
                              error.trend === 'down' ? 'text-green-600' : 'text-gray-600'
                            }`}>
                              {error.trend === 'up' ? '↑' : error.trend === 'down' ? '↓' : '→'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="testing" className="mt-0">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    API Testing Console
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Method</label>
                      <Select defaultValue="GET">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                          <SelectItem value="PATCH">PATCH</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Endpoint</label>
                      <Input placeholder="/api/v1/..." />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Headers</label>
                    <Textarea 
                      placeholder={`Authorization: Bearer your_token_here\nContent-Type: application/json\nX-API-Key: your_api_key`}
                      className="font-mono text-sm" 
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Request Body</label>
                    <Textarea 
                      placeholder={`{\n  "username": "example@divinemobile.co.za",\n  "password": "your_password"\n}`}
                      className="font-mono text-sm" 
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="bg-primary hover:bg-primary/90">
                      <Play className="w-4 h-4 mr-2" />
                      Send Request
                    </Button>
                    <Button variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy as cURL
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Collection
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Automated Test Suites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Authentication & Authorization Tests', status: 'passed', duration: '2.3s', tests: 12, coverage: '98%' },
                      { name: 'User Management API Tests', status: 'passed', duration: '1.8s', tests: 8, coverage: '95%' },
                      { name: 'Payment Processing Tests', status: 'failed', duration: '4.1s', tests: 15, coverage: '87%' },
                      { name: 'USSD Integration Tests', status: 'passed', duration: '3.2s', tests: 20, coverage: '92%' },
                      { name: 'Security & Compliance Tests', status: 'passed', duration: '5.7s', tests: 25, coverage: '99%' }
                    ].map((suite, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            suite.status === 'passed' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <div className="font-medium">{suite.name}</div>
                            <div className="text-sm text-muted-foreground">{suite.tests} tests • {suite.coverage} coverage</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{suite.duration}</div>
                          <Badge variant={suite.status === 'passed' ? 'default' : 'destructive'}>
                            {suite.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="docs" className="mt-0">
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      API Documentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { title: 'Getting Started Guide', type: 'guide', updated: '2 days ago', category: 'Introduction' },
                        { title: 'Authentication & Authorization', type: 'guide', updated: '1 week ago', category: 'Security' },
                        { title: 'USSD API Reference', type: 'reference', updated: '3 days ago', category: 'Core APIs' },
                        { title: 'Payment Gateway Integration', type: 'guide', updated: '5 days ago', category: 'Payments' },
                        { title: 'Rate Limiting & Throttling', type: 'guide', updated: '1 week ago', category: 'Best Practices' },
                        { title: 'OpenAPI Specification', type: 'spec', updated: '3 days ago', category: 'Reference' }
                      ].map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <div>
                              <div className="font-medium">{doc.title}</div>
                              <div className="text-sm text-muted-foreground">{doc.category} • Updated {doc.updated}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{doc.type}</Badge>
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      SDK & Code Examples
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { language: 'JavaScript', framework: 'React Native', downloads: 1247, version: 'v2.1.0' },
                        { language: 'Python', framework: 'Django REST', downloads: 892, version: 'v1.8.2' },
                        { language: 'PHP', framework: 'Laravel', downloads: 567, version: 'v1.5.1' },
                        { language: 'Java', framework: 'Spring Boot', downloads: 334, version: 'v1.3.0' },
                        { language: 'C#', framework: '.NET Core', downloads: 198, version: 'v1.2.0' },
                        { language: 'Go', framework: 'Gin', downloads: 145, version: 'v1.1.0' }
                      ].map((example, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                          <div className="flex items-center gap-3">
                            <Code className="w-4 h-4 text-gray-500" />
                            <div>
                              <div className="font-medium">{example.language}</div>
                              <div className="text-sm text-muted-foreground">{example.framework} • {example.version}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{example.downloads} downloads</span>
                            <Download className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Interactive API Explorer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="mb-2 text-gray-400"># Example: Authenticate User</div>
                    <div className="mb-2">$ curl -X POST "https://api.divinemobile.com/v1/auth/login" \</div>
                    <div className="mb-2 ml-6">-H "Content-Type: application/json" \</div>
                    <div className="mb-4 ml-6">-d {`'{"username": "example@divinemobile.co.za", "password": "your_password"}'`}</div>
                    <div className="text-blue-400 mb-2"># Response:</div>
                    <div className="text-white">
                      {JSON.stringify({
                        success: true,
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        user: {
                          id: "12345",
                          name: "John Mthembu",
                          email: "example@divinemobile.co.za",
                          role: "customer"
                        },
                        expires_in: 3600
                      }, null, 2)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default APIToolkit;