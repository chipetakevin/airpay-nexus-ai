import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Zap,
  Target,
  LineChart,
  RefreshCw,
  Shield,
  Activity,
  Calculator,
  FileSearch,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AnomalyDetection {
  id: string;
  employee_id: string;
  employee_name: string;
  anomaly_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detected_at: string;
  confidence_score: number;
  resolved_at?: string;
  suggested_action: string;
}

interface PredictiveInsight {
  id: string;
  insight_type: string;
  title: string;
  description: string;
  impact_amount: number;
  confidence_level: number;
  implementation_timeline: string;
  priority: 'low' | 'medium' | 'high';
}

interface AutomationMetrics {
  total_processed: number;
  errors_prevented: number;
  time_saved_hours: number;
  accuracy_rate: number;
  cost_savings: number;
}

const AIPayrollAutomation = () => {
  const [anomalies, setAnomalies] = useState<AnomalyDetection[]>([]);
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [metrics, setMetrics] = useState<AutomationMetrics>({
    total_processed: 0,
    errors_prevented: 0,
    time_saved_hours: 0,
    accuracy_rate: 0,
    cost_savings: 0
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    loadAIData();
    // Simulate real-time analysis
    const interval = setInterval(() => {
      if (isAnalyzing && analysisProgress < 100) {
        setAnalysisProgress(prev => Math.min(prev + Math.random() * 10, 100));
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, [isAnalyzing, analysisProgress]);

  const loadAIData = async () => {
    // Simulate AI-powered data loading
    const mockAnomalies: AnomalyDetection[] = [
      {
        id: '1',
        employee_id: 'EMP001',
        employee_name: 'John Mthembu',
        anomaly_type: 'salary_spike',
        severity: 'high',
        description: 'Salary increase of 45% detected without corresponding promotion record',
        detected_at: new Date().toISOString(),
        confidence_score: 92.5,
        suggested_action: 'Verify promotion documentation or investigate data entry error'
      },
      {
        id: '2',
        employee_id: 'EMP045',
        employee_name: 'Sarah Wilson',
        anomaly_type: 'overtime_pattern',
        severity: 'medium',
        description: 'Consistent overtime pattern beyond 40% of regular hours for 3 months',
        detected_at: new Date().toISOString(),
        confidence_score: 87.3,
        suggested_action: 'Review workload distribution and consider additional staffing'
      },
      {
        id: '3',
        employee_id: 'EMP089',
        employee_name: 'Michael Chen',
        anomaly_type: 'deduction_missing',
        severity: 'critical',
        description: 'PAYE deduction missing for high-earning employee',
        detected_at: new Date().toISOString(),
        confidence_score: 99.8,
        suggested_action: 'Immediate correction required to avoid compliance violation'
      }
    ];

    const mockInsights: PredictiveInsight[] = [
      {
        id: '1',
        insight_type: 'cost_optimization',
        title: 'Overtime Cost Reduction Opportunity',
        description: 'AI analysis suggests redistributing workload could reduce overtime costs by 23%',
        impact_amount: 145000,
        confidence_level: 89.2,
        implementation_timeline: '2-4 weeks',
        priority: 'high'
      },
      {
        id: '2',
        insight_type: 'compliance_prediction',
        title: 'SARS Audit Risk Assessment',
        description: 'Current payroll patterns indicate 15% higher audit likelihood next quarter',
        impact_amount: 0,
        confidence_level: 76.4,
        implementation_timeline: 'Immediate',
        priority: 'medium'
      },
      {
        id: '3',
        insight_type: 'staffing_optimization',
        title: 'Seasonal Staffing Prediction',
        description: 'Historical data suggests need for 12% temporary staff increase in Q2',
        impact_amount: 285000,
        confidence_level: 94.1,
        implementation_timeline: '4-6 weeks',
        priority: 'high'
      }
    ];

    const mockMetrics: AutomationMetrics = {
      total_processed: 15847,
      errors_prevented: 342,
      time_saved_hours: 1285,
      accuracy_rate: 99.87,
      cost_savings: 2840000
    };

    setAnomalies(mockAnomalies);
    setInsights(mockInsights);
    setMetrics(mockMetrics);
  };

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    toast({
      title: "AI Analysis Started",
      description: "Running comprehensive payroll analysis...",
    });

    // Simulate analysis completion
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisProgress(100);
      loadAIData();
      toast({
        title: "Analysis Complete",
        description: "AI analysis completed successfully with new insights generated.",
      });
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* AI System Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            AI-Powered Payroll Automation
          </h2>
          <p className="text-gray-600 text-sm">Advanced anomaly detection and predictive analytics</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={runAIAnalysis} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Zap className="w-4 h-4 mr-2" />
            )}
            {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
          </Button>
        </div>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Analysis Progress</span>
                <span className="text-sm text-gray-600">{Math.round(analysisProgress)}%</span>
              </div>
              <Progress value={analysisProgress} className="w-full" />
              <p className="text-xs text-gray-600">
                Processing payroll data, detecting anomalies, and generating insights...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Records Processed</p>
                <p className="text-2xl font-bold text-blue-700">{metrics.total_processed.toLocaleString()}</p>
              </div>
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Errors Prevented</p>
                <p className="text-2xl font-bold text-green-700">{metrics.errors_prevented}</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Time Saved</p>
                <p className="text-2xl font-bold text-purple-700">{metrics.time_saved_hours}h</p>
              </div>
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
                <p className="text-2xl font-bold text-orange-700">{metrics.accuracy_rate}%</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cost Savings</p>
                <p className="text-2xl font-bold text-teal-700">R{(metrics.cost_savings / 1000000).toFixed(1)}M</p>
              </div>
              <TrendingUp className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Analysis Tabs */}
      <Tabs defaultValue="anomalies" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="anomalies" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Anomaly Detection
            {anomalies.length > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {anomalies.filter(a => a.severity === 'critical' || a.severity === 'high').length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Predictive Insights
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Automation Status
          </TabsTrigger>
        </TabsList>

        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-red-600" />
                Detected Anomalies
              </CardTitle>
            </CardHeader>
            <CardContent>
              {anomalies.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600">No anomalies detected in current payroll data</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {anomalies.map((anomaly) => (
                    <div key={anomaly.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900">{anomaly.employee_name}</h4>
                            <Badge className={getSeverityColor(anomaly.severity)}>
                              {anomaly.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{anomaly.employee_id} • {anomaly.anomaly_type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Confidence: {anomaly.confidence_score}%</p>
                          <Progress value={anomaly.confidence_score} className="w-20 h-2 mt-1" />
                        </div>
                      </div>
                      
                      <Alert className="border-orange-200 bg-orange-50">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <AlertDescription className="text-orange-800">
                          <strong>Issue:</strong> {anomaly.description}
                        </AlertDescription>
                      </Alert>
                      
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-900 mb-1">Suggested Action:</p>
                        <p className="text-sm text-blue-800">{anomaly.suggested_action}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileSearch className="w-4 h-4 mr-1" />
                          Investigate
                        </Button>
                        <Button size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                AI-Generated Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div key={insight.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                          <Badge className={getPriorityColor(insight.priority)}>
                            {insight.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{insight.insight_type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Confidence: {insight.confidence_level}%</p>
                        <Progress value={insight.confidence_level} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                    
                    <p className="text-gray-700">{insight.description}</p>
                    
                    {insight.impact_amount > 0 && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-green-900 mb-1">Potential Impact:</p>
                        <p className="text-lg font-bold text-green-800">R{insight.impact_amount.toLocaleString()} savings</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Implementation Timeline: {insight.implementation_timeline}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <LineChart className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Implement
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Automation Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-900">Auto-PAYE Calculations</p>
                      <p className="text-sm text-green-700">Active</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-900">UIF Auto-Processing</p>
                      <p className="text-sm text-green-700">Active</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-900">Compliance Monitoring</p>
                      <p className="text-sm text-green-700">Active</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-900">Fraud Detection</p>
                      <p className="text-sm text-yellow-700">Learning Mode</p>
                    </div>
                    <RefreshCw className="w-5 h-5 text-yellow-600 animate-spin" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Processing Speed</span>
                      <span>98.5%</span>
                    </div>
                    <Progress value={98.5} className="w-full" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy Rate</span>
                      <span>99.87%</span>
                    </div>
                    <Progress value={99.87} className="w-full" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Error Prevention</span>
                      <span>94.2%</span>
                    </div>
                    <Progress value={94.2} className="w-full" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Compliance Score</span>
                      <span>99.1%</span>
                    </div>
                    <Progress value={99.1} className="w-full" />
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

export default AIPayrollAutomation;