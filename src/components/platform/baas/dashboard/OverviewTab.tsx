
import React from 'react';
import ServiceStatus from './ServiceStatus';
import QuickActions from './QuickActions';

interface OverviewTabProps {
  onTabChange?: (value: string) => void;
}

const OverviewTab = ({ onTabChange }: OverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ServiceStatus />
      <QuickActions onTabChange={onTabChange} />
    </div>
  );
};

export default OverviewTab;
