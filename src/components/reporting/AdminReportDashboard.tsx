import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Users, TrendingUp, Calendar, AlertCircle, Search, Filter } from 'lucide-react';
import type { ReportFilters, ActivityData } from './MyReportTab';

interface AdminReportDashboardProps {
  reportData: {
    dailyPerformance: {
      jobsCompleted: number;
      successRate: number;
      commissionEarned: number;
      pendingApproval: number;
    };
    monthToDate: {
      jobsCompleted: number;
      successRate: number;
      commissionEarned: number;
      pendingApproval: number;
    };
    activities: ActivityData[];
  };
  filters: ReportFilters;
  onDataUpdate: (data: any) => void;
}

export const AdminReportDashboard: React.FC<AdminReportDashboardProps> = ({
  reportData,
  filters,
  onDataUpdate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContractor, setSelectedContractor] = useState('all');

  // Mock contractor data - in real implementation, this would come from API
  const contractors = [
    { id: '1', name: 'John Doe', performance: 95, earnings: 1200 },
    { id: '2', name: 'Jane Smith', performance: 88, earnings: 980 },
    { id: '3', name: 'Mike Johnson', performance: 92, earnings: 1100 },
  ];

  const handleApproveActivity = (activityId: string) => {
    console.log('Approving activity:', activityId);
    // In real implementation, make API call to approve
  };

  const handleRejectActivity = (activityId: string) => {
    console.log('Rejecting activity:', activityId);
    // In real implementation, make API call to reject
  };

  return (
    <div className="space-y-6">
      {/* Admin Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Admin Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contractors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
            <Select value={selectedContractor} onValueChange={setSelectedContractor}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select contractor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Contractors</SelectItem>
                {contractors.map((contractor) => (
                  <SelectItem key={contractor.id} value={contractor.id}>
                    {contractor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contractors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractors.length}</div>
            <p className="text-xs text-muted-foreground">
              Active field contractors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.dailyPerformance.jobsCompleted}</div>
            <p className="text-xs text-muted-foreground">
              Across all contractors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.dailyPerformance.pendingApproval}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {reportData.monthToDate.commissionEarned}</div>
            <p className="text-xs text-muted-foreground">
              Month to date
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contractor Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contractor Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Contractor</th>
                  <th className="text-left p-2">Performance</th>
                  <th className="text-left p-2">Earnings (MTD)</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contractors
                  .filter(contractor => 
                    selectedContractor === 'all' || contractor.id === selectedContractor
                  )
                  .filter(contractor =>
                    contractor.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((contractor) => (
                    <tr key={contractor.id} className="border-b">
                      <td className="p-2 font-medium">{contractor.name}</td>
                      <td className="p-2">
                        <Badge variant={contractor.performance >= 90 ? 'default' : 'secondary'}>
                          {contractor.performance}%
                        </Badge>
                      </td>
                      <td className="p-2">R {contractor.earnings}</td>
                      <td className="p-2">
                        <Badge variant="outline">Active</Badge>
                      </td>
                      <td className="p-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pending Approvals */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          {reportData.activities.filter(a => a.status === 'pending').length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No pending approvals at this time.
            </p>
          ) : (
            <div className="space-y-3">
              {reportData.activities
                .filter(a => a.status === 'pending')
                .slice(0, 5)
                .map((activity) => (
                  <div key={activity.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">{activity.taskType}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.contractorName} • {activity.timestamp.toLocaleString()}
                      </p>
                      {activity.location && (
                        <p className="text-xs text-muted-foreground">{activity.location}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRejectActivity(activity.id)}
                      >
                        Reject
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleApproveActivity(activity.id)}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};