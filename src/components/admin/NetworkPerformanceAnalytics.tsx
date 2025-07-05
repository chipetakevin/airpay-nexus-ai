import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Activity, 
  Wifi, 
  Server, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Zap,
  Monitor,
  Network,
  Signal,
  Clock,
  Shield,
  Eye,
  RefreshCw,
  Brain,
  Target
} from 'lucide-react';

interface NetworkMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: number;
  threshold: number;
}

interface PredictiveInsight {
  id: string;
  type: 'congestion' | 'failure' | 'capacity';
  message: string;
  probability: number;
  timeframe: string;
  impact: 'low' | 'medium' | 'high';
  recommendation: string;
}

const NetworkPerformanceAnalytics = () => {
  const [realTimeMetrics, setRealTimeMetrics] = useState<NetworkMetric[]>([
    { id: 'bandwidth', name: 'Bandwidth Utilization', value: 68, unit: '%', status: 'healthy', trend: 2.1, threshold: 80 },
    { id: 'latency', name: 'Network Latency', value: 12, unit: 'ms', status: 'healthy', trend: -1.5, threshold: 50 },
    { id: 'packet_loss', name: 'Packet Loss', value: 0.02, unit: '%', status: 'healthy', trend: -0.01, threshold: 1 },
    { id: 'cpu_usage', name: 'CPU Usage', value: 45, unit: '%', status: 'healthy', trend: 3.2, threshold: 75 },
    { id: 'memory_usage', name: 'Memory Usage', value: 78, unit: '%', status: 'warning', trend: 5.8, threshold: 85 },
    { id: 'connection_count', name: 'Active Connections', value: 2847, unit: '', status: 'healthy', trend: 15.3, threshold: 5000 }
  ]);

  const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsight[]>([
    {
      id: '1',
      type: 'congestion',
      message: 'Network congestion predicted in Cell Tower CT-001',
      probability: 85,
      timeframe: '2 hours',
      impact: 'medium',
      recommendation: 'Enable traffic shaping and load balancing'
    },
    {
      id: '2',
      type: 'capacity',
      message: 'Bandwidth capacity approaching limit on Link-A4',
      probability: 72,
      timeframe: '6 hours',
      impact: 'high',
      recommendation: 'Scale up bandwidth allocation or reroute traffic'
    },
    {
      id: '3',
      type: 'failure',
      message: 'HLR-02 showing degraded performance patterns',
      probability: 45,
      timeframe: '24 hours',
      impact: 'high',
      recommendation: 'Schedule preventive maintenance and backup activation'
    }
  ]);

  const [networkHealth, setNetworkHealth] = useState(97.8);
  const [aiOptimizationEnabled, setAiOptimizationEnabled] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, metric.value + (Math.random() - 0.5) * 5),
        trend: (Math.random() - 0.5) * 10
      })));
      
      setNetworkHealth(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5) * 2)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Sample data for charts
  const networkTrafficData = [
    { time: '00:00', inbound: 45, outbound: 38, total: 83 },
    { time: '04:00', inbound: 32, outbound: 28, total: 60 },
    { time: '08:00', inbound: 78, outbound: 65, total: 143 },
    { time: '12:00', inbound: 95, outbound: 82, total: 177 },
    { time: '16:00', inbound: 88, outbound: 76, total: 164 },
    { time: '20:00', inbound: 72, outbound: 58, total: 130 },
    { time: '23:59', inbound: 55, outbound: 42, total: 97 }
  ];

  const deviceHealthData = [
    { name: 'Healthy', value: 85, color: '#22c55e' },
    { name: 'Warning', value: 12, color: '#f59e0b' },
    { name: 'Critical', value: 3, color: '#ef4444' }
  ];

  const performanceHistoryData = [
    { date: '2024-01-01', uptime: 99.2, throughput: 850, errors: 12 },
    { date: '2024-01-02', uptime: 98.8, throughput: 920, errors: 8 },
    { date: '2024-01-03', uptime: 99.5, throughput: 780, errors: 5 },
    { date: '2024-01-04', uptime: 99.1, throughput: 960, errors: 15 },
    { date: '2024-01-05', uptime: 99.8, throughput: 890, errors: 3 },
    { date: '2024-01-06', uptime: 98.9, throughput: 1050, errors: 18 },
    { date: '2024-01-07', uptime: 99.6, throughput: 920, errors: 7 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
            <Network className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Network Performance Analytics</h2>
            <p className="text-muted-foreground">Real-time monitoring, predictive insights, and AI-driven optimization</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
            Live Monitoring
          </Badge>
          <Button 
            variant={aiOptimizationEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setAiOptimizationEnabled(!aiOptimizationEnabled)}
            className="flex items-center gap-2"
          >
            <Brain className="w-4 h-4" />
            AI Optimization {aiOptimizationEnabled ? 'ON' : 'OFF'}
          </Button>
        </div>
      </div>

      {/* Network Health Overview */}
      <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="text-xl font-bold text-green-800">Overall Network Health</h3>
                <p className="text-green-600">System operating optimally</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-700">{networkHealth.toFixed(1)}%</div>
              <div className="text-sm text-green-500">Uptime Score</div>
            </div>
          </div>
          <Progress value={networkHealth} className="h-3" />
        </CardContent>
      </Card>

      <Tabs defaultValue="realtime" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="realtime" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Real-Time
          </TabsTrigger>
          <TabsTrigger value="predictive" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Predictive
          </TabsTrigger>
          <TabsTrigger value="traffic" className="flex items-center gap-2">
            <Signal className="w-4 h-4" />
            Traffic Analysis
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Real-Time Monitoring Tab */}
        <TabsContent value="realtime" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realTimeMetrics.map((metric) => (
              <Card key={metric.id} className={`transition-all duration-300 hover:shadow-lg border-l-4 ${
                metric.status === 'healthy' ? 'border-l-green-500 bg-gradient-to-br from-green-50 to-white' :
                metric.status === 'warning' ? 'border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-white' :
                'border-l-red-500 bg-gradient-to-br from-red-50 to-white'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        metric.status === 'healthy' ? 'bg-green-100' :
                        metric.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                      }`}>
                        {metric.id === 'bandwidth' && <Wifi className="w-5 h-5 text-blue-600" />}
                        {metric.id === 'latency' && <Zap className="w-5 h-5 text-purple-600" />}
                        {metric.id === 'packet_loss' && <AlertTriangle className="w-5 h-5 text-orange-600" />}
                        {metric.id === 'cpu_usage' && <Server className="w-5 h-5 text-cyan-600" />}
                        {metric.id === 'memory_usage' && <Monitor className="w-5 h-5 text-indigo-600" />}
                        {metric.id === 'connection_count' && <Network className="w-5 h-5 text-green-600" />}
                      </div>
                      <Badge variant="outline" className={getStatusColor(metric.status)}>
                        {metric.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      metric.trend > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {metric.trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {Math.abs(metric.trend).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">{metric.name}</h3>
                    <div className="flex items-end gap-2 mb-3">
                      <span className="text-2xl font-bold">{
                        metric.unit === '%' ? metric.value.toFixed(1) : 
                        metric.unit === 'ms' ? metric.value.toFixed(0) :
                        metric.unit === '' ? metric.value.toFixed(0) :
                        metric.value.toFixed(2)
                      }</span>
                      <span className="text-muted-foreground text-sm">{metric.unit}</span>
                    </div>
                    <Progress 
                      value={(metric.value / metric.threshold) * 100} 
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      Threshold: {metric.threshold}{metric.unit}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Device Health Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Network Element Health Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceHealthData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {deviceHealthData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictive Analytics Tab */}
        <TabsContent value="predictive" className="space-y-6">
          <Alert className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
            <Brain className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span className="text-blue-800 font-medium">
                  AI-powered predictive analytics is actively monitoring network patterns
                </span>
                <Badge className="bg-blue-100 text-blue-800">
                  ML Model v2.1 Active
                </Badge>
              </div>
            </AlertDescription>
          </Alert>

          <div className="grid gap-6">
            {predictiveInsights.map((insight) => (
              <Card key={insight.id} className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        {insight.type === 'congestion' && <Network className="w-5 h-5 text-orange-600" />}
                        {insight.type === 'failure' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                        {insight.type === 'capacity' && <TrendingUp className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{insight.message}</h3>
                        <p className="text-sm text-gray-600 mt-1">Predicted in {insight.timeframe}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getImpactColor(insight.impact)}>
                        {insight.impact.toUpperCase()} IMPACT
                      </Badge>
                      <div className="text-right">
                        <div className="text-lg font-bold text-orange-600">{insight.probability}%</div>
                        <div className="text-xs text-gray-500">Probability</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Recommended Action
                    </h4>
                    <p className="text-sm text-gray-700">{insight.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Traffic Analysis Tab */}
        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Signal className="w-5 h-5" />
                Network Traffic Patterns (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={networkTrafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="inbound" 
                      stackId="1"
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="outbound" 
                      stackId="1"
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Performance History (7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="uptime" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="throughput" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NetworkPerformanceAnalytics;