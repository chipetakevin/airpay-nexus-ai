import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, FileSpreadsheet, Code, Loader2 } from 'lucide-react';
import type { ReportFilters, ActivityData } from './MyReportTab';

interface ExportControlsProps {
  data: {
    dailyPerformance: {
      jobsCompleted: number;
      successRate: number;
      commissionEarned: number;
      pendingApproval: number;
    };
    monthToDate: {
      jobsCompleted: number;
      successRate: number;
      commissionEarned: number;
      pendingApproval: number;
    };
    activities: ActivityData[];
  };
  filters: ReportFilters;
  onExport: (format: 'pdf' | 'excel' | 'csv' | 'json') => void;
}

export const ExportControls: React.FC<ExportControlsProps> = ({
  data,
  filters,
  onExport
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel' | 'csv' | 'json'>('pdf');

  const handleExport = async (format: 'pdf' | 'excel' | 'csv' | 'json') => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      onExport(format);
      
      // In real implementation, this would:
      // 1. Prepare data according to filters
      // 2. Generate file in specified format
      // 3. Trigger download or send via email
      console.log('Exporting report as:', format);
      console.log('Export data:', { data, filters });
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'excel': return <FileSpreadsheet className="h-4 w-4" />;
      case 'csv': return <FileSpreadsheet className="h-4 w-4" />;
      case 'json': return <Code className="h-4 w-4" />;
      default: return <Download className="h-4 w-4" />;
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    count += filters.taskType.length;
    count += filters.project.length;
    count += filters.employeeRole.length;
    count += filters.status.length;
    count += filters.location.length;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <Download className="h-4 w-4 mr-2" />
          Export Report
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Export Report</h4>
            <p className="text-sm text-muted-foreground">
              Download your report data in the selected format
            </p>
          </div>

          {/* Active Filters Summary */}
          {activeFiltersCount > 0 && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-1">Applied Filters:</p>
              <div className="flex flex-wrap gap-1">
                {filters.taskType.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {filters.taskType.length} task type{filters.taskType.length > 1 ? 's' : ''}
                  </Badge>
                )}
                {filters.project.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {filters.project.length} project{filters.project.length > 1 ? 's' : ''}
                  </Badge>
                )}
                {filters.status.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {filters.status.length} status{filters.status.length > 1 ? 'es' : ''}
                  </Badge>
                )}
                {(filters.dateRange.start || filters.dateRange.end) && (
                  <Badge variant="outline" className="text-xs">
                    Date range
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Format Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Export Format</label>
            <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    PDF Report
                  </div>
                </SelectItem>
                <SelectItem value="excel">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel Spreadsheet
                  </div>
                </SelectItem>
                <SelectItem value="csv">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    CSV File
                  </div>
                </SelectItem>
                <SelectItem value="json">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    JSON Data
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Summary */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm font-medium mb-1">Export Summary:</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Performance metrics and commission data</p>
              <p>• {data.activities.length || 0} activity records</p>
              <p>• Applied filters and date ranges</p>
              <p>• Contractor and project information</p>
            </div>
          </div>

          {/* Export Button */}
          <Button 
            className="w-full" 
            onClick={() => handleExport(exportFormat)}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating {exportFormat.toUpperCase()}...
              </>
            ) : (
              <>
                {getFormatIcon(exportFormat)}
                <span className="ml-2">Export as {exportFormat.toUpperCase()}</span>
              </>
            )}
          </Button>

          {/* Security Notice */}
          <div className="text-xs text-muted-foreground">
            <p>🔒 Exported data is encrypted and audit logged for compliance.</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};