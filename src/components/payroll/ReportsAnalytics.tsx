
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  BarChart3,
  PieChart,
  Eye,
  Crown
} from 'lucide-react';

const ReportsAnalytics = () => {
  const reportTypes = [
    {
      title: 'Payroll Summary Report',
      description: 'Comprehensive monthly payroll breakdown with Divine Mobile logo',
      type: 'Monthly',
      lastGenerated: '15 Jan 2025',
      size: '2.3 MB'
    },
    {
      title: 'SARS Compliance Report',
      description: 'EMP201, IRP5, and statutory submissions',
      type: 'Regulatory',
      lastGenerated: '10 Jan 2025',
      size: '1.8 MB'
    },
    {
      title: 'Employee Analytics',
      description: 'Attendance, performance, and cost analysis',
      type: 'Analytics',
      lastGenerated: '12 Jan 2025',
      size: '3.1 MB'
    },
    {
      title: 'Leave Management Report',
      description: 'Leave balances, trends, and approvals',
      type: 'HR',
      lastGenerated: '14 Jan 2025',
      size: '1.2 MB'
    }
  ];

  const analyticsInsights = [
    {
      metric: 'Payroll Cost Trend',
      value: '+5.2%',
      description: 'Increase from last month',
      trend: 'up',
      color: 'text-red-600'
    },
    {
      metric: 'Employee Count',
      value: '1,247',
      description: 'Active employees',
      trend: 'up',
      color: 'text-green-600'
    },
    {
      metric: 'Overtime Hours',
      value: '2,340',
      description: 'This month',
      trend: 'up',
      color: 'text-yellow-600'
    },
    {
      metric: 'Leave Utilization',
      value: '78%',
      description: 'Annual leave taken',
      trend: 'stable',
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600 text-sm">Generate comprehensive payroll reports and insights</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Crown className="w-4 h-4 mr-2" />
          Generate Master Report
        </Button>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsInsights.map((insight, index) => (
          <Card key={index} className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <TrendingUp className={`w-4 h-4 ${insight.color}`} />
                  <Badge variant="outline" className="text-xs">
                    {insight.trend}
                  </Badge>
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-900">{insight.value}</p>
                <p className="text-xs text-gray-600">{insight.metric}</p>
                <p className="text-xs text-gray-500">{insight.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Available Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{report.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {report.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Last: {report.lastGenerated}</span>
                      <span>{report.size}</span>
                    </div>
                    
                    <div className="flex gap-2 pt-2 border-t">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <Download className="w-3 h-3 mr-1" />
                        Download PDF
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            AI-Powered Predictive Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Cost Predictions</h4>
              <div className="space-y-3">
                <div className="p-3 bg-white/60 rounded-lg">
                  <h5 className="font-medium text-gray-900">Next Month Forecast</h5>
                  <p className="text-sm text-gray-600">Predicted payroll cost: R 3.35M (+4.1%)</p>
                </div>
                <div className="p-3 bg-white/60 rounded-lg">
                  <h5 className="font-medium text-gray-900">Overtime Trend</h5>
                  <p className="text-sm text-gray-600">Expected 15% increase in Q1 2025</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Fraud Detection</h4>
              <div className="space-y-3">
                <div className="p-3 bg-white/60 rounded-lg">
                  <h5 className="font-medium text-gray-900">Risk Assessment</h5>
                  <p className="text-sm text-gray-600">Low risk detected across all employees</p>
                </div>
                <div className="p-3 bg-white/60 rounded-lg">
                  <h5 className="font-medium text-gray-900">Anomaly Detection</h5>
                  <p className="text-sm text-gray-600">2 time entry patterns flagged for review</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <PieChart className="w-5 h-5 text-green-600" />
            Custom Report Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <PieChart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h4 className="font-semibold text-gray-900 mb-2">Build Custom Reports</h4>
            <p className="text-gray-600 text-sm mb-4">
              Create personalized reports with drag-and-drop components, custom filters, and branded templates.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Crown className="w-4 h-4 mr-2" />
              Launch Report Builder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsAnalytics;
