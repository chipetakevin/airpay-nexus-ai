import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/hooks/use-toast';
import { 
  Database, 
  Download, 
  FileText, 
  Filter, 
  Play, 
  Pause, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Settings,
  Eye,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExtractionJob {
  id: string;
  name: string;
  dataSource: string;
  extractionType: 'full' | 'incremental' | 'realtime';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused';
  progress: number;
  recordsExtracted: number;
  totalRecords: number;
  startTime?: string;
  endTime?: string;
  lastRun?: string;
  schedule?: string;
  createdBy: string;
  filters?: any;
}

interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file';
  description: string;
  tables: string[];
  status: 'connected' | 'disconnected' | 'error';
}

const MOCK_DATA_SOURCES: DataSource[] = [
  {
    id: '1',
    name: 'Contractor Database',
    type: 'database',
    description: 'Main contractor profiles and feature access data',
    tables: ['contractor_profiles', 'contractor_feature_access', 'feature_access_logs'],
    status: 'connected'
  },
  {
    id: '2',
    name: 'Compliance System',
    type: 'database', 
    description: 'RICA registrations and compliance records',
    tables: ['rica_registrations', 'compliance_monitoring', 'rica_audit_logs'],
    status: 'connected'
  },
  {
    id: '3',
    name: 'Transaction Data',
    type: 'database',
    description: 'OneCard transactions and cashback records',
    tables: ['transactions', 'cashback_transactions', 'onecard_accounts'],
    status: 'connected'
  }
];

const MOCK_EXTRACTION_JOBS: ExtractionJob[] = [
  {
    id: '1',
    name: 'Daily Contractor Reports',
    dataSource: 'Contractor Database',
    extractionType: 'incremental',
    status: 'completed',
    progress: 100,
    recordsExtracted: 1247,
    totalRecords: 1247,
    lastRun: new Date().toISOString(),
    schedule: 'Daily at 6:00 AM',
    createdBy: 'admin'
  },
  {
    id: '2',
    name: 'RICA Compliance Extract',
    dataSource: 'Compliance System',
    extractionType: 'full',
    status: 'running',
    progress: 65,
    recordsExtracted: 832,
    totalRecords: 1280,
    startTime: new Date(Date.now() - 300000).toISOString(),
    createdBy: 'admin'
  }
];

export const DataExtractionSystem: React.FC = () => {
  const { hasRole } = usePermissions();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('sources');
  const [dataSources, setDataSources] = useState<DataSource[]>(MOCK_DATA_SOURCES);
  const [extractionJobs, setExtractionJobs] = useState<ExtractionJob[]>(MOCK_EXTRACTION_JOBS);
  const [selectedSource, setSelectedSource] = useState('');
  const [extractionType, setExtractionType] = useState<'full' | 'incremental' | 'realtime'>('incremental');
  const [jobName, setJobName] = useState('');
  const [isCreatingJob, setIsCreatingJob] = useState(false);

  const isAdmin = hasRole(['admin', 'manager']);
  const isContractor = hasRole('contractor');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-toggle-enabled" />;
      case 'running':
        return <RefreshCw className="h-4 w-4 text-feature-pending-text animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-feature-enabled-bg border-feature-enabled-border text-feature-enabled-text';
      case 'running':
        return 'bg-feature-pending-bg border-feature-pending-border text-feature-pending-text';
      case 'failed':
        return 'bg-destructive/10 border-destructive text-destructive';
      case 'paused':
        return 'bg-muted border-muted-foreground/20 text-muted-foreground';
      default:
        return 'bg-muted border-muted-foreground/20';
    }
  };

  const createExtractionJob = async () => {
    if (!jobName || !selectedSource) {
      toast({
        title: "Error",
        description: "Please provide job name and select a data source",
        variant: "destructive"
      });
      return;
    }

    setIsCreatingJob(true);
    
    try {
      const newJob: ExtractionJob = {
        id: Date.now().toString(),
        name: jobName,
        dataSource: selectedSource,
        extractionType,
        status: 'pending',
        progress: 0,
        recordsExtracted: 0,
        totalRecords: 0,
        createdBy: 'current_user'
      };

      setExtractionJobs(prev => [newJob, ...prev]);
      
      toast({
        title: "Success",
        description: "Extraction job created successfully",
      });

      // Reset form
      setJobName('');
      setSelectedSource('');
      setExtractionType('incremental');
      setActiveTab('jobs');

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create extraction job",
        variant: "destructive"
      });
    } finally {
      setIsCreatingJob(false);
    }
  };

  const runExtractionJob = async (jobId: string) => {
    console.log('Running extraction job:', jobId);
    toast({
      title: "Job Started",
      description: "Extraction job has been started",
    });
  };

  const pauseExtractionJob = async (jobId: string) => {
    console.log('Pausing extraction job:', jobId);
    toast({
      title: "Job Paused",
      description: "Extraction job has been paused",
    });
  };

  if (!isAdmin && !isContractor) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Access denied. This section requires appropriate permissions.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Database className="h-6 w-6" />
            <span>Data Extraction System</span>
          </h1>
          <p className="text-muted-foreground">
            Extract, process, and export data with automated workflows and monitoring
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sources" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Data Sources</span>
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            <span className="hidden sm:inline">Extraction Jobs</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Create Job</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataSources.map(source => (
              <Card key={source.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{source.name}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs",
                        source.status === 'connected' 
                          ? "bg-feature-enabled-bg border-feature-enabled-border text-feature-enabled-text"
                          : "bg-destructive/10 border-destructive text-destructive"
                      )}
                    >
                      {source.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{source.description}</p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Available Tables:</div>
                    <div className="flex flex-wrap gap-1">
                      {source.tables.map(table => (
                        <Badge key={table} variant="outline" className="text-xs">
                          {table}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="mt-6">
          <div className="space-y-4">
            {extractionJobs.map(job => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(job.status)}
                      <div>
                        <h4 className="font-medium">{job.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Source: {job.dataSource} • Type: {job.extractionType}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={cn("text-xs", getStatusColor(job.status))}>
                        {job.status}
                      </Badge>
                      
                      {isAdmin && (
                        <div className="flex space-x-1">
                          {job.status === 'pending' || job.status === 'paused' ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => runExtractionJob(job.id)}
                            >
                              <Play className="h-3 w-3" />
                            </Button>
                          ) : job.status === 'running' ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => pauseExtractionJob(job.id)}
                            >
                              <Pause className="h-3 w-3" />
                            </Button>
                          ) : null}
                          
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {job.status === 'running' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <Progress value={job.progress} className="h-2" />
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Records Extracted</div>
                      <div className="text-muted-foreground">{job.recordsExtracted.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="font-medium">Total Records</div>
                      <div className="text-muted-foreground">{job.totalRecords.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="font-medium">Last Run</div>
                      <div className="text-muted-foreground">
                        {job.lastRun ? new Date(job.lastRun).toLocaleDateString() : 'Never'}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Schedule</div>
                      <div className="text-muted-foreground">{job.schedule || 'Manual'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          {isAdmin ? (
            <Card>
              <CardHeader>
                <CardTitle>Create Extraction Job</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Job Name</label>
                  <Input
                    placeholder="Enter job name"
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Data Source</label>
                  <Select value={selectedSource} onValueChange={setSelectedSource}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataSources.map(source => (
                        <SelectItem key={source.id} value={source.name}>
                          {source.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Extraction Type</label>
                  <Select value={extractionType} onValueChange={(value: any) => setExtractionType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Extraction</SelectItem>
                      <SelectItem value="incremental">Incremental</SelectItem>
                      <SelectItem value="realtime">Real-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={createExtractionJob}
                  disabled={isCreatingJob}
                  className="w-full"
                >
                  {isCreatingJob ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Creating Job...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Create Extraction Job
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Only administrators can create extraction jobs.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};