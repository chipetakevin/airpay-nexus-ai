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

      {/* Bulk Services Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              Bulk Service Operations
            </CardTitle>
            <div className="flex gap-2">
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Template
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by MSISDN, Code, or Value..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
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
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
                <SelectItem value="100">100 per page</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">MSISDN</th>
                  <th className="text-left p-3 font-medium">Code</th>
                  <th className="text-left p-3 font-medium">Value</th>
                  <th className="text-left p-3 font-medium">Validity Days</th>
                  <th className="text-left p-3 font-medium">Transaction ID</th>
                  <th className="text-left p-3 font-medium">Charge Amount</th>
                  <th className="text-left p-3 font-medium">Processed</th>
                  <th className="text-left p-3 font-medium">Created</th>
                  <th className="text-left p-3 font-medium">Response</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-sm">{record.msisdn}</td>
                    <td className="p-3">{record.code}</td>
                    <td className="p-3">{record.value}</td>
                    <td className="p-3">
                      <Badge variant="outline">{record.validityDays} DAYS</Badge>
                    </td>
                    <td className="p-3 font-mono text-sm">{record.transactionId || 'null'}</td>
                    <td className="p-3 font-semibold">R{record.chargeAmount}</td>
                    <td className="p-3 text-sm">{record.processed || '-'}</td>
                    <td className="p-3 text-sm">{record.created}</td>
                    <td className="p-3">
                      <span className={`text-sm ${record.status === 'completed' ? 'text-green-600' : 
                        record.status === 'failed' ? 'text-red-600' : 'text-blue-600'}`}>
                        {record.response}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        {record.status === 'failed' && (
                          <Button size="sm" variant="outline">
                            <RefreshCw className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {filteredRecords.length} record(s) found
            </div>
            <div className="text-sm text-gray-600">
              File: <span className="font-mono">080725 Bulk Services Cullinan & Nellmapius.xlsx</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};