
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bell, Send, Download } from 'lucide-react';
import CommunicationSettings from './CommunicationSettings';
import StakeholderPreferences from './StakeholderPreferences';
import NotificationTemplates from './NotificationTemplates';
import NotificationHistory from './NotificationHistory';
import NotificationAnalytics from './NotificationAnalytics';

const NotificationCenter = () => {
  const { toast } = useToast();
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState({
    customers: { email: true, whatsapp: true, sms: false },
    vendors: { email: true, whatsapp: true, sms: true },
    admins: { email: true, whatsapp: false, sms: false },
    unregistered: { email: false, whatsapp: true, sms: true }
  });

  const recentNotifications = [
    {
      id: 'N001',
      type: 'Transaction Receipt',
      recipient: 'Customer - John Doe',
      channel: 'Email + WhatsApp',
      status: 'Sent',
      timestamp: '2 min ago',
      content: 'R50 MTN Airtime Purchase Receipt'
    },
    {
      id: 'N002',
      type: 'Profit Report',
      recipient: 'Vendor - Sarah\'s Shop',
      channel: 'Email',
      status: 'Delivered',
      timestamp: '15 min ago',
      content: 'Weekly profit summary R2,450'
    },
    {
      id: 'N003',
      type: 'Gift Notification',
      recipient: 'Unregistered - +27821234567',
      channel: 'WhatsApp',
      status: 'Delivered',
      timestamp: '1 hour ago',
      content: 'You received R100 airtime gift'
    }
  ];

  const handleSendTestNotification = (channel: string) => {
    toast({
      title: `Test ${channel} Sent!`,
      description: `Sample notification sent via ${channel}`,
    });
  };

  const handleBulkNotification = () => {
    toast({
      title: "Bulk Notifications Sent!",
      description: "Reports sent to all active stakeholders",
    });
  };

  const handleExportReport = () => {
    toast({
      title: "Report Exported",
      description: "Notification report downloaded successfully",
    });
  };

  return (
    <div className="space-y-4 p-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-600" />
            📧 Notification Center
          </h2>
          <p className="text-sm text-gray-600">Multi-channel communication hub</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleBulkNotification}>
            <Send className="w-4 h-4 mr-1" />
            Send Bulk
          </Button>
          <Button size="sm" variant="outline" onClick={handleExportReport}>
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CommunicationSettings
              emailEnabled={emailEnabled}
              whatsappEnabled={whatsappEnabled}
              smsEnabled={smsEnabled}
              onEmailToggle={setEmailEnabled}
              onWhatsappToggle={setWhatsappEnabled}
              onSmsToggle={setSmsEnabled}
              onTestNotification={handleSendTestNotification}
            />
            <StakeholderPreferences
              notificationSettings={notificationSettings}
              onSettingsChange={setNotificationSettings}
            />
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <NotificationTemplates />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <NotificationHistory notifications={recentNotifications} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <NotificationAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;
