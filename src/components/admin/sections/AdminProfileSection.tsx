import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AdminProfileSectionProps {
  adminData: any;
}

const AdminProfileSection: React.FC<AdminProfileSectionProps> = ({ adminData }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Administrator Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {adminData ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Administrator Information</h4>
                  <p>Name: {adminData.firstName} {adminData.lastName}</p>
                  <p>Email: {adminData.email}</p>
                  <p>Role: {adminData.adminRole}</p>
                  <p>Admin ID: ****{adminData.adminId?.slice(-4)}</p>
                </div>
                <div>
                  <h4 className="font-semibold">OneCard Platinum Details</h4>
                  <p>System Access: {adminData.accessLevel}</p>
                  <p>Commission Rate: {adminData.systemCommission}%</p>
                  <p>Total Customers: {adminData.totalCustomers}</p>
                  <p>Total Vendors: {adminData.totalVendors}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm">System Settings</Button>
                <Button size="sm" variant="outline">Security Settings</Button>
                <Button size="sm" variant="outline">Audit Logs</Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No admin profile found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfileSection;