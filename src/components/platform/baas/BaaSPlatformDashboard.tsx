
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Brain, Users } from 'lucide-react';

// Import all the new modular components
import DashboardHeader from './dashboard/DashboardHeader';
import PlatformMetrics from './dashboard/PlatformMetrics';
import OverviewTab from './dashboard/OverviewTab';
import { tabConfig } from './dashboard/TabConfig';

// Import all the panel components
import BaaSInfrastructurePanel from './infrastructure/BaaSInfrastructurePanel';
import BaaSSecurityPanel from './security/BaaSSecurityPanel';
import BaaSAPIManagement from './api/BaaSAPIManagement';
import BaaSAnalyticsDashboard from './analytics/BaaSAnalyticsDashboard';
import BaaSMicroservicesPanel from './microservices/BaaSMicroservicesPanel';
import BaaSRealtimePanel from './realtime/BaaSRealtimePanel';
import SupabaseConfigPanel from './core/SupabaseConfigPanel';
import TransactionProcessorPanel from './core/TransactionProcessorPanel';
import AgenticBaaSAIPanel from './ai/MVNXAgenticAIPanel';
import DataMeshManagementPanel from './data/DataMeshManagementPanel';
import CustomerDataPlatformPanel from './cdp/CustomerDataPlatformPanel';
import WhatsAppBusinessPanel from './whatsapp/WhatsAppBusinessPanel';

const BaaSPlatformDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-2 md:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 lg:space-y-8">
        {/* Mobile-First Header */}
        <DashboardHeader />

        {/* Enhanced Mobile Metrics */}
        <PlatformMetrics />

        {/* Properly structured Tabs using Radix UI */}
        <Tabs defaultValue="overview" className="w-full">
          {/* Mobile Tab Navigation */}
          <div className="block lg:hidden mb-6">
            <TabsList className="grid grid-cols-3 h-auto p-1 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100">
              <TabsTrigger value="overview" className="p-3 text-xs font-medium">
                <div className="flex flex-col items-center gap-1">
                  <BarChart className="w-4 h-4" />
                  Overview
                </div>
              </TabsTrigger>
              <TabsTrigger value="agentic-ai" className="p-3 text-xs font-medium">
                <div className="flex flex-col items-center gap-1">
                  <Brain className="w-4 h-4" />
                  AI
                </div>
              </TabsTrigger>
              <TabsTrigger value="cdp" className="p-3 text-xs font-medium">
                <div className="flex flex-col items-center gap-1">
                  <Users className="w-4 h-4" />
                  CDP
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Desktop Tab Navigation */}
          <div className="hidden lg:block mb-6">
            <TabsList className="grid grid-cols-6 lg:grid-cols-12 h-auto p-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 gap-1">
              {tabConfig.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex flex-col items-center gap-2 p-3 h-auto data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-50 data-[state=active]:to-purple-50 data-[state=active]:text-gray-900 rounded-xl transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                    {tab.icon}
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-semibold">{tab.label}</div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          <TabsContent value="overview" className="mt-0 space-y-6">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="agentic-ai" className="mt-0">
            <AgenticBaaSAIPanel />
          </TabsContent>

          <TabsContent value="data-mesh" className="mt-0">
            <DataMeshManagementPanel />
          </TabsContent>

          <TabsContent value="cdp" className="mt-0">
            <CustomerDataPlatformPanel />
          </TabsContent>

          <TabsContent value="whatsapp-business" className="mt-0">
            <WhatsAppBusinessPanel />
          </TabsContent>

          <TabsContent value="supabase" className="mt-0">
            <SupabaseConfigPanel />
          </TabsContent>

          <TabsContent value="transactions" className="mt-0">
            <TransactionProcessorPanel />
          </TabsContent>

          <TabsContent value="infrastructure" className="mt-0">
            <BaaSInfrastructurePanel />
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <BaaSSecurityPanel />
          </TabsContent>

          <TabsContent value="api" className="mt-0">
            <BaaSAPIManagement />
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <BaaSAnalyticsDashboard />
          </TabsContent>

          <TabsContent value="realtime" className="mt-0">
            <BaaSRealtimePanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BaaSPlatformDashboard;
