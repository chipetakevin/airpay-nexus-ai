import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useEnhancedSecurity } from '@/hooks/useEnhancedSecurity';

interface SecurityMetrics {
  encryptionStatus: 'active' | 'inactive' | 'partial';
  accessControlScore: number;
  networkSecurityScore: number;
  dataProtectionLevel: number;
  complianceScore: number;
  fraudDetectionStatus: 'active' | 'inactive';
  auditTrailIntegrity: number;
  lastSecurityScan: string;
}

interface SecurityThreat {
  id: string;
  type: 'intrusion' | 'fraud' | 'unauthorized_access' | 'data_breach';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  status: 'detected' | 'investigating' | 'resolved' | 'false_positive';
  affectedSystem: string;
}

const SecurityCenter = () => {
  const { toast } = useToast();
  const { auditLogs, securityViolations, clearSecurityLogs } = useEnhancedSecurity();
  
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    encryptionStatus: 'active',
    accessControlScore: 98,
    networkSecurityScore: 95,
    dataProtectionLevel: 97,
    complianceScore: 100,
    fraudDetectionStatus: 'active',
    auditTrailIntegrity: 99,
    lastSecurityScan: new Date().toISOString()
  });

  const [securityThreats, setSecurityThreats] = useState<SecurityThreat[]>([
    {
      id: 'ST-001',
      type: 'fraud',
      severity: 'medium',
      description: 'Suspicious bulk order pattern detected - Multiple orders from same IP',
      timestamp: new Date().toISOString(),
      status: 'investigating',
      affectedSystem: 'Bulk Order Processing'
    },
    {
      id: 'ST-002',
      type: 'unauthorized_access',
      severity: 'low',
      description: 'Failed login attempts from unknown location',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'resolved',
      affectedSystem: 'Admin Portal'
    }
  ]);

  const [complianceStatus, setComplianceStatus] = useState({
    pciDss: { status: 'compliant', score: 100, lastAudit: '2024-01-10' },
    gdpr: { status: 'compliant', score: 98, lastAudit: '2024-01-05' },
    sox: { status: 'compliant', score: 99, lastAudit: '2024-01-08' },
    iso27001: { status: 'compliant', score: 97, lastAudit: '2024-01-12' }
  });

  // Real-time security monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time security updates
      setSecurityMetrics(prev => ({
        ...prev,
        networkSecurityScore: Math.max(90, Math.min(100, prev.networkSecurityScore + (Math.random() - 0.5) * 2)),
        accessControlScore: Math.max(95, Math.min(100, prev.accessControlScore + (Math.random() - 0.5) * 1))
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleSecurityScan = () => {
    toast({
      title: "Security Scan Initiated",
      description: "Comprehensive security audit is running...",
    });

    // Simulate security scan
    setTimeout(() => {
      setSecurityMetrics(prev => ({
        ...prev,
        lastSecurityScan: new Date().toISOString()
      }));
      
      toast({
        title: "Security Scan Complete",
        description: "All systems secure. No vulnerabilities detected.",
      });
    }, 3000);
  };

  const handleThreatResponse = (threatId: string, action: 'investigate' | 'resolve' | 'dismiss') => {
    setSecurityThreats(prev => prev.map(threat => 
      threat.id === threatId 
        ? { ...threat, status: action === 'investigate' ? 'investigating' : 'resolved' }
        : threat
    ));

    toast({
      title: "Threat Response",
      description: `Threat ${threatId} has been ${action}d`,
    });
  };

  const getSecurityStatusColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getThreatSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getOverallSecurityScore = () => {
    const scores = [
      securityMetrics.accessControlScore,
      securityMetrics.networkSecurityScore,
      securityMetrics.dataProtectionLevel,
      securityMetrics.complianceScore,
      securityMetrics.auditTrailIntegrity
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">🛡️ MVNO Security Center</h3>
        <p className="text-gray-600">Multi-layered security protection for bulk order data and MVNO operations</p>
      </div>

      {/* Security Overview Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-green-200">
          <CardContent className="p-4">
            <div className={`text-3xl font-bold ${getSecurityStatusColor(getOverallSecurityScore())}`}>
              {getOverallSecurityScore()}%
            </div>
            <div className="text-sm text-gray-600">Overall Security Score</div>
            <Progress value={getOverallSecurityScore()} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {securityMetrics.encryptionStatus === 'active' ? '🔒' : '🔓'}
                </div>
                <div className="text-sm text-gray-600">Data Encryption</div>
              </div>
              <Badge className={securityMetrics.encryptionStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {securityMetrics.encryptionStatus.toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{securityViolations}</div>
            <div className="text-sm text-gray-600">Security Violations (24h)</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{securityThreats.filter(t => t.status !== 'resolved').length}</div>
            <div className="text-sm text-gray-600">Active Threats</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="encryption">Encryption</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="threats">Threat Monitor</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="audits">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Access Control</span>
                  <div className="flex items-center gap-2">
                    <Progress value={securityMetrics.accessControlScore} className="w-20 h-2" />
                    <span className={`font-semibold ${getSecurityStatusColor(securityMetrics.accessControlScore)}`}>
                      {securityMetrics.accessControlScore}%
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Network Security</span>
                  <div className="flex items-center gap-2">
                    <Progress value={securityMetrics.networkSecurityScore} className="w-20 h-2" />
                    <span className={`font-semibold ${getSecurityStatusColor(securityMetrics.networkSecurityScore)}`}>
                      {securityMetrics.networkSecurityScore}%
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Data Protection</span>
                  <div className="flex items-center gap-2">
                    <Progress value={securityMetrics.dataProtectionLevel} className="w-20 h-2" />
                    <span className={`font-semibold ${getSecurityStatusColor(securityMetrics.dataProtectionLevel)}`}>
                      {securityMetrics.dataProtectionLevel}%
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Audit Trail Integrity</span>
                  <div className="flex items-center gap-2">
                    <Progress value={securityMetrics.auditTrailIntegrity} className="w-20 h-2" />
                    <span className={`font-semibold ${getSecurityStatusColor(securityMetrics.auditTrailIntegrity)}`}>
                      {securityMetrics.auditTrailIntegrity}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleSecurityScan} className="w-full">
                  🔍 Run Security Scan
                </Button>
                <Button variant="outline" onClick={clearSecurityLogs} className="w-full">
                  🗑️ Clear Security Logs
                </Button>
                <Button variant="outline" className="w-full">
                  📊 Generate Security Report
                </Button>
                <Button variant="outline" className="w-full">
                  🔧 Update Security Policies
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="encryption" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Encryption Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">Bulk Order Data</div>
                      <div className="text-sm text-gray-600">AES-256 Encryption</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Encrypted</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">Customer Billing Data</div>
                      <div className="text-sm text-gray-600">AES-256 Encryption</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Encrypted</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">Transaction Records</div>
                      <div className="text-sm text-gray-600">AES-256 Encryption</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Encrypted</Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium">Data in Transit</div>
                      <div className="text-sm text-gray-600">TLS 1.3 Protocol</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Secured</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium">API Communications</div>
                      <div className="text-sm text-gray-600">TLS 1.3 + Certificate Pinning</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Secured</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-medium">Key Management</div>
                      <div className="text-sm text-gray-600">Hardware Security Module</div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role-Based Access Control (RBAC)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-2">Admin Access</div>
                    <div className="text-sm text-gray-600 mb-3">Full system access</div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-800">5 Active Users</Badge>
                      <Badge className="bg-green-100 text-green-800">MFA Required</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-2">Operator Access</div>
                    <div className="text-sm text-gray-600 mb-3">Order management only</div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">12 Active Users</Badge>
                      <Badge className="bg-yellow-100 text-yellow-800">Time-Limited</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-2">Audit Access</div>
                    <div className="text-sm text-gray-600 mb-3">Read-only reporting</div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gray-100 text-gray-800">3 Active Users</Badge>
                      <Badge className="bg-green-100 text-green-800">Audit Trail</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Threat Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityThreats.map((threat) => (
                  <div key={threat.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getThreatSeverityColor(threat.severity)}>
                            {threat.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">{threat.type.replace('_', ' ').toUpperCase()}</Badge>
                          <Badge variant="outline">{threat.status}</Badge>
                        </div>
                        <div className="font-medium mb-1">{threat.description}</div>
                        <div className="text-sm text-gray-600">
                          Affected: {threat.affectedSystem} • {new Date(threat.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {threat.status === 'detected' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleThreatResponse(threat.id, 'investigate')}
                          >
                            Investigate
                          </Button>
                        )}
                        {threat.status === 'investigating' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleThreatResponse(threat.id, 'resolve')}
                          >
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(complianceStatus).map(([key, value]) => (
                  <div key={key} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{key.toUpperCase()}</div>
                      <Badge className={value.status === 'compliant' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {value.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Progress value={value.score} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{value.score}%</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Last Audit: {new Date(value.lastAudit).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {auditLogs.slice(-10).reverse().map((log, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={
                            log.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                            log.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {log.riskLevel}
                          </Badge>
                          <span className="text-sm font-medium">{log.action}</span>
                        </div>
                        <div className="text-sm text-gray-600">{log.details}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Security Alerts */}
      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">🔐</span>
            <span>Multi-layered Security Active: Encryption, Access Control, Fraud Detection, and Compliance Monitoring</span>
          </div>
          <Badge variant="outline" className="bg-blue-100 text-blue-800">SECURE</Badge>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SecurityCenter;