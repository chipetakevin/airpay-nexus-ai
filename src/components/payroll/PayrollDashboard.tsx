
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  PieChart,
  BarChart3
} from 'lucide-react';

const PayrollDashboard = () => {
  const payrollSummary = [
    { title: 'Current Month', amount: 'R 3,247,850', status: 'In Progress', color: 'bg-blue-500' },
    { title: 'Previous Month', amount: 'R 3,198,420', status: 'Completed', color: 'bg-green-500' },
    { title: 'YTD Total', amount: 'R 38,974,200', status: 'Tracking', color: 'bg-purple-500' },
    { title: 'Tax Withheld', amount: 'R 8,745,320', status: 'SARS Filed', color: 'bg-orange-500' }
  ];

  const recentActivities = [
    { action: 'Payroll Run Completed', time: '2 hours ago', status: 'success' },
    { action: 'EMP201 Filed to SARS', time: '1 day ago', status: 'success' },
    { action: 'New Employee Added', time: '2 days ago', status: 'info' },
    { action: 'Leave Request Approved', time: '3 days ago', status: 'info' },
    { action: 'Overtime Calculated', time: '4 days ago', status: 'warning' }
  ];

  const complianceChecks = [
    { item: 'PAYE Calculations', status: 'Compliant', icon: <CheckCircle className="w-4 h-4" /> },
    { item: 'UIF Contributions', status: 'Compliant', icon: <CheckCircle className="w-4 h-4" /> },
    { item: 'SDL Calculations', status: 'Compliant', icon: <CheckCircle className="w-4 h-4" /> },
    { item: 'SARS Submissions', status: 'Due Soon', icon: <AlertTriangle className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Mobile-First Payroll Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {payrollSummary.map((item, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-600">{item.title}</h3>
                  <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{item.amount}</p>
                <Badge variant="outline" className="text-xs">
                  {item.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button className="h-20 flex flex-col gap-2 bg-green-600 hover:bg-green-700">
              <DollarSign className="w-6 h-6" />
              <span className="text-xs">Run Payroll</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <FileText className="w-6 h-6" />
              <span className="text-xs">Generate Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="w-6 h-6" />
              <span className="text-xs">Add Employee</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-xs">Manage Leave</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge 
                    variant={activity.status === 'success' ? 'default' : 'secondary'}
                    className={activity.status === 'success' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {complianceChecks.map((check, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`${check.status === 'Compliant' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {check.icon}
                    </div>
                    <span className="text-sm font-medium">{check.item}</span>
                  </div>
                  <Badge 
                    className={check.status === 'Compliant' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                  >
                    {check.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/60 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Cost Optimization</h4>
              <p className="text-sm text-gray-600">
                Overtime costs increased 12% this month. Consider adjusting schedules to reduce overtime by R 45,000.
              </p>
            </div>
            <div className="p-4 bg-white/60 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Compliance Alert</h4>
              <p className="text-sm text-gray-600">
                EMP201 submission due in 3 days. All calculations are ready for automated filing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollDashboard;
