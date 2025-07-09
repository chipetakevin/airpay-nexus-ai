import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Users, Building, Briefcase, Settings } from 'lucide-react';

interface UserGroupSelectorProps {
  viewMode: 'individual' | 'group';
  onViewModeChange: (mode: 'individual' | 'group') => void;
  selectedGroup: string;
  onGroupChange: (group: string) => void;
  userType?: 'customer' | 'vendor' | 'admin' | 'fieldworker';
}

export const UserGroupSelector = ({ 
  viewMode, 
  onViewModeChange, 
  selectedGroup, 
  onGroupChange, 
  userType = 'customer' 
}: UserGroupSelectorProps) => {
  
  const groupOptions = {
    customer: [
      { value: 'all', label: 'All Customers', count: 1240 },
      { value: 'active', label: 'Active Users', count: 892 },
      { value: 'premium', label: 'Premium Members', count: 156 },
      { value: 'new', label: 'New Customers (30d)', count: 78 }
    ],
    vendor: [
      { value: 'all', label: 'All Vendors', count: 45 },
      { value: 'retail', label: 'Retail Partners', count: 28 },
      { value: 'corporate', label: 'Corporate Partners', count: 12 },
      { value: 'startup', label: 'Startup Partners', count: 5 }
    ],
    admin: [
      { value: 'all', label: 'All Users', count: 1285 },
      { value: 'customers', label: 'Customer Base', count: 1240 },
      { value: 'vendors', label: 'Vendor Network', count: 45 },
      { value: 'staff', label: 'Internal Staff', count: 12 }
    ],
    fieldworker: [
      { value: 'all', label: 'All Field Workers', count: 48 },
      { value: 'territory_1', label: 'Territory 1', count: 15 },
      { value: 'territory_2', label: 'Territory 2', count: 18 },
      { value: 'territory_3', label: 'Territory 3', count: 15 }
    ]
  };

  const currentGroups = groupOptions[userType] || groupOptions.customer;
  const selectedGroupData = currentGroups.find(g => g.value === selectedGroup);

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* View Mode Toggle */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">View:</span>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === 'individual' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('individual')}
            className={`text-xs px-3 py-1 ${
              viewMode === 'individual' 
                ? 'bg-white shadow-sm text-gray-900' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <User className="w-3 h-3 mr-1" />
            Individual
          </Button>
          <Button
            variant={viewMode === 'group' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('group')}
            className={`text-xs px-3 py-1 ${
              viewMode === 'group' 
                ? 'bg-white shadow-sm text-gray-900' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Users className="w-3 h-3 mr-1" />
            Group
          </Button>
        </div>
      </div>

      {/* Group Selector (only shown in group view) */}
      {viewMode === 'group' && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Group:</span>
          <Select value={selectedGroup} onValueChange={onGroupChange}>
            <SelectTrigger className="w-48">
              <div className="flex items-center gap-2">
                {userType === 'admin' && <Settings className="w-4 h-4" />}
                {userType === 'vendor' && <Briefcase className="w-4 h-4" />}
                {userType === 'fieldworker' && <Building className="w-4 h-4" />}
                {userType === 'customer' && <Users className="w-4 h-4" />}
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {currentGroups.map((group) => (
                <SelectItem key={group.value} value={group.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{group.label}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {group.count}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Current Selection Info */}
      <div className="flex items-center gap-2">
        {viewMode === 'individual' ? (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <User className="w-3 h-3 mr-1" />
            Personal View
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Users className="w-3 h-3 mr-1" />
            {selectedGroupData?.label} ({selectedGroupData?.count})
          </Badge>
        )}
      </div>

      {/* User Type Badge */}
      <Badge 
        className={`capitalize ${
          userType === 'admin' ? 'bg-purple-100 text-purple-800 border-purple-200' :
          userType === 'vendor' ? 'bg-orange-100 text-orange-800 border-orange-200' :
          userType === 'fieldworker' ? 'bg-green-100 text-green-800 border-green-200' :
          'bg-blue-100 text-blue-800 border-blue-200'
        }`}
        variant="outline"
      >
        {userType === 'fieldworker' ? 'Field Worker' : userType}
      </Badge>
    </div>
  );
};