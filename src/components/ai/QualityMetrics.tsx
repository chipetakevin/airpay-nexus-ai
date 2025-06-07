
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, TrendingUp, CheckCircle, AlertTriangle,
  Target, Zap, Shield, Activity
} from 'lucide-react';

const QualityMetrics = () => {
  const qualityStages = [
    {
      stage: 'Initial Extraction',
      accuracy: 97.2,
      completeness: 98.5,
      speed: '1.2s',
      confidence: 94.8,
      status: 'excellent'
    },
    {
      stage: 'Cross-Validation',
      accuracy: 98.7,
      completeness: 99.1,
      speed: '0.8s',
      confidence: 97.2,
      status: 'excellent'
    },
    {
      stage: 'Semantic Validation',
      accuracy: 99.1,
      completeness: 99.4,
      speed: '1.5s',
      confidence: 98.1,
      status: 'excellent'
    },
    {
      stage: 'Enhancement',
      accuracy: 99.3,
      completeness: 99.7,
      speed: '0.6s',
      confidence: 98.9,
      status: 'excellent'
    }
  ];

  const documentTypes = [
    { type: 'Invoices', processed: 4823, accuracy: 99.1, avgTime: '2.1s' },
    { type: 'Contracts', processed: 2156, accuracy: 98.7, avgTime: '3.2s' },
    { type: 'Forms', processed: 3947, accuracy: 99.4, avgTime: '1.8s' },
    { type: 'Receipts', processed: 5621, accuracy: 98.9, avgTime: '1.5s' },
    { type: 'ID Documents', processed: 1832, accuracy: 99.8, avgTime: '2.4s' },
    { type: 'Handwritten', processed: 967, accuracy: 96.2, avgTime: '4.1s' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 99) return 'text-green-600';
    if (accuracy >= 97) return 'text-blue-600';
    if (accuracy >= 95) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Quality Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Quality Assurance Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {qualityStages.map((stage, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Stage {index + 1}: {stage.stage}</h4>
                  <Badge className={getStatusColor(stage.status)}>
                    {stage.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Accuracy</p>
                    <p className={`text-lg font-bold ${getAccuracyColor(stage.accuracy)}`}>
                      {stage.accuracy}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Completeness</p>
                    <p className={`text-lg font-bold ${getAccuracyColor(stage.completeness)}`}>
                      {stage.completeness}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Speed</p>
                    <p className="text-lg font-bold text-blue-600">{stage.speed}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Confidence</p>
                    <p className={`text-lg font-bold ${getAccuracyColor(stage.confidence)}`}>
                      {stage.confidence}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Type Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            Performance by Document Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documentTypes.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className={`w-4 h-4 ${getAccuracyColor(doc.accuracy)}`} />
                  <div>
                    <p className="font-medium text-gray-900">{doc.type}</p>
                    <p className="text-sm text-gray-500">{doc.processed.toLocaleString()} processed</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <p className={`font-medium ${getAccuracyColor(doc.accuracy)}`}>
                      {doc.accuracy}%
                    </p>
                    <p className="text-xs text-gray-500">accuracy</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-600">{doc.avgTime}</p>
                    <p className="text-xs text-gray-500">avg time</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Quality Monitoring */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Real-time Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current Load</span>
                <span className="font-medium text-blue-600">73%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Queue Length</span>
                <span className="font-medium">24 docs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Error Rate</span>
                <span className="font-medium text-green-600">0.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Avg Response</span>
                <span className="font-medium text-blue-600">2.1s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Encryption</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">GDPR Compliant</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Audit Trail</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Data Retention</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">7-day Accuracy</span>
                <span className="font-medium text-green-600">↑ 0.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Processing Speed</span>
                <span className="font-medium text-blue-600">↑ 15%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Error Reduction</span>
                <span className="font-medium text-green-600">↓ 45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Throughput</span>
                <span className="font-medium text-blue-600">↑ 28%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QualityMetrics;
