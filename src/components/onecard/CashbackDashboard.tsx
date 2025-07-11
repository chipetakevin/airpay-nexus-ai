import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign,
  TrendingUp, 
  Users,
  Building,
  Shield,
  Target,
  AlertTriangle,
  CheckCircle,
  Crown,
  Activity,
  Zap,
  BarChart3,
  PieChart,
  Download,
  Filter,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  Sparkles,
  Brain,
  TrendingDown
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface UserEarnings {
  userType: 'customer' | 'vendor' | 'admin' | 'field_worker';
  currentBalance: number;
  totalEarned: number;
  transactionCount: number;
  growthRate: number;
  rankPosition: number;
}

interface WaterfallData {
  step: string;
  value: number;
  cumulative: number;
  type: 'positive' | 'negative' | 'total';
}

const CashbackDashboard = () => {
  const [userEarnings, setUserEarnings] = useState<UserEarnings[]>([]);
  const [waterfallData, setWaterfallData] = useState<WaterfallData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [anomalyDetected, setAnomalyDetected] = useState(false);
  const [totalCashbackDistributed, setTotalCashbackDistributed] = useState(0);
  const [mlPredictions, setMlPredictions] = useState({
    nextMonthCashback: 789432,
    growthPrediction: 23.4,
    riskLevel: 'low'
  });
  const { toast } = useToast();

  useEffect(() => {
    loadCashbackData();
    runAnomalyDetection();
  }, []);

  const loadCashbackData = () => {
    // Enhanced demo data reflecting the analysis from the requirements
    const mockUserEarnings: UserEarnings[] = [
      {
        userType: 'vendor',
        currentBalance: 15739.50,
        totalEarned: 42850.75,
        transactionCount: 324,
        growthRate: 34.2,
        rankPosition: 1
      },
      {
        userType: 'admin',
        currentBalance: 3145.75,
        totalEarned: 15739.50,
        transactionCount: 158,
        growthRate: 18.7,
        rankPosition: 2
      },
      {
        userType: 'field_worker',
        currentBalance: 1890.00,
        totalEarned: 8945.25,
        transactionCount: 89,
        growthRate: 28.3,
        rankPosition: 3
      },
      {
        userType: 'customer',
        currentBalance: 850.75,
        totalEarned: 2945.25,
        transactionCount: 156,
        growthRate: 12.1,
        rankPosition: 4
      }
    ];

    // Waterfall chart data showing profit distribution
    const mockWaterfallData: WaterfallData[] = [
      { step: 'Total Revenue', value: 100000, cumulative: 100000, type: 'total' },
      { step: 'Vendor Profit (8%)', value: -8000, cumulative: 92000, type: 'negative' },
      { step: 'Customer Cashback (2.5%)', value: -2500, cumulative: 89500, type: 'negative' },
      { step: 'Admin Fees (2%)', value: -2000, cumulative: 87500, type: 'negative' },
      { step: 'Field Worker Commission (12%)', value: -12000, cumulative: 75500, type: 'negative' },
      { step: 'Platform Profit', value: 75500, cumulative: 75500, type: 'total' }
    ];

    setUserEarnings(mockUserEarnings);
    setWaterfallData(mockWaterfallData);
    setTotalCashbackDistributed(mockUserEarnings.reduce((sum, user) => sum + user.totalEarned, 0));
  };

  const runAnomalyDetection = () => {
    // Simulate ML-powered anomaly detection
    const hasAnomaly = Math.random() > 0.75;
    setAnomalyDetected(hasAnomaly);
    
    if (hasAnomaly) {
      toast({
        title: "🤖 AI Alert: Anomaly Detected",
        description: "Unusual transaction pattern detected in vendor cashback claims. Auto-investigating...",
        variant: "destructive"
      });
    }
  };

  const getUserBenefitRate = (userType: string) => {
    const rates = {
      vendor: 8.5, // 8% profit + 2.5% cashback
      admin: 3.75, // Enhanced 3.75% cashback
      field_worker: 12, // 12% commission
      customer: 2.5 // Base 2.5% cashback
    };
    return rates[userType] || 0;
  };

  const getUserIcon = (userType: string) => {
    switch (userType) {
      case 'vendor': return <Building className="w-4 h-4" />;
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'customer': return <Users className="w-4 h-4" />;
      case 'field_worker': return <Target className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getUserGradient = (userType: string) => {
    switch (userType) {
      case 'vendor': return 'from-blue-500 to-cyan-600';
      case 'admin': return 'from-red-500 to-pink-600';
      case 'customer': return 'from-green-500 to-emerald-600';
      case 'field_worker': return 'from-purple-500 to-violet-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  const pieChartData = userEarnings.map(user => ({
    name: user.userType.replace('_', ' '),
    value: user.totalEarned,
    percentage: (user.totalEarned / totalCashbackDistributed * 100).toFixed(1)
  }));

  const COLORS = ['#3B82F6', '#EF4444', '#8B5CF6', '#10B981'];

  const trendData = [
    { month: 'Jul', vendors: 28000, admins: 12000, customers: 8500, fieldWorkers: 15000 },
    { month: 'Aug', vendors: 32000, admins: 13500, customers: 9200, fieldWorkers: 16800 },
    { month: 'Sep', vendors: 35000, admins: 14200, customers: 9800, fieldWorkers: 18200 },
    { month: 'Oct', vendors: 38500, admins: 14800, customers: 10500, fieldWorkers: 19500 },
    { month: 'Nov', vendors: 41200, admins: 15200, customers: 11200, fieldWorkers: 21000 },
    { month: 'Dec', vendors: 42850, admins: 15739, customers: 11800, fieldWorkers: 22400 }
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Header with Real-Time Status */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            OneCard Cashback Analytics
          </h1>
          <p className="text-muted-foreground mt-1">Real-time rewards distribution & performance insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge 
            variant={anomalyDetected ? "destructive" : "secondary"} 
            className="flex items-center gap-2 px-3 py-2"
          >
            {anomalyDetected ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
            <span className="font-medium">
              {anomalyDetected ? 'Anomaly Detected' : 'System Healthy'}
            </span>
          </Badge>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-10" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-green-100 text-green-800">+15.2%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">R{totalCashbackDistributed.toLocaleString()}</h3>
            <p className="text-sm text-gray-600 mt-1">Total Cashback Distributed</p>
            <p className="text-xs text-green-600 mt-2">↗ Up from last month</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-10" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-blue-100 text-blue-800">Live</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">2,847</h3>
            <p className="text-sm text-gray-600 mt-1">Active Users</p>
            <p className="text-xs text-blue-600 mt-2">Real-time count</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-600 opacity-10" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-purple-100 text-purple-800">156/min</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">23,456</h3>
            <p className="text-sm text-gray-600 mt-1">Total Transactions</p>
            <p className="text-xs text-purple-600 mt-2">This month</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 opacity-10" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-orange-100 text-orange-800">AI</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">R{mlPredictions.nextMonthCashback.toLocaleString()}</h3>
            <p className="text-sm text-gray-600 mt-1">ML Forecast</p>
            <p className="text-xs text-orange-600 mt-2">Next month prediction</p>
          </CardContent>
        </Card>
      </div>

      {/* User Ranking & Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              User Benefit Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userEarnings.sort((a, b) => b.totalEarned - a.totalEarned).map((user, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className={`w-10 h-10 bg-gradient-to-br ${getUserGradient(user.userType)} rounded-xl flex items-center justify-center text-white`}>
                      {getUserIcon(user.userType)}
                    </div>
                    <div>
                      <h4 className="font-semibold capitalize">{user.userType.replace('_', ' ')}</h4>
                      <p className="text-xs text-gray-600">{getUserBenefitRate(user.userType)}% benefit rate</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">R{user.totalEarned.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      {user.growthRate > 0 ? (
                        <ArrowUpRight className="w-3 h-3 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-red-600" />
                      )}
                      <span className={`text-xs font-medium ${user.growthRate > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {user.growthRate > 0 ? '+' : ''}{user.growthRate}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Earnings Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                vendor: { label: "Vendors", color: "#3B82F6" },
                admin: { label: "Admins", color: "#EF4444" },
                customer: { label: "Customers", color: "#10B981" },
                field_worker: { label: "Field Workers", color: "#8B5CF6" }
              }}
              className="h-[300px]"
            >
              <RechartsPieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </RechartsPieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics Tabs */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="waterfall" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Profit Flow
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="ml-insights" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Cashback Growth Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  vendors: { label: "Vendors", color: "#3B82F6" },
                  admins: { label: "Admins", color: "#EF4444" },
                  customers: { label: "Customers", color: "#10B981" },
                  fieldWorkers: { label: "Field Workers", color: "#8B5CF6" }
                }}
                className="h-[400px]"
              >
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area type="monotone" dataKey="vendors" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.7} />
                  <Area type="monotone" dataKey="admins" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.7} />
                  <Area type="monotone" dataKey="fieldWorkers" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.7} />
                  <Area type="monotone" dataKey="customers" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.7} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waterfall" className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Profit Distribution Waterfall
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-6">
                {waterfallData.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className={`h-32 rounded-lg flex items-end justify-center mb-2 ${
                      step.type === 'total' ? 'bg-gradient-to-t from-blue-500 to-blue-600' :
                      step.type === 'positive' ? 'bg-gradient-to-t from-green-500 to-green-600' :
                      'bg-gradient-to-t from-red-500 to-red-600'
                    }`}>
                      <div className="text-white font-bold p-2 text-xs">
                        R{Math.abs(step.value).toLocaleString()}
                      </div>
                    </div>
                    <p className="text-xs font-medium">{step.step}</p>
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-gray-600">
                Waterfall showing profit distribution from R100,000 transaction revenue
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-sm">System Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span>Processing Speed</span>
                      <span>98.7%</span>
                    </div>
                    <Progress value={98.7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span>Accuracy Rate</span>
                      <span>99.9%</span>
                    </div>
                    <Progress value={99.9} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span>Fraud Detection</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-sm">Real-Time Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Live Transactions</span>
                    <Badge className="bg-green-100 text-green-800">156/min</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Active Sessions</span>
                    <Badge className="bg-blue-100 text-blue-800">2,847</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Error Rate</span>
                    <Badge className="bg-red-100 text-red-800">0.1%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-sm">Growth Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Monthly Growth</span>
                    <Badge className="bg-green-100 text-green-800">+23%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">User Retention</span>
                    <Badge className="bg-blue-100 text-blue-800">94%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Vendor Satisfaction</span>
                    <Badge className="bg-purple-100 text-purple-800">4.8/5</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ml-insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  Machine Learning Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Next Month Cashback</span>
                      <Badge className="bg-blue-100 text-blue-800">+23%</Badge>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">R{mlPredictions.nextMonthCashback.toLocaleString()}</p>
                    <p className="text-xs text-blue-600 mt-1">Based on current trends & seasonality</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Vendor Growth Forecast</span>
                      <Badge className="bg-green-100 text-green-800">Strong</Badge>
                    </div>
                    <p className="text-2xl font-bold text-green-900">+{mlPredictions.growthPrediction}%</p>
                    <p className="text-xs text-green-600 mt-1">Projected quarterly growth</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Risk Assessment & Anomalies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-900">Low Risk</span>
                    </div>
                    <p className="text-sm text-green-700">System operating within normal parameters</p>
                  </div>
                  
                  {anomalyDetected && (
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-yellow-900">Medium Risk</span>
                      </div>
                      <p className="text-sm text-yellow-700">Unusual pattern in vendor claims detected - monitoring</p>
                    </div>
                  )}
                  
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">AI Optimization</span>
                    </div>
                    <p className="text-sm text-blue-700">ML models suggest optimizing vendor rates for 15% growth boost</p>
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

export default CashbackDashboard;