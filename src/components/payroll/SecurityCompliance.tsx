
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock, 
  Key, 
  CheckCircle,
  AlertTriangle,
  Database,
  Cloud,
  UserCheck
} from 'lucide-react';

const SecurityCompliance = () => {
  const securityFeatures = [
    {
      title: 'POPIA Compliance',
      description: 'Full compliance with Protection of Personal Information Act',
      status: 'Active',
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: 'Data Encryption',
      description: 'End-to-end encryption for all sensitive payroll data',
      status: 'Active',
      icon: <Lock className="w-5 h-5" />
    },
    {
      title: 'Access Controls',
      description: 'Role-based access with multi-factor authentication',
      status: 'Active',
      icon: <Key className="w-5 h-5" />
    },
    {
      title: 'Audit Trails',
      description: 'Comprehensive logging of all system activities',
      status: 'Active',
      icon: <Database className="w-5 h-5" />
    },
    {
      title: 'Automated Backups',
      description: 'Daily automated backups with disaster recovery',
      status: 'Active',
      icon: <Cloud className="w-5 h-5" />
    },
    {
      title: 'User Management',
      description: 'Granular user permissions and session management',
      status: 'Active',
      icon: <UserCheck className="w-5 h-5" />
    }
  ];

  const complianceChecks = [
    { item: 'Data Protection Impact Assessment', status: 'Completed', date: '15 Dec 2024' },
    { item: 'Security Penetration Testing', status: 'Completed', date: '10 Jan 2025' },
    { item: 'POPIA Compliance Audit', status: 'Scheduled', date: '30 Jan 2025' },
    { item: 'Backup Recovery Testing', status: 'Completed', date: '05 Jan 2025' }
  ];

  const accessLogs = [
    { user: 'Sarah Johnson (HR Manager)', action: 'Viewed employee records', time: '10:30 AM', ip: '192.168.1.45' },
    { user: 'Admin System', action: 'Automated backup completed', time: '02:00 AM', ip: 'System' },
    { user: 'Thabo Mthembu (Payroll)', action: 'Generated payslips', time: 'Yesterday 4:15 PM', ip: '192.168.1.23' },
    { user: 'Finance Team', action: 'Downloaded compliance report', time: 'Yesterday 2:30 PM', ip: '192.168.1.67' }
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Security & Compliance</h2>
          <p className="text-gray-600 text-sm">POPIA compliance and data protection features</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Shield className="w-4 h-4 mr-2" />
          Security Audit
        </Button>
      </div>

      {/* Security Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {securityFeatures.map((feature, index) => (
          <Card key={index} className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="text-green-600">
                    {feature.icon}
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {feature.status}
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceChecks.map((check, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3">
                <div>
                  <h4 className="font-medium text-gray-900">{check.item}</h4>
                  <p className="text-sm text-gray-600">{check.date}</p>
                </div>
                <Badge 
                  className={
                    check.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    check.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }
                >
                  {check.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Access Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            Recent Access Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {accessLogs.map((log, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900 text-sm">{log.user}</h4>
                  <p className="text-sm text-gray-600">{log.action}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-xs text-gray-500">{log.time}</p>
                  <p className="text-xs text-gray-400">{log.ip}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Protection Summary */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-600" />
            POPIA Data Protection Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Implemented Controls</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Data subject consent management</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Right to data portability</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Data breach notification procedures</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Privacy by design implementation</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Security Measures</h4>
              <div className="space-y-3">
                <div className="p-3 bg-white/60 rounded-lg">
                  <h5 className="font-medium text-gray-900">Encryption Level</h5>
                  <p className="text-sm text-gray-600">AES-256 encryption for data at rest and in transit</p>
                </div>
                <div className="p-3 bg-white/60 rounded-lg">
                  <h5 className="font-medium text-gray-900">Backup Schedule</h5>
                  <p className="text-sm text-gray-600">Daily backups with 30-day retention policy</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityCompliance;
