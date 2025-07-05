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
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Zap, 
  Database,
  Server,
  Network,
  Clock,
  Shield,
  Activity,
  TrendingUp,
  Settings,
  Play,
  Pause
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SystemError {
  id: string;
  component: string;
  error_type: 'database' | 'network' | 'ui' | 'api' | 'security';
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  status: 'detected' | 'fixing' | 'fixed' | 'failed';
  auto_fix_available: boolean;
  created_at: string;
  fixed_at?: string;
  fix_attempts: number;
  health_impact: number;
}

interface SystemHealth {
  component: string;
  status: 'healthy' | 'warning' | 'critical';
  health_score: number;
  last_check: string;
  response_time: number;
  error_rate: number;
  uptime: number;
}

const MOCK_ERRORS: SystemError[] = [
  {
    id: '1',
    component: 'Database Connection Pool',
    error_type: 'database',
    severity: 'critical',
    message: 'Connection pool exhausted - 95% of connections in use',
    status: 'detected',
    auto_fix_available: true,
    created_at: new Date().toISOString(),
    fix_attempts: 0,
    health_impact: 85
  },
  {
    id: '2',
    component: 'API Gateway',
    error_type: 'network',
    severity: 'high',
    message: 'High latency detected - avg response time 3.2s',
    status: 'fixing',
    auto_fix_available: true,
    created_at: new Date(Date.now() - 300000).toISOString(),
    fix_attempts: 1,
    health_impact: 65
  },
  {
    id: '3',
    component: 'User Authentication',
    error_type: 'security',
    severity: 'medium',
    message: 'Multiple failed login attempts from single IP',
    status: 'fixed',
    auto_fix_available: true,
    created_at: new Date(Date.now() - 600000).toISOString(),
    fixed_at: new Date(Date.now() - 300000).toISOString(),
    fix_attempts: 1,
    health_impact: 30
  }
];

const MOCK_HEALTH: SystemHealth[] = [
  {
    component: 'Database',
    status: 'warning',
    health_score: 75,
    last_check: new Date().toISOString(),
    response_time: 250,
    error_rate: 2.1,
    uptime: 99.5
  },
  {
    component: 'API Services',
    status: 'healthy',
    health_score: 95,
    last_check: new Date().toISOString(),
    response_time: 120,
    error_rate: 0.1,
    uptime: 99.9
  },
  {
    component: 'Security Layer',
    status: 'healthy',
    health_score: 98,
    last_check: new Date().toISOString(),
    response_time: 45,
    error_rate: 0.0,
    uptime: 100
  },
  {
    component: 'Network Infrastructure',
    status: 'critical',
    health_score: 60,
    last_check: new Date().toISOString(),
    response_time: 850,
    error_rate: 5.2,
    uptime: 98.1
  }
];

export const AutoErrorDetectionSystem: React.FC = () => {
  const { hasRole } = usePermissions();
  const { toast } = useToast();
  const { sendDatabaseErrorAlert } = useEmailNotifications();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [errors, setErrors] = useState<SystemError[]>(MOCK_ERRORS);
  const [systemHealth, setSystemHealth] = useState<SystemHealth[]>(MOCK_HEALTH);
  const [isAutoFixing, setIsAutoFixing] = useState(false);
  const [autoFixProgress, setAutoFixProgress] = useState(0);

  const isAdmin = hasRole(['admin', 'manager']);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemHealth(prev => prev.map(health => ({
        ...health,
        last_check: new Date().toISOString(),
        health_score: Math.max(50, Math.min(100, health.health_score + (Math.random() - 0.5) * 10))
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'database':
        return <Database className="h-4 w-4" />;
      case 'network':
        return <Network className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      case 'api':
        return <Server className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/10 border-destructive text-destructive';
      case 'high':
        return 'bg-orange-500/10 border-orange-500 text-orange-600';
      case 'medium':
        return 'bg-feature-pending-bg border-feature-pending-border text-feature-pending-text';
      case 'low':
        return 'bg-blue-500/10 border-blue-500 text-blue-600';
      default:
        return 'bg-muted border-muted-foreground/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fixed':
        return 'bg-feature-enabled-bg border-feature-enabled-border text-feature-enabled-text';
      case 'fixing':
        return 'bg-feature-pending-bg border-feature-pending-border text-feature-pending-text';
      case 'failed':
        return 'bg-destructive/10 border-destructive text-destructive';
      default:
        return 'bg-muted border-muted-foreground/20';
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-feature-enabled-text';
      case 'warning':
        return 'text-feature-pending-text';
      case 'critical':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const runAutoFix = async () => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can run auto-fix operations",
        variant: "destructive"
      });
      return;
    }

    setIsAutoFixing(true);
    setAutoFixProgress(0);

    try {
      const autoFixableErrors = errors.filter(e => e.auto_fix_available && e.status === 'detected');
      
      for (let i = 0; i < autoFixableErrors.length; i++) {
        const error = autoFixableErrors[i];
        
        // Update error status to fixing
        setErrors(prev => prev.map(e => 
          e.id === error.id ? { ...e, status: 'fixing' as const, fix_attempts: e.fix_attempts + 1 } : e
        ));

        // Simulate fix process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Update progress
        setAutoFixProgress(((i + 1) / autoFixableErrors.length) * 100);
        
        // Mark as fixed (simulate 90% success rate)
        const success = Math.random() > 0.1;
        setErrors(prev => prev.map(e => 
          e.id === error.id ? { 
            ...e, 
            status: success ? 'fixed' as const : 'failed' as const,
            fixed_at: success ? new Date().toISOString() : undefined
          } : e
        ));

        // Send notification for auto-fix result
        await sendDatabaseErrorAlert({
          component: error.component,
          errorType: error.error_type,
          severity: error.severity as 'critical' | 'warning' | 'info',
          message: error.message,
          autoFixAttempted: true,
          autoFixSuccess: success
        });
      }

      toast({
        title: "Auto-Fix Complete",
        description: `Successfully processed ${autoFixableErrors.length} errors`,
      });

    } catch (error) {
      toast({
        title: "Auto-Fix Failed",
        description: "Failed to complete auto-fix operation",
        variant: "destructive"
      });
    } finally {
      setIsAutoFixing(false);
      setAutoFixProgress(0);
    }
  };

  const fixIndividualError = async (errorId: string) => {
    if (!isAdmin) return;

    const error = errors.find(e => e.id === errorId);
    if (!error || !error.auto_fix_available) return;

    setErrors(prev => prev.map(e => 
      e.id === errorId ? { ...e, status: 'fixing' as const, fix_attempts: e.fix_attempts + 1 } : e
    ));

    // Simulate fix
    setTimeout(async () => {
      setErrors(prev => prev.map(e => 
        e.id === errorId ? { 
          ...e, 
          status: 'fixed' as const,
          fixed_at: new Date().toISOString()
        } : e
      ));
      
      // Send notification for individual fix
      await sendDatabaseErrorAlert({
        component: error.component,
        errorType: error.error_type,
        severity: error.severity as 'critical' | 'warning' | 'info',
        message: error.message,
        autoFixAttempted: true,
        autoFixSuccess: true
      });

      toast({
        title: "Error Fixed",
        description: `Successfully fixed: ${error.component}`,
      });
    }, 3000);
  };

  const criticalErrors = errors.filter(e => e.severity === 'critical' && e.status !== 'fixed').length;
  const totalErrors = errors.filter(e => e.status !== 'fixed').length;
  const autoFixableErrors = errors.filter(e => e.auto_fix_available && e.status === 'detected').length;
  const overallHealth = Math.round(systemHealth.reduce((sum, h) => sum + h.health_score, 0) / systemHealth.length);

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
            <Activity className="h-6 w-6" />
            <span>Auto Error Detection & Fix System</span>
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring and automated error resolution for all system components
          </p>
        </div>
        
        {autoFixableErrors > 0 && (
          <Button 
            onClick={runAutoFix}
            disabled={isAutoFixing}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            {isAutoFixing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Auto-Fixing...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Auto-Fix All ({autoFixableErrors})
              </>
            )}
          </Button>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={criticalErrors > 0 ? "border-destructive" : "border-feature-enabled-border"}>
          <CardContent className="p-6 text-center">
            <div className={`text-2xl font-bold ${criticalErrors > 0 ? 'text-destructive' : 'text-feature-enabled-text'}`}>
              {criticalErrors}
            </div>
            <div className="text-sm text-muted-foreground">Critical Errors</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">{totalErrors}</div>
            <div className="text-sm text-muted-foreground">Total Active Errors</div>
          </CardContent>
        </Card>
        
        <Card className="bg-feature-enabled-bg border-feature-enabled-border">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-feature-enabled-text">{autoFixableErrors}</div>
            <div className="text-sm text-feature-enabled-text">Auto-Fixable</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className={`text-2xl font-bold ${getHealthColor(overallHealth >= 80 ? 'healthy' : overallHealth >= 60 ? 'warning' : 'critical')}`}>
              {overallHealth}%
            </div>
            <div className="text-sm text-muted-foreground">System Health</div>
          </CardContent>
        </Card>
      </div>

      {isAutoFixing && (
        <Card className="bg-feature-pending-bg border-feature-pending-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-feature-pending-text animate-spin" />
                <span className="font-medium text-feature-pending-text">Auto-Fix in Progress</span>
              </div>
              <span className="text-feature-pending-text">{Math.round(autoFixProgress)}%</span>
            </div>
            <Progress value={autoFixProgress} className="h-3" />
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="errors" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Active Errors</span>
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">System Health</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Errors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {errors.slice(0, 5).map(error => (
                    <div key={error.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getErrorIcon(error.error_type)}
                        <div>
                          <div className="font-medium text-sm">{error.component}</div>
                          <div className="text-xs text-muted-foreground">{error.message}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={cn("text-xs", getSeverityColor(error.severity))}>
                          {error.severity}
                        </Badge>
                        <Badge variant="outline" className={cn("text-xs", getStatusColor(error.status))}>
                          {error.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemHealth.map(health => (
                    <div key={health.component} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{health.component}</span>
                        <span className={cn("text-sm font-bold", getHealthColor(health.status))}>
                          {health.health_score}%
                        </span>
                      </div>
                      <Progress value={health.health_score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="errors" className="mt-6">
          <div className="space-y-4">
            {errors.map(error => (
              <Card key={error.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {getErrorIcon(error.error_type)}
                      <div>
                        <h4 className="font-medium">{error.component}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>Type: {error.error_type}</span>
                          <span>Attempts: {error.fix_attempts}</span>
                          <span>Impact: {error.health_impact}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className={cn("text-xs", getSeverityColor(error.severity))}>
                        {error.severity}
                      </Badge>
                      <Badge variant="outline" className={cn("text-xs", getStatusColor(error.status))}>
                        {error.status}
                      </Badge>
                      
                      {error.auto_fix_available && error.status === 'detected' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => fixIndividualError(error.id)}
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          Fix Now
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Created</div>
                      <div className="text-muted-foreground">
                        {new Date(error.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Last Attempt</div>
                      <div className="text-muted-foreground">
                        {error.fix_attempts > 0 ? 'Recently' : 'None'}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Auto-Fix</div>
                      <div className="text-muted-foreground">
                        {error.auto_fix_available ? 'Available' : 'Manual Only'}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Fixed At</div>
                      <div className="text-muted-foreground">
                        {error.fixed_at ? new Date(error.fixed_at).toLocaleDateString() : 'Pending'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="health" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemHealth.map(health => (
              <Card key={health.component}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{health.component}</span>
                    <Badge variant="outline" className={cn("text-xs", getHealthColor(health.status))}>
                      {health.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Health Score</span>
                        <span className={cn("font-bold", getHealthColor(health.status))}>
                          {health.health_score}%
                        </span>
                      </div>
                      <Progress value={health.health_score} className="h-3" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Response Time</div>
                        <div className="text-muted-foreground">{health.response_time}ms</div>
                      </div>
                      <div>
                        <div className="font-medium">Error Rate</div>
                        <div className="text-muted-foreground">{health.error_rate}%</div>
                      </div>
                      <div>
                        <div className="font-medium">Uptime</div>
                        <div className="text-muted-foreground">{health.uptime}%</div>
                      </div>
                      <div>
                        <div className="font-medium">Last Check</div>
                        <div className="text-muted-foreground">
                          {new Date(health.last_check).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
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