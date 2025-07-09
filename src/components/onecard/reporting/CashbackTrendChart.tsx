import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, Calendar } from 'lucide-react';

interface TrendData {
  month: string;
  amount: number;
}

interface CashbackTrendChartProps {
  data: TrendData[];
  isLoading?: boolean;
  detailed?: boolean;
}

export const CashbackTrendChart = ({ data, isLoading = false, detailed = false }: CashbackTrendChartProps) => {
  const maxAmount = Math.max(...data.map(d => d.amount));
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-end h-32">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <Skeleton className="w-8 h-16" />
                  <Skeleton className="w-8 h-4" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Cashback Accumulation Over Time
          {detailed && (
            <div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              Last 6 Months
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart Area */}
          <div className="relative">
            <div className="flex justify-between items-end h-40 border-b border-gray-200">
              {data.map((item, index) => {
                const height = (item.amount / maxAmount) * 140;
                const isHighest = item.amount === maxAmount;
                
                return (
                  <div key={item.month} className="flex flex-col items-center space-y-2 flex-1">
                    <div className="relative flex items-end h-36">
                      <div 
                        className={`w-8 rounded-t transition-all duration-500 ${
                          isHighest 
                            ? 'bg-gradient-to-t from-yellow-400 to-yellow-500' 
                            : 'bg-gradient-to-t from-blue-400 to-blue-500'
                        }`}
                        style={{ height: `${height}px` }}
                      >
                        {/* Amount label on hover */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                          R{item.amount}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gray-600">{item.month}</span>
                  </div>
                );
              })}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-36 flex flex-col justify-between text-xs text-gray-500 -translate-x-12">
              <span>R{maxAmount}</span>
              <span>R{Math.round(maxAmount * 0.75)}</span>
              <span>R{Math.round(maxAmount * 0.5)}</span>
              <span>R{Math.round(maxAmount * 0.25)}</span>
              <span>R0</span>
            </div>
          </div>

          {/* Summary Stats */}
          {detailed && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Growth</p>
                <p className="text-lg font-bold text-green-600">+24%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Best Month</p>
                <p className="text-lg font-bold text-blue-600">Apr</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Trend</p>
                <p className="text-lg font-bold text-purple-600">📈 Rising</p>
              </div>
            </div>
          )}

          {/* Quick Insights */}
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span>
              Your cashback has increased by <strong className="text-green-600">24%</strong> over the last 6 months.
              {detailed && ' Keep up the excellent spending habits!'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};