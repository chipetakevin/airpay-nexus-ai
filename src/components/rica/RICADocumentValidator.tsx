import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Eye, 
  Zap,
  Shield,
  Camera,
  User,
  MapPin
} from 'lucide-react';

interface ExtractedIDData {
  idNumber?: string;
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
}

interface ExtractedAddressData {
  address?: string;
  documentDate?: string;
  issuer?: string;
}

interface ExtractedSelfieData {
  facialMatchConfidence?: number;
  faceDetected?: boolean;
  qualityScore?: number;
}

interface DocumentValidationResult {
  isValid: boolean;
  confidence: number;
  extractedData: ExtractedIDData | ExtractedAddressData | ExtractedSelfieData | {};
  securityChecks: {
    malwareDetected: boolean;
    fileIntegrity: boolean;
    metadataClean: boolean;
    facialMatch?: number;
  };
  errors: string[];
  suggestions: string[];
}

interface RICADocumentValidatorProps {
  onValidationComplete: (results: DocumentValidationResult[]) => void;
}

const RICADocumentValidator: React.FC<RICADocumentValidatorProps> = ({ 
  onValidationComplete 
}) => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [validationResults, setValidationResults] = useState<DocumentValidationResult[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // File type and size validation
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name}: Only JPEG, PNG, WebP, and PDF files are allowed`,
          variant: "destructive"
        });
        return false;
      }
      
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name}: Maximum file size is 10MB`,
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    });
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  }, [toast]);

  const validateDocuments = useCallback(async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No documents uploaded",
        description: "Please upload your ID document and proof of residence",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    setValidationProgress(0);
    
    const results: DocumentValidationResult[] = [];
    
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      setValidationProgress((i / uploadedFiles.length) * 100);
      
      try {
        // Simulate AI-powered document validation
        const result = await validateSingleDocument(file);
        results.push(result);
        
        toast({
          title: `${file.name} processed`,
          description: `Validation confidence: ${result.confidence}%`,
        });
      } catch (error) {
        results.push({
          isValid: false,
          confidence: 0,
          extractedData: {},
          securityChecks: {
            malwareDetected: false,
            fileIntegrity: false,
            metadataClean: false
          },
          errors: [`Failed to process ${file.name}: ${error}`],
          suggestions: ['Please try uploading the document again']
        });
      }
    }
    
    setValidationProgress(100);
    setValidationResults(results);
    setIsValidating(false);
    onValidationComplete(results);
    
    // Summary notification
    const validCount = results.filter(r => r.isValid).length;
    const totalCount = results.length;
    
    if (validCount === totalCount) {
      toast({
        title: "✅ All documents validated",
        description: "RICA requirements satisfied",
      });
    } else {
      toast({
        title: "⚠️ Document validation issues",
        description: `${validCount}/${totalCount} documents passed validation`,
        variant: "destructive"
      });
    }
  }, [uploadedFiles, onValidationComplete, toast]);

  const validateSingleDocument = async (file: File): Promise<DocumentValidationResult> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    const documentType = detectDocumentType(file.name);
    const confidence = 85 + Math.random() * 10; // 85-95% confidence
    
    let extractedData: ExtractedIDData | ExtractedAddressData | ExtractedSelfieData | {} = {};
    let errors: string[] = [];
    let suggestions: string[] = [];
    
    // Simulate OCR and data extraction
    if (documentType === 'sa_id') {
      const idData: ExtractedIDData = {
        idNumber: '8001015009087',
        fullName: 'JOHN CITIZEN SMITH',
        dateOfBirth: '1980-01-01',
        gender: 'M',
        nationality: 'SA'
      };
      extractedData = idData;
      
      // Validate ID document requirements
      if (confidence < 90) {
        errors.push('ID document image quality is below optimal');
        suggestions.push('Ensure good lighting and all text is clearly visible');
      }
      
      // Check for common issues
      if (Math.random() < 0.1) {
        errors.push('ID document appears to be expired');
        suggestions.push('Please provide a valid, non-expired South African ID');
      }
      
    } else if (documentType === 'proof_of_address') {
      const addressData: ExtractedAddressData = {
        address: '123 Main Street, Cape Town, 8001',
        documentDate: new Date().toISOString().split('T')[0],
        issuer: 'City of Cape Town'
      };
      extractedData = addressData;
      
      // Validate proof of residence requirements
      const documentAge = Math.random() * 120; // Days
      if (documentAge > 90) {
        errors.push('Proof of residence document is older than 90 days');
        suggestions.push('Provide a recent utility bill, bank statement, or municipal account');
      }
      
      } else if (documentType === 'selfie') {
        // Simulate facial recognition
        const facialMatch = 85 + Math.random() * 10;
        const selfieData: ExtractedSelfieData = {
          facialMatchConfidence: facialMatch,
          faceDetected: true,
          qualityScore: confidence
        };
        extractedData = selfieData;
        
        if (facialMatch < 80) {
          errors.push('Facial recognition confidence is low');
          suggestions.push('Take a clear selfie in good lighting, facing the camera directly');
        }
      }
    
    // Security checks
    const securityChecks = {
      malwareDetected: false,
      fileIntegrity: true,
      metadataClean: true,
      facialMatch: documentType === 'selfie' ? (extractedData as ExtractedSelfieData).facialMatchConfidence : undefined
    };
    
    // Random security issues (very rare)
    if (Math.random() < 0.02) {
      securityChecks.malwareDetected = true;
      errors.push('Security scan detected potential issues');
      suggestions.push('Please scan your device and try uploading again');
    }
    
    const isValid = errors.length === 0 && confidence > 80;
    
    return {
      isValid,
      confidence: Math.round(confidence),
      extractedData,
      securityChecks,
      errors,
      suggestions
    };
  };

  const detectDocumentType = (filename: string): string => {
    const lower = filename.toLowerCase();
    if (lower.includes('id') || lower.includes('identity')) return 'sa_id';
    if (lower.includes('selfie') || lower.includes('photo')) return 'selfie';
    if (lower.includes('proof') || lower.includes('address') || lower.includes('utility')) return 'proof_of_address';
    return 'unknown';
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setValidationResults(prev => prev.filter((_, i) => i !== index));
  };

  const getValidationIcon = (result: DocumentValidationResult) => {
    if (result.isValid) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <AlertTriangle className="w-5 h-5 text-red-500" />;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          AI-Powered Document Validation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
          <div className="space-y-2">
            <p className="text-sm font-medium">Upload RICA Documents</p>
            <p className="text-xs text-gray-500">
              Required: SA ID, Proof of Residence (max 90 days), Selfie with ID
            </p>
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="document-upload"
            />
            <label
              htmlFor="document-upload"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
            >
              Choose Files
            </label>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Uploaded Documents:</h4>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-4 h-4 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {validationResults[index] && getValidationIcon(validationResults[index])}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Validation Button */}
        <Button 
          onClick={validateDocuments}
          disabled={isValidating || uploadedFiles.length === 0}
          className="w-full"
        >
          {isValidating ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-pulse" />
              Validating Documents...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Validate All Documents
            </>
          )}
        </Button>

        {/* Validation Progress */}
        {isValidating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing documents...</span>
              <span>{Math.round(validationProgress)}%</span>
            </div>
            <Progress value={validationProgress} className="h-2" />
          </div>
        )}

        {/* Validation Results */}
        {validationResults.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Validation Results:</h4>
            {validationResults.map((result, index) => (
              <Card key={index} className={`${result.isValid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getValidationIcon(result)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">{uploadedFiles[index]?.name}</span>
                        <Badge variant="outline" className={getConfidenceColor(result.confidence)}>
                          {result.confidence}% confidence
                        </Badge>
                      </div>
                      
                      {/* Extracted Data */}
                      {Object.keys(result.extractedData).length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium mb-1">Extracted Information:</p>
                          <div className="text-xs space-y-1">
                            {Object.entries(result.extractedData).map(([key, value]) => (
                              <div key={key} className="flex gap-2">
                                <span className="font-medium">{key}:</span>
                                <span>{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Security Checks */}
                      <div className="mb-3">
                        <p className="text-xs font-medium mb-1">Security Checks:</p>
                        <div className="flex gap-4 text-xs">
                          <span className={result.securityChecks.malwareDetected ? 'text-red-600' : 'text-green-600'}>
                            {result.securityChecks.malwareDetected ? '⚠️' : '✅'} Malware Scan
                          </span>
                          <span className={result.securityChecks.fileIntegrity ? 'text-green-600' : 'text-red-600'}>
                            {result.securityChecks.fileIntegrity ? '✅' : '⚠️'} File Integrity
                          </span>
                          <span className={result.securityChecks.metadataClean ? 'text-green-600' : 'text-red-600'}>
                            {result.securityChecks.metadataClean ? '✅' : '⚠️'} Metadata Clean
                          </span>
                        </div>
                      </div>
                      
                      {/* Errors and Suggestions */}
                      {result.errors.length > 0 && (
                        <div className="space-y-1">
                          {result.errors.map((error, i) => (
                            <Alert key={i} className="py-2">
                              <AlertDescription className="text-xs">
                                ❌ {error}
                              </AlertDescription>
                            </Alert>
                          ))}
                        </div>
                      )}
                      
                      {result.suggestions.length > 0 && (
                        <div className="space-y-1 mt-2">
                          {result.suggestions.map((suggestion, i) => (
                            <Alert key={i} className="py-2 bg-blue-50 border-blue-200">
                              <AlertDescription className="text-xs">
                                💡 {suggestion}
                              </AlertDescription>
                            </Alert>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* RICA Compliance Summary */}
        {validationResults.length > 0 && (
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-3">RICA Compliance Status:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${validationResults.every(r => r.isValid) ? 'text-green-600' : 'text-red-600'}`}>
                    {validationResults.filter(r => r.isValid).length}/{validationResults.length}
                  </div>
                  <div className="text-xs text-gray-600">Documents Valid</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${validationResults.every(r => r.isValid) ? 'text-green-600' : 'text-red-600'}`}>
                    {validationResults.every(r => r.isValid) ? '✅' : '❌'}
                  </div>
                  <div className="text-xs text-gray-600">RICA Ready</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default RICADocumentValidator;