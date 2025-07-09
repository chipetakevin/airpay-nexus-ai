import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, CreditCard, Target, BarChart3, Users } from 'lucide-react';

interface CashbackMetricsGridProps {
  data: {
    totalCashback: number;
    transactionCount: number;
    avgCashbackPerTxn: number;
    topCategory: string;
  };
  viewMode: 'individual' | 'group';
  isLoading?: boolean;
}

export const CashbackMetricsGrid = ({ data, viewMode, isLoading = false }: CashbackMetricsGridProps) => {
  const metrics = [
    {
      id: 'totalCashback',
      label: viewMode === 'individual' ? 'Total Cashback Earned' : 'Group Cashback Total',
      value: `R${data.totalCashback.toFixed(2)}`,
      icon: CreditCard,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'transactions',
      label: viewMode === 'individual' ? 'Total Transactions' : 'Group Transactions',
      value: data.transactionCount.toString(),
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'avgCashback',
      label: 'Average Cashback per Transaction',
      value: `R${data.avgCashbackPerTxn.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'topCategory',
      label: 'Top Cashback Category',
      value: data.topCategory,
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  if (viewMode === 'group') {
    metrics.push({
      id: 'members',
      label: 'Group Members',
      value: '48',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    });
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: viewMode === 'group' ? 5 : 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {metrics.slice(0, viewMode === 'group' ? 5 : 4).map((metric) => {
        const Icon = metric.icon;
        return (
          <Card 
            key={metric.id} 
            className={`hover:shadow-md transition-all duration-200 border-2 ${metric.borderColor} ${metric.bgColor}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  {metric.id === 'totalCashback' && (
                    <p className="text-xs text-green-600 font-medium">
                      +12% from last month
                    </p>
                  )}
                  {metric.id === 'transactions' && (
                    <p className="text-xs text-blue-600 font-medium">
                      +8 new this week
                    </p>
                  )}
                  {metric.id === 'avgCashback' && (
                    <p className="text-xs text-purple-600 font-medium">
                      Above average: 2.5%
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-full ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};