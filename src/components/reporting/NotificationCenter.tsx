
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  MessageSquare, 
  Bell, 
  Send, 
  Users, 
  FileText,
  Download,
  Share2
} from 'lucide-react';

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
            {/* Channel Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Communication Channels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Email Notifications</span>
                  </div>
                  <Switch 
                    checked={emailEnabled} 
                    onCheckedChange={setEmailEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                    <span className="text-sm">WhatsApp Messages</span>
                  </div>
                  <Switch 
                    checked={whatsappEnabled} 
                    onCheckedChange={setWhatsappEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">SMS Notifications</span>
                  </div>
                  <Switch 
                    checked={smsEnabled} 
                    onCheckedChange={setSmsEnabled}
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <Button size="sm" variant="outline" onClick={() => handleSendTestNotification('Email')}>
                    Test Email
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleSendTestNotification('WhatsApp')}>
                    Test WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stakeholder Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Stakeholder Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notificationSettings).map(([group, settings]) => (
                  <div key={group} className="space-y-2">
                    <div className="font-medium text-sm capitalize">{group}</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <input 
                          type="checkbox" 
                          checked={settings.email}
                          onChange={(e) => setNotificationSettings(prev => ({
                            ...prev,
                            [group]: { ...prev[group], email: e.target.checked }
                          }))}
                        />
                        <span>Email</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input 
                          type="checkbox" 
                          checked={settings.whatsapp}
                          onChange={(e) => setNotificationSettings(prev => ({
                            ...prev,
                            [group]: { ...prev[group], whatsapp: e.target.checked }
                          }))}
                        />
                        <span>WhatsApp</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input 
                          type="checkbox" 
                          checked={settings.sms}
                          onChange={(e) => setNotificationSettings(prev => ({
                            ...prev,
                            [group]: { ...prev[group], sms: e.target.checked }
                          }))}
                        />
                        <span>SMS</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Receipt Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs bg-gray-50 p-3 rounded">
                  <div className="font-semibold">Transaction Receipt</div>
                  <div className="mt-1">Hi {{name}}, your R{{amount}} {{network}} purchase is complete. Profit earned: R{{profit}}. Thank you!</div>
                </div>
                <Button size="sm" variant="outline">Edit Template</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Profit Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs bg-gray-50 p-3 rounded">
                  <div className="font-semibold">Weekly Profit Summary</div>
                  <div className="mt-1">Your AirPay profits: R{{total_profit}}. Transactions: {{count}}. Keep growing!</div>
                </div>
                <Button size="sm" variant="outline">Edit Template</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="space-y-3">
            {recentNotifications.map((notification) => (
              <Card key={notification.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-sm">{notification.type}</div>
                      <div className="text-xs text-gray-600">{notification.recipient}</div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {notification.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{notification.timestamp}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mb-2">{notification.content}</div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      {notification.channel}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <Share2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <Mail className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                <div className="text-lg font-bold text-blue-600">2,456</div>
                <div className="text-xs text-gray-600">Emails Sent</div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <MessageSquare className="w-6 h-6 mx-auto text-green-600 mb-2" />
                <div className="text-lg font-bold text-green-600">1,892</div>
                <div className="text-xs text-gray-600">WhatsApp Sent</div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 mx-auto text-purple-600 mb-2" />
                <div className="text-lg font-bold text-purple-600">98.5%</div>
                <div className="text-xs text-gray-600">Delivery Rate</div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <FileText className="w-6 h-6 mx-auto text-orange-600 mb-2" />
                <div className="text-lg font-bold text-orange-600">456</div>
                <div className="text-xs text-gray-600">Reports Generated</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;
