import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  RefreshCw,
  Calendar as CalendarIcon,
  X,
  Users,
  Smartphone,
  MessageSquare,
  Globe,
  Eye,
  Edit,
  EyeOff
} from 'lucide-react';
import { useUSSDData } from '@/hooks/useUSSDData';
import { format } from 'date-fns';

interface SearchFilters {
  search: string;
  platforms: string[];
  status: string;
  segment: string;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  engagementScore: {
    min: number;
    max: number;
  };
  hasSession: boolean | null;
  optInStatus: boolean | null;
}

const AdvancedCustomerSearch = () => {
  const { customers, searchCustomers, loading } = useUSSDData();
  const [filters, setFilters] = useState<SearchFilters>({
    search: '',
    platforms: [],
    status: '',
    segment: '',
    dateRange: {
      from: null,
      to: null
    },
    engagementScore: {
      min: 0,
      max: 100
    },
    hasSession: null,
    optInStatus: null
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set());

  const handleSearch = async () => {
    const searchParams = {
      search: filters.search,
      platform: filters.platforms.length === 1 ? filters.platforms[0] : null,
      status: filters.status || null,
      dateRange: filters.dateRange.from && filters.dateRange.to ? filters.dateRange : null
    };

    await searchCustomers(searchParams);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      platforms: [],
      status: '',
      segment: '',
      dateRange: { from: null, to: null },
      engagementScore: { min: 0, max: 100 },
      hasSession: null,
      optInStatus: null
    });
  };

  const toggleCustomerSelection = (customerId: string) => {
    const newSelection = new Set(selectedCustomers);
    if (selectedCustomers.has(customerId)) {
      newSelection.delete(customerId);
    } else {
      newSelection.add(customerId);
    }
    setSelectedCustomers(newSelection);
  };

  const selectAllCustomers = () => {
    if (selectedCustomers.size === customers.length) {
      setSelectedCustomers(new Set());
    } else {
      setSelectedCustomers(new Set(customers.map(c => c.id)));
    }
  };

  const platformIcons = {
    GSM: Smartphone,
    WhatsApp: MessageSquare,
    Website: Globe
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Search className="w-6 h-6 mr-2" />
          Customer Search & Management
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" disabled={selectedCustomers.size === 0}>
            <Download className="w-4 h-4 mr-2" />
            Export ({selectedCustomers.size})
          </Button>
        </div>
      </div>

      {/* Search Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Basic Search */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search by name, phone, email, or ID..." 
                  className="pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
              
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleSearch} disabled={loading}>
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced
              </Button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="border-t pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Platform Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Platforms</Label>
                    <div className="space-y-2">
                      {['GSM', 'WhatsApp', 'Website'].map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                          <Checkbox
                            id={platform}
                            checked={filters.platforms.includes(platform)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilters({ 
                                  ...filters, 
                                  platforms: [...filters.platforms, platform] 
                                });
                              } else {
                                setFilters({ 
                                  ...filters, 
                                  platforms: filters.platforms.filter(p => p !== platform) 
                                });
                              }
                            }}
                          />
                          <Label htmlFor={platform} className="text-sm">
                            {platform}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Segment Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Customer Segment</Label>
                    <Select
                      value={filters.segment}
                      onValueChange={(value) => setFilters({ ...filters, segment: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Segment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Segments</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="new">New Customer</SelectItem>
                        <SelectItem value="churn_risk">At Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Range */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Registration Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateRange.from ? (
                            filters.dateRange.to ? (
                              <>
                                {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                                {format(filters.dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(filters.dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            "Pick a date range"
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          selected={{
                            from: filters.dateRange.from || undefined,
                            to: filters.dateRange.to || undefined
                          }}
                          onSelect={(range) => 
                            setFilters({
                              ...filters,
                              dateRange: {
                                from: range?.from || null,
                                to: range?.to || null
                              }
                            })
                          }
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Additional Filters */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Additional Filters</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasSession"
                          checked={filters.hasSession === true}
                          onCheckedChange={(checked) => 
                            setFilters({ ...filters, hasSession: checked ? true : null })
                          }
                        />
                        <Label htmlFor="hasSession" className="text-sm">
                          Has Active Session
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="optedIn"
                          checked={filters.optInStatus === true}
                          onCheckedChange={(checked) => 
                            setFilters({ ...filters, optInStatus: checked ? true : null })
                          }
                        />
                        <Label htmlFor="optedIn" className="text-sm">
                          Marketing Opt-in
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="outline" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    {customers.length} customers found
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Search Results</CardTitle>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={selectAllCustomers}
              >
                {selectedCustomers.size === customers.length ? 'Deselect All' : 'Select All'}
              </Button>
              <Badge variant="outline">
                {selectedCustomers.size} selected
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No customers found matching your criteria.</p>
              <p className="text-sm">Try adjusting your search filters.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {customers.map((customer) => {
                const platforms = customer.registered_platforms || [];
                return (
                  <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        checked={selectedCustomers.has(customer.id)}
                        onCheckedChange={() => toggleCustomerSelection(customer.id)}
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{customer.full_name || 'Unknown'}</span>
                          <Badge variant="outline">{customer.phone}</Badge>
                          {platforms.map((platform) => {
                            const Icon = platformIcons[platform as keyof typeof platformIcons];
                            return Icon ? (
                              <Badge key={platform} variant="secondary" className="text-xs">
                                <Icon className="w-3 h-3 mr-1" />
                                {platform}
                              </Badge>
                            ) : null;
                          })}
                          <Badge variant={
                            customer.verification_status === 'verified' ? 'default' : 
                            customer.verification_status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {customer.verification_status || 'unknown'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <span>Email: {customer.email || 'Not provided'}</span>
                          <span className="mx-2">•</span>
                          <span>Registered: {customer.created_at ? format(new Date(customer.created_at), 'MMM dd, yyyy') : 'Unknown'}</span>
                          {customer.customer_segment && (
                            <>
                              <span className="mx-2">•</span>
                              <span>Segment: {customer.customer_segment}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        {customer.verification_status === 'verified' ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedCustomerSearch;