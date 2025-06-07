
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Database, Network, Smartphone, BarChart3, Users, Zap, 
  TrendingUp, AlertTriangle, CheckCircle, Clock, Globe,
  DollarSign, Activity, Shield, Settings
} from 'lucide-react';

const EnterpriseDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Simulated enterprise data
  const enterpriseData = {
    totalRevenue: 'R 45,892,347',
    activeAgents: 15247,
    dailyTransactions: 89423,
    networkUptime: '99.97%',
    bulkOperations: 2847,
    apiCalls: '1.2M',
    systemAlerts: 3,
    pendingSettlements: 'R 2,847,392'
  };

  const networkStats = [
    { name: 'MTN', status: 'operational', transactions: 32450, revenue: 'R 15,847,392' },
    { name: 'Vodacom', status: 'operational', transactions: 28934, revenue: 'R 12,934,847' },
    { name: 'Cell C', status: 'maintenance', transactions: 15432, revenue: 'R 8,493,847' },
    { name: 'Telkom', status: 'operational', transactions: 12607, revenue: 'R 8,616,261' }
  ];

  const agentTiers = [
    { tier: 'Super Agents', count: 247, commission: '8.5%', volume: 'R 18M+' },
    { tier: 'Premium Agents', count: 1847, commission: '6.5%', volume: 'R 5M-18M' },
    { tier: 'Standard Agents', count: 8934, commission: '4.5%', volume: 'R 1M-5M' },
    { tier: 'Basic Agents', count: 4219, commission: '2.5%', volume: 'Under R1M' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                <Database className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Devine Mobile Platform
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Enterprise-grade airtime and data distribution management system
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="text-2xl font-bold">{enterpriseData.totalRevenue}</div>
                <div className="text-sm text-blue-200">Total Revenue</div>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="text-2xl font-bold">{enterpriseData.activeAgents.toLocaleString()}</div>
                <div className="text-sm text-blue-200">Active Agents</div>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="text-2xl font-bold">{enterpriseData.dailyTransactions.toLocaleString()}</div>
                <div className="text-sm text-blue-200">Daily Transactions</div>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="text-2xl font-bold">{enterpriseData.networkUptime}</div>
                <div className="text-sm text-blue-200">Network Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-12">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-2xl mx-auto">
            {[
              { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'networks', label: 'Networks', icon: <Globe className="w-4 h-4" /> },
              { id: 'agents', label: 'Agents', icon: <Users className="w-4 h-4" /> },
              { id: 'operations', label: 'Operations', icon: <Activity className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedMetric(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedMetric === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {selectedMetric === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Bulk Operations</p>
                      <p className="text-2xl font-bold text-gray-900">{enterpriseData.bulkOperations}</p>
                      <p className="text-sm text-green-600">↑ 24% from last month</p>
                    </div>
                    <Smartphone className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">API Calls</p>
                      <p className="text-2xl font-bold text-gray-900">{enterpriseData.apiCalls}</p>
                      <p className="text-sm text-blue-600">Last 24 hours</p>
                    </div>
                    <Network className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">System Alerts</p>
                      <p className="text-2xl font-bold text-orange-600">{enterpriseData.systemAlerts}</p>
                      <p className="text-sm text-orange-600">Requires attention</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Settlements</p>
                      <p className="text-2xl font-bold text-gray-900">{enterpriseData.pendingSettlements}</p>
                      <p className="text-sm text-purple-600">Processing</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enterprise Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Database className="w-6 h-6 text-blue-600" />
                    Electronic Voucher Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Advanced EVD system for managing and distributing electronic vouchers across multiple networks.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Real-time voucher generation</li>
                    <li>• Multi-network aggregation</li>
                    <li>• Automated settlement</li>
                    <li>• Fraud detection & prevention</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Network className="w-6 h-6 text-green-600" />
                    Wholesale Aggregation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Enterprise-level wholesale aggregation with direct network integration and bulk pricing.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Direct network APIs</li>
                    <li>• Volume-based pricing</li>
                    <li>• Instant provisioning</li>
                    <li>• 24/7 monitoring</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-purple-600" />
                    Enterprise Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Bank-grade security with advanced authentication and compliance management.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Multi-factor authentication</li>
                    <li>• Role-based access control</li>
                    <li>• Audit trails & compliance</li>
                    <li>• Data encryption</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Networks Tab */}
        {selectedMetric === 'networks' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {networkStats.map((network, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          network.status === 'operational' ? 'bg-green-500' : 
                          network.status === 'maintenance' ? 'bg-orange-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{network.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">{network.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{network.revenue}</p>
                        <p className="text-sm text-gray-600">{network.transactions.toLocaleString()} transactions</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Agents Tab */}
        {selectedMetric === 'agents' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Network Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentTiers.map((tier, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Users className="w-8 h-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{tier.tier}</h4>
                          <p className="text-sm text-gray-600">{tier.count.toLocaleString()} agents</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{tier.commission} commission</p>
                        <p className="text-sm text-gray-600">{tier.volume} volume</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Operations Tab */}
        {selectedMetric === 'operations' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bulk Operations Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Completed Today</span>
                      <span className="font-medium">2,847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">In Progress</span>
                      <span className="font-medium text-blue-600">126</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Failed Operations</span>
                      <span className="font-medium text-red-600">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-medium text-green-600">99.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">API Response Time</span>
                      <span className="font-medium text-green-600">143ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Database Performance</span>
                      <span className="font-medium text-green-600">Optimal</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Queue Processing</span>
                      <span className="font-medium text-blue-600">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Last Backup</span>
                      <span className="font-medium">2 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterpriseDashboard;
