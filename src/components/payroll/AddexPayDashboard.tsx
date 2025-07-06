import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  UserCheck, 
  Crown, 
  Calculator,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Building2,
  Shield,
  Calendar,
  Download,
  Settings
} from 'lucide-react';

const AddexPayDashboard = () => {
  const [activeSubTab, setActiveSubTab] = useState('permanent-staff');

  const payrollStats = {
    totalEmployees: 1247,
    permanentStaff: 892,
    fieldWorkers: 298,
    directors: 57,
    monthlyPayroll: 12450000,
    pendingApprovals: 23,
    complianceScore: 98.5
  };

  const subTabs = [
    {
      value: 'permanent-staff',
      label: 'Permanent Staff',
      icon: <Users className="w-4 h-4" />,
      description: 'Full-time employee payroll & benefits',
      count: payrollStats.permanentStaff,
      color: 'blue'
    },
    {
      value: 'field-workers',
      label: 'Field Workers',
      icon: <UserCheck className="w-4 h-4" />,
      description: 'Contractor payments & agreements',
      count: payrollStats.fieldWorkers,
      color: 'green'
    },
    {
      value: 'directors',
      label: 'Directors',
      icon: <Crown className="w-4 h-4" />,
      description: 'Executive compensation & governance',
      count: payrollStats.directors,
      color: 'purple'
    }
  ];

  // Simplified Payroll Dashboard Component
  const PayrollDashboardContent = ({ userType }: { userType: string }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          {userType === 'permanent' && 'Permanent Staff Payroll'}
          {userType === 'contractor' && 'Field Workers Payment'}
          {userType === 'director' && 'Director Compensation'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-800">
              {userType === 'permanent' && payrollStats.permanentStaff}
              {userType === 'contractor' && payrollStats.fieldWorkers}
              {userType === 'director' && payrollStats.directors}
            </div>
            <div className="text-sm text-blue-600">Active {userType === 'permanent' ? 'Employees' : userType === 'contractor' ? 'Contractors' : 'Directors'}</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-800">R{(payrollStats.monthlyPayroll / 1000000).toFixed(1)}M</div>
            <div className="text-sm text-green-600">Monthly Total</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Payroll Processing</span>
            <span>85%</span>
          </div>
          <Progress value={85} className="w-full" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Process Pay
          </Button>
          <Button size="sm" variant="outline" className="w-full">
            <FileText className="w-4 h-4 mr-2" />
            Generate Reports
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Simplified Employee Management Component
  const EmployeeManagementContent = ({ userType }: { userType: string }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          {userType === 'permanent' && 'Employee Management'}
          {userType === 'contractor' && 'Contractor Management'}
          {userType === 'director' && 'Director Management'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button size="sm">
            <Users className="w-4 h-4 mr-2" />
            Add New
          </Button>
          <Button size="sm" variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium">Employee {i}</div>
                  <div className="text-sm text-muted-foreground">ID: EMP00{i}</div>
                </div>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // Simplified Compliance Component
  const ComplianceContent = ({ userType }: { userType: string }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Compliance Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">SARS Compliance</span>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Labour Law</span>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">POPIA Compliance</span>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
        </div>
        
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            All compliance requirements are up to date.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Addex Pay</h2>
            <p className="text-muted-foreground">Comprehensive Payroll Management System</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            SARS Compliant
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            <Shield className="w-4 h-4 mr-1" />
            SA Labour Law
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{payrollStats.totalEmployees.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Payroll</p>
                <p className="text-2xl font-bold">R{(payrollStats.monthlyPayroll / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
                <p className="text-2xl font-bold">{payrollStats.pendingApprovals}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compliance Score</p>
                <p className="text-2xl font-bold">{payrollStats.complianceScore}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              System fully compliant with South African labour laws, SARS regulations, and POPIA requirements
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <Building2 className="w-3 h-3 mr-1" />
                SARS Registered
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <FileText className="w-3 h-3 mr-1" />
                BCEA Compliant
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Main Payroll Tabs */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-2">
          {subTabs.map((tab) => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value}
              className="flex flex-col items-center p-4 h-auto"
            >
              <div className="flex items-center gap-2 mb-1">
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                <div>{tab.description}</div>
                <Badge variant="outline" className="mt-1">
                  {tab.count} Active
                </Badge>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Permanent Staff Tab */}
        <TabsContent value="permanent-staff" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PayrollDashboardContent userType="permanent" />
              <EmployeeManagementContent userType="permanent" />
            </div>
            <div className="space-y-6">
              <ComplianceContent userType="permanent" />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Time & Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Present Today</span>
                      <span>892/892</span>
                    </div>
                    <Progress value={100} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Field Workers Tab */}
        <TabsContent value="field-workers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PayrollDashboardContent userType="contractor" />
              <EmployeeManagementContent userType="contractor" />
            </div>
            <div className="space-y-6">
              <ComplianceContent userType="contractor" />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Contract Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Contracts</span>
                      <span>298</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Expiring Soon</span>
                      <span className="text-orange-600">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Directors Tab */}
        <TabsContent value="directors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PayrollDashboardContent userType="director" />
              <EmployeeManagementContent userType="director" />
            </div>
            <div className="space-y-6">
              <ComplianceContent userType="director" />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security & Governance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Board Approval</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Audit Ready</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions Footer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <Calculator className="w-5 h-5 text-blue-500 mb-2" />
              <div className="text-sm font-medium">Run Payroll</div>
              <div className="text-xs text-muted-foreground">Process monthly pay</div>
            </button>
            <button className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-5 h-5 text-green-500 mb-2" />
              <div className="text-sm font-medium">Generate Reports</div>
              <div className="text-xs text-muted-foreground">SARS & compliance</div>
            </button>
            <button className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <Clock className="w-5 h-5 text-orange-500 mb-2" />
              <div className="text-sm font-medium">Timesheet Review</div>
              <div className="text-xs text-muted-foreground">Approve hours</div>
            </button>
            <button className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <TrendingUp className="w-5 h-5 text-purple-500 mb-2" />
              <div className="text-sm font-medium">Analytics</div>
              <div className="text-xs text-muted-foreground">Payroll insights</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddexPayDashboard;