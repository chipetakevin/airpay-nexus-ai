
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, Lock, Key, UserCheck, AlertTriangle, 
  CheckCircle, Eye, Fingerprint, Smartphone, 
  Globe, Users, Activity, Settings
} from 'lucide-react';

const BaaSSecurityPanel = () => {
  const [activeSecurityModule, setActiveSecurityModule] = useState('auth');

  const securityModules = [
    {
      id: 'auth',
      name: 'Authentication & MFA',
      status: 'active',
      users: '45,892',
      sessions: '12,847',
      mfaEnabled: '87%',
      icon: <UserCheck className="w-5 h-5" />
    },
    {
      id: 'rbac',
      name: 'Role-Based Access Control',
      status: 'active',
      roles: '24',
      permissions: '156',
      policies: '89',
      icon: <Key className="w-5 h-5" />
    },
    {
      id: 'encryption',
      name: 'Data Encryption',
      status: 'active',
      encrypted: '100%',
      algorithm: 'AES-256',
      certificates: '12',
      icon: <Lock className="w-5 h-5" />
    },
    {
      id: 'fraud',
      name: 'Fraud Detection',
      status: 'monitoring',
      threats: '0 active',
      blocked: '247 today',
      accuracy: '99.7%',
      icon: <Shield className="w-5 h-5" />
    }
  ];

  const securityMetrics = [
    { label: 'Security Score', value: '98/100', status: 'excellent', icon: <Shield className="w-4 h-4" /> },
    { label: 'Failed Logins', value: '0.02%', status: 'good', icon: <AlertTriangle className="w-4 h-4" /> },
    { label: 'MFA Adoption', value: '87%', status: 'good', icon: <Fingerprint className="w-4 h-4" /> },
    { label: 'API Threats', value: '0 active', status: 'excellent', icon: <Eye className="w-4 h-4" /> }
  ];

  const authenticationMethods = [
    { method: 'Email/Password', users: '32,145', enabled: true },
    { method: 'SMS OTP', users: '28,947', enabled: true },
    { method: 'Google OAuth', users: '15,284', enabled: true },
    { method: 'Apple ID', users: '8,156', enabled: true },
    { method: 'Biometric', users: '12,847', enabled: true },
    { method: 'Hardware Keys', users: '2,456', enabled: false }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${getStatusColor(metric.status)}`}>
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{metric.label}</p>
                    <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  metric.status === 'excellent' ? 'bg-green-500' :
                  metric.status === 'good' ? 'bg-blue-500' :
                  metric.status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
                }`}></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {securityModules.map((module) => (
          <Card 
            key={module.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              activeSecurityModule === module.id ? 'ring-2 ring-green-500 shadow-lg' : ''
            }`}
            onClick={() => setActiveSecurityModule(module.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg text-green-600">
                    {module.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      module.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      <CheckCircle className="w-3 h-3" />
                      <span className="capitalize">{module.status}</span>
                    </div>
                  </div>
                </div>
                <Settings className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4">
                {module.id === 'auth' && (
                  <>
                    <div>
                      <p className="text-xs text-gray-600">Active Users</p>
                      <p className="text-sm font-semibold">{module.users}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Active Sessions</p>
                      <p className="text-sm font-semibold">{module.sessions}</p>
                    </div>
                  </>
                )}
                {module.id === 'rbac' && (
                  <>
                    <div>
                      <p className="text-xs text-gray-600">Roles</p>
                      <p className="text-sm font-semibold">{module.roles}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Permissions</p>
                      <p className="text-sm font-semibold">{module.permissions}</p>
                    </div>
                  </>
                )}
                {module.id === 'encryption' && (
                  <>
                    <div>
                      <p className="text-xs text-gray-600">Data Encrypted</p>
                      <p className="text-sm font-semibold">{module.encrypted}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Algorithm</p>
                      <p className="text-sm font-semibold">{module.algorithm}</p>
                    </div>
                  </>
                )}
                {module.id === 'fraud' && (
                  <>
                    <div>
                      <p className="text-xs text-gray-600">Active Threats</p>
                      <p className="text-sm font-semibold">{module.threats}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Blocked Today</p>
                      <p className="text-sm font-semibold">{module.blocked}</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Authentication Methods Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5" />
            Authentication Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {authenticationMethods.map((method, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${method.enabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{method.method}</p>
                    <p className="text-xs text-gray-600">{method.users} users</p>
                  </div>
                </div>
                <button className={`text-xs px-2 py-1 rounded ${
                  method.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {method.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Audit & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Security Audit Trail
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: '2 minutes ago', event: 'Admin role assigned to user admin@divinemobile.co.za', status: 'info' },
                { time: '15 minutes ago', event: 'Failed login attempt blocked from suspicious IP', status: 'warning' },
                { time: '1 hour ago', event: 'MFA enabled for 15 new users', status: 'success' },
                { time: '3 hours ago', event: 'API rate limit exceeded for client app-mobile', status: 'warning' },
                { time: '6 hours ago', event: 'Database backup completed successfully', status: 'success' }
              ].map((entry, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    entry.status === 'success' ? 'bg-green-500' :
                    entry.status === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{entry.event}</p>
                    <p className="text-xs text-gray-600">{entry.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { standard: 'PCI DSS', status: 'compliant', level: 'Level 1' },
                { standard: 'GDPR', status: 'compliant', level: 'Full Compliance' },
                { standard: 'SOC 2 Type II', status: 'compliant', level: 'Certified' },
                { standard: 'ISO 27001', status: 'pending', level: 'In Progress' },
                { standard: 'HIPAA', status: 'compliant', level: 'Business Associate' }
              ].map((compliance, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      compliance.status === 'compliant' ? 'bg-green-500' : 'bg-orange-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{compliance.standard}</p>
                      <p className="text-xs text-gray-600">{compliance.level}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    compliance.status === 'compliant' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {compliance.status === 'compliant' ? 'Compliant' : 'In Progress'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BaaSSecurityPanel;
