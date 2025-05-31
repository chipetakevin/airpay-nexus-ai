
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Server, 
  Database, 
  Shield, 
  Zap,
  Globe,
  TrendingUp
} from 'lucide-react';
import AutonomousScrapingStatus from './AutonomousScrapingStatus';

const SystemInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Server className="w-4 h-4" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">API Status</span>
            <Badge className="bg-green-100 text-green-800">Online</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Database</span>
            <Badge className="bg-green-100 text-green-800">Connected</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Security</span>
            <Badge className="bg-blue-100 text-blue-800">SSL Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Performance</span>
            <Badge className="bg-green-100 text-green-800">Optimal</Badge>
          </div>
        </CardContent>
      </Card>

      <AutonomousScrapingStatus />

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Deal Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Active Deals</span>
            <Badge variant="outline">Live</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Avg. Savings</span>
            <Badge className="bg-green-100 text-green-800">15-25%</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Verification</span>
            <Badge className="bg-blue-100 text-blue-800">AI Verified</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Updates</span>
            <Badge className="bg-orange-100 text-orange-800">Real-time</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Coverage & Sources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-xs text-gray-600 space-y-1">
            <div>🏪 Major Retailers: Takealot, Game, Makro</div>
            <div>📱 Network Stores: Vodacom, MTN, Cell C</div>
            <div>🛒 Online Marketplaces: Multiple sources</div>
            <div>⚡ Update Frequency: Every 60 seconds</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemInfo;
