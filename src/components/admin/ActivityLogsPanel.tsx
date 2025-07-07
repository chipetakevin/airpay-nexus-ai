import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Activity, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  Shield,
  Users,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Eye
} from 'lucide-react';

interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string | null;
  user_role: string;
  success: boolean;
  error_message: string | null;
  metadata: any;
  created_at: string;
  ip_address: unknown;
  user_agent: string | null;
}

const ActivityLogsPanel = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterSuccess, setFilterSuccess] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const { toast } = useToast();

  useEffect(() => {
    loadActivityLogs();
  }, [dateRange]);

  const loadActivityLogs = async () => {
    try {
      setLoading(true);
      
      // Calculate date filter
      let dateFilter = new Date();
      switch (dateRange) {
        case 'today':
          dateFilter.setHours(0, 0, 0, 0);
          break;
        case 'week':
          dateFilter.setDate(dateFilter.getDate() - 7);
          break;
        case 'month':
          dateFilter.setMonth(dateFilter.getMonth() - 1);
          break;
        default:
          dateFilter.setFullYear(dateFilter.getFullYear() - 1);
      }

      const { data: auditLogs, error } = await supabase
        .from('permission_audit_logs')
        .select('*')
        .gte('created_at', dateFilter.toISOString())
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      setLogs(auditLogs || []);
    } catch (error) {
      console.error('Error loading activity logs:', error);
      toast({
        title: "Error Loading Logs",
        description: "Failed to load activity logs.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user_role?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action.toLowerCase().includes(filterAction.toLowerCase());
    const matchesSuccess = filterSuccess === 'all' || 
                          (filterSuccess === 'success' && log.success) ||
                          (filterSuccess === 'failure' && !log.success);
    
    return matchesSearch && matchesAction && matchesSuccess;
  });

  const getActionIcon = (action: string) => {
    if (action.includes('permission')) return Shield;
    if (action.includes('user')) return Users;
    if (action.includes('login')) return User;
    if (action.includes('view')) return Eye;
    return Settings;
  };

  const getActionColor = (action: string, success: boolean) => {
    if (!success) return 'bg-red-100 text-red-800';
    if (action.includes('delete')) return 'bg-red-100 text-red-800';
    if (action.includes('create') || action.includes('grant')) return 'bg-green-100 text-green-800';
    if (action.includes('update') || action.includes('modify')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Action', 'Resource Type', 'User Role', 'Success', 'IP Address', 'User Agent'].join(','),
      ...filteredLogs.map(log => [
        log.created_at,
        log.action,
        log.resource_type,
        log.user_role || 'Unknown',
        log.success ? 'Success' : 'Failure',
        log.ip_address || 'N/A',
        log.user_agent || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Activity logs have been exported to CSV.",
    });
  };

  const stats = {
    totalLogs: logs.length,
    successfulActions: logs.filter(l => l.success).length,
    failedActions: logs.filter(l => !l.success).length,
    uniqueUsers: new Set(logs.map(l => l.user_id)).size,
    permissionChanges: logs.filter(l => l.action.includes('permission')).length,
    userActions: logs.filter(l => l.action.includes('user')).length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading activity logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Activity Logs</h2>
          <p className="text-gray-600">Monitor all system activities and permission changes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadActivityLogs}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportLogs}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Logs</p>
                <p className="text-2xl font-bold">{stats.totalLogs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Successful</p>
                <p className="text-2xl font-bold">{stats.successfulActions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-2xl font-bold">{stats.failedActions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Unique Users</p>
                <p className="text-2xl font-bold">{stats.uniqueUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Permission Changes</p>
                <p className="text-2xl font-bold">{stats.permissionChanges}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Settings className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">User Actions</p>
                <p className="text-2xl font-bold">{stats.userActions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search logs by action, resource, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="permission">Permission Changes</SelectItem>
                <SelectItem value="user">User Actions</SelectItem>
                <SelectItem value="login">Login/Logout</SelectItem>
                <SelectItem value="view">View Actions</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSuccess} onValueChange={setFilterSuccess}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Results</SelectItem>
                <SelectItem value="success">Success Only</SelectItem>
                <SelectItem value="failure">Failures Only</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activity Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline ({filteredLogs.length} logs)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredLogs.map((log) => {
              const ActionIcon = getActionIcon(log.action);
              const { date, time } = formatDate(log.created_at);
              
              return (
                <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <div className={`p-2 rounded-lg ${log.success ? 'bg-green-100' : 'bg-red-100'}`}>
                      <ActionIcon className={`w-4 h-4 ${log.success ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getActionColor(log.action, log.success)}>
                        {log.action}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {log.resource_type}
                      </Badge>
                      {log.user_role && (
                        <Badge variant="secondary" className="text-xs">
                          {log.user_role}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {date} at {time}
                      </span>
                      {log.ip_address && (
                        <span>IP: {log.ip_address}</span>
                      )}
                      {log.success ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          Success
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600">
                          <AlertTriangle className="w-3 h-3" />
                          Failed
                        </span>
                      )}
                    </div>
                    
                    {log.error_message && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                        <strong>Error:</strong> {log.error_message}
                      </div>
                    )}
                    
                    {log.metadata && Object.keys(log.metadata).length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        <details>
                          <summary className="cursor-pointer hover:text-gray-700">View metadata</summary>
                          <pre className="mt-1 p-2 bg-gray-50 rounded text-xs overflow-auto">
                            {JSON.stringify(log.metadata, null, 2)}
                          </pre>
                        </details>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            {filteredLogs.length === 0 && (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Activity Logs Found</h3>
                <p className="text-gray-600">
                  {searchTerm || filterAction !== 'all' || filterSuccess !== 'all' 
                    ? 'No logs match your search criteria.'
                    : 'No activity logs found for the selected time period.'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogsPanel;