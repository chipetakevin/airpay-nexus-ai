
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  Users, 
  FileText, 
  Shield, 
  Calendar, 
  TrendingUp,
  Settings,
  Crown,
  MessageCircle,
  Brain,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  DollarSign,
  Building,
  UserCheck
} from 'lucide-react';
import PayrollDashboard from '@/components/payroll/PayrollDashboard';
import EmployeeManagement from '@/components/payroll/EmployeeManagement';
import StatutoryCompliance from '@/components/payroll/StatutoryCompliance';
import TimeAttendance from '@/components/payroll/TimeAttendance';
import ReportsAnalytics from '@/components/payroll/ReportsAnalytics';
import SecurityCompliance from '@/components/payroll/SecurityCompliance';

const DMPayroll = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const systemStats = [
    { label: 'Active Employees', value: '1,247', icon: <Users className="w-5 h-5" />, color: 'text-blue-600' },
    { label: 'Monthly Payroll', value: 'R 3.2M', icon: <DollarSign className="w-5 h-5" />, color: 'text-green-600' },
    { label: 'Compliance Rate', value: '99.8%', icon: <CheckCircle className="w-5 h-5" />, color: 'text-emerald-600' },
    { label: 'Processing Time', value: '< 2min', icon: <Clock className="w-5 h-5" />, color: 'text-purple-600' }
  ];

  const enhancementHighlights = [
    "Real-time calculations, automated submissions, e@syFile integration, AI compliance monitoring",
    "Biometric/digital integration, automated leave, self-service requests",
    "Mobile/web access, AI chatbot, financial wellness tools",
    "Predictive analytics, fraud detection, customizable reports",
    "POPIA compliance, encryption, automated backups, access controls",
    "API-based HR/accounting integration, cloud-native, scalable architecture",
    "Tiered pricing, continuous support, intuitive design",
    "Wellness integration, multi-company/user support, customizable workflows"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-bold">DM Payroll</h1>
                <p className="text-green-100 text-sm sm:text-base">South African Payroll Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-300" />
              <Badge className="bg-yellow-400 text-yellow-900 font-semibold">
                Enterprise Ready
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {systemStats.map((stat, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`${stat.color} bg-gray-50 p-2 rounded-lg`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhancement Highlights */}
        <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              Enhancement Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {enhancementHighlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700 leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs Section */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-gray-100 p-1">
              <TabsTrigger value="dashboard" className="text-xs sm:text-sm">
                <BarChart3 className="w-4 h-4 mr-1" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="employees" className="text-xs sm:text-sm">
                <Users className="w-4 h-4 mr-1" />
                Employees
              </TabsTrigger>
              <TabsTrigger value="compliance" className="text-xs sm:text-sm">
                <Shield className="w-4 h-4 mr-1" />
                Compliance
              </TabsTrigger>
              <TabsTrigger value="attendance" className="text-xs sm:text-sm">
                <Clock className="w-4 h-4 mr-1" />
                Time & Leave
              </TabsTrigger>
              <TabsTrigger value="reports" className="text-xs sm:text-sm">
                <FileText className="w-4 h-4 mr-1" />
                Reports
              </TabsTrigger>
              <TabsTrigger value="security" className="text-xs sm:text-sm">
                <Settings className="w-4 h-4 mr-1" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-6">
              <PayrollDashboard />
            </TabsContent>

            <TabsContent value="employees" className="mt-6">
              <EmployeeManagement />
            </TabsContent>

            <TabsContent value="compliance" className="mt-6">
              <StatutoryCompliance />
            </TabsContent>

            <TabsContent value="attendance" className="mt-6">
              <TimeAttendance />
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <ReportsAnalytics />
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <SecurityCompliance />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default DMPayroll;
