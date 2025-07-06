import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Search,
  Database,
  Network,
  Clock,
  Zap,
  BarChart3,
  GitBranch
} from 'lucide-react';

interface TraceMetric {
  service: string;
  operation: string;
  duration: number;
  status: 'success' | 'error' | 'timeout';
  timestamp: string;
  traceId: string;
  spanCount: number;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  service: string;
  message: string;
  metadata: any;
}

const ObservabilityCenter = () => {
  const [systemHealth, setSystemHealth] = useState(98.7);
  const [activeTraces, setActiveTraces] = useState(156);
  const [errorRate, setErrorRate] = useState(0.02);

  const traceMetrics: TraceMetric[] = [
    {
      service: 'subscriber-api',
      operation: 'create_subscriber',
      duration: 245,
      status: 'success',
      timestamp: '2 min ago',
      traceId: 'TR-001-ABC123',
      spanCount: 8
    },
    {
      service: 'billing-engine',
      operation: 'process_billing',
      duration: 1250,
      status: 'success',
      timestamp: '3 min ago',
      traceId: 'TR-002-DEF456',
      spanCount: 12
    },
    {
      service: 'hlr-integration',
      operation: 'location_update',
      duration: 89,
      status: 'error',
      timestamp: '5 min ago',
      traceId: 'TR-003-GHI789',
      spanCount: 6
    },
    {
      service: 'fraud-detection',
      operation: 'analyze_transaction',
      duration: 156,
      status: 'success',
      timestamp: '6 min ago',
      traceId: 'TR-004-JKL012',
      spanCount: 4
    }
  ];

  const logEntries: LogEntry[] = [
    {
      id: 'LOG001',
      timestamp: '2025-01-06 12:45:32',
      level: 'error',
      service: 'hlr-integration',
      message: 'HLR timeout during location update',
      metadata: { subscriber_id: 'SUB123', timeout_ms: 5000 }
    },
    {
      id: 'LOG002',
      timestamp: '2025-01-06 12:44:15',
      level: 'info',
      service: 'subscriber-api',
      message: 'New subscriber created successfully',
      metadata: { subscriber_id: 'SUB124', mvno: 'EduConnect' }
    },
    {
      id: 'LOG003',
      timestamp: '2025-01-06 12:43:58',
      level: 'warn',
      service: 'billing-engine',
      message: 'High processing time detected',
      metadata: { duration_ms: 1250, threshold_ms: 1000 }
    },
    {
      id: 'LOG004',
      timestamp: '2025-01-06 12:42:33',
      level: 'info',
      service: 'fraud-detection',
      message: 'Transaction analyzed - no fraud detected',
      metadata: { transaction_id: 'TXN789', risk_score: 0.15 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'timeout':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'warn':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'info':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'debug':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 0.5)));
      setActiveTraces(prev => Math.max(100, prev + Math.floor((Math.random() - 0.5) * 10)));
      setErrorRate(prev => Math.max(0, Math.min(0.1, prev + (Math.random() - 0.5) * 0.01)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Observability & Monitoring Center</h2>
            <p className="text-muted-foreground">Distributed tracing, centralized logging & real-time metrics</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Query Logs
          </Button>
          <Button variant="outline" size="sm">
            <GitBranch className="w-4 h-4 mr-2" />
            Trace Analysis
          </Button>
          <Badge className="bg-green-100 text-green-800">
            <Activity className="w-4 h-4 mr-1" />
            {systemHealth.toFixed(1)}% Health
          </Badge>
        </div>
      </div>

      {/* System Health Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              All monitoring systems operational - {activeTraces} active traces, {errorRate.toFixed(2)}% error rate
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                <BarChart3 className="w-3 h-3 mr-1" />
                Real-time
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Observability Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-700">
                Healthy
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">{systemHealth.toFixed(1)}%</div>
            <div className="text-sm text-green-600">System Health</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <GitBranch className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{activeTraces}</div>
            <div className="text-sm text-blue-600">Active Traces</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <Badge variant="outline" className="bg-red-100 text-red-700">
                Low
              </Badge>
            </div>
            <div className="text-2xl font-bold text-red-700">{errorRate.toFixed(2)}%</div>
            <div className="text-sm text-red-600">Error Rate</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                P95
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">245ms</div>
            <div className="text-sm text-purple-600">Avg Latency</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traces" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="traces">Distributed Tracing</TabsTrigger>
          <TabsTrigger value="logs">Centralized Logs</TabsTrigger>
          <TabsTrigger value="metrics">Real-time Metrics</TabsTrigger>
          <TabsTrigger value="alerts">Alerting</TabsTrigger>
        </TabsList>

        <TabsContent value="traces" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Distributed Trace Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {traceMetrics.map((trace, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Network className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{trace.service}</span>
                        <Badge variant="secondary" className="text-xs">
                          {trace.operation}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(trace.status)}>
                          {trace.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-500">{trace.timestamp}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <div className="font-medium">{trace.duration}ms</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Spans:</span>
                        <div className="font-medium">{trace.spanCount}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Trace ID:</span>
                        <div className="font-medium text-blue-600">{trace.traceId}</div>
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View Trace
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Centralized Log Stream
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {logEntries.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-500">{log.timestamp}</span>
                        <Badge variant="outline" className={getLevelColor(log.level)}>
                          {log.level.toUpperCase()}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {log.service}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Search className="w-3 h-3 mr-1" />
                        Context
                      </Button>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{log.message}</p>
                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      <strong>Metadata:</strong> {JSON.stringify(log.metadata, null, 2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Subscriber API</span>
                    <Badge className="bg-green-100 text-green-800">245ms avg</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Billing Engine</span>
                    <Badge className="bg-yellow-100 text-yellow-800">1.2s avg</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">HLR Integration</span>
                    <Badge className="bg-green-100 text-green-800">89ms avg</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fraud Detection</span>
                    <Badge className="bg-green-100 text-green-800">156ms avg</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Disk I/O</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Network I/O</span>
                      <span>56%</span>
                    </div>
                    <Progress value={56} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High Error Rate (&gt; 1%)</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time SLA (&gt; 5s)</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Service Unavailable</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Connection</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Alerts</span>
                    <Badge className="bg-blue-100 text-blue-800">Configured</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS Alerts</span>
                    <Badge className="bg-blue-100 text-blue-800">Configured</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Slack Integration</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">PagerDuty</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ObservabilityCenter;