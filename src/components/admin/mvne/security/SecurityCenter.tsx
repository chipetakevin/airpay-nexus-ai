import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Lock,
  Zap,
  Users,
  FileText,
  Activity,
  Wifi,
  Database,
  RefreshCw
} from 'lucide-react';

interface SecurityThreat {
  id: string;
  type: 'intrusion' | 'malware' | 'ddos' | 'fraud' | 'data_breach';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'mitigated' | 'investigating';
  source: string;
  target: string;
  timestamp: string;
  description: string;
}

interface ComplianceCheck {
  id: string;
  standard: string;
  category: string;
  status: 'compliant' | 'non_compliant' | 'pending';
  lastCheck: string;
  score: number;
  issues: number;
}

const SecurityCenter = () => {
  const [securityScore, setSecurityScore] = useState(94.5);
  const [activeThreats, setActiveThreats] = useState(2);
  const [complianceScore, setComplianceScore] = useState(98.2);

  const threats: SecurityThreat[] = [
    {
      id: 'THR001',
      type: 'fraud',
      severity: 'high',
      status: 'investigating',
      source: '196.123.45.67',
      target: 'Billing API',
      timestamp: '5 min ago',
      description: 'Suspicious billing pattern detected - multiple failed payment attempts'
    },
    {
      id: 'THR002',
      type: 'intrusion',
      severity: 'medium',
      status: 'mitigated',
      source: '41.56.78.90',
      target: 'Admin Portal',
      timestamp: '15 min ago',
      description: 'Multiple failed login attempts from unknown IP address'
    },
    {
      id: 'THR003',
      type: 'ddos',
      severity: 'critical',
      status: 'mitigated',
      source: 'Multiple IPs',
      target: 'Subscriber API',
      timestamp: '2 hours ago',
      description: 'DDoS attack targeting subscriber management endpoints'
    },
    {
      id: 'THR004',
      type: 'malware',
      severity: 'low',
      status: 'active',
      source: 'Internal Network',
      target: 'Workstation-045',
      timestamp: '1 hour ago',
      description: 'Suspicious file detected on employee workstation'
    }
  ];

  const complianceChecks: ComplianceCheck[] = [
    {
      id: 'COMP001',
      standard: 'POPIA',
      category: 'Data Protection',
      status: 'compliant',
      lastCheck: '2025-01-06',
      score: 98,
      issues: 0
    },
    {
      id: 'COMP002',
      standard: 'ICASA',
      category: 'Telecommunications',
      status: 'compliant',
      lastCheck: '2025-01-05',
      score: 96,
      issues: 1
    },
    {
      id: 'COMP003',
      standard: 'ISO 27001',
      category: 'Information Security',
      status: 'compliant',
      lastCheck: '2025-01-04',
      score: 94,
      issues: 2
    },
    {
      id: 'COMP004',
      standard: 'PCI DSS',
      category: 'Payment Security',
      status: 'pending',
      lastCheck: '2025-01-03',
      score: 89,
      issues: 3
    },
    {
      id: 'COMP005',
      standard: 'GDPR',
      category: 'Data Privacy',
      status: 'compliant',
      lastCheck: '2025-01-02',
      score: 99,
      issues: 0
    }
  ];

  const getThreatColor = (severity: string) => {
    switch (severity) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'mitigated':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'non_compliant':
      case 'active':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'pending':
      case 'investigating':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'intrusion':
        return <Shield className="w-4 h-4 text-red-600" />;
      case 'malware':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'ddos':
        return <Wifi className="w-4 h-4 text-red-600" />;
      case 'fraud':
        return <Eye className="w-4 h-4 text-purple-600" />;
      case 'data_breach':
        return <Database className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityScore(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5) * 0.5)));
      setComplianceScore(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 0.3)));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Security & Fraud Management Center</h2>
            <p className="text-muted-foreground">Continuous monitoring, threat detection & compliance management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Scan Now
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Report
          </Button>
          <Badge className="bg-green-100 text-green-800">
            <Shield className="w-4 h-4 mr-1" />
            {securityScore.toFixed(1)}% Secure
          </Badge>
        </div>
      </div>

      {/* Security Status Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              Security systems operational - {activeThreats} active threats under investigation
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                <Activity className="w-3 h-3 mr-1" />
                24/7 Monitoring
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-700">
                Strong
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">{securityScore.toFixed(1)}%</div>
            <div className="text-sm text-green-600">Security Score</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <Badge variant="outline" className="bg-red-100 text-red-700">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-red-700">{activeThreats}</div>
            <div className="text-sm text-red-600">Active Threats</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Compliant
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{complianceScore.toFixed(1)}%</div>
            <div className="text-sm text-blue-600">Compliance</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Protected
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">24/7</div>
            <div className="text-sm text-purple-600">Monitoring</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="threats" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="threats">Threat Detection</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="policies">Security Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="threats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Active Security Threats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threats.map((threat) => (
                  <div key={threat.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getThreatIcon(threat.type)}
                        <span className="font-medium capitalize">{threat.type.replace('_', ' ')}</span>
                        <Badge variant="outline" className={getThreatColor(threat.severity)}>
                          {threat.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(threat.status)}>
                          {threat.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-500">{threat.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{threat.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Source:</span> {threat.source}
                      </div>
                      <div>
                        <span className="font-medium">Target:</span> {threat.target}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Compliance Status Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceChecks.map((check) => (
                  <div key={check.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{check.standard}</span>
                        <Badge variant="secondary" className="text-xs">
                          {check.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(check.status)}>
                          {check.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-500">{check.lastCheck}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">Score:</span>
                        <div className="font-medium">{check.score}%</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Issues:</span>
                        <div className={`font-medium ${check.issues > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {check.issues}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Check:</span>
                        <div className="font-medium">{check.lastCheck}</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress value={check.score} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Monitoring</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Network Traffic Analysis</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Intrusion Detection</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fraud Detection</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Behavioral Analysis</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Blocked Attacks (24h)</span>
                    <Badge variant="secondary">1,234</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">False Positives</span>
                    <Badge className="bg-green-100 text-green-800">0.2%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Detection Time</span>
                    <Badge className="bg-blue-100 text-blue-800">&lt; 1s</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <Badge className="bg-blue-100 text-blue-800">&lt; 30s</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Policies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Password Policy</span>
                    <Badge className="bg-green-100 text-green-800">Enforced</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">MFA Requirements</span>
                    <Badge className="bg-green-100 text-green-800">Mandatory</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Access Control</span>
                    <Badge className="bg-green-100 text-green-800">RBAC</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Encryption</span>
                    <Badge className="bg-green-100 text-green-800">AES-256</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Risk</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vendor Assessments</span>
                    <Badge className="bg-green-100 text-green-800">Current</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Integration Security</span>
                    <Badge className="bg-blue-100 text-blue-800">Monitored</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Security</span>
                    <Badge className="bg-green-100 text-green-800">OAuth 2.0</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risk Score</span>
                    <Badge className="bg-green-100 text-green-800">Low</Badge>
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

export default SecurityCenter;