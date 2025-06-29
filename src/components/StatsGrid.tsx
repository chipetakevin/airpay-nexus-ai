
import React from 'react';
import { TrendingUp, Zap, Users, DollarSign, Signal, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatsGrid = () => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'} mt-1`}>
              {stat.change} from yesterday
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
