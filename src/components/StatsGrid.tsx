
import React, { useState } from 'react';
import { TrendingUp, Zap, Users, DollarSign, Signal, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardDropdown from '@/components/ui/dashboard-dropdown';

const StatsGrid = () => {
  const [timeRange, setTimeRange] = useState('today');

  const stats = [
    {
      title: "Daily Revenue",
      value: "R 2,847,392",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up",
      color: "text-green-600"
    },
    {
      title: "Transactions Today",
      value: "156,847",
      change: "+8.2%",
      icon: Zap,
      trend: "up",
      color: "text-blue-600"
    },
    {
      title: "Active Agents",
      value: "4,629",
      change: "+3.1%",
      icon: Users,
      trend: "up",
      color: "text-purple-600"
    },
    {
      title: "Network Uptime",
      value: "99.99%",
      change: "Stable",
      icon: Signal,
      trend: "stable",
      color: "text-teal-600"
    },
    {
      title: "Fraud Prevention",
      value: "99.7%",
      change: "Optimal",
      icon: Shield,
      trend: "stable",
      color: "text-emerald-600"
    },
    {
      title: "Processing Speed",
      value: "1.2s",
      change: "-0.3s",
      icon: TrendingUp,
      trend: "up",
      color: "text-orange-600"
    }
  ];

  const handleTimeRangeChange = (cardTitle: string, range: string) => {
    console.log(`Time range changed for ${cardTitle}: ${range}`);
    setTimeRange(range);
    // Here you would typically fetch new data based on the time range
  };

  const handleExport = (cardTitle: string) => {
    console.log(`Exporting data for ${cardTitle}`);
    // Implement export functionality
  };

  const handleRefresh = (cardTitle: string) => {
    console.log(`Refreshing data for ${cardTitle}`);
    // Implement refresh functionality
  };

  const handleViewDetails = (cardTitle: string) => {
    console.log(`Viewing details for ${cardTitle}`);
    // Implement navigation to detailed view
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 group relative overflow-hidden"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <stat.icon className={`h-5 w-5 ${stat.color} group-hover:scale-110 transition-transform duration-200`} />
              <DashboardDropdown
                cardTitle={stat.title}
                onTimeRangeChange={(range) => handleTimeRangeChange(stat.title, range)}
                onExport={() => handleExport(stat.title)}
                onRefresh={() => handleRefresh(stat.title)}
                onViewDetails={() => handleViewDetails(stat.title)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
              {stat.value}
            </div>
            <p className={`text-xs ${
              stat.trend === 'up' ? 'text-green-600' : 
              stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
            } mt-1 font-medium`}>
              {stat.change} from yesterday
            </p>
            
            {/* Animated background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
