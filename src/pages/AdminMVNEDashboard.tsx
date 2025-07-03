import React from 'react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import MVNEAdminDashboard from '@/components/admin/MVNEAdminDashboard';
import UniversalExitTabs from '@/components/navigation/UniversalExitTabs';

const AdminMVNEDashboard: React.FC = () => {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen">
        <MVNEAdminDashboard />
        
        {/* Universal Exit Navigation */}
        <UniversalExitTabs 
          currentService="admin"
          variant="bottom"
          showServiceSwitcher={true}
        />
      </div>
    </AdminAuthGuard>
  );
};

export default AdminMVNEDashboard;