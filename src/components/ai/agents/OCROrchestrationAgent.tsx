
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Zap, Languages, Brain, Settings, CheckCircle } from 'lucide-react';

const OCROrchestrationAgent = () => {
  const ocrEngines = [
    { name: 'Tesseract OCR', status: 'active', accuracy: '97.2%', speed: '1.8s' },
    { name: 'Azure Computer Vision', status: 'active', accuracy: '98.9%', speed: '1.2s' },
    { name: 'Google Vision API', status: 'active', accuracy: '98.5%', speed: '1.4s' },
    { name: 'Handwriting Specialist', status: 'active', accuracy: '94.8%', speed: '2.8s' }
  ];

  const languageSupport = [
    { language: 'English', confidence: '99.2%', documents: 8947 },
    { language: 'Afrikaans', confidence: '97.8%', documents: 2156 },
    { language: 'Spanish', confidence: '98.1%', documents: 1834 },
    { language: 'French', confidence: '97.5%', documents: 1245 }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Eye className="w-5 h-5" />
            OCR Orchestration Agent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          {/* OCR Engines Status */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base">Active OCR Engines</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ocrEngines.map((engine, index) => (
                <div key={index} className="p-3 md:p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-xs md:text-sm">{engine.name}</h5>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {engine.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Accuracy: {engine.accuracy}</span>
                    <span>Speed: {engine.speed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Language Support */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base flex items-center gap-2">
              <Languages className="w-4 h-4" />
              Language Support
            </h4>
            <div className="space-y-2">
              {languageSupport.map((lang, index) => (
                <div key={index} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">{lang.language}</span>
                  </div>
                  <div className="text-right text-xs">
                    <div className="text-green-600 font-medium">{lang.confidence}</div>
                    <div className="text-gray-500">{lang.documents.toLocaleString()} docs</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Orchestration Settings
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Ensemble voting</span>
                <Badge variant="secondary">Enabled</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Auto language detection</span>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Confidence threshold</span>
                <Badge variant="secondary">85%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fallback engines</span>
                <Badge variant="secondary">3 configured</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OCROrchestrationAgent;
