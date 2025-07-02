import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VendorProfileSectionProps {
  vendorData: any;
}

const VendorProfileSection: React.FC<VendorProfileSectionProps> = ({ vendorData }) => {
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