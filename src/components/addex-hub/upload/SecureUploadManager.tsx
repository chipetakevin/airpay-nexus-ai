import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Upload, 
  FileText, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  Eye,
  Lock,
  Scan,
  FileCheck,
  Database,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DocumentProcessor } from './DocumentProcessor';
import { ComplianceValidator } from './ComplianceValidator';
import { SecurityScanner } from './SecurityScanner';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadProgress: number;
  status: 'uploading' | 'processing' | 'validated' | 'stored' | 'failed' | 'quarantined';
  classification?: string;
  extractedData?: any;
  complianceStatus?: 'pending' | 'compliant' | 'non-compliant';
  securityScan?: 'pending' | 'clean' | 'threat-detected';
  uploadedAt: Date;
  metadata?: {
    documentType: string;
    dataFields: string[];
    recordCount?: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
}

interface SecurityConfig {
  maxFileSize: number; // MB
  allowedTypes: string[];
  virusScanEnabled: boolean;
  encryptionRequired: boolean;
  auditLogging: boolean;
}

const SECURITY_CONFIG: SecurityConfig = {
  maxFileSize: 100, // 100MB limit
  allowedTypes: ['.csv', '.pdf', '.docx', '.xlsx', '.xml', '.json', '.png', '.jpg', '.jpeg', '.txt'],
  virusScanEnabled: true,
  encryptionRequired: true,
  auditLogging: true
};

export const SecureUploadManager: React.FC = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // File size validation
    if (file.size > SECURITY_CONFIG.maxFileSize * 1024 * 1024) {
      return { valid: false, error: `File size exceeds ${SECURITY_CONFIG.maxFileSize}MB limit` };
    }

    // File type validation
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!SECURITY_CONFIG.allowedTypes.includes(fileExtension)) {
      return { valid: false, error: 'File type not allowed' };
    }

    // Filename sanitization check
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    if (sanitizedName !== file.name) {
      console.warn('Filename contains potentially unsafe characters and will be sanitized');
    }

    return { valid: true };
  };

  const processFile = async (file: File): Promise<UploadedFile> => {
    const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const uploadedFile: UploadedFile = {
      id: fileId,
      name: file.name,
      type: file.type || 'unknown',
      size: file.size,
      uploadProgress: 0,
      status: 'uploading',
      uploadedAt: new Date()
    };

    // Start upload simulation
    const uploadInterval = setInterval(() => {
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, uploadProgress: Math.min(f.uploadProgress + 10, 90) }
          : f
      ));
    }, 200);

    try {
      // Simulate upload completion
      setTimeout(() => {
        clearInterval(uploadInterval);
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                uploadProgress: 100, 
                status: 'processing',
                securityScan: 'pending'
              }
            : f
        ));

        // Start processing chain
        processUploadedFile(fileId, file);
      }, 2000);

    } catch (error) {
      clearInterval(uploadInterval);
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'failed' }
          : f
      ));
      throw error;
    }

    return uploadedFile;
  };

  const processUploadedFile = async (fileId: string, file: File) => {
    try {
      // Step 1: Security Scanning
      const securityResult = await SecurityScanner.scanFile(file);
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { 
              ...f, 
              securityScan: securityResult.clean ? 'clean' : 'threat-detected',
              status: securityResult.clean ? 'processing' : 'quarantined'
            }
          : f
      ));

      if (!securityResult.clean) {
        toast({
          title: "Security Threat Detected",
          description: `File ${file.name} has been quarantined due to security concerns.`,
          variant: "destructive"
        });
        return;
      }

      // Step 2: Document Classification & Data Extraction
      const processingResult = await DocumentProcessor.processDocument(file);
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { 
              ...f, 
              classification: processingResult.documentType,
              extractedData: processingResult.extractedData,
              metadata: {
                documentType: processingResult.documentType,
                dataFields: processingResult.dataFields,
                recordCount: processingResult.recordCount,
                riskLevel: processingResult.riskLevel
              }
            }
          : f
      ));

      // Step 3: Compliance Validation
      const complianceResult = await ComplianceValidator.validateDocument(
        processingResult, 
        file.name
      );
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { 
              ...f, 
              complianceStatus: complianceResult.compliant ? 'compliant' : 'non-compliant',
              status: complianceResult.compliant ? 'validated' : 'failed'
            }
          : f
      ));

      // Step 4: Database Storage (if compliant)
      if (complianceResult.compliant) {
        // Simulate database storage
        setTimeout(() => {
          setUploadedFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, status: 'stored' }
              : f
          ));

          toast({
            title: "Document Processed Successfully",
            description: `${file.name} has been securely processed and stored in compliance with MVNE standards.`,
          });
        }, 1000);
      } else {
        toast({
          title: "Compliance Validation Failed",
          description: `${file.name} failed compliance validation: ${complianceResult.errors.join(', ')}`,
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('File processing error:', error);
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'failed' }
          : f
      ));
      toast({
        title: "Processing Failed",
        description: `Failed to process ${file.name}. Please try again.`,
        variant: "destructive"
      });
    }
  };

  const handleFiles = async (files: FileList | File[]) => {
    setIsUploading(true);
    const fileArray = Array.from(files);
    
    for (const file of fileArray) {
      const validation = validateFile(file);
      
      if (!validation.valid) {
        toast({
          title: "File Validation Failed",
          description: `${file.name}: ${validation.error}`,
          variant: "destructive"
        });
        continue;
      }

      try {
        const uploadedFile = await processFile(file);
        setUploadedFiles(prev => [...prev, uploadedFile]);
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload Failed",
          description: `Failed to upload ${file.name}`,
          variant: "destructive"
        });
      }
    }
    setIsUploading(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
      // Reset input to allow same file upload again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading': return <Upload className="h-4 w-4 animate-pulse" />;
      case 'processing': return <Scan className="h-4 w-4 animate-spin" />;
      case 'validated': return <FileCheck className="h-4 w-4" />;
      case 'stored': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'quarantined': return <Shield className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'validated': return 'bg-purple-100 text-purple-800';
      case 'stored': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'quarantined': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFiles = uploadedFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.classification?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || file.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Upload New Bulk Operation
          </CardTitle>
          <CardDescription className="text-green-600">
            Upload CSV files to process bulk service operations and configure their behavior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragActive 
                ? 'border-green-500 bg-green-50' 
                : 'border-green-300 bg-white/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-green-800">
                  Upload Documents for Intelligent Processing
                </p>
                <p className="text-sm text-green-600">
                  Supports CSV, PDF, DOCX, Images, XML, JSON files • Max {SECURITY_CONFIG.maxFileSize}MB • AI-powered classification
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="outline" className="text-green-700 border-green-300">
                  <Lock className="h-3 w-3 mr-1" />
                  POPIA Compliant
                </Badge>
                <Badge variant="outline" className="text-green-700 border-green-300">
                  <Shield className="h-3 w-3 mr-1" />
                  ICASA Approved
                </Badge>
              </div>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={handleUploadClick}
                disabled={isUploading}
                type="button"
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? 'Processing...' : 'Upload File'}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                accept={SECURITY_CONFIG.allowedTypes.join(',')}
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Operations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by MSISDN, Code"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="uploading">Uploading</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="validated">Validated</SelectItem>
                <SelectItem value="stored">Stored</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="quarantined">Quarantined</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <div className="space-y-4">
        {filteredFiles.map((file) => (
          <Card key={file.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getStatusIcon(file.status)}
                    {file.name}
                  </CardTitle>
                  <CardDescription>
                    {file.classification && `${file.classification} • `}
                    {(file.size / 1024 / 1024).toFixed(2)} MB • 
                    Uploaded {file.uploadedAt.toLocaleString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(file.status)}>
                    <span className="capitalize">{file.status}</span>
                  </Badge>
                  {file.complianceStatus && (
                    <Badge variant={file.complianceStatus === 'compliant' ? 'default' : 'destructive'}>
                      {file.complianceStatus === 'compliant' ? 'Compliant' : 'Non-Compliant'}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress Bar for uploading/processing */}
              {(file.status === 'uploading' || file.status === 'processing') && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{file.status === 'uploading' ? 'Uploading' : 'Processing'}</span>
                    <span>{file.uploadProgress}%</span>
                  </div>
                  <Progress value={file.uploadProgress} />
                </div>
              )}

              {/* Metadata Display */}
              {file.metadata && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Document Type</p>
                    <p className="text-muted-foreground">{file.metadata.documentType}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Data Fields</p>
                    <p className="text-muted-foreground">{file.metadata.dataFields.length} fields</p>
                  </div>
                  {file.metadata.recordCount && (
                    <div>
                      <p className="font-semibold">Records</p>
                      <p className="text-muted-foreground">{file.metadata.recordCount.toLocaleString()}</p>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">Risk Level</p>
                    <Badge 
                      variant={
                        file.metadata.riskLevel === 'low' ? 'default' :
                        file.metadata.riskLevel === 'medium' ? 'secondary' : 'destructive'
                      }
                    >
                      {file.metadata.riskLevel}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                {file.status === 'stored' && (
                  <Button variant="outline" size="sm">
                    <Database className="h-4 w-4 mr-2" />
                    View in Database
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredFiles.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4" />
              <p>No files found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};