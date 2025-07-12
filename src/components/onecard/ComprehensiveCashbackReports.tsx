import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Building, 
  Shield, 
  Star,
  ArrowRight,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Trophy,
  Target,
  Zap,
  Crown,
  Wallet,
  Gift,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingDown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CashbackData {
  userType: string;
  count: number;
  totalEarnings: number;
  avgRate: number;
  color: string;
}

interface TopEarner {
  name: string;
  balance: number;
  totalEarned: number;
  type: string;
  growthRate: number;
}

interface TransactionData {
  type: string;
  vendor: number;
  admin: number;
  customer: number;
  platform: number;
}

const ComprehensiveCashbackReports = () => {
  const [activeReportTab, setActiveReportTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const { toast } = useToast();

  // Comprehensive cashback system data
  const systemOverview = {
    totalCashbackDistributed: 2567432.85,
    activeUsers: 15847,
    totalTransactions: 89623,
    averageCashback: 28.67,
    monthlyGrowth: 12.4,
    systemHealth: 98.7
  };

  const userTypeBreakdown: CashbackData[] = [
    { userType: 'Vendors', count: 1247, totalEarnings: 1089534.20, avgRate: 8.5, color: 'blue' },
    { userType: 'Admin Users', count: 43, totalEarnings: 325106.75, avgRate: 3.75, color: 'red' },
    { userType: 'Field Workers', count: 289, totalEarnings: 518945.60, avgRate: 12.0, color: 'green' },
    { userType: 'Premium Customers', count: 567, totalEarnings: 348472.35, avgRate: 5.0, color: 'purple' },
    { userType: 'Standard Customers', count: 13701, totalEarnings: 285373.95, avgRate: 2.5, color: 'gray' }
  ];

  const topEarners: TopEarner[] = [
    { name: 'Kevin (Admin)', balance: 8145.75, totalEarned: 45739.50, type: 'admin', growthRate: 15.3 },
    { name: 'Sarah Mokwena', balance: 5850.75, totalEarned: 28125.25, type: 'vendor', growthRate: 22.7 },
    { name: 'Michael Van der Merwe', balance: 3420.00, totalEarned: 15078.90, type: 'customer', growthRate: 8.9 },
    { name: 'Thabo Mthembu', balance: 4675.30, totalEarned: 19456.80, type: 'field_worker', growthRate: 18.4 },
    { name: 'Jennifer Smith', balance: 2290.45, totalEarned: 12892.15, type: 'customer', growthRate: 12.1 }
  ];

  const transactionDistribution: TransactionData[] = [
    { type: 'Vendor Purchases', vendor: 75, admin: 12.5, customer: 12.5, platform: 0 },
    { type: 'Customer Self-Purchase', vendor: 25, admin: 25, customer: 50, platform: 0 },
    { type: 'Customer Gift Purchase', vendor: 0, admin: 0, customer: 50, platform: 50 }
  ];

  const cashbackRates = [
    { userType: 'Customer', rate: '2.5%', adminFee: '2%', additionalRewards: '+1.5% for unregistered gift recipients' },
    { userType: 'Vendor', rate: '8% profit + 2.5% cashback', adminFee: '2%', additionalRewards: '75% of markup from transactions' },
    { userType: 'Admin User', rate: '3.75% cashback (1.5x)', adminFee: '0%', additionalRewards: 'No admin fees' },
    { userType: 'Field Worker', rate: '12% commission (activations)', adminFee: 'N/A', additionalRewards: '95% mobile coverage' }
  ];

  const monthlyTrends = [
    { month: 'Jan', amount: 185420 },
    { month: 'Feb', amount: 208350 },
    { month: 'Mar', amount: 234680 },
    { month: 'Apr', amount: 256790 },
    { month: 'May', amount: 289340 },
    { month: 'Jun', amount: 312560 }
  ];

  const handleGenerateReport = async (reportType: string) => {
    setIsGeneratingReport(true);
    
    toast({
      title: "Generating Report",
      description: `Creating ${reportType} report with real-time data...`,
    });

    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      toast({
        title: "Report Generated Successfully",
        description: `${reportType} report downloaded to your device.`,
      });
    }, 2000);
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'vendor': return <Building className="w-4 h-4" />;
      case 'field_worker': return <Users className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'vendor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'field_worker': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              OneCard Cashback Rewards System Report
            </h1>
            <p className="text-gray-600">
              Real-time reporting and visualization tools for transparency and actionable insights
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleGenerateReport('Comprehensive')}
              disabled={isGeneratingReport}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <Badge className="bg-blue-100 text-blue-800">+{systemOverview.monthlyGrowth}%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-blue-900">R{systemOverview.totalCashbackDistributed.toLocaleString()}</h3>
            <p className="text-blue-700 text-sm">Total Cashback Distributed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-green-600" />
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-900">{systemOverview.activeUsers.toLocaleString()}</h3>
            <p className="text-green-700 text-sm">Active Users</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-purple-900">{systemOverview.totalTransactions.toLocaleString()}</h3>
            <p className="text-purple-700 text-sm">Total Transactions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-yellow-600" />
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-900">{systemOverview.systemHealth}%</h3>
            <p className="text-yellow-700 text-sm">System Health</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports Tabs */}
      <Tabs value={activeReportTab} onValueChange={setActiveReportTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-6">
          <TabsTrigger value="overview" className="text-xs md:text-sm">
            <BarChart3 className="w-4 h-4 mr-1" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="rates" className="text-xs md:text-sm">
            <DollarSign className="w-4 h-4 mr-1" />
            Rates
          </TabsTrigger>
          <TabsTrigger value="distribution" className="text-xs md:text-sm">
            <PieChart className="w-4 h-4 mr-1" />
            Distribution
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs md:text-sm">
            <LineChart className="w-4 h-4 mr-1" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-xs md:text-sm">
            <Zap className="w-4 h-4 mr-1" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* User Type Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Benefit Ranking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userTypeBreakdown.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{user.userType}</h4>
                        <p className="text-sm text-gray-600">{user.count} users • {user.avgRate}% avg rate</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">R{user.totalEarnings.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total earnings</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Earners */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Top Earners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topEarners.map((earner, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                        {getTypeIcon(earner.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{earner.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(earner.type)}>
                            {earner.type}
                          </Badge>
                          <span className="text-xs text-green-600">+{earner.growthRate}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">R{earner.balance.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">R{earner.totalEarned.toLocaleString()} total</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cashback Rates Tab */}
        <TabsContent value="rates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cashback Rates & Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">User Type</th>
                      <th className="text-left p-3">Cashback/Profit Rate</th>
                      <th className="text-left p-3">Admin Fee</th>
                      <th className="text-left p-3">Additional Rewards</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cashbackRates.map((rate, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-semibold">{rate.userType}</td>
                        <td className="p-3">{rate.rate}</td>
                        <td className="p-3">{rate.adminFee}</td>
                        <td className="p-3 text-sm text-gray-600">{rate.additionalRewards}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transaction Distribution Tab */}
        <TabsContent value="distribution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Distribution & Profit Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {transactionDistribution.map((transaction, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">{transaction.type}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{transaction.vendor}%</p>
                        <p className="text-sm text-gray-600">Vendor</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">{transaction.admin}%</p>
                        <p className="text-sm text-gray-600">Admin</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{transaction.customer}%</p>
                        <p className="text-sm text-gray-600">Customer/Recipient</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{transaction.platform}%</p>
                        <p className="text-sm text-gray-600">Platform</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Cashback Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {monthlyTrends.map((trend, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg"
                      style={{ height: `${(trend.amount / 350000) * 200}px` }}
                    ></div>
                    <p className="text-xs mt-2 text-gray-600">{trend.month}</p>
                    <p className="text-xs font-semibold">R{(trend.amount / 1000).toFixed(0)}K</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Intelligent Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <TrendingUp className="w-5 h-5" />
                  Growth Drivers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-green-700">
                  <li>• Vendor engagement leads total rewards</li>
                  <li>• Field worker activations drive expansion</li>
                  <li>• Premium multipliers boost participation</li>
                  <li>• Third-party incentives increase retention</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Target className="w-5 h-5" />
                  Reward Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-700">
                  <li>• Vendors consistently lead in total rewards</li>
                  <li>• Admin users have enhanced benefits</li>
                  <li>• Performance-based commission effective</li>
                  <li>• Customer gift purchases need optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Activity className="w-5 h-5" />
                  Real-Time Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-purple-700">
                  <li>• Live cashback transaction tracking</li>
                  <li>• Anomaly detection active</li>
                  <li>• Performance alerts enabled</li>
                  <li>• Fraud prevention operational</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <Crown className="w-5 h-5" />
                  Strategic Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Increase vendor tier bonuses</li>
                  <li>• Expand premium customer base</li>
                  <li>• Enhance field worker coverage</li>
                  <li>• Optimize gift purchase rewards</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveCashbackReports;