
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface UserTypeIndicatorProps {
  isVendor: boolean;
  currentUser: any;
}

const UserTypeIndicator = ({ isVendor, currentUser }: UserTypeIndicatorProps) => {
  if (isVendor) {
    return (
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-yellow-700">
            <Badge className="bg-yellow-100 text-yellow-800">Vendor Purchase</Badge>
            <span className="text-sm font-medium">75% Profit Share</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentUser) {
    return (
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-yellow-700">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Authentication Required</span>
          </div>
          <p className="text-sm text-yellow-600 mt-1">
            Please log in to complete your purchase and earn OneCard rewards.
          </p>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default UserTypeIndicator;
