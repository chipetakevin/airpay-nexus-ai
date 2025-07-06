import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Settings,
  AlertTriangle,
  CheckCircle,
  Target,
  Zap,
  Brain,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsData {
  payroll_trends: PayrollTrend[];
  cost_analysis: CostAnalysis;
  compliance_metrics: ComplianceMetrics;
  predictive_insights: PredictiveInsight[];
  department_breakdown: DepartmentBreakdown[];
}

interface PayrollTrend {
  month: string;
  total_payroll: number;
  employee_count: number;
  average_salary: number;
  overtime_cost: number;
}

interface CostAnalysis {
  total_cost: number;
  breakdown: {
    salaries: number;
    benefits: number;
    taxes: number;
    overtime: number;
    bonuses: number;
  };
  cost_per_employee: number;
  month_over_month_change: number;
}

interface ComplianceMetrics {
  overall_score: number;
  paye_compliance: number;
  uif_compliance: number;
  sdl_compliance: number;
  filing_accuracy: number;
  audit_readiness: number;
}

interface PredictiveInsight {
  id: string;
  category: string;
  title: string;
  description: string;
  impact_percentage: number;
  confidence_level: number;
  recommended_action: string;
}

interface DepartmentBreakdown {
  department: string;
  employee_count: number;
  total_cost: number;
  average_salary: number;
  cost_percentage: number;
}

const AdvancedAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('12_months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedPeriod, selectedDepartment]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockData: AnalyticsData = {
        payroll_trends: [
          { month: 'Jan 2024', total_payroll: 11800000, employee_count: 1180, average_salary: 52500, overtime_cost: 285000 },
          { month: 'Feb 2024', total_payroll: 12100000, employee_count: 1210, average_salary: 53200, overtime_cost: 312000 },
          { month: 'Mar 2024', total_payroll: 12350000, employee_count: 1235, average_salary: 53800, overtime_cost: 298000 },
          { month: 'Apr 2024', total_payroll: 12450000, employee_count: 1247, average_salary: 54100, overtime_cost: 325000 },
          { month: 'May 2024', total_payroll: 12620000, employee_count: 1262, average_salary: 54500, overtime_cost: 342000 }
        ],
        cost_analysis: {
          total_cost: 12620000,
          breakdown: {
            salaries: 9800000,
            benefits: 1580000,
            taxes: 950000,
            overtime: 342000,
            bonuses: 248000
          },
          cost_per_employee: 52850,
          month_over_month_change: 1.4
        },
        compliance_metrics: {
          overall_score: 98.5,
          paye_compliance: 99.2,
          uif_compliance: 98.8,
          sdl_compliance: 97.9,
          filing_accuracy: 99.5,
          audit_readiness: 96.8
        },
        predictive_insights: [
          {
            id: '1',
            category: 'Cost Optimization',
            title: 'Overtime Cost Reduction',
            description: 'Analysis suggests potential 18% reduction in overtime costs through schedule optimization',
            impact_percentage: 18,
            confidence_level: 87,
            recommended_action: 'Implement smart scheduling system and workload balancing'
          },
          {
            id: '2',
            category: 'Staffing Prediction',
            title: 'Seasonal Hiring Forecast',
            description: 'Historical data indicates need for 15% temporary staff increase in Q4',
            impact_percentage: 15,
            confidence_level: 92,
            recommended_action: 'Begin recruitment planning for Q4 seasonal demands'
          },
          {
            id: '3',
            category: 'Compliance Risk',
            title: 'SDL Filing Risk Assessment',
            description: 'Current patterns suggest 12% higher audit probability without system updates',
            impact_percentage: 12,
            confidence_level: 78,
            recommended_action: 'Update SDL calculation methodology and documentation'
          }
        ],
        department_breakdown: [
          { department: 'IT Development', employee_count: 287, total_cost: 3420000, average_salary: 68500, cost_percentage: 27.1 },
          { department: 'Sales & Marketing', employee_count: 195, total_cost: 2180000, average_salary: 58200, cost_percentage: 17.3 },
          { department: 'Operations', employee_count: 312, total_cost: 2850000, average_salary: 48500, cost_percentage: 22.6 },
          { department: 'Finance & Admin', employee_count: 145, total_cost: 1890000, average_salary: 62800, cost_percentage: 15.0 },
          { department: 'HR & Legal', employee_count: 89, total_cost: 1180000, average_salary: 72500, cost_percentage: 9.3 },
          { department: 'Executive', employee_count: 23, total_cost: 2100000, average_salary: 125000, cost_percentage: 16.6 }
        ]
      };
      
      setAnalyticsData(mockData);
      setIsLoading(false);
    }, 1500);
  };

  const exportAnalytics = (format: string) => {
    toast({
      title: "Export Started",
      description: `Analytics data export in ${format.toUpperCase()} format has been initiated.`,
    });
  };

  const refreshData = () => {
    toast({
      title: "Refreshing Data",
      description: "Analytics data is being updated with latest information.",
    });
    loadAnalyticsData();
  };

  if (isLoading || !analyticsData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading advanced analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Analytics Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            Advanced Payroll Analytics
          </h2>
          <p className="text-gray-600 text-sm">Comprehensive insights and predictive analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3_months">Last 3 Months</SelectItem>
              <SelectItem value="6_months">Last 6 Months</SelectItem>
              <SelectItem value="12_months">Last 12 Months</SelectItem>
              <SelectItem value="24_months">Last 24 Months</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="it">IT Development</SelectItem>
              <SelectItem value="sales">Sales & Marketing</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="finance">Finance & Admin</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={refreshData} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          
          <Button onClick={() => exportAnalytics('xlsx')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Payroll</p>
                <p className="text-2xl font-bold text-blue-800">R{(analyticsData.cost_analysis.total_cost / 1000000).toFixed(1)}M</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+{analyticsData.cost_analysis.month_over_month_change}%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Avg Cost/Employee</p>
                <p className="text-2xl font-bold text-green-800">R{analyticsData.cost_analysis.cost_per_employee.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">Optimized</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Compliance Score</p>
                <p className="text-2xl font-bold text-purple-800">{analyticsData.compliance_metrics.overall_score}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">Excellent</span>
                </div>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Overtime Costs</p>
                <p className="text-2xl font-bold text-orange-800">R{(analyticsData.cost_analysis.breakdown.overtime / 1000).toFixed(0)}K</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-red-600" />
                  <span className="text-xs text-red-600">High Alert</span>
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-700">AI Insights</p>
                <p className="text-2xl font-bold text-teal-800">{analyticsData.predictive_insights.length}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Brain className="w-3 h-3 text-teal-600" />
                  <span className="text-xs text-teal-600">Active</span>
                </div>
              </div>
              <Zap className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="predictions">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-blue-600" />
                  Payroll Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.payroll_trends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{trend.month}</p>
                        <p className="text-sm text-gray-600">{trend.employee_count} employees</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">R{(trend.total_payroll / 1000000).toFixed(1)}M</p>
                        <p className="text-sm text-gray-600">Avg: R{trend.average_salary.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  Key Performance Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Payroll Growth Rate</span>
                      <span className="text-green-600">+6.9% YoY</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '69%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Employee Retention</span>
                      <span className="text-blue-600">94.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Cost Efficiency</span>
                      <span className="text-purple-600">87.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '87.5%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Automation Level</span>
                      <span className="text-orange-600">91.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '91.8%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-600" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analyticsData.cost_analysis.breakdown).map(([key, value]) => {
                    const percentage = (value / analyticsData.cost_analysis.total_cost) * 100;
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{key.replace('_', ' ')}</span>
                          <span className="font-medium">R{(value / 1000000).toFixed(1)}M ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Cost Optimization Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-900">Overtime Optimization</span>
                    </div>
                    <p className="text-sm text-yellow-800">
                      Current overtime costs are 18% above industry average. Potential savings: R285K annually.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Benefits Optimization</span>
                    </div>
                    <p className="text-sm text-blue-800">
                      Review benefit utilization rates. 23% of employees underutilize allocated benefits.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">Tax Efficiency</span>
                    </div>
                    <p className="text-sm text-green-800">
                      Tax optimization is performing well. Maintaining 99.2% compliance rate.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Department Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.department_breakdown.map((dept, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg">{dept.department}</h4>
                      <Badge variant="outline">{dept.cost_percentage.toFixed(1)}% of total</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">Employees</p>
                        <p className="text-2xl font-bold text-blue-800">{dept.employee_count}</p>
                      </div>
                      
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-700">Total Cost</p>
                        <p className="text-2xl font-bold text-green-800">R{(dept.total_cost / 1000000).toFixed(1)}M</p>
                      </div>
                      
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-700">Avg Salary</p>
                        <p className="text-2xl font-bold text-purple-800">R{dept.average_salary.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                          style={{ width: `${dept.cost_percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Compliance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analyticsData.compliance_metrics).map(([key, value]) => {
                    if (key === 'overall_score') return null;
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{key.replace('_', ' ')}</span>
                          <span className="font-medium">{value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              value >= 95 ? 'bg-green-500' : 
                              value >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  Compliance Score Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {analyticsData.compliance_metrics.overall_score}%
                  </div>
                  <p className="text-gray-600">Overall Compliance Score</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-900">Excellent</span>
                    <span className="text-green-700">95-100%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium text-yellow-900">Good</span>
                    <span className="text-yellow-700">85-94%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium text-red-900">Needs Attention</span>
                    <span className="text-red-700">Below 85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI-Powered Predictive Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.predictive_insights.map((insight) => (
                  <div key={insight.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                          <Badge variant="outline">{insight.category}</Badge>
                        </div>
                        <p className="text-gray-600">{insight.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Impact: {insight.impact_percentage}%</p>
                        <p className="text-sm text-gray-600">Confidence: {insight.confidence_level}%</p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-1">Recommended Action:</p>
                      <p className="text-sm text-blue-800">{insight.recommended_action}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Implement
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;