import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MonitorSpeaker, 
  Server, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  GitBranch,
  Shield,
  Clock,
  Zap,
  Database,
  Activity,
  Settings
} from 'lucide-react';

interface SystemMetric {
  component: string;
  status: 'healthy' | 'warning' | 'critical' | 'maintenance';
  uptime: number;
  lastCheck: string;
  responseTime: number;
  errorRate: number;
}

interface AlertItem {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  component: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

const ProductionOperationsCenter = () => {
  const [overallHealth, setOverallHealth] = useState(99.2);
  const [activeAlerts, setActiveAlerts] = useState(3);
  const [systemLoad, setSystemLoad] = useState(78);

  const systemMetrics: SystemMetric[] = [
    {
      component: 'MSC/GMSC',
      status: 'healthy',
      uptime: 99.8,
      lastCheck: '30s ago',
      responseTime: 15,
      errorRate: 0.02
    },
    {
      component: 'HLR/HSS',
      status: 'healthy',
      uptime: 99.9,
      lastCheck: '45s ago',
      responseTime: 8,
      errorRate: 0.01
    },
    {
      component: 'Billing Engine',
      status: 'warning',
      uptime: 98.5,
      lastCheck: '1m ago',
      responseTime: 45,
      errorRate: 0.1
    },
    {
      component: 'PCRF/DPI',
      status: 'healthy',
      uptime: 99.7,
      lastCheck: '20s ago',
      responseTime: 12,
      errorRate: 0.03
    },
    {
      component: 'Fraud Detection',
      status: 'healthy',
      uptime: 99.6,
      lastCheck: '15s ago',
      responseTime: 8,
      errorRate: 0.01
    },
    {
      component: 'Number Porting',
      status: 'healthy',
      uptime: 99.4,
      lastCheck: '1m ago',
      responseTime: 25,
      errorRate: 0.05
    }
  ];

  const alerts: AlertItem[] = [
    {
      id: 'ALT001',
      severity: 'high',
      component: 'Billing Engine',
      message: 'Response time exceeding SLA threshold (>30ms)',
      timestamp: '2 min ago',
      acknowledged: false
    },
    {
      id: 'ALT002',
      severity: 'medium',
      component: 'Database Cluster',
      message: 'Connection pool utilization at 85%',
      timestamp: '5 min ago',
      acknowledged: true
    },
    {
      id: 'ALT003',
      severity: 'low',
      component: 'API Gateway',
      message: 'Rate limiting activated for 3 endpoints',
      timestamp: '8 min ago',
      acknowledged: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'maintenance':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'maintenance':
        return <Settings className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOverallHealth(prev => prev + (Math.random() - 0.5) * 0.2);
      setSystemLoad(prev => Math.max(60, Math.min(90, prev + (Math.random() - 0.5) * 5)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
            <MonitorSpeaker className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Production Operations Center</h2>
            <p className="text-muted-foreground">24/7 NOC monitoring, disaster recovery & auto-scaling</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <GitBranch className="w-4 h-4 mr-2" />
            Deploy
          </Button>
          <Button variant="outline" size="sm">
            <Shield className="w-4 h-4 mr-2" />
            DR Test
          </Button>
          <Badge className="bg-green-100 text-green-800">
            <Activity className="w-4 h-4 mr-1" />
            {overallHealth.toFixed(1)}% Healthy
          </Badge>
        </div>
      </div>

      {/* System Health Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              All systems operational - {activeAlerts} active alerts requiring attention
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                <Server className="w-3 h-3 mr-1" />
                NOC Active
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Operations Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-700">
                Live
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">{overallHealth.toFixed(1)}%</div>
            <div className="text-sm text-green-600">System Health</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
              <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-yellow-700">{activeAlerts}</div>
            <div className="text-sm text-yellow-600">Open Alerts</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Load
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{systemLoad}%</div>
            <div className="text-sm text-blue-600">System Load</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Ready
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">100%</div>
            <div className="text-sm text-purple-600">Auto-Scale</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monitoring" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="disaster-recovery">DR</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-6">
          {/* System Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                System Component Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(metric.status)}
                        <span className="font-medium">{metric.component}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(metric.status)}>
                          {metric.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-500">{metric.lastCheck}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Uptime:</span>
                        <div className="font-medium text-green-600">{metric.uptime}%</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Response:</span>
                        <div className="font-medium">{metric.responseTime}ms</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Error Rate:</span>
                        <div className="font-medium">{metric.errorRate}%</div>
                      </div>
                      <div className="flex items-center">
                        <Progress value={metric.uptime} className="flex-1 h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Active Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        <span className="font-medium">{alert.component}</span>
                        <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{alert.timestamp}</span>
                        {alert.acknowledged ? (
                          <Badge className="bg-blue-100 text-blue-800">ACK</Badge>
                        ) : (
                          <Button variant="outline" size="sm">
                            Acknowledge
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{alert.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CI/CD Pipeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Build Status</span>
                    <Badge className="bg-green-100 text-green-800">Passing</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Test Suite</span>
                    <Badge className="bg-green-100 text-green-800">98% Pass</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Scan</span>
                    <Badge className="bg-green-100 text-green-800">Clean</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Deployment</span>
                    <Badge className="bg-blue-100 text-blue-800">Ready</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Auto-Scaling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CPU Threshold</span>
                    <Badge variant="secondary">75%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Memory Threshold</span>
                    <Badge variant="secondary">80%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Instances</span>
                    <Badge className="bg-green-100 text-green-800">12/20</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Scale Events (24h)</span>
                    <Badge className="bg-blue-100 text-blue-800">3</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="disaster-recovery" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Backup Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Backup</span>
                    <Badge className="bg-green-100 text-green-800">Current</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Config Backup</span>
                    <Badge className="bg-green-100 text-green-800">2h ago</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CDR Archive</span>
                    <Badge className="bg-green-100 text-green-800">Daily</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Geo-Replication</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>DR Testing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last DR Drill</span>
                    <Badge variant="secondary">Nov 15, 2024</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">RTO Target</span>
                    <Badge className="bg-green-100 text-green-800">&lt; 4 hours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">RPO Target</span>
                    <Badge className="bg-green-100 text-green-800">&lt; 1 hour</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Next Drill</span>
                    <Badge className="bg-blue-100 text-blue-800">Feb 15, 2025</Badge>
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

export default ProductionOperationsCenter;