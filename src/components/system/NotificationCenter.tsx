import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePermissions } from '@/hooks/usePermissions';
import { useEmailNotifications, NotificationRecipient, NotificationEvent } from '@/hooks/useEmailNotifications';
import { 
  Mail, 
  Users, 
  History, 
  Settings, 
  Send, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Database,
  Activity,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const NotificationCenter: React.FC = () => {
  const { hasRole } = usePermissions();
  const {
    isLoading,
    recipients,
    recentNotifications,
    sendNotification,
    loadRecipients,
    updateRecipient
  } = useEmailNotifications();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [testEmail, setTestEmail] = useState('');
  const [newRecipientEmail, setNewRecipientEmail] = useState('');
  const [newRecipientName, setNewRecipientName] = useState('');

  const isAdmin = hasRole(['admin', 'manager']);

  useEffect(() => {
    loadRecipients();
  }, [loadRecipients]);

  const getEventIcon = (eventType: NotificationEvent['event_type']) => {
    switch (eventType) {
      case 'database_error':
        return <Database className="h-4 w-4" />;
      case 'auto_fix':
        return <Activity className="h-4 w-4" />;
      case 'feature_update':
        return <TrendingUp className="h-4 w-4" />;
      case 'integration_failure':
        return <AlertTriangle className="h-4 w-4" />;
      case 'scheduled_report':
        return <Mail className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: NotificationEvent['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/10 border-destructive text-destructive';
      case 'warning':
        return 'bg-feature-pending-bg border-feature-pending-border text-feature-pending-text';
      case 'info':
        return 'bg-feature-enabled-bg border-feature-enabled-border text-feature-enabled-text';
      default:
        return 'bg-muted border-muted-foreground/20';
    }
  };

  const getStatusColor = (status: NotificationEvent['status']) => {
    switch (status) {
      case 'sent':
        return 'bg-feature-enabled-bg border-feature-enabled-border text-feature-enabled-text';
      case 'pending':
        return 'bg-feature-pending-bg border-feature-pending-border text-feature-pending-text';  
      case 'failed':
        return 'bg-destructive/10 border-destructive text-destructive';
      default:
        return 'bg-muted border-muted-foreground/20';
    }
  };

  const sendTestNotification = async () => {
    if (!testEmail) return;
    
    await sendNotification(
      'scheduled_report',
      'info',
      '[TEST] Notification System Test',
      'This is a test notification to verify the email delivery system is working correctly.',
      { 
        specificRecipients: [testEmail],
        affectedSystem: 'Notification System'
      }
    );
    
    setTestEmail('');
  };

  const toggleRecipientNotificationType = async (
    recipientId: string, 
    notificationType: string, 
    enabled: boolean
  ) => {
    const recipient = recipients.find(r => r.id === recipientId);
    if (!recipient) return;

    const updatedTypes = enabled
      ? [...recipient.notification_types, notificationType]
      : recipient.notification_types.filter(type => type !== notificationType);

    await updateRecipient(recipientId, { notification_types: updatedTypes });
  };

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

  const activeRecipients = recipients.filter(r => r.is_active).length;
  const criticalNotifications = recentNotifications.filter(n => n.severity === 'critical').length;
  const todaysNotifications = recentNotifications.filter(n => 
    new Date(n.created_at).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Mail className="h-6 w-6" />
            <span>Notification Center</span>
          </h1>
          <p className="text-muted-foreground">
            Automated email notifications for critical system events and reports
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center space-x-2">
            <Input
              type="email"
              placeholder="test@example.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="w-48"
            />
            <Button 
              onClick={sendTestNotification}
              disabled={!testEmail || isLoading}
              size="sm"
            >
              <Send className="h-4 w-4 mr-2" />
              Test
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">{activeRecipients}</div>
            <div className="text-sm text-muted-foreground">Active Recipients</div>
          </CardContent>
        </Card>
        
        <Card className={criticalNotifications > 0 ? "border-destructive" : ""}>
          <CardContent className="p-6 text-center">
            <div className={`text-2xl font-bold ${criticalNotifications > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {criticalNotifications}
            </div>
            <div className="text-sm text-muted-foreground">Critical Alerts (24h)</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">{todaysNotifications}</div>
            <div className="text-sm text-muted-foreground">Notifications Today</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="recipients" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Recipients</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentNotifications.slice(0, 5).map(notification => (
                    <div key={notification.id} className="flex items-start justify-between p-3 border rounded-lg">
                      <div className="flex items-start space-x-3">
                        {getEventIcon(notification.event_type)}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{notification.title}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {notification.message.split('\n')[0]}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(notification.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <Badge variant="outline" className={cn("text-xs", getSeverityColor(notification.severity))}>
                          {notification.severity}
                        </Badge>
                        <Badge variant="outline" className={cn("text-xs", getStatusColor(notification.status))}>
                          {notification.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  {recentNotifications.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No notifications sent yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Database className="h-4 w-4 text-destructive" />
                      <div>
                        <div className="font-medium text-sm">Database Errors</div>
                        <div className="text-xs text-muted-foreground">Critical system failures</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">Auto</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Activity className="h-4 w-4 text-feature-enabled-text" />
                      <div>
                        <div className="font-medium text-sm">Auto-Fix Actions</div>
                        <div className="text-xs text-muted-foreground">Automated remediation</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">Auto</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-4 w-4 text-feature-pending-text" />
                      <div>
                        <div className="font-medium text-sm">Feature Updates</div>
                        <div className="text-xs text-muted-foreground">Approvals and deployments</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">Manual</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="font-medium text-sm">Scheduled Reports</div>
                        <div className="text-xs text-muted-foreground">Daily/weekly summaries</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">Scheduled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recipients" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Recipients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recipients.map(recipient => (
                    <div key={recipient.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-medium">{recipient.name}</h4>
                          <p className="text-sm text-muted-foreground">{recipient.email}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {recipient.role}
                          </Badge>
                        </div>
                        <Switch
                          checked={recipient.is_active}
                          onCheckedChange={(checked) => 
                            updateRecipient(recipient.id, { is_active: checked })
                          }
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Notification Types</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { key: 'database_error', label: 'Database Errors' },
                            { key: 'auto_fix', label: 'Auto-Fix Actions' },
                            { key: 'feature_update', label: 'Feature Updates' },
                            { key: 'integration_failure', label: 'Integration Failures' },
                            { key: 'scheduled_report', label: 'Scheduled Reports' }
                          ].map(type => (
                            <div key={type.key} className="flex items-center space-x-2">
                              <Switch
                                id={`${recipient.id}-${type.key}`}
                                checked={recipient.notification_types.includes(type.key)}
                                onCheckedChange={(checked) =>
                                  toggleRecipientNotificationType(recipient.id, type.key, checked)
                                }
                                disabled={!recipient.is_active}
                              />
                              <Label 
                                htmlFor={`${recipient.id}-${type.key}`}
                                className={cn(
                                  "text-sm",
                                  !recipient.is_active && "text-muted-foreground"
                                )}
                              >
                                {type.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotifications.map(notification => (
                  <div key={notification.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        {getEventIcon(notification.event_type)}
                        <div>
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message.split('\n')[0]}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={cn("text-xs", getSeverityColor(notification.severity))}>
                          {notification.severity}
                        </Badge>
                        <Badge variant="outline" className={cn("text-xs", getStatusColor(notification.status))}>
                          {notification.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Event Type</div>
                        <div className="text-muted-foreground capitalize">
                          {notification.event_type.replace('_', ' ')}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Recipients</div>
                        <div className="text-muted-foreground">
                          {notification.sent_to.length} addresses
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Component</div>
                        <div className="text-muted-foreground">
                          {notification.component || 'System'}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Sent At</div>
                        <div className="text-muted-foreground">
                          {new Date(notification.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {recentNotifications.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No notification history available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};