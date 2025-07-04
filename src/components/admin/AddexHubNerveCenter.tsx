import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  ChevronDown, 
  Activity, 
  Shield, 
  Database,
  Zap,
  Users,
  BarChart3,
  Globe,
  Terminal
} from 'lucide-react';

const AddexHubNerveCenter: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const systemMetrics = [
    { label: 'Active Sessions', value: '247', status: 'online', icon: Users },
    { label: 'System Load', value: '73%', status: 'normal', icon: BarChart3 },
    { label: 'Security Status', value: 'Secure', status: 'secure', icon: Shield },
    { label: 'Database Health', value: '98%', status: 'excellent', icon: Database },
    { label: 'Network Status', value: 'Optimal', status: 'online', icon: Globe },
    { label: 'Processing Queue', value: '12', status: 'normal', icon: Zap }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'secure':
      case 'excellent':
        return 'bg-green-500';
      case 'normal':
        return 'bg-blue-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Settings className="w-6 h-6 text-blue-600 animate-spin" style={{ animationDuration: '3s' }} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 text-lg">Addex Hub Nerve Center System</h3>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  Central Command Portal - All Systems Operational
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                ACTIVE
              </Badge>
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                variant="outline"
                size="sm"
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                <ChevronDown className={`w-4 h-4 mr-1 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                {isExpanded ? 'Collapse' : 'Expand'}
              </Button>
            </div>
          </div>

          {isExpanded && (
            <div className="mt-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systemMetrics.map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <div 
                      key={metric.label}
                      className="bg-white/70 rounded-lg p-4 border border-blue-100 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">
                            {metric.label}
                          </span>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(metric.status)}`}></div>
                      </div>
                      <div className="mt-2">
                        <span className="text-lg font-bold text-gray-900">
                          {metric.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Terminal className="w-4 h-4" />
                    Last System Check: 2 minutes ago
                  </div>
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                    <Settings className="w-4 h-4 mr-1" />
                    Configure System
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddexHubNerveCenter;