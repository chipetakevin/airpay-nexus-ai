import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { usePermissions } from '@/hooks/usePermissions';
import { 
  Bell, 
  Send, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Smartphone,
  Mail,
  MessageSquare,
  Globe,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  message: string;
  type: 'training' | 'feature' | 'compliance' | 'announcement';
  channels: ('push' | 'email' | 'sms')[];
  priority: 'high' | 'medium' | 'low';
  multilingual: boolean;
}

interface NotificationRecipient {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  language: string;
  preferences: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
}

const NOTIFICATION_TEMPLATES: NotificationTemplate[] = [
  {
    id: 'new-training',
    name: 'New Training Available',
    subject: 'New Training Module Available: {{moduleName}}',
    message: 'A new training module "{{moduleName}}" is now available. Complete by {{deadline}}.',
    type: 'training',
    channels: ['push', 'email'],
    priority: 'high',
    multilingual: true
  },
  {
    id: 'training-reminder',
    name: 'Training Deadline Reminder',
    subject: 'Reminder: Training Due Soon',
    message: 'Your training "{{moduleName}}" is due in {{daysLeft}} days. Please complete it to stay compliant.',
    type: 'training',
    channels: ['push', 'email', 'sms'],
    priority: 'high',
    multilingual: true
  },
  {
    id: 'feature-enabled',
    name: 'Feature Access Granted',
    subject: 'New Feature Access: {{featureName}}',
    message: 'You now have access to {{featureName}}. Check your dashboard to get started.',
    type: 'feature',
    channels: ['push', 'email'],
    priority: 'medium',
    multilingual: true
  },
  {
    id: 'compliance-alert',
    name: 'Compliance Status Alert',
    subject: 'Action Required: Compliance Update',
    message: 'Your compliance status requires attention. Please review and update your information.',
    type: 'compliance',
    channels: ['push', 'email', 'sms'],
    priority: 'high',
    multilingual: true
  }
];

const MOCK_RECIPIENTS: NotificationRecipient[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+27123456789',
    role: 'contractor',
    language: 'en',
    preferences: { push: true, email: true, sms: false }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+27987654321',
    role: 'contractor',
    language: 'zu',
    preferences: { push: true, email: false, sms: true }
  }
];

export const NotificationSystem: React.FC = () => {
  const { toast } = useToast();
  const { hasRole } = usePermissions();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customMessage, setCustomMessage] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [scheduledTime, setScheduledTime] = useState('');
  const [channels, setChannels] = useState<('push' | 'email' | 'sms')[]>(['push']);
  const [sentNotifications, setSentNotifications] = useState<any[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);

  const isAdmin = hasRole(['admin', 'manager']);

  useEffect(() => {
    loadSentNotifications();
  }, []);

  const loadSentNotifications = async () => {
    // Mock data - in real implementation, fetch from API
    const mockNotifications = [
      {
        id: '1',
        templateName: 'New Training Available',
        recipientCount: 25,
        sentAt: new Date().toISOString(),
        status: 'delivered',
        channels: ['push', 'email']
      },
      {
        id: '2',
        templateName: 'Feature Access Granted',
        recipientCount: 12,
        sentAt: new Date(Date.now() - 86400000).toISOString(),
        status: 'delivered',
        channels: ['push']
      }
    ];
    setSentNotifications(mockNotifications);
  };

  const sendNotification = async () => {
    if (!selectedTemplate && !customMessage) {
      toast({
        title: "Error",
        description: "Please select a template or enter a custom message",
        variant: "destructive"
      });
      return;
    }

    if (selectedRecipients.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one recipient",
        variant: "destructive"
      });
      return;
    }

    try {
      // Mock sending notification
      console.log('Sending notification:', {
        template: selectedTemplate,
        message: customMessage,
        recipients: selectedRecipients,
        channels,
        scheduled: isScheduled ? scheduledTime : null
      });

      const newNotification = {
        id: Date.now().toString(),
        templateName: selectedTemplate ? NOTIFICATION_TEMPLATES.find(t => t.id === selectedTemplate)?.name : 'Custom Message',
        recipientCount: selectedRecipients.length,
        sentAt: new Date().toISOString(),
        status: 'delivered',
        channels
      };

      setSentNotifications(prev => [newNotification, ...prev]);

      toast({
        title: "Success",
        description: `Notification sent to ${selectedRecipients.length} recipients`,
      });

      // Reset form
      setSelectedTemplate('');
      setCustomMessage('');
      setSelectedRecipients([]);
      setChannels(['push']);
      setIsScheduled(false);
      setScheduledTime('');

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive"
      });
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'push':
        return <Smartphone className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-toggle-enabled';
      case 'pending':
        return 'text-feature-pending-text';
      case 'failed':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  if (!isAdmin) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
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
            <Bell className="h-6 w-6" />
            <span>Notification System</span>
          </h1>
          <p className="text-muted-foreground">
            Send training updates, feature notifications, and compliance alerts to contractors
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="h-5 w-5" />
              <span>Send Notification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Template Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Notification Template</label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template or create custom message" />
                </SelectTrigger>
                <SelectContent>
                  {NOTIFICATION_TEMPLATES.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {template.type}
                        </Badge>
                        <span>{template.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Message */}
            <div>
              <label className="text-sm font-medium mb-2 block">Custom Message (Optional)</label>
              <Textarea
                placeholder="Enter custom message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={3}
              />
            </div>

            {/* Recipients */}
            <div>
              <label className="text-sm font-medium mb-2 block">Recipients</label>
              <div className="space-y-2 max-h-32 overflow-y-auto border rounded p-2">
                {MOCK_RECIPIENTS.map(recipient => (
                  <div key={recipient.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedRecipients.includes(recipient.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRecipients(prev => [...prev, recipient.id]);
                        } else {
                          setSelectedRecipients(prev => prev.filter(id => id !== recipient.id));
                        }
                      }}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{recipient.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {recipient.role} • {recipient.language}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {recipient.preferences.push && <Smartphone className="h-3 w-3" />}
                      {recipient.preferences.email && <Mail className="h-3 w-3" />}
                      {recipient.preferences.sms && <MessageSquare className="h-3 w-3" />}
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setSelectedRecipients(MOCK_RECIPIENTS.map(r => r.id))}
              >
                Select All
              </Button>
            </div>

            {/* Delivery Channels */}
            <div>
              <label className="text-sm font-medium mb-2 block">Delivery Channels</label>
              <div className="flex space-x-4">
                {['push', 'email', 'sms'].map(channel => (
                  <div key={channel} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={channels.includes(channel as any)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setChannels(prev => [...prev, channel as any]);
                        } else {
                          setChannels(prev => prev.filter(c => c !== channel));
                        }
                      }}
                    />
                    <div className="flex items-center space-x-1">
                      {getChannelIcon(channel)}
                      <span className="text-sm capitalize">{channel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scheduling */}
            <div className="flex items-center space-x-3">
              <Switch
                checked={isScheduled}
                onCheckedChange={setIsScheduled}
              />
              <label className="text-sm font-medium">Schedule for later</label>
            </div>

            {isScheduled && (
              <Input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="mt-2"
              />
            )}

            {/* Send Button */}
            <Button 
              onClick={sendNotification}
              className="w-full"
              disabled={(!selectedTemplate && !customMessage) || selectedRecipients.length === 0}
            >
              <Send className="h-4 w-4 mr-2" />
              {isScheduled ? 'Schedule Notification' : 'Send Now'}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sentNotifications.map(notification => (
                <div key={notification.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{notification.templateName}</div>
                    <div className="text-xs text-muted-foreground">
                      Sent to {notification.recipientCount} recipients
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(notification.sentAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {notification.channels.map((channel: string) => (
                        <div key={channel} className="text-muted-foreground">
                          {getChannelIcon(channel)}
                        </div>
                      ))}
                    </div>
                    <Badge 
                      variant="outline"
                      className={cn("text-xs", getStatusColor(notification.status))}
                    >
                      {notification.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-toggle-enabled">{sentNotifications.length}</div>
            <div className="text-sm text-muted-foreground">Total Sent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-feature-pending-text">
              {sentNotifications.filter(n => n.status === 'delivered').length}
            </div>
            <div className="text-sm text-muted-foreground">Delivered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">{MOCK_RECIPIENTS.length}</div>
            <div className="text-sm text-muted-foreground">Total Recipients</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">11</div>
            <div className="text-sm text-muted-foreground">Languages Supported</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};