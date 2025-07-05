import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/hooks/use-toast';
import { 
  Database, 
  BarChart3, 
  Zap, 
  Archive, 
  RefreshCw, 
  HardDrive,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Settings,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StorageMetric {
  id: string;
  name: string;
  type: 'table' | 'index' | 'partition';
  size: string;
  records: number;
  growth: number;
  lastOptimized?: string;
  status: 'optimal' | 'needs_attention' | 'critical';
  recommendations: string[];
}

interface OptimizationTask {
  id: string;
  name: string;
  type: 'vacuum' | 'reindex' | 'partition' | 'archive';
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  estimatedTime?: string;
  impact: 'low' | 'medium' | 'high';
  description: string;
}

const MOCK_STORAGE_METRICS: StorageMetric[] = [
  {
    id: '1',
    name: 'contractor_feature_access',
    type: 'table',
    size: '45.2 MB',
    records: 12547,
    growth: 15.3,
    lastOptimized: '2024-01-01',
    status: 'optimal',
    recommendations: ['Consider partitioning by date', 'Add index on contractor_id']
  },
  {
    id: '2',
    name: 'feature_access_logs',
    type: 'table',
    size: '234.8 MB',
    records: 89432,
    growth: 42.1,
    lastOptimized: '2023-12-15',
    status: 'needs_attention',
    recommendations: ['Archive logs older than 1 year', 'Compress historical data']
  },
  {
    id: '3',
    name: 'rica_registrations',
    type: 'table',
    size: '156.4 MB',
    records: 8934,
    growth: 8.7,
    lastOptimized: '2024-01-03',
    status: 'optimal',
    recommendations: ['Current optimization is sufficient']
  }
];

const MOCK_OPTIMIZATION_TASKS: OptimizationTask[] = [
  {
    id: '1',
    name: 'Vacuum feature_access_logs',
    type: 'vacuum',
    status: 'completed',
    progress: 100,
    impact: 'medium',
    description: 'Reclaim storage space and update statistics'
  },
  {
    id: '2',
    name: 'Archive old audit logs',
    type: 'archive',
    status: 'running',
    progress: 67,
    estimatedTime: '5 minutes',
    impact: 'high',
    description: 'Move logs older than 6 months to archive storage'
  }
];

export const DataStorageOptimizer: React.FC = () => {
  const { hasRole } = usePermissions();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [storageMetrics, setStorageMetrics] = useState<StorageMetric[]>(MOCK_STORAGE_METRICS);
  const [optimizationTasks, setOptimizationTasks] = useState<OptimizationTask[]>(MOCK_OPTIMIZATION_TASKS);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const isAdmin = hasRole(['admin']);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-feature-enabled-bg border-feature-enabled-border text-feature-enabled-text';
      case 'needs_attention':
        return 'bg-feature-pending-bg border-feature-pending-border text-feature-pending-text';
      case 'critical':
        return 'bg-destructive/10 border-destructive text-destructive';
      default:
        return 'bg-muted border-muted-foreground/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
        return <CheckCircle2 className="h-4 w-4 text-toggle-enabled" />;
      case 'needs_attention':
        return <AlertTriangle className="h-4 w-4 text-feature-pending-text" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'vacuum':
        return <RefreshCw className="h-4 w-4" />;
      case 'reindex':
        return <BarChart3 className="h-4 w-4" />;
      case 'partition':
        return <Database className="h-4 w-4" />;
      case 'archive':
        return <Archive className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const runOptimization = async (metricId: string) => {
    setIsOptimizing(true);
    
    try {
      console.log('Running optimization for:', metricId);
      
      const newTask: OptimizationTask = {
        id: Date.now().toString(),
        name: `Optimize ${storageMetrics.find(m => m.id === metricId)?.name}`,
        type: 'vacuum',
        status: 'running',
        progress: 0,
        impact: 'medium',
        description: 'Optimizing table structure and reclaiming space'
      };

      setOptimizationTasks(prev => [newTask, ...prev]);
      
      toast({
        title: "Optimization Started",
        description: "Database optimization task has been initiated",
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start optimization task",
        variant: "destructive"
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const archiveOldData = async () => {
    console.log('Starting data archival process');
    toast({
      title: "Archival Started",
      description: "Old data archival process has been initiated",
    });
  };

  const calculateTotalSize = () => {
    return storageMetrics.reduce((total, metric) => {
      const size = parseFloat(metric.size.replace(/[^\d.]/g, ''));
      return total + size;
    }, 0);
  };

  const calculateOptimalCount = () => {
    return storageMetrics.filter(m => m.status === 'optimal').length;
  };

  if (!isAdmin) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Access denied. This section is for administrators only.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <HardDrive className="h-6 w-6" />
            <span>Storage Optimizer</span>
          </h1>
          <p className="text-muted-foreground">
            Monitor and optimize database storage for peak performance
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">{calculateTotalSize().toFixed(1)} MB</div>
            <div className="text-sm text-muted-foreground">Total Storage</div>
          </CardContent>
        </Card>
        <Card className="bg-feature-enabled-bg border-feature-enabled-border">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-feature-enabled-text">{calculateOptimalCount()}</div>
            <div className="text-sm text-feature-enabled-text">Optimal Tables</div>
          </CardContent>
        </Card>
        <Card className="bg-feature-pending-bg border-feature-pending-border">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-feature-pending-text">
              {storageMetrics.filter(m => m.status === 'needs_attention').length}
            </div>
            <div className="text-sm text-feature-pending-text">Need Attention</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">
              {optimizationTasks.filter(t => t.status === 'running').length}
            </div>
            <div className="text-sm text-muted-foreground">Active Tasks</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Storage Metrics</span>
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Optimization Tasks</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Storage Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {storageMetrics.map(metric => (
                    <div key={metric.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-3 w-3 text-toggle-enabled" />
                          <span className="text-sm text-toggle-enabled">+{metric.growth}%</span>
                        </div>
                      </div>
                      <Progress value={Math.min(metric.growth, 100)} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={archiveOldData}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Old Data
                </Button>
                <Button 
                  onClick={() => console.log('Running vacuum')}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Run Database Vacuum
                </Button>
                <Button 
                  onClick={() => console.log('Rebuilding indexes')}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Rebuild Indexes
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="mt-6">
          <div className="space-y-4">
            {storageMetrics.map(metric => (
              <Card key={metric.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(metric.status)}
                      <div>
                        <h4 className="font-medium">{metric.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {metric.records.toLocaleString()} records • {metric.size}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className={cn("text-xs", getStatusColor(metric.status))}>
                        {metric.status.replace('_', ' ')}
                      </Badge>
                      
                      {metric.status !== 'optimal' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => runOptimization(metric.id)}
                          disabled={isOptimizing}
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          Optimize
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-bold">{metric.size}</div>
                      <div className="text-xs text-muted-foreground">Storage Size</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-bold">+{metric.growth}%</div>
                      <div className="text-xs text-muted-foreground">Growth Rate</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-bold">
                        {metric.lastOptimized ? new Date(metric.lastOptimized).toLocaleDateString() : 'Never'}
                      </div>
                      <div className="text-xs text-muted-foreground">Last Optimized</div>
                    </div>
                  </div>

                  {metric.recommendations.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-2">Recommendations:</div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {metric.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-primary">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <div className="space-y-4">
            {optimizationTasks.map(task => (
              <Card key={task.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {getTaskIcon(task.type)}
                      <div>
                        <h4 className="font-medium">{task.name}</h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          task.status === 'completed' ? getStatusColor('optimal') :
                          task.status === 'running' ? getStatusColor('needs_attention') :
                          task.status === 'failed' ? getStatusColor('critical') :
                          'bg-muted border-muted-foreground/20'
                        )}
                      >
                        {task.status}
                      </Badge>
                    </div>
                  </div>

                  {task.status === 'running' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Progress</span>
                        <div className="flex items-center space-x-2">
                          <span>{task.progress}%</span>
                          {task.estimatedTime && (
                            <span className="text-muted-foreground">• {task.estimatedTime} remaining</span>
                          )}
                        </div>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div>
                        <span className="font-medium">Type: </span>
                        <span className="text-muted-foreground">{task.type}</span>
                      </div>
                      <div>
                        <span className="font-medium">Impact: </span>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs",
                            task.impact === 'high' ? "text-toggle-enabled" :
                            task.impact === 'medium' ? "text-feature-pending-text" :
                            "text-muted-foreground"
                          )}
                        >
                          {task.impact}
                        </Badge>
                      </div>
                    </div>
                    
                    {task.status === 'completed' && (
                      <CheckCircle2 className="h-4 w-4 text-toggle-enabled" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};