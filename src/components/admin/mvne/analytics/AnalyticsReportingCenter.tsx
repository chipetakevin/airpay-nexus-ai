import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  RefreshCw, 
  Search,
  Filter,
  Database,
  Eye,
  CheckCircle,
  AlertTriangle,
  Clock,
  GitBranch,
  PieChart,
  LineChart
} from 'lucide-react';

interface DataLineage {
  id: string;
  source: string;
  destination: string;
  transformations: string[];
  status: 'active' | 'failed' | 'paused';
  lastRun: string;
  recordsProcessed: number;
}

interface CustomReport {
  id: string;
  name: string;
  type: 'operational' | 'financial' | 'regulatory' | 'customer';
  created: string;
  lastGenerated: string;
  schedule: 'daily' | 'weekly' | 'monthly' | 'on-demand';
  status: 'active' | 'inactive';
  subscribers: number;
}

interface AlertRule {
  id: string;
  metric: string;
  condition: string;
  threshold: number;
  status: 'active' | 'triggered' | 'resolved';
  severity: 'critical' | 'high' | 'medium' | 'low';
  lastTriggered: string;
}

const AnalyticsReportingCenter = () => {
  const [dataProcessed, setDataProcessed] = useState(2456789);
  const [activeReports, setActiveReports] = useState(23);
  const [alertsTriggered, setAlertsTriggered] = useState(5);

  const dataLineages: DataLineage[] = [
    {
      id: 'DL001',
      source: 'Subscriber Database',
      destination: 'Analytics Warehouse',
      transformations: ['Clean', 'Enrich', 'Aggregate'],
      status: 'active',
      lastRun: '5 min ago',
      recordsProcessed: 125000
    },
    {
      id: 'DL002',
      source: 'Billing System',
      destination: 'Revenue Dashboard',
      transformations: ['Calculate', 'Validate', 'Summarize'],
      status: 'active',
      lastRun: '10 min ago',
      recordsProcessed: 89000
    },
    {
      id: 'DL003',
      source: 'Network Events',
      destination: 'Operations Dashboard',
      transformations: ['Filter', 'Correlate', 'Alert'],
      status: 'failed',
      lastRun: '2 hours ago',
      recordsProcessed: 0
    },
    {
      id: 'DL004',
      source: 'Customer Service',
      destination: 'Experience Analytics',
      transformations: ['Classify', 'Score', 'Trend'],
      status: 'active',
      lastRun: '15 min ago',
      recordsProcessed: 45600
    }
  ];

  const customReports: CustomReport[] = [
    {
      id: 'RPT001',
      name: 'Daily Subscriber Growth Report',
      type: 'operational',
      created: '2024-12-01',
      lastGenerated: '2025-01-06 06:00',
      schedule: 'daily',
      status: 'active',
      subscribers: 15
    },
    {
      id: 'RPT002',
      name: 'Monthly Revenue Analysis',
      type: 'financial',
      created: '2024-11-15',
      lastGenerated: '2025-01-01 23:30',
      schedule: 'monthly',
      status: 'active',
      subscribers: 8
    },
    {
      id: 'RPT003',
      name: 'ICASA Compliance Dashboard',
      type: 'regulatory',
      created: '2024-10-20',
      lastGenerated: '2025-01-05 14:00',
      schedule: 'weekly',
      status: 'active',
      subscribers: 5
    },
    {
      id: 'RPT004',
      name: 'Customer Satisfaction Trends',
      type: 'customer',
      created: '2024-12-10',
      lastGenerated: '2025-01-06 08:30',
      schedule: 'weekly',
      status: 'active',
      subscribers: 12
    }
  ];

  const alertRules: AlertRule[] = [
    {
      id: 'ALERT001',
      metric: 'API Response Time',
      condition: 'greater than',
      threshold: 5000,
      status: 'triggered',
      severity: 'high',
      lastTriggered: '10 min ago'
    },
    {
      id: 'ALERT002',
      metric: 'Revenue Drop',
      condition: 'decrease by',
      threshold: 10,
      status: 'active',
      severity: 'critical',
      lastTriggered: 'Never'
    },
    {
      id: 'ALERT003',
      metric: 'Subscriber Churn Rate',
      condition: 'exceeds',
      threshold: 5,
      status: 'resolved',
      severity: 'medium',
      lastTriggered: '2 days ago'
    },
    {
      id: 'ALERT004',
      metric: 'System Error Rate',
      condition: 'above',
      threshold: 1,
      status: 'triggered',
      severity: 'high',
      lastTriggered: '5 min ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'resolved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'failed':
      case 'triggered':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'paused':
      case 'inactive':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'operational':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'financial':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'regulatory':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'customer':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setDataProcessed(prev => prev + Math.floor(Math.random() * 1000));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Analytics & Reporting Center</h2>
            <p className="text-muted-foreground">Data lineage, custom reports, real-time alerting & business intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <PieChart className="w-4 h-4 mr-2" />
            New Report
          </Button>
          <Badge className="bg-green-100 text-green-800">
            <BarChart3 className="w-4 h-4 mr-1" />
            {dataProcessed.toLocaleString()} Records
          </Badge>
        </div>
      </div>

      {/* Analytics Status Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              Analytics pipeline processing {dataProcessed.toLocaleString()} records - {activeReports} active reports, {alertsTriggered} alerts configured
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                <RefreshCw className="w-3 h-3 mr-1" />
                Real-time
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Processing
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{dataProcessed.toLocaleString()}</div>
            <div className="text-sm text-blue-600">Records Processed</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <LineChart className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-700">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">{activeReports}</div>
            <div className="text-sm text-green-600">Active Reports</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Monitoring
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">{alertsTriggered}</div>
            <div className="text-sm text-purple-600">Alert Rules</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <Badge variant="outline" className="bg-orange-100 text-orange-700">
                Insights
              </Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">98.5%</div>
            <div className="text-sm text-orange-600">Data Quality</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lineage" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="lineage">Data Lineage</TabsTrigger>
          <TabsTrigger value="reports">Custom Reports</TabsTrigger>
          <TabsTrigger value="alerts">Real-time Alerts</TabsTrigger>
          <TabsTrigger value="builder">Report Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="lineage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Data Lineage & Provenance Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataLineages.map((lineage) => (
                  <div key={lineage.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <GitBranch className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{lineage.source}</span>
                        <span className="text-gray-400">→</span>
                        <span className="font-medium">{lineage.destination}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(lineage.status)}>
                          {lineage.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-500">{lineage.lastRun}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Transformations:</span>
                        <div className="font-medium">{lineage.transformations.join(', ')}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Records Processed:</span>
                        <div className="font-medium">{lineage.recordsProcessed.toLocaleString()}</div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View Flow
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                Custom Report Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Input placeholder="Search reports..." className="flex-1" />
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <PieChart className="w-4 h-4 mr-2" />
                  Create Report
                </Button>
              </div>

              <div className="space-y-4">
                {customReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <PieChart className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">{report.name}</span>
                        <Badge variant="outline" className={getTypeColor(report.type)}>
                          {report.type.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(report.status)}>
                          {report.status.toUpperCase()}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Schedule:</span>
                        <div className="font-medium capitalize">{report.schedule}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Created:</span>
                        <div className="font-medium">{report.created}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Generated:</span>
                        <div className="font-medium">{report.lastGenerated}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Subscribers:</span>
                        <div className="font-medium">{report.subscribers}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Real-time Alert Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertRules.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        <span className="font-medium">{alert.metric}</span>
                        <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(alert.status)}>
                          {alert.status.toUpperCase()}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Condition:</span>
                        <div className="font-medium">{alert.condition} {alert.threshold}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Severity:</span>
                        <div className="font-medium capitalize">{alert.severity}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Triggered:</span>
                        <div className="font-medium">{alert.lastTriggered}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <div className="font-medium capitalize">{alert.status}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Revenue Analysis Template</span>
                    <Button variant="outline" size="sm">Use Template</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Metrics Template</span>
                    <Button variant="outline" size="sm">Use Template</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Operational Dashboard</span>
                    <Button variant="outline" size="sm">Use Template</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Regulatory Compliance</span>
                    <Button variant="outline" size="sm">Use Template</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Subscriber Database</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Billing System</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Network Analytics</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Service</span>
                    <Badge className="bg-blue-100 text-blue-800">Available</Badge>
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

export default AnalyticsReportingCenter;