import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PieChart, ShoppingCart } from 'lucide-react';

interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
}

interface CategoryBreakdownChartProps {
  data: CategoryData[];
  isLoading?: boolean;
  showDetails?: boolean;
}

export const CategoryBreakdownChart = ({ data, isLoading = false, showDetails = false }: CategoryBreakdownChartProps) => {
  const colors = [
    'bg-yellow-500',
    'bg-blue-500', 
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500'
  ];

  const borderColors = [
    'border-yellow-500',
    'border-blue-500',
    'border-green-500', 
    'border-purple-500',
    'border-orange-500',
    'border-pink-500'
  ];

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto">
              <Skeleton className="w-full h-full rounded-full" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate angles for pie chart
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  let cumulativePercentage = 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-purple-600" />
          Cashback by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Donut Chart */}
          <div className="relative w-48 h-48 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="10"
              />
              {data.map((item, index) => {
                const strokeDasharray = `${item.percentage * 2.2} 220`;
                const strokeDashoffset = -cumulativePercentage * 2.2;
                cumulativePercentage += item.percentage;
                
                return (
                  <circle
                    key={item.category}
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke={`hsl(${index * 60 + 210}, 70%, 50%)`}
                    strokeWidth="10"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500 hover:stroke-opacity-80"
                  />
                );
              })}
            </svg>
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">R{totalAmount}</span>
              <span className="text-xs text-gray-600">Total</span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-4 h-4 rounded-full border-2 ${colors[index % colors.length]} ${borderColors[index % borderColors.length]}`}
                  />
                  <span className="text-sm font-medium">{item.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">R{item.amount}</div>
                  <div className="text-xs text-gray-600">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Stats */}
          {showDetails && (
            <div className="border-t pt-4 space-y-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Category Insights
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Highest Category:</span>
                  <span className="font-medium">{data[0]?.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Most Efficient:</span>
                  <span className="font-medium">Groceries (2.8%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categories Used:</span>
                  <span className="font-medium">{data.length} of 12</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Tip */}
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
            <p className="text-sm text-yellow-800">
              💡 <strong>Tip:</strong> You earn the most cashback on groceries. 
              Consider consolidating your grocery shopping to maximize rewards!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};