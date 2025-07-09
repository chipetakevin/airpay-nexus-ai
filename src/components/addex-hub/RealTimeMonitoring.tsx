import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Activity, Network, CheckCircle } from 'lucide-react';

export const RealTimeMonitoring: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Network className="w-6 h-6 text-green-600" />
              <Badge className="bg-green-500">Online</Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">99.9%</div>
            <div className="text-sm text-green-600">Network Uptime</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-6 h-6 text-blue-600" />
              <Badge className="bg-blue-500">Live</Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">2,847</div>
            <div className="text-sm text-blue-600">Active Sessions</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-6 h-6 text-purple-600" />
              <Badge className="bg-purple-500">Healthy</Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">156</div>
            <div className="text-sm text-purple-600">Services Running</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-6 h-6 text-orange-600" />
              <Badge className="bg-orange-500">Monitoring</Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">1.2s</div>
            <div className="text-sm text-orange-600">Avg Response</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-blue-600" />
            Real-Time System Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Live monitoring dashboard with real-time metrics</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};