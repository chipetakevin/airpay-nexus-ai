
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  Download, 
  Calendar,
  DollarSign,
  Users,
  Activity
} from 'lucide-react';

interface Transaction {
  customer_id: string;
  vendor_id: string;
  deal_id: string;
  recipient_phone: string;
  recipient_name: string;
  recipient_relationship: string | null;
  amount: number;
  original_price: number;
  discounted_price: number;
  network: string;
  transaction_type: string;
  cashback_earned: number;
  admin_fee: number;
  vendor_commission: number;
  status: string;
  timestamp: string;
}

interface SmartReportsPanelProps {
  transactions: Transaction[];
}

export const SmartReportsPanel = ({ transactions }: SmartReportsPanelProps) => {
  const [activeReportTab, setActiveReportTab] = useState('overview');

  // Smart analytics calculations
  const analytics = useMemo(() => {
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    const totalCashback = transactions.reduce((sum, t) => sum + t.cashback_earned, 0);
    const completedTransactions = transactions.filter(t => t.status === 'completed');
    
    // Network analysis
    const networkStats = transactions.reduce((acc, t) => {
      acc[t.network] = (acc[t.network] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Transaction type analysis
    const typeStats = transactions.reduce((acc, t) => {
      const type = t.transaction_type || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Monthly trends
    const monthlyTrends = transactions.reduce((acc, t) => {
      const month = new Date(t.timestamp).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short' });
      if (!acc[month]) {
        acc[month] = { count: 0, amount: 0, cashback: 0 };
      }
      acc[month].count += 1;
      acc[month].amount += t.amount;
      acc[month].cashback += t.cashback_earned;
      return acc;
    }, {} as Record<string, { count: number; amount: number; cashback: number }>);

    // Success rate
    const successRate = transactions.length > 0 
      ? (completedTransactions.length / transactions.length) * 100 
      : 0;

    return {
      totalAmount,
      totalCashback,
      totalTransactions: transactions.length,
      completedTransactions: completedTransactions.length,
      successRate,
      networkStats,
      typeStats,
      monthlyTrends,
      averageAmount: transactions.length > 0 ? totalAmount / transactions.length : 0,
      topNetwork: Object.entries(networkStats).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
    };
  }, [transactions]);

  const generateReport = (type: string) => {
    console.log(`Generating ${type} report with enhanced analytics...`);
    // This will integrate with the enhanced PDF generator
  };

  const reportTabs = [
    {
      value: 'overview',
      label: 'Overview',
      icon: '📊',
      description: 'Summary',
      color: 'blue'
    },
    {
      value: 'trends',
      label: 'Trends',
      icon: '📈',
      description: 'Analytics',
      color: 'green'
    },
    {
      value: 'insights',
      label: 'Insights',
      icon: '🧠',
      description: 'AI Powered',
      color: 'purple'
    }
  ];

  const getTabClassName = (tabValue: string, color: string) => {
    let baseClass = "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 min-h-[65px] flex-1 border text-xs shadow-sm relative overflow-hidden";
    
    const colorClasses = {
      blue: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-blue-400 bg-blue-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100",
      green: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-green-400 bg-green-50 border-green-200 hover:border-green-300 hover:bg-green-100",
      purple: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-purple-400 bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100"
    };
    
    baseClass += " " + colorClasses[color];
    return baseClass;
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeReportTab} onValueChange={setActiveReportTab} className="w-full">
        {/* Tab Navigation */}
        <div className="w-full mb-6">
          <TabsList className="w-full max-w-full">
            <div className="grid grid-cols-3 gap-2 w-full">
              {reportTabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold leading-tight text-xs">{tab.label}</div>
                    <div className="text-xs opacity-75 leading-tight">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-lg font-bold">R{analytics.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Cashback</p>
                    <p className="text-lg font-bold text-green-600">R{analytics.totalCashback.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-lg font-bold">{analytics.successRate.toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Top Network</p>
                    <p className="text-lg font-bold">{analytics.topNetwork}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Network Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Network Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(analytics.networkStats).map(([network, count]) => (
                  <div key={network} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{network}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(count / analytics.totalTransactions) * 100}%` }}
                        />
                      </div>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Monthly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analytics.monthlyTrends).map(([month, data]) => (
                  <div key={month} className="border-l-4 border-l-blue-500 pl-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{month}</h4>
                      <Badge>{data.count} transactions</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                      <div>
                        <span className="text-gray-600">Amount: </span>
                        <span className="font-medium">R{data.amount.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Cashback: </span>
                        <span className="font-medium text-green-600">R{data.cashback.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                🧠 AI-Powered Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">💡 Spending Pattern Analysis</h4>
                  <p className="text-sm text-purple-800">
                    Your average transaction is R{analytics.averageAmount.toFixed(2)}. 
                    You're most active on {analytics.topNetwork} network with {analytics.networkStats[analytics.topNetwork] || 0} transactions.
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">🎯 Cashback Optimization</h4>
                  <p className="text-sm text-green-800">
                    You've earned R{analytics.totalCashback.toFixed(2)} in total cashback. 
                    Your success rate is {analytics.successRate.toFixed(1)}% - {analytics.successRate > 90 ? 'Excellent!' : 'Room for improvement.'}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">📊 Transaction Health</h4>
                  <p className="text-sm text-blue-800">
                    {analytics.completedTransactions} of {analytics.totalTransactions} transactions completed successfully. 
                    {analytics.totalTransactions > 10 ? 'You\'re an active user!' : 'Consider making more transactions to maximize benefits.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Generation Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Download className="w-5 h-5" />
            Generate Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => generateReport('detailed')}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Detailed Report
            </Button>
            <Button 
              onClick={() => generateReport('summary')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Monthly Summary
            </Button>
            <Button 
              onClick={() => generateReport('analytics')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
