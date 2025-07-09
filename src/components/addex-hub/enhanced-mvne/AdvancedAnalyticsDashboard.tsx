import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  DollarSign,
  Users,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Zap,
  Shield,
  Clock,
  Star,
  Eye,
  RefreshCw,
  Download,
  Settings
} from 'lucide-react';

export default function AdvancedAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('churn');

  const aiInsights = [
    {
      type: 'churn_prediction',
      title: 'High Churn Risk Detected',
      description: '1,247 subscribers show high churn probability in next 30 days',
      confidence: 94,
      action: 'Initiate retention campaigns',
      impact: 'high',
      category: 'Churn Analysis'
    },
    {
      type: 'revenue_optimization',
      title: 'Upsell Opportunity',
      description: '8,935 subscribers eligible for premium plan upgrade',
      confidence: 87,
      action: 'Launch targeted upsell campaign',
      impact: 'medium',
      category: 'Revenue'
    },
    {
      type: 'network_optimization',
      title: 'Network Congestion Pattern',
      description: 'Peak usage in urban areas requires capacity scaling',
      confidence: 91,
      action: 'Deploy additional network slices',
      impact: 'high',
      category: 'Network'
    },
    {
      type: 'fraud_detection',
      title: 'Anomalous Usage Pattern',
      description: '23 subscribers showing potential fraudulent activity',
      confidence: 89,
      action: 'Review and investigate flagged accounts',
      impact: 'high',
      category: 'Security'
    }
  ];

  const kpiMetrics = [
    { label: 'Churn Rate', value: '2.3%', change: -0.5, trend: 'down', target: '2.0%' },
    { label: 'ARPU', value: 'R148.50', change: 12.3, trend: 'up', target: 'R150' },
    { label: 'Customer Satisfaction', value: '4.2/5', change: 0.3, trend: 'up', target: '4.5/5' },
    { label: 'Network Uptime', value: '99.97%', change: 0.02, trend: 'up', target: '99.95%' },
    { label: 'Fraud Detection Rate', value: '98.5%', change: 1.2, trend: 'up', target: '99%' },
    { label: 'Time to Resolution', value: '4.2h', change: -0.8, trend: 'down', target: '4h' }
  ];

  const customerSegments = [
    { name: 'Premium Users', count: 425000, revenue: 68.2, growth: 15.3, color: 'bg-purple-500' },
    { name: 'Standard Users', count: 1650000, revenue: 24.1, growth: 8.7, color: 'bg-blue-500' },
    { name: 'Basic Users', count: 772000, revenue: 7.7, growth: -2.1, color: 'bg-green-500' },
    { name: 'IoT/M2M', count: 280000, revenue: 12.5, growth: 25.4, color: 'bg-orange-500' }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Advanced Analytics & AI</h2>
          <p className="text-muted-foreground">AI-powered insights and predictive analytics</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ai-insights" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="kpis">KPIs</TabsTrigger>
          <TabsTrigger value="churn">Churn Analysis</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
          <TabsTrigger value="customer">Customer Intelligence</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Models</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription>
                  Real-time machine learning insights and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground">{insight.category}</p>
                      </div>
                      <Badge variant="outline">{insight.confidence}% confidence</Badge>
                    </div>
                    <p className="text-sm mb-3">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${getImpactColor(insight.impact)}`}>
                        {insight.impact.toUpperCase()} IMPACT
                      </span>
                      <Button variant="outline" size="sm">
                        {insight.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Real-time Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">2,847,392</div>
                  <p className="text-sm text-muted-foreground">Active Subscribers</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+0.8% from yesterday</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold">R42.8M</div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+12.3% from last month</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold">15.2ms</div>
                  <p className="text-sm text-muted-foreground">Avg Network Latency</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">-2.1ms improvement</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kpiMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                  {getTrendIcon(metric.trend)}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}% change
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Target: {metric.target}
                    </span>
                  </div>
                  <Progress 
                    value={Math.abs(metric.change) * 10} 
                    className="mt-2 h-2" 
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="churn" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Churn Prediction Model
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Model Accuracy</span>
                  <Badge variant="default">94.3%</Badge>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>High Risk (0-30 days)</span>
                      <span>1,247 subscribers</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Medium Risk (31-90 days)</span>
                      <span>3,892 subscribers</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Low Risk (&gt;90 days)</span>
                      <span>2,842,253 subscribers</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View High-Risk Subscribers
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Churn Factors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bill Shock</span>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="w-20 h-2" />
                      <span className="text-sm">78%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Network Issues</span>
                    <div className="flex items-center gap-2">
                      <Progress value={65} className="w-20 h-2" />
                      <span className="text-sm">65%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Poor Customer Service</span>
                    <div className="flex items-center gap-2">
                      <Progress value={52} className="w-20 h-2" />
                      <span className="text-sm">52%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Competitor Offers</span>
                    <div className="flex items-center gap-2">
                      <Progress value={43} className="w-20 h-2" />
                      <span className="text-sm">43%</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure Retention Actions
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Revenue Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">R42.8M</div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Voice Revenue</span>
                    <span>R18.2M (42.5%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Data Revenue</span>
                    <span>R20.1M (47.0%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>SMS Revenue</span>
                    <span>R2.8M (6.5%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>VAS Revenue</span>
                    <span>R1.7M (4.0%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  ARPU Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">R148.50</div>
                  <p className="text-sm text-muted-foreground">Average Revenue Per User</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Premium Segment</span>
                    <span>R285</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Standard Segment</span>
                    <span>R125</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Basic Segment</span>
                    <span>R65</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>IoT/M2M</span>
                    <span>R45</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Growth Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded">
                    <h4 className="font-semibold text-sm">Premium Upsell</h4>
                    <p className="text-xs text-muted-foreground">8,935 eligible subscribers</p>
                    <p className="text-sm font-medium text-green-600">+R2.4M potential</p>
                  </div>
                  <div className="p-3 border rounded">
                    <h4 className="font-semibold text-sm">IoT Expansion</h4>
                    <p className="text-xs text-muted-foreground">Enterprise opportunities</p>
                    <p className="text-sm font-medium text-green-600">+R5.8M potential</p>
                  </div>
                  <div className="p-3 border rounded">
                    <h4 className="font-semibold text-sm">VAS Adoption</h4>
                    <p className="text-xs text-muted-foreground">Low penetration rates</p>
                    <p className="text-sm font-medium text-green-600">+R3.2M potential</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Customer Segmentation
              </CardTitle>
              <CardDescription>
                AI-driven customer segments and behavior analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerSegments.map((segment, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded ${segment.color} mr-3`}></div>
                        <div>
                          <h4 className="font-semibold">{segment.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {segment.count.toLocaleString()} subscribers
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{segment.revenue}%</div>
                        <div className={`text-sm ${segment.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {segment.growth > 0 ? '+' : ''}{segment.growth}% growth
                        </div>
                      </div>
                    </div>
                    <Progress value={segment.revenue} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Network Optimization AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Prediction Accuracy</span>
                  <Badge variant="default">91.7%</Badge>
                </div>
                <div className="space-y-3">
                  <div className="p-3 border rounded">
                    <h4 className="font-semibold text-sm">Capacity Scaling</h4>
                    <p className="text-xs text-muted-foreground">
                      Predicted 25% increase in urban traffic next month
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Schedule Scaling
                    </Button>
                  </div>
                  <div className="p-3 border rounded">
                    <h4 className="font-semibold text-sm">Quality Optimization</h4>
                    <p className="text-xs text-muted-foreground">
                      Identified 12 cells requiring parameter tuning
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Apply Optimization
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Fraud Detection ML
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Detection Rate</span>
                  <Badge variant="default">98.5%</Badge>
                </div>
                <div className="space-y-3">
                  <div className="p-3 border rounded">
                    <h4 className="font-semibold text-sm">SIM Box Fraud</h4>
                    <p className="text-xs text-muted-foreground">
                      3 suspicious patterns detected in last 24h
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Investigate
                    </Button>
                  </div>
                  <div className="p-3 border rounded">
                    <h4 className="font-semibold text-sm">Usage Anomalies</h4>
                    <p className="text-xs text-muted-foreground">
                      23 accounts flagged for unusual activity
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Review Flags
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}