import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Upload, Play, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Template {
  id: string;
  name: string;
  type: 'voice' | 'data' | 'sms' | 'bulk_services' | 'customer_onboarding';
  description: string;
  version: string;
  downloadUrl: string;
  fields: string[];
}

const TemplateManager = () => {
  const { toast } = useToast();
  const [isTestingTemplate, setIsTestingTemplate] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const templates: Template[] = [
    {
      id: 'bulk-services-v1',
      name: 'Bulk Services Template',
      type: 'bulk_services',
      description: 'Template for bulk service operations including activation, deactivation, and modifications',
      version: '1.0',
      downloadUrl: '/templates/bulk-services-template.csv',
      fields: ['subscriber_id', 'service_type', 'action', 'plan_id', 'effective_date']
    },
    {
      id: 'customer-onboarding-v1',
      name: 'Customer Onboarding Template',
      type: 'customer_onboarding',
      description: 'Template for bulk customer registration and KYC processing',
      version: '1.0',
      downloadUrl: '/templates/customer-onboarding-template.csv',
      fields: ['first_name', 'last_name', 'id_number', 'phone', 'email', 'address']
    },
    {
      id: 'voice-plans-v1',
      name: 'Voice Plans Template',
      type: 'voice',
      description: 'Template for voice plan configurations and assignments',
      version: '1.0',
      downloadUrl: '/templates/voice-plans-template.csv',
      fields: ['subscriber_id', 'plan_id', 'minutes', 'validity_days']
    }
  ];

  const handleDownloadTemplate = (template: Template) => {
    // Create a sample CSV content
    const csvContent = generateSampleCSV(template);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast({
      title: "Template Downloaded",
      description: `${template.name} has been downloaded successfully.`,
    });
  };

  const generateSampleCSV = (template: Template): string => {
    const headers = template.fields.join(',');
    let sampleRows = '';
    
    switch (template.type) {
      case 'bulk_services':
        sampleRows = `
SUB001,voice,activate,VOICE_BASIC,2024-01-15
SUB002,data,modify,DATA_PREMIUM,2024-01-16
SUB003,sms,deactivate,SMS_BASIC,2024-01-17`;
        break;
      case 'customer_onboarding':
        sampleRows = `
Thabo,Mthembu,8001015009088,+27821234567,thabo.mthembu@example.com,"123 Main St, Johannesburg"
Sarah,Johnson,8505125009088,+27821234568,sarah.johnson@example.com,"456 Oak Ave, Cape Town"
Michael,Smith,7812075009088,+27821234569,michael.smith@example.com,"789 Pine Rd, Durban"`;
        break;
      case 'voice':
        sampleRows = `
SUB001,VOICE_BASIC,300,30
SUB002,VOICE_PREMIUM,1000,30
SUB003,VOICE_UNLIMITED,unlimited,30`;
        break;
      default:
        sampleRows = `
sample_value_1,sample_value_2,sample_value_3
sample_value_4,sample_value_5,sample_value_6`;
    }
    
    return headers + sampleRows;
  };

  const handleTestTemplate = async () => {
    setIsTestingTemplate(true);
    
    // Simulate template validation
    setTimeout(() => {
      setIsTestingTemplate(false);
      toast({
        title: "Template Test Complete",
        description: "Template structure validated successfully. Ready for use.",
        duration: 3000,
      });
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload with progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload Complete",
            description: `${file.name} uploaded successfully. Processing bulk operations...`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Template Manager
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Download templates and upload bulk service files
        </p>
      </div>

      {/* Template Testing Section */}
      <Card className="border-2 border-dashed border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Play className="h-5 w-5" />
            Test Template
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={handleTestTemplate}
            disabled={isTestingTemplate}
            variant="outline"
            className="w-full max-w-md"
          >
            {isTestingTemplate ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                Testing Template...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Test Template Structure
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Available Templates Section - Mobile First Grid Layout */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Available Templates</h2>
          <p className="text-muted-foreground">Download pre-configured templates for bulk operations</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg leading-tight mb-2 text-gray-900">
                      {template.name}
                    </CardTitle>
                  </div>
                </div>
                
                <CardDescription className="text-sm leading-relaxed text-gray-600">
                  {template.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-medium">
                      v{template.version}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                      {template.fields.length} fields
                    </span>
                  </div>
                </div>
                
                <Button
                  onClick={() => handleDownloadTemplate(template)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upload Section */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500 rounded-lg">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-green-800">Upload New Bulk Operation</CardTitle>
              <CardDescription className="text-green-600">
                Upload CSV files to process bulk service operations and configure their behavior
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center bg-white/50">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csvUpload"
              />
              <label htmlFor="csvUpload" className="cursor-pointer">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-green-800">Click to upload CSV file</p>
                    <p className="text-sm text-green-600">Drag and drop files here, or click to browse</p>
                  </div>
                </div>
              </label>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isUploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Ready</p>
                <p className="text-xs text-muted-foreground">System operational</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-blue-500 rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-medium">Processing</p>
                <p className="text-xs text-muted-foreground">0 operations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Queue</p>
                <p className="text-xs text-muted-foreground">0 pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemplateManager;