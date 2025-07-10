
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
      
      <main className="container mx-auto px-3 py-4 md:px-4 md:py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
              <Server className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                DGX Station
                <Crown className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </h1>
              <p className="text-sm md:text-base text-gray-600">Enterprise-grade AI processing and data center capabilities</p>
            </div>
          </div>
          <Link to="/">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
              <img 
                src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" 
                alt="Divine Mobile Home"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </Link>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6">
          {systemMetrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">{metric.label}</p>
                    <p className={`text-lg md:text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  </div>
                  <div className={`${metric.color} sm:ml-2`}>
                    {metric.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Mobile-First Tabs */}
        <Tabs defaultValue="workflows" className="space-y-4">
          {/* Mobile-First Vertical Tab Navigation */}
          <div className="w-full">
            <TabsList className="flex flex-col w-full h-auto p-1 bg-white shadow-lg border border-blue-100 rounded-xl space-y-1">
              <TabsTrigger 
                value="workflows" 
                className="w-full flex items-center justify-start gap-3 p-4 text-left text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-50 data-[state=active]:to-blue-50 data-[state=active]:text-purple-700 data-[state=active]:border-l-4 data-[state=active]:border-l-purple-500 hover:bg-gray-50 transition-all rounded-lg"
              >
                <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Agentic Workflows</div>
                  <div className="text-xs text-gray-500">Manage AI workflows</div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="resources" 
                className="w-full flex items-center justify-start gap-3 p-4 text-left text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-50 data-[state=active]:to-emerald-50 data-[state=active]:text-green-700 data-[state=active]:border-l-4 data-[state=active]:border-l-green-500 hover:bg-gray-50 transition-all rounded-lg"
              >
                <div className="p-2 rounded-lg bg-green-100 text-green-600">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Resource Management</div>
                  <div className="text-xs text-gray-500">Monitor system resources</div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="monitor" 
                className="w-full flex items-center justify-start gap-3 p-4 text-left text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-indigo-50 data-[state=active]:text-blue-700 data-[state=active]:border-l-4 data-[state=active]:border-l-blue-500 hover:bg-gray-50 transition-all rounded-lg"
              >
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">System Monitor</div>
                  <div className="text-xs text-gray-500">Real-time system status</div>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content */}
          <TabsContent value="workflows" className="space-y-4 mt-6">
            <Card className="border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Brain className="w-5 h-5" />
                  Active Agentic Workflows
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid gap-4">
                  {workflowTemplates.map((workflow) => (
                    <Card key={workflow.id} className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3 gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1">{workflow.name}</h3>
                            <p className="text-sm text-gray-600">{workflow.description}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <TabsContent value="resources" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <Card className="border-green-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Cpu className="w-5 h-5" />
                    Compute Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
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

              <Card className="border-green-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Database className="w-5 h-5" />
                    Storage & Network
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
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

          <TabsContent value="monitor" className="space-y-4 mt-6">
            <Card className="border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Activity className="w-5 h-5" />
                  Real-time System Monitor
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
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
        <Card className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 mb-2">BaaS Integration Active</h3>
                <p className="text-gray-600 text-sm">
                  DGX Station is fully integrated with Divine Mobile's BaaS platform, providing 
                  enterprise-grade data center capabilities for resource-intensive Agentic workflows 
                  and AI processing tasks.
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
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
