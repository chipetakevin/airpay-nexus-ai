import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AutoErrorDetectionSystem } from '@/components/system/AutoErrorDetectionSystem';
import { DatabaseManagementPlatform } from '@/components/system/DatabaseManagementPlatform';
import { NotificationCenter } from '@/components/system/NotificationCenter';
import { Activity, Database, Mail } from 'lucide-react';

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
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="error-detection" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Auto Error Detection</span>
              <span className="sm:hidden">Errors</span>
            </TabsTrigger>
            <TabsTrigger value="database-management" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Database Management</span>
              <span className="sm:hidden">Database</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
              <span className="sm:hidden">Alerts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="error-detection">
            <AutoErrorDetectionSystem />
          </TabsContent>

          <TabsContent value="database-management">
            <DatabaseManagementPlatform />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationCenter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};