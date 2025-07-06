import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileCheck, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Download,
  Upload,
  Eye,
  Users,
  Building,
  Phone
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  category: string;
  requirement: string;
  status: 'compliant' | 'partial' | 'non-compliant' | 'pending';
  lastAudit: string;
  nextDue: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  documents: string[];
}

const RegulatoryComplianceCenter = () => {
  const [overallScore, setOverallScore] = useState(94);
  const [pendingActions, setPendingActions] = useState(8);

  const complianceItems: ComplianceItem[] = [
    {
      id: 'ICASA001',
      category: 'ICASA License',
      requirement: 'Individual Electronic Communications Network Service License',
      status: 'compliant',
      lastAudit: '2024-11-15',
      nextDue: '2025-11-15',
      priority: 'critical',
      documents: ['IECNS_License_2024.pdf', 'Renewal_Application_2025.pdf']
    },
    {
      id: 'ICASA002',
      category: 'Type Approval',
      requirement: 'Telecommunications Equipment Type Approval',
      status: 'partial',
      lastAudit: '2024-10-20',
      nextDue: '2025-01-20',
      priority: 'high',
      documents: ['Type_Approval_Cert_HLR.pdf', 'Type_Approval_Cert_MSC.pdf']
    },
    {
      id: 'INT001',
      category: 'Interconnection',
      requirement: 'Interconnection Agreement - Vodacom',
      status: 'compliant',
      lastAudit: '2024-12-01',
      nextDue: '2025-12-01',
      priority: 'critical',
      documents: ['Interconnect_Vodacom_2024.pdf']
    },
    {
      id: 'INT002',
      category: 'Interconnection',
      requirement: 'Interconnection Agreement - MTN',
      status: 'pending',
      lastAudit: 'N/A',
      nextDue: '2025-02-15',
      priority: 'critical',
      documents: []
    },
    {
      id: 'EMRG001',
      category: 'Emergency Services',
      requirement: 'E911/E112 Service Implementation',
      status: 'compliant',
      lastAudit: '2024-11-30',
      nextDue: '2025-05-30',
      priority: 'critical',
      documents: ['E911_Cert_2024.pdf', 'PSAP_Integration_Report.pdf']
    },
    {
      id: 'NUM001',
      category: 'Number Portability',
      requirement: 'MNP Database Integration Compliance',
      status: 'compliant',
      lastAudit: '2024-12-10',
      nextDue: '2025-06-10',
      priority: 'high',
      documents: ['MNP_Compliance_Cert.pdf']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'partial':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'non-compliant':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'pending':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'partial':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'non-compliant':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const compliantCount = complianceItems.filter(item => item.status === 'compliant').length;
      const newScore = Math.round((compliantCount / complianceItems.length) * 100);
      setOverallScore(newScore);
      
      const pendingCount = complianceItems.filter(item => 
        item.status === 'pending' || item.status === 'partial'
      ).length;
      setPendingActions(pendingCount);
    }, 5000);

    return () => clearInterval(interval);
  }, [complianceItems]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Regulatory Compliance Center</h2>
            <p className="text-muted-foreground">ICASA licensing, type approval & regulatory requirements</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload Certificate
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Compliance Report
          </Button>
          <Badge className="bg-green-100 text-green-800">
            <Shield className="w-4 h-4 mr-1" />
            {overallScore}% Compliant
          </Badge>
        </div>
      </div>

      {/* Compliance Status Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              Regulatory compliance at {overallScore}% - {pendingActions} items requiring attention
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                <FileCheck className="w-3 h-3 mr-1" />
                ICASA Licensed
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Compliance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <FileCheck className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">4/6</div>
            <div className="text-sm text-blue-600">Licenses Current</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-yellow-600" />
              <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
                Pending
              </Badge>
            </div>
            <div className="text-2xl font-bold text-yellow-700">{pendingActions}</div>
            <div className="text-sm text-yellow-600">Action Items</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Building className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-700">
                Signed
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">2/4</div>
            <div className="text-sm text-green-600">Interconnects</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Phone className="w-8 h-8 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Certified
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">100%</div>
            <div className="text-sm text-purple-600">E911 Ready</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="licenses">Licenses</TabsTrigger>
          <TabsTrigger value="interconnects">Interconnects</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Compliance Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5" />
                Compliance Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <span className="font-medium">{item.requirement}</span>
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(item.priority)}>
                          {item.priority.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(item.status)}>
                          {item.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                      <div>
                        <span className="font-medium">Last Audit:</span> {item.lastAudit}
                      </div>
                      <div>
                        <span className="font-medium">Next Due:</span> {item.nextDue}
                      </div>
                    </div>
                    {item.documents.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.documents.map((doc, idx) => (
                          <Button key={idx} variant="outline" size="sm" className="text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            {doc}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licenses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ICASA Licenses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">IECNS License</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Radio Frequency Spectrum</span>
                    <Badge className="bg-green-100 text-green-800">Allocated</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ECNS Registration</span>
                    <Badge className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ECS License</span>
                    <Badge variant="secondary">Renewal Due Q2</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Type Approvals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">MSC Equipment</span>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">HLR/HSS System</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Billing Platform</span>
                    <Badge className="bg-green-100 text-green-800">Certified</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMSC Gateway</span>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interconnects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Interconnections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vodacom</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">MTN</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Negotiating</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cell C</span>
                    <Badge variant="secondary">Planned Q1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Telkom Mobile</span>
                    <Badge variant="secondary">Planned Q2</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Roaming Agreements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SADC Regional</span>
                    <Badge className="bg-green-100 text-green-800">Signed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">International Hub</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Testing</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">EU Roaming</span>
                    <Badge variant="secondary">Planned</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">TAP Processing</span>
                    <Badge className="bg-green-100 text-green-800">Live</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Audit Schedule & History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
                  <div>Audit Type</div>
                  <div>Last Completed</div>
                  <div>Next Scheduled</div>
                  <div>Status</div>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>ICASA Compliance</div>
                    <div>2024-11-15</div>
                    <div>2025-05-15</div>
                    <div><Badge className="bg-green-100 text-green-800">Passed</Badge></div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>Security Assessment</div>
                    <div>2024-10-01</div>
                    <div>2025-04-01</div>
                    <div><Badge className="bg-green-100 text-green-800">Certified</Badge></div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>Financial Audit</div>
                    <div>2024-12-31</div>
                    <div>2025-12-31</div>
                    <div><Badge className="bg-blue-100 text-blue-800">Scheduled</Badge></div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>Network Quality</div>
                    <div>2024-11-30</div>
                    <div>2025-02-28</div>
                    <div><Badge className="bg-yellow-100 text-yellow-800">Due Soon</Badge></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegulatoryComplianceCenter;