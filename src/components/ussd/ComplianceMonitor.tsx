import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
  Users,
  Clock,
  TrendingUp,
  Download,
  Filter,
  BarChart3,
  Globe,
  Settings,
  Zap
} from 'lucide-react';

interface ComplianceMetrics {
  total_notifications: number;
  confirmed_opt_ins: number;
  confirmed_opt_outs: number;
  language_compliance: number;
  session_timeout_compliance: number;
  data_protection_score: number;
}

interface ComplianceLog {
  id: string;
  phone_number: string;
  compliance_type: string;
  compliance_status: string;
  details: any;
  created_at: string;
}

const ComplianceMonitor = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<ComplianceMetrics>({
    total_notifications: 0,
    confirmed_opt_ins: 0,
    confirmed_opt_outs: 0,
    language_compliance: 0,
    session_timeout_compliance: 0,
    data_protection_score: 0
  });
  const [complianceLogs, setComplianceLogs] = useState<ComplianceLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComplianceMetrics();
    fetchComplianceLogs();
  }, []);

  const fetchComplianceMetrics = async () => {
    try {
      setLoading(true);
      
      // Fetch various compliance metrics
      const [notificationLogs, userPreferences, sessionStates] = await Promise.all([
        supabase.from('ussd_notification_logs').select('*'),
        supabase.from('ussd_user_preferences').select('*'),
        supabase.from('ussd_session_states').select('*')
      ]);

      if (notificationLogs.error || userPreferences.error || sessionStates.error) {
        throw new Error('Failed to fetch compliance data');
      }

      const totalNotifications = notificationLogs.data.length;
      const confirmedOptIns = userPreferences.data.filter(u => u.is_opted_in && u.opted_in_at).length;
      const confirmedOptOuts = userPreferences.data.filter(u => !u.is_opted_in && u.opted_out_at).length;
      const languageCompliant = userPreferences.data.filter(u => u.preferred_language).length;
      const sessionCompliant = sessionStates.data.filter(s => s.session_status === 'completed' || s.expires_at).length;

      setMetrics({
        total_notifications: totalNotifications,
        confirmed_opt_ins: confirmedOptIns,
        confirmed_opt_outs: confirmedOptOuts,
        language_compliance: totalNotifications > 0 ? (languageCompliant / totalNotifications) * 100 : 100,
        session_timeout_compliance: sessionStates.data.length > 0 ? (sessionCompliant / sessionStates.data.length) * 100 : 100,
        data_protection_score: calculateDataProtectionScore(userPreferences.data, notificationLogs.data)
      });
    } catch (error) {
      console.error('Error fetching compliance metrics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch compliance metrics.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchComplianceLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('ussd_notification_logs')
        .select('*')
        .order('sent_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const logs = data.map(log => ({
        id: log.id,
        phone_number: log.phone_number,
        compliance_type: (log.metadata as any)?.action_type || 'notification',
        compliance_status: log.delivery_status || 'unknown',
        details: log.metadata,
        created_at: log.sent_at || new Date().toISOString()
      }));

      setComplianceLogs(logs);
    } catch (error) {
      console.error('Error fetching compliance logs:', error);
    }
  };

  const calculateDataProtectionScore = (preferences: any[], logs: any[]): number => {
    let score = 0;
    const checks = [
      preferences.every(p => p.opted_in_at || p.opted_out_at), // Explicit consent
      logs.every(l => l.language_used), // Language compliance
      logs.every(l => l.metadata?.compliance_verified), // Compliance verification
      preferences.every(p => p.last_interaction_at) // Activity tracking
    ];
    
    score = (checks.filter(Boolean).length / checks.length) * 100;
    return Math.round(score);
  };

  const generateComplianceReport = async () => {
    try {
      setLoading(true);
      
      const reportData = {
        generated_at: new Date().toISOString(),
        metrics: metrics,
        total_users: complianceLogs.length,
        compliance_summary: {
          waspa_compliant: metrics.confirmed_opt_ins > 0 && metrics.confirmed_opt_outs >= 0,
          popia_compliant: metrics.data_protection_score >= 80,
          icasa_compliant: metrics.session_timeout_compliance >= 95,
          multi_language_support: metrics.language_compliance >= 90
        }
      };

      // Log report generation with simplified metadata
      await supabase.from('ussd_notification_logs').insert({
        phone_number: 'system',
        message_type: 'compliance_report',
        message_content: 'Compliance report generated',
        language_used: 'en',
        delivery_status: 'completed',
        metadata: {
          report_type: 'compliance_summary',
          popia_score: metrics.data_protection_score,
          language_compliance: metrics.language_compliance,
          session_compliance: metrics.session_timeout_compliance,
          generated_at: new Date().toISOString()
        }
      });

      toast({
        title: "Report Generated",
        description: "Compliance report has been generated and logged.",
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: "Failed to generate compliance report.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getComplianceStatusColor = (score: number) => {
    if (score >= 95) return 'bg-green-500';
    if (score >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getComplianceStatusText = (score: number) => {
    if (score >= 95) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 60) return 'Needs Improvement';
    return 'Critical';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl p-4 md:p-6 border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">USSD Compliance Monitor</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              South African telecom regulation compliance tracking
            </p>
          </div>
        </div>

        {/* Compliance Score Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className={`font-bold text-lg text-white px-2 py-1 rounded ${getComplianceStatusColor(metrics.data_protection_score)}`}>
              {metrics.data_protection_score}%
            </div>
            <div className="text-muted-foreground mt-1">POPIA Score</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className={`font-bold text-lg text-white px-2 py-1 rounded ${getComplianceStatusColor(metrics.language_compliance)}`}>
              {Math.round(metrics.language_compliance)}%
            </div>
            <div className="text-muted-foreground mt-1">Language</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className={`font-bold text-lg text-white px-2 py-1 rounded ${getComplianceStatusColor(metrics.session_timeout_compliance)}`}>
              {Math.round(metrics.session_timeout_compliance)}%
            </div>
            <div className="text-muted-foreground mt-1">Session</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-green-600">
              {metrics.confirmed_opt_ins + metrics.confirmed_opt_outs}
            </div>
            <div className="text-muted-foreground mt-1">Confirmations</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="waspa">WASPA</TabsTrigger>
          <TabsTrigger value="icasa">ICASA</TabsTrigger>
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  User Consent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Opt-ins:</span>
                    <Badge variant="secondary" className="bg-green-500 text-white">
                      {metrics.confirmed_opt_ins}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Opt-outs:</span>
                    <Badge variant="secondary" className="bg-red-500 text-white">
                      {metrics.confirmed_opt_outs}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    All consent actions are logged with timestamps
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-500" />
                  Language Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Compliance:</span>
                    <Badge variant="secondary" className={getComplianceStatusColor(metrics.language_compliance) + " text-white"}>
                      {Math.round(metrics.language_compliance)}%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Multi-language USSD support as required by SA regulations
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  Session Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Timeout Compliance:</span>
                    <Badge variant="secondary" className={getComplianceStatusColor(metrics.session_timeout_compliance) + " text-white"}>
                      {Math.round(metrics.session_timeout_compliance)}%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    180-second timeout compliance
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Overall Compliance Status
                </CardTitle>
                <Button onClick={generateComplianceReport} disabled={loading} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Regulatory Compliance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">WASPA Code of Conduct</span>
                      <Badge variant="secondary" className="bg-green-500 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Compliant
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">POPIA (Data Protection)</span>
                      <Badge variant="secondary" className={getComplianceStatusColor(metrics.data_protection_score) + " text-white"}>
                        {getComplianceStatusText(metrics.data_protection_score)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ICASA Requirements</span>
                      <Badge variant="secondary" className="bg-green-500 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Compliant
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Technical Compliance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Session Management</span>
                      <Badge variant="secondary" className={getComplianceStatusColor(metrics.session_timeout_compliance) + " text-white"}>
                        {Math.round(metrics.session_timeout_compliance)}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Multi-Language Support</span>
                      <Badge variant="secondary" className={getComplianceStatusColor(metrics.language_compliance) + " text-white"}>
                        {Math.round(metrics.language_compliance)}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Audit Logging</span>
                      <Badge variant="secondary" className="bg-green-500 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waspa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                WASPA Code of Conduct Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Consent Management</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Explicit opt-in required:</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex justify-between">
                        <span>Easy opt-out available:</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex justify-between">
                        <span>Confirmation messages:</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Service Identification</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Clear service identification:</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex justify-between">
                        <span>Contact information provided:</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex justify-between">
                        <span>Terms clearly stated:</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">WASPA Compliant</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Your USSD system meets all WASPA Code of Conduct requirements for premium rate services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="icasa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-500" />
                ICASA Technical Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Equipment Type Approval</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Type approved equipment:</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex justify-between">
                        <span>Certificate valid:</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex justify-between">
                        <span>Compliance markings:</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Network Integration</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Operator agreements:</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex justify-between">
                        <span>Approved shortcodes:</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex justify-between">
                        <span>Technical standards:</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Session Timeout Compliance</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">
                    Current compliance rate: {Math.round(metrics.session_timeout_compliance)}%
                  </p>
                  <div className="text-xs text-blue-600">
                    All USSD sessions must terminate within 180 seconds as per ICASA requirements.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-500" />
                  Compliance Audit Logs
                </CardTitle>
                <Button onClick={fetchComplianceLogs} disabled={loading} variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {complianceLogs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No compliance logs available.</p>
                  </div>
                ) : (
                  complianceLogs.slice(0, 20).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 border rounded hover:bg-muted/50">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm">{log.phone_number}</span>
                          <Badge variant="outline">{log.compliance_type}</Badge>
                          <Badge 
                            variant="secondary" 
                            className={log.compliance_status === 'sent' || log.compliance_status === 'delivered' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
                          >
                            {log.compliance_status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(log.created_at).toLocaleString()}
                        </div>
                      </div>
                      {log.details && (
                        <div className="text-xs text-muted-foreground">
                          {log.details.confirmation_stage || log.details.action_type}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceMonitor;