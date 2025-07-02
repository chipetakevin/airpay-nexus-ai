import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface FilterState {
  mvno: string;
  status: string;
  plan: string;
}

interface MobileCustomerSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isSearchFocused?: boolean;
  onSearchFocus?: () => void;
  onSearchBlur?: () => void;
  resultCount?: number;
}

const MobileCustomerSearch: React.FC<MobileCustomerSearchProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  isSearchFocused = false,
  onSearchFocus,
  onSearchBlur,
  resultCount
}) => {
  const [showFilters, setShowFilters] = useState(false);
  
  const activeFilterCount = Object.values(filters).filter(value => value !== 'all').length;

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleClearFilters = () => {
    onFiltersChange({ mvno: 'all', status: 'all', plan: 'all' });
  };

  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <Card className={cn(
        "transition-all duration-200",
        isSearchFocused && "ring-2 ring-primary ring-offset-2"
      )}>
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={onSearchFocus}
              onBlur={onSearchBlur}
              className="border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant={activeFilterCount > 0 ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "p-2 relative",
                activeFilterCount > 0 && "bg-primary text-primary-foreground"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {activeFilterCount > 0 && (
                <Badge 
                  variant="secondary" 
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Collapsible open={showFilters} onOpenChange={setShowFilters}>
        <CollapsibleContent className="space-y-3">
          <Card>
            <CardContent className="p-3 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">Filters</h3>
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">MVNO</label>
                  <Select 
                    value={filters.mvno} 
                    onValueChange={(value) => handleFilterChange('mvno', value)}
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="All MVNOs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All MVNOs</SelectItem>
                      <SelectItem value="Divine Mobile">Divine Mobile</SelectItem>
                      <SelectItem value="Partner MVNO">Partner MVNO</SelectItem>
                      <SelectItem value="Enterprise MVNO">Enterprise MVNO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground">Status</label>
                  <Select 
                    value={filters.status} 
                    onValueChange={(value) => handleFilterChange('status', value)}
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground">Plan</label>
                  <Select 
                    value={filters.plan} 
                    onValueChange={(value) => handleFilterChange('plan', value)}
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="All Plans" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="Basic Plan">Basic Plan</SelectItem>
                      <SelectItem value="Premium Data">Premium Data</SelectItem>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                      <SelectItem value="Family Plan">Family Plan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Results Summary */}
      {(searchTerm || activeFilterCount > 0) && (
        <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
          <span>
            {resultCount !== undefined ? `${resultCount} customers found` : 'Searching...'}
          </span>
          {(searchTerm || activeFilterCount > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                handleClearSearch();
                handleClearFilters();
              }}
              className="text-xs"
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileCustomerSearch;