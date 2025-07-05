import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileSpreadsheet,
  FileJson,
  FileImage,
  Settings,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExportJob {
  id: string;
  name: string;
  dataType: string;
  format: 'csv' | 'excel' | 'json' | 'pdf';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  recordCount: number;
  fileSize?: string;
  downloadUrl?: string;
  createdAt: string;
  completedAt?: string;
  filters?: any;
  requestedBy: string;
}

interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  dataType: string;
  defaultFormat: string;
  fields: string[];
  filters: any[];
}

const EXPORT_TEMPLATES: ExportTemplate[] = [
  {
    id: '1',
    name: 'Contractor Profile Report',
    description: 'Complete contractor profiles with verification status',
    dataType: 'contractor_profiles',
    defaultFormat: 'excel',
    fields: ['name', 'email', 'phone', 'verification_status', 'created_at'],
    filters: [
      { field: 'verification_status', type: 'select', options: ['verified', 'pending', 'rejected'] },
      { field: 'date_range', type: 'daterange' }
    ]
  },
  {
    id: '2',
    name: 'Feature Access Report',
    description: 'Contractor feature access permissions and usage',
    dataType: 'feature_access',
    defaultFormat: 'csv',
    fields: ['contractor_name', 'feature_key', 'is_enabled', 'enabled_at', 'enabled_by'],
    filters: [
      { field: 'feature_category', type: 'select', options: ['data_submission', 'notifications', 'compliance'] },
      { field: 'access_status', type: 'select', options: ['enabled', 'disabled'] }
    ]
  },
  {
    id: '3',
    name: 'Compliance Status Report',
    description: 'RICA and compliance tracking for all contractors',
    dataType: 'compliance_records',
    defaultFormat: 'excel',
    fields: ['contractor_name', 'rica_status', 'kyc_status', 'last_updated', 'expiry_date'],
    filters: [
      { field: 'compliance_status', type: 'select', options: ['compliant', 'overdue', 'expiring'] },
      { field: 'date_range', type: 'daterange' }
    ]
  }
];

const MOCK_EXPORT_JOBS: ExportJob[] = [
  {
    id: '1',
    name: 'Monthly Contractor Report',
    dataType: 'contractor_profiles',
    format: 'excel',
    status: 'completed',
    progress: 100,
    recordCount: 1247,
    fileSize: '2.3 MB',
    downloadUrl: '#',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    requestedBy: 'admin'
  },
  {
    id: '2',
    name: 'Feature Access Audit',
    dataType: 'feature_access',
    format: 'csv',
    status: 'processing',
    progress: 75,
    recordCount: 3421,
    createdAt: new Date(Date.now() - 300000).toISOString(),
    requestedBy: 'admin'
  }
];

export const ExportManager: React.FC = () => {
  const { hasRole } = usePermissions();
  const { toast } = useToast();
  const [exportJobs, setExportJobs] = useState<ExportJob[]>(MOCK_EXPORT_JOBS);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [exportFormat, setExportFormat] = useState<'csv' | 'excel' | 'json' | 'pdf'>('excel');
  const [exportName, setExportName] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [isCreatingExport, setIsCreatingExport] = useState(false);
  const [filters, setFilters] = useState<any>({});

  const isAdmin = hasRole(['admin', 'manager']);
  const isContractor = hasRole('contractor');

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'excel':
        return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
      case 'csv':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'json':
        return <FileJson className="h-4 w-4 text-orange-600" />;
      case 'pdf':
        return <FileImage className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-toggle-enabled" />;
      case 'processing':
        return <RefreshCw className="h-4 w-4 text-feature-pending-text animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-feature-enabled-bg border-feature-enabled-border text-feature-enabled-text';
      case 'processing':
        return 'bg-feature-pending-bg border-feature-pending-border text-feature-pending-text';
      case 'failed':
        return 'bg-destructive/10 border-destructive text-destructive';
      default:
        return 'bg-muted border-muted-foreground/20';
    }
  };

  const createExport = async () => {
    if (!selectedTemplate || !exportName) {
      toast({
        title: "Error",
        description: "Please select a template and provide an export name",
        variant: "destructive"
      });
      return;
    }

    setIsCreatingExport(true);
    
    try {
      const template = EXPORT_TEMPLATES.find(t => t.id === selectedTemplate);
      
      const newExport: ExportJob = {
        id: Date.now().toString(),
        name: exportName,
        dataType: template?.dataType || '',
        format: exportFormat,
        status: 'pending',
        progress: 0,
        recordCount: 0,
        createdAt: new Date().toISOString(),
        requestedBy: 'current_user',
        filters
      };

      setExportJobs(prev => [newExport, ...prev]);
      
      toast({
        title: "Success",
        description: "Export job created successfully",
      });

      // Reset form
      setExportName('');
      setSelectedTemplate('');
      setSelectedFields([]);
      setFilters({});

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create export job",
        variant: "destructive"
      });
    } finally {
      setIsCreatingExport(false);
    }
  };

  const downloadExport = (job: ExportJob) => {
    if (job.downloadUrl) {
      console.log('Downloading export:', job.name);
      toast({
        title: "Download Started",
        description: `Downloading ${job.name}`,
      });
    }
  };

  const currentTemplate = EXPORT_TEMPLATES.find(t => t.id === selectedTemplate);

  if (!isAdmin && !isContractor) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Access denied. This section requires appropriate permissions.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Download className="h-6 w-6" />
            <span>Export Manager</span>
          </h1>
          <p className="text-muted-foreground">
            Create and manage data exports with flexible formats and filtering
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Export */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Export</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Export Name</label>
              <Input
                placeholder="Enter export name"
                value={exportName}
                onChange={(e) => setExportName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Template</label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select export template" />
                </SelectTrigger>
                <SelectContent>
                  {EXPORT_TEMPLATES.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-muted-foreground">{template.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Export Format</label>
              <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">
                    <div className="flex items-center space-x-2">
                      <FileSpreadsheet className="h-4 w-4 text-green-600" />
                      <span>Excel (.xlsx)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="csv">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span>CSV (.csv)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="json">
                    <div className="flex items-center space-x-2">
                      <FileJson className="h-4 w-4 text-orange-600" />
                      <span>JSON (.json)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="pdf">
                    <div className="flex items-center space-x-2">
                      <FileImage className="h-4 w-4 text-red-600" />
                      <span>PDF (.pdf)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {currentTemplate && (
              <div>
                <label className="text-sm font-medium mb-2 block">Fields to Export</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {currentTemplate.fields.map(field => (
                    <div key={field} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedFields.includes(field)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedFields(prev => [...prev, field]);
                          } else {
                            setSelectedFields(prev => prev.filter(f => f !== field));
                          }
                        }}
                      />
                      <span className="text-sm">{field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={createExport}
              disabled={isCreatingExport || !isAdmin}
              className="w-full"
            >
              {isCreatingExport ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Creating Export...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Create Export
                </>
              )}
            </Button>

            {!isAdmin && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Only administrators can create exports. Contact your admin for data exports.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Export Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Available Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {EXPORT_TEMPLATES.map(template => (
                <div 
                  key={template.id} 
                  className={cn(
                    "p-3 border rounded-lg cursor-pointer transition-colors",
                    selectedTemplate === template.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{template.description}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {template.defaultFormat.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.fields.slice(0, 3).map(field => (
                      <Badge key={field} variant="secondary" className="text-xs">
                        {field}
                      </Badge>
                    ))}
                    {template.fields.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.fields.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Export History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exportJobs.map(job => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(job.status)}
                  {getFormatIcon(job.format)}
                  <div>
                    <div className="font-medium">{job.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {job.recordCount.toLocaleString()} records • {job.format.toUpperCase()}
                      {job.fileSize && ` • ${job.fileSize}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className={cn("text-xs", getStatusColor(job.status))}>
                    {job.status}
                  </Badge>
                  
                  {job.status === 'processing' && (
                    <div className="w-24">
                      <Progress value={job.progress} className="h-2" />
                    </div>
                  )}
                  
                  {job.status === 'completed' && job.downloadUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadExport(job)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};