
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Activity, Smartphone, CheckCircle } from 'lucide-react';

const PlatformMetrics = () => {
  const platformMetrics = [
    {
      label: 'Autonomous Agents',
      value: '18',
      change: '+6',
      icon: <Brain className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-purple-600'
    },
    {
      label: 'API Requests',
      value: '4.7M',
      change: '+23%',
      icon: <Activity className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-blue-600'
    },
    {
      label: 'Active MVNOs',
      value: '12',
      change: '+4',
      icon: <Smartphone className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-green-600'
    },
    {
      label: 'Platform Uptime',
      value: '99.99%',
      change: '+0.01%',
      icon: <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-emerald-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      {platformMetrics.map((metric, index) => (
        <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
          <CardContent className="p-3 md:p-6">
            <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
              <div className={`p-2 md:p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 ${metric.color} group-hover:scale-110 transition-transform duration-300`}>
                {metric.icon}
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2 font-medium">{metric.label}</p>
                <p className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">{metric.value}</p>
                <span className={`text-xs md:text-sm px-2 md:px-3 py-1 rounded-full font-medium ${
                  metric.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlatformMetrics;
