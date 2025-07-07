import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  Download, 
  Send, 
  Settings, 
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Play,
  Pause
} from 'lucide-react';

interface ReportConfig {
  id: string;
  name: string;
  type: 'onboarding' | 'purchases' | 'performance' | 'users';
  frequency: 'daily' | 'weekly' | 'monthly';
  recipients: string[];
  enabled: boolean;
  lastRun: string | null;
  nextRun: string | null;
  created_at: string;
}

const AutomatedReportingSystem = () => {
  const [reports, setReports] = useState<ReportConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [newRecipient, setNewRecipient] = useState('');
  const { toast } = useToast();

  // Mock data for demonstration
  const mockReports: ReportConfig[] = [
    {
      id: '1',
      name: 'Customer Onboarding Report',
      type: 'onboarding',
      frequency: 'weekly',
      recipients: ['admin@company.com', 'manager@company.com'],
      enabled: true,
      lastRun: '2025-07-01T08:00:00Z',
      nextRun: '2025-07-08T08:00:00Z',
      created_at: '2025-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Purchase Analytics',
      type: 'purchases',
      frequency: 'daily',
      recipients: ['sales@company.com'],
      enabled: true,
      lastRun: '2025-07-06T09:00:00Z',
      nextRun: '2025-07-07T09:00:00Z',
      created_at: '2025-01-01T00:00:00Z'
    },
    {
      id: '3',
      name: 'Field Worker Performance',
      type: 'performance',
      frequency: 'monthly',
      recipients: ['hr@company.com', 'operations@company.com'],
      enabled: false,
      lastRun: '2025-06-01T10:00:00Z',
      nextRun: '2025-08-01T10:00:00Z',
      created_at: '2025-01-01T00:00:00Z'
    }
  ];

  // Mock metrics data
  const metrics = {
    onboarding: {
      totalCustomers: 1247,
      newThisWeek: 89,
      completionRate: 94.2,
      avgTimeToComplete: '3.2 days',
      successfulRegistrations: 831,
      failedRegistrations: 42
    },
    purchases: {
      totalTransactions: 5678,
      dailyAverage: 187,
      weeklyRevenue: 125490,
      topProducts: ['Airtime R50', 'Data 1GB', 'Airtime R100'],
      successRate: 98.7
    },
    performance: {
      activeFieldWorkers: 89,
      avgActivationsPerWorker: 15.2,
      topPerformer: 'John Smith (45 activations)',
      totalCommissions: 89450
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 1000);
  };

  const toggleReportStatus = async (reportId: string, enabled: boolean) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, enabled } : report
    ));
    
    toast({
      title: enabled ? "Report Enabled" : "Report Disabled",
      description: `Automated reporting has been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };

  const runReportNow = async (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    toast({
      title: "Generating Report",
      description: `${report.name} is being generated...`,
    });

    // Simulate report generation
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === reportId ? { ...r, lastRun: new Date().toISOString() } : r
      ));
      
      toast({
        title: "Report Generated",
        description: `${report.name} has been generated and sent to recipients.`,
      });
    }, 2000);
  };

  const addRecipient = (reportId: string) => {
    if (!newRecipient || !newRecipient.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, recipients: [...report.recipients, newRecipient] }
        : report
    ));

    setNewRecipient('');
    toast({
      title: "Recipient Added",
      description: "Email recipient has been added to the report.",
    });
  };

  const removeRecipient = (reportId: string, email: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, recipients: report.recipients.filter(r => r !== email) }
        : report
    ));

    toast({
      title: "Recipient Removed",
      description: "Email recipient has been removed from the report.",
    });
  };

  const downloadReport = (reportType: string) => {
    // Create sample CSV content based on report type
    let csvContent = '';
    
    switch (reportType) {
      case 'onboarding':
        csvContent = `Date,New Customers,Completion Rate,Successful Registrations,Failed Registrations
2025-07-01,23,95.2%,22,1
2025-07-02,18,93.8%,17,1
2025-07-03,25,96.1%,24,1
2025-07-04,19,94.7%,18,1
2025-07-05,22,91.9%,20,2
2025-07-06,21,95.5%,20,1
2025-07-07,17,100%,17,0`;
        break;
      case 'purchases':
        csvContent = `Date,Transactions,Revenue,Success Rate,Top Product
2025-07-01,189,R 8920,98.9%,Airtime R50
2025-07-02,201,R 9540,97.8%,Data 1GB
2025-07-03,178,R 8320,99.1%,Airtime R50
2025-07-04,195,R 9180,98.5%,Airtime R100
2025-07-05,167,R 7890,98.2%,Data 1GB
2025-07-06,183,R 8650,99.3%,Airtime R50
2025-07-07,172,R 8140,97.9%,Data 1GB`;
        break;
      default:
        csvContent = 'Report data not available';
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportType}-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Download Complete",
      description: `${reportType} report has been downloaded.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading reporting system...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Automated Reporting System</h2>
          <p className="text-gray-600">Configure and manage automated reports for customer onboarding and performance metrics</p>
        </div>
        <Button onClick={loadReports}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Report Configuration</TabsTrigger>
          <TabsTrigger value="metrics">Live Metrics</TabsTrigger>
          <TabsTrigger value="schedule">Schedule & Recipients</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Reports</p>
                    <p className="text-2xl font-bold">{reports.filter(r => r.enabled).length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Reports Sent Today</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Recipients</p>
                    <p className="text-2xl font-bold">{new Set(reports.flatMap(r => r.recipients)).size}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Next Report</p>
                    <p className="text-lg font-bold">2h 15m</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Report Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.filter(r => r.lastRun).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${report.enabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <FileText className={`w-5 h-5 ${report.enabled ? 'text-green-600' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{report.name}</h4>
                        <p className="text-sm text-gray-600">
                          Last run: {report.lastRun ? formatDate(report.lastRun) : 'Never'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={report.enabled ? 'default' : 'secondary'}>
                        {report.enabled ? 'Active' : 'Disabled'}
                      </Badge>
                      <Badge variant="outline">
                        {report.frequency}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={report.enabled}
                        onCheckedChange={(checked) => toggleReportStatus(report.id, checked)}
                      />
                      <Label className="text-sm">
                        {report.enabled ? 'Enabled' : 'Disabled'}
                      </Label>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Type</p>
                      <p className="font-medium capitalize">{report.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Frequency</p>
                      <p className="font-medium capitalize">{report.frequency}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last Run</p>
                      <p className="font-medium">
                        {report.lastRun ? formatDate(report.lastRun) : 'Never'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Next Run</p>
                      <p className="font-medium">
                        {report.nextRun ? formatDate(report.nextRun) : 'Not scheduled'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm mb-2">Recipients ({report.recipients.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {report.recipients.map((email, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {email}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => runReportNow(report.id)}
                      disabled={!report.enabled}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Run Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadReport(report.type)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Customer Onboarding Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Customer Onboarding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{metrics.onboarding.totalCustomers}</p>
                    <p className="text-sm text-gray-600">Total Customers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{metrics.onboarding.newThisWeek}</p>
                    <p className="text-sm text-gray-600">New This Week</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{metrics.onboarding.completionRate}%</p>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{metrics.onboarding.avgTimeToComplete}</p>
                    <p className="text-sm text-gray-600">Avg. Time</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Successful: {metrics.onboarding.successfulRegistrations}</span>
                    <span>Failed: {metrics.onboarding.failedRegistrations}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purchase Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Purchase Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{metrics.purchases.totalTransactions}</p>
                    <p className="text-sm text-gray-600">Total Transactions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{metrics.purchases.dailyAverage}</p>
                    <p className="text-sm text-gray-600">Daily Average</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">R{metrics.purchases.weeklyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Weekly Revenue</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-teal-600">{metrics.purchases.successRate}%</p>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Top Products:</p>
                  <div className="space-y-1">
                    {metrics.purchases.topProducts.map((product, index) => (
                      <div key={index} className="text-sm">{index + 1}. {product}</div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Field Worker Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  Field Worker Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{metrics.performance.activeFieldWorkers}</p>
                    <p className="text-sm text-gray-600">Active Workers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{metrics.performance.avgActivationsPerWorker}</p>
                    <p className="text-sm text-gray-600">Avg. Activations</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">R{metrics.performance.totalCommissions.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Commissions</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600">Top Performer:</p>
                  <p className="font-medium">{metrics.performance.topPerformer}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule & Recipients Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">{report.name}</h4>
                      <Badge variant={report.enabled ? 'default' : 'secondary'}>
                        {report.enabled ? 'Active' : 'Disabled'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium">Schedule</Label>
                        <Select defaultValue={report.frequency}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Next Run</Label>
                        <Input 
                          type="datetime-local" 
                          className="mt-1"
                          defaultValue={report.nextRun ? new Date(report.nextRun).toISOString().slice(0, 16) : ''}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label className="text-sm font-medium">Recipients</Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter email address"
                            value={selectedReport === report.id ? newRecipient : ''}
                            onChange={(e) => {
                              setSelectedReport(report.id);
                              setNewRecipient(e.target.value);
                            }}
                          />
                          <Button onClick={() => addRecipient(report.id)}>
                            Add
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {report.recipients.map((email, index) => (
                            <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm">
                              {email}
                              <button
                                onClick={() => removeRecipient(report.id, email)}
                                className="text-red-500 hover:text-red-700 ml-1"
                              >
                                ×
                              </button>
                            </div>
                          ))}
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
    </div>
  );
};

export default AutomatedReportingSystem;