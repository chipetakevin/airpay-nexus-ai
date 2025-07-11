
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  TrendingUp, 
  Crown,
  Users,
  Building,
  Shield,
  DollarSign,
  PieChart,
  Activity,
  Zap,
  Target,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  Eye,
  Sparkles
} from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  PieChart as RechartsPieChart, 
  Pie,
  Cell, 
  Area, 
  AreaChart,
  ResponsiveContainer
} from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface CashbackData {
  userType: 'customer' | 'vendor' | 'admin' | 'field_worker';
  balance: number;
  totalEarned: number;
  transactionCount: number;
  lastActivity: string;
}

interface TrendData {
  month: string;
  customers: number;
  vendors: number;
  admins: number;
  fieldWorkers: number;
}

const WhatsAppAnalytics = () => {
  const [cashbackData, setCashbackData] = useState<CashbackData[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [anomalyDetected, setAnomalyDetected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadCashbackAnalytics();
    detectAnomalies();
  }, []);

  const loadCashbackAnalytics = () => {
    // Mock real-time cashback data with enhanced analytics
    const mockCashbackData: CashbackData[] = [
      {
        userType: 'vendor',
        balance: 15739.50,
        totalEarned: 42850.75,
        transactionCount: 324,
        lastActivity: '2025-01-11T10:30:00Z'
      },
      {
        userType: 'admin',
        balance: 3145.75,
        totalEarned: 15739.50,
        transactionCount: 158,
        lastActivity: '2025-01-11T09:15:00Z'
      },
      {
        userType: 'customer',
        balance: 850.75,
        totalEarned: 2945.25,
        transactionCount: 89,
        lastActivity: '2025-01-11T11:45:00Z'
      },
      {
        userType: 'field_worker',
        balance: 420.00,
        totalEarned: 1890.00,
        transactionCount: 47,
        lastActivity: '2025-01-11T08:20:00Z'
      }
    ];

    const mockTrendData: TrendData[] = [
      { month: 'Jul', customers: 2400, vendors: 1200, admins: 400, fieldWorkers: 800 },
      { month: 'Aug', customers: 1398, vendors: 2100, admins: 600, fieldWorkers: 950 },
      { month: 'Sep', customers: 9800, vendors: 1800, admins: 800, fieldWorkers: 1100 },
      { month: 'Oct', customers: 3908, vendors: 2800, admins: 1000, fieldWorkers: 1250 },
      { month: 'Nov', customers: 4800, vendors: 3200, admins: 1200, fieldWorkers: 1400 },
      { month: 'Dec', customers: 3800, vendors: 4100, admins: 1400, fieldWorkers: 1600 },
      { month: 'Jan', customers: 4300, vendors: 4850, admins: 1580, fieldWorkers: 1890 }
    ];

    setCashbackData(mockCashbackData);
    setTrendData(mockTrendData);
  };

  const detectAnomalies = () => {
    // Simulate anomaly detection for sudden spikes
    const hasAnomaly = Math.random() > 0.7;
    setAnomalyDetected(hasAnomaly);
    
    if (hasAnomaly) {
      toast({
        title: "🚨 Anomaly Detected",
        description: "Unusual spike in vendor cashback claims detected. Investigating...",
        variant: "destructive"
      });
    }
  };

  const calculateUserBenefit = (data: CashbackData) => {
    const benefitMultiplier = {
      vendor: 8.5, // 8% profit + 2.5% cashback
      admin: 3.75, // Enhanced 3.75% cashback
      customer: 2.5, // Base 2.5% cashback
      field_worker: 12 // 12% commission
    };
    
    return benefitMultiplier[data.userType];
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

  const getUserColor = (userType: string) => {
    switch (userType) {
      case 'vendor': return 'from-blue-500 to-cyan-600';
      case 'admin': return 'from-red-500 to-pink-600';
      case 'customer': return 'from-green-500 to-emerald-600';
      case 'field_worker': return 'from-purple-500 to-violet-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  const pieChartData = cashbackData.map(data => ({
    name: data.userType,
    value: data.totalEarned,
    color: data.userType === 'vendor' ? '#3B82F6' : 
           data.userType === 'admin' ? '#EF4444' :
           data.userType === 'customer' ? '#10B981' : '#8B5CF6'
  }));

  const transactionDistribution = [
    { name: 'Vendor Purchases', vendor: 75, admin: 12.5, customer: 12.5 },
    { name: 'Customer Self-Purchase', vendor: 25, admin: 25, customer: 50 },
    { name: 'Customer Gift Purchase', vendor: 0, admin: 0, customer: 100 }
  ];

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#8B5CF6'];

  return (
    <div className="space-y-6 p-4">
      {/* Header with Real-Time Status */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            OneCard Cashback Analytics
          </h1>
          <p className="text-muted-foreground">Real-time rewards system monitoring & insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={anomalyDetected ? "destructive" : "secondary"} className="flex items-center gap-1">
            {anomalyDetected ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
            {anomalyDetected ? 'Anomaly Detected' : 'System Normal'}
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cashbackData.map((data, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${getUserColor(data.userType)} opacity-5`} />
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${getUserColor(data.userType)} text-white`}>
                    {getUserIcon(data.userType)}
                  </div>
                  <span className="capitalize">{data.userType.replace('_', ' ')}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {calculateUserBenefit(data)}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Current Balance</p>
                  <p className="text-xl font-bold">R{data.balance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Earned</p>
                  <p className="text-sm font-semibold text-green-600">R{data.totalEarned.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Transactions</p>
                  <p className="text-sm">{data.transactionCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">📈 Trends</TabsTrigger>
          <TabsTrigger value="distribution">🎯 Distribution</TabsTrigger>
          <TabsTrigger value="performance">⚡ Performance</TabsTrigger>
          <TabsTrigger value="forecasting">🔮 Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Cashback Trends by User Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    customers: { label: "Customers", color: "#10B981" },
                    vendors: { label: "Vendors", color: "#3B82F6" },
                    admins: { label: "Admins", color: "#EF4444" },
                    fieldWorkers: { label: "Field Workers", color: "#8B5CF6" }
                  }}
                  className="h-[300px]"
                >
                  <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area type="monotone" dataKey="vendors" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="admins" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="customers" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="fieldWorkers" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Total Earnings Distribution
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
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Profit Sharing Distribution by Transaction Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  vendor: { label: "Vendor Share", color: "#3B82F6" },
                  admin: { label: "Admin Share", color: "#EF4444" },
                  customer: { label: "Customer Share", color: "#10B981" }
                }}
                className="h-[400px]"
              >
                <RechartsBarChart data={transactionDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="vendor" stackId="a" fill="#3B82F6" />
                  <Bar dataKey="admin" stackId="a" fill="#EF4444" />
                  <Bar dataKey="customer" stackId="a" fill="#10B981" />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Processing Speed</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Accuracy Rate</span>
                      <span>99.2%</span>
                    </div>
                    <Progress value={99.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Uptime</span>
                      <span>99.9%</span>
                    </div>
                    <Progress value={99.9} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4" />
                  Real-Time Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Active Users</span>
                    <Badge variant="secondary">2,847</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Transactions/min</span>
                    <Badge className="bg-green-100 text-green-800">156</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Cashback Processed</span>
                    <Badge className="bg-blue-100 text-blue-800">R 45,892</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Crown className="w-4 h-4" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cashbackData.sort((a, b) => b.totalEarned - a.totalEarned).slice(0, 3).map((user, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="w-4 h-4 p-0 flex items-center justify-center">
                          {index + 1}
                        </Badge>
                        <span className="capitalize">{user.userType.replace('_', ' ')}</span>
                      </div>
                      <span className="font-semibold">R{user.totalEarned.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Predictive Analytics & Forecasting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">ML-Powered Predictions</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Next Month Cashback</span>
                        <Badge className="bg-blue-100 text-blue-800">+23%</Badge>
                      </div>
                      <p className="text-lg font-bold">R 789,432</p>
                      <p className="text-xs text-muted-foreground">Based on current trends</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Vendor Growth</span>
                        <Badge className="bg-green-100 text-green-800">Strong</Badge>
                      </div>
                      <p className="text-lg font-bold">+34.2%</p>
                      <p className="text-xs text-muted-foreground">Projected quarterly growth</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Risk Assessment</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg border-yellow-200 bg-yellow-50">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium">Medium Risk</span>
                      </div>
                      <p className="text-xs">Unusual pattern in field worker claims detected</p>
                    </div>
                    <div className="p-3 border rounded-lg border-green-200 bg-green-50">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Low Risk</span>
                      </div>
                      <p className="text-xs">System stability and fraud prevention optimal</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppAnalytics;
