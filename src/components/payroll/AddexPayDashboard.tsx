import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  Settings,
  Upload,
  Eye,
  Edit,
  Trash2,
  Send,
  FileCheck,
  Database,
  Lock,
  Unlock,
  RefreshCw,
  Mail,
  MessageCircle,
  AlertTriangle,
  Signature,
  Archive,
  Search,
  Filter
} from 'lucide-react';

const AddexPayDashboard = () => {
  const [activeSubTab, setActiveSubTab] = useState('permanent-staff');
  const [selectedContract, setSelectedContract] = useState(null);
  const [showContractUpload, setShowContractUpload] = useState(false);
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [showComplianceModal, setShowComplianceModal] = useState(false);

  const payrollStats = {
    totalEmployees: 1247,
    permanentStaff: 892,
    fieldWorkers: 298,
    directors: 57,
    monthlyPayroll: 12450000,
    pendingApprovals: 23,
    complianceScore: 98.5,
    contractsSigned: 1168,
    contractsPending: 79,
    payslipsGenerated: 1247,
    complianceIssues: 2,
    auditTrailEntries: 15428
  };

  const contracts = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      type: 'Permanent',
      status: 'signed',
      signedDate: '2024-01-15',
      salary: 25000,
      startDate: '2024-02-01',
      department: 'IT',
      position: 'Senior Developer'
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      employeeId: 'EMP002',
      type: 'Contractor',
      status: 'pending',
      salary: 350,
      hourlyRate: true,
      startDate: '2024-01-20',
      department: 'Marketing',
      position: 'Digital Marketer'
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      employeeId: 'DIR001',
      type: 'Director',
      status: 'signed',
      signedDate: '2024-01-10',
      salary: 85000,
      startDate: '2024-01-01',
      department: 'Executive',
      position: 'Chief Technology Officer'
    }
  ];

  const complianceChecks = [
    {
      category: 'SARS Compliance',
      status: 'compliant',
      lastCheck: '2024-01-06',
      issues: 0,
      nextCheck: '2024-02-06'
    },
    {
      category: 'Labour Law (BCEA)',
      status: 'compliant',
      lastCheck: '2024-01-05',
      issues: 0,
      nextCheck: '2024-02-05'
    },
    {
      category: 'POPIA Data Protection',
      status: 'warning',
      lastCheck: '2024-01-04',
      issues: 2,
      nextCheck: '2024-01-11'
    },
    {
      category: 'UIF Contributions',
      status: 'compliant',
      lastCheck: '2024-01-06',
      issues: 0,
      nextCheck: '2024-02-06'
    }
  ];

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-01-06 14:30:25',
      user: 'HR Manager',
      action: 'Contract Signed',
      resource: 'EMP001 - John Doe Contract',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2024-01-06 13:45:12',
      user: 'Payroll Admin',
      action: 'Payslip Generated',
      resource: 'Monthly Payroll - December 2024',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2024-01-06 12:20:08',
      user: 'System',
      action: 'Compliance Check',
      resource: 'SARS Tax Tables Update',
      status: 'success'
    }
  ];

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
    },
    {
      value: 'contracts',
      label: 'Contract Management',
      icon: <FileText className="w-4 h-4" />,
      description: 'Digital contracts & signatures',
      count: payrollStats.contractsSigned,
      color: 'indigo'
    },
    {
      value: 'compliance',
      label: 'Compliance Monitor',
      icon: <Shield className="w-4 h-4" />,
      description: 'SARS & labour law compliance',
      count: complianceChecks.filter(c => c.status === 'compliant').length,
      color: 'emerald'
    },
    {
      value: 'audit',
      label: 'Audit & Security',
      icon: <Database className="w-4 h-4" />,
      description: 'Audit trails & security logs',
      count: payrollStats.auditTrailEntries,
      color: 'orange'
    }
  ];

  // Contract Management Component
  const ContractManagementContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Digital Contract Management</h3>
        <div className="flex gap-2">
          <Button onClick={() => setShowContractUpload(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Contract
          </Button>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Signed Contracts</p>
                <p className="text-2xl font-bold text-green-600">{payrollStats.contractsSigned}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Signatures</p>
                <p className="text-2xl font-bold text-orange-600">{payrollStats.contractsPending}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Auto-Generated Payroll</p>
                <p className="text-2xl font-bold text-blue-600">{payrollStats.payslipsGenerated}</p>
              </div>
              <Calculator className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Contract Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium">{contract.employeeName}</div>
                    <div className="text-sm text-muted-foreground">
                      {contract.employeeId} • {contract.position}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={contract.status === 'signed' ? 'default' : 'outline'}>
                    {contract.status === 'signed' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {contract.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  {contract.status === 'pending' && (
                    <Button size="sm">
                      <Send className="w-4 h-4 mr-1" />
                      Remind
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Compliance Monitoring Component
  const ComplianceMonitoringContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">South African Compliance Monitoring</h3>
        <div className="flex gap-2">
          <Button onClick={() => setShowComplianceModal(true)}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Run Compliance Check
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {complianceChecks.map((check, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{check.category}</div>
                  <div className="text-sm text-muted-foreground">
                    Last checked: {check.lastCheck}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {check.status === 'compliant' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  )}
                  <Badge variant={check.status === 'compliant' ? 'default' : 'destructive'}>
                    {check.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Compliance Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">{payrollStats.complianceScore}%</div>
              <div className="text-sm text-muted-foreground">Overall Compliance</div>
            </div>
            <Progress value={payrollStats.complianceScore} className="w-full" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>SARS Compliance</span>
                <span className="text-green-600">100%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Labour Law</span>
                <span className="text-green-600">100%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>POPIA Compliance</span>
                <span className="text-orange-600">95%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <div className="flex items-center justify-between">
            <span>2 POPIA compliance issues require attention</span>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );

  // Audit Trail Component
  const AuditTrailContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Audit Trail & Security Logs</h3>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Audit Entries</p>
                <p className="text-2xl font-bold">{payrollStats.auditTrailEntries.toLocaleString()}</p>
              </div>
              <Database className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Events</p>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Data Retention</p>
                <p className="text-2xl font-bold text-blue-600">5 Years</p>
              </div>
              <Archive className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="w-5 h-5" />
            Recent Audit Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Database className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{log.action}</div>
                    <div className="text-sm text-muted-foreground">
                      {log.user} • {log.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={log.status === 'success' ? 'default' : 'destructive'}>
                    {log.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

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

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-6">
          <ContractManagementContent />
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <ComplianceMonitoringContent />
        </TabsContent>

        {/* Audit Tab */}
        <TabsContent value="audit" className="space-y-6">
          <AuditTrailContent />
        </TabsContent>
      </Tabs>

      {/* Contract Upload Modal */}
      <Dialog open={showContractUpload} onOpenChange={setShowContractUpload}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Contract</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Employee</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emp1">John Doe - EMP001</SelectItem>
                  <SelectItem value="emp2">Jane Smith - EMP002</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Contract File</label>
              <Input type="file" accept=".pdf,.doc,.docx" />
            </div>
            <div>
              <label className="text-sm font-medium">Contract Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="permanent">Permanent Employment</SelectItem>
                  <SelectItem value="contractor">Contractor Agreement</SelectItem>
                  <SelectItem value="director">Director Service Agreement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                Upload & Send for Signature
              </Button>
              <Button variant="outline" onClick={() => setShowContractUpload(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payslip Generation Modal */}
      <Dialog open={showPayslipModal} onOpenChange={setShowPayslipModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Generate & Distribute Payslips</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Pay Period</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dec2024">December 2024</SelectItem>
                  <SelectItem value="nov2024">November 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Employee Group</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="permanent">Permanent Staff Only</SelectItem>
                  <SelectItem value="contractors">Contractors Only</SelectItem>
                  <SelectItem value="directors">Directors Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="auto-email" />
              <label htmlFor="auto-email" className="text-sm">Auto-email to employees</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="whatsapp" />
              <label htmlFor="whatsapp" className="text-sm">Send via WhatsApp</label>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">
                <Calculator className="w-4 h-4 mr-2" />
                Generate Payslips
              </Button>
              <Button variant="outline" onClick={() => setShowPayslipModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Compliance Check Modal */}
      <Dialog open={showComplianceModal} onOpenChange={setShowComplianceModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Run Compliance Check</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Check Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select check type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full System Check</SelectItem>
                  <SelectItem value="sars">SARS Compliance Only</SelectItem>
                  <SelectItem value="labour">Labour Law Only</SelectItem>
                  <SelectItem value="popia">POPIA Compliance Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Scope</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select scope" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="recent">Recent Changes Only</SelectItem>
                  <SelectItem value="flagged">Flagged Records Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This will run a comprehensive check against South African labour laws, SARS regulations, and POPIA requirements.
              </AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Button className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Run Check
              </Button>
              <Button variant="outline" onClick={() => setShowComplianceModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enhanced Quick Actions with Open Source Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Open Source Payroll Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setShowContractUpload(true)}
            >
              <Signature className="w-5 h-5 text-indigo-500 mb-2" />
              <div className="text-sm font-medium">Digital Contracts</div>
              <div className="text-xs text-muted-foreground">Upload & e-sign</div>
            </button>
            <button 
              className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setShowPayslipModal(true)}
            >
              <Mail className="w-5 h-5 text-blue-500 mb-2" />
              <div className="text-sm font-medium">Auto Payslips</div>
              <div className="text-xs text-muted-foreground">Email & WhatsApp</div>
            </button>
            <button 
              className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setShowComplianceModal(true)}
            >
              <Shield className="w-5 h-5 text-green-500 mb-2" />
              <div className="text-sm font-medium">Compliance Monitor</div>
              <div className="text-xs text-muted-foreground">SARS & labour law</div>
            </button>
            <button className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <Database className="w-5 h-5 text-orange-500 mb-2" />
              <div className="text-sm font-medium">Open Source</div>
              <div className="text-xs text-muted-foreground">100% transparent</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddexPayDashboard;