
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
import WhatsAppShoppingTab from './WhatsAppShoppingTab';

const WhatsAppIntegration = () => {
  const [activeTab, setActiveTab] = useState('shopping');

  return (
    <div className="space-y-6">
      {/* Header */}
      <WhatsAppHeader />

      {/* Metrics Overview */}
      <WhatsAppMetrics />

      {/* Main Content Tabs - Mobile First Design */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-6">
          <TabsList className="w-full h-auto bg-white border shadow-sm rounded-xl p-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
              <TabsTrigger 
                value="shopping" 
                className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <span className="text-2xl">🛒</span>
                <span className="text-sm font-medium">Shopping</span>
                <span className="text-xs opacity-75">Mobile Services</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="business" 
                className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <span className="text-2xl">🏢</span>
                <span className="text-sm font-medium">Business</span>
                <span className="text-xs opacity-75">Platform</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="assistant" 
                className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <span className="text-2xl">🤖</span>
                <span className="text-sm font-medium">AI Assistant</span>
                <span className="text-xs opacity-75">Smart Help</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="analytics" 
                className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <span className="text-2xl">📊</span>
                <span className="text-sm font-medium">Analytics</span>
                <span className="text-xs opacity-75">Insights</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="settings" 
                className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-slate-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <span className="text-2xl">⚙️</span>
                <span className="text-sm font-medium">Settings</span>
                <span className="text-xs opacity-75">Configure</span>
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

        <TabsContent value="shopping" className="space-y-6">
          <WhatsAppShoppingTab />
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <WhatsAppBusinessPlatform />
        </TabsContent>

        <TabsContent value="assistant" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-[600px]">
                <CardContent className="p-0 h-full">
                  <WhatsAppAssistant />
                </CardContent>
              </Card>
            </div>
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
