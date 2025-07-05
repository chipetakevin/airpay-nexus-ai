import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import type { ReportFilters as ReportFiltersType } from './MyReportTab';

interface ReportFiltersProps {
  filters: ReportFiltersType;
  onFiltersChange: (filters: ReportFiltersType) => void;
  userRole: 'admin' | 'contractor';
  showAllOptions: boolean;
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  filters,
  onFiltersChange,
  userRole,
  showAllOptions
}) => {
  const taskTypes = [
    'SIM Activation',
    'KYC Verification',
    'Site Visit',
    'Maintenance',
    'Document Collection',
    'Customer Support'
  ];

  const projects = [
    'Project Alpha',
    'Project Beta',
    'Project Gamma',
    'Client X Campaign',
    'Rural Expansion'
  ];

  const employeeRoles = [
    'Field Contractor',
    'Team Lead',
    'Supervisor',
    'Support Staff'
  ];

  const statuses = [
    'completed',
    'pending',
    'approved',
    'rejected'
  ];

  const locations = [
    'Gauteng',
    'Western Cape',
    'KwaZulu-Natal',
    'Eastern Cape',
    'Free State',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Northern Cape'
  ];

  const updateFilter = (key: keyof ReportFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const addToArrayFilter = (key: 'taskType' | 'project' | 'employeeRole' | 'status' | 'location', value: string) => {
    const currentArray = filters[key] as string[];
    if (!currentArray.includes(value)) {
      updateFilter(key, [...currentArray, value]);
    }
  };

  const removeFromArrayFilter = (key: 'taskType' | 'project' | 'employeeRole' | 'status' | 'location', value: string) => {
    const currentArray = filters[key] as string[];
    updateFilter(key, currentArray.filter(item => item !== value));
  };

  const clearAllFilters = () => {
    onFiltersChange({
      taskType: [],
      project: [],
      employeeRole: [],
      dateRange: { start: null, end: null },
      status: [],
      location: []
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => {
    if (Array.isArray(filter)) return filter.length > 0;
    if (filter && typeof filter === 'object') return filter.start !== null || filter.end !== null;
    return false;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange.start ? format(filters.dateRange.start, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateRange.start || undefined}
                  onSelect={(date) => updateFilter('dateRange', { ...filters.dateRange, start: date || null })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange.end ? format(filters.dateRange.end, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateRange.end || undefined}
                  onSelect={(date) => updateFilter('dateRange', { ...filters.dateRange, end: date || null })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Filter Selects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Task Type</label>
            <Select onValueChange={(value) => addToArrayFilter('taskType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent>
                {taskTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showAllOptions && (
            <div>
              <label className="text-sm font-medium mb-2 block">Project</label>
              <Select onValueChange={(value) => addToArrayFilter('project', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>{project}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showAllOptions && (
            <div>
              <label className="text-sm font-medium mb-2 block">Role</label>
              <Select onValueChange={(value) => addToArrayFilter('employeeRole', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {employeeRoles.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select onValueChange={(value) => addToArrayFilter('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showAllOptions && (
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Select onValueChange={(value) => addToArrayFilter('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Active Filters:</label>
            <div className="flex flex-wrap gap-2">
              {filters.taskType.map((type) => (
                <Badge key={type} variant="secondary" className="flex items-center gap-1">
                  {type}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFromArrayFilter('taskType', type)}
                  />
                </Badge>
              ))}
              {filters.project.map((project) => (
                <Badge key={project} variant="secondary" className="flex items-center gap-1">
                  {project}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFromArrayFilter('project', project)}
                  />
                </Badge>
              ))}
              {filters.employeeRole.map((role) => (
                <Badge key={role} variant="secondary" className="flex items-center gap-1">
                  {role}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFromArrayFilter('employeeRole', role)}
                  />
                </Badge>
              ))}
              {filters.status.map((status) => (
                <Badge key={status} variant="secondary" className="flex items-center gap-1">
                  {status}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFromArrayFilter('status', status)}
                  />
                </Badge>
              ))}
              {filters.location.map((location) => (
                <Badge key={location} variant="secondary" className="flex items-center gap-1">
                  {location}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFromArrayFilter('location', location)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};