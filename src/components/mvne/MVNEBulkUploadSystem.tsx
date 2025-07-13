import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Upload, 
  FileText, 
  Download, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Eye,
  FileCheck,
  Database,
  Users,
  Smartphone,
  CreditCard,
  Settings,
  RefreshCw,
  ChevronDown,
  Info
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ValidationError {
  row: number;
  column: string;
  value: string;
  error: string;
}

interface UploadResult {
  total: number;
  successful: number;
  failed: number;
  errors: ValidationError[];
}

interface CSVTemplate {
  name: string;
  description: string;
  fields: string[];
  sampleData: Record<string, string>[];
}

const csvTemplates: CSVTemplate[] = [
  {
    name: 'Customer Onboarding',
    description: 'Register new MVNE customers with complete profile information',
    fields: ['customer_id', 'first_name', 'last_name', 'email', 'phone', 'id_number', 'service_plan', 'sim_iccid'],
    sampleData: [
      {
        customer_id: 'CUST001',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@email.com',
        phone: '+27123456789',
        id_number: '8001010001088',
        service_plan: 'PREMIUM',
        sim_iccid: '8927000000000000001'
      }
    ]
  },
  {
    name: 'Service Activation',
    description: 'Activate services for existing customers',
    fields: ['customer_id', 'service_type', 'plan_code', 'activation_date', 'billing_cycle'],
    sampleData: [
      {
        customer_id: 'CUST001',
        service_type: 'DATA',
        plan_code: 'DATA_10GB',
        activation_date: '2024-01-15',
        billing_cycle: 'MONTHLY'
      }
    ]
  },
  {
    name: 'Plan Migration',
    description: 'Migrate customers to new service plans',
    fields: ['customer_id', 'current_plan', 'new_plan', 'migration_date', 'retain_balance'],
    sampleData: [
      {
        customer_id: 'CUST001',
        current_plan: 'BASIC',
        new_plan: 'PREMIUM',
        migration_date: '2024-01-20',
        retain_balance: 'true'
      }
    ]
  }
];

const MVNEBulkUploadSystem = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [isValidating, setIsValidating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [confirmationRequired, setConfirmationRequired] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast({
        title: "Invalid File Format",
        description: "Please upload a CSV file only.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    await validateAndPreviewFile(file);
  };

  const validateAndPreviewFile = async (file: File) => {
    setIsValidating(true);
    setValidationErrors([]);
    
    try {
      const text = await file.text();
      const lines = text.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      // Validate headers against selected template
      if (selectedTemplate) {
        const template = csvTemplates.find(t => t.name === selectedTemplate);
        if (template) {
          const missingFields = template.fields.filter(field => !headers.includes(field));
          if (missingFields.length > 0) {
            setValidationErrors([{
              row: 1,
              column: 'headers',
              value: headers.join(', '),
              error: `Missing required fields: ${missingFields.join(', ')}`
            }]);
          }
        }
      }

      // Preview first 5 rows
      const preview = lines.slice(1, 6).map((line, index) => {
        const values = line.split(',').map(v => v.trim());
        const row: any = { row_number: index + 2 };
        headers.forEach((header, i) => {
          row[header] = values[i] || '';
        });
        return row;
      });
      
      setPreviewData(preview);
      
      toast({
        title: "File Validated",
        description: `Found ${lines.length - 1} records. Review preview before proceeding.`,
      });
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Failed to validate file. Please check the format.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const downloadTemplate = (templateName: string) => {
    const template = csvTemplates.find(t => t.name === templateName);
    if (!template) return;

    const csvContent = [
      template.fields.join(','),
      ...template.sampleData.map(row => template.fields.map(field => row[field]).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateName.toLowerCase().replace(/\s+/g, '_')}_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Template Downloaded",
      description: `${templateName} template has been downloaded successfully.`,
    });
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedAction) {
      toast({
        title: "Missing Information",
        description: "Please select a file and action before uploading.",
        variant: "destructive",
      });
      return;
    }

    if (validationErrors.length > 0) {
      toast({
        title: "Validation Errors",
        description: "Please fix validation errors before uploading.",
        variant: "destructive",
      });
      return;
    }

    // Show confirmation for destructive actions
    if ((selectedAction === 'delete' || selectedAction === 'update') && !confirmationRequired) {
      setConfirmationRequired(true);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Simulate processing result
      const mockResult: UploadResult = {
        total: previewData.length,
        successful: Math.floor(previewData.length * 0.95),
        failed: Math.ceil(previewData.length * 0.05),
        errors: []
      };

      setUploadResult(mockResult);
      setConfirmationRequired(false);

      toast({
        title: "Upload Completed",
        description: `Successfully processed ${mockResult.successful} of ${mockResult.total} records.`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "An error occurred during upload. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewData([]);
    setValidationErrors([]);
    setUploadResult(null);
    setUploadProgress(0);
    setConfirmationRequired(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Card matching the image design */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="bg-green-500 p-3 rounded-2xl">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-2">
                  Upload New Bulk Operation
                </h2>
                <p className="text-green-700 text-sm md:text-base max-w-md">
                  Upload CSV files to process bulk service operations and configure their behavior
                </p>
              </div>
            </div>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-base font-medium min-w-[140px]"
              disabled={isUploading || isValidating}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
          </div>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            CSV Template Selection
          </CardTitle>
          <CardDescription>
            Choose a template that matches your data structure or download a sample template
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {csvTemplates.map((template) => (
              <Card 
                key={template.name} 
                className={`cursor-pointer transition-colors ${
                  selectedTemplate === template.name ? 'border-green-500 bg-green-50' : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedTemplate(template.name)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{template.name}</h4>
                    <Checkbox 
                      checked={selectedTemplate === template.name}
                      onChange={() => {}}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{template.fields.length} fields</Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadTemplate(template.name);
                      }}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Operation Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Action</label>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose operation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add New Records</SelectItem>
                  <SelectItem value="update">Update Existing Records</SelectItem>
                  <SelectItem value="delete">Delete Records</SelectItem>
                  <SelectItem value="activate">Activate Services</SelectItem>
                  <SelectItem value="migrate">Migrate Plans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {selectedAction === 'delete' && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-800">
                  Deletion operations cannot be undone. Please ensure you have backups.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Validation & Preview */}
      {selectedFile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              File Validation & Preview
            </CardTitle>
            <CardDescription>
              {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isValidating ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>Validating file structure and data...</p>
              </div>
            ) : (
              <>
                {validationErrors.length > 0 && (
                  <Alert className="border-red-200 bg-red-50">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <p className="font-medium text-red-800">Validation Errors Found:</p>
                        {validationErrors.map((error, index) => (
                          <p key={index} className="text-sm text-red-700">
                            Row {error.row}, Column "{error.column}": {error.error}
                          </p>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {previewData.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Data Preview (First 5 rows)
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border rounded-lg">
                        <thead className="bg-gray-50">
                          <tr>
                            {Object.keys(previewData[0] || {}).filter(key => key !== 'row_number').map(header => (
                              <th key={header} className="p-2 text-left border-b">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {previewData.map((row, index) => (
                            <tr key={index} className="border-b">
                              {Object.entries(row).filter(([key]) => key !== 'row_number').map(([key, value]) => (
                                <td key={key} className="p-2">{value as string}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Processing bulk operation...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">
                Please do not close this window while processing
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirmation Required */}
      {confirmationRequired && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-3">
              <p className="font-medium text-yellow-800">
                Are you sure you want to proceed with this {selectedAction} operation?
              </p>
              <div className="flex gap-2">
                <Button 
                  onClick={handleUpload}
                  variant="destructive"
                  size="sm"
                >
                  Confirm {selectedAction}
                </Button>
                <Button 
                  onClick={() => setConfirmationRequired(false)}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Upload Results */}
      {uploadResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Upload Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold">{uploadResult.total}</p>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-green-600">{uploadResult.successful}</p>
                <p className="text-sm text-muted-foreground">Successful</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-red-600">{uploadResult.failed}</p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={resetUpload} variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Another File
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Operation Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {selectedFile && !isUploading && !uploadResult && (
        <div className="flex gap-3 justify-center pt-4">
          <Button 
            onClick={handleUpload}
            disabled={validationErrors.length > 0 || !selectedAction}
            className="bg-green-600 hover:bg-green-700"
          >
            <Database className="h-4 w-4 mr-2" />
            Process Bulk Operation
          </Button>
          <Button onClick={resetUpload} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default MVNEBulkUploadSystem;