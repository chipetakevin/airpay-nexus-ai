import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface MigrationStatus {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused';
  progress: number;
  recordsProcessed: number;
  totalRecords: number;
  errors: number;
  startTime?: Date;
  endTime?: Date;
  errorDetails?: string[];
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  recordCount: number;
  duplicates: number;
}

const DataMigrationEngine: React.FC = () => {
  const { toast } = useToast();
  const [activeMigrations, setActiveMigrations] = useState<MigrationStatus[]>([]);
  const [validationResults, setValidationResults] = useState<Record<string, ValidationResult>>({});
  const [systemHealth, setSystemHealth] = useState({
    cpuUsage: 45,
    memoryUsage: 67,
    diskSpace: 23,
    networkLatency: 12
  });

  // Mock migration jobs
  const migrationJobs: MigrationStatus[] = [
    {
      id: 'mtn-customers',
      name: 'MTN Customer Data Migration',
      status: 'completed',
      progress: 100,
      recordsProcessed: 15420,
      totalRecords: 15420,
      errors: 0,
      startTime: new Date(Date.now() - 3600000),
      endTime: new Date(Date.now() - 1800000)
    },
    {
      id: 'vodacom-sims',
      name: 'Vodacom SIM Inventory Migration',
      status: 'running',
      progress: 73,
      recordsProcessed: 8760,
      totalRecords: 12000,
      errors: 3,
      startTime: new Date(Date.now() - 1200000),
      errorDetails: ['Invalid ICCID format in record 1247', 'Duplicate SIM serial in record 3421', 'Missing network provider in record 5632']
    },
    {
      id: 'telkom-billing',
      name: 'Telkom Billing Records Migration',
      status: 'pending',
      progress: 0,
      recordsProcessed: 0,
      totalRecords: 45230,
      errors: 0
    },
    {
      id: 'cell-c-vendors',
      name: 'Cell C Vendor Data Migration',
      status: 'failed',
      progress: 28,
      recordsProcessed: 1120,
      totalRecords: 4000,
      errors: 47,
      startTime: new Date(Date.now() - 2700000),
      errorDetails: ['Database connection timeout', 'Invalid vendor registration format', 'Missing compliance documents']
    }
  ];

  useEffect(() => {
    setActiveMigrations(migrationJobs);
    
    // Mock validation results
    setValidationResults({
      'mtn-customers': {
        isValid: true,
        errors: [],
        warnings: ['2 records have incomplete address information'],
        recordCount: 15420,
        duplicates: 0
      },
      'vodacom-sims': {
        isValid: false,
        errors: ['3 records with invalid ICCID format', '1 duplicate SIM serial number'],
        warnings: ['12 SIMs nearing expiry date'],
        recordCount: 12000,
        duplicates: 1
      },
      'cell-c-vendors': {
        isValid: false,
        errors: ['47 records missing required compliance documents', 'Invalid bank details format'],
        warnings: ['Some vendors missing B-BBEE certificates'],
        recordCount: 4000,
        duplicates: 8
      }
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      setActiveMigrations(prev => prev.map(migration => {
        if (migration.status === 'running') {
          const newProgress = Math.min(migration.progress + Math.random() * 5, 100);
          const newProcessed = Math.floor((newProgress / 100) * migration.totalRecords);
          
          return {
            ...migration,
            progress: newProgress,
            recordsProcessed: newProcessed,
            ...(newProgress >= 100 ? { status: 'completed' as const, endTime: new Date() } : {})
          };
        }
        return migration;
      }));

      // Update system health
      setSystemHealth(prev => ({
        cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        diskSpace: Math.max(10, Math.min(50, prev.diskSpace + (Math.random() - 0.5) * 3)),
        networkLatency: Math.max(5, Math.min(30, prev.networkLatency + (Math.random() - 0.5) * 5))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'running':
        return 'secondary';
      case 'failed':
        return 'destructive';
      case 'paused':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'running':
        return 'text-blue-600';
      case 'failed':
        return 'text-red-600';
      case 'paused':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const startMigration = (migrationId: string) => {
    setActiveMigrations(prev => 
      prev.map(migration => 
        migration.id === migrationId 
          ? { ...migration, status: 'running', startTime: new Date() }
          : migration
      )
    );
    
    toast({
      title: "Migration Started",
      description: `Started migration job: ${migrationId}`,
    });
  };

  const pauseMigration = (migrationId: string) => {
    setActiveMigrations(prev => 
      prev.map(migration => 
        migration.id === migrationId 
          ? { ...migration, status: 'paused' }
          : migration
      )
    );
    
    toast({
      title: "Migration Paused",
      description: `Paused migration job: ${migrationId}`,
    });
  };

  const retryMigration = (migrationId: string) => {
    setActiveMigrations(prev => 
      prev.map(migration => 
        migration.id === migrationId 
          ? { ...migration, status: 'running', progress: 0, recordsProcessed: 0, errors: 0, startTime: new Date(), errorDetails: [] }
          : migration
      )
    );
    
    toast({
      title: "Migration Retrying",
      description: `Retrying migration job: ${migrationId}`,
    });
  };

  const formatDuration = (start?: Date, end?: Date) => {
    if (!start) return 'N/A';
    const endTime = end || new Date();
    const duration = endTime.getTime() - start.getTime();
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Data Migration Engine</h2>
          <p className="text-muted-foreground">Automated MVNE/MNO Data Migration & Validation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Schedule Migration
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            Start Bulk Migration
          </Button>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
                <p className="text-2xl font-bold">{systemHealth.cpuUsage.toFixed(1)}%</p>
              </div>
            </div>
            <Progress value={systemHealth.cpuUsage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Memory Usage</p>
                <p className="text-2xl font-bold">{systemHealth.memoryUsage.toFixed(1)}%</p>
              </div>
            </div>
            <Progress value={systemHealth.memoryUsage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Disk Usage</p>
                <p className="text-2xl font-bold">{systemHealth.diskSpace.toFixed(1)}%</p>
              </div>
            </div>
            <Progress value={systemHealth.diskSpace} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Network Latency</p>
                <p className="text-2xl font-bold">{systemHealth.networkLatency.toFixed(0)}ms</p>
              </div>
            </div>
            <div className="mt-2">
              <Badge variant={systemHealth.networkLatency < 20 ? 'default' : 'destructive'}>
                {systemHealth.networkLatency < 20 ? 'Good' : 'High'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Migration Jobs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="active">Active Migrations</TabsTrigger>
          <TabsTrigger value="validation">Data Validation</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeMigrations.map((migration) => (
            <Card key={migration.id} className="border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{migration.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={getStatusBadgeVariant(migration.status)}>
                        {migration.status.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {migration.recordsProcessed.toLocaleString()} / {migration.totalRecords.toLocaleString()} records
                      </span>
                      {migration.errors > 0 && (
                        <Badge variant="destructive">{migration.errors} errors</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {migration.status === 'pending' && (
                      <Button size="sm" onClick={() => startMigration(migration.id)}>
                        Start
                      </Button>
                    )}
                    {migration.status === 'running' && (
                      <Button size="sm" variant="outline" onClick={() => pauseMigration(migration.id)}>
                        Pause
                      </Button>
                    )}
                    {migration.status === 'failed' && (
                      <Button size="sm" onClick={() => retryMigration(migration.id)}>
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{migration.progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={migration.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">{formatDuration(migration.startTime, migration.endTime)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Success Rate</p>
                    <p className="font-medium">
                      {migration.recordsProcessed > 0 
                        ? (((migration.recordsProcessed - migration.errors) / migration.recordsProcessed) * 100).toFixed(1)
                        : 0}%
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Errors</p>
                    <p className={`font-medium ${migration.errors > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {migration.errors}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">ETA</p>
                    <p className="font-medium">
                      {migration.status === 'running' && migration.progress > 0 
                        ? `${Math.round((100 - migration.progress) / migration.progress * (Date.now() - (migration.startTime?.getTime() || 0)) / 60000)}m`
                        : 'N/A'}
                    </p>
                  </div>
                </div>

                {migration.errorDetails && migration.errorDetails.length > 0 && (
                  <Alert>
                    <AlertDescription>
                      <div className="space-y-1">
                        <p className="font-medium">Recent Errors:</p>
                        {migration.errorDetails.slice(0, 3).map((error, index) => (
                          <p key={index} className="text-sm text-red-600">• {error}</p>
                        ))}
                        {migration.errorDetails.length > 3 && (
                          <p className="text-sm text-muted-foreground">
                            +{migration.errorDetails.length - 3} more errors...
                          </p>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          {Object.entries(validationResults).map(([migrationId, result]) => {
            const migration = activeMigrations.find(m => m.id === migrationId);
            if (!migration) return null;

            return (
              <Card key={migrationId}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {migration.name}
                    <Badge variant={result.isValid ? 'default' : 'destructive'}>
                      {result.isValid ? 'Valid' : 'Issues Found'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Records</p>
                      <p className="text-xl font-bold">{result.recordCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duplicates</p>
                      <p className="text-xl font-bold text-yellow-600">{result.duplicates}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Errors</p>
                      <p className="text-xl font-bold text-red-600">{result.errors.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Warnings</p>
                      <p className="text-xl font-bold text-yellow-600">{result.warnings.length}</p>
                    </div>
                  </div>

                  {result.errors.length > 0 && (
                    <Alert>
                      <AlertDescription>
                        <div className="space-y-1">
                          <p className="font-medium text-red-600">Validation Errors:</p>
                          {result.errors.map((error, index) => (
                            <p key={index} className="text-sm">• {error}</p>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {result.warnings.length > 0 && (
                    <Alert>
                      <AlertDescription>
                        <div className="space-y-1">
                          <p className="font-medium text-yellow-600">Warnings:</p>
                          {result.warnings.map((warning, index) => (
                            <p key={index} className="text-sm">• {warning}</p>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Export Report
                    </Button>
                    <Button variant="outline" size="sm">
                      Fix Automatically
                    </Button>
                    {!result.isValid && (
                      <Button size="sm" className="bg-red-600 text-white">
                        Review Errors
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Migration Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Records/Second</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Error Rate</span>
                    <span className="font-bold text-red-600">0.03%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Data Throughput</span>
                    <span className="font-bold">45.7 MB/s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Connections</span>
                    <span className="font-bold">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>RICA Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ID Verification Rate</span>
                    <span className="font-bold text-green-600">98.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Address Verification</span>
                    <span className="font-bold text-green-600">97.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Document Quality</span>
                    <span className="font-bold text-green-600">99.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">POPIA Compliance</span>
                    <span className="font-bold text-green-600">100%</span>
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

export default DataMigrationEngine;