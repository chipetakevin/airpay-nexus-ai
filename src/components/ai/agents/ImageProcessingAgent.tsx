
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Settings, Zap, Eye, RotateCcw, Maximize } from 'lucide-react';

const ImageProcessingAgent = () => {
  const processingSteps = [
    { step: 'Format Detection', status: 'active', description: 'PDF, JPG, PNG, TIFF, HEIC support' },
    { step: 'Quality Analysis', status: 'active', description: 'Resolution, contrast, noise assessment' },
    { step: 'Perspective Correction', status: 'active', description: 'Auto-rotation and skew detection' },
    { step: 'Enhancement', status: 'active', description: 'Noise reduction and clarity optimization' },
    { step: 'Segmentation', status: 'active', description: 'Multi-page document separation' },
    { step: 'Layout Analysis', status: 'active', description: 'Document structure identification' }
  ];

  const imageMetrics = [
    { label: 'Images Processed', value: '8,947', icon: <Camera className="w-4 h-4" /> },
    { label: 'Enhancement Rate', value: '94.2%', icon: <Zap className="w-4 h-4" /> },
    { label: 'Auto-Correction', value: '97.8%', icon: <RotateCcw className="w-4 h-4" /> },
    { label: 'Quality Score', value: '9.1/10', icon: <Eye className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Image Processing Agent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Agent Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imageMetrics.map((metric, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-center mb-2 text-blue-600">
                    {metric.icon}
                  </div>
                  <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                </div>
              ))}
            </div>

            {/* Processing Pipeline */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Processing Pipeline</h4>
              <div className="space-y-3">
                {processingSteps.map((step, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{step.step}</p>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {step.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration Options */}
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Agent Configuration
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Auto-enhancement</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Perspective correction</span>
                    <Badge variant="secondary">Auto</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Noise reduction</span>
                    <Badge variant="secondary">Adaptive</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Resolution upscaling</span>
                    <Badge variant="secondary">2x Max</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Format optimization</span>
                    <Badge variant="secondary">Smart</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Batch processing</span>
                    <Badge variant="secondary">50 concurrent</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageProcessingAgent;
