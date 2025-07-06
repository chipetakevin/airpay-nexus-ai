import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DistributionData {
  category: string;
  amount: number;
  percentage: number;
  description: string;
  color: string;
}

const FinancialDistributionPanel = () => {
  const [selectedOrder, setSelectedOrder] = useState<string>('current');
  
  const distributionData: DistributionData[] = [
    {
      category: 'Network Provider Costs',
      amount: 114400.45,
      percentage: 91,
      description: 'Actual network costs for airtime purchases',
      color: 'text-blue-600'
    },
    {
      category: 'Vendor Profits (Vendor Purchases)',
      amount: 5148.02,
      percentage: 75,
      description: '75% markup from vendor purchases',
      color: 'text-amber-600'
    },
    {
      category: 'Customer Rewards (Self Purchase)',
      amount: 2287.01,
      percentage: 50,
      description: '50% markup from customer self-purchases',
      color: 'text-green-600'
    }
  ];

  const totalAmount = distributionData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2">Protected Markup Distribution</h3>
          <p className="text-lg font-semibold text-muted-foreground">
            (R{totalAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })})
          </p>
        </div>
        <Select value={selectedOrder} onValueChange={setSelectedOrder}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select order period" />
          </SelectTrigger>
          <SelectContent className="z-50 bg-background">
            <SelectItem value="current">Current Order</SelectItem>
            <SelectItem value="daily">Daily Average</SelectItem>
            <SelectItem value="weekly">Weekly Total</SelectItem>
            <SelectItem value="monthly">Monthly Total</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Financial Breakdown</span>
            <Badge variant="outline" className="text-sm">
              Total: R{totalAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left p-4 font-semibold text-base">Category</th>
                  <th className="text-left p-4 font-semibold text-base">Amount (R)</th>
                  <th className="text-left p-4 font-semibold text-base">Share %</th>
                  <th className="text-left p-4 font-semibold text-base">Description</th>
                </tr>
              </thead>
              <tbody>
                {distributionData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-base">{item.category}</div>
                    </td>
                    <td className="p-4">
                      <div className={`font-bold text-lg ${item.color}`}>
                        R{item.amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">{item.percentage}%</span>
                        <Progress 
                          value={item.percentage} 
                          className="w-16 h-2" 
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-muted-foreground max-w-xs">
                        {item.description}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Visual Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {distributionData.map((item, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`text-2xl font-bold ${item.color}`}>
                  {item.percentage}%
                </div>
                <Progress value={item.percentage} className="w-20 h-3" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm leading-tight">{item.category}</h4>
                <div className={`text-xl font-bold ${item.color}`}>
                  R{item.amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">91%</div>
              <div className="text-sm text-muted-foreground">Network Costs</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">4.5%</div>
              <div className="text-sm text-muted-foreground">Vendor Margin</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">2%</div>
              <div className="text-sm text-muted-foreground">Customer Rewards</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2.5%</div>
              <div className="text-sm text-muted-foreground">Platform Fee</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialDistributionPanel;