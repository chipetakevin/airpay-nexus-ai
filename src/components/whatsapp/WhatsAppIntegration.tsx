
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WhatsAppAssistant from './WhatsAppAssistant';
import WhatsAppBusinessPlatform from './WhatsAppBusinessPlatform';
import WhatsAppHeader from './WhatsAppHeader';
import WhatsAppMetrics from './WhatsAppMetrics';
import RecentConversations from './RecentConversations';
import WhatsAppAnalytics from './WhatsAppAnalytics';
import WhatsAppSettings from './WhatsAppSettings';

const WhatsAppIntegration = () => {
  const [activeTab, setActiveTab] = useState('business');

  return (
    <div className="space-y-6">
      {/* Header */}
      <WhatsAppHeader />

      {/* Metrics Overview */}
      <WhatsAppMetrics />

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="business">Business Platform</TabsTrigger>
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="business" className="space-y-6">
          <WhatsAppBusinessPlatform />
        </TabsContent>

        <TabsContent value="assistant" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* WhatsApp Assistant Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px]">
                <CardContent className="p-0 h-full">
                  <WhatsAppAssistant />
                </CardContent>
              </Card>
            </div>

            {/* Recent Conversations */}
            <RecentConversations />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <WhatsAppAnalytics />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <WhatsAppSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppIntegration;
