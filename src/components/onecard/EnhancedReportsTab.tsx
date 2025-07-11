import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Crown, 
  TrendingUp, 
  DollarSign, 
  Star,
  ArrowRight,
  Wallet,
  Users,
  Building,
  Shield,
  Target,
  Sparkles,
  CheckCircle,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Brain,
  Zap,
  AlertTriangle,
  Eye,
  RefreshCw
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
  LineChart as RechartsLineChart,
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
import { generateEnhancedMasterReport } from './utils/enhancedPdfGenerator';

interface ReportData {
  period: string;
  totalCashback: number;
  customers: number;
  vendors: number;
  admins: number;
  fieldWorkers: number;
  transactions: number;
  revenue: number;
}

interface UserRanking {
  rank: number;
  userType: 'customer' | 'vendor' | 'admin' | 'field_worker';
  name: string;
  earnings: number;
  growth: number;
  benefitRate: number;
}

const EnhancedReportsTab = () => {
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [userRankings, setUserRankings] = useState<UserRanking[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [selectedUserType, setSelectedUserType] = useState('all');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const { toast } = useToast();

  useEffect(() => {
    loadReportData();
    const interval = setInterval(loadReportData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [selectedTimeframe, selectedUserType]);

  const loadReportData = () => {
    // Enhanced demo data with real-time simulation
    const mockReportData: ReportData[] = [
      { period: 'Jan 2025', totalCashback: 789432, customers: 2850, vendors: 340, admins: 25, fieldWorkers: 89, transactions: 15678, revenue: 2890000 },
      { period: 'Dec 2024', totalCashback: 742156, customers: 2650, vendors: 325, admins: 23, fieldWorkers: 82, transactions: 14234, revenue: 2650000 },
      { period: 'Nov 2024', totalCashback: 678923, customers: 2450, vendors: 310, admins: 21, fieldWorkers: 76, transactions: 13012, revenue: 2420000 },
      { period: 'Oct 2024', totalCashback: 623847, customers: 2280, vendors: 295, admins: 20, fieldWorkers: 71, transactions: 11834, revenue: 2190000 },
      { period: 'Sep 2024', totalCashback: 578692, customers: 2120, vendors: 280, admins: 18, fieldWorkers: 65, transactions: 10678, revenue: 1980000 },
      { period: 'Aug 2024', totalCashback: 534521, customers: 1950, vendors: 265, admins: 17, fieldWorkers: 59, transactions: 9456, revenue: 1780000 }
    ];

    const mockUserRankings: UserRanking[] = [
      { rank: 1, userType: 'vendor', name: 'Premium Vendors', earnings: 42850.75, growth: 34.2, benefitRate: 8.5 },
      { rank: 2, userType: 'admin', name: 'Admin Users', earnings: 15739.50, growth: 18.7, benefitRate: 3.75 },
      { rank: 3, userType: 'field_worker', name: 'Field Workers', earnings: 8945.25, growth: 28.3, benefitRate: 12 },
      { rank: 4, userType: 'customer', name: 'Premium Customers', earnings: 2945.25, growth: 12.1, benefitRate: 2.5 }
    ];

    setReportData(mockReportData);
    setUserRankings(mockUserRankings);
    setLastUpdated(new Date());
  };

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    
    try {
      toast({
        title: "🔄 Generating Comprehensive Report",
        description: "Processing cashback analytics and user performance data...",
      });

      // Mock customer and transaction data for report generation
      const mockCustomers = userRankings.map((ranking, index) => ({
        id: `user_${index}`,
        firstName: ranking.name.split(' ')[0],
        lastName: ranking.name.split(' ')[1] || 'User',
        email: `${ranking.name.toLowerCase().replace(' ', '.')}@divinemobile.co.za`,
        phone: '+27123456789',
        cardNumber: `${ranking.userType.toUpperCase()}${String(index + 1).padStart(8, '0')}`,
        registrationDate: new Date().toISOString(),
        networkProvider: 'Vodacom',
        ricaVerified: true,
        onecardBalance: ranking.earnings,
        totalCashback: ranking.earnings,
        isActive: true
      }));

      const mockTransactions = reportData.flatMap((period, periodIndex) => 
        Array.from({ length: 10 }, (_, txIndex) => ({
          id: `tx_${periodIndex}_${txIndex}`,
          timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          amount: Math.floor(Math.random() * 500) + 50,
          network: ['Vodacom', 'MTN', 'Cell C'][Math.floor(Math.random() * 3)],
          status: 'completed',
          recipient_name: mockCustomers[Math.floor(Math.random() * mockCustomers.length)].firstName,
          cashback_earned: Math.floor(Math.random() * 25) + 5
        }))
      );

      await generateEnhancedMasterReport(mockCustomers, mockTransactions, toast);
      
      toast({
        title: "✅ Report Generated Successfully",
        description: "Comprehensive OneCard cashback analytics report has been downloaded.",
      });
      
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "❌ Report Generation Failed",
        description: "There was an error generating the report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingReport(false);
    }
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

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#8B5CF6'];

  const pieChartData = reportData.length > 0 ? [
    { name: 'Vendors', value: reportData[0].vendors, percentage: 45.2 },
    { name: 'Customers', value: reportData[0].customers, percentage: 38.7 },
    { name: 'Field Workers', value: reportData[0].fieldWorkers, percentage: 11.4 },
    { name: 'Admins', value: reportData[0].admins, percentage: 4.7 }
  ] : [];

  const growthData = reportData.slice(0, 6).reverse();

  return (
    <div className="space-y-6 p-4">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            OneCard Cashback Reports
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive analytics & insights • Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedUserType} onValueChange={setSelectedUserType}>
            <SelectTrigger className="w-32">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="vendor">Vendors</SelectItem>
              <SelectItem value="customer">Customers</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
              <SelectItem value="field_worker">Field Workers</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-6"
          >
            {isGeneratingReport ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {isGeneratingReport ? 'Generating...' : 'Generate Report'}
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-10" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-green-100 text-green-800">+23%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              R{reportData.length > 0 ? reportData[0].totalCashback.toLocaleString() : '0'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Total Cashback This Month</p>
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
              <Badge className="bg-blue-100 text-blue-800">+15%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {reportData.length > 0 ? (reportData[0].customers + reportData[0].vendors + reportData[0].admins + reportData[0].fieldWorkers).toLocaleString() : '0'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Active Users</p>
            <p className="text-xs text-blue-600 mt-2">All user types combined</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-600 opacity-10" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-purple-100 text-purple-800">+18%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {reportData.length > 0 ? reportData[0].transactions.toLocaleString() : '0'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Total Transactions</p>
            <p className="text-xs text-purple-600 mt-2">This month</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 opacity-10" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-orange-100 text-orange-800">+12%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              R{reportData.length > 0 ? (reportData[0].revenue / 1000000).toFixed(1) : '0'}M
            </h3>
            <p className="text-sm text-gray-600 mt-1">Platform Revenue</p>
            <p className="text-xs text-orange-600 mt-2">Monthly total</p>
          </CardContent>
        </Card>
      </div>

      {/* User Benefit Rankings */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            User Benefit Rankings & Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Top Performers by Earnings</h4>
              {userRankings.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg text-white font-bold text-sm">
                      {user.rank}
                    </div>
                    <div className={`w-10 h-10 bg-gradient-to-br ${getUserGradient(user.userType)} rounded-xl flex items-center justify-center text-white`}>
                      {getUserIcon(user.userType)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{user.name}</h4>
                      <p className="text-xs text-gray-600">{user.benefitRate}% benefit rate</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">R{user.earnings.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-medium ${user.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {user.growth > 0 ? '+' : ''}{user.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">User Distribution</h4>
              <ChartContainer
                config={{
                  vendors: { label: "Vendors", color: "#3B82F6" },
                  customers: { label: "Customers", color: "#10B981" },
                  fieldWorkers: { label: "Field Workers", color: "#8B5CF6" },
                  admins: { label: "Admins", color: "#EF4444" }
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Growth Trends
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Distribution
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                Cashback Growth Trends Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  totalCashback: { label: "Total Cashback", color: "#3B82F6" },
                  revenue: { label: "Platform Revenue", color: "#10B981" }
                }}
                className="h-[400px]"
              >
                <RechartsLineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="totalCashback" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} />
                  <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
                </RechartsLineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                User Type Distribution Analysis
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
                className="h-[400px]"
              >
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="customers" fill="#10B981" />
                  <Bar dataKey="vendors" fill="#3B82F6" />
                  <Bar dataKey="admins" fill="#EF4444" />
                  <Bar dataKey="fieldWorkers" fill="#8B5CF6" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-sm">System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span>Processing Efficiency</span>
                      <span>98.9%</span>
                    </div>
                    <Progress value={98.9} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span>Data Accuracy</span>
                      <span>99.7%</span>
                    </div>
                    <Progress value={99.7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span>System Uptime</span>
                      <span>99.95%</span>
                    </div>
                    <Progress value={99.95} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-sm">Live Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Active Sessions</span>
                    <Badge className="bg-green-100 text-green-800">2,847</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Transactions/Hour</span>
                    <Badge className="bg-blue-100 text-blue-800">9,340</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Error Rate</span>
                    <Badge className="bg-red-100 text-red-800">0.03%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-sm">Growth Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Monthly Growth</span>
                    <Badge className="bg-green-100 text-green-800">+23%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">User Retention</span>
                    <Badge className="bg-blue-100 text-blue-800">96%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">ROI</span>
                    <Badge className="bg-purple-100 text-purple-800">340%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  AI-Powered Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Next Quarter Cashback</span>
                      <Badge className="bg-blue-100 text-blue-800">+28%</Badge>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">R2.4M</p>
                    <p className="text-xs text-blue-600 mt-1">ML prediction with 94% confidence</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Vendor Growth Potential</span>
                      <Badge className="bg-green-100 text-green-800">High</Badge>
                    </div>
                    <p className="text-2xl font-bold text-green-900">+34%</p>
                    <p className="text-xs text-green-600 mt-1">Projected 6-month growth</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Strategic Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-900">Optimization Opportunity</span>
                    </div>
                    <p className="text-sm text-yellow-700">Increase field worker commission by 1% for potential 25% growth in activations</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Market Expansion</span>
                    </div>
                    <p className="text-sm text-blue-700">Customer segment showing 40% growth potential with targeted incentives</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-purple-900">System Enhancement</span>
                    </div>
                    <p className="text-sm text-purple-700">Real-time processing improvements could reduce costs by 12%</p>
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

export default EnhancedReportsTab;