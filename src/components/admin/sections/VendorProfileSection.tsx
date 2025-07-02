import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface VendorProfileSectionProps {
  vendorData: any;
  isCollapsed: boolean;
  onToggleCollapse: (collapsed: boolean) => void;
}

const VendorProfileSection: React.FC<VendorProfileSectionProps> = ({ 
  vendorData, 
  isCollapsed, 
  onToggleCollapse 
}) => {
  if (isCollapsed) {
    return (
      <div className="space-y-4">
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🏪</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-yellow-800">
                    Vendor Management
                  </div>
                  <div className="text-xs text-yellow-700 mt-0.5">
                    {vendorData ? `${vendorData.firstName} ${vendorData.lastName} • ${vendorData.companyName}` : 'No vendor profiles found'}
                  </div>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onToggleCollapse(false)}
                className="text-xs text-yellow-700 hover:bg-yellow-100 flex items-center gap-1"
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
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Vendor Management</CardTitle>
        </CardHeader>
        <CardContent>
          {vendorData ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Business Information</h4>
                  <p>Owner: {vendorData.firstName} {vendorData.lastName}</p>
                  <p>Company: {vendorData.companyName}</p>
                  <p>Email: {vendorData.email}</p>
                  <p>Vendor ID: ****{vendorData.vendorId?.slice(-4)}</p>
                </div>
                <div>
                  <h4 className="font-semibold">OneCard Gold Details</h4>
                  <p>Cashback Balance: R{vendorData.cashbackBalance?.toFixed(2)}</p>
                  <p>Commission Rate: {vendorData.commissionRate}%</p>
                  <p>Total Earned: R{vendorData.totalEarned?.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm">View Details</Button>
                <Button size="sm" variant="outline">Edit Profile</Button>
                <Button size="sm" variant="outline">Manage Commission</Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No vendor profiles found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorProfileSection;