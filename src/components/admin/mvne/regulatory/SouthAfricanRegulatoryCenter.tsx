import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Scale, 
  FileText, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  Building,
  Globe,
  Shield,
  TrendingUp,
  Clock,
  Archive,
  Eye
} from 'lucide-react';

interface RegulatoryRequirement {
  id: string;
  category: 'icasa' | 'popia' | 'b_bbee' | 'rica' | 'consumer_protection';
  requirement: string;
  status: 'compliant' | 'pending' | 'non_compliant';
  priority: 'critical' | 'high' | 'medium' | 'low';
  dueDate: string;
  progress: number;
  responsible: string;
}

interface BlackOwnedMVNO {
  id: string;
  name: string;
  ownershipLevel: number;
  certificationStatus: 'verified' | 'pending' | 'expired';
  onboardingDate: string;
  supportTier: 'basic' | 'enhanced' | 'premium';
  subscribers: number;
  complianceScore: number;
}

const SouthAfricanRegulatoryCenter = () => {
  const [complianceScore, setComplianceScore] = useState(96.5);
  const [blackOwnedMVNOs, setBlackOwnedMVNOs] = useState(5);
  const [pendingRequirements, setPendingRequirements] = useState(3);

  const requirements: RegulatoryRequirement[] = [
    {
      id: 'REQ001',
      category: 'icasa',
      requirement: 'Black-owned MVNO reporting compliance',
      status: 'compliant',
      priority: 'critical',
      dueDate: '2025-03-31',
      progress: 100,
      responsible: 'Regulatory Team'
    },
    {
      id: 'REQ002',
      category: 'popia',
      requirement: 'Personal Information Processing updates',
      status: 'pending',
      priority: 'high',
      dueDate: '2025-02-15',
      progress: 75,
      responsible: 'Legal Team'
    },
    {
      id: 'REQ003',
      category: 'b_bbee',
      requirement: 'B-BBEE scorecard verification',
      status: 'compliant',
      priority: 'medium',
      dueDate: '2025-04-30',
      progress: 100,
      responsible: 'Compliance Team'
    },
    {
      id: 'REQ004',
      category: 'rica',
      requirement: 'RICA compliance audit',
      status: 'pending',
      priority: 'critical',
      dueDate: '2025-01-31',
      progress: 85,
      responsible: 'Operations Team'
    },
    {
      id: 'REQ005',
      category: 'consumer_protection',
      requirement: 'Consumer Protection Act compliance',
      status: 'compliant',
      priority: 'high',
      dueDate: '2025-06-30',
      progress: 100,
      responsible: 'Customer Service'
    }
  ];

  const blackOwnedMVNOsList: BlackOwnedMVNO[] = [
    {
      id: 'BMVNO001',
      name: 'Ubuntu Mobile',
      ownershipLevel: 85,
      certificationStatus: 'verified',
      onboardingDate: '2024-08-15',
      supportTier: 'premium',
      subscribers: 45678,
      complianceScore: 98
    },
    {
      id: 'BMVNO002',
      name: 'Mzansi Connect',
      ownershipLevel: 75,
      certificationStatus: 'verified',
      onboardingDate: '2024-09-22',
      supportTier: 'enhanced',
      subscribers: 23456,
      complianceScore: 95
    },
    {
      id: 'BMVNO003',
      name: 'Afrika Link',
      ownershipLevel: 90,
      certificationStatus: 'pending',
      onboardingDate: '2024-11-10',
      supportTier: 'basic',
      subscribers: 12345,
      complianceScore: 92
    },
    {
      id: 'BMVNO004',
      name: 'Proudly SA Mobile',
      ownershipLevel: 100,
      certificationStatus: 'verified',
      onboardingDate: '2024-07-03',
      supportTier: 'premium',
      subscribers: 67890,
      complianceScore: 99
    },
    {
      id: 'BMVNO005',
      name: 'Rainbow Communications',
      ownershipLevel: 65,
      certificationStatus: 'expired',
      onboardingDate: '2024-06-18',
      supportTier: 'enhanced',
      subscribers: 34567,
      complianceScore: 88
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'icasa':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'popia':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'b_bbee':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'rica':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'consumer_protection':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'verified':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'non_compliant':
      case 'expired':
        return 'text-red-600 bg-red-50 border-red-200';
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

  const getSupportTierColor = (tier: string) => {
    switch (tier) {
      case 'premium':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'enhanced':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'basic':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setComplianceScore(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 0.2)));
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl shadow-lg">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">South African Regulatory Center</h2>
            <p className="text-muted-foreground">ICASA, POPIA, B-BBEE compliance & black-owned MVNO support</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="w-4 h-4 mr-2" />
            Audit Trail
          </Button>
          <Badge className="bg-green-100 text-green-800">
            <Scale className="w-4 h-4 mr-1" />
            {complianceScore.toFixed(1)}% Compliant
          </Badge>
        </div>
      </div>

      {/* Regulatory Status Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              {complianceScore.toFixed(1)}% regulatory compliance - {blackOwnedMVNOs} black-owned MVNOs supported, {pendingRequirements} pending items
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                <Shield className="w-3 h-3 mr-1" />
                ICASA Compliant
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Regulatory Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Scale className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-700">
                Compliant
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">{complianceScore.toFixed(1)}%</div>
            <div className="text-sm text-green-600">Overall Compliance</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Building className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Supported
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{blackOwnedMVNOs}</div>
            <div className="text-sm text-blue-600">Black-owned MVNOs</div>
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
            <div className="text-2xl font-bold text-yellow-700">{pendingRequirements}</div>
            <div className="text-sm text-yellow-600">Pending Items</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Current
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">12</div>
            <div className="text-sm text-purple-600">Active Reports</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requirements" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="black-owned">Black-owned MVNOs</TabsTrigger>
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="requirements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Regulatory Requirements Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requirements.map((req) => (
                  <div key={req.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{req.requirement}</span>
                        <Badge variant="outline" className={getCategoryColor(req.category)}>
                          {req.category.toUpperCase().replace('_', '-')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(req.priority)}>
                          {req.priority.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(req.status)}>
                          {req.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">Due Date:</span>
                        <div className="font-medium">{req.dueDate}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Responsible:</span>
                        <div className="font-medium">{req.responsible}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Progress:</span>
                        <div className="font-medium">{req.progress}%</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress value={req.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="black-owned" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Black-owned MVNO Support Program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blackOwnedMVNOsList.map((mvno) => (
                  <div key={mvno.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-green-600" />
                        <span className="font-medium">{mvno.name}</span>
                        <Badge variant="outline" className={getSupportTierColor(mvno.supportTier)}>
                          {mvno.supportTier.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(mvno.certificationStatus)}>
                          {mvno.certificationStatus.toUpperCase()}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Ownership:</span>
                        <div className="font-medium text-green-600">{mvno.ownershipLevel}%</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Onboarded:</span>
                        <div className="font-medium">{mvno.onboardingDate}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Subscribers:</span>
                        <div className="font-medium">{mvno.subscribers.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Compliance:</span>
                        <div className="font-medium">{mvno.complianceScore}%</div>
                      </div>
                      <div className="flex items-center">
                        <Progress value={mvno.complianceScore} className="flex-1 h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reporting" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ICASA Reporting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quarterly MVNO Report</span>
                    <Badge className="bg-green-100 text-green-800">Submitted</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Black-owned MVNO Statistics</span>
                    <Badge className="bg-green-100 text-green-800">Current</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Spectrum Compliance</span>
                    <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consumer Complaints</span>
                    <Badge className="bg-blue-100 text-blue-800">Tracked</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Protection Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">POPIA Compliance</span>
                    <Badge className="bg-green-100 text-green-800">98% Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Subject Requests</span>
                    <Badge variant="secondary">Automated</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consent Management</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Breach Notification</span>
                    <Badge className="bg-blue-100 text-blue-800">Ready</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Scores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>ICASA Compliance</span>
                      <span>98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>POPIA Compliance</span>
                      <span>96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>B-BBEE Compliance</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>RICA Compliance</span>
                      <span>97%</span>
                    </div>
                    <Progress value={97} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">RICA Audit Report</span>
                    <Badge className="bg-red-100 text-red-800">Jan 31</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">POPIA Assessment</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Feb 15</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ICASA Quarterly Report</span>
                    <Badge className="bg-blue-100 text-blue-800">Mar 31</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">B-BBEE Verification</span>
                    <Badge className="bg-green-100 text-green-800">Apr 30</Badge>
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

export default SouthAfricanRegulatoryCenter;