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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

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
      </Tabs>
    </div>
  );
};

export default APIToolkit;