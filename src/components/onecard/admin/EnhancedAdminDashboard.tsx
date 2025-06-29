import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Eye,
  Zap,
  DollarSign,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, Area, AreaChart, Pie } from 'recharts';

interface EnhancedAdminDashboardProps {
  customers: any[];
  transactions: any[];
}

const EnhancedAdminDashboard = ({ customers, transactions }: EnhancedAdminDashboardProps) => {
  const [timeRange, setTimeRange] = useState('30d');

  // Calculate enhanced metrics
  const metrics = useMemo(() => {
    const totalCustomers = customers.length;
    const totalBalance = customers.reduce((sum, customer) => sum + (customer.onecard_balance || 0), 0);
    const totalCashback = customers.reduce((sum, customer) => sum + (customer.total_cashback || 0), 0);
    const totalTransactions = transactions.length;
    const avgTransactionValue = transactions.length > 0 ? transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length : 0;
    
    // Growth calculations (mock data for demo)
    const customerGrowth = 12.5;
    const balanceGrowth = 8.3;
    const cashbackGrowth = 15.2;
    const transactionGrowth = 6.7;

    return {
      totalCustomers,
      totalBalance,
      totalCashback,
      totalTransactions,
      avgTransactionValue,
      customerGrowth,
      balanceGrowth,
      cashbackGrowth,
      transactionGrowth
    };
  }, [customers, transactions]);

  // Chart data
  const barChartData = [
    { name: 'Jan', customers: 12, transactions: 45 },
    { name: 'Feb', customers: 19, transactions: 52 },
    { name: 'Mar', customers: 25, transactions: 68 },
    { name: 'Apr', customers: 32, transactions: 84 },
    { name: 'May', customers: 28, transactions: 76 },
    { name: 'Jun', customers: 35, transactions: 92 }
  ];

  const pieChartData = [
    { name: 'Vodacom', value: 45, color: '#ef4444' },
    { name: 'MTN', value: 30, color: '#f59e0b' },
    { name: 'Cell C', value: 15, color: '#3b82f6' },
    { name: 'Telkom', value: 10, color: '#8b5cf6' }
  ];

  const areaChartData = [
    { name: 'Week 1', balance: 1200, cashback: 150 },
    { name: 'Week 2', balance: 1800, cashback: 220 },
    { name: 'Week 3', balance: 2200, cashback: 280 },
    { name: 'Week 4', balance: 2770, cashback: 350 }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color, trend }: any) => (
    <Card className={`relative overflow-hidden border-l-4 border-l-${color}-500 hover:shadow-lg transition-all duration-300 group`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className={`p-2 rounded-lg bg-${color}-100`}>
            <Icon className={`w-4 h-4 text-${color}-600`} />
          </div>
          <div className="flex items-center gap-1 text-xs">
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3 text-green-500" /> : <ArrowDownRight className="w-3 h-3 text-red-500" />}
            <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
              {change}%
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-gray-600 mb-1">{title}</h3>
          <p className="text-lg font-bold text-gray-900">{value}</p>
        </div>
        <div className={`absolute inset-0 bg-gradient-to-r from-${color}-500/5 to-${color}-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4 p-2 sm:p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 sm:p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">OneCard Admin Dashboard</h1>
            <p className="text-blue-100 text-sm">Complete customer management and reporting suite</p>
          </div>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex flex-wrap gap-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <Button
              key={range}
              size="sm"
              variant={timeRange === range ? "secondary" : "outline"}
              onClick={() => setTimeRange(range)}
              className={`text-xs ${timeRange === range ? 'bg-white text-blue-600' : 'border-white/30 text-white hover:bg-white/10'}`}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Total Customers"
          value={metrics.totalCustomers}
          change={metrics.customerGrowth}
          icon={Users}
          color="blue"
          trend="up"
        />
        <StatCard
          title="Total Balance"
          value={`R${metrics.totalBalance.toFixed(2)}`}
          change={metrics.balanceGrowth}
          icon={CreditCard}
          color="green"
          trend="up"
        />
        <StatCard
          title="Total Cashback"
          value={`R${metrics.totalCashback.toFixed(2)}`}
          change={metrics.cashbackGrowth}
          icon={TrendingUp}
          color="purple"
          trend="up"
        />
        <StatCard
          title="Transactions"
          value={metrics.totalTransactions}
          change={metrics.transactionGrowth}
          icon={Activity}
          color="orange"
          trend="up"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Growth Trends */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Growth Trends
              <Badge variant="outline" className="ml-auto text-xs">Monthly</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div style={{ width: '100%', height: '200px' }}>
              <ResponsiveContainer>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Bar dataKey="customers" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="transactions" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Network Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Network Distribution
              <Badge variant="outline" className="ml-auto text-xs">Live</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div style={{ width: '100%', height: '200px' }}>
              <ResponsiveContainer>
                <RechartsPieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {pieChartData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-semibold ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Financial Overview
            <Badge variant="outline" className="ml-auto text-xs">Weekly</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div style={{ width: '100%', height: '180px' }}>
            <ResponsiveContainer>
              <AreaChart data={areaChartData}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="cashbackGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="balance" stroke="#3b82f6" fillOpacity={1} fill="url(#balanceGradient)" />
                <Area type="monotone" dataKey="cashback" stroke="#8b5cf6" fillOpacity={1} fill="url(#cashbackGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button className="flex items-center gap-2 h-12" variant="outline">
          <Download className="w-4 h-4" />
          <span className="text-xs">Export Data</span>
        </Button>
        <Button className="flex items-center gap-2 h-12" variant="outline">
          <Eye className="w-4 h-4" />
          <span className="text-xs">View Details</span>
        </Button>
        <Button className="flex items-center gap-2 h-12" variant="outline">
          <Calendar className="w-4 h-4" />
          <span className="text-xs">Schedule Report</span>
        </Button>
        <Button className="flex items-center gap-2 h-12" variant="outline">
          <Target className="w-4 h-4" />
          <span className="text-xs">Set Goals</span>
        </Button>
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Success Rate</p>
                <p className="text-lg font-bold text-green-600">98.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Avg Response</p>
                <p className="text-lg font-bold text-blue-600">1.2s</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">ROI</p>
                <p className="text-lg font-bold text-purple-600">245%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;
