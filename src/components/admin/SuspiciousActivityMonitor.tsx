import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAutomatedReporting } from '@/hooks/useAutomatedReporting';
import { Shield, Activity, MapPin, Bell, Mail, FileText, AlertTriangle, CheckCircle, Clock, Users } from 'lucide-react';

interface SuspiciousActivity {
  id: string;
  timestamp: string;
  user_id: string;
  user_name: string;
  user_type: 'customer' | 'contractor' | 'vendor' | 'admin';
  ip_address: string;
  location: string;
  activity_type: string;
  severity: 'critical' | 'warning' | 'info';
  description: string;
  status: 'new' | 'under_review' | 'resolved' | 'false_positive';
  reported_to: string[];
  action_taken?: string;
}

const SuspiciousActivityMonitor: React.FC = () => {
  const { toast } = useToast();
  const {
    reportSchedule,
    setReportSchedule,
    notificationSettings,
    setNotificationSettings,
    notificationEmails,
    processNewActivity,
    generateWeeklyReport,
    sendReportEmail
  } = useAutomatedReporting();
  
  const [activities, setActivities] = useState<SuspiciousActivity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<SuspiciousActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<SuspiciousActivity | null>(null);
  
  // Filters
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Settings are now managed by the useAutomatedReporting hook

  // Mock data
  const mockActivities: SuspiciousActivity[] = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      user_id: 'usr_001',
      user_name: 'John Doe',
      user_type: 'contractor',
      ip_address: '203.0.113.45',
      location: 'Unknown (Foreign)',
      activity_type: 'login_new_device',
      severity: 'critical',
      description: 'Login attempt from new device in unrecognized location',
      status: 'new',
      reported_to: ['security@company.com'],
      action_taken: 'Account temporarily locked'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      user_id: 'usr_002',
      user_name: 'Jane Smith',
      user_type: 'customer',
      ip_address: '192.168.1.100',
      location: 'Cape Town, SA',
      activity_type: 'multiple_failed_logins',
      severity: 'warning',
      description: 'Multiple failed login attempts within 5 minutes',
      status: 'under_review',
      reported_to: ['security@company.com', 'admin@company.com']
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      user_id: 'usr_003',
      user_name: 'Bob Wilson',
      user_type: 'vendor',
      ip_address: '41.0.0.0',
      location: 'Johannesburg, SA',
      activity_type: 'privilege_escalation',
      severity: 'critical',
      description: 'Unusual privilege escalation attempt detected',
      status: 'resolved',
      reported_to: ['security@company.com'],
      action_taken: 'Access revoked, user contacted'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 1200000).toISOString(),
      user_id: 'usr_004',
      user_name: 'Alice Johnson',
      user_type: 'customer',
      ip_address: '102.130.0.0',
      location: 'Durban, SA',
      activity_type: 'unusual_data_access',
      severity: 'warning',
      description: 'Access to sensitive data outside normal hours',
      status: 'false_positive',
      reported_to: ['security@company.com']
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);
  }, []);

  useEffect(() => {
    let filtered = activities;

    if (severityFilter !== 'all') {
      filtered = filtered.filter(activity => activity.severity === severityFilter);
    }
    if (userTypeFilter !== 'all') {
      filtered = filtered.filter(activity => activity.user_type === userTypeFilter);
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(activity => activity.status === statusFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter(activity => 
        activity.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.ip_address.includes(searchQuery)
      );
    }

    setFilteredActivities(filtered);
  }, [activities, severityFilter, userTypeFilter, statusFilter, searchQuery]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'destructive';
      case 'under_review': return 'secondary';
      case 'resolved': return 'default';
      case 'false_positive': return 'outline';
      default: return 'outline';
    }
  };

  const handleStatusUpdate = (activityId: string, newStatus: string) => {
    setActivities(prev => prev.map(activity => 
      activity.id === activityId 
        ? { ...activity, status: newStatus as any }
        : activity
    ));

    toast({
      title: "Status Updated",
      description: `Activity marked as ${newStatus.replace('_', ' ')}`,
    });
  };

  const handleSendTestAlert = async () => {
    const testActivity: SuspiciousActivity = {
      id: 'test-' + Date.now(),
      timestamp: new Date().toISOString(),
      user_id: 'test_user',
      user_name: 'Test User',
      user_type: 'admin',
      ip_address: '192.168.1.1',
      location: 'Test Location',
      activity_type: 'test_alert',
      severity: 'warning',
      description: 'This is a test alert to verify notification systems',
      status: 'new',
      reported_to: notificationEmails
    };

    await processNewActivity(testActivity);
  };

  const handleGenerateReport = async () => {
    const report = generateWeeklyReport(activities);
    const sent = await sendReportEmail(report);
    
    if (sent) {
      toast({
        title: "Report Generated",
        description: "Weekly security report sent to all recipients",
      });
    } else {
      toast({
        title: "Report Failed",
        description: "Failed to send weekly report",
        variant: "destructive"
      });
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'login_new_device': return <Shield className="w-4 h-4" />;
      case 'multiple_failed_logins': return <AlertTriangle className="w-4 h-4" />;
      case 'privilege_escalation': return <Users className="w-4 h-4" />;
      case 'unusual_data_access': return <FileText className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Suspicious Activity Monitor
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time security monitoring • Automated alerts • Compliance reporting
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleSendTestAlert}>
            <Bell className="w-4 h-4 mr-2" />
            Send Test Alert
          </Button>
          <Button 
            className="bg-gradient-to-r from-red-600 to-orange-600 text-white"
            onClick={handleGenerateReport}
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-700">
                  {activities.filter(a => a.severity === 'critical' && a.status === 'new').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 font-medium">Under Review</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {activities.filter(a => a.status === 'under_review').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Resolved Today</p>
                <p className="text-2xl font-bold text-green-700">
                  {activities.filter(a => a.status === 'resolved').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Events</p>
                <p className="text-2xl font-bold text-blue-700">{activities.length}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="alerts">Real-Time Alerts</TabsTrigger>
          <TabsTrigger value="timeline">Activity Timeline</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          <TabsTrigger value="reports">Automated Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Activity Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="User, IP, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="severity">Severity</Label>
                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="userType">User Type</Label>
                  <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="contractor">Contractor</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="false_positive">False Positive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity List */}
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        {getActivityIcon(activity.activity_type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={getSeverityColor(activity.severity)}>
                            {activity.severity.toUpperCase()}
                          </Badge>
                          <Badge variant={getStatusColor(activity.status)}>
                            {activity.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {formatTimestamp(activity.timestamp)}
                          </span>
                        </div>
                        <h4 className="font-medium mb-1">{activity.description}</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div>User: {activity.user_name} ({activity.user_type})</div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            IP: {activity.ip_address} • Location: {activity.location}
                          </div>
                          {activity.action_taken && (
                            <div className="text-green-600">Action: {activity.action_taken}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {activity.status === 'new' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(activity.id, 'under_review')}
                          >
                            Review
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(activity.id, 'resolved')}
                          >
                            Resolve
                          </Button>
                        </>
                      )}
                      {activity.status === 'under_review' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(activity.id, 'resolved')}
                          >
                            Resolve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(activity.id, 'false_positive')}
                          >
                            False Positive
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.severity === 'critical' ? 'bg-red-500' :
                        activity.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      {index < activities.length - 1 && (
                        <div className="w-px h-8 bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{activity.user_name}</span>
                        <Badge variant="outline" className="text-xs">
                          {activity.user_type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatTimestamp(activity.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="critical-emails">Critical Alerts</Label>
                    <Switch
                      id="critical-emails"
                      checked={notificationSettings.critical}
                      onCheckedChange={(checked) =>
                        setNotificationSettings(prev => ({ ...prev, critical: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="warning-emails">Warning Alerts</Label>
                    <Switch
                      id="warning-emails"
                      checked={notificationSettings.warning}
                      onCheckedChange={(checked) =>
                        setNotificationSettings(prev => ({ ...prev, warning: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="info-emails">Info Alerts</Label>
                    <Switch
                      id="info-emails"
                      checked={notificationSettings.info}
                      onCheckedChange={(checked) =>
                        setNotificationSettings(prev => ({ ...prev, info: checked }))
                      }
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Notification Recipients</Label>
                  <div className="space-y-2">
                    {notificationEmails.map((email, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input value={email} readOnly className="text-sm" />
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    ))}
                    <Button size="sm" variant="outline">Add Recipient</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Alert Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Critical events trigger immediate notifications. Configure thresholds and escalation rules below.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-alerts">SMS Alerts for Critical Events</Label>
                    <Switch
                      id="sms-alerts"
                      checked={reportSchedule.smsAlerts}
                      onCheckedChange={(checked) =>
                        setReportSchedule(prev => ({ ...prev, smsAlerts: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Automated Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weekly-reports">Weekly Summary Reports</Label>
                    <Switch
                      id="weekly-reports"
                      checked={reportSchedule.weekly}
                      onCheckedChange={(checked) =>
                        setReportSchedule(prev => ({ ...prev, weekly: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="monthly-reports">Monthly Compliance Reports</Label>
                    <Switch
                      id="monthly-reports"
                      checked={reportSchedule.monthly}
                      onCheckedChange={(checked) =>
                        setReportSchedule(prev => ({ ...prev, monthly: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Report Schedule</Label>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Weekly: Every Monday at 8:00 AM</div>
                    <div>Monthly: First day of month at 9:00 AM</div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Configure Schedule
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <div className="font-medium">Weekly Security Report</div>
                      <div className="text-sm text-muted-foreground">July 1, 2025</div>
                    </div>
                    <Button size="sm" variant="outline">Download</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <div className="font-medium">Monthly Compliance Report</div>
                      <div className="text-sm text-muted-foreground">June 30, 2025</div>
                    </div>
                    <Button size="sm" variant="outline">Download</Button>
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

export default SuspiciousActivityMonitor;