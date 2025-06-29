
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wifi, Users, Award, Clock, AlertTriangle, CheckCircle, Gift } from 'lucide-react';
import { EligibilityChecker } from './EligibilityChecker';

interface DataPoolManagementProps {
  userData: any;
}

export const DataPoolManagement = ({ userData }: DataPoolManagementProps) => {
  const [poolStats] = useState({
    totalCredits: 2500,
    usedCredits: 750,
    availableCredits: 1750,
    membersCount: 12,
    expiryDays: 25
  });

  const usagePercentage = (poolStats.usedCredits / poolStats.totalCredits) * 100;

  const handleAllocateData = () => {
    console.log('Allocating data from pool...');
  };

  const handleRequestAccess = () => {
    console.log('Requesting pool access...');
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Smaller, More Appealing Title */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-3 rounded-2xl border border-purple-200 shadow-sm">
          <Wifi className="w-6 h-6 text-purple-600" />
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Smart Data Pool
            </h2>
            <p className="text-sm text-gray-600">Shared data credits for everyone</p>
          </div>
          <Gift className="w-5 h-5 text-blue-500" />
        </div>
      </div>

      {/* Eligibility Check */}
      <EligibilityChecker />

      {/* Pool Status Overview */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wifi className="w-5 h-5 text-purple-600" />
            Pool Status
            <Badge className="bg-green-500 text-white ml-auto">
              <CheckCircle className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Credits Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-xl border border-purple-100">
              <div className="text-2xl font-bold text-purple-600">
                {poolStats.totalCredits.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Credits</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">
                {poolStats.availableCredits.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
              <div className="text-2xl font-bold text-gray-600">
                {poolStats.membersCount}
              </div>
              <div className="text-sm text-gray-600">Active Members</div>
            </div>
          </div>

          {/* Usage Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pool Usage</span>
              <span className="font-medium">{usagePercentage.toFixed(1)}%</span>
            </div>
            <Progress value={usagePercentage} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{poolStats.usedCredits} used</span>
              <span>{poolStats.availableCredits} remaining</span>
            </div>
          </div>

          {/* Expiry Warning */}
          <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Clock className="w-4 h-4 text-yellow-600" />
            <div className="text-sm">
              <span className="font-medium text-yellow-800">
                Pool expires in {poolStats.expiryDays} days
              </span>
              <div className="text-yellow-600">Use your credits before expiry</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Award className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Allocate Data</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get your share of pool credits
            </p>
            <Button 
              onClick={handleAllocateData}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Claim Credits
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Pool Members</h3>
            <p className="text-sm text-gray-600 mb-4">
              View active pool participants
            </p>
            <Button 
              variant="outline" 
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              View Members
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Pool Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Data allocation successful</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  +50 MB
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
