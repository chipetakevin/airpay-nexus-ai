
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

interface UserTypeIndicatorProps {
  isVendor: boolean;
  currentUser: any;
}

const UserTypeIndicator = ({ isVendor, currentUser }: UserTypeIndicatorProps) => {
  if (isVendor) {
    return (
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 text-yellow-700">
            <TrendingUp className="w-4 h-4" />
            <Badge className="bg-yellow-100 text-yellow-800">Vendor Purchase</Badge>
            <span className="text-sm font-medium">75% Profit Share</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Remove authentication warnings since users are already authenticated after registration
  return null;
};

export default UserTypeIndicator;
