import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  BarChart3, 
  Activity, 
  Server, 
  Database, 
  Gauge, 
  Bell,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Settings,
  Eye,
  TrendingUp,
  Zap,
  Clock
} from 'lucide-react';

interface MetricData {
  timestamp: string;
  cpu: number;
  memory: number;
  network: number;
  storage: number;
}

interface ServiceHealth {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
}

interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  service: string;
  message: string;
  timestamp: string;
  status: 'active' | 'resolved';
}

const MonitoringStack = () => {
  const [timeRange, setTimeRange] = useState('1h');
  const [alertCount, setAlertCount] = useState(12);
  const [systemLoad, setSystemLoad] = useState(67.3);

  const metricsData: MetricData[] = [
    { timestamp: '00:00', cpu: 45, memory: 62, network: 78, storage: 34 },
    { timestamp: '00:15', cpu: 52, memory: 65, network: 82, storage: 36 },
    { timestamp: '00:30', cpu: 48, memory: 68, network: 75, storage: 38 },
    { timestamp: '00:45', cpu: 61, memory: 71, network: 88, storage: 41 },
    { timestamp: '01:00', cpu: 58, memory: 69, network: 92, storage: 43 },
    { timestamp: '01:15', cpu: 55, memory: 72, network: 86, storage: 45 },
    { timestamp: '01:30', cpu: 49, memory: 74, network: 79, storage: 47 }
  ];

  const serviceHealth: ServiceHealth[] = [
    {
      name: 'MVNE API',
      status: 'healthy',
      uptime: 99.7,
      responseTime: 145,
      errorRate: 0.2,
      throughput: 1247
    },
    {
      name: 'HSS/HLR Service',
      status: 'healthy',
      uptime: 99.9,
      responseTime: 89,
      errorRate: 0.1,
      throughput: 892
    },
    {
      name: 'Rating Engine',
      status: 'warning',
      uptime: 98.5,
      responseTime: 234,
      errorRate: 1.2,
      throughput: 2156
    },
    {
      name: 'CDR Processing',
      status: 'healthy',
      uptime: 99.2,
      responseTime: 67,
      errorRate: 0.3,
      throughput: 3421
    },
    {
      name: 'SMSC Service',
      status: 'critical',
      uptime: 95.1,
      responseTime: 456,
      errorRate: 3.8,
      throughput: 567
    },
    {
      name: 'Message Queue',
      status: 'healthy',
      uptime: 99.8,
      responseTime: 23,
      errorRate: 0.0,
      throughput: 8934
    }
  ];

  const activeAlerts: Alert[] = [
    {
      id: 'ALT001',
      severity: 'critical',
      service: 'SMSC Service',
      message: 'High error rate detected - 3.8% failures in last 5 minutes',
      timestamp: '2 min ago',
      status: 'active'
    },
    {
      id: 'ALT002',
      severity: 'warning',
      service: 'Rating Engine',
      message: 'Response time above threshold - avg 234ms',
      timestamp: '5 min ago',
      status: 'active'
    },
    {
      id: 'ALT003',
      severity: 'info',
      service: 'CDR Processing',
      message: 'Queue size increasing - 15k pending records',
      timestamp: '8 min ago',
      status: 'active'
    },
    {
      id: 'ALT004',
      severity: 'warning',
      service: 'Database',
      message: 'Connection pool utilization at 85%',
      timestamp: '12 min ago',
      status: 'resolved'
    }
  ];

  const infrastructureMetrics = [
    { name: 'CPU Usage', value: 67, max: 100, unit: '%', status: 'normal' },
    { name: 'Memory Usage', value: 74, max: 100, unit: '%', status: 'normal' },
    { name: 'Disk Usage', value: 45, max: 100, unit: '%', status: 'normal' },
    { name: 'Network I/O', value: 234, max: 1000, unit: 'Mbps', status: 'normal' },
    { name: 'Database Connections', value: 145, max: 200, unit: '', status: 'normal' },
    { name: 'Queue Messages', value: 12847, max: 50000, unit: '', status: 'normal' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'normal':
      case 'resolved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical':
      case 'active':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'info':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(prev => Math.max(30, Math.min(90, prev + (Math.random() - 0.5) * 10)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl shadow-lg">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Monitoring Stack</h2>
            <p className="text-muted-foreground">Prometheus, Grafana & comprehensive observability</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1h</SelectItem>
              <SelectItem value="6h">6h</SelectItem>
              <SelectItem value="24h">24h</SelectItem>
              <SelectItem value="7d">7d</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="w-4 h-4 mr-1" />
            MONITORING
          </Badge>
        </div>
      </div>

      {/* System Status Alert */}
      <Alert className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
        <BarChart3 className="h-4 w-4 text-blue-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-blue-800 font-medium">
              Monitoring stack operational - System load: {systemLoad.toFixed(1)}%
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                <Bell className="w-3 h-3 mr-1" />
                {alertCount} Active Alerts
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Gauge className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-700">
                System
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">{systemLoad.toFixed(1)}%</div>
            <div className="text-sm text-green-600">System Load</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Server className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Services
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">
              {serviceHealth.filter(s => s.status === 'healthy').length}/{serviceHealth.length}
            </div>
            <div className="text-sm text-blue-600">Healthy Services</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Bell className="w-8 h-8 text-orange-600" />
              <Badge variant="outline" className="bg-orange-100 text-orange-700">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">{alertCount}</div>
            <div className="text-sm text-orange-600">Open Alerts</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Performance
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">99.2%</div>
            <div className="text-sm text-purple-600">Overall Uptime</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="metrics">System Metrics</TabsTrigger>
          <TabsTrigger value="services">Service Health</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Metrics Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  System Performance ({timeRange})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metricsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="cpu" 
                        stackId="1"
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="memory" 
                        stackId="1"
                        stroke="#22c55e" 
                        fill="#22c55e" 
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="network" 
                        stackId="1"
                        stroke="#f59e0b" 
                        fill="#f59e0b" 
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Resource Utilization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="w-5 h-5" />
                  Resource Utilization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {infrastructureMetrics.slice(0, 4).map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{metric.name}</span>
                        <span className="text-sm text-gray-600">
                          {metric.value}{metric.unit} / {metric.max}{metric.unit}
                        </span>
                      </div>
                      <Progress value={(metric.value / metric.max) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceHealth.map((service, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge variant="outline" className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Uptime:</span>
                      <div className="font-medium">{service.uptime}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Response:</span>
                      <div className="font-medium">{service.responseTime}ms</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Error Rate:</span>
                      <div className="font-medium">{service.errorRate}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Throughput:</span>
                      <div className="font-medium">{service.throughput}/min</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Health Score</span>
                      <span className="font-medium">{service.uptime}%</span>
                    </div>
                    <Progress value={service.uptime} className="h-2" />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-3 h-3 mr-1" />
                      Config
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Active Alerts
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure Rules
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(alert.severity)}
                        <span className="font-medium">{alert.service}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(alert.status)}>
                          {alert.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                      <div className="flex gap-2">
                        {alert.status === 'active' && (
                          <>
                            <Button variant="outline" size="sm">
                              Acknowledge
                            </Button>
                            <Button variant="outline" size="sm">
                              Resolve
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Infrastructure Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {infrastructureMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{metric.name}</span>
                        <span className="text-sm text-gray-600">
                          {typeof metric.value === 'number' && metric.value > 1000 ? 
                            metric.value.toLocaleString() : metric.value}{metric.unit}
                        </span>
                      </div>
                      <Progress value={(metric.value / metric.max) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metricsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="cpu" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="memory" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        dot={{ fill: '#22c55e', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonitoringStack;