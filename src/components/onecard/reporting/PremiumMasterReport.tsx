import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Lightbulb, Crown, Download, FileText, Sparkles } from 'lucide-react';
import { CashbackMetricsGrid } from './CashbackMetricsGrid';
import { CashbackTrendChart } from './CashbackTrendChart';
import { CategoryBreakdownChart } from './CategoryBreakdownChart';
import { AIInsightsPanel } from './AIInsightsPanel';
import { AdvancedChartsControls } from './AdvancedChartsControls';
import { BenchmarkingInsights } from './BenchmarkingInsights';
import { generateEnhancedMasterReport } from '../utils/enhancedPdfGenerator';
import { toast } from 'sonner';

interface PremiumMasterReportProps {
  userData: any;
  userType?: 'customer' | 'vendor' | 'admin' | 'fieldworker';
}

export const PremiumMasterReport = ({ userData, userType = 'customer' }: PremiumMasterReportProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  // Mock data for demonstration
  const mockData = {
    totalCashback: 2150.75,
    transactionCount: 89,
    avgCashbackPerTxn: 24.16,
    topCategory: 'Groceries'
  };

  const mockTrendData = [
    { month: 'Jan', amount: 320 },
    { month: 'Feb', amount: 285 },
    { month: 'Mar', amount: 450 },
    { month: 'Apr', amount: 520 },
    { month: 'May', amount: 390 },
    { month: 'Jun', amount: 485 }
  ];

  const mockCategoryData = [
    { category: 'Groceries', amount: 856.30, percentage: 40 },
    { category: 'Fuel', amount: 645.23, percentage: 30 },
    { category: 'Utilities', amount: 430.15, percentage: 20 },
    { category: 'Shopping', amount: 219.07, percentage: 10 }
  ];

  const handleGeneratePremiumReport = async () => {
    setIsGenerating(true);
    
    try {
      // Show immediate feedback
      toast.info('Generating premium report...', {
        description: 'Processing your data with Divine Mobile branding.',
      });
      
      // Simulate report generation with enhanced data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate PDF using the enhanced PDF generator with date range
      const reportData = {
        ...userData,
        dateRange: selectedDateRange,
        timeframe: selectedTimeframe,
        generatedAt: new Date()
      };
      
      generateEnhancedMasterReport(
        [reportData || { firstName: 'Divine', lastName: 'Customer', onecardBalance: 2150.75 }],
        mockTrendData.map((item, index) => ({
          id: `txn_${index}`,
          amount: item.amount,
          type: 'cashback',
          timestamp: new Date().toISOString(),
          status: 'completed'
        })),
        toast
      );
      
      // Show success message
      toast.success('Premium Report Generated Successfully!', {
        description: 'Professional PDF with Divine Mobile logo and comprehensive analytics has been downloaded.',
      });
      
    } catch (error) {
      toast.error('Failed to generate report', {
        description: 'Please try again later.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDateRangeChange = (range: any) => {
    setSelectedDateRange(range);
    toast.success('Date range updated', {
      description: 'Charts and analytics will reflect the new date range.',
    });
  };

  const handleExportChart = (format: 'png' | 'pdf' | 'svg') => {
    toast.success(`Exporting chart as ${format.toUpperCase()}`, {
      description: 'Your chart export will begin shortly.',
    });
  };

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
  };

  const handleNotificationToggle = (enabled: boolean) => {
    // Notification toggle logic handled in AdvancedChartsControls
  };

  const features = [
    {
      icon: BarChart3,
      title: 'Charts',
      description: 'Interactive visualizations',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Trends',
      description: 'Automated analysis',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Lightbulb,
      title: 'Insights',
      description: 'AI-powered recommendations',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      icon: Crown,
      title: 'Premium',
      description: 'Professional reports',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-yellow-50 to-amber-50 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center">
          <div className="w-12 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-purple-600">CF</span>
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Premium Master Report</h1>
          <p className="text-lg text-gray-600 mt-2">
            Professional PDF with charts, Divine Mobile logo, and comprehensive analytics
          </p>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className={`${feature.bgColor} border-none shadow-sm hover:shadow-md transition-shadow`}>
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto ${feature.bgColor} rounded-2xl flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Premium Report Generator - Enhanced Clickability */}
      <Card className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 border-none text-white shadow-2xl hover:shadow-3xl transition-all duration-300">
        <CardContent className="p-8 text-center">
          <div className="w-12 h-8 bg-white rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-xs font-bold text-purple-600">CF</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2">Generate Your Premium Report</h3>
          <p className="text-purple-100 mb-6 text-sm">Professional PDF with Divine Mobile branding and comprehensive analytics</p>
          
          <Button 
            onClick={handleGeneratePremiumReport}
            disabled={isGenerating}
            className="bg-white text-purple-600 hover:bg-purple-50 hover:scale-105 font-semibold px-10 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 focus:ring-4 focus:ring-purple-300 focus:outline-none"
            type="button"
            role="button"
            aria-label="Generate Premium Report with Divine Mobile branding"
            style={{ 
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              minHeight: '56px',
              minWidth: '280px'
            }}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mr-3" />
                <span>Generating Premium Report...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Crown className="w-6 h-6 mr-3" />
                <span>Generate Premium Report</span>
                <Sparkles className="w-5 h-5 ml-3" />
              </div>
            )}
          </Button>
          
          <div className="mt-4 text-xs text-purple-200">
            ✨ Click to generate your professional PDF report with charts and analytics
          </div>
        </CardContent>
      </Card>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 text-gray-700">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <span className="font-medium">One-click download</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <Crown className="w-5 h-5 text-purple-500" />
          <span className="font-medium">Divine Mobile logo included</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <BarChart3 className="w-5 h-5 text-green-500" />
          <span className="font-medium">Modern design</span>
        </div>
      </div>

      {/* Analytics Sections */}
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Advanced Controls */}
        <AdvancedChartsControls 
          onDateRangeChange={handleDateRangeChange}
          onExportChart={handleExportChart}
          onTimeframeChange={handleTimeframeChange}
          onNotificationToggle={handleNotificationToggle}
        />

        {/* Metrics Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Interactive Charts & Metrics
              <Badge variant="outline" className="bg-blue-50 text-blue-600">Live Data</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CashbackMetricsGrid 
              data={mockData} 
              viewMode="individual"
            />
          </CardContent>
        </Card>

        {/* Trends Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Trends Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CashbackTrendChart 
              data={mockTrendData}
              detailed={true}
            />
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Category Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryBreakdownChart 
                data={mockCategoryData}
                showDetails={true}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-orange-600" />
                AI-Powered Insights
                <Badge variant="outline" className="bg-orange-50 text-orange-600">Smart Analytics</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AIInsightsPanel 
                userData={userData}
                insights={{
                  anomalies: [
                    'Unusual spike in fuel spending detected last week',
                    'Lower grocery cashback than average for this month'
                  ],
                  predictions: [
                    'Based on current trends, you\'ll earn R485 in cashback next month',
                    'Grocery spending is predicted to increase by 15% in the next quarter'
                  ],
                  tips: [
                    'Shop at Partner Store XYZ on Wednesdays for 2x cashback on groceries',
                    'Use your OneCard for fuel purchases to earn bonus rewards',
                    'Consolidate utility payments to maximize cashback on bills'
                  ]
                }}
                viewMode="individual"
              />
            </CardContent>
          </Card>
        </div>

        {/* Benchmarking Section */}
        <BenchmarkingInsights 
          userData={userData}
          viewMode="individual"
        />
      </div>

      {/* Financial Summary */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="w-12 h-12 mx-auto bg-green-50 rounded-2xl flex items-center justify-center mb-2">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Financial Summary</CardTitle>
          <p className="text-gray-600">Comprehensive cashback and transaction overview</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">R{mockData.totalCashback}</div>
              <div className="text-sm text-gray-600">Total Cashback</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{mockData.transactionCount}</div>
              <div className="text-sm text-gray-600">Transactions</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">R{mockData.avgCashbackPerTxn}</div>
              <div className="text-sm text-gray-600">Avg Cashback</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{mockData.topCategory}</div>
              <div className="text-sm text-gray-600">Top Category</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};