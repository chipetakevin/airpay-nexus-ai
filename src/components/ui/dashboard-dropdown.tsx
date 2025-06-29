
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Calendar, Download, RefreshCw, TrendingUp } from 'lucide-react';

interface DashboardDropdownProps {
  cardTitle: string;
  onTimeRangeChange?: (range: string) => void;
  onExport?: () => void;
  onRefresh?: () => void;
  onViewDetails?: () => void;
}

const DashboardDropdown: React.FC<DashboardDropdownProps> = ({
  cardTitle,
  onTimeRangeChange,
  onExport,
  onRefresh,
  onViewDetails
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors duration-200"
        >
          <span className="sr-only">Open menu for {cardTitle}</span>
          <MoreHorizontal className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-white shadow-lg border border-gray-200 rounded-lg p-1"
      >
        <DropdownMenuLabel className="text-sm font-semibold text-gray-700 px-2 py-1.5">
          {cardTitle} Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-100" />
        
        {onTimeRangeChange && (
          <>
            <DropdownMenuLabel className="text-xs text-gray-500 px-2 py-1">
              Time Range
            </DropdownMenuLabel>
            <DropdownMenuItem 
              onClick={() => onTimeRangeChange('today')}
              className="px-2 py-1.5 text-sm hover:bg-gray-50 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="h-3 w-3" />
              Today
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onTimeRangeChange('week')}
              className="px-2 py-1.5 text-sm hover:bg-gray-50 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="h-3 w-3" />
              This Week
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onTimeRangeChange('month')}
              className="px-2 py-1.5 text-sm hover:bg-gray-50 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="h-3 w-3" />
              This Month
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-100" />
          </>
        )}
        
        {onViewDetails && (
          <DropdownMenuItem 
            onClick={onViewDetails}
            className="px-2 py-1.5 text-sm hover:bg-gray-50 cursor-pointer flex items-center gap-2"
          >
            <TrendingUp className="h-3 w-3" />
            View Details
          </DropdownMenuItem>
        )}
        
        {onRefresh && (
          <DropdownMenuItem 
            onClick={onRefresh}
            className="px-2 py-1.5 text-sm hover:bg-gray-50 cursor-pointer flex items-center gap-2"
          >
            <RefreshCw className="h-3 w-3" />
            Refresh Data
          </DropdownMenuItem>
        )}
        
        {onExport && (
          <DropdownMenuItem 
            onClick={onExport}
            className="px-2 py-1.5 text-sm hover:bg-gray-50 cursor-pointer flex items-center gap-2"
          >
            <Download className="h-3 w-3" />
            Export Data
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardDropdown;
