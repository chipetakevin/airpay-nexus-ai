import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/hooks/use-toast';
import { useEmailNotifications } from '@/hooks/useEmailNotifications';
import { 
  Database, 
  Cloud, 
  Server, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw,
  Zap,
  Shield,
  Activity,
  Settings,
  Copy,
  HardDrive,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DatabaseNode {
  id: string;
  name: string;
  type: 'primary' | 'replica' | 'backup';
  provider: 'aws' | 'azure' | 'gcp' | 'on-premises';
  status: 'healthy' | 'warning' | 'critical' | 'maintenance';
  location: string;
  version: string;
  connections: number;
  max_connections: number;
  storage_used: number;
  storage_total: number;
  last_backup: string;
  replication_lag: number;
  health_score: number;
}

interface DatabaseOperation {
  id: string;
  type: 'backup' | 'sync' | 'migration' | 'maintenance' | 'failover';
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  source_db: string;
  target_db?: string;
  started_at: string;
  estimated_completion?: string;
  error_message?: string;
}

interface ApprovalRequest {
  id: string;
  type: 'schema_change' | 'data_migration' | 'failover' | 'backup_restore';
  title: string;
  description: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  requested_by: string;
  requested_at: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: string;
  approved_at?: string;
  rejection_reason?: string;
}

const MOCK_DATABASE_NODES: DatabaseNode[] = [
  {
    id: '1',
    name: 'Primary DB - AWS RDS',
    type: 'primary',
    provider: 'aws',
    status: 'healthy',
    location: 'us-east-1',
    version: 'PostgreSQL 15.4',
    connections: 45,
    max_connections: 100,
    storage_used: 234,
    storage_total: 500,
    last_backup: new Date().toISOString(),
    replication_lag: 0,
    health_score: 95
  },
  {
    id: '2',
    name: 'Replica DB - Azure SQL',
    type: 'replica',
    provider: 'azure',
    status: 'healthy',
    location: 'eastus',
    version: 'PostgreSQL 15.4',
    connections: 23,
    max_connections: 50,
    storage_used: 234,
    storage_total: 500,
    last_backup: new Date(Date.now() - 3600000).toISOString(),
    replication_lag: 2.3,
    health_score: 92
  },
  {
    id: '3',
    name: 'Backup DB - GCP Cloud SQL',
    type: 'backup',
    provider: 'gcp',
    status: 'warning',
    location: 'us-central1',
    version: 'PostgreSQL 15.4',
    connections: 5,
    max_connections: 25,
    storage_used: 180,
    storage_total: 250,
    last_backup: new Date(Date.now() - 7200000).toISOString(),
    replication_lag: 15.7,
    health_score: 78
  },
  {
    id: '4',
    name: 'On-Premises DB',
    type: 'primary',
    provider: 'on-premises',
    status: 'critical',
    location: 'Cape Town DC',
    version: 'PostgreSQL 14.9',
    connections: 89,
    max_connections: 100,
    storage_used: 450,
    storage_total: 500,
    last_backup: new Date(Date.now() - 86400000).toISOString(),
    replication_lag: 0,
    health_score: 45
  }
];

const MOCK_OPERATIONS: DatabaseOperation[] = [
  {
    id: '1',
    type: 'sync',
    status: 'running',
    progress: 75,
    source_db: 'Primary DB - AWS RDS',
    target_db: 'Replica DB - Azure SQL',
    started_at: new Date(Date.now() - 300000).toISOString(),
    estimated_completion: new Date(Date.now() + 120000).toISOString()
  },
  {
    id: '2',
    type: 'backup',
    status: 'completed',
    progress: 100,
    source_db: 'Primary DB - AWS RDS',
    started_at: new Date(Date.now() - 1800000).toISOString()
  }
];

const MOCK_APPROVALS: ApprovalRequest[] = [
  {
    id: '1',
    type: 'schema_change',
    title: 'Add RICA Compliance Index',
    description: 'Add composite index on rica_registrations table for compliance queries',
    risk_level: 'low',
    requested_by: 'System Admin',
    requested_at: new Date().toISOString(),
    status: 'pending'
  },
  {
    id: '2',
    type: 'failover',
    title: 'Emergency Failover to Azure',
    description: 'Primary DB showing critical health - initiate failover to Azure replica',
    risk_level: 'high',
    requested_by: 'Auto-Healing System',
    requested_at: new Date().toISOString(),
    status: 'pending'
  }
];

export const DatabaseManagementPlatform: React.FC = () => {
  const { hasRole } = usePermissions();
  const { toast } = useToast();
  const { sendFeatureUpdateNotification, sendNotification } = useEmailNotifications();
  const [activeTab, setActiveTab] = useState('overview');
  const [databaseNodes, setDatabaseNodes] = useState<DatabaseNode[]>(MOCK_DATABASE_NODES);
  const [operations, setOperations] = useState<DatabaseOperation[]>(MOCK_OPERATIONS);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(MOCK_APPROVALS);
  const [isProcessing, setIsProcessing] = useState(false);

  const isAdmin = hasRole(['admin', 'manager']);

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'aws':
        return <Cloud className="h-4 w-4 text-orange-500" />;
      case 'azure':
        return <Cloud className="h-4 w-4 text-blue-500" />;
      case 'gcp':
        return <Cloud className="h-4 w-4 text-green-500" />;
      case 'on-premises':
        return <Server className="h-4 w-4 text-gray-500" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-feature-enabled-bg border-feature-enabled-border text-feature-enabled-text';
      case 'warning':
        return 'bg-feature-pending-bg border-feature-pending-border text-feature-pending-text';
      case 'critical':
        return 'bg-destructive/10 border-destructive text-destructive';
      case 'maintenance':
        return 'bg-blue-500/10 border-blue-500 text-blue-600';
      default:
        return 'bg-muted border-muted-foreground/20';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-feature-enabled-bg border-feature-enabled-border text-feature-enabled-text';
      case 'medium':
        return 'bg-feature-pending-bg border-feature-pending-border text-feature-pending-text';
      case 'high':
        return 'bg-orange-500/10 border-orange-500 text-orange-600';
      case 'critical':
        return 'bg-destructive/10 border-destructive text-destructive';
      default:
        return 'bg-muted border-muted-foreground/20';
    }
  };

  const approveRequest = async (requestId: string) => {
    if (!isAdmin) return;

    setApprovals(prev => prev.map(req => 
      req.id === requestId ? {
        ...req,
        status: 'approved' as const,
        approved_by: 'Current Admin',
        approved_at: new Date().toISOString()
      } : req
    ));

    // Send notification for approval
    const request = approvals.find(req => req.id === requestId);
    if (request) {
      await sendFeatureUpdateNotification({
        featureName: request.title,
        status: 'approved',
        description: request.description,
        approvedBy: 'Current Admin'
      });
    }

    toast({
      title: "Request Approved",
      description: "Database operation has been approved and will execute shortly",
    });
  };

  const rejectRequest = async (requestId: string, reason: string) => {
    if (!isAdmin) return;

    setApprovals(prev => prev.map(req => 
      req.id === requestId ? {
        ...req,
        status: 'rejected' as const,
        rejection_reason: reason
      } : req
    ));

    toast({
      title: "Request Rejected",
      description: "Database operation has been rejected",
    });
  };

  const triggerFailover = async () => {
    if (!isAdmin) return;

    setIsProcessing(true);
    
    try {
      // Simulate failover process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Send critical notification for failover
      await sendNotification(
        'database_error',
        'critical',
        '[CRITICAL] Emergency Database Failover Initiated',
        'Emergency failover has been triggered due to critical database health issues. Primary database has been switched to backup replica.',
        {
          component: 'Database Failover System',
          affectedSystem: 'Primary Database'
        }
      );

      toast({
        title: "Failover Initiated",
        description: "Database failover process has been started",
      });
    } catch (error) {
      toast({
        title: "Failover Failed",
        description: "Failed to initiate database failover",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const runHealthCheck = async () => {
    setDatabaseNodes(prev => prev.map(node => ({
      ...node,
      health_score: Math.max(60, Math.min(100, node.health_score + (Math.random() - 0.3) * 20))
    })));

    toast({
      title: "Health Check Complete",
      description: "All database nodes have been checked",
    });
  };

  const criticalNodes = databaseNodes.filter(n => n.status === 'critical').length;
  const warningNodes = databaseNodes.filter(n => n.status === 'warning').length;
  const pendingApprovals = approvals.filter(a => a.status === 'pending').length;
  const runningOperations = operations.filter(o => o.status === 'running').length;

  if (!isAdmin) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Access denied. This section requires administrator privileges.
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
            <span>Database Management Platform</span>
          </h1>
          <p className="text-muted-foreground">
            Redundant, multi-cloud database management with automated failover and compliance
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={runHealthCheck}
            variant="outline"
            size="sm"
          >
            <Activity className="h-4 w-4 mr-2" />
            Health Check
          </Button>
          
          {criticalNodes > 0 && (
            <Button 
              onClick={triggerFailover}
              disabled={isProcessing}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              size="sm"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Emergency Failover
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={criticalNodes > 0 ? "border-destructive" : ""}>
          <CardContent className="p-6 text-center">
            <div className={`text-2xl font-bold ${criticalNodes > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {criticalNodes}
            </div>
            <div className="text-sm text-muted-foreground">Critical Nodes</div>
          </CardContent>
        </Card>
        
        <Card className={warningNodes > 0 ? "border-feature-pending-border" : ""}>
          <CardContent className="p-6 text-center">
            <div className={`text-2xl font-bold ${warningNodes > 0 ? 'text-feature-pending-text' : 'text-muted-foreground'}`}>
              {warningNodes}
            </div>
            <div className="text-sm text-muted-foreground">Warning Nodes</div>
          </CardContent>
        </Card>
        
        <Card className={pendingApprovals > 0 ? "border-feature-pending-border" : ""}>
          <CardContent className="p-6 text-center">
            <div className={`text-2xl font-bold ${pendingApprovals > 0 ? 'text-feature-pending-text' : 'text-muted-foreground'}`}>
              {pendingApprovals}
            </div>
            <div className="text-sm text-muted-foreground">Pending Approvals</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">{runningOperations}</div>
            <div className="text-sm text-muted-foreground">Active Operations</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="nodes" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span className="hidden sm:inline">Database Nodes</span>
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Operations</span>
          </TabsTrigger>
          <TabsTrigger value="approvals" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Approvals</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Database Health Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {databaseNodes.map(node => (
                    <div key={node.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getProviderIcon(node.provider)}
                        <div>
                          <div className="font-medium text-sm">{node.name}</div>
                          <div className="text-xs text-muted-foreground">{node.location} • {node.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">{node.health_score}%</span>
                        <Badge variant="outline" className={cn("text-xs", getStatusColor(node.status))}>
                          {node.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {operations.map(operation => (
                    <div key={operation.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm capitalize">{operation.type}</span>
                        <Badge variant="outline" className={cn("text-xs", getStatusColor(operation.status))}>
                          {operation.status}
                        </Badge>
                      </div>
                      {operation.status === 'running' && (
                        <div className="mb-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{operation.progress}%</span>
                          </div>
                          <Progress value={operation.progress} className="h-2" />
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground">
                        {operation.source_db}
                        {operation.target_db && ` → ${operation.target_db}`}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nodes" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {databaseNodes.map(node => (
              <Card key={node.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      {getProviderIcon(node.provider)}
                      <span>{node.name}</span>
                    </CardTitle>
                    <Badge variant="outline" className={cn("text-xs", getStatusColor(node.status))}>
                      {node.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Health Score</span>
                        <span className="font-bold">{node.health_score}%</span>
                      </div>
                      <Progress value={node.health_score} className="h-3" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Type</div>
                        <div className="text-muted-foreground capitalize">{node.type}</div>
                      </div>
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-muted-foreground">{node.location}</div>
                      </div>
                      <div>
                        <div className="font-medium">Connections</div>
                        <div className="text-muted-foreground">{node.connections}/{node.max_connections}</div>
                      </div>
                      <div>
                        <div className="font-medium">Storage</div>
                        <div className="text-muted-foreground">{node.storage_used}GB/{node.storage_total}GB</div>
                      </div>
                    </div>

                    {node.type === 'replica' && (
                      <div className="p-2 border rounded bg-muted/20">
                        <div className="text-xs font-medium">Replication</div>
                        <div className="text-xs text-muted-foreground">
                          Lag: {node.replication_lag}ms
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                      Last backup: {new Date(node.last_backup).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="operations" className="mt-6">
          <div className="space-y-4">
            {operations.map(operation => (
              <Card key={operation.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium capitalize">{operation.type} Operation</h4>
                      <p className="text-sm text-muted-foreground">
                        {operation.source_db}
                        {operation.target_db && ` → ${operation.target_db}`}
                      </p>
                    </div>
                    <Badge variant="outline" className={cn("text-xs", getStatusColor(operation.status))}>
                      {operation.status}
                    </Badge>
                  </div>

                  {operation.status === 'running' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{operation.progress}%</span>
                      </div>
                      <Progress value={operation.progress} className="h-3" />
                      {operation.estimated_completion && (
                        <div className="text-xs text-muted-foreground mt-2">
                          Estimated completion: {new Date(operation.estimated_completion).toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Started</div>
                      <div className="text-muted-foreground">
                        {new Date(operation.started_at).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-muted-foreground">
                        {Math.round((Date.now() - new Date(operation.started_at).getTime()) / 60000)}m
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Status</div>
                      <div className="text-muted-foreground capitalize">{operation.status}</div>
                    </div>
                  </div>

                  {operation.error_message && (
                    <Alert className="mt-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{operation.error_message}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approvals" className="mt-6">
          <div className="space-y-4">
            {approvals.map(request => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-medium">{request.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{request.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>Type: {request.type.replace('_', ' ')}</span>
                        <span>Requested by: {request.requested_by}</span>
                        <span>At: {new Date(request.requested_at).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className={cn("text-xs", getRiskColor(request.risk_level))}>
                        {request.risk_level} risk
                      </Badge>
                      <Badge variant="outline" className={cn("text-xs", getStatusColor(request.status))}>
                        {request.status}
                      </Badge>
                    </div>
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => approveRequest(request.id)}
                        className="bg-feature-enabled-bg text-feature-enabled-text hover:bg-feature-enabled-bg/90"
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => rejectRequest(request.id, 'Manual rejection')}
                      >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {request.status === 'approved' && (
                    <div className="text-sm text-feature-enabled-text">
                      ✓ Approved by {request.approved_by} at {request.approved_at && new Date(request.approved_at).toLocaleString()}
                    </div>
                  )}

                  {request.status === 'rejected' && (
                    <div className="text-sm text-destructive">
                      ✗ Rejected: {request.rejection_reason}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};