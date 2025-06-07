
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, MapPin, Phone, Calendar, Globe, CheckCircle, Settings } from 'lucide-react';

const DataEnrichmentAgent = () => {
  const enrichmentServices = [
    { service: 'Address Validation', status: 'active', success: '98.2%', processed: 12456, icon: <MapPin className="w-4 h-4" /> },
    { service: 'Phone Formatting', status: 'active', success: '99.7%', processed: 8234, icon: <Phone className="w-4 h-4" /> },
    { service: 'Date Standardization', status: 'active', success: '99.1%', processed: 15678, icon: <Calendar className="w-4 h-4" /> },
    { service: 'Geographic Data', status: 'active', success: '97.8%', processed: 9845, icon: <Globe className="w-4 h-4" /> }
  ];

  const formatStandards = [
    { format: 'South African Phone', pattern: '+27 XX XXX XXXX', success: '99.8%' },
    { format: 'SA Postal Codes', pattern: 'XXXX', success: '98.9%' },
    { format: 'Date ISO 8601', pattern: 'YYYY-MM-DD', success: '99.5%' },
    { format: 'Currency ZAR', pattern: 'R X,XXX.XX', success: '99.2%' }
  ];

  const recentEnrichments = [
    { field: 'Phone Number', original: '0832466539', enriched: '+27 83 246 6539', confidence: 99 },
    { field: 'Address', original: 'Cape Town', enriched: 'Cape Town, Western Cape, 8001', confidence: 97 },
    { field: 'Date', original: '15/06/2024', enriched: '2024-06-15', confidence: 100 },
    { field: 'Currency', original: '1500', enriched: 'R 1,500.00', confidence: 98 }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 99) return 'text-green-600';
    if (confidence >= 97) return 'text-blue-600';
    if (confidence >= 95) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Sparkles className="w-5 h-5" />
            Data Enrichment Agent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          {/* Enrichment Services */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base">Active Enrichment Services</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {enrichmentServices.map((service, index) => (
                <div key={index} className="p-3 md:p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-blue-100 text-blue-600 rounded">
                        {service.icon}
                      </div>
                      <h5 className="font-medium text-sm">{service.service}</h5>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {service.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-gray-600">Success Rate</p>
                      <p className="font-medium text-green-600">{service.success}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Processed</p>
                      <p className="font-medium">{service.processed.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Format Standards */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base">Standardization Formats</h4>
            <div className="space-y-2">
              {formatStandards.map((format, index) => (
                <div key={index} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-sm">{format.format}</p>
                    <p className="text-xs text-gray-600 font-mono">{format.pattern}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600 text-sm">{format.success}</p>
                    <p className="text-xs text-gray-500">success</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Enrichments */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base">Recent Enrichments</h4>
            <div className="space-y-3">
              {recentEnrichments.map((enrichment, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{enrichment.field}</span>
                    <Badge variant="secondary" className="text-xs">
                      {enrichment.confidence}% confidence
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs">
                      <span className="text-gray-600">Original: </span>
                      <span className="font-mono bg-red-50 px-1 rounded">{enrichment.original}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-gray-600">Enriched: </span>
                      <span className="font-mono bg-green-50 px-1 rounded">{enrichment.enriched}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Enrichment Configuration
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Auto-enhancement</span>
                <Badge variant="secondary">Enabled</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quality threshold</span>
                <Badge variant="secondary">95%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">External APIs</span>
                <Badge variant="secondary">4 active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Batch processing</span>
                <Badge variant="secondary">100 concurrent</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataEnrichmentAgent;
