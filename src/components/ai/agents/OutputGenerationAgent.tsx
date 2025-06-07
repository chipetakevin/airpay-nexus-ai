
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Database, Code, BarChart, Settings, CheckCircle } from 'lucide-react';

const OutputGenerationAgent = () => {
  const outputFormats = [
    { format: 'JSON', usage: '85%', size: '2.1KB avg', icon: <Code className="w-4 h-4" /> },
    { format: 'CSV/Excel', usage: '67%', size: '5.8KB avg', icon: <BarChart className="w-4 h-4" /> },
    { format: 'PDF Report', usage: '43%', size: '125KB avg', icon: <FileText className="w-4 h-4" /> },
    { format: 'Database Insert', usage: '92%', size: '1.5KB avg', icon: <Database className="w-4 h-4" /> }
  ];

  const recentOutputs = [
    { document: 'Invoice_2024_001.pdf', format: 'JSON', size: '2.3KB', status: 'completed', confidence: 99 },
    { document: 'Contract_Draft.jpg', format: 'CSV', size: '4.1KB', status: 'completed', confidence: 97 },
    { document: 'Receipt_Store.png', format: 'Database', size: '1.8KB', status: 'completed', confidence: 98 },
    { document: 'Form_Application.pdf', format: 'PDF', size: '87KB', status: 'processing', confidence: 96 }
  ];

  const qualityMetrics = [
    { metric: 'Structure Validation', score: 99.2, description: 'Proper JSON/XML structure' },
    { metric: 'Data Completeness', score: 98.7, description: 'All fields populated' },
    { metric: 'Format Compliance', score: 99.8, description: 'Standards adherence' },
    { metric: 'Audit Trail', score: 100, description: 'Processing history' }
  ];

  const transformationRules = [
    { rule: 'Currency normalization', status: 'active', applied: 8234 },
    { rule: 'Date format conversion', status: 'active', applied: 12456 },
    { rule: 'Address standardization', status: 'active', applied: 6789 },
    { rule: 'Contact formatting', status: 'active', applied: 9876 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 99) return 'text-green-600';
    if (score >= 97) return 'text-blue-600';
    if (score >= 95) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Download className="w-5 h-5" />
            Output Generation Agent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          {/* Output Formats */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base">Supported Output Formats</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {outputFormats.map((format, index) => (
                <div key={index} className="p-3 md:p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-blue-100 text-blue-600 rounded">
                        {format.icon}
                      </div>
                      <h5 className="font-medium text-sm">{format.format}</h5>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {format.usage} usage
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">Avg size: {format.size}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Outputs */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base">Recent Output Generation</h4>
            <div className="space-y-2">
              {recentOutputs.map((output, index) => (
                <div key={index} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{output.document}</p>
                      <p className="text-xs text-gray-500">{output.format} • {output.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-green-600">{output.confidence}%</span>
                    <Badge className={getStatusColor(output.status)} >
                      {output.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Metrics */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base">Output Quality Metrics</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {qualityMetrics.map((metric, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-sm">{metric.metric}</h5>
                    <span className={`font-bold text-sm ${getScoreColor(metric.score)}`}>
                      {metric.score}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Transformation Rules */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Active Transformation Rules
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {transformationRules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-2 md:p-3 border rounded">
                  <div>
                    <p className="font-medium text-xs md:text-sm">{rule.rule}</p>
                    <p className="text-xs text-gray-500">{rule.applied.toLocaleString()} applied</p>
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

export default OutputGenerationAgent;
