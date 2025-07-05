import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  FileText, 
  Database, 
  Filter, 
  Activity, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  Download,
  Upload,
  Server,
  Phone,
  Wifi,
  MessageSquare,
  Globe
} from 'lucide-react';

interface CDRRecord {
  id: string;
  recordType: 'voice' | 'sms' | 'data' | 'roaming';
  callingParty: string;
  calledParty: string;
  startTime: string;
  duration: number;
  volume: number;
  networkElement: string;
  status: 'processed' | 'pending' | 'failed' | 'duplicate';
  revenue: number;
}

interface MediationRule {
  id: string;
  name: string;
  sourceFormat: string;
  targetFormat: string;
  status: 'active' | 'suspended';
  recordsProcessed: number;
  successRate: number;
}

interface ProcessingMetric {
  timestamp: string;
  recordsReceived: number;
  recordsProcessed: number;
  recordsFailed: number;
  processingRate: number;
}

const CDRProcessingSystem = () => {
  const [processingStatus, setProcessingStatus] = useState('active');
  const [totalRecordsToday, setTotalRecordsToday] = useState(847926);
  const [selectedRecordType, setSelectedRecordType] = useState('all');

  const [recentCDRs] = useState<CDRRecord[]>([
    {
      id: 'CDR001',
      recordType: 'voice',
      callingParty: '+27821234567',
      calledParty: '+27829876543',
      startTime: '10:45:23',
      duration: 180,
      volume: 180,
      networkElement: 'MSC-001',
      status: 'processed',
      revenue: 2.70
    },
    {
      id: 'CDR002',
      recordType: 'data',
      callingParty: '+27825555555',
      calledParty: 'internet',
      startTime: '10:45:25',
      duration: 0,
      volume: 150,
      networkElement: 'GGSN-001',
      status: 'processed',
      revenue: 7.50
    },
    {
      id: 'CDR003',
      recordType: 'sms',
      callingParty: '+27827777777',
      calledParty: '+27821111111',
      startTime: '10:45:27',
      duration: 0,
      volume: 1,
      networkElement: 'SMSC-001',
      status: 'processed',
      revenue: 0.50
    },
    {
      id: 'CDR004',
      recordType: 'roaming',
      callingParty: '+27829999999',
      calledParty: '+441234567890',
      startTime: '10:45:30',
      duration: 120,
      volume: 120,
      networkElement: 'GMSC-001',
      status: 'pending',
      revenue: 0.00
    }
  ]);

  const [mediationRules] = useState<MediationRule[]>([
    {
      id: 'MR001',
      name: 'Ericsson MSC Format',
      sourceFormat: 'ASN.1',
      targetFormat: 'CSV',
      status: 'active',
      recordsProcessed: 45680,
      successRate: 99.2
    },
    {
      id: 'MR002',
      name: 'Nokia SGSN Format',
      sourceFormat: 'GTPP',
      targetFormat: 'XML',
      status: 'active',
      recordsProcessed: 38940,
      successRate: 98.8
    },
    {
      id: 'MR003',
      name: 'Huawei GGSN Format',
      sourceFormat: 'IPDR',
      targetFormat: 'JSON',
      status: 'active',
      recordsProcessed: 52100,
      successRate: 99.5
    }
  ]);

  const processingMetrics: ProcessingMetric[] = [
    { timestamp: '00:00', recordsReceived: 35000, recordsProcessed: 34650, recordsFailed: 350, processingRate: 95.2 },
    { timestamp: '04:00', recordsReceived: 28000, recordsProcessed: 27720, recordsFailed: 280, processingRate: 92.8 },
    { timestamp: '08:00', recordsReceived: 48000, recordsProcessed: 47520, recordsFailed: 480, processingRate: 98.1 },
    { timestamp: '12:00', recordsReceived: 52000, recordsProcessed: 51480, recordsFailed: 520, processingRate: 97.5 },
    { timestamp: '16:00', recordsReceived: 45000, recordsProcessed: 44550, recordsFailed: 450, processingRate: 96.8 },
    { timestamp: '20:00', recordsReceived: 38000, recordsProcessed: 37620, recordsFailed: 380, processingRate: 95.5 },
    { timestamp: '23:59', recordsReceived: 32000, recordsProcessed: 31680, recordsFailed: 320, processingRate: 96.2 }
  ];

  const networkElementData = [
    { element: 'MSC-001', records: 125400, success: 99.1, revenue: 45680 },
    { element: 'MSC-002', records: 98750, success: 98.7, revenue: 38920 },
    { element: 'SGSN-001', records: 156800, success: 99.3, revenue: 67890 },
    { element: 'GGSN-001', records: 189200, success: 99.5, revenue: 89340 },
    { element: 'SMSC-001', records: 234580, success: 98.9, revenue: 11729 },
    { element: 'GMSC-001', records: 67450, success: 97.8, revenue: 78920 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed':
      case 'suspended':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'duplicate':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case 'voice': return <Phone className="w-4 h-4 text-blue-600" />;
      case 'data': return <Wifi className="w-4 h-4 text-green-600" />;
      case 'sms': return <MessageSquare className="w-4 h-4 text-yellow-600" />;
      case 'roaming': return <Globe className="w-4 h-4 text-purple-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRecordsToday(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">CDR Processing & Mediation</h2>
            <p className="text-muted-foreground">Call detail record collection, processing & revenue assurance</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedRecordType} onValueChange={setSelectedRecordType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="voice">Voice</SelectItem>
              <SelectItem value="data">Data</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="roaming">Roaming</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className={getStatusColor(processingStatus)}>
            <Activity className="w-4 h-4 mr-1" />
            {processingStatus.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Processing Status Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              CDR processing system operational - {totalRecordsToday.toLocaleString()} records processed today
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="w-3 h-3 mr-1" />
                98.1% Success Rate
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Processing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Today
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{totalRecordsToday.toLocaleString()}</div>
            <div className="text-sm text-blue-600">Records Processed</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-700">98.1%</div>
            <div className="text-sm text-green-600">Success Rate</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
              <Badge variant="secondary" className="text-xs">
                Real-time
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">2.3s</div>
            <div className="text-sm text-purple-600">Avg Processing Time</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Filter className="w-8 h-8 text-orange-600" />
              <Badge variant="outline" className="bg-orange-100 text-orange-700">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">{mediationRules.length}</div>
            <div className="text-sm text-orange-600">Mediation Rules</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Processing Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Processing Performance (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={processingMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="recordsProcessed" 
                    stackId="1"
                    stroke="#22c55e" 
                    fill="#22c55e" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="recordsFailed" 
                    stackId="1"
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Network Element Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Network Element Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={networkElementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="element" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="records" fill="#3b82f6" />
                  <Bar dataKey="success" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent CDR Records */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Recent CDR Records
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCDRs.map((cdr) => (
                <div key={cdr.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getRecordTypeIcon(cdr.recordType)}
                      <span className="font-medium">{cdr.callingParty}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-sm text-gray-600">{cdr.calledParty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(cdr.status)}>
                        {cdr.status.toUpperCase()}
                      </Badge>
                      {cdr.revenue > 0 && (
                        <span className="text-sm font-medium text-green-600">R{cdr.revenue.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Type:</span> {cdr.recordType.toUpperCase()}
                    </div>
                    <div>
                      <span className="font-medium">Time:</span> {cdr.startTime}
                    </div>
                    <div>
                      <span className="font-medium">Volume:</span> {cdr.volume} {cdr.recordType === 'voice' ? 'sec' : cdr.recordType === 'data' ? 'MB' : 'msg'}
                    </div>
                    <div>
                      <span className="font-medium">Element:</span> {cdr.networkElement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mediation Rules */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Active Mediation Rules
              </CardTitle>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mediationRules.map((rule) => (
                <div key={rule.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">{rule.name}</span>
                    </div>
                    <Badge variant="outline" className={getStatusColor(rule.status)}>
                      {rule.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="font-medium">Source:</span> {rule.sourceFormat}
                    </div>
                    <div>
                      <span className="font-medium">Target:</span> {rule.targetFormat}
                    </div>
                    <div>
                      <span className="font-medium">Processed:</span> {rule.recordsProcessed.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Success Rate:</span> {rule.successRate}%
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Progress value={rule.successRate} className="flex-1 mr-4" />
                    <span className="text-xs text-gray-500">{rule.successRate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CDRProcessingSystem;