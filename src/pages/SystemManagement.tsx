import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AutoErrorDetectionSystem } from '@/components/system/AutoErrorDetectionSystem';
import { DatabaseManagementPlatform } from '@/components/system/DatabaseManagementPlatform';
import { Activity, Database } from 'lucide-react';

export const SystemManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('error-detection');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">System Management Center</h1>
          <p className="text-muted-foreground">
            Automated error detection, database management, and system health monitoring
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="error-detection" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Auto Error Detection
            </TabsTrigger>
            <TabsTrigger value="database-management" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Database Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="error-detection">
            <AutoErrorDetectionSystem />
          </TabsContent>

          <TabsContent value="database-management">
            <DatabaseManagementPlatform />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};