
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, FileText, Users, Calendar, MapPin, DollarSign, Settings } from 'lucide-react';

const ContextualUnderstandingAgent = () => {
  const documentTypes = [
    { type: 'Invoice', confidence: 98.9, elements: ['Amount', 'Date', 'Vendor', 'Items'], count: 3247 },
    { type: 'Contract', confidence: 97.2, elements: ['Parties', 'Terms', 'Signatures', 'Dates'], count: 1456 },
    { type: 'Receipt', confidence: 99.1, elements: ['Total', 'Items', 'Tax', 'Date'], count: 4823 },
    { type: 'Form', confidence: 96.8, elements: ['Fields', 'Checkboxes', 'Personal Info'], count: 2156 }
  ];

  const extractedElements = [
    { element: 'Contact Information', accuracy: 98.7, extracted: 15234, icon: <Users className="w-4 h-4" /> },
    { element: 'Dates & Times', accuracy: 99.2, extracted: 18947, icon: <Calendar className="w-4 h-4" /> },
    { element: 'Addresses', accuracy: 97.5, extracted: 12456, icon: <MapPin className="w-4 h-4" /> },
    { element: 'Monetary Values', accuracy: 99.8, extracted: 21847, icon: <DollarSign className="w-4 h-4" /> }
  ];

  const semanticRules = [
    { rule: 'Date format validation', status: 'active', success: '99.1%' },
    { rule: 'Currency normalization', status: 'active', success: '98.9%' },
    { rule: 'Address standardization', status: 'active', success: '97.2%' },
    { rule: 'Contact validation', status: 'active', success: '96.8%' }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Brain className="w-5 h-5" />
            Contextual Understanding Agent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          {/* Document Type Classification */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base">Document Classification</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {documentTypes.map((doc, index) => (
                <div key={index} className="p-3 md:p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <h5 className="font-medium text-sm">{doc.type}</h5>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {doc.confidence}%
                    </Badge>
                  </div>
                  <div className="mb-2">
                    <p className="text-xs text-gray-600">{doc.count.toLocaleString()} processed</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {doc.elements.map((element, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {element}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Element Extraction Performance */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base">Element Extraction Performance</h4>
            <div className="space-y-3">
              {extractedElements.map((element, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded">
                      {element.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{element.element}</p>
                      <p className="text-xs text-gray-500">{element.extracted.toLocaleString()} extracted</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600 text-sm">{element.accuracy}%</p>
                    <p className="text-xs text-gray-500">accuracy</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Rules */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Semantic Processing Rules
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {semanticRules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-2 md:p-3 border rounded">
                  <div>
                    <p className="font-medium text-xs md:text-sm">{rule.rule}</p>
                    <p className="text-xs text-gray-500">Success: {rule.success}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    {rule.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContextualUnderstandingAgent;
