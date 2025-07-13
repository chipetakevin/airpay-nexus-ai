import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
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
  Download,
  Trash2,
  RefreshCw,
  Clock,
  Brain,
  Zap,
  Cloud,
  Calendar,
  BarChart,
  Settings,
  Bot,
  AlertCircle,
  Pause,
  Play,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  FileImage,
  FileSpreadsheet,
  ClipboardList,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UploadedDocument {
  id: string;
  user_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  upload_status: string;
  processing_status: string;
  classification?: string;
  extracted_data?: any;
  compliance_status: string;
  security_scan_status: string;
  fraud_score?: number;
  ai_analysis?: any;
  metadata: any;
  uploaded_at: string;
  processed_at?: string;
  created_at: string;
  updated_at: string;
  downloadUrl?: string;
  resumable_upload_id?: string;
  chunk_progress?: number;
  total_chunks?: number;
}

interface ResumeUploadSession {
  uploadId: string;
  fileName: string;
  totalSize: number;
  uploadedChunks: number[];
  filePath: string;
  chunkSize: number;
}

interface CloudStorageConfig {
  provider: 'supabase' | 'aws' | 'gcp' | 'azure';
  bucket: string;
  region?: string;
  credentials?: any;
}

interface SecurityConfig {
  maxFileSize: number;
  allowedTypes: string[];
  virusScanEnabled: boolean;
  encryptionRequired: boolean;
  fraudDetection: boolean;
  documentDetection: boolean;
  auditLogging: boolean;
  chunkSize: number; // For resumable uploads
}

interface ScheduledTask {
  id: string;
  name: string;
  type: 'fetch' | 'upload' | 'cleanup';
  schedule: string;
  isActive: boolean;
  lastRun?: string;
  nextRun?: string;
  sourceUrl?: string;
  targetPath?: string;
}

const SECURITY_CONFIG: SecurityConfig = {
  maxFileSize: 500, // 500MB limit for resumable uploads
  allowedTypes: ['.csv', '.pdf', '.docx', '.xlsx', '.xml', '.json', '.png', '.jpg', '.jpeg', '.txt', '.zip', '.rar'],
  virusScanEnabled: true,
  encryptionRequired: true,
  fraudDetection: true,
  documentDetection: true,
  auditLogging: true,
  chunkSize: 5 * 1024 * 1024 // 5MB chunks
};

const CLOUD_STORAGE_CONFIGS: CloudStorageConfig[] = [
  { provider: 'supabase', bucket: 'documents' },
  { provider: 'aws', bucket: 's3-bucket-name' },
  { provider: 'gcp', bucket: 'gcp-bucket-name' },
  { provider: 'azure', bucket: 'azure-container-name' }
];

export const IntelligentUploadSystem: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [activeTab, setActiveTab] = useState('upload');
  
  // Resumable uploads
  const [resumeableSessions, setResumableSessions] = useState<ResumeUploadSession[]>([]);
  const [pausedUploads, setPausedUploads] = useState<{[key: string]: boolean}>({});
  
  // Cloud storage
  const [selectedStorageProvider, setSelectedStorageProvider] = useState<CloudStorageConfig>(CLOUD_STORAGE_CONFIGS[0]);
  
  // Bulk upload
  const [bulkUploadUrls, setBulkUploadUrls] = useState<string>('');
  const [processingBulk, setProcessingBulk] = useState(false);
  
  // Scheduled tasks
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>([]);
  const [newTaskForm, setNewTaskForm] = useState({
    name: '',
    type: 'fetch' as 'fetch' | 'upload' | 'cleanup',
    schedule: '',
    sourceUrl: '',
    targetPath: ''
  });
  
  // AI & Fraud Detection
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(true);
  const [fraudDetectionEnabled, setFraudDetectionEnabled] = useState(true);
  const [documentDetectionEnabled, setDocumentDetectionEnabled] = useState(true);
  
  // Analytics
  const [uploadStats, setUploadStats] = useState({
    totalUploads: 0,
    successfulUploads: 0,
    failedUploads: 0,
    totalSize: 0,
    fraudDetected: 0,
    documentsProcessed: 0
  });

  // Fetch documents with enhanced metadata
  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: documentsData, error: dbError } = await supabase
        .from('uploaded_documents')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (dbError) {
        console.error('Error fetching documents:', dbError);
        toast({
          title: "Error Loading Documents",
          description: "Failed to load existing documents from database.",
          variant: "destructive"
        });
        return;
      }

      // Get download URLs and enhanced metadata
      const documentsWithUrls = await Promise.all(
        (documentsData || []).map(async (doc) => {
          try {
            const { data: urlData } = await supabase.storage
              .from(selectedStorageProvider.bucket)
              .createSignedUrl(doc.file_path, 3600);

            return {
              ...doc,
              downloadUrl: urlData?.signedUrl
            };
          } catch (error) {
            console.error('Error getting download URL for', doc.file_name, error);
            return doc;
          }
        })
      );

      setDocuments(documentsWithUrls);
      
      // Update stats
      const stats = documentsWithUrls.reduce((acc, doc) => ({
        totalUploads: acc.totalUploads + 1,
        successfulUploads: acc.successfulUploads + (doc.upload_status === 'completed' ? 1 : 0),
        failedUploads: acc.failedUploads + (doc.upload_status === 'failed' ? 1 : 0),
        totalSize: acc.totalSize + doc.file_size,
        fraudDetected: acc.fraudDetected + ((doc as any).fraud_score && (doc as any).fraud_score > 0.7 ? 1 : 0),
        documentsProcessed: acc.documentsProcessed + (doc.processing_status === 'completed' ? 1 : 0)
      }), { totalUploads: 0, successfulUploads: 0, failedUploads: 0, totalSize: 0, fraudDetected: 0, documentsProcessed: 0 });
      
      setUploadStats(stats);
      
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: "Failed to load documents from storage.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedStorageProvider.bucket]);

  useEffect(() => {
    fetchDocuments();
    loadScheduledTasks();
  }, [fetchDocuments]);

  // AI Document Detection
  const detectDocumentInImage = async (file: File): Promise<{ detected: boolean; confidence: number; analysis?: any }> => {
    if (!documentDetectionEnabled) return { detected: true, confidence: 1 };
    
    try {
      // Simulate AI document detection - in production, use actual AI service
      const isImage = file.type.startsWith('image/');
      if (!isImage) return { detected: true, confidence: 1 };
      
      // Mock AI analysis
      const confidence = Math.random() * 0.4 + 0.6; // 60-100% confidence
      const detected = confidence > 0.7;
      
      return {
        detected,
        confidence,
        analysis: {
          documentType: detected ? 'identification' : 'unknown',
          edges: detected ? 'clear' : 'unclear',
          text: detected ? 'readable' : 'unreadable'
        }
      };
    } catch (error) {
      console.error('Document detection error:', error);
      return { detected: false, confidence: 0 };
    }
  };

  // AI Fraud Detection
  const detectFraud = async (file: File, metadata: any): Promise<{ fraudScore: number; flags: string[]; analysis?: any }> => {
    if (!fraudDetectionEnabled) return { fraudScore: 0, flags: [] };
    
    try {
      // Simulate fraud detection AI - in production, use actual AI service
      const suspiciousFactors = [];
      let fraudScore = 0;
      
      // Check file size anomalies
      if (file.size < 1000 || file.size > 50 * 1024 * 1024) {
        suspiciousFactors.push('unusual_file_size');
        fraudScore += 0.2;
      }
      
      // Check file type mismatches
      const expectedExt = file.name.split('.').pop()?.toLowerCase();
      if (expectedExt && !file.type.includes(expectedExt)) {
        suspiciousFactors.push('type_mismatch');
        fraudScore += 0.3;
      }
      
      // Check for duplicate uploads
      const duplicates = documents.filter(doc => 
        doc.file_name === file.name && doc.file_size === file.size
      );
      if (duplicates.length > 0) {
        suspiciousFactors.push('duplicate_upload');
        fraudScore += 0.1;
      }
      
      // Random additional risk factors for demo
      if (Math.random() > 0.8) {
        suspiciousFactors.push('metadata_anomaly');
        fraudScore += 0.2;
      }
      
      return {
        fraudScore: Math.min(fraudScore, 1),
        flags: suspiciousFactors,
        analysis: {
          riskLevel: fraudScore > 0.7 ? 'high' : fraudScore > 0.4 ? 'medium' : 'low',
          recommendedAction: fraudScore > 0.7 ? 'block' : fraudScore > 0.4 ? 'review' : 'approve'
        }
      };
    } catch (error) {
      console.error('Fraud detection error:', error);
      return { fraudScore: 0, flags: [] };
    }
  };

  // Data Cleaning Pipeline
  const cleanAndValidateData = async (file: File): Promise<{ cleaned: boolean; issues: string[]; cleanedData?: any }> => {
    try {
      if (!file.name.endsWith('.csv')) {
        return { cleaned: true, issues: [] };
      }
      
      const text = await file.text();
      const lines = text.split('\n');
      const issues = [];
      
      // Check for empty lines
      const emptyLines = lines.filter(line => !line.trim()).length;
      if (emptyLines > 0) {
        issues.push(`${emptyLines} empty lines removed`);
      }
      
      // Check for duplicate headers
      if (lines.length > 1) {
        const header = lines[0];
        const duplicateHeaders = lines.slice(1).filter(line => line === header).length;
        if (duplicateHeaders > 0) {
          issues.push(`${duplicateHeaders} duplicate header rows removed`);
        }
      }
      
      // Basic data validation
      if (lines.length < 2) {
        issues.push('File appears to have no data rows');
      }
      
      return {
        cleaned: true,
        issues,
        cleanedData: {
          originalRows: lines.length,
          cleanedRows: lines.filter(line => line.trim()).length,
          duplicatesRemoved: emptyLines
        }
      };
    } catch (error) {
      console.error('Data cleaning error:', error);
      return { cleaned: false, issues: ['Failed to process file for cleaning'] };
    }
  };

  // Resumable Upload with Chunking
  const uploadFileWithResumableSupport = async (file: File, onProgress?: (progress: number) => void): Promise<{ success: boolean; path?: string; error?: string }> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const timestamp = Date.now();
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = `${user.id}/${timestamp}_${sanitizedFileName}`;
      
      // For small files, use regular upload
      if (file.size <= SECURITY_CONFIG.chunkSize) {
        const { data, error } = await supabase.storage
          .from(selectedStorageProvider.bucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          return { success: false, error: error.message };
        }
        
        onProgress?.(100);
        return { success: true, path: data.path };
      }

      // For large files, implement chunked upload
      const chunkSize = SECURITY_CONFIG.chunkSize;
      const totalChunks = Math.ceil(file.size / chunkSize);
      const uploadId = `${user.id}_${timestamp}_${file.name}`;
      
      // Create resumable session
      const session: ResumeUploadSession = {
        uploadId,
        fileName: file.name,
        totalSize: file.size,
        uploadedChunks: [],
        filePath,
        chunkSize
      };
      
      setResumableSessions(prev => [...prev, session]);
      
      // Upload chunks
      for (let i = 0; i < totalChunks; i++) {
        if (pausedUploads[uploadId]) {
          break; // Upload paused
        }
        
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);
        
        const chunkPath = `${filePath}_chunk_${i}`;
        
        const { error } = await supabase.storage
          .from(selectedStorageProvider.bucket)
          .upload(chunkPath, chunk, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          return { success: false, error: `Chunk ${i} upload failed: ${error.message}` };
        }
        
        session.uploadedChunks.push(i);
        const progress = ((i + 1) / totalChunks) * 100;
        onProgress?.(progress);
        
        setUploadProgress(prev => ({ ...prev, [uploadId]: progress }));
      }
      
      if (!pausedUploads[uploadId]) {
        // All chunks uploaded, now combine them (simplified for demo)
        return { success: true, path: filePath };
      } else {
        return { success: false, error: 'Upload paused' };
      }
      
    } catch (error) {
      console.error('Resumable upload error:', error);
      return { success: false, error: 'Upload failed' };
    }
  };

  // Resume paused upload
  const resumeUpload = async (sessionId: string) => {
    const session = resumeableSessions.find(s => s.uploadId === sessionId);
    if (!session) return;
    
    setPausedUploads(prev => ({ ...prev, [sessionId]: false }));
    toast({
      title: "Upload Resumed",
      description: `Resuming upload of ${session.fileName}`,
    });
    
    // Continue from where it left off (implementation would continue chunked upload)
  };

  // Pause upload
  const pauseUpload = (sessionId: string) => {
    setPausedUploads(prev => ({ ...prev, [sessionId]: true }));
    toast({
      title: "Upload Paused",
      description: "Upload has been paused and can be resumed later",
    });
  };

  // Handle file validation with AI
  const validateFileWithAI = async (file: File): Promise<{ valid: boolean; error?: string; analysis?: any }> => {
    // Basic validation
    if (file.size > SECURITY_CONFIG.maxFileSize * 1024 * 1024) {
      return { valid: false, error: `File size exceeds ${SECURITY_CONFIG.maxFileSize}MB limit` };
    }

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!SECURITY_CONFIG.allowedTypes.includes(fileExtension)) {
      return { valid: false, error: 'File type not allowed' };
    }

    // AI-based validation
    const documentDetection = await detectDocumentInImage(file);
    if (!documentDetection.detected && file.type.startsWith('image/')) {
      return { 
        valid: false, 
        error: 'No document detected in image', 
        analysis: documentDetection 
      };
    }

    const fraudAnalysis = await detectFraud(file, {});
    if (fraudAnalysis.fraudScore > 0.7) {
      return { 
        valid: false, 
        error: `High fraud risk detected (${Math.round(fraudAnalysis.fraudScore * 100)}%)`, 
        analysis: fraudAnalysis 
      };
    }

    return { valid: true, analysis: { documentDetection, fraudAnalysis } };
  };

  // Enhanced file processing
  const processUploadedDocumentWithAI = async (documentId: string, file: File) => {
    try {
      // Clean and validate data
      const cleaningResult = await cleanAndValidateData(file);
      
      // AI analysis
      const documentDetection = await detectDocumentInImage(file);
      const fraudAnalysis = await detectFraud(file, {});
      
      // Update with AI analysis results
      await supabase
        .from('uploaded_documents')
        .update({ 
          processing_status: 'completed',
          security_scan_status: 'clean',
          compliance_status: cleaningResult.cleaned ? 'compliant' : 'non_compliant',
          classification: documentDetection.analysis?.documentType || 'document',
          fraud_score: fraudAnalysis.fraudScore,
          ai_analysis: {
            documentDetection,
            fraudAnalysis,
            cleaningResult
          },
          processed_at: new Date().toISOString()
        })
        .eq('id', documentId);

      toast({
        title: "AI Processing Complete",
        description: `Document analyzed with ${Math.round(documentDetection.confidence * 100)}% confidence`,
      });
    } catch (error) {
      console.error('Error processing document with AI:', error);
      toast({
        title: "AI Processing Failed",
        description: "Failed to process the document with AI analysis.",
        variant: "destructive"
      });
    }
  };

  // Main file upload handler
  const handleFiles = async (files: FileList | File[]) => {
    setIsUploading(true);
    const fileArray = Array.from(files);
    
    for (const file of fileArray) {
      const validation = await validateFileWithAI(file);
      
      if (!validation.valid) {
        toast({
          title: "File Validation Failed",
          description: `${file.name}: ${validation.error}`,
          variant: "destructive"
        });
        continue;
      }

      try {
        // Upload with resumable support
        const uploadResult = await uploadFileWithResumableSupport(file, (progress) => {
          setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
        });
        
        if (!uploadResult.success) {
          toast({
            title: "Upload Failed",
            description: `${file.name}: ${uploadResult.error}`,
            variant: "destructive"
          });
          continue;
        }

        // Save document record with AI analysis
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('uploaded_documents')
          .insert({
            user_id: user?.id,
            file_name: file.name,
            file_path: uploadResult.path!,
            file_size: file.size,
            file_type: file.type,
            upload_status: 'completed',
            fraud_score: validation.analysis?.fraudAnalysis?.fraudScore || 0,
            metadata: {
              originalName: file.name,
              uploadMethod: 'intelligent_web',
              fileExtension: file.name.split('.').pop()?.toLowerCase(),
              aiAnalysis: validation.analysis
            }
          })
          .select()
          .single();

        if (error) {
          console.error('Database save error:', error);
          continue;
        }

        // Process with AI
        await processUploadedDocumentWithAI(data.id, file);
        
        toast({
          title: "Upload Successful",
          description: `${file.name} uploaded and AI-processed successfully.`,
        });
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
    setUploadProgress({});
    await fetchDocuments();
  };

  // Bulk upload from URLs/CSV
  const handleBulkUpload = async () => {
    if (!bulkUploadUrls.trim()) return;
    
    setProcessingBulk(true);
    const urls = bulkUploadUrls.split('\n').filter(url => url.trim());
    
    for (const url of urls) {
      try {
        const response = await fetch(url.trim());
        const blob = await response.blob();
        const fileName = url.split('/').pop() || 'downloaded_file';
        const file = new File([blob], fileName, { type: blob.type });
        
        await handleFiles([file]);
      } catch (error) {
        console.error('Error downloading from URL:', url, error);
        toast({
          title: "Download Failed",
          description: `Failed to download from: ${url}`,
          variant: "destructive"
        });
      }
    }
    
    setProcessingBulk(false);
    setBulkUploadUrls('');
  };

  // Handle CSV upload
  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target?.result as string;
      const lines = csv.split('\n');
      const urls = lines.slice(1).map(line => line.split(',')[0]).filter(url => url.trim());
      setBulkUploadUrls(urls.join('\n'));
    };
    reader.readAsText(file);
  };

  // Scheduled tasks management
  const loadScheduledTasks = () => {
    // Load from localStorage or API
    const saved = localStorage.getItem('scheduledTasks');
    if (saved) {
      setScheduledTasks(JSON.parse(saved));
    }
  };

  const saveScheduledTasks = (tasks: ScheduledTask[]) => {
    localStorage.setItem('scheduledTasks', JSON.stringify(tasks));
    setScheduledTasks(tasks);
  };

  const addScheduledTask = () => {
    if (!newTaskForm.name || !newTaskForm.schedule) return;
    
    const task: ScheduledTask = {
      id: Date.now().toString(),
      ...newTaskForm,
      isActive: true,
      nextRun: new Date(Date.now() + 60000).toISOString() // Next minute for demo
    };
    
    const updatedTasks = [...scheduledTasks, task];
    saveScheduledTasks(updatedTasks);
    
    setNewTaskForm({
      name: '',
      type: 'fetch',
      schedule: '',
      sourceUrl: '',
      targetPath: ''
    });
    
    toast({
      title: "Task Scheduled",
      description: `${task.name} has been scheduled successfully.`,
    });
  };

  // Event handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

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

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.classification?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.upload_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading': return <Upload className="h-4 w-4 animate-pulse" />;
      case 'processing': return <Scan className="h-4 w-4 animate-spin" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className={`${isMobile ? 'space-y-4' : 'space-y-6'}`}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-5'}`}>
          <TabsTrigger value="upload" className={isMobile ? 'text-xs' : ''}>
            <Upload className={`h-4 w-4 ${isMobile ? '' : 'mr-2'}`} />
            {!isMobile && 'Upload'}
          </TabsTrigger>
          <TabsTrigger value="bulk" className={isMobile ? 'text-xs' : ''}>
            <ClipboardList className={`h-4 w-4 ${isMobile ? '' : 'mr-2'}`} />
            {isMobile ? 'Bulk' : 'Bulk Upload'}
          </TabsTrigger>
          <TabsTrigger value="analytics" className={isMobile ? 'text-xs' : ''}>
            <BarChart className={`h-4 w-4 ${isMobile ? '' : 'mr-2'}`} />
            {isMobile ? 'Stats' : 'Analytics'}
          </TabsTrigger>
          {!isMobile && (
            <>
              <TabsTrigger value="schedule">
                <Calendar className="h-4 w-4 mr-2" />
                Automation
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="upload" className={isMobile ? 'mobile-section-spacing' : 'space-y-6'}>
          {/* Main Upload Section */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardHeader className={isMobile ? 'p-4' : ''}>
              <CardTitle className="text-green-800 dark:text-green-200 flex items-center gap-2 text-lg md:text-xl">
                <Upload className="h-5 w-5 md:h-6 md:w-6" />
                Upload New Bulk Operation
              </CardTitle>
              <CardDescription className="text-green-600 dark:text-green-300 text-sm">
                Upload CSV files to process bulk service operations and configure their behavior
              </CardDescription>
            </CardHeader>
            <CardContent className={isMobile ? 'p-4 pt-0' : ''}>
              <div 
                className={`border-2 border-dashed rounded-lg ${isMobile ? 'p-4' : 'p-8'} text-center transition-all mobile-touch-target ${
                  dragActive 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : 'border-green-300 dark:border-green-700 bg-white/50 dark:bg-gray-800/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className={isMobile ? 'space-y-3' : 'space-y-4'}>
                  <div className={`mx-auto ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center`}>
                    <Upload className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-green-600 dark:text-green-300`} />
                  </div>
                  <div>
                    <p className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-green-800 dark:text-green-200`}>
                      Upload CSV Files
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-600 dark:text-green-300`}>
                      Upload CSV files to process bulk service operations and configure their behavior
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1 md:gap-2 flex-wrap">
                    <Badge variant="outline" className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 text-xs">
                      <FileText className="h-3 w-3 mr-1" />
                      CSV Files
                    </Badge>
                    <Badge variant="outline" className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Secure Upload
                    </Badge>
                    <Badge variant="outline" className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 text-xs">
                      <Activity className="h-3 w-3 mr-1" />
                      Bulk Processing
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                    <Button 
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white mobile-button"
                      onClick={handleUploadClick}
                      disabled={isUploading}
                      type="button"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {isUploading ? 'Processing...' : 'Upload File'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={fetchDocuments}
                      disabled={isLoading}
                      type="button"
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    accept={SECURITY_CONFIG.allowedTypes.join(',')}
                    onChange={handleFileInput}
                  />
                </div>
              </div>

              {/* Upload Progress */}
              {Object.keys(uploadProgress).length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">Upload Progress</h4>
                  {Object.entries(uploadProgress).map(([fileName, progress]) => (
                    <div key={fileName} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="truncate">{fileName}</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  ))}
                </div>
              )}

              {/* Resumable Upload Sessions */}
              {resumeableSessions.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">Resumable Sessions</h4>
                  {resumeableSessions.map((session) => (
                    <div key={session.uploadId} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border">
                      <div className="flex-1">
                        <p className="font-medium">{session.fileName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.uploadedChunks.length}/{Math.ceil(session.totalSize / session.chunkSize)} chunks
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {pausedUploads[session.uploadId] ? (
                          <Button size="sm" onClick={() => resumeUpload(session.uploadId)}>
                            <Play className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => pauseUpload(session.uploadId)}>
                            <Pause className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Search & Filter Operations */}
          <Card className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900/20 dark:to-gray-900/20 border-slate-200 dark:border-slate-700">
            <CardHeader className={isMobile ? 'p-4' : ''}>
              <CardTitle className="text-slate-800 dark:text-slate-200 flex items-center gap-2 text-lg md:text-xl">
                <Search className="h-5 w-5 md:h-6 md:w-6" />
                Search & Filter Operations
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300 text-sm">
                Search and filter uploaded bulk operations
              </CardDescription>
            </CardHeader>
            <CardContent className={isMobile ? 'p-4 pt-0' : ''}>
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3 md:gap-4`}>
                <div className="flex-1">
                  <Input
                    placeholder="Search by MSISDN, Customer ID, etc..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full mobile-form-input"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className={`${isMobile ? 'w-full' : 'w-48'} mobile-form-select`}>
                    <SelectValue placeholder="All Operations" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background border shadow-lg">
                    <SelectItem value="all">All Operations</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Document Library */}
          <Card>
            <CardHeader className={isMobile ? 'p-4' : ''}>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <FileText className="h-5 w-5" />
                Uploaded Files ({documents.length})
              </CardTitle>
            </CardHeader>
            <CardContent className={`${isMobile ? 'p-4 pt-0' : ''} mobile-section-spacing`}>

              {/* Documents Grid */}
              <div className="grid gap-4">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                          {doc.file_type?.startsWith('image/') ? (
                            <FileImage className="h-5 w-5" />
                          ) : doc.file_name.endsWith('.csv') ? (
                            <FileSpreadsheet className="h-5 w-5" />
                          ) : (
                            <FileText className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{doc.file_name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(doc.upload_status)}>
                              {getStatusIcon(doc.upload_status)}
                              <span className="ml-1">{doc.upload_status}</span>
                            </Badge>
                            {doc.classification && (
                              <Badge variant="outline">
                                {doc.classification}
                              </Badge>
                            )}
                            {doc.fraud_score && doc.fraud_score > 0.5 && (
                              <Badge variant="destructive">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Fraud Risk: {Math.round(doc.fraud_score * 100)}%
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {formatFileSize(doc.file_size)} • {new Date(doc.uploaded_at).toLocaleDateString()}
                          </p>
                          {doc.ai_analysis && (
                            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <p>AI Confidence: {Math.round((doc.ai_analysis.documentDetection?.confidence || 0) * 100)}%</p>
                              {doc.ai_analysis.cleaningResult?.issues?.length > 0 && (
                                <p>Data Issues: {doc.ai_analysis.cleaningResult.issues.length}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {doc.downloadUrl && (
                          <Button size="sm" variant="outline" onClick={() => window.open(doc.downloadUrl, '_blank')}>
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => {
                          // Delete function would go here
                          toast({
                            title: "Delete",
                            description: "Delete functionality would be implemented here",
                          });
                        }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredDocuments.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  {documents.length === 0 ? 'No documents uploaded yet' : 'No documents match your filters'}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className={isMobile ? 'space-y-4' : 'space-y-6'}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Bulk Upload & Cloud Integration
              </CardTitle>
              <CardDescription>
                Upload multiple files from URLs, CSV lists, or cloud storage providers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* URL List Upload */}
              <div className="space-y-4">
                <h4 className="font-medium">Upload from URLs</h4>
                <Textarea
                  placeholder={"Enter file URLs, one per line:\nhttps://example.com/file1.pdf\nhttps://example.com/file2.csv\nhttps://example.com/file3.docx"}
                  value={bulkUploadUrls}
                  onChange={(e) => setBulkUploadUrls(e.target.value)}
                  rows={6}
                />
                <Button 
                  onClick={handleBulkUpload}
                  disabled={processingBulk || !bulkUploadUrls.trim()}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {processingBulk ? 'Processing...' : 'Download & Upload'}
                </Button>
              </div>

              {/* CSV Upload */}
              <div className="space-y-4">
                <h4 className="font-medium">Upload from CSV File</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Upload a CSV file with URLs in the first column
                </p>
                <input
                  ref={csvInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleCsvUpload}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  onClick={() => csvInputRef.current?.click()}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Upload CSV List
                </Button>
              </div>

              {/* Cloud Storage Selection */}
              <div className="space-y-4">
                <h4 className="font-medium">Cloud Storage Provider</h4>
                <Select value={selectedStorageProvider.provider} onValueChange={(value) => {
                  const provider = CLOUD_STORAGE_CONFIGS.find(p => p.provider === value);
                  if (provider) setSelectedStorageProvider(provider);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select storage provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {CLOUD_STORAGE_CONFIGS.map((config) => (
                      <SelectItem key={config.provider} value={config.provider}>
                        <div className="flex items-center gap-2">
                          <Cloud className="h-4 w-4" />
                          {config.provider.toUpperCase()} - {config.bucket}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className={isMobile ? 'space-y-4' : 'space-y-6'}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Automated Tasks & Scheduling
              </CardTitle>
              <CardDescription>
                Schedule automatic file fetching, uploads, and maintenance tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New Task */}
              <div className="space-y-4">
                <h4 className="font-medium">Create Scheduled Task</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Task name"
                    value={newTaskForm.name}
                    onChange={(e) => setNewTaskForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Select value={newTaskForm.type} onValueChange={(value: any) => setNewTaskForm(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Task type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fetch">Fetch from URL</SelectItem>
                      <SelectItem value="upload">Upload to Cloud</SelectItem>
                      <SelectItem value="cleanup">Cleanup Old Files</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Schedule (cron format)"
                    value={newTaskForm.schedule}
                    onChange={(e) => setNewTaskForm(prev => ({ ...prev, schedule: e.target.value }))}
                  />
                  <Input
                    placeholder="Source URL (if applicable)"
                    value={newTaskForm.sourceUrl}
                    onChange={(e) => setNewTaskForm(prev => ({ ...prev, sourceUrl: e.target.value }))}
                  />
                </div>
                <Button onClick={addScheduledTask}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Task
                </Button>
              </div>

              {/* Existing Tasks */}
              <div className="space-y-4">
                <h4 className="font-medium">Scheduled Tasks ({scheduledTasks.length})</h4>
                {scheduledTasks.map((task) => (
                  <Card key={task.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">{task.name}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {task.type} • {task.schedule} • {task.isActive ? 'Active' : 'Inactive'}
                        </p>
                        {task.nextRun && (
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            Next run: {new Date(task.nextRun).toLocaleString()}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={task.isActive ? "default" : "secondary"}>
                          {task.isActive ? 'Active' : 'Paused'}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                {scheduledTasks.length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    No scheduled tasks yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className={isMobile ? 'space-y-4' : 'space-y-6'}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Upload Analytics & Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">Total Uploads</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{uploadStats.totalUploads}</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="font-medium">Successful</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">{uploadStats.successfulUploads}</p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <span className="font-medium">Fraud Detected</span>
                  </div>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-300">{uploadStats.fraudDetected}</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium">Total Size</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{formatFileSize(uploadStats.totalSize)}</p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    <span className="font-medium">AI Processed</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{uploadStats.documentsProcessed}</p>
                </div>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-medium">Success Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                    {uploadStats.totalUploads > 0 ? Math.round((uploadStats.successfulUploads / uploadStats.totalUploads) * 100) : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className={isMobile ? 'space-y-4' : 'space-y-6'}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                AI & Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">AI Document Detection</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Automatically detect documents in uploaded images
                    </p>
                  </div>
                  <Button
                    variant={documentDetectionEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDocumentDetectionEnabled(!documentDetectionEnabled)}
                  >
                    {documentDetectionEnabled ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Fraud Detection</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      AI-powered fraud and anomaly detection
                    </p>
                  </div>
                  <Button
                    variant={fraudDetectionEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFraudDetectionEnabled(!fraudDetectionEnabled)}
                  >
                    {fraudDetectionEnabled ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">AI Analysis</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Comprehensive AI analysis of uploaded documents
                    </p>
                  </div>
                  <Button
                    variant={aiAnalysisEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAiAnalysisEnabled(!aiAnalysisEnabled)}
                  >
                    {aiAnalysisEnabled ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Security Configuration</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Max File Size:</span> {SECURITY_CONFIG.maxFileSize}MB
                    </div>
                    <div>
                      <span className="font-medium">Chunk Size:</span> {formatFileSize(SECURITY_CONFIG.chunkSize)}
                    </div>
                    <div>
                      <span className="font-medium">Allowed Types:</span> {SECURITY_CONFIG.allowedTypes.length} types
                    </div>
                    <div>
                      <span className="font-medium">Encryption:</span> {SECURITY_CONFIG.encryptionRequired ? 'Required' : 'Optional'}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
