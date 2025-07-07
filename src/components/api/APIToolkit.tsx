import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, CheckCircle, Code, Shield, Network, Settings, Database, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const APIToolkit = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
    toast({
      title: "Copied to clipboard",
      description: `${label} copied successfully`,
    });
  };

  const simProvisioningExample = `POST /sim/provision
Host: api.mtn.com
Authorization: Bearer {token}
Content-Type: application/json

{
  "imsi": "123456789012345",
  "iccid": "8901234567890123456",
  "msisdn": "27831234567",
  "action": "activate"
}`;

  const responseExample = `{
  "status": "success",
  "message": "SIM activated successfully",
  "timestamp": "2025-07-07T21:42:00Z"
}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
            <Code className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">API Integration Toolkit</h2>
            <p className="text-muted-foreground">MNO-MVNE Integration Framework</p>
          </div>
        </div>
        <Badge className="bg-indigo-100 text-indigo-800 text-lg px-4 py-2">
          <Network className="w-4 h-4 mr-1" />
          MTN Ready
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        {/* Enhanced Tab Navigation with Responsive Design */}
        <div className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-1 h-auto p-1 bg-muted/50 rounded-xl">
            <TabsTrigger 
              value="overview" 
              className="flex-col gap-1 h-16 text-xs font-semibold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Network className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Info</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="flex-col gap-1 h-16 text-xs font-semibold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
              <span className="sm:hidden">Secure</span>
            </TabsTrigger>
            <TabsTrigger 
              value="endpoints" 
              className="flex-col gap-1 h-16 text-xs font-semibold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Endpoints</span>
              <span className="sm:hidden">APIs</span>
            </TabsTrigger>
            <TabsTrigger 
              value="examples" 
              className="flex-col gap-1 h-16 text-xs font-semibold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">Examples</span>
              <span className="sm:hidden">Code</span>
            </TabsTrigger>
            <TabsTrigger 
              value="integration" 
              className="flex-col gap-1 h-16 text-xs font-semibold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Integration</span>
              <span className="sm:hidden">Setup</span>
            </TabsTrigger>
            <TabsTrigger 
              value="challenges" 
              className="flex-col gap-1 h-16 text-xs font-semibold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <AlertCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Challenges</span>
              <span className="sm:hidden">Issues</span>
            </TabsTrigger>
            <TabsTrigger 
              value="best-practices" 
              className="flex-col gap-1 h-16 text-xs font-semibold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <CheckCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Best Practices</span>
              <span className="sm:hidden">Tips</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="border-l-4 border-l-indigo-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5 text-indigo-600" />
                API Integration Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-l-4 border-l-blue-500">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This toolkit provides a comprehensive framework for integrating MTN (MNO) with MVNE platforms for seamless connectivity, subscriber management, and service delivery.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="w-4 h-4 text-green-600" />
                      Connectivity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Secure VPN/Leased Line</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Mutual TLS Authentication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">IPsec Encryption</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Database className="w-4 h-4 text-blue-600" />
                      Core Functions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">SIM Provisioning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Subscriber Management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Policy & Charging</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">MVNE Platform Components</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div>• HLR/HSS</div>
                  <div>• Softswitch/VLR</div>
                  <div>• SMSC/USSD Gateway</div>
                  <div>• Billing Engine</div>
                  <div>• CRM Platform</div>
                  <div>• VAS Services</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                Security Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-red-800">Authentication & Authorization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>• OAuth 2.0 with JWT tokens</div>
                    <div>• Mutual TLS (mTLS) authentication</div>
                    <div>• Role-Based Access Control (RBAC)</div>
                    <div>• Short-lived token validation</div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-800">Data Protection</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>• TLS 1.2+ encryption in transit</div>
                    <div>• AES-256 encryption at rest</div>
                    <div>• Strong cipher suites (ECDHE)</div>
                    <div>• Payload signing with JWS</div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-800">API Gateway Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>• Centralized access control</div>
                    <div>• Traffic monitoring & analytics</div>
                    <div>• Rate limiting & throttling</div>
                    <div>• Request validation & filtering</div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-purple-800">Compliance & Auditing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>• Comprehensive request logging</div>
                    <div>• Correlation ID tracking</div>
                    <div>• GDPR & PCI-DSS compliance</div>
                    <div>• Automated security scanning</div>
                  </CardContent>
                </Card>
              </div>

              <Alert className="border-l-4 border-l-orange-500">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Security Best Practice:</strong> All API communications must use mTLS with certificate-based authentication, combined with OAuth 2.0 for fine-grained access control.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Endpoints Tab */}
        <TabsContent value="endpoints" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-green-600" />
                  SIM Provisioning Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="font-semibold text-green-700">/sim/provision</div>
                  <p className="text-sm text-muted-foreground">Activate, deactivate, or update SIMs</p>
                  <Badge variant="outline" className="text-xs">POST</Badge>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-green-700">/sim/status</div>
                  <p className="text-sm text-muted-foreground">Query current SIM status</p>
                  <Badge variant="outline" className="text-xs">GET</Badge>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-green-700">/sim/inventory</div>
                  <p className="text-sm text-muted-foreground">Manage SIM card inventory</p>
                  <Badge variant="outline" className="text-xs">GET/POST</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  Policy Management Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="font-semibold text-blue-700">/policy/update</div>
                  <p className="text-sm text-muted-foreground">Update QoS and charging rules</p>
                  <Badge variant="outline" className="text-xs">PUT</Badge>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-blue-700">/policy/query</div>
                  <p className="text-sm text-muted-foreground">Retrieve current policy config</p>
                  <Badge variant="outline" className="text-xs">GET</Badge>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-blue-700">/policy/history</div>
                  <p className="text-sm text-muted-foreground">Access policy change history</p>
                  <Badge variant="outline" className="text-xs">GET</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-purple-600" />
                  Subscriber Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="font-semibold text-purple-700">/subscriber/sync</div>
                  <p className="text-sm text-muted-foreground">Synchronize subscriber profiles</p>
                  <Badge variant="outline" className="text-xs">POST</Badge>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-purple-700">/billing/record</div>
                  <p className="text-sm text-muted-foreground">Transfer CDRs for billing</p>
                  <Badge variant="outline" className="text-xs">POST</Badge>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-purple-700">/service/activate</div>
                  <p className="text-sm text-muted-foreground">Activate value-added services</p>
                  <Badge variant="outline" className="text-xs">POST</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Essential Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-1">
                  <div><strong>IMSI:</strong> International Mobile Subscriber Identity</div>
                  <div><strong>ICCID:</strong> Integrated Circuit Card Identifier</div>
                  <div><strong>MSISDN:</strong> Mobile Station ISDN Number</div>
                  <div><strong>Policy ID:</strong> Quality of Service identifier</div>
                  <div><strong>CDR:</strong> Call/Data Record for billing</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Examples Tab */}
        <TabsContent value="examples" className="space-y-6">
          <Card className="border-l-4 border-l-indigo-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-600" />
                SIM Provisioning Example
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Request</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(simProvisioningExample, 'SIM Provisioning Request')}
                  >
                    {copiedCode === 'SIM Provisioning Request' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{simProvisioningExample}</code>
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Response</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(responseExample, 'SIM Provisioning Response')}
                  >
                    {copiedCode === 'SIM Provisioning Response' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{responseExample}</code>
                </pre>
              </div>

              <Alert className="border-l-4 border-l-green-500">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Integration Benefits:</strong> Faster MVNO launch, reduced operational costs, automated subscriber management, and scalable infrastructure.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-indigo-800">Quick Start Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <div className="font-semibold">Establish Connectivity</div>
                  <div className="text-sm text-muted-foreground">Set up secure VPN or leased line with mTLS authentication</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <div className="font-semibold">Configure Authentication</div>
                  <div className="text-sm text-muted-foreground">Implement OAuth 2.0 with JWT tokens and RBAC</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <div className="font-semibold">Test API Endpoints</div>
                  <div className="text-sm text-muted-foreground">Start with SIM provisioning and subscriber sync</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <div className="font-semibold">Go Live</div>
                  <div className="text-sm text-muted-foreground">Deploy with monitoring and comprehensive logging</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Plan Tab */}
        <TabsContent value="integration" className="space-y-6">
          <Card className="border-l-4 border-l-indigo-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-600" />
                End-to-End Integration Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-l-4 border-l-blue-500">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Structured multi-phase approach for seamless MNO-MVNE integration from setup to full launch.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-800">Phase 1-2: Foundation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="font-semibold">1. Preparation & Alignment</div>
                    <div>• Define objectives and KPIs</div>
                    <div>• Stakeholder engagement</div>
                    <div>• Regulatory assessment</div>
                    <div>• Project governance</div>
                    
                    <div className="font-semibold pt-2">2. Solution Design</div>
                    <div>• Platform selection</div>
                    <div>• Integration model definition</div>
                    <div>• Security planning (TLS, mTLS, OAuth)</div>
                    <div>• Multi-tenancy architecture</div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-800">Phase 3-4: Infrastructure</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="font-semibold">3. Infrastructure Setup</div>
                    <div>• Secure VPN/dedicated links</div>
                    <div>• Core system integration</div>
                    <div>• API gateway deployment</div>
                    
                    <div className="font-semibold pt-2">4. Platform Configuration</div>
                    <div>• BSS/OSS setup</div>
                    <div>• Provisioning systems</div>
                    <div>• Service catalog definition</div>
                    <div>• Portal customization</div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-purple-800">Phase 5-6: Testing & Training</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="font-semibold">5. Integration & Testing</div>
                    <div>• API implementation</div>
                    <div>• Security validation</div>
                    <div>• Functional testing</div>
                    <div>• Performance & compliance testing</div>
                    
                    <div className="font-semibold pt-2">6. Onboarding & Training</div>
                    <div>• MVNO onboarding tools</div>
                    <div>• User training programs</div>
                    <div>• Documentation preparation</div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-orange-800">Phase 7-8: Launch & Operations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="font-semibold">7. Go-Live & Launch</div>
                    <div>• Pilot launch with selected MVNOs</div>
                    <div>• Operational readiness confirmation</div>
                    <div>• Full rollout</div>
                    <div>• Continuous monitoring</div>
                    
                    <div className="font-semibold pt-2">8. Post-Launch Operations</div>
                    <div>• Support & maintenance</div>
                    <div>• Analytics & reporting</div>
                    <div>• Scalability planning</div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Integration Timeline Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Preparation & Design:</span><span className="font-semibold">2-4 weeks</span></div>
                  <div className="flex justify-between"><span>Infrastructure Setup:</span><span className="font-semibold">3-6 weeks</span></div>
                  <div className="flex justify-between"><span>Testing & Training:</span><span className="font-semibold">4-8 weeks</span></div>
                  <div className="flex justify-between"><span>Launch & Optimization:</span><span className="font-semibold">2-4 weeks</span></div>
                  <div className="border-t pt-2 mt-3 flex justify-between font-bold"><span>Total Duration:</span><span>11-22 weeks</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="space-y-6">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                Technical Challenges & Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-red-800">Legacy Systems Integration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="font-semibold text-red-700">Challenge:</div>
                    <div>Different technology stacks and limited API support in legacy systems</div>
                    
                    <div className="font-semibold text-green-700 pt-2">Solutions:</div>
                    <div>• Use middleware/integration platforms</div>
                    <div>• Adopt standardized REST/SOAP APIs</div>
                    <div>• Plan phased migration</div>
                    <div>• Ensure backward compatibility</div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-800">Data Synchronization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="font-semibold text-red-700">Challenge:</div>
                    <div>Real-time sync across different data models and update frequencies</div>
                    
                    <div className="font-semibold text-green-700 pt-2">Solutions:</div>
                    <div>• Event-driven architectures</div>
                    <div>• Robust data validation</div>
                    <div>• Regular reconciliation processes</div>
                    <div>• Consistency checks</div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-purple-800">Security & Compliance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="font-semibold text-red-700">Challenge:</div>
                    <div>Protecting data while meeting diverse regulatory requirements</div>
                    
                    <div className="font-semibold text-green-700 pt-2">Solutions:</div>
                    <div>• Strong authentication (OAuth 2.0, mTLS)</div>
                    <div>• Role-based access control</div>
                    <div>• End-to-end encryption</div>
                    <div>• Regular security audits</div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-800">Scalability & Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="font-semibold text-red-700">Challenge:</div>
                    <div>Handling increased loads without bottlenecks or downtime</div>
                    
                    <div className="font-semibold text-green-700 pt-2">Solutions:</div>
                    <div>• Microservices architecture</div>
                    <div>• Cloud-native design</div>
                    <div>• Load balancing & auto-scaling</div>
                    <div>• Performance monitoring</div>
                  </CardContent>
                </Card>
              </div>

              <Alert className="border-l-4 border-l-orange-500">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Pro Tip:</strong> Address challenges proactively during the planning phase to avoid costly delays during implementation.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Best Practices Tab */}
        <TabsContent value="best-practices" className="space-y-6">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Interoperability Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-800">Standards & APIs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>• Use 3GPP standards for network interfaces</div>
                    <div>• Implement REST/SOAP for API communications</div>
                    <div>• Design with OpenAPI/Swagger documentation</div>
                    <div>• Employ semantic versioning</div>
                    <div>• Event-driven architecture patterns</div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-800">Architecture Design</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>• Microservices approach</div>
                    <div>• Loosely coupled components</div>
                    <div>• Multi-tenant support</div>
                    <div>• Logical data separation</div>
                    <div>• Horizontal scalability</div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-purple-800">Data Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>• Centralized subscriber database</div>
                    <div>• Single source of truth</div>
                    <div>• Real-time synchronization</div>
                    <div>• Event-driven updates</div>
                    <div>• Regular data reconciliation</div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-orange-800">Security Framework</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>• OAuth 2.0 with JWT tokens</div>
                    <div>• Mutual TLS (mTLS) authentication</div>
                    <div>• Role-based access control</div>
                    <div>• API gateway deployment</div>
                    <div>• Comprehensive audit logging</div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Implementation Checklist</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>API documentation complete</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Security protocols implemented</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Testing framework established</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Monitoring systems deployed</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>SLA agreements defined</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Governance framework active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Training programs completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Scalability tested</span>
                    </div>
                  </div>
                </div>
              </div>

              <Alert className="border-l-4 border-l-green-500">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Success Factor:</strong> Regular collaboration between MNO, MVNE, and MVNO teams ensures alignment and rapid issue resolution.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default APIToolkit;