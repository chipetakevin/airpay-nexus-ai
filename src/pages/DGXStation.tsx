
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Zap, 
  Brain, 
  Activity,
  Database,
  Network,
  Shield,
  Settings,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Crown,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DGXStation = () => {
  const [activeWorkflows, setActiveWorkflows] = useState(3);
  const [systemLoad, setSystemLoad] = useState(68);

  const workflowTemplates = [
    {
      id: 1,
      name: 'Customer Analytics Pipeline',
      description: 'Advanced customer behavior analysis using ML models',
      status: 'active',
      cpu: 45,
      gpu: 78,
      memory: 62,
      estimatedTime: '2h 15m'
    },
    {
      id: 2,
      name: 'Real-time Fraud Detection',
      description: 'AI-powered transaction monitoring and risk assessment',
      status: 'running',
      cpu: 72,
      gpu: 89,
      memory: 81,
      estimatedTime: 'Continuous'
    },
    {
      id: 3,
      name: 'Network Optimization Engine',
      description: 'Automated network performance and resource allocation',
      status: 'queued',
      cpu: 0,
      gpu: 0,
      memory: 15,
      estimatedTime: '45m'
    },
    {
      id: 4,
      name: 'Predictive Maintenance AI',
      description: 'Infrastructure health monitoring and predictive alerts',
      status: 'idle',
      cpu: 12,
      gpu: 8,
      memory: 23,
      estimatedTime: '1h 30m'
    }
  ];

  const systemMetrics = [
    { label: 'Total GPU Cores', value: '10,752', icon: <Cpu className="w-5 h-5" />, color: 'text-blue-600' },
    { label: 'Available Memory', value: '640 GB', icon: <HardDrive className="w-5 h-5" />, color: 'text-green-600' },
    { label: 'Network Bandwidth', value: '200 Gbps', icon: <Network className="w-5 h-5" />, color: 'text-purple-600' },
    { label: 'Active Workflows', value: activeWorkflows.toString(), icon: <Brain className="w-5 h-5" />, color: 'text-orange-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'queued':
        return 'bg-yellow-100 text-yellow-800';
      case 'idle':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Server className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                DGX Station
                <Crown className="w-6 h-6 text-yellow-600" />
              </h1>
              <p className="text-gray-600">Enterprise-grade AI processing and data center capabilities</p>
            </div>
          </div>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemMetrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                    <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  </div>
                  <div className={`${metric.color}`}>
                    {metric.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workflows" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Agentic Workflows
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Resource Management
            </TabsTrigger>
            <TabsTrigger value="monitor" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              System Monitor
            </TabsTrigger>
          </TabsList>

          {/* Workflows Tab */}
          <TabsContent value="workflows" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Active Agentic Workflows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {workflowTemplates.map((workflow) => (
                    <Card key={workflow.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{workflow.name}</h3>
                            <p className="text-sm text-gray-600">{workflow.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getStatusColor(workflow.status)}>
                              {workflow.status}
                            </Badge>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <Play className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Pause className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <RotateCcw className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>CPU</span>
                              <span>{workflow.cpu}%</span>
                            </div>
                            <Progress value={workflow.cpu} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>GPU</span>
                              <span>{workflow.gpu}%</span>
                            </div>
                            <Progress value={workflow.gpu} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Memory</span>
                              <span>{workflow.memory}%</span>
                            </div>
                            <Progress value={workflow.memory} className="h-2" />
                          </div>
                        </div>
                        
                        <div className="mt-3 text-sm text-gray-600">
                          Estimated completion: {workflow.estimatedTime}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-600" />
                    Compute Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>GPU Utilization</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>CPU Cores Active</span>
                      <span>124/256</span>
                    </div>
                    <Progress value={48} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Memory Usage</span>
                      <span>412/640 GB</span>
                    </div>
                    <Progress value={64} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-green-600" />
                    Storage & Network
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>NVMe Storage</span>
                      <span>2.8/15 TB</span>
                    </div>
                    <Progress value={18} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Network I/O</span>
                      <span>45/200 Gbps</span>
                    </div>
                    <Progress value={22} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Cache Efficiency</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Monitor Tab */}
          <TabsContent value="monitor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-600" />
                  Real-time System Monitor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      Performance Metrics
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Throughput</span>
                        <span className="text-sm font-medium">1.2 TFLOPS</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Latency</span>
                        <span className="text-sm font-medium">0.8ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Uptime</span>
                        <span className="text-sm font-medium">99.98%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      Security Status
                    </h3>
                    <div className="space-y-3">
                      <Badge className="bg-green-100 text-green-800">All Systems Secure</Badge>
                      <div className="text-sm text-gray-600">
                        Last security scan: 2 minutes ago
                      </div>
                      <div className="text-sm text-gray-600">
                        Encryption: AES-256 Active
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Settings className="w-4 h-4 text-purple-600" />
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <Button className="w-full" size="sm">Scale Resources</Button>
                      <Button className="w-full" variant="outline" size="sm">Export Logs</Button>
                      <Button className="w-full" variant="outline" size="sm">Schedule Maintenance</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Integration with BaaS */}
        <Card className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">BaaS Integration Active</h3>
                <p className="text-gray-600 text-sm">
                  DGX Station is fully integrated with Divinely Mobile's BaaS platform, providing 
                  enterprise-grade data center capabilities for resource-intensive Agentic workflows 
                  and AI processing tasks.
                </p>
              </div>
              <div className="flex gap-2">
                <Link to="/baas-platform">
                  <Button variant="outline" size="sm">
                    View BaaS
                  </Button>
                </Link>
                <Link to="/devine-baas">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Manage Integration
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default DGXStation;
