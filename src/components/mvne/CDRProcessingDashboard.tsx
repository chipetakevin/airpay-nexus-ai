import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Database, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  FileText,
  Settings,
  BarChart3,
  Zap,
  Download,
  Upload,
  RefreshCw,
  DollarSign,
  Phone,
  MessageSquare,
  Wifi
} from 'lucide-react';

interface CDRRecord {
  id: string;
  cdrId: string;
  mnoProvider: string;
  recordType: 'voice' | 'sms' | 'data' | 'mms';
  callingParty: string;
  calledParty: string;
  startTime: string;
  endTime: string;
  duration: number;
  dataVolume?: number;
  amount: number;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  billingStatus: 'pending' | 'billed' | 'failed';
}

interface CDRStats {
  provider: string;
  totalRecords: number;
  processedRecords: number;
  failedRecords: number;
  processingTime: number;
  revenue: number;
  errorRate: number;
  throughput: number;
}

const CDRProcessingDashboard = () => {
  const [cdrRecords, setCdrRecords] = useState<CDRRecord[]>([]);
  const [cdrStats, setCdrStats] = useState<CDRStats[]>([]);
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    setCdrStats([
      {
        provider: 'MTN',
        totalRecords: 245000,
        processedRecords: 244127,
        failedRecords: 873,
        processingTime: 2.3,
        revenue: 67543.21,
        errorRate: 0.36,
        throughput: 1200
      },
      {
        provider: 'Vodacom',
        totalRecords: 189000,
        processedRecords: 188456,
        failedRecords: 544,
        processingTime: 1.8,
        revenue: 52789.45,
        errorRate: 0.29,
        throughput: 1450
      },
      {
        provider: 'Cell C',
        totalRecords: 98000,
        processedRecords: 97324,
        failedRecords: 676,
        processingTime: 3.1,
        revenue: 23456.78,
        errorRate: 0.69,
        throughput: 890
      },
      {
        provider: 'Telkom',
        totalRecords: 67000,
        processedRecords: 66789,
        failedRecords: 211,
        processingTime: 2.7,
        revenue: 18234.56,
        errorRate: 0.32,
        throughput: 750
      }
    ]);

    setCdrRecords([
      {
        id: '1',
        cdrId: 'CDR001234567',
        mnoProvider: 'MTN',
        recordType: 'voice',
        callingParty: '+27821234567',
        calledParty: '+27829876543',
        startTime: '2024-01-08 14:30:15',
        endTime: '2024-01-08 14:35:23',
        duration: 308,
        amount: 15.40,
        processingStatus: 'completed',
        billingStatus: 'billed'
      },
      {
        id: '2',
        cdrId: 'CDR001234568',
        mnoProvider: 'Vodacom',
        recordType: 'data',
        callingParty: '+27831234567',
        calledParty: '',
        startTime: '2024-01-08 14:25:00',
        endTime: '2024-01-08 14:35:00',
        duration: 600,
        dataVolume: 45.6,
        amount: 8.90,
        processingStatus: 'completed',
        billingStatus: 'billed'
      },
      {
        id: '3',
        cdrId: 'CDR001234569',
        mnoProvider: 'Cell C',
        recordType: 'sms',
        callingParty: '+27841234567',
        calledParty: '+27849876543',
        startTime: '2024-01-08 14:20:12',
        endTime: '2024-01-08 14:20:15',
        duration: 3,
        amount: 0.50,
        processingStatus: 'processing',
        billingStatus: 'pending'
      },
      {
        id: '4',
        cdrId: 'CDR001234570',
        mnoProvider: 'Telkom',
        recordType: 'voice',
        callingParty: '+27871234567',
        calledParty: '+27879876543',
        startTime: '2024-01-08 14:15:00',
        endTime: '2024-01-08 14:18:45',
        duration: 225,
        amount: 11.25,
        processingStatus: 'failed',
        billingStatus: 'failed'
      }
    ]);
  }, []);

  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case 'voice': return <Phone className="w-4 h-4" />;
      case 'sms': return <MessageSquare className="w-4 h-4" />;
      case 'data': return <Wifi className="w-4 h-4" />;
      case 'mms': return <FileText className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'billed': return 'bg-green-100 text-green-800';
      case 'processing':
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalStats = cdrStats.reduce((acc, stat) => ({
    totalRecords: acc.totalRecords + stat.totalRecords,
    processedRecords: acc.processedRecords + stat.processedRecords,
    failedRecords: acc.failedRecords + stat.failedRecords,
    revenue: acc.revenue + stat.revenue,
    avgProcessingTime: (acc.avgProcessingTime + stat.processingTime) / 2,
    avgThroughput: (acc.avgThroughput + stat.throughput) / 2
  }), { totalRecords: 0, processedRecords: 0, failedRecords: 0, revenue: 0, avgProcessingTime: 0, avgThroughput: 0 });

  const processNewBatch = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Simulate processing completion
    }, 3000);
  };

  const filteredRecords = selectedProvider === 'all' 
    ? cdrRecords 
    : cdrRecords.filter(record => record.mnoProvider === selectedProvider);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CDR Processing System</h1>
          <p className="text-gray-600">Real-time call detail record processing and billing automation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={processNewBatch} disabled={isProcessing}>
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Zap className="w-4 h-4 mr-2" />
            )}
            Process New Batch
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalStats.totalRecords / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +8.2% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((totalStats.processedRecords / totalStats.totalRecords) * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Success rate today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R{(totalStats.revenue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +12.5% increase
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Throughput</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.avgThroughput.toFixed(0)}/s</div>
            <p className="text-xs text-muted-foreground">
              Records per second
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="records">CDR Records</TabsTrigger>
          <TabsTrigger value="providers">MNO Providers</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Processing Status by Provider */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Status by MNO Provider</CardTitle>
              <CardDescription>Real-time CDR processing status across all providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {cdrStats.map((stat) => (
                  <div key={stat.provider} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                          <Database className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{stat.provider}</h3>
                          <p className="text-sm text-gray-600">
                            {stat.processedRecords.toLocaleString()} / {stat.totalRecords.toLocaleString()} records
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">R{stat.revenue.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{stat.errorRate}% error rate</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                        <Progress value={(stat.processedRecords / stat.totalRecords) * 100} className="h-2" />
                        <div className="text-xs text-gray-500 mt-1">
                          {((stat.processedRecords / stat.totalRecords) * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Processing Time</div>
                        <div className="text-lg font-semibold">{stat.processingTime}s</div>
                        <div className="text-xs text-gray-500">Average</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Throughput</div>
                        <div className="text-lg font-semibold">{stat.throughput}/s</div>
                        <div className="text-xs text-gray-500">Records</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Failed Records</div>
                        <div className="text-lg font-semibold text-red-600">{stat.failedRecords}</div>
                        <div className="text-xs text-gray-500">Need retry</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Processing Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Processing Activity</CardTitle>
              <CardDescription>Latest CDR processing batches and results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: '14:30:00', provider: 'MTN', records: 15000, status: 'completed', revenue: 4567.89 },
                  { time: '14:25:00', provider: 'Vodacom', records: 12000, status: 'completed', revenue: 3890.45 },
                  { time: '14:20:00', provider: 'Cell C', records: 8500, status: 'processing', revenue: 0 },
                  { time: '14:15:00', provider: 'Telkom', records: 6000, status: 'completed', revenue: 1789.23 }
                ].map((batch, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        batch.status === 'completed' ? 'bg-green-100 text-green-600' :
                        batch.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {batch.status === 'completed' ? <CheckCircle className="w-4 h-4" /> :
                         batch.status === 'processing' ? <RefreshCw className="w-4 h-4 animate-spin" /> :
                         <AlertTriangle className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-semibold">{batch.provider} Batch</h4>
                        <p className="text-sm text-gray-600">
                          {batch.records.toLocaleString()} records • {batch.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(batch.status)}>
                        {batch.status}
                      </Badge>
                      {batch.revenue > 0 && (
                        <div className="text-sm text-gray-600 mt-1">
                          R{batch.revenue.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          {/* Filter */}
          <div className="flex gap-4">
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                <SelectItem value="MTN">MTN</SelectItem>
                <SelectItem value="Vodacom">Vodacom</SelectItem>
                <SelectItem value="Cell C">Cell C</SelectItem>
                <SelectItem value="Telkom">Telkom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* CDR Records Table */}
          <Card>
            <CardHeader>
              <CardTitle>CDR Records</CardTitle>
              <CardDescription>Individual call detail records and processing status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-full">
                          {getRecordTypeIcon(record.recordType)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{record.cdrId}</h4>
                          <p className="text-sm text-gray-600">
                            {record.mnoProvider} • {record.recordType.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">R{record.amount.toFixed(2)}</div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(record.processingStatus)}>
                            {record.processingStatus}
                          </Badge>
                          <Badge className={getStatusColor(record.billingStatus)}>
                            {record.billingStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">From:</span>
                        <div className="font-medium">{record.callingParty}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">To:</span>
                        <div className="font-medium">{record.calledParty || 'Data Session'}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <div className="font-medium">
                          {record.recordType === 'data' ? 
                            `${record.dataVolume?.toFixed(1)} MB` : 
                            `${Math.floor(record.duration / 60)}:${(record.duration % 60).toString().padStart(2, '0')}`
                          }
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Time:</span>
                        <div className="font-medium">{record.startTime}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cdrStats.map((stat) => (
              <Card key={stat.provider}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {stat.provider}
                    <Badge variant="default">Active</Badge>
                  </CardTitle>
                  <CardDescription>Processing configuration and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Records</span>
                        <div className="text-lg font-semibold">{stat.totalRecords.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Success Rate</span>
                        <div className="text-lg font-semibold text-green-600">
                          {((stat.processedRecords / stat.totalRecords) * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Revenue</span>
                        <div className="text-lg font-semibold">R{stat.revenue.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Throughput</span>
                        <div className="text-lg font-semibold">{stat.throughput}/s</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="w-4 h-4 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CDR Processing Configuration</CardTitle>
              <CardDescription>System-wide processing settings and optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Processing Settings</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Batch Size</span>
                        <span className="font-medium">1,000 records</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Processing Frequency</span>
                        <span className="font-medium">Real-time</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Error Handling</span>
                        <span className="font-medium">Retry with DLQ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Data Retention</span>
                        <span className="font-medium">365 days</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Security Settings</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Encryption</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Compression</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Data Masking</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Audit Logging</span>
                        <Badge variant="default">Full</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button>
                    <Settings className="w-4 h-4 mr-2" />
                    Update Configuration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CDRProcessingDashboard;