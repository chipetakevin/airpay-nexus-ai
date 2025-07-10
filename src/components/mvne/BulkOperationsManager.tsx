import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Download,
  Play,
  Pause,
  Settings,
  Users,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SecureUploadManager } from '@/components/addex-hub/upload/SecureUploadManager';

interface BulkOperation {
  id: string;
  name: string;
  type: 'service_activation' | 'customer_onboarding' | 'plan_change' | 'bulk_sms';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'paused';
  progress: number;
  totalRecords: number;
  processedRecords: number;
  successfulRecords: number;
  failedRecords: number;
  uploadedAt: string;
  startedAt?: string;
  completedAt?: string;
  estimatedCompletion?: string;
}

const BulkOperationsManager = () => {
  const { toast } = useToast();
  const [operations, setOperations] = useState<BulkOperation[]>([
    {
      id: 'op-001',
      name: 'Voice Service Activation Batch 1',
      type: 'service_activation',
      status: 'processing',
      progress: 65,
      totalRecords: 10000,
      processedRecords: 6500,
      successfulRecords: 6450,
      failedRecords: 50,
      uploadedAt: '2024-01-15T10:30:00Z',
      startedAt: '2024-01-15T10:35:00Z',
      estimatedCompletion: '2024-01-15T12:15:00Z'
    },
    {
      id: 'op-002',
      name: 'Customer Onboarding Q1',
      type: 'customer_onboarding',
      status: 'completed',
      progress: 100,
      totalRecords: 5000,
      processedRecords: 5000,
      successfulRecords: 4987,
      failedRecords: 13,
      uploadedAt: '2024-01-14T09:00:00Z',
      startedAt: '2024-01-14T09:05:00Z',
      completedAt: '2024-01-14T11:30:00Z'
    },
    {
      id: 'op-003',
      name: 'Premium Plan Migration',
      type: 'plan_change',
      status: 'pending',
      progress: 0,
      totalRecords: 2500,
      processedRecords: 0,
      successfulRecords: 0,
      failedRecords: 0,
      uploadedAt: '2024-01-15T14:20:00Z'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Activity className="h-4 w-4 animate-spin" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartOperation = (id: string) => {
    setOperations(ops => ops.map(op => 
      op.id === id 
        ? { ...op, status: 'processing' as const, startedAt: new Date().toISOString() }
        : op
    ));
    toast({
      title: "Operation Started",
      description: "Bulk operation has been started and is now processing.",
    });
  };

  const handlePauseOperation = (id: string) => {
    setOperations(ops => ops.map(op => 
      op.id === id 
        ? { ...op, status: 'paused' as const }
        : op
    ));
    toast({
      title: "Operation Paused",
      description: "Bulk operation has been paused and can be resumed later.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const calculateStats = () => {
    const totalOperations = operations.length;
    const processingOperations = operations.filter(op => op.status === 'processing').length;
    const completedOperations = operations.filter(op => op.status === 'completed').length;
    const failedOperations = operations.filter(op => op.status === 'failed').length;
    
    return { totalOperations, processingOperations, completedOperations, failedOperations };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Bulk Operations Manager
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Monitor and manage bulk service operations, track progress, and handle large-scale telecommunications processes
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.totalOperations}</p>
                <p className="text-xs text-muted-foreground">Total Operations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500 animate-pulse" />
              <div>
                <p className="text-2xl font-bold">{stats.processingOperations}</p>
                <p className="text-xs text-muted-foreground">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.completedOperations}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{stats.failedOperations}</p>
                <p className="text-xs text-muted-foreground">Failed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="operations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="operations">Active Operations</TabsTrigger>
          <TabsTrigger value="upload">Upload New</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="operations" className="space-y-4">
          <div className="space-y-4">
            {operations.map((operation) => (
              <Card key={operation.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{operation.name}</CardTitle>
                      <CardDescription>
                        {operation.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} • 
                        Uploaded {formatDate(operation.uploadedAt)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(operation.status)}>
                        {getStatusIcon(operation.status)}
                        <span className="ml-1 capitalize">{operation.status}</span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{operation.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          operation.status === 'completed' ? 'bg-green-500' :
                          operation.status === 'failed' ? 'bg-red-500' :
                          operation.status === 'processing' ? 'bg-blue-500' :
                          'bg-gray-400'
                        }`}
                        style={{ width: `${operation.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-lg font-semibold">{operation.totalRecords.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Total Records</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold">{operation.processedRecords.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Processed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-green-600">{operation.successfulRecords.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Successful</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-red-600">{operation.failedRecords.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Failed</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    {operation.status === 'pending' && (
                      <Button 
                        onClick={() => handleStartOperation(operation.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Operation
                      </Button>
                    )}
                    {operation.status === 'processing' && (
                      <Button 
                        onClick={() => handlePauseOperation(operation.id)}
                        variant="outline"
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <SecureUploadManager />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operation History</CardTitle>
              <CardDescription>
                View completed and archived bulk operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4" />
                <p>Operation history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BulkOperationsManager;