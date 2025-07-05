import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { 
  Cloud, 
  Database, 
  Layers,
  Network,
  BarChart3,
  TrendingUp,
  Activity,
  Users,
  DollarSign,
  Zap,
  Shield,
  Brain,
  Eye,
  Settings,
  RefreshCw,
  Bell,
  Target,
  Globe,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Phone,
  MessageSquare
} from 'lucide-react';

interface SystemIntegration {
  id: string;
  name: string;
  type: 'OSS' | 'BSS' | 'CRM' | 'External';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  dataPoints: number;
  health: number;
}

interface CloudMetric {
  id: string;
  service: string;
  usage: number;
  cost: number;
  performance: number;
  scalability: number;
}

interface CustomReport {
  id: string;
  name: string;
  type: 'scheduled' | 'on-demand' | 'real-time';
  frequency: string;
  lastRun: string;
  recipients: number;
  status: 'active' | 'paused';
}

const IntegratedAnalyticsSuite = () => {
  const [autoOptimization, setAutoOptimization] = useState(true);
  const [realTimeProcessing, setRealTimeProcessing] = useState(true);
  const [selectedDataSource, setSelectedDataSource] = useState('all');

  const [systemIntegrations] = useState<SystemIntegration[]>([
    { id: '1', name: 'HLR/HSS Core', type: 'OSS', status: 'connected', lastSync: '2 min ago', dataPoints: 15680, health: 98 },
    { id: '2', name: 'Billing Engine', type: 'BSS', status: 'connected', lastSync: '1 min ago', dataPoints: 8940, health: 95 },
    { id: '3', name: 'CRM Platform', type: 'CRM', status: 'connected', lastSync: '3 min ago', dataPoints: 5420, health: 92 },
    { id: '4', name: 'Network Elements', type: 'OSS', status: 'connected', lastSync: '30 sec ago', dataPoints: 23450, health: 97 },
    { id: '5', name: 'Payment Gateway', type: 'External', status: 'connected', lastSync: '1 min ago', dataPoints: 1250, health: 94 },
    { id: '6', name: 'Fraud Detection', type: 'External', status: 'error', lastSync: '15 min ago', dataPoints: 0, health: 0 }
  ]);

  const [cloudMetrics] = useState<CloudMetric[]>([
    { id: '1', service: 'AWS Analytics', usage: 78, cost: 15600, performance: 94, scalability: 98 },
    { id: '2', service: 'Azure AI Services', usage: 65, cost: 8900, performance: 91, scalability: 95 },
    { id: '3', service: 'GCP BigQuery', usage: 52, cost: 12400, performance: 96, scalability: 92 },
    { id: '4', service: 'Supabase Edge', usage: 89, cost: 4500, performance: 98, scalability: 97 }
  ]);

  const [customReports] = useState<CustomReport[]>([
    { id: '1', name: 'Daily Revenue Report', type: 'scheduled', frequency: 'Daily', lastRun: '6 hours ago', recipients: 12, status: 'active' },
    { id: '2', name: 'Network Performance Dashboard', type: 'real-time', frequency: 'Continuous', lastRun: 'Live', recipients: 8, status: 'active' },
    { id: '3', name: 'Customer Churn Analysis', type: 'scheduled', frequency: 'Weekly', lastRun: '2 days ago', recipients: 15, status: 'active' },
    { id: '4', name: 'Fraud Alert Summary', type: 'on-demand', frequency: 'As needed', lastRun: '1 hour ago', recipients: 5, status: 'active' },
    { id: '5', name: 'Monthly Executive Summary', type: 'scheduled', frequency: 'Monthly', lastRun: '5 days ago', recipients: 25, status: 'paused' }
  ]);

  // Unified analytics data
  const unifiedAnalyticsData = [
    { metric: 'Network Performance', score: 97, benchmark: 95, improvement: 2.1 },
    { metric: 'Revenue Optimization', score: 94, benchmark: 90, improvement: 4.4 },
    { metric: 'Customer Satisfaction', score: 91, benchmark: 88, improvement: 3.4 },
    { metric: 'Operational Efficiency', score: 89, benchmark: 85, improvement: 4.7 },
    { metric: 'Security Posture', score: 96, benchmark: 92, improvement: 4.3 },
    { metric: 'Cost Management', score: 88, benchmark: 82, improvement: 7.3 }
  ];

  const crossPlatformInsightsData = [
    { category: 'Network', customers: 12500, revenue: 2850000, satisfaction: 94 },
    { category: 'Billing', customers: 12500, revenue: 2850000, satisfaction: 91 },
    { category: 'Support', customers: 8900, revenue: 1250000, satisfaction: 89 },
    { category: 'Marketing', customers: 15600, revenue: 890000, satisfaction: 87 },
    { category: 'Sales', customers: 6700, revenue: 1680000, satisfaction: 93 }
  ];

  const aiInsightsData = [
    { insight: 'Revenue Optimization', impact: 'High', confidence: 94, action: 'Implement dynamic pricing' },
    { insight: 'Network Congestion', impact: 'Medium', confidence: 87, action: 'Scale bandwidth allocation' },
    { insight: 'Customer Retention', impact: 'High', confidence: 91, action: 'Launch retention campaign' },
    { insight: 'Fraud Prevention', impact: 'Critical', confidence: 96, action: 'Update detection algorithms' },
    { insight: 'Capacity Planning', impact: 'Medium', confidence: 83, action: 'Expand infrastructure' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-50 border-green-200';
      case 'disconnected': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Integrated Analytics Suite</h2>
            <p className="text-muted-foreground">Unified analytics platform with cloud-native scalability and AI insights</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch
              checked={autoOptimization}
              onCheckedChange={setAutoOptimization}
            />
            <span className="text-sm font-medium">Auto Optimization</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={realTimeProcessing}
              onCheckedChange={setRealTimeProcessing}
            />
            <span className="text-sm font-medium">Real-time Processing</span>
          </div>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <Cloud className="w-4 h-4 mr-1" />
            Cloud-Native
          </Badge>
        </div>
      </div>

      {/* System Health Overview */}
      <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Database className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-700">98.4%</div>
              <div className="text-sm text-purple-600">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-700">54.2K</div>
              <div className="text-sm text-green-600">Data Points/Min</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-700">15</div>
              <div className="text-sm text-blue-600">AI Models Active</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-700">6</div>
              <div className="text-sm text-orange-600">Integrations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Network className="w-4 h-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="cloud" className="flex items-center gap-2">
            <Cloud className="w-4 h-4" />
            Cloud Platform
          </TabsTrigger>
          <TabsTrigger value="unified" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Unified View
          </TabsTrigger>
          <TabsTrigger value="ai-insights" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Custom Reports
          </TabsTrigger>
        </TabsList>

        {/* System Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemIntegrations.map((integration) => (
              <Card key={integration.id} className={`transition-all duration-300 hover:shadow-lg ${
                integration.status === 'connected' ? 'border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white' :
                integration.status === 'error' ? 'border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 to-white' :
                'border-l-4 border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-white'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        integration.status === 'connected' ? 'bg-green-100' :
                        integration.status === 'error' ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        {integration.type === 'OSS' && <Server className="w-5 h-5 text-blue-600" />}
                        {integration.type === 'BSS' && <DollarSign className="w-5 h-5 text-green-600" />}
                        {integration.type === 'CRM' && <Users className="w-5 h-5 text-purple-600" />}
                        {integration.type === 'External' && <Globe className="w-5 h-5 text-orange-600" />}
                      </div>
                      <Badge variant="outline" className={getStatusColor(integration.status)}>
                        {integration.status.toUpperCase()}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {integration.type}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{integration.name}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Last Sync:</span>
                        <span className="font-medium">{integration.lastSync}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Points:</span>
                        <span className="font-medium">{integration.dataPoints.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Health:</span>
                        <div className="flex items-center gap-2">
                          <Progress value={integration.health} className="w-16 h-2" />
                          <span className="font-medium">{integration.health}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Cloud Platform Tab */}
        <TabsContent value="cloud" className="space-y-6">
          <Alert className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
            <Cloud className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span className="text-blue-800 font-medium">
                  Multi-cloud analytics platform scaling automatically based on demand
                </span>
                <Badge className="bg-blue-100 text-blue-800">
                  Auto-Scaling Active
                </Badge>
              </div>
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cloudMetrics.map((metric) => (
              <Card key={metric.id} className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Cloud className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold">{metric.service}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-700">R{metric.cost.toLocaleString()}</div>
                      <div className="text-xs text-blue-500">Monthly Cost</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Usage</span>
                      <div className="flex items-center gap-2">
                        <Progress value={metric.usage} className="w-20 h-2" />
                        <span className="text-sm font-medium">{metric.usage}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Performance</span>
                      <div className="flex items-center gap-2">
                        <Progress value={metric.performance} className="w-20 h-2" />
                        <span className="text-sm font-medium">{metric.performance}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Scalability</span>
                      <div className="flex items-center gap-2">
                        <Progress value={metric.scalability} className="w-20 h-2" />
                        <span className="text-sm font-medium">{metric.scalability}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Unified Analytics Tab */}
        <TabsContent value="unified" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Performance Scorecard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={unifiedAnalyticsData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar
                        name="Current Score"
                        dataKey="score"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="Benchmark"
                        dataKey="benchmark"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Cross-Platform Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={crossPlatformInsightsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="customers" fill="#3b82f6" />
                      <Bar dataKey="satisfaction" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="ai-insights" className="space-y-6">
          <Alert className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white">
            <Brain className="h-4 w-4 text-purple-600" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span className="text-purple-800 font-medium">
                  AI engine has processed 2.4M data points and generated 15 actionable insights
                </span>
                <Badge className="bg-purple-100 text-purple-800">
                  Neural Network v3.2
                </Badge>
              </div>
            </AlertDescription>
          </Alert>

          <div className="grid gap-6">
            {aiInsightsData.map((insight, index) => (
              <Card key={index} className="border-l-4 border-l-indigo-500 bg-gradient-to-br from-indigo-50 to-white">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Brain className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{insight.insight}</h3>
                        <p className="text-sm text-gray-600 mt-1">Recommended Action: {insight.action}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getImpactColor(insight.impact)}>
                        {insight.impact.toUpperCase()}
                      </Badge>
                      <div className="text-right">
                        <div className="text-lg font-bold text-indigo-600">{insight.confidence}%</div>
                        <div className="text-xs text-gray-500">Confidence</div>
                      </div>
                    </div>
                  </div>
                  <Progress value={insight.confidence} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Custom Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Custom Analytics Reports</h3>
              <p className="text-sm text-gray-600">Automated reporting and dashboard generation</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Eye className="w-4 h-4 mr-2" />
              Create New Report
            </Button>
          </div>

          <div className="grid gap-4">
            {customReports.map((report) => (
              <Card key={report.id} className={`transition-all duration-300 hover:shadow-md ${
                report.status === 'active' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-gray-400'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        report.type === 'real-time' ? 'bg-green-100' :
                        report.type === 'scheduled' ? 'bg-blue-100' : 'bg-orange-100'
                      }`}>
                        {report.type === 'real-time' && <Activity className="w-5 h-5 text-green-600" />}
                        {report.type === 'scheduled' && <Bell className="w-5 h-5 text-blue-600" />}
                        {report.type === 'on-demand' && <Eye className="w-5 h-5 text-orange-600" />}
                      </div>
                      <div>
                        <h3 className="font-semibold">{report.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>Frequency: {report.frequency}</span>
                          <span>Last Run: {report.lastRun}</span>
                          <span>Recipients: {report.recipients}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={report.status === 'active' ? 'default' : 'secondary'}>
                        {report.status.toUpperCase()}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegratedAnalyticsSuite;