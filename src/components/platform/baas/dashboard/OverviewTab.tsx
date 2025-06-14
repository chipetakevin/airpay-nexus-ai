
import React from 'react';
import ServiceStatus from './ServiceStatus';
import QuickActions from './QuickActions';

const OverviewTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ServiceStatus />
      <QuickActions />
    </div>
  );
};

export default OverviewTab;
