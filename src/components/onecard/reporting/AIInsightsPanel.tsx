import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Lightbulb, 
  Target, 
  Zap,
  RefreshCw,
  CheckCircle,
  Info
} from 'lucide-react';

interface AIInsights {
  anomalies: string[];
  predictions: string[];
  tips: string[];
}

interface AIInsightsPanelProps {
  insights: AIInsights;
  isLoading?: boolean;
  viewMode: 'individual' | 'group';
  userData?: any;
}

export const AIInsightsPanel = ({ insights, isLoading = false, viewMode, userData }: AIInsightsPanelProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefreshInsights = async () => {
    setRefreshing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  if (isLoading || refreshing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI-Powered Insights</h2>
            <p className="text-gray-600">
              {viewMode === 'individual' ? 'Personalized recommendations' : 'Group intelligence'} 
              powered by advanced analytics
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleRefreshInsights}
          variant="outline"
          className="bg-purple-50 border-purple-200 hover:bg-purple-100"
          disabled={refreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh AI Analysis
        </Button>
      </div>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Anomaly Detection */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="w-5 h-5" />
              Anomaly Detection
              <Badge variant="outline" className="ml-auto bg-orange-100 text-orange-700 border-orange-300">
                {insights.anomalies.length} found
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.anomalies.length > 0 ? (
                insights.anomalies.map((anomaly, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-orange-200">
                    <Zap className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{anomaly}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Detected {Math.floor(Math.random() * 7) + 1} days ago
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No anomalies detected. Your spending patterns look normal!</p>
                </div>
              )}
              
              <Button variant="outline" size="sm" className="w-full mt-3">
                View Detailed Analysis
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Predictive Analytics */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <TrendingUp className="w-5 h-5" />
              Predictive Analytics
              <Badge variant="outline" className="ml-auto bg-blue-100 text-blue-700 border-blue-300">
                {insights.predictions.length} forecasts
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.predictions.map((prediction, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                  <Target className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{prediction}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="text-xs text-blue-600 font-medium">78% confidence</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="bg-white p-3 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Next Month Forecast</span>
                  <span className="text-lg font-bold text-blue-600">R{Math.floor(Math.random() * 100) + 250}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Based on current trends</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personalized Tips */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Lightbulb className="w-5 h-5" />
              Optimization Tips
              <Badge variant="outline" className="ml-auto bg-green-100 text-green-700 border-green-300">
                {insights.tips.length} recommendations
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{tip}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300">
                        +R{Math.floor(Math.random() * 50) + 10} potential
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" size="sm" className="w-full mt-3">
                <Info className="w-4 h-4 mr-2" />
                Learn More About Optimization
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Summary */}
      <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-yellow-200 rounded-full">
              <Brain className="w-6 h-6 text-yellow-800" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-yellow-900 mb-2">AI Summary for {viewMode === 'individual' ? userData?.firstName || 'User' : 'Group'}</h3>
              <p className="text-yellow-800 text-sm leading-relaxed">
                {viewMode === 'individual' ? (
                  `Your cashback performance is excellent with a 24% growth rate. You're earning above-average rewards in grocery categories. 
                  Continue your current spending patterns, and consider the optimization tips to maximize your earnings further.`
                ) : (
                  `The group shows strong collective performance with consistent growth across all categories. 
                  Top performers are driving innovation in cashback optimization. Focus on sharing best practices within the group.`
                )}
              </p>
              <div className="flex gap-2 mt-3">
                <Badge className="bg-yellow-200 text-yellow-800 border-yellow-300">Overall Score: A+</Badge>
                <Badge className="bg-yellow-200 text-yellow-800 border-yellow-300">Trend: Improving</Badge>
                <Badge className="bg-yellow-200 text-yellow-800 border-yellow-300">Risk: Low</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};