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
import { supabase } from '@/integrations/supabase/client';
import AIPayrollAutomation from './ai/AIPayrollAutomation';
import EmployeeSelfService from './self-service/EmployeeSelfService';
import RealTimePayroll from './realtime/RealTimePayroll';
import AdvancedAnalytics from './analytics/AdvancedAnalytics';
import PayrollDocumentation from './documentation/PayrollDocumentation';
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
  Filter,
  Brain,
  User,
  Zap,
  BarChart3,
  BookOpen
} from 'lucide-react';

const AddexPayDashboard = () => {
  const [activeSubTab, setActiveSubTab] = useState('permanent-staff');
  const [selectedContract, setSelectedContract] = useState(null);
  const [showContractUpload, setShowContractUpload] = useState(false);
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [showComplianceModal, setShowComplianceModal] = useState(false);
  const [showBankingModal, setShowBankingModal] = useState(false);
  const [showSARSPaymentModal, setShowSARSPaymentModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showAddContractorModal, setShowAddContractorModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importData, setImportData] = useState([]);
  const [importErrors, setImportErrors] = useState([]);
  const [showImportPreview, setShowImportPreview] = useState(false);

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
      employeeName: 'John Mthembu',
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
      resource: 'EMP001 - John Mthembu Contract',
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

  // Banking details data
  const bankingDetails = [
    {
      id: 1,
      employeeName: 'John Mthembu',
      employeeId: 'EMP001',
      bankName: 'Standard Bank',
      accountNumber: '****-****-1234',
      branchCode: '051001',
      accountType: 'Cheque',
      status: 'verified',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      employeeId: 'EMP002',
      bankName: 'FNB',
      accountNumber: '****-****-5678',
      branchCode: '250655',
      accountType: 'Savings',
      status: 'pending',
      lastUpdated: '2024-01-10'
    }
  ];

  // SARS payment data
  const sarsPayments = {
    currentMonth: {
      paye: 485000,
      uif: 24500,
      sdl: 18750,
      total: 528250,
      dueDate: '2024-02-07',
      status: 'pending',
      prn: 'PRN123456789012345678'
    },
    lastMonth: {
      paye: 465000,
      uif: 23500,
      sdl: 18000,
      total: 506500,
      status: 'paid',
      paidDate: '2024-01-05'
    }
  };

  // Monthly reports data
  const monthlyReports = [
    {
      id: 1,
      name: 'Payroll Summary Report',
      type: 'payroll_summary',
      month: 'January 2024',
      generated: '2024-01-31',
      status: 'available',
      accessLevel: 'directors'
    },
    {
      id: 2,
      name: 'Directors Remuneration Report',
      type: 'directors_remuneration',
      month: 'January 2024',
      generated: '2024-01-31',
      status: 'available',
      accessLevel: 'directors'
    },
    {
      id: 3,
      name: 'SARS Tax Liability Report',
      type: 'sars_liability',
      month: 'January 2024',
      generated: '2024-01-31',
      status: 'available',
      accessLevel: 'directors'
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
      value: 'banking',
      label: 'Banking & SARS',
      icon: <Building2 className="w-4 h-4" />,
      description: 'Banking details & SARS payments',
      count: bankingDetails.length,
      color: 'cyan'
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
      value: 'reports',
      label: 'Director Reports',
      icon: <FileCheck className="w-4 h-4" />,
      description: 'Monthly payroll reports',
      count: monthlyReports.length,
      color: 'rose'
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
    },
    {
      value: 'ai-automation',
      label: 'AI Automation',
      icon: <Brain className="w-4 h-4" />,
      description: 'AI-powered payroll automation',
      count: 15,
      color: 'violet'
    },
    {
      value: 'self-service',
      label: 'Self Service',
      icon: <User className="w-4 h-4" />,
      description: 'Employee self-service portal',
      count: payrollStats.totalEmployees,
      color: 'teal'
    },
    {
      value: 'real-time',
      label: 'Real-Time Pay',
      icon: <Zap className="w-4 h-4" />,
      description: 'Real-time payroll processing',
      count: 3,
      color: 'amber'
    },
    {
      value: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-4 h-4" />,
      description: 'Advanced analytics & reporting',
      count: 12,
      color: 'red'
    },
    {
      value: 'documentation',
      label: 'Documentation',
      icon: <BookOpen className="w-4 h-4" />,
      description: 'System documentation',
      count: 1,
      color: 'slate'
    }
  ];

  // Enhanced Contractor Management with Import/Export functionality
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportFile(file);
    
    // For large files, we'll process them on the server
    // For now, show a preview of the first few rows for user confirmation
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        if (!text) return;
        
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          setImportErrors(['File must contain at least header and one data row']);
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const expectedHeaders = ['Name', 'Employee ID', 'Position', 'Department', 'Status'];
        
        // Validate headers
        const missingHeaders = expectedHeaders.filter(h => !headers.includes(h));
        if (missingHeaders.length > 0) {
          setImportErrors([`Missing required columns: ${missingHeaders.join(', ')}`]);
          return;
        }

        // Preview first 10 rows only (actual processing will be done on server)
        const previewData = lines.slice(1, 11).map((line, index) => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          const row: any = {};
          headers.forEach((header, i) => {
            row[header] = values[i] || '';
          });
          row.rowIndex = index + 2;
          return row;
        });

        setImportErrors([]);
        setImportData(previewData);
        setShowImportPreview(true);
      } catch (error) {
        setImportErrors(['Error parsing file. Please ensure it is a valid CSV file.']);
      }
    };
    
    reader.readAsText(file);
  };

  const processImport = async () => {
    if (!importFile) {
      setImportErrors(['No file selected']);
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('file', importFile);

      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setImportErrors(['Please log in to import data']);
        return;
      }

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('import-contractors', {
        body: formData,
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Import error:', error);
        setImportErrors([error.message || 'Import failed']);
        return;
      }

      if (data.success) {
        // Reset import state
        setImportFile(null);
        setImportData([]);
        setImportErrors([]);
        setShowImportPreview(false);
        setShowImportModal(false);
        
        // Show success message
        alert(`Successfully imported ${data.successfulImports} out of ${data.totalRows} contractors`);
      } else {
        setImportErrors(data.validationErrors || data.error ? [data.error] : ['Import failed']);
      }
    } catch (error) {
      console.error('Import processing error:', error);
      setImportErrors(['Failed to process import. Please try again.']);
    }
  };

  const handleExport = (format = 'csv') => {
    const contractors = [
      { name: 'John Mthembu', employeeId: 'EMP001', position: 'Senior Developer', department: 'IT', status: 'Active' },
      { name: 'Jane Smith', employeeId: 'EMP002', position: 'Digital Marketer', department: 'Marketing', status: 'Active' },
      { name: 'Mike Johnson', employeeId: 'EMP003', position: 'Project Manager', department: 'Operations', status: 'Active' }
    ];

    if (format === 'csv') {
      const headers = 'Name,Employee ID,Position,Department,Status\n';
      const csvContent = contractors.map(c => 
        `"${c.name}","${c.employeeId}","${c.position}","${c.department}","${c.status}"`
      ).join('\n');
      
      const blob = new Blob([headers + csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contractors_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const jsonContent = JSON.stringify(contractors, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contractors_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
    
    setShowExportModal(false);
  };

  const downloadTemplate = () => {
    const template = 'Name,Employee ID,Position,Department,Status\n"John Mthembu","EMP001","Senior Developer","IT","Active"\n"Jane Pretorius","EMP002","Digital Marketer","Marketing","Active"';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contractor_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Enhanced Contractor Management Component
  const EnhancedContractorManagementContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Contractor Management</h3>
        <div className="flex gap-2">
          <Button onClick={() => setShowAddContractorModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Users className="w-4 h-4 mr-2" />
            Add New
          </Button>
          <Button variant="outline" onClick={() => setShowImportModal(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={() => setShowExportModal(true)}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <div className="font-medium">Employee {i}</div>
                <div className="text-sm text-muted-foreground">ID: EMP00{i}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Active
              </Badge>
              <Button size="sm" variant="outline">
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
              <Button size="sm" variant="outline">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">SARS Compliance</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Labour Law</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">POPIA Compliance</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
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

  // Banking & SARS Management Component
  const BankingSARSContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Banking Details & SARS Payment Management</h3>
        <div className="flex gap-2">
          <Button onClick={() => setShowBankingModal(true)}>
            <Building2 className="w-4 h-4 mr-2" />
            Manage Banking
          </Button>
          <Button onClick={() => setShowSARSPaymentModal(true)}>
            <DollarSign className="w-4 h-4 mr-2" />
            SARS Payment
          </Button>
        </div>
      </div>

      {/* SARS Payment Alert */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <div className="flex items-center justify-between">
            <span>SARS payment of R{sarsPayments.currentMonth.total.toLocaleString()} due by {sarsPayments.currentMonth.dueDate}</span>
            <Button size="sm" onClick={() => setShowSARSPaymentModal(true)}>
              Process Payment
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banking Details Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Employee Banking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-800">{bankingDetails.filter(b => b.status === 'verified').length}</div>
                <div className="text-sm text-green-600">Verified</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-800">{bankingDetails.filter(b => b.status === 'pending').length}</div>
                <div className="text-sm text-orange-600">Pending</div>
              </div>
            </div>
            <div className="space-y-2">
              {bankingDetails.map((bank) => (
                <div key={bank.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{bank.employeeName}</div>
                    <div className="text-sm text-muted-foreground">
                      {bank.bankName} • {bank.accountNumber}
                    </div>
                  </div>
                  <Badge variant={bank.status === 'verified' ? 'default' : 'outline'}>
                    {bank.status === 'verified' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {bank.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SARS Payment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              SARS Payment Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border-l-4 border-l-orange-500 bg-orange-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Current Month - January 2024</h4>
                <Badge variant="outline" className="bg-orange-100">Pending</Badge>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>PAYE:</span>
                  <span>R{sarsPayments.currentMonth.paye.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>UIF:</span>
                  <span>R{sarsPayments.currentMonth.uif.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>SDL:</span>
                  <span>R{sarsPayments.currentMonth.sdl.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total Due:</span>
                  <span>R{sarsPayments.currentMonth.total.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                PRN: {sarsPayments.currentMonth.prn}
              </div>
            </div>

            <div className="p-4 border-l-4 border-l-green-500 bg-green-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Last Month - December 2024</h4>
                <Badge className="bg-green-100 text-green-800">Paid</Badge>
              </div>
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>Total Paid:</span>
                  <span>R{sarsPayments.lastMonth.total.toLocaleString()}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Paid on: {sarsPayments.lastMonth.paidDate}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Multi-Factor Authentication Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security & Authentication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium">Multi-Factor Auth</div>
                <div className="text-sm text-muted-foreground">Active for all users</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium">Data Encryption</div>
                <div className="text-sm text-muted-foreground">AES-256 encryption</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium">POPIA Compliant</div>
                <div className="text-sm text-muted-foreground">Data protection active</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Director Reports Component
  const DirectorReportsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Monthly Payroll Reports - Director Access Only</h3>
        <div className="flex gap-2">
          <Button onClick={() => setShowReportsModal(true)}>
            <FileCheck className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Access Control Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Lock className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <div className="flex items-center justify-between">
            <span>These reports are restricted to Directors and authorized administrators only</span>
            <Badge className="bg-blue-100 text-blue-800">
              <Shield className="w-3 h-3 mr-1" />
              Secure Access
            </Badge>
          </div>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Reports</p>
                <p className="text-2xl font-bold">{monthlyReports.length}</p>
              </div>
              <FileCheck className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Generated</p>
                <p className="text-2xl font-bold">Jan 31</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Retention Period</p>
                <p className="text-2xl font-bold">5 Years</p>
              </div>
              <Archive className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="w-5 h-5" />
            Monthly Report Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{report.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {report.month} • Generated: {report.generated}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {report.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Types Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Available Report Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Calculator className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-medium">Payroll Summary</div>
                  <div className="text-sm text-muted-foreground">Gross/net pay, deductions, totals</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Crown className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="font-medium">Directors Remuneration</div>
                  <div className="text-sm text-muted-foreground">Executive compensation details</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Building2 className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-medium">SARS Tax Liability</div>
                  <div className="text-sm text-muted-foreground">PAYE, UIF, SDL calculations</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Calendar className="w-5 h-5 text-orange-500" />
                <div>
                  <div className="font-medium">Leave & Absence</div>
                  <div className="text-sm text-muted-foreground">Leave balances and usage</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Database className="w-5 h-5 text-cyan-500" />
                <div>
                  <div className="font-medium">Audit & Change Log</div>
                  <div className="text-sm text-muted-foreground">All payroll data changes</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <DollarSign className="w-5 h-5 text-indigo-500" />
                <div>
                  <div className="font-medium">Banking & Payments</div>
                  <div className="text-sm text-muted-foreground">Payment details and status</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
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
              <EnhancedContractorManagementContent />
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

        {/* Banking & SARS Tab */}
        <TabsContent value="banking" className="space-y-6">
          <BankingSARSContent />
        </TabsContent>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-6">
          <ContractManagementContent />
        </TabsContent>

        {/* Director Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <DirectorReportsContent />
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <ComplianceMonitoringContent />
        </TabsContent>

        {/* Audit Tab */}
        <TabsContent value="audit" className="space-y-6">
          <AuditTrailContent />
        </TabsContent>

        {/* AI Automation Tab */}
        <TabsContent value="ai-automation" className="space-y-6">
          <AIPayrollAutomation />
        </TabsContent>

        {/* Self Service Tab */}
        <TabsContent value="self-service" className="space-y-6">
          <EmployeeSelfService />
        </TabsContent>

        {/* Real-Time Pay Tab */}
        <TabsContent value="real-time" className="space-y-6">
          <RealTimePayroll />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <AdvancedAnalytics />
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent value="documentation" className="space-y-6">
          <PayrollDocumentation />
        </TabsContent>
      </Tabs>

      {/* Add New Contractor Modal */}
      <Dialog open={showAddContractorModal} onOpenChange={setShowAddContractorModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Contractor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="Enter full name" />
              </div>
              <div>
                <label className="text-sm font-medium">Employee ID</label>
                <Input placeholder="Enter employee ID" />
              </div>
              <div>
                <label className="text-sm font-medium">Position</label>
                <Input placeholder="Enter position" />
              </div>
              <div>
                <label className="text-sm font-medium">Department</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <Input placeholder="Enter phone number" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea placeholder="Additional notes..." rows={3} />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">
                <Users className="w-4 h-4 mr-2" />
                Add Contractor
              </Button>
              <Button variant="outline" onClick={() => setShowAddContractorModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import Modal */}
      <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Import Contractors</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {!showImportPreview ? (
              <>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Upload a CSV file with contractor data. The file should include columns: Name, Employee ID, Position, Department, Status.
                  </AlertDescription>
                </Alert>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Drop your CSV file here</p>
                    <p className="text-sm text-gray-500">or click to browse</p>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Button asChild>
                        <span>Choose File</span>
                      </Button>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={downloadTemplate}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                  <Button variant="outline" onClick={() => setShowImportModal(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Import Preview (First 10 rows)</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={importErrors.length > 0 ? 'destructive' : 'default'}>
                        Preview: {importData.length} rows shown
                      </Badge>
                      <Badge variant="outline">
                        Full file will be processed on server
                      </Badge>
                    </div>
                  </div>
                  
                  {importErrors.length > 0 && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-1">
                          <p className="font-medium">Please fix the following errors:</p>
                          <ul className="list-disc list-inside text-sm">
                            {importErrors.slice(0, 5).map((error, i) => (
                              <li key={i}>{error}</li>
                            ))}
                            {importErrors.length > 5 && (
                              <li>...and {importErrors.length - 5} more errors</li>
                            )}
                          </ul>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="max-h-64 overflow-auto border rounded">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="p-2 text-left">Name</th>
                          <th className="p-2 text-left">Employee ID</th>
                          <th className="p-2 text-left">Position</th>
                          <th className="p-2 text-left">Department</th>
                          <th className="p-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {importData.slice(0, 10).map((row, i) => (
                          <tr key={i} className="border-t">
                            <td className="p-2">{row.Name}</td>
                            <td className="p-2">{row['Employee ID']}</td>
                            <td className="p-2">{row.Position}</td>
                            <td className="p-2">{row.Department}</td>
                            <td className="p-2">{row.Status}</td>
                          </tr>
                        ))}
                        {importData.length > 10 && (
                          <tr>
                            <td colSpan={5} className="p-2 text-center text-gray-500">
                              ...and {importData.length - 10} more rows
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={processImport} 
                    disabled={importErrors.length > 0}
                    className="flex-1"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Process Import ({importData.length}+ contractors)
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setShowImportPreview(false);
                    setImportData([]);
                    setImportErrors([]);
                  }}>
                    Back
                  </Button>
                  <Button variant="outline" onClick={() => setShowImportModal(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Modal */}
      <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Export Contractors</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Export Format</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => handleExport('csv')} className="flex-col h-auto p-4">
                  <FileText className="w-6 h-6 mb-2" />
                  <span>CSV File</span>
                  <span className="text-xs text-gray-500">Spreadsheet compatible</span>
                </Button>
                <Button variant="outline" onClick={() => handleExport('json')} className="flex-col h-auto p-4">
                  <Database className="w-6 h-6 mb-2" />
                  <span>JSON File</span>
                  <span className="text-xs text-gray-500">Developer friendly</span>
                </Button>
              </div>
            </div>
            
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Export will include all contractor records with their current status and details.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowExportModal(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
                  <SelectItem value="emp1">John Mthembu - EMP001</SelectItem>
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

      {/* Banking Details Modal */}
      <Dialog open={showBankingModal} onOpenChange={setShowBankingModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Banking Details Management</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert className="border-blue-200 bg-blue-50">
              <Lock className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                All banking details are encrypted and protected with multi-factor authentication
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Employee</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emp1">John Mthembu - EMP001</SelectItem>
                    <SelectItem value="emp2">Jane Smith - EMP002</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Bank Name</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Bank</SelectItem>
                    <SelectItem value="fnb">FNB</SelectItem>
                    <SelectItem value="absa">ABSA</SelectItem>
                    <SelectItem value="nedbank">Nedbank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Account Number</label>
                <Input placeholder="Enter account number" type="password" />
              </div>
              <div>
                <label className="text-sm font-medium">Branch Code</label>
                <Input placeholder="Enter branch code" />
              </div>
              <div>
                <label className="text-sm font-medium">Account Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cheque">Cheque Account</SelectItem>
                    <SelectItem value="savings">Savings Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Account Holder</label>
                <Input placeholder="Enter account holder name" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">
                <CheckCircle className="w-4 h-4 mr-2" />
                Validate & Save
              </Button>
              <Button variant="outline" onClick={() => setShowBankingModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* SARS Payment Modal */}
      <Dialog open={showSARSPaymentModal} onOpenChange={setShowSARSPaymentModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>SARS Payment Processing</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                Payment due by {sarsPayments.currentMonth.dueDate}. Ensure approval before processing.
              </AlertDescription>
            </Alert>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>PAYE Tax:</span>
                  <span className="font-medium">R{sarsPayments.currentMonth.paye.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>UIF Contributions:</span>
                  <span className="font-medium">R{sarsPayments.currentMonth.uif.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>SDL Levy:</span>
                  <span className="font-medium">R{sarsPayments.currentMonth.sdl.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 border-t font-bold text-lg">
                  <span>Total Amount:</span>
                  <span>R{sarsPayments.currentMonth.total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">SARS Beneficiary</label>
                <div className="p-3 bg-gray-50 rounded border font-mono text-sm">
                  SARS-PAYE (Pre-configured beneficiary)
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Payment Reference Number (PRN)</label>
                <div className="p-3 bg-gray-50 rounded border font-mono text-sm">
                  {sarsPayments.currentMonth.prn}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Payment Method</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="efiling">eFiling Credit Push</SelectItem>
                    <SelectItem value="eft">Direct EFT</SelectItem>
                    <SelectItem value="branch">Bank Branch Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                This payment requires director/admin approval before processing. All actions are logged for audit compliance.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button className="flex-1">
                <DollarSign className="w-4 h-4 mr-2" />
                Request Approval
              </Button>
              <Button variant="outline" onClick={() => setShowSARSPaymentModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reports Generation Modal */}
      <Dialog open={showReportsModal} onOpenChange={setShowReportsModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Generate Monthly Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert className="border-blue-200 bg-blue-50">
              <Lock className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Director-level access required. Reports are automatically encrypted and stored securely.
              </AlertDescription>
            </Alert>
            <div>
              <label className="text-sm font-medium">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="payroll_summary">Payroll Summary Report</SelectItem>
                  <SelectItem value="directors_remuneration">Directors Remuneration Report</SelectItem>
                  <SelectItem value="sars_liability">SARS Tax Liability Report</SelectItem>
                  <SelectItem value="leave_absence">Leave & Absence Report</SelectItem>
                  <SelectItem value="audit_log">Audit & Change Log Report</SelectItem>
                  <SelectItem value="banking_payments">Banking & Payment Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Period</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan2024">January 2024</SelectItem>
                  <SelectItem value="dec2024">December 2024</SelectItem>
                  <SelectItem value="nov2024">November 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="encrypt-report" defaultChecked />
              <label htmlFor="encrypt-report" className="text-sm">Encrypt report with password</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="email-directors" />
              <label htmlFor="email-directors" className="text-sm">Email to all directors</label>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">
                <FileCheck className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" onClick={() => setShowReportsModal(false)}>
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