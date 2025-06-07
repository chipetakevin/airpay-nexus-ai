
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, Camera, FileText, Zap, 
  CheckCircle, Clock, AlertTriangle,
  Download, Eye, Settings
} from 'lucide-react';

const ProcessingDashboard = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const processDocuments = async () => {
    setProcessing(true);
    
    // Simulate processing with mock results
    setTimeout(() => {
      const mockResults = uploadedFiles.map((file, index) => ({
        id: `doc_${Date.now()}_${index}`,
        filename: file.name,
        status: 'completed',
        confidence: Math.random() * 0.1 + 0.9, // 90-100%
        extractedText: `Mock extracted text from ${file.name}. This would contain the actual OCR results in a real implementation.`,
        processingTime: Math.random() * 2 + 1, // 1-3 seconds
        documentType: 'invoice', // Mock classification
        qualityScore: Math.random() * 0.1 + 0.9,
        metadata: {
          pages: 1,
          words: Math.floor(Math.random() * 500) + 100,
          characters: Math.floor(Math.random() * 2000) + 500
        }
      }));
      
      setResults(mockResults);
      setProcessing(false);
    }, 3000);
  };

  const recentProcessing = [
    { id: '1', name: 'Invoice_2024_001.pdf', status: 'completed', time: '2 mins ago', confidence: 0.98 },
    { id: '2', name: 'Contract_Draft.jpg', status: 'processing', time: '5 mins ago', confidence: null },
    { id: '3', name: 'Receipt_Store.png', status: 'completed', time: '8 mins ago', confidence: 0.95 },
    { id: '4', name: 'Form_Application.pdf', status: 'failed', time: '12 mins ago', confidence: null },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Document Processing Interface
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drop documents here or click to upload
              </p>
              <p className="text-sm text-gray-500">
                Supports PDF, JPG, PNG, TIFF, HEIC files
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.tiff,.heic"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Uploaded Files:</h4>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                    </div>
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                ))}
              </div>
            )}

            {/* Processing Controls */}
            <div className="flex gap-3">
              <Button 
                onClick={processDocuments}
                disabled={uploadedFiles.length === 0 || processing}
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
              >
                {processing ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Process Documents
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Processing Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">{result.filename}</h4>
                        <p className="text-sm text-gray-500">
                          Processed in {result.processingTime.toFixed(1)}s
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">
                        {(result.confidence * 100).toFixed(1)}% confidence
                      </Badge>
                      <Badge className="bg-green-100 text-green-800">
                        {result.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded p-3">
                    <h5 className="text-sm font-medium mb-2">Extracted Text:</h5>
                    <p className="text-sm text-gray-700">{result.extractedText}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Processing Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Processing Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentProcessing.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.confidence && (
                    <span className="text-sm text-gray-600">
                      {(item.confidence * 100).toFixed(1)}%
                    </span>
                  )}
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessingDashboard;
