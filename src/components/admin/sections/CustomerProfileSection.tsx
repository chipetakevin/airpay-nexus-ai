import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface CustomerProfileSectionProps {
  customerData: any;
  isCollapsed: boolean;
  onToggleCollapse: (collapsed: boolean) => void;
}

const CustomerProfileSection: React.FC<CustomerProfileSectionProps> = ({
  customerData,
  isCollapsed,
  onToggleCollapse
}) => {
  if (!customerData) return null;

  if (isCollapsed) {
    return (
      <div className="mt-8 pt-6 border-t">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">👤</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-blue-800">
                    Current Customer Profile
                  </div>
                  <div className="text-xs text-blue-700 mt-0.5">
                    {customerData.firstName} {customerData.lastName} • R{customerData.cashbackBalance?.toFixed(2)}
                  </div>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onToggleCollapse(false)}
                className="text-xs text-blue-700 hover:bg-blue-100 flex items-center gap-1"
              >
                <ChevronDown className="w-4 h-4" />
                Show Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-8 pt-6 border-t">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Current Customer Profile
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
        <div>
          <h4 className="font-semibold">Personal Information</h4>
          <p>Name: {customerData.firstName} {customerData.lastName}</p>
          <p>Email: {customerData.email}</p>
          <p>Card Number: ****{customerData.cardNumber?.slice(-4)}</p>
        </div>
        <div>
          <h4 className="font-semibold">OneCard Details</h4>
          <p>Cashback Balance: R{customerData.cashbackBalance?.toFixed(2)}</p>
          <p>Total Earned: R{customerData.totalEarned?.toFixed(2)}</p>
          <p>Total Spent: R{customerData.totalSpent?.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        <Button size="sm">View Details</Button>
        <Button size="sm" variant="outline">Edit Profile</Button>
        <Button size="sm" variant="outline">Manage Balance</Button>
      </div>
    </div>
  );
};

export default CustomerProfileSection;