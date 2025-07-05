import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Activity,
  Wrench,
  Eye,
  ThumbsUp,
  ThumbsDown,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ErrorLog {
  id: string;
  component_name: string;
  error_type: string;
  error_message: string;
  severity: string;
  status: string;
  occurrence_count: number;
  created_at: string;
  auto_fix_attempted: boolean;
  auto_fix_successful: boolean;
  potential_fix: string;
}

interface FixRequest {
  id: string;
  error_log_id: string;
  fix_type: string;
  fix_description: string;
  risk_level: string;
  status: string;
  created_at: string;
  error_logs: ErrorLog;
}

const ErrorManagementDashboard: React.FC = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<ErrorLog[]>([]);
  const [fixRequests, setFixRequests] = useState<FixRequest[]>([]);
  const [selectedError, setSelectedError] = useState<ErrorLog | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalErrors: 0,
    criticalErrors: 0,
    autoFixSuccessRate: 0,
    pendingFixes: 0
  });

  useEffect(() => {
    fetchErrorData();
    fetchFixRequests();
    fetchDashboardStats();
  }, []);

  const fetchErrorData = async () => {
    try {
      const { data, error } = await supabase
        .from('error_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setErrors(data || []);
    } catch (error) {
      console.error('❌ Failed to fetch error data:', error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load error logs. Please try again.",
        variant: "destructive"
      });
    }
  };

  const fetchFixRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('error_fix_requests')
        .select(`
          *,
          error_logs (*)
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFixRequests(data || []);
    } catch (error) {
      console.error('❌ Failed to fetch fix requests:', error);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data: todayErrors } = await supabase
        .from('error_logs')
        .select('severity, auto_fix_attempted, auto_fix_successful')
        .gte('created_at', `${today} 00:00:00`);

      const { data: pendingFixes } = await supabase
        .from('error_fix_requests')
        .select('id')
        .eq('status', 'pending');

      const totalErrors = todayErrors?.length || 0;
      const criticalErrors = todayErrors?.filter(e => e.severity === 'critical').length || 0;
      const autoFixAttempted = todayErrors?.filter(e => e.auto_fix_attempted).length || 0;
      const autoFixSuccessful = todayErrors?.filter(e => e.auto_fix_successful).length || 0;
      const autoFixSuccessRate = autoFixAttempted > 0 ? 
        Math.round((autoFixSuccessful / autoFixAttempted) * 100) : 0;

      setDashboardStats({
        totalErrors,
        criticalErrors,
        autoFixSuccessRate,
        pendingFixes: pendingFixes?.length || 0
      });
    } catch (error) {
      console.error('❌ Failed to fetch dashboard stats:', error);
    }
  };

  const handleFixApproval = async (fixRequestId: string, action: 'approve' | 'deny') => {
    setIsProcessing(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase.functions.invoke('fix-approval', {
        body: {
          fixRequestId,
          action,
          reviewNotes,
          adminUserId: user.id
        }
      });

      if (error) throw error;

      toast({
        title: action === 'approve' ? "Fix Approved" : "Fix Denied",
        description: data.message,
        variant: action === 'approve' ? "default" : "destructive"
      });

      // Refresh data
      await fetchFixRequests();
      await fetchErrorData();
      setReviewNotes('');
      
    } catch (error) {
      console.error(`❌ Fix ${action} failed:`, error);
      toast({
        title: `Fix ${action} Failed`,
        description: error.message || "An error occurred",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'open': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Error Management Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage system errors with self-healing capabilities</p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Errors Today</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalErrors}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Errors</p>
                <p className="text-2xl font-bold text-red-600">{dashboardStats.criticalErrors}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Auto-Fix Success Rate</p>
                <p className="text-2xl font-bold text-green-600">{dashboardStats.autoFixSuccessRate}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Fixes</p>
                <p className="text-2xl font-bold text-orange-600">{dashboardStats.pendingFixes}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="errors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="errors">Error Logs</TabsTrigger>
          <TabsTrigger value="fixes">Fix Requests</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Error Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {errors.map((error) => (
                  <div 
                    key={error.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedError(error)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(error.severity)}>
                            {error.severity.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(error.status)}>
                            {error.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {error.component_name}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900">{error.error_message}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Type: {error.error_type}</span>
                          <span>Occurrences: {error.occurrence_count}</span>
                          <span>{new Date(error.created_at).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {error.auto_fix_attempted && (
                          <Badge variant="outline" className="text-blue-600">
                            <Wrench className="w-3 h-3 mr-1" />
                            Auto-Fix {error.auto_fix_successful ? 'Success' : 'Failed'}
                          </Badge>
                        )}
                        <Eye className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fixes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Fix Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {fixRequests.map((fixRequest) => (
                  <div key={fixRequest.id} className="border rounded-lg p-4">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {fixRequest.fix_description}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Component: {fixRequest.error_logs.component_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Error: {fixRequest.error_logs.error_message}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={`${
                            fixRequest.risk_level === 'high' ? 'bg-red-100 text-red-800' :
                            fixRequest.risk_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {fixRequest.risk_level.toUpperCase()} RISK
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(fixRequest.created_at).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Review Notes
                          </label>
                          <Textarea
                            value={reviewNotes}
                            onChange={(e) => setReviewNotes(e.target.value)}
                            placeholder="Add your review notes here..."
                            rows={3}
                          />
                        </div>

                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleFixApproval(fixRequest.id, 'approve')}
                            disabled={isProcessing}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <ThumbsUp className="w-4 h-4 mr-2" />
                            Approve Fix
                          </Button>
                          <Button
                            onClick={() => handleFixApproval(fixRequest.id, 'deny')}
                            disabled={isProcessing}
                            variant="destructive"
                          >
                            <ThumbsDown className="w-4 h-4 mr-2" />
                            Deny Fix
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {fixRequests.length === 0 && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      No pending fix requests. All errors are either resolved or don't require manual intervention.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Health Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  System health monitoring is active. Auto-healing success rate: {dashboardStats.autoFixSuccessRate}%
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ErrorManagementDashboard;