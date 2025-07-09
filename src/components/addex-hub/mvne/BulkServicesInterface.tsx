import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  Upload, Download, FileText, Filter, Search, CheckCircle,
  AlertTriangle, Clock, Play, Pause, RefreshCw, Eye,
  BarChart3, Users, CreditCard, Zap, Database
} from 'lucide-react';

interface BulkServiceRecord {
  id: string;
  msisdn: string;
  code: string;
  value: string;
  validityDays: number;
  transactionId?: string;
  chargeAmount: number;
  processed: string;
  created: string;
  response: string;
  status: 'completed' | 'processing' | 'failed' | 'pending';
}

export const BulkServicesInterface: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [itemsPerPage, setItemsPerPage] = useState('20');

  const [bulkServiceRecords] = useState<BulkServiceRecord[]>([
    {
      id: 'BS001',
      msisdn: '+27821234567',
      code: 'Exec Divine R75',
      value: 'Divine R75',
      validityDays: 31,
      transactionId: 'TXN001234',
      chargeAmount: 49,
      processed: '2025-07-08 15:27:39',
      created: '2025-07-08 15:27:00',
      response: 'Success',
      status: 'completed'
    },
    {
      id: 'BS002',
      msisdn: '+27821234568',
      code: 'Exec Divine R150',
      value: 'Divine R150',
      validityDays: 31,
      transactionId: 'TXN001235',
      chargeAmount: 99,
      processed: '2025-07-08 15:27:45',
      created: '2025-07-08 15:27:05',
      response: 'Success',
      status: 'completed'
    },
    {
      id: 'BS003',
      msisdn: '+27821234569',
      code: 'Exec Divine R300',
      value: 'Divine R300',
      validityDays: 31,
      chargeAmount: 199,
      processed: '2025-07-08 15:28:12',
      created: '2025-07-08 15:27:10',
      response: 'Success',
      status: 'completed'
    },
    {
      id: 'BS004',
      msisdn: '+27821234570',
      code: 'Exec Divine R75',
      value: 'Divine R75',
      validityDays: 31,
      chargeAmount: 49,
      processed: '',
      created: '2025-07-08 15:29:00',
      response: 'Processing',
      status: 'processing'
    },
    {
      id: 'BS005',
      msisdn: '+27821234571',
      code: 'Exec Divine R500',
      value: 'Divine R500',
      validityDays: 31,
      chargeAmount: 329,
      processed: '',
      created: '2025-07-08 15:29:05',
      response: 'Failed - Insufficient Balance',
      status: 'failed'
    }
  ]);

  const [bulkOperationStats] = useState({
    totalRecords: 32,
    processed: 28,
    successful: 26,
    failed: 2,
    pending: 4,
    successRate: 92.9,
    totalRevenue: 1547.50
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing': return <Play className="w-4 h-4 text-blue-600" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'processing': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredRecords = bulkServiceRecords.filter(record => {
    const matchesSearch = record.msisdn.includes(searchQuery) ||
                         record.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.value.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleFileUpload = () => {
    toast({
      title: "Template Downloaded",
      description: "Bulk services template has been downloaded successfully.",
    });
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: `Bulk ${action}`,
      description: `Bulk ${action} operation initiated for selected records.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation Cards - Following USSD Manager Pattern */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-blue-900">Template Manager</h3>
            <p className="text-sm text-blue-700 mt-1">Download & configure templates</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900">Analytics</h3>
            <p className="text-sm text-gray-700 mt-1">Performance metrics</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900">Processing</h3>
            <p className="text-sm text-gray-700 mt-1">Monitor operations</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900">Settings</h3>
            <p className="text-sm text-gray-700 mt-1">Configure parameters</p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Database className="w-5 h-5 text-blue-600" />
              <Badge className="bg-blue-500">Total</Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{bulkOperationStats.totalRecords}</div>
            <div className="text-sm text-blue-600">Records</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <Badge className="bg-purple-500">Processed</Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">{bulkOperationStats.processed}</div>
            <div className="text-sm text-purple-600">Completed</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <Badge className="bg-green-500">Success</Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">{bulkOperationStats.successful}</div>
            <div className="text-sm text-green-600">Successful</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <Badge className="bg-red-500">Failed</Badge>
            </div>
            <div className="text-2xl font-bold text-red-700">{bulkOperationStats.failed}</div>
            <div className="text-sm text-red-600">Failed</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <Badge className="bg-yellow-500">Pending</Badge>
            </div>
            <div className="text-2xl font-bold text-yellow-700">{bulkOperationStats.pending}</div>
            <div className="text-sm text-yellow-600">Pending</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-5 h-5 text-teal-600" />
              <Badge className="bg-teal-500">Rate</Badge>
            </div>
            <div className="text-2xl font-bold text-teal-700">{bulkOperationStats.successRate}%</div>
            <div className="text-sm text-teal-600">Success</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              <Badge className="bg-indigo-500">Revenue</Badge>
            </div>
            <div className="text-2xl font-bold text-indigo-700">R{bulkOperationStats.totalRevenue}</div>
            <div className="text-sm text-indigo-600">Total</div>
          </CardContent>
        </Card>
      </div>

      {/* Template Manager Section */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-900">Template Manager</CardTitle>
          <p className="text-blue-700">Download templates and upload bulk service files</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button 
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
              onClick={handleFileUpload}
            >
              <Play className="w-4 h-4 mr-2" />
              Test Template
            </Button>
          </div>
          <div className="flex gap-4">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleFileUpload}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload New Operation Section */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-900">Upload New Bulk Operation</h3>
              <p className="text-green-700">Upload CSV files to process bulk service operations and configure their behavior</p>
            </div>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleFileUpload}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search & Filter Operations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by MSISDN, Code"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
                <SelectItem value="100">100 per page</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Current Operations Section */}
      <Card>
        <CardHeader className="border-b border-border/10">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            <CardTitle>Current Operations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Enhanced Data Table */}
          <div className="overflow-hidden rounded-2xl border border-border/20">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-background">
                <thead>
                  <tr className="border-b border-border/20 bg-muted/30">
                    <th className="text-left p-4 font-semibold text-foreground">Status</th>
                    <th className="text-left p-4 font-semibold text-foreground">MSISDN</th>
                    <th className="text-left p-4 font-semibold text-foreground">Code</th>
                    <th className="text-left p-4 font-semibold text-foreground">Value</th>
                    <th className="text-left p-4 font-semibold text-foreground">Validity Days</th>
                    <th className="text-left p-4 font-semibold text-foreground">Transaction ID</th>
                    <th className="text-left p-4 font-semibold text-foreground">Charge Amount</th>
                    <th className="text-left p-4 font-semibold text-foreground">Processed</th>
                    <th className="text-left p-4 font-semibold text-foreground">Created</th>
                    <th className="text-left p-4 font-semibold text-foreground">Response</th>
                    <th className="text-left p-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr 
                      key={record.id} 
                      className={`border-b border-border/10 hover:bg-muted/20 transition-colors duration-200 ${
                        index % 2 === 0 ? 'bg-background' : 'bg-muted/5'
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(record.status)}
                          <Badge 
                            className={`${getStatusColor(record.status)} text-white font-medium px-3 py-1 rounded-full text-sm`}
                          >
                            {record.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-sm font-medium text-foreground">
                          {record.msisdn}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-foreground">
                          {record.code}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-foreground">
                          {record.value}
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant="outline" 
                          className="border-primary/20 text-primary bg-primary/5 font-medium"
                        >
                          {record.validityDays} DAYS
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-sm text-muted-foreground">
                          {record.transactionId || "null"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-lg text-foreground">
                          R{record.chargeAmount}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-muted-foreground">
                          {record.processed || "-"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-muted-foreground">
                          {record.created}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`text-sm font-medium ${
                          record.status === 'completed' ? 'text-green-600' : 
                          record.status === 'failed' ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          {record.response}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0 rounded-lg border-border/50 hover:bg-muted hover:border-primary/30 transition-all duration-200"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          {record.status === 'failed' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 rounded-lg border-border/50 hover:bg-muted hover:border-primary/30 transition-all duration-200"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/20">
            <div className="text-sm text-muted-foreground font-medium">
              Showing {filteredRecords.length} record(s) found
            </div>
            <div className="text-sm text-muted-foreground">
              File: <span className="font-mono text-foreground">080725 Bulk Services Cullinan & Nellmapius.xlsx</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};