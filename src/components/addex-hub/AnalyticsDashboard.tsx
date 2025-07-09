import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Target, Brain, Activity } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <Badge className="bg-blue-500">Revenue</Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">R2.4M</div>
            <div className="text-sm text-blue-600">Monthly Revenue</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-6 h-6 text-green-600" />
              <Badge className="bg-green-500">Growth</Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">15.2%</div>
            <div className="text-sm text-green-600">Customer Growth</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-6 h-6 text-purple-600" />
              <Badge className="bg-purple-500">Efficiency</Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">94.7%</div>
            <div className="text-sm text-purple-600">Automation Rate</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Brain className="w-6 h-6 text-orange-600" />
              <Badge className="bg-orange-500">AI</Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">2,847</div>
            <div className="text-sm text-orange-600">AI Predictions</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Predictive Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Advanced analytics and reporting interface</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};