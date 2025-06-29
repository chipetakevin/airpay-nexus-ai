
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Upload,
  Calendar,
  Calculator
} from 'lucide-react';

const StatutoryCompliance = () => {
  const complianceItems = [
    {
      title: 'PAYE Calculations',
      status: 'Current',
      description: 'Automated PAYE calculations with latest tax tables',
      dueDate: 'Ongoing',
      action: 'View Report'
    },
    {
      title: 'UIF Contributions',
      status: 'Current',
      description: 'Unemployment Insurance Fund contributions calculated',
      dueDate: 'Monthly',
      action: 'Download'
    },
    {
      title: 'SDL Payments',
      status: 'Current',
      description: 'Skills Development Levy calculations',
      dueDate: 'Monthly',
      action: 'View Details'
    },
    {
      title: 'EMP201 Filing',
      status: 'Due Soon',
      description: 'Monthly employer reconciliation due to SARS',
      dueDate: '7th of next month',
      action: 'File Now'
    },
    {
      title: 'EMP501 Filing',
      status: 'Current',
      description: 'Bi-annual employer reconciliation',
      dueDate: 'Sept 30 / March 31',
      action: 'Prepare'
    },
    {
      title: 'IRP5 Certificates',
      status: 'Current',
      description: 'Employee tax certificates for tax year',
      dueDate: 'March 31',
      action: 'Generate'
    }
  ];

  const taxTables = [
    { table: 'PAYE Tax Tables', version: '2024/25', lastUpdated: '1 March 2024', status: 'Current' },
    { table: 'UIF Rates', version: '2024', lastUpdated: '1 April 2024', status: 'Current' },
    { table: 'SDL Rates', version: '2024', lastUpdated: '1 April 2024', status: 'Current' },
    { table: 'ETI Rates', version: '2024', lastUpdated: '1 March 2024', status: 'Current' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current':
        return 'bg-green-100 text-green-800';
      case 'Due Soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Current':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Due Soon':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'Overdue':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Statutory Compliance</h2>
          <p className="text-gray-600 text-sm">SARS compliance and statutory requirements</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          File All Due
        </Button>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complianceItems.map((item, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600">{item.description}</p>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    Due: {item.dueDate}
                  </div>
                  <Button size="sm" variant="outline">
                    {item.action}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tax Tables Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-600" />
            Tax Tables & Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taxTables.map((table, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">{table.table}</h4>
                  <p className="text-sm text-gray-600">Version {table.version} • Updated {table.lastUpdated}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-800">
                    {table.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* e@syFile Integration */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            SARS e@syFile Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Automated Filing Features</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Direct EMP201 submission</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Automated IRP5 generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Real-time validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Submission confirmations</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Next Filing Dates</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
                  <span className="text-sm font-medium">EMP201 - January 2025</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Due 7 Feb</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
                  <span className="text-sm font-medium">IRP5 Certificates</span>
                  <Badge className="bg-green-100 text-green-800">Ready</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatutoryCompliance;
