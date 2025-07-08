import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Container, 
  Database, 
  GitBranch, 
  MonitorSpeaker, 
  Shield, 
  Workflow,
  TrendingUp,
  AlertCircle,
  Server,
  Cpu,
  MemoryStick,
  Network,
  Zap
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MVNEDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const systemHealth = {
    microservices: [
      { name: 'Billing Service', status: 'healthy', cpu: 45, memory: 67, responseTime: 120 },
      { name: 'Provisioning Service', status: 'warning', cpu: 78, memory: 82, responseTime: 350 },
      { name: 'Analytics Service', status: 'healthy', cpu: 23, memory: 45, responseTime: 89 },
      { name: 'Support Service', status: 'critical', cpu: 92, memory: 95, responseTime: 2100 },
      { name: 'Orchestration Service', status: 'healthy', cpu: 34, memory: 52, responseTime: 156 }
    ]
  };

  const fraudDetection = {
    alerts: [
      { id: 1, type: 'High Risk Transaction', customer: 'Customer #1234', riskScore: 85, status: 'investigating' },
      { id: 2, type: 'Velocity Anomaly', customer: 'Customer #5678', riskScore: 72, status: 'resolved' },
      { id: 3, type: 'Geographic Risk', customer: 'Customer #9012', riskScore: 91, status: 'pending' }
    ],
    stats: {
      totalTransactions: 45234,
      flaggedTransactions: 127,
      falsePositives: 12,
      detectionRate: 94.3
    }
  };

  const workflowStats = {
    templates: 24,
    activeWorkflows: 156,
    completedToday: 234,
    averageExecutionTime: 45
  };

  const cdrProcessing = {
    todaysStats: {
      recordsProcessed: 1234567,
      processingTime: 3.2,
      revenue: 45234.67,
      errorRate: 0.02
    },
    providers: ['MTN', 'Vodacom', 'Cell C', 'Telkom']
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">MVNE Control Center</h1>
          <p className="text-gray-600">Advanced monitoring and management for Divine Mobile MVNE platform</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="microservices">Microservices</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
            <TabsTrigger value="cdr">CDR Processing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Health Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                  <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5/5</div>
                  <p className="text-xs text-muted-foreground">All services operational</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fraud Detection</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{fraudDetection.stats.detectionRate}%</div>
                  <p className="text-xs text-muted-foreground">Detection accuracy</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">CDR Processing</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(cdrProcessing.todaysStats.recordsProcessed / 1000000).toFixed(1)}M</div>
                  <p className="text-xs text-muted-foreground">Records processed today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
                  <Workflow className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{workflowStats.activeWorkflows}</div>
                  <p className="text-xs text-muted-foreground">Running processes</p>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Real-time monitoring and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Support Service experiencing high response times (2.1s average)
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      High risk transaction detected - Customer #1234 flagged for review
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="microservices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Container className="w-5 h-5" />
                  Microservices Health Monitor
                </CardTitle>
                <CardDescription>Real-time monitoring of all MVNE microservices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {systemHealth.microservices.map((service, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${getStatusColor(service.status)}`}>
                            {getStatusIcon(service.status)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{service.name}</h3>
                            <Badge variant={service.status === 'healthy' ? 'default' : service.status === 'warning' ? 'secondary' : 'destructive'}>
                              {service.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          Response: {service.responseTime}ms
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium flex items-center gap-2">
                              <Cpu className="w-4 h-4" />
                              CPU Usage
                            </span>
                            <span className="text-sm">{service.cpu}%</span>
                          </div>
                          <Progress value={service.cpu} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium flex items-center gap-2">
                              <MemoryStick className="w-4 h-4" />
                              Memory Usage
                            </span>
                            <span className="text-sm">{service.memory}%</span>
                          </div>
                          <Progress value={service.memory} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Templates</CardTitle>
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{workflowStats.templates}</div>
                  <p className="text-xs text-muted-foreground">Available templates</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{workflowStats.activeWorkflows}</div>
                  <p className="text-xs text-muted-foreground">Currently running</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{workflowStats.completedToday}</div>
                  <p className="text-xs text-muted-foreground">Successful executions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Execution</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{workflowStats.averageExecutionTime}s</div>
                  <p className="text-xs text-muted-foreground">Average completion time</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Low-Code Workflow Builder</CardTitle>
                <CardDescription>Visual workflow designer for MVNE processes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Workflow className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Workflow Designer</h3>
                  <p className="text-gray-600 mb-4">Create and manage automated workflows with our visual designer</p>
                  <Button>Launch Workflow Builder</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fraud" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{fraudDetection.stats.totalTransactions.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Flagged</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{fraudDetection.stats.flaggedTransactions}</div>
                  <p className="text-xs text-muted-foreground">Suspicious transactions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{fraudDetection.stats.detectionRate}%</div>
                  <p className="text-xs text-muted-foreground">AI accuracy</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">False Positives</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{fraudDetection.stats.falsePositives}</div>
                  <p className="text-xs text-muted-foreground">Incorrect flags</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Fraud Detection Alerts</CardTitle>
                <CardDescription>AI-powered transaction monitoring and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fraudDetection.alerts.map((alert) => (
                    <div key={alert.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-red-600" />
                          <div>
                            <h4 className="font-semibold">{alert.type}</h4>
                            <p className="text-sm text-gray-600">{alert.customer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-red-600">{alert.riskScore}%</div>
                          <Badge variant={alert.status === 'resolved' ? 'default' : alert.status === 'investigating' ? 'secondary' : 'destructive'}>
                            {alert.status}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={alert.riskScore} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cdr" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Records Processed</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(cdrProcessing.todaysStats.recordsProcessed / 1000000).toFixed(1)}M</div>
                  <p className="text-xs text-muted-foreground">Today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cdrProcessing.todaysStats.processingTime}s</div>
                  <p className="text-xs text-muted-foreground">Average per batch</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R{cdrProcessing.todaysStats.revenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Generated today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cdrProcessing.todaysStats.errorRate}%</div>
                  <p className="text-xs text-muted-foreground">Processing errors</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>CDR Processing Status</CardTitle>
                <CardDescription>Real-time call detail record processing across all MNO providers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cdrProcessing.providers.map((provider) => (
                    <div key={provider} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Network className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-semibold">{provider}</h4>
                          <p className="text-sm text-gray-600">Processing CDR data</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-semibold">98.7%</div>
                          <div className="text-xs text-gray-600">Success rate</div>
                        </div>
                        <Badge variant="default">
                          <Zap className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default MVNEDashboard;