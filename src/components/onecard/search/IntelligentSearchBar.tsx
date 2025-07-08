
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Calendar, TrendingUp, X, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchFilters {
  searchTerm: string;
  network: string;
  transactionType: string;
  status: string;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  amountRange: {
    min: number | null;
    max: number | null;
  };
}

interface IntelligentSearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  totalTransactions: number;
}

export const IntelligentSearchBar = ({ onSearch, totalTransactions }: IntelligentSearchBarProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    network: '',
    transactionType: '',
    status: '',
    dateRange: { from: null, to: null },
    amountRange: { min: null, max: null }
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  // Smart search suggestions based on common patterns
  const suggestions = useMemo(() => [
    'MTN', 'Vodacom', 'Cell C', 'Telkom',
    'Self Purchase', 'Gift Purchase', 'Vendor Sale',
    'Completed', 'Pending', 'Failed',
    'R10', 'R20', 'R50', 'R100',
    'This week', 'Last month', 'Yesterday'
  ], []);

  useEffect(() => {
    if (filters.searchTerm) {
      const filtered = suggestions.filter(s => 
        s.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
      setSearchSuggestions(filtered.slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  }, [filters.searchTerm, suggestions]);

  useEffect(() => {
    onSearch(filters);
  }, [filters, onSearch]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      searchTerm: '',
      network: '',
      transactionType: '',
      status: '',
      dateRange: { from: null, to: null },
      amountRange: { min: null, max: null }
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (typeof value === 'string') return value !== '';
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => v !== null && v !== '');
    }
    return false;
  }).length;

  const handleQuickDateFilter = (period: string) => {
    const now = new Date();
    let from: Date;
    
    switch (period) {
      case 'today':
        from = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        from = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        from = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        return;
    }
    
    updateFilter('dateRange', { from, to: new Date() });
  };

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search transactions... (e.g., MTN, R50, completed)"
            value={filters.searchTerm}
            onChange={(e) => updateFilter('searchTerm', e.target.value)}
            className="pl-10 pr-4 py-3 text-sm border-2 border-gray-200 focus:border-blue-500 rounded-xl"
          />
          {filters.searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateFilter('searchTerm', '')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>

        {/* Search Suggestions */}
        {searchSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {searchSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                onClick={() => updateFilter('searchTerm', suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Advanced Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
          <ChevronDown className={`w-3 h-3 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
        </Button>

        {/* Quick Date Filters */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuickDateFilter('today')}
            className="text-xs"
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuickDateFilter('week')}
            className="text-xs"
          >
            This Week
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuickDateFilter('month')}
            className="text-xs"
          >
            This Month
          </Button>
        </div>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-3 h-3 mr-1" />
            Clear All
          </Button>
        )}

        <div className="text-xs text-gray-500 ml-auto">
          {totalTransactions} transactions
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Network Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Network</label>
              <Select value={filters.network} onValueChange={(value) => updateFilter('network', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Networks" />
                </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Networks</SelectItem>
                  <SelectItem value="MTN">MTN</SelectItem>
                  <SelectItem value="Vodacom">Vodacom</SelectItem>
                  <SelectItem value="Cell C">Cell C</SelectItem>
                  <SelectItem value="Telkom">Telkom</SelectItem>
                  <SelectItem value="Divine Mobile">Divine Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transaction Type Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <Select value={filters.transactionType} onValueChange={(value) => updateFilter('transactionType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="self_purchase">Self Purchase</SelectItem>
                  <SelectItem value="third_party_purchase">Gift Purchase</SelectItem>
                  <SelectItem value="vendor_purchase">Vendor Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Amount Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Min Amount (R)</label>
              <Input
                type="number"
                placeholder="0.00"
                value={filters.amountRange.min || ''}
                onChange={(e) => updateFilter('amountRange', {
                  ...filters.amountRange,
                  min: e.target.value ? parseFloat(e.target.value) : null
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max Amount (R)</label>
              <Input
                type="number"
                placeholder="1000.00"
                value={filters.amountRange.max || ''}
                onChange={(e) => updateFilter('amountRange', {
                  ...filters.amountRange,
                  max: e.target.value ? parseFloat(e.target.value) : null
                })}
              />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium mb-2">Date Range</label>
            <div className="flex gap-2 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {filters.dateRange.from ? filters.dateRange.from.toLocaleDateString() : 'From date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={filters.dateRange.from || undefined}
                    onSelect={(date) => updateFilter('dateRange', { ...filters.dateRange, from: date || null })}
                  />
                </PopoverContent>
              </Popover>
              
              <span className="text-gray-500">to</span>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {filters.dateRange.to ? filters.dateRange.to.toLocaleDateString() : 'To date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={filters.dateRange.to || undefined}
                    onSelect={(date) => updateFilter('dateRange', { ...filters.dateRange, to: date || null })}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.network && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Network: {filters.network}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter('network', '')} />
            </Badge>
          )}
          {filters.transactionType && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Type: {filters.transactionType.replace('_', ' ')}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter('transactionType', '')} />
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {filters.status}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter('status', '')} />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
