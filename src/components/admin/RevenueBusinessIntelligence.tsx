import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart } from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Users,
  AlertTriangle,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Shield,
  Eye,
  Zap,
  CreditCard,
  Phone,
  MessageSquare,
  Wifi,
  Brain,
  Award
} from 'lucide-react';

interface RevenueMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  format: 'currency' | 'percentage' | 'number';
}

interface CustomerSegment {
  name: string;
  customers: number;
  revenue: number;
  arpu: number;
  churnRate: number;
  color: string;
}

interface ChurnPrediction {
  id: string;
  customerId: string;
  customerName: string;
  churnProbability: number;
  lifetimeValue: number;
  riskFactors: string[];
  recommendedAction: string;
  timeframe: string;
}

const RevenueBusinessIntelligence = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetric[]>([
    { id: 'total_revenue', name: 'Total Revenue', value: 2847532, change: 15.3, trend: 'up', format: 'currency' },
    { id: 'arpu', name: 'ARPU', value: 187.50, change: 8.2, trend: 'up', format: 'currency' },
    { id: 'churn_rate', name: 'Churn Rate', value: 2.8, change: -0.5, trend: 'down', format: 'percentage' },
    { id: 'customer_acquisition', name: 'New Customers', value: 1247, change: 22.1, trend: 'up', format: 'number' },
    { id: 'margin', name: 'Gross Margin', value: 68.4, change: 3.2, trend: 'up', format: 'percentage' },
    { id: 'lifetime_value', name: 'Customer LTV', value: 2340, change: 12.8, trend: 'up', format: 'currency' }
  ]);

  const [customerSegments] = useState<CustomerSegment[]>([
    { name: 'Premium', customers: 1247, revenue: 1250000, arpu: 280, churnRate: 1.2, color: '#8b5cf6' },
    { name: 'Standard', customers: 3891, revenue: 980000, arpu: 165, churnRate: 2.8, color: '#3b82f6' },
    { name: 'Basic', customers: 2156, revenue: 420000, arpu: 95, churnRate: 4.5, color: '#10b981' },
    { name: 'Prepaid', customers: 5678, revenue: 780000, arpu: 55, churnRate: 6.2, color: '#f59e0b' }
  ]);

  const [churnPredictions] = useState<ChurnPrediction[]>([
    {
      id: '1',
      customerId: 'CUST_001247',
      customerName: 'Premium Corp Ltd',
      churnProbability: 85,
      lifetimeValue: 15600,
      riskFactors: ['Declined usage', 'Payment delays', 'Support tickets'],
      recommendedAction: 'Immediate retention call with special offer',
      timeframe: '7 days'
    },
    {
      id: '2',
      customerId: 'CUST_003891',
      customerName: 'Tech Solutions Inc',
      churnProbability: 72,
      lifetimeValue: 8940,
      riskFactors: ['Price sensitivity', 'Competitor inquiry'],
      recommendedAction: 'Loyalty program enrollment and price review',
      timeframe: '14 days'
    },
    {
      id: '3',
      customerId: 'CUST_005634',
      customerName: 'StartUp Ventures',
      churnProbability: 65,
      lifetimeValue: 4520,
      riskFactors: ['Low engagement', 'Plan downgrade'],
      recommendedAction: 'Engagement campaign and usage optimization',
      timeframe: '21 days'
    }
  ]);

  // Sample data for charts
  const revenueGrowthData = [
    { month: 'Jan', revenue: 2100000, customers: 11250, arpu: 186.67 },
    { month: 'Feb', revenue: 2250000, customers: 11890, arpu: 189.20 },
    { month: 'Mar', revenue: 2380000, customers: 12340, arpu: 192.85 },
    { month: 'Apr', revenue: 2520000, customers: 12780, arpu: 197.19 },
    { month: 'May', revenue: 2680000, customers: 13245, arpu: 202.34 },
    { month: 'Jun', revenue: 2847532, customers: 13672, arpu: 208.15 }
  ];

  const billingAnalyticsData = [
    { service: 'Voice', revenue: 1250000, transactions: 45620, margin: 72 },
    { service: 'Data', revenue: 1890000, transactions: 38940, margin: 65 },
    { service: 'SMS', revenue: 350000, transactions: 125890, margin: 85 },
    { service: 'Roaming', revenue: 280000, transactions: 2450, margin: 45 },
    { service: 'VAS', revenue: 150000, transactions: 8920, margin: 90 }
  ];

  const fraudDetectionData = [
    { date: '2024-01-01', detected: 15, prevented: 12, savings: 45000 },
    { date: '2024-01-02', detected: 8, prevented: 7, savings: 28000 },
    { date: '2024-01-03', detected: 22, prevented: 18, savings: 67000 },
    { date: '2024-01-04', detected: 12, prevented: 11, savings: 38000 },
    { date: '2024-01-05', detected: 18, prevented: 15, savings: 52000 },
    { date: '2024-01-06', detected: 25, prevented: 22, savings: 78000 },
    { date: '2024-01-07', detected: 14, prevented: 12, savings: 41000 }
  ];

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return `R${value.toLocaleString()}`;
      case 'percentage':
        return `${value.toFixed(1)}%`;
      default:
        return value.toLocaleString();
    }
  };

  const getRiskColor = (probability: number) => {
    if (probability >= 80) return 'bg-red-100 text-red-800 border-red-200';
    if (probability >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Revenue & Business Intelligence</h2>
            <p className="text-muted-foreground">Comprehensive analytics, billing insights, and predictive revenue optimization</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Key Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {revenueMetrics.map((metric) => (
          <Card key={metric.id} className={`transition-all duration-300 hover:shadow-lg border-l-4 ${
            metric.trend === 'up' ? 'border-l-green-500 bg-gradient-to-br from-green-50 to-white' :
            metric.trend === 'down' ? 'border-l-red-500 bg-gradient-to-br from-red-50 to-white' :
            'border-l-blue-500 bg-gradient-to-br from-blue-50 to-white'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    metric.trend === 'up' ? 'bg-green-100' :
                    metric.trend === 'down' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {metric.id.includes('revenue') && <DollarSign className="w-5 h-5 text-green-600" />}
                    {metric.id.includes('arpu') && <Target className="w-5 h-5 text-blue-600" />}
                    {metric.id.includes('churn') && <TrendingDown className="w-5 h-5 text-red-600" />}
                    {metric.id.includes('acquisition') && <Users className="w-5 h-5 text-purple-600" />}
                    {metric.id.includes('margin') && <BarChart3 className="w-5 h-5 text-orange-600" />}
                    {metric.id.includes('lifetime') && <Award className="w-5 h-5 text-indigo-600" />}
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : 
                   metric.trend === 'down' ? <TrendingDown className="w-4 h-4" /> : 
                   <Activity className="w-4 h-4" />}
                  {Math.abs(metric.change).toFixed(1)}%
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">{metric.name}</h3>
                <div className="text-2xl font-bold mb-1">
                  {formatValue(metric.value, metric.format)}
                </div>
                <div className="text-xs text-muted-foreground">
                  vs previous {selectedPeriod}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Billing Analytics
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Customer Intelligence
          </TabsTrigger>
          <TabsTrigger value="fraud" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Revenue Assurance
          </TabsTrigger>
          <TabsTrigger value="predictions" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Predictive Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Revenue Growth Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={revenueGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        fill="#10b981"
                        fillOpacity={0.6}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="arpu"
                        stroke="#3b82f6"
                        strokeWidth={3}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5" />
                  Customer Segment Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerSegments}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="revenue"
                        label={({ name, value }) => `${name}: R${(value/1000).toFixed(0)}K`}
                      >
                        {customerSegments.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `R${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Billing Analytics Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Service Revenue Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={billingAnalyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="service" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#3b82f6" />
                    <Bar dataKey="margin" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {billingAnalyticsData.map((service) => (
              <Card key={service.service} className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {service.service === 'Voice' && <Phone className="w-5 h-5 text-blue-600" />}
                      {service.service === 'Data' && <Wifi className="w-5 h-5 text-green-600" />}
                      {service.service === 'SMS' && <MessageSquare className="w-5 h-5 text-yellow-600" />}
                      {service.service === 'Roaming' && <Activity className="w-5 h-5 text-purple-600" />}
                      {service.service === 'VAS' && <Zap className="w-5 h-5 text-orange-600" />}
                    </div>
                    <h3 className="font-semibold">{service.service}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenue</span>
                      <span className="font-semibold">R{service.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Transactions</span>
                      <span className="font-semibold">{service.transactions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Margin</span>
                      <span className="font-semibold text-green-600">{service.margin}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Customer Intelligence Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerSegments.map((segment) => (
              <Card key={segment.name} className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: segment.color }} />
                    <h3 className="font-semibold">{segment.name}</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl font-bold">{segment.customers.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Customers</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-green-600">R{segment.arpu}</div>
                      <div className="text-xs text-gray-500">ARPU</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-red-600">{segment.churnRate}%</div>
                      <div className="text-xs text-gray-500">Churn Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Revenue Assurance Tab */}
        <TabsContent value="fraud" className="space-y-6">
          <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
            <Shield className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span className="text-green-800 font-medium">
                  Revenue assurance system prevented R349,000 in potential losses this week
                </span>
                <Badge className="bg-green-100 text-green-800">
                  97.8% Detection Rate
                </Badge>
              </div>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Fraud Detection & Prevention (7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={fraudDetectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="detected" fill="#ef4444" />
                    <Bar yAxisId="left" dataKey="prevented" fill="#22c55e" />
                    <Line yAxisId="right" type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={3} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictive Analytics Tab */}
        <TabsContent value="predictions" className="space-y-6">
          <Alert className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-white">
            <Brain className="h-4 w-4 text-orange-600" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span className="text-orange-800 font-medium">
                  AI models predict {churnPredictions.length} high-risk customers requiring immediate attention
                </span>
                <Badge className="bg-orange-100 text-orange-800">
                  ML Confidence: 87%
                </Badge>
              </div>
            </AlertDescription>
          </Alert>

          <div className="grid gap-6">
            {churnPredictions.map((prediction) => (
              <Card key={prediction.id} className={`border-l-4 ${getRiskColor(prediction.churnProbability)}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{prediction.customerName}</h3>
                      <p className="text-sm text-gray-600">ID: {prediction.customerId}</p>
                      <p className="text-sm text-gray-600">LTV: R{prediction.lifetimeValue.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600">{prediction.churnProbability}%</div>
                      <div className="text-xs text-gray-500">Churn Risk</div>
                      <div className="text-xs text-gray-500 mt-1">in {prediction.timeframe}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Risk Factors</h4>
                      <div className="flex flex-wrap gap-2">
                        {prediction.riskFactors.map((factor, index) => (
                          <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Recommended Action
                      </h4>
                      <p className="text-sm text-blue-700">{prediction.recommendedAction}</p>
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

export default RevenueBusinessIntelligence;