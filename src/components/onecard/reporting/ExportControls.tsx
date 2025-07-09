import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  Table, 
  FileSpreadsheet, 
  Printer,
  Mail,
  Share,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface ExportControlsProps {
  data: any;
}

export const ExportControls = ({ data }: ExportControlsProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: string) => {
    setIsExporting(true);
    
    try {
      // Simulate export processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      switch (format) {
        case 'pdf':
          toast.success('PDF report generated successfully!', {
            description: 'Your cashback report has been downloaded.',
          });
          break;
        case 'excel':
          toast.success('Excel file generated successfully!', {
            description: 'Data exported with charts and formatting.',
          });
          break;
        case 'csv':
          toast.success('CSV file downloaded!', {
            description: 'Raw data exported for analysis.',
          });
          break;
        case 'email':
          toast.success('Report sent via email!', {
            description: 'Check your inbox for the detailed report.',
          });
          break;
        case 'print':
          toast.success('Print dialog opened!', {
            description: 'Ready to print your cashback report.',
          });
          break;
      }
    } catch (error) {
      toast.error('Export failed', {
        description: 'Please try again later.',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleScheduleReport = () => {
    toast.success('Report scheduled!', {
      description: 'You will receive monthly cashback reports via email.',
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Quick Export Button */}
      <Button 
        onClick={() => handleExport('pdf')}
        disabled={isExporting}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
      >
        <Download className="w-4 h-4 mr-2" />
        {isExporting ? 'Generating...' : 'Export PDF'}
      </Button>

      {/* Advanced Export Options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disabled={isExporting}>
            <Share className="w-4 h-4 mr-2" />
            More Options
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Export Formats
            </p>
          </div>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
          >
            <FileText className="w-4 h-4 mr-2" />
            <div className="flex-1">
              <div className="font-medium">PDF Report</div>
              <div className="text-xs text-gray-500">Formatted with charts</div>
            </div>
            <Badge variant="outline" className="text-xs">Popular</Badge>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => handleExport('excel')}
            disabled={isExporting}
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            <div className="flex-1">
              <div className="font-medium">Excel File</div>
              <div className="text-xs text-gray-500">With charts & pivot tables</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => handleExport('csv')}
            disabled={isExporting}
          >
            <Table className="w-4 h-4 mr-2" />
            <div className="flex-1">
              <div className="font-medium">CSV Data</div>
              <div className="text-xs text-gray-500">Raw data only</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <div className="px-2 py-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Share & Print
            </p>
          </div>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => handleExport('email')}
            disabled={isExporting}
          >
            <Mail className="w-4 h-4 mr-2" />
            <div className="flex-1">
              <div className="font-medium">Email Report</div>
              <div className="text-xs text-gray-500">Send to your inbox</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => handleExport('print')}
            disabled={isExporting}
          >
            <Printer className="w-4 h-4 mr-2" />
            <div className="flex-1">
              <div className="font-medium">Print</div>
              <div className="text-xs text-gray-500">Printer-friendly format</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={handleScheduleReport}
            disabled={isExporting}
          >
            <Calendar className="w-4 h-4 mr-2" />
            <div className="flex-1">
              <div className="font-medium">Schedule Reports</div>
              <div className="text-xs text-gray-500">Auto-generate monthly</div>
            </div>
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600">New</Badge>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};