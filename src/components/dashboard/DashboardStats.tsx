
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, TrendingUp, Users, Smartphone } from 'lucide-react';

const DashboardStats = () => {
  const dashboardStats = [
    {
      label: 'Active Deals',
      value: '24',
      change: '+6',
      icon: <Activity className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      label: 'Total Users',
      value: '12.5K',
      change: '+23%',
      icon: <Users className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      label: 'Revenue',
      value: 'R450K',
      change: '+15%',
      icon: <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      label: 'Uptime',
      value: '99.9%',
      change: '+0.1%',
      icon: <Smartphone className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-4">
      {dashboardStats.map((stat, index) => (
        <Card key={index} className={`relative overflow-hidden group hover:shadow-md transition-all duration-300 border ${stat.borderColor} shadow-sm hover:scale-105`}>
          <CardContent className="p-2 md:p-3">
            <div className={`absolute inset-0 ${stat.bgColor} opacity-40`}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1">
                <div className={`p-1.5 rounded-lg ${stat.bgColor} ${stat.color} ring-1 ring-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  stat.change.startsWith('+') ? 'bg-green-100 text-green-700 ring-1 ring-green-200' : 'bg-red-100 text-red-700 ring-1 ring-red-200'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5 font-semibold uppercase tracking-wide">{stat.label}</p>
                <p className="text-sm md:text-lg font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
