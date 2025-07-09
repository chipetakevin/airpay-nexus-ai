import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  BarChart3, 
  Users, 
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface BenchmarkData {
  userValue: number;
  industryAverage: number;
  topPerformers: number;
  percentile: number;
  trend: 'up' | 'down' | 'stable';
}

interface BenchmarkingInsightsProps {
  userData: any;
  viewMode: 'individual' | 'group';
  isLoading?: boolean;
}

export const BenchmarkingInsights = ({ userData, viewMode, isLoading = false }: BenchmarkingInsightsProps) => {
  const [selectedMetric, setSelectedMetric] = useState('cashback');
  const [comparisonGroup, setComparisonGroup] = useState('all_customers');

  // Mock benchmark data - in real implementation, this would come from API
  const benchmarkData: Record<string, BenchmarkData> = {
    cashback: {
      userValue: 2150.75,
      industryAverage: 1850.00,
      topPerformers: 3200.00,
      percentile: 78,
      trend: 'up'
    },
    transactions: {
      userValue: 89,
      industryAverage: 65,
      topPerformers: 120,
      percentile: 82,
      trend: 'up'
    },
    avgTransaction: {
      userValue: 24.16,
      industryAverage: 28.46,
      topPerformers: 35.50,
      percentile: 45,
      trend: 'down'
    }
  };

  const currentBenchmark = benchmarkData[selectedMetric];

  const getPerformanceStatus = (percentile: number) => {
    if (percentile >= 80) return { status: 'excellent', color: 'green', icon: Award };
    if (percentile >= 60) return { status: 'good', color: 'blue', icon: CheckCircle };
    if (percentile >= 40) return { status: 'average', color: 'yellow', icon: Info };
    return { status: 'needs improvement', color: 'red', icon: AlertCircle };
  };

  const performance = getPerformanceStatus(currentBenchmark.percentile);
  const PerformanceIcon = performance.icon;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
            <Skeleton className="h-32" />
            <Skeleton className="h-16" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-800">
          <Target className="w-5 h-5" />
          Performance Benchmarking
          <Badge className={`ml-auto bg-${performance.color}-100 text-${performance.color}-700`}>
            {currentBenchmark.percentile}th percentile
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-700">Metric</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="bg-white border-amber-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cashback">Total Cashback</SelectItem>
                  <SelectItem value="transactions">Transaction Count</SelectItem>
                  <SelectItem value="avgTransaction">Avg per Transaction</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-700">Compare Against</label>
              <Select value={comparisonGroup} onValueChange={setComparisonGroup}>
                <SelectTrigger className="bg-white border-amber-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_customers">All Divine Mobile Customers</SelectItem>
                  <SelectItem value="similar_profile">Similar Customer Profile</SelectItem>
                  <SelectItem value="region">Regional Average</SelectItem>
                  <SelectItem value="industry">Industry Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white border-amber-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <PerformanceIcon className={`w-6 h-6 text-${performance.color}-600`} />
                </div>
                <div className={`text-2xl font-bold text-${performance.color}-600 mb-1`}>
                  {currentBenchmark.userValue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Your Performance</div>
                <Badge variant="outline" className={`mt-2 bg-${performance.color}-50 text-${performance.color}-700`}>
                  {performance.status}
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white border-amber-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {currentBenchmark.industryAverage.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Group Average</div>
                <div className="text-xs text-gray-500 mt-1">
                  You're {currentBenchmark.userValue > currentBenchmark.industryAverage ? 'above' : 'below'} average
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-amber-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {currentBenchmark.topPerformers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Top 10% Average</div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round(((currentBenchmark.topPerformers - currentBenchmark.userValue) / currentBenchmark.topPerformers) * 100)}% to reach
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benchmark Chart */}
          <Card className="bg-white border-amber-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-amber-800 mb-4">Performance Comparison</h4>
              
              <div className="space-y-4">
                {/* Your Performance */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Your Performance</span>
                    <span className="text-sm font-bold text-amber-700">
                      {currentBenchmark.userValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-amber-500 h-3 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(currentBenchmark.userValue / currentBenchmark.topPerformers) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Group Average */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Group Average</span>
                    <span className="text-sm font-bold text-blue-600">
                      {currentBenchmark.industryAverage.toLocaleString()}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(currentBenchmark.industryAverage / currentBenchmark.topPerformers) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Top Performers */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Top 10%</span>
                    <span className="text-sm font-bold text-purple-600">
                      {currentBenchmark.topPerformers.toLocaleString()}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full w-full transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insights & Recommendations */}
          <Card className="bg-white border-amber-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Benchmark Insights
              </h4>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <PerformanceIcon className={`w-5 h-5 text-${performance.color}-600 mt-0.5`} />
                  <div>
                    <p className="font-medium text-gray-900">
                      You're performing {performance.status} compared to similar customers
                    </p>
                    <p className="text-gray-600 mt-1">
                      {currentBenchmark.percentile >= 50 
                        ? `You're ahead of ${currentBenchmark.percentile}% of users in this category.`
                        : `There's room for improvement - you're ahead of ${currentBenchmark.percentile}% of users.`
                      }
                    </p>
                  </div>
                </div>

                {currentBenchmark.percentile < 80 && (
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Growth Opportunity</p>
                      <p className="text-gray-600 mt-1">
                        To reach the top 20%, you'd need to achieve{' '}
                        <span className="font-semibold">
                          {Math.round(currentBenchmark.topPerformers * 0.8).toLocaleString()}
                        </span>
                        {' '}in this metric.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Trend Analysis</p>
                    <p className="text-gray-600 mt-1">
                      Your performance trend is{' '}
                      <span className={`font-semibold text-${currentBenchmark.trend === 'up' ? 'green' : currentBenchmark.trend === 'down' ? 'red' : 'yellow'}-600`}>
                        {currentBenchmark.trend === 'up' ? 'improving' : currentBenchmark.trend === 'down' ? 'declining' : 'stable'}
                      </span>
                      {' '}over the last 3 months.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};