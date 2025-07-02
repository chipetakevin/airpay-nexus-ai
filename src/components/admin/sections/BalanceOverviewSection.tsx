import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';

interface BalanceOverviewSectionProps {
  balances: {
    totalCustomer: number;
    totalVendor: number;
    totalAdmin: number;
    grandTotal: number;
  };
  isCollapsed: boolean;
  onToggleCollapse: (collapsed: boolean) => void;
}

const BalanceOverviewSection: React.FC<BalanceOverviewSectionProps> = ({
  balances,
  isCollapsed,
  onToggleCollapse
}) => {
  if (isCollapsed) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-muted-foreground">
                System Balance Summary
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-700">
                R{balances.grandTotal.toFixed(2)}
              </Badge>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onToggleCollapse(false)}
              className="text-xs text-green-700 hover:bg-green-100 flex items-center gap-1"
            >
              <ChevronDown className="w-4 h-4" />
              Show Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            R{balances.totalCustomer.toFixed(2)}
          </div>
          <div className="text-gray-600 text-sm">Customer Balances</div>
        </CardContent>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-2">
            R{balances.totalVendor.toFixed(2)}
          </div>
          <div className="text-gray-600 text-sm">Vendor Balances</div>
        </CardContent>
      </Card>

      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">
            R{balances.totalAdmin.toFixed(2)}
          </div>
          <div className="text-gray-600 text-sm">Admin Balance</div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            R{balances.grandTotal.toFixed(2)}
          </div>
          <div className="text-gray-600 text-sm">Total System Balance</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceOverviewSection;