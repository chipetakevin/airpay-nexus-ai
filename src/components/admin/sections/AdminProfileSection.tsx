import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AdminProfileSectionProps {
  adminData: any;
}

const AdminProfileSection: React.FC<AdminProfileSectionProps> = ({ adminData }) => {
  // Enhanced admin data processing with fallbacks
  const processedAdminData = adminData ? {
    firstName: adminData.firstName || 'Admin',
    lastName: adminData.lastName || 'User',
    email: adminData.email || 'admin@divinemobile.co.za',
    phone: adminData.phone || adminData.phoneNumber || adminData.registeredPhone || 'Not provided',
    adminId: adminData.adminId || 'ADM000000',
    department: adminData.department || 'System Administration',
    registrationDate: adminData.registrationDate || new Date().toISOString(),
    adminRole: adminData.adminRole || 'System Administrator',
    accessLevel: adminData.accessLevel || 'Full System Access',
    systemCommission: adminData.systemCommission || '5.0',
    totalCustomers: adminData.totalCustomers || '1,247',
    totalVendors: adminData.totalVendors || '89',
    bankName: adminData.bankName || 'Not provided',
    accountNumber: adminData.accountNumber || 'Not provided',
    branchCode: adminData.branchCode || 'Not provided'
  } : null;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Administrator Profile
            {processedAdminData && (
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {processedAdminData ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary border-b pb-2">Administrator Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {processedAdminData.firstName} {processedAdminData.lastName}</p>
                    <p><span className="font-medium">Email:</span> {processedAdminData.email}</p>
                    <p><span className="font-medium">Phone:</span> {processedAdminData.phone}</p>
                    <p><span className="font-medium">Role:</span> {processedAdminData.adminRole}</p>
                    <p><span className="font-medium">Admin ID:</span> ****{processedAdminData.adminId?.slice(-4)}</p>
                    <p><span className="font-medium">Department:</span> {processedAdminData.department}</p>
                    <p><span className="font-medium">Registration:</span> {new Date(processedAdminData.registrationDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary border-b pb-2">OneCard Platinum Details</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">System Access:</span> {processedAdminData.accessLevel}</p>
                    <p><span className="font-medium">Commission Rate:</span> {processedAdminData.systemCommission}%</p>
                    <p><span className="font-medium">Total Customers:</span> {processedAdminData.totalCustomers}</p>
                    <p><span className="font-medium">Total Vendors:</span> {processedAdminData.totalVendors}</p>
                  </div>
                </div>
              </div>
              
              {(processedAdminData.bankName !== 'Not provided' || processedAdminData.accountNumber !== 'Not provided') && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary border-b pb-2">Banking Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <p><span className="font-medium">Bank:</span> {processedAdminData.bankName}</p>
                    <p><span className="font-medium">Account:</span> ****{processedAdminData.accountNumber.slice(-4)}</p>
                    <p><span className="font-medium">Branch Code:</span> {processedAdminData.branchCode}</p>
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  System Settings
                </Button>
                <Button size="sm" variant="outline">
                  Security Settings
                </Button>
                <Button size="sm" variant="outline">
                  Audit Logs
                </Button>
                <Button size="sm" variant="outline">
                  Export Profile
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No admin profile found</p>
              <p className="text-sm text-muted-foreground">
                Please complete the admin registration process to view profile details.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfileSection;