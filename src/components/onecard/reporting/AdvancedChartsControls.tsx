import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  CalendarIcon, 
  Download, 
  ImageIcon, 
  FileTextIcon, 
  Share,
  Settings,
  TrendingUp,
  BarChart3,
  Bell,
  Filter
} from 'lucide-react';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface AdvancedChartsControlsProps {
  onDateRangeChange: (range: DateRange) => void;
  onExportChart: (format: 'png' | 'pdf' | 'svg') => void;
  onTimeframeChange: (timeframe: string) => void;
  onNotificationToggle: (enabled: boolean) => void;
}

export const AdvancedChartsControls = ({ 
  onDateRangeChange, 
  onExportChart, 
  onTimeframeChange,
  onNotificationToggle 
}: AdvancedChartsControlsProps) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(subMonths(new Date(), 5)),
    to: endOfMonth(new Date())
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleDateRangeChange = (range: DateRange) => {
    if (range && (range.from || range.to)) {
      setDateRange(range);
      onDateRangeChange(range);
    }
  };

  const handleTimeframeChange = (value: string) => {
    setSelectedTimeframe(value);
    onTimeframeChange(value);
    
    // Auto-update date range based on selection
    const now = new Date();
    let from: Date;
    
    switch (value) {
      case '1month':
        from = startOfMonth(subMonths(now, 0));
        break;
      case '3months':
        from = startOfMonth(subMonths(now, 2));
        break;
      case '6months':
        from = startOfMonth(subMonths(now, 5));
        break;
      case '1year':
        from = startOfMonth(subMonths(now, 11));
        break;
      default:
        from = startOfMonth(subMonths(now, 5));
    }
    
    const newRange = { from, to: endOfMonth(now) };
    setDateRange(newRange);
    onDateRangeChange(newRange);
  };

  const handleNotificationToggle = (checked: boolean) => {
    setNotificationsEnabled(checked);
    onNotificationToggle(checked);
    
    toast.success(
      checked ? 'Trend notifications enabled' : 'Trend notifications disabled',
      {
        description: checked 
          ? 'You\'ll receive alerts for significant changes in your cashback trends.'
          : 'Trend notifications have been turned off.'
      }
    );
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Settings className="w-5 h-5" />
          Advanced Analytics Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Quick Timeframe Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-blue-700">Timeframe</Label>
            <Select value={selectedTimeframe} onValueChange={handleTimeframeChange}>
              <SelectTrigger className="bg-white border-blue-200">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Custom Date Range Picker */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-blue-700">Custom Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal bg-white border-blue-200",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={(range: any) => handleDateRangeChange(range || { from: undefined, to: undefined })}
                  numberOfMonths={2}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Export Options */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-blue-700">Export Charts</Label>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onExportChart('png')}
                className="bg-white border-blue-200 hover:bg-blue-50"
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                PNG
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onExportChart('pdf')}
                className="bg-white border-blue-200 hover:bg-blue-50"
              >
                <FileTextIcon className="w-4 h-4 mr-1" />
                PDF
              </Button>
            </div>
          </div>

          {/* Trend Notifications */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-blue-700">Notifications</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="trend-notifications"
                checked={notificationsEnabled}
                onCheckedChange={handleNotificationToggle}
              />
              <Label htmlFor="trend-notifications" className="text-sm text-blue-600">
                <Bell className="w-4 h-4 inline mr-1" />
                Trend Alerts
              </Label>
            </div>
            {notificationsEnabled && (
              <p className="text-xs text-blue-600">
                Get notified of significant changes
              </p>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Active Filters:</span>
            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
              {selectedTimeframe === 'custom' 
                ? `${dateRange.from ? format(dateRange.from, "MMM d") : '...'} - ${dateRange.to ? format(dateRange.to, "MMM d") : '...'}`
                : selectedTimeframe.charAt(0).toUpperCase() + selectedTimeframe.slice(1).replace('months', ' months').replace('month', ' month').replace('year', ' year')
              }
            </Badge>
            {notificationsEnabled && (
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                Notifications On
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};