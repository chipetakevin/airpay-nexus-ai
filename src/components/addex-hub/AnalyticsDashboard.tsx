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

      {/* Main Analytics Interface Card - Updated to match image layout */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-2xl shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 sm:p-4 bg-primary/10 rounded-2xl shrink-0">
                <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                  Predictive Analytics Dashboard
                </h2>
                <p className="text-primary/80 text-lg">
                  Advanced analytics and reporting interface
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center py-12 text-muted-foreground">
            <Activity className="w-16 h-16 mx-auto mb-6 opacity-50" />
            <p className="text-lg">Advanced analytics and reporting interface coming soon</p>
            <p className="text-sm mt-2">Real-time insights and predictive modeling</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};