import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, DollarSign, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';

interface CommissionTrackerProps {
  dailyEarnings: number;
  monthToDateEarnings: number;
  pendingAmount: number;
  canViewPayroll: boolean;
  contractorId: string;
  isAdmin: boolean;
}

export const CommissionTracker: React.FC<CommissionTrackerProps> = ({
  dailyEarnings,
  monthToDateEarnings,
  pendingAmount,
  canViewPayroll,
  contractorId,
  isAdmin
}) => {
  // Mock contract data
  const contractDetails = {
    type: 'Standard Field Contractor',
    commissionRate: 50,
    paymentStructure: 'Per approved job',
    monthlyTarget: 7500,
    bonusThreshold: 8000,
    nextPaymentDate: '2025-01-31'
  };

  const progressToTarget = (monthToDateEarnings / contractDetails.monthlyTarget) * 100;
  const remainingToTarget = Math.max(0, contractDetails.monthlyTarget - monthToDateEarnings);
  const bonusEligible = monthToDateEarnings >= contractDetails.bonusThreshold;

  const handleViewContract = () => {
    console.log('Viewing contract for contractor:', contractorId);
    // In real implementation, open contract modal or navigate to contract page
  };

  const handleViewPayroll = () => {
    console.log('Viewing payroll summary');
    // In real implementation, open payroll modal or navigate to payroll page
  };

  return (
    <div className="space-y-6">
      {/* Commission Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {dailyEarnings}</div>
            <p className="text-xs text-muted-foreground">
              Current day total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Month to Date</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {monthToDateEarnings}</div>
            <p className="text-xs text-muted-foreground">
              Total this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {pendingAmount}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractDetails.nextPaymentDate.split('-')[2]}</div>
            <p className="text-xs text-muted-foreground">
              {contractDetails.nextPaymentDate}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Target Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to Target</span>
                <span>{Math.round(progressToTarget)}%</span>
              </div>
              <Progress value={progressToTarget} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>R {monthToDateEarnings}</span>
                <span>R {contractDetails.monthlyTarget}</span>
              </div>
            </div>
            
            {remainingToTarget > 0 ? (
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium">R {remainingToTarget} remaining to target</p>
                <p className="text-xs text-muted-foreground">
                  Approximately {Math.ceil(remainingToTarget / contractDetails.commissionRate)} more jobs needed
                </p>
              </div>
            ) : (
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  🎉 Monthly target achieved!
                </p>
              </div>
            )}

            {bonusEligible && (
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Bonus threshold reached!
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contract Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Contract Type</span>
                <Badge variant="outline">{contractDetails.type}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Commission Rate</span>
                <Badge variant="secondary">R {contractDetails.commissionRate} per job</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Payment Structure</span>
                <span className="text-sm text-muted-foreground">{contractDetails.paymentStructure}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Monthly Target</span>
                <span className="text-sm font-medium">R {contractDetails.monthlyTarget}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Bonus Threshold</span>
                <span className="text-sm font-medium">R {contractDetails.bonusThreshold}</span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full" onClick={handleViewContract}>
                <Eye className="h-4 w-4 mr-2" />
                View Contract Details
              </Button>
              {canViewPayroll && (
                <Button variant="outline" size="sm" className="w-full" onClick={handleViewPayroll}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Payroll Summary
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-green-600">R {monthToDateEarnings - pendingAmount}</div>
                <p className="text-sm text-muted-foreground">Approved & Paid</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">R {pendingAmount}</div>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold">R {monthToDateEarnings}</div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
              </div>
            </div>

            {isAdmin && (
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span>Admin view: Full payroll and contract management available in Management tab</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};