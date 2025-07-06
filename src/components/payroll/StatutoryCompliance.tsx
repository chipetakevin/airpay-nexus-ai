
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Upload,
  Calendar,
  Calculator,
  TrendingUp,
  Activity,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ComplianceRecord {
  id: string;
  compliance_type: string;
  compliance_status: 'compliant' | 'non_compliant' | 'pending' | 'exception';
  check_date: string;
  details: any;
  exceptions?: string;
}

interface ComplianceStats {
  totalPAYE: number;
  totalUIF: number;
  totalSDL: number;
  employeeCount: number;
}

const StatutoryCompliance = () => {
  const [complianceRecords, setComplianceRecords] = useState<ComplianceRecord[]>([]);
  const [complianceStats, setComplianceStats] = useState<ComplianceStats>({
    totalPAYE: 0,
    totalUIF: 0,
    totalSDL: 0,
    employeeCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadComplianceData();
  }, []);

  const loadComplianceData = async () => {
    try {
      // Fetch compliance records
      const { data: compliance, error: complianceError } = await supabase
        .from('compliance_records')
        .select('*')
        .order('check_date', { ascending: false });

      if (complianceError) throw complianceError;
      setComplianceRecords(compliance || []);

      // Calculate sample compliance stats
      const mockStats = {
        totalPAYE: 125000.00,
        totalUIF: 8500.50,
        totalSDL: 5200.00,
        employeeCount: 247
      };
      setComplianceStats(mockStats);

    } catch (error) {
      console.error('Error loading compliance data:', error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load compliance information.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runComplianceCheck = async (complianceType: string) => {
    try {
      const { data, error } = await supabase.rpc('run_compliance_check', {
        p_payroll_run_id: '00000000-0000-0000-0000-000000000000', // Mock ID
        p_compliance_type: complianceType
      });

      if (error) throw error;

      toast({
        title: "Compliance Check Complete",
        description: `${complianceType} compliance check completed successfully.`,
      });

      await loadComplianceData();
    } catch (error) {
      console.error('Error running compliance check:', error);
      toast({
        title: "Compliance Check Failed",
        description: `Failed to run ${complianceType} compliance check.`,
        variant: "destructive"
      });
    }
  };

  const complianceItems = [
    {
      title: 'PAYE Calculations',
      status: 'Current',
      description: 'Automated PAYE calculations with 2025 tax tables',
      amount: complianceStats.totalPAYE,
      dueDate: 'Ongoing',
      action: 'View Report',
      type: 'PAYE'
    },
    {
      title: 'UIF Contributions',
      status: 'Current',
      description: 'Unemployment Insurance Fund contributions (2% split)',
      amount: complianceStats.totalUIF,
      dueDate: 'Monthly',
      action: 'Download',
      type: 'UIF'
    },
    {
      title: 'SDL Payments',
      status: 'Current',
      description: 'Skills Development Levy (1% of payroll)',
      amount: complianceStats.totalSDL,
      dueDate: 'Monthly',
      action: 'View Details',
      type: 'SDL'
    },
    {
      title: 'EMP201 Filing',
      status: 'Due Soon',
      description: 'Monthly employer reconciliation due to SARS',
      dueDate: '7th of next month',
      action: 'File Now',
      type: 'EMP201'
    },
    {
      title: 'EMP501 Filing',
      status: 'Current',
      description: 'Bi-annual employer reconciliation',
      dueDate: 'Sept 30 / March 31',
      action: 'Prepare',
      type: 'EMP501'
    },
    {
      title: 'IRP5 Certificates',
      status: 'Current',
      description: 'Employee tax certificates for tax year',
      dueDate: 'March 31',
      action: 'Generate',
      type: 'IRP5'
    }
  ];

  const taxTables = [
    { table: 'PAYE Tax Tables', version: '2024/25', lastUpdated: '1 March 2024', status: 'Current' },
    { table: 'UIF Rates', version: '2024', lastUpdated: '1 April 2024', status: 'Current' },
    { table: 'SDL Rates', version: '2024', lastUpdated: '1 April 2024', status: 'Current' },
    { table: 'ETI Rates', version: '2024', lastUpdated: '1 March 2024', status: 'Current' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current':
        return 'bg-green-100 text-green-800';
      case 'Due Soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Current':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Due Soon':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'Overdue':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Statutory Compliance</h2>
          <p className="text-gray-600 text-sm">SARS compliance and statutory requirements</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-gray-500">Active Employees</p>
            <p className="text-lg font-bold text-gray-900">{complianceStats.employeeCount}</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => runComplianceCheck('ALL')}
          >
            <Upload className="w-4 h-4 mr-2" />
            File All Due
          </Button>
        </div>
      </div>

      {/* Compliance Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly PAYE</p>
                <p className="text-2xl font-bold text-green-700">R{complianceStats.totalPAYE.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-gray-500 mt-1">85% of expected monthly PAYE</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly UIF</p>
                <p className="text-2xl font-bold text-blue-700">R{complianceStats.totalUIF.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <Progress value={92} className="mt-2" />
            <p className="text-xs text-gray-500 mt-1">92% compliance rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly SDL</p>
                <p className="text-2xl font-bold text-purple-700">R{complianceStats.totalSDL.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <Progress value={100} className="mt-2" />
            <p className="text-xs text-gray-500 mt-1">Fully compliant</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complianceItems.map((item, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600">{item.description}</p>
                
                {item.amount && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Current Amount</p>
                    <p className="text-lg font-bold text-gray-900">R{item.amount.toLocaleString()}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    Due: {item.dueDate}
                  </div>
                  <div className="flex gap-2">
                    {item.type && ['PAYE', 'UIF', 'SDL'].includes(item.type) && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => runComplianceCheck(item.type)}
                      >
                        <Calculator className="w-3 h-3 mr-1" />
                        Calculate
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      {item.action}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Compliance Checks */}
      {complianceRecords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Recent Compliance Checks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {complianceRecords.slice(0, 5).map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      record.compliance_status === 'compliant' ? 'bg-green-500' :
                      record.compliance_status === 'non_compliant' ? 'bg-red-500' :
                      record.compliance_status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{record.compliance_type}</p>
                      <p className="text-xs text-gray-500">{new Date(record.check_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Badge className={`${
                    record.compliance_status === 'compliant' ? 'bg-green-100 text-green-800' :
                    record.compliance_status === 'non_compliant' ? 'bg-red-100 text-red-800' :
                    record.compliance_status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {record.compliance_status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tax Tables Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-600" />
            Tax Tables & Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taxTables.map((table, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">{table.table}</h4>
                  <p className="text-sm text-gray-600">Version {table.version} • Updated {table.lastUpdated}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-800">
                    {table.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* e@syFile Integration */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            SARS e@syFile Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Automated Filing Features</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Direct EMP201 submission</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Automated IRP5 generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Real-time validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Submission confirmations</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Next Filing Dates</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
                  <span className="text-sm font-medium">EMP201 - January 2025</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Due 7 Feb</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
                  <span className="text-sm font-medium">IRP5 Certificates</span>
                  <Badge className="bg-green-100 text-green-800">Ready</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatutoryCompliance;
