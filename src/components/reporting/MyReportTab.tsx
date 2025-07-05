import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePermissions } from '@/hooks/usePermissions';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { ContractorDashboard } from './ContractorDashboard';
import { AdminReportDashboard } from './AdminReportDashboard';
import { ReportFilters } from './ReportFilters';
import { ActivityLog } from './ActivityLog';
import { CommissionTracker } from './CommissionTracker';
import { ExportControls } from './ExportControls';
import { Shield, BarChart3, FileText, Users, TrendingUp } from 'lucide-react';
import FeatureGuard from '@/components/common/FeatureGuard';

export interface ReportFilters {
  taskType: string[];
  project: string[];
  employeeRole: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  status: string[];
  location: string[];
}

export interface ActivityData {
  id: string;
  timestamp: Date;
  taskType: string;
  project?: string;
  status: 'completed' | 'pending' | 'approved' | 'rejected';
  commission: number;
  location?: string;
  contractorId: string;
  contractorName: string;
}

const MyReportTab: React.FC = () => {
  const { hasPermission, hasRole, isLoading } = usePermissions();
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState<ReportFilters>({
    taskType: [],
    project: [],
    employeeRole: [],
    dateRange: { start: null, end: null },
    status: [],
    location: []
  });

  // Mock data - in real implementation, this would come from API
  const [reportData, setReportData] = useState({
    dailyPerformance: {
      jobsCompleted: 8,
      successRate: 100,
      commissionEarned: 400,
      pendingApproval: 2
    },
    monthToDate: {
      jobsCompleted: 120,
      successRate: 98,
      commissionEarned: 6000,
      pendingApproval: 5
    },
    activities: [] as ActivityData[]
  });

  // Determine user role and permissions
  const isAdmin = hasRole(['admin', 'manager']);
  const isContractor = hasRole('contractor') || currentUser?.userType === 'vendor';
  const canExport = hasPermission('reports', 'export');
  const canViewAll = hasPermission('reports', 'view') && isAdmin;

  useEffect(() => {
    // Load report data based on user role and filters
    loadReportData();
  }, [filters, currentUser]);

  const loadReportData = async () => {
    // In real implementation, make API calls based on user role and filters
    console.log('Loading report data for user:', currentUser?.userType);
    console.log('Applied filters:', filters);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse">Loading reports...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="pt-6">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Authentication Required</h3>
            <p className="text-muted-foreground">Please log in to access your reports.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Reports</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Manage and view all contractor reports' : 'View your performance and activity reports'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isAdmin ? 'default' : 'secondary'}>
            {isAdmin ? 'Admin Access' : 'Contractor View'}
          </Badge>
          {canExport && (
            <ExportControls 
              data={reportData}
              filters={filters}
              onExport={(format) => console.log('Export:', format)}
            />
          )}
        </div>
      </div>

      {/* Filters */}
      <ReportFilters
        filters={filters}
        onFiltersChange={setFilters}
        userRole={isAdmin ? 'admin' : 'contractor'}
        showAllOptions={canViewAll}
      />

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Activities</span>
          </TabsTrigger>
          <TabsTrigger value="commissions" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Commissions</span>
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="management" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Management</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <FeatureGuard featureKey="report_viewing">
            {isAdmin ? (
              <AdminReportDashboard
                reportData={reportData}
                filters={filters}
                onDataUpdate={setReportData}
              />
            ) : (
              <ContractorDashboard
                reportData={reportData}
                contractorId={currentUser?.id || ''}
                filters={filters}
              />
            )}
          </FeatureGuard>
        </TabsContent>

        <TabsContent value="activities" className="mt-6">
          <ActivityLog
            activities={reportData.activities}
            canEdit={isAdmin}
            showAllContractors={canViewAll}
            filters={filters}
          />
        </TabsContent>

        <TabsContent value="commissions" className="mt-6">
          <FeatureGuard featureKey="commission_tracking">
            <CommissionTracker
              dailyEarnings={reportData.dailyPerformance.commissionEarned}
              monthToDateEarnings={reportData.monthToDate.commissionEarned}
              pendingAmount={reportData.dailyPerformance.pendingApproval * 50} // Mock calculation
              canViewPayroll={hasPermission('user_management', 'view')}
              contractorId={currentUser?.id || ''}
              isAdmin={isAdmin}
            />
          </FeatureGuard>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="management" className="mt-6">
            <AdminReportDashboard
              reportData={reportData}
              filters={filters}
              onDataUpdate={setReportData}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default MyReportTab;