import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Calendar, CheckCircle, Clock, DollarSign } from 'lucide-react';
import type { ReportFilters, ActivityData } from './MyReportTab';

interface ContractorDashboardProps {
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
  contractorId: string;
  filters: ReportFilters;
}

export const ContractorDashboard: React.FC<ContractorDashboardProps> = ({
  reportData,
  contractorId,
  filters
}) => {
  const { dailyPerformance, monthToDate } = reportData;

  return (
    <div className="space-y-6">
      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Jobs</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyPerformance.jobsCompleted}</div>
            <p className="text-xs text-muted-foreground">
              {dailyPerformance.successRate}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {dailyPerformance.commissionEarned}</div>
            <p className="text-xs text-muted-foreground">
              {dailyPerformance.pendingApproval} pending approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Month to Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthToDate.jobsCompleted}</div>
            <p className="text-xs text-muted-foreground">
              jobs completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MTD Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {monthToDate.commissionEarned}</div>
            <p className="text-xs text-muted-foreground">
              {monthToDate.pendingApproval} pending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Success Rate</span>
                <span>{dailyPerformance.successRate}%</span>
              </div>
              <Progress value={dailyPerformance.successRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Monthly Goal</span>
                <span>{Math.round((monthToDate.jobsCompleted / 150) * 100)}%</span>
              </div>
              <Progress value={(monthToDate.jobsCompleted / 150) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {monthToDate.jobsCompleted} of 150 monthly target
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commission Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Today</span>
              <Badge variant="secondary">R {dailyPerformance.commissionEarned}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">This Month</span>
              <Badge variant="default">R {monthToDate.commissionEarned}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Pending Approval</span>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                R {(dailyPerformance.pendingApproval + monthToDate.pendingApproval) * 50}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {reportData.activities.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No activities recorded yet today.
            </p>
          ) : (
            <div className="space-y-3">
              {reportData.activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{activity.taskType}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={activity.status === 'completed' ? 'default' : 'outline'}
                    >
                      {activity.status}
                    </Badge>
                    <p className="text-sm font-medium mt-1">R {activity.commission}</p>
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