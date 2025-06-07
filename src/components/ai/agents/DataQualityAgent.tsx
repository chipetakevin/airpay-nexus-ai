
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, AlertTriangle, Target, TrendingUp } from 'lucide-react';

const DataQualityAgent = () => {
  const qualityChecks = [
    { check: 'Completeness', score: 98.7, status: 'excellent', description: 'All visible text captured' },
    { check: 'Accuracy', score: 99.2, status: 'excellent', description: 'Cross-validated results' },
    { check: 'Consistency', score: 97.5, status: 'good', description: 'Format standardization' },
    { check: 'Integrity', score: 99.8, status: 'excellent', description: 'Structure validation' }
  ];

  const recentValidations = [
    { document: 'Invoice_2024_001.pdf', score: 99.1, issues: 0, time: '2 mins ago' },
    { document: 'Contract_Draft.jpg', score: 97.8, issues: 1, time: '5 mins ago' },
    { document: 'Receipt_Store.png', score: 98.9, issues: 0, time: '8 mins ago' },
    { document: 'Form_Application.pdf', score: 96.5, issues: 2, time: '12 mins ago' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 99) return 'text-green-600';
    if (score >= 97) return 'text-blue-600';
    if (score >= 95) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Shield className="w-5 h-5" />
            Data Quality Assurance Agent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          {/* Quality Metrics */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base">Quality Assessment Pipeline</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {qualityChecks.map((check, index) => (
                <div key={index} className="p-3 md:p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-sm">{check.check}</h5>
                    <Badge className={getStatusColor(check.status)}>
                      {check.status}
                    </Badge>
                  </div>
                  <div className="mb-2">
                    <span className={`text-lg md:text-xl font-bold ${getScoreColor(check.score)}`}>
                      {check.score}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{check.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Validations */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base flex items-center gap-2">
              <Target className="w-4 h-4" />
              Recent Quality Validations
            </h4>
            <div className="space-y-2">
              {recentValidations.map((validation, index) => (
                <div key={index} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {validation.issues === 0 ? (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{validation.document}</p>
                      <p className="text-xs text-gray-500">{validation.time}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className={`text-sm font-medium ${getScoreColor(validation.score)}`}>
                      {validation.score}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {validation.issues} issues
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Trends */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Quality Trends (7 days)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-gray-600">Avg Quality</p>
                <p className="text-lg font-bold text-green-600">98.4%</p>
                <p className="text-xs text-green-500">↑ 0.3%</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600">Success Rate</p>
                <p className="text-lg font-bold text-blue-600">99.7%</p>
                <p className="text-xs text-blue-500">↑ 0.1%</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-gray-600">Issues Found</p>
                <p className="text-lg font-bold text-purple-600">23</p>
                <p className="text-xs text-purple-500">↓ 45%</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-xs text-gray-600">Avg Time</p>
                <p className="text-lg font-bold text-orange-600">1.8s</p>
                <p className="text-xs text-orange-500">↓ 0.2s</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataQualityAgent;
