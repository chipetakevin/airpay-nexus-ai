
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

      {/* Main Content Tabs - Enhanced Mobile First Design */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-8">
          <TabsList className="w-full h-auto bg-gradient-to-r from-gray-50 to-white border-2 border-gray-100 shadow-xl rounded-2xl p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
              <TabsTrigger 
                value="shopping" 
                className="flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-500 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-105 hover:bg-gray-50 hover:shadow-lg group"
              >
                <div className="text-3xl group-data-[state=active]:animate-bounce">🛒</div>
                <div className="text-center">
                  <div className="text-sm font-bold">Shopping</div>
                  <div className="text-xs opacity-75 mt-1">Mobile Services</div>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full group-data-[state=active]:bg-white/30 transition-all duration-300"></div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="business" 
                className="flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-500 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-105 hover:bg-gray-50 hover:shadow-lg group"
              >
                <div className="text-3xl group-data-[state=active]:animate-pulse">🏢</div>
                <div className="text-center">
                  <div className="text-sm font-bold">Business</div>
                  <div className="text-xs opacity-75 mt-1">Platform</div>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full group-data-[state=active]:bg-white/30 transition-all duration-300"></div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="assistant" 
                className="flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-500 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-105 hover:bg-gray-50 hover:shadow-lg group"
              >
                <div className="text-3xl group-data-[state=active]:animate-spin">🤖</div>
                <div className="text-center">
                  <div className="text-sm font-bold">AI Assistant</div>
                  <div className="text-xs opacity-75 mt-1">Smart Help</div>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full group-data-[state=active]:bg-white/30 transition-all duration-300"></div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="analytics" 
                className="flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-500 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-105 hover:bg-gray-50 hover:shadow-lg group"
              >
                <div className="text-3xl group-data-[state=active]:animate-pulse">📊</div>
                <div className="text-center">
                  <div className="text-sm font-bold">Analytics</div>
                  <div className="text-xs opacity-75 mt-1">Insights</div>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full group-data-[state=active]:bg-white/30 transition-all duration-300"></div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="settings" 
                className="flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-500 data-[state=active]:bg-gradient-to-br data-[state=active]:from-gray-500 data-[state=active]:to-slate-600 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-105 hover:bg-gray-50 hover:shadow-lg group"
              >
                <div className="text-3xl group-data-[state=active]:animate-spin">⚙️</div>
                <div className="text-center">
                  <div className="text-sm font-bold">Settings</div>
                  <div className="text-xs opacity-75 mt-1">Configure</div>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full group-data-[state=active]:bg-white/30 transition-all duration-300"></div>
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

        <TabsContent value="shopping" className="space-y-6 animate-fade-in">
          <WhatsAppShoppingTab />
        </TabsContent>

        <TabsContent value="business" className="space-y-6 animate-fade-in">
          <WhatsAppBusinessPlatform />
        </TabsContent>

        <TabsContent value="assistant" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-[600px] shadow-xl border-2 border-purple-100">
                <CardContent className="p-0 h-full">
                  <WhatsAppAssistant />
                </CardContent>
              </Card>
            </div>
            <RecentConversations />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 animate-fade-in">
          <WhatsAppAnalytics />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 animate-fade-in">
          <WhatsAppSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppIntegration;
