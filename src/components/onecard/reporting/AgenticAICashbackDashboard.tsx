import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  PieChart, 
  BarChart3, 
  Brain, 
  Download,
  AlertTriangle,
  Target,
  Calendar,
  Filter
} from 'lucide-react';
import { CashbackMetricsGrid } from './CashbackMetricsGrid';
import { CashbackTrendChart } from './CashbackTrendChart';
import { CategoryBreakdownChart } from './CategoryBreakdownChart';
import { AIInsightsPanel } from './AIInsightsPanel';
import { UserGroupSelector } from './UserGroupSelector';
import { ExportControls } from './ExportControls';

interface AgenticAICashbackDashboardProps {
  userData?: any;
  userType?: 'customer' | 'vendor' | 'admin' | 'fieldworker';
}

export const AgenticAICashbackDashboard = ({ userData, userType = 'customer' }: AgenticAICashbackDashboardProps) => {
  const [viewMode, setViewMode] = useState<'individual' | 'group'>('individual');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('3months');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Mock data - in real implementation, this would come from your AI service
  const [dashboardData, setDashboardData] = useState({
    totalCashback: 2150.00,
    transactionCount: 120,
    avgCashbackPerTxn: 17.92,
    topCategory: 'Groceries',
    monthlyTrend: [
      { month: 'Jan', amount: 250 },
      { month: 'Feb', amount: 300 },
      { month: 'Mar', amount: 280 },
      { month: 'Apr', amount: 320 },
      { month: 'May', amount: 290 },
      { month: 'Jun', amount: 310 }
    ],
    categoryBreakdown: [
      { category: 'Groceries', amount: 860, percentage: 40 },
      { category: 'Fuel', amount: 645, percentage: 30 },
      { category: 'Utilities', amount: 430, percentage: 20 },
      { category: 'Entertainment', amount: 215, percentage: 10 }
    ],
    aiInsights: {
      anomalies: ['Unusual spike in fuel cashback in April (+25%)'],
      predictions: ['Expected cashback for July: R285 based on current trends'],
      tips: ['Shop on Wednesdays for bonus cashback!', 'Switch to contactless payments for 0.5% extra cashback']
    }
  });

  useEffect(() => {
    // Simulate AI data processing
    setIsLoadingAI(true);
    const timer = setTimeout(() => {
      setIsLoadingAI(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [viewMode, selectedGroup, dateRange]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-4">
      {/* Header Section with Gold OneCard Styling */}
      <Card className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/10 rounded-lg">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">OneCard Agentic AI Cashback Dashboard</CardTitle>
                <p className="text-black/80 text-sm">Powered by Intelligent Analytics</p>
              </div>
            </div>
            <Badge className="bg-black text-yellow-400 font-bold px-3 py-1">
              ACTIVE
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Controls Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <UserGroupSelector 
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              selectedGroup={selectedGroup}
              onGroupChange={setSelectedGroup}
              userType={userType}
            />
            
            <div className="flex gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
              
              <ExportControls data={dashboardData} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <CashbackMetricsGrid 
            data={dashboardData}
            viewMode={viewMode}
            isLoading={isLoadingAI}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CashbackTrendChart 
              data={dashboardData.monthlyTrend}
              isLoading={isLoadingAI}
            />
            <CategoryBreakdownChart 
              data={dashboardData.categoryBreakdown}
              isLoading={isLoadingAI}
            />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <CashbackTrendChart 
                data={dashboardData.monthlyTrend}
                isLoading={isLoadingAI}
                detailed={true}
              />
            </div>
            <div>
              <CategoryBreakdownChart 
                data={dashboardData.categoryBreakdown}
                isLoading={isLoadingAI}
                showDetails={true}
              />
            </div>
          </div>
          
          {/* Additional Analytics Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Performance vs Benchmark
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Your Cashback Rate</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      2.5%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Group Average</span>
                    <span className="text-sm text-gray-600">2.1%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600">You're performing 19% above group average</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Transaction Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Peak Day</span>
                    <span className="text-sm font-semibold">Wednesday</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Transaction Size</span>
                    <span className="text-sm font-semibold">R187</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Most Active Time</span>
                    <span className="text-sm font-semibold">2-4 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cashback Efficiency</span>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">Excellent</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <AIInsightsPanel 
            insights={dashboardData.aiInsights}
            isLoading={isLoadingAI}
            viewMode={viewMode}
            userData={userData}
          />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Generated Reports</h3>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                <Download className="w-4 h-4 mr-2" />
                Generate New Report
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Monthly Summary', 'Category Analysis', 'Performance Report', 'AI Predictions', 'Compliance Report', 'Custom Export'].map((reportType) => (
                <Card key={reportType} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{reportType}</p>
                        <p className="text-sm text-gray-600">Last updated: Today</p>
                      </div>
                      <Download className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};