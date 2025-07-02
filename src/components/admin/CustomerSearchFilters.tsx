import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterState {
  mvno: string;
  status: string;
  plan: string;
}

interface CustomerSearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const CustomerSearchFilters: React.FC<CustomerSearchFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleReset = () => {
    onFiltersChange({ mvno: 'all', status: 'all', plan: 'all' });
  };

  return (
    <div className="flex items-center gap-2">
      <Filter className="w-4 h-4 text-gray-500" />
      
      <Select value={filters.mvno} onValueChange={(value) => handleFilterChange('mvno', value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="MVNO" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All MVNOs</SelectItem>
          <SelectItem value="Divine Mobile">Divine Mobile</SelectItem>
          <SelectItem value="Partner MVNO">Partner MVNO</SelectItem>
          <SelectItem value="Enterprise MVNO">Enterprise MVNO</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.plan} onValueChange={(value) => handleFilterChange('plan', value)}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Plans</SelectItem>
          <SelectItem value="Basic Plan">Basic Plan</SelectItem>
          <SelectItem value="Premium Data">Premium Data</SelectItem>
          <SelectItem value="Enterprise">Enterprise</SelectItem>
          <SelectItem value="Family Plan">Family Plan</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleReset}
        className="px-3"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default CustomerSearchFilters;