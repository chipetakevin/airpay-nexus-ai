import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollCollapse } from '@/hooks/useScrollCollapse';
import { useDashboardData } from '@/hooks/useDashboardData';
import BalanceOverviewSection from './sections/BalanceOverviewSection';
import TabNavigationSection from './sections/TabNavigationSection';
import CustomerProfileSection from './sections/CustomerProfileSection';
import VendorProfileSection from './sections/VendorProfileSection';
import AdminProfileSection from './sections/AdminProfileSection';
import DataExtractionCenter from './sections/DataExtractionCenter';

const DashboardManager = () => {
  const [activeMainTab, setActiveMainTab] = useState('overview');
  const [activeDataTab, setActiveDataTab] = useState('sim-data');
  
  const { customerData, vendorData, adminData, balances } = useDashboardData();
  const {
    isBalancesCollapsed,
    setIsBalancesCollapsed,
    isCustomerProfileCollapsed,
    setIsCustomerProfileCollapsed,
    isVendorProfileCollapsed,
    setIsVendorProfileCollapsed
  } = useScrollCollapse();

  const mainTabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: '📊',
      description: 'System Overview'
    },
    { 
      id: 'customer-intelligence', 
      label: 'Customer Intelligence', 
      icon: '👥',
      description: 'Intelligent Customer Management'
    },
    { 
      id: 'subscriber-management', 
      label: 'Subscriber Management', 
      icon: '👤',
      description: 'Comprehensive Subscriber Management'
    },
    { 
      id: 'agentic-workflows', 
      label: 'Agentic Workflows', 
      icon: '⚡',
      description: 'Autonomous Workflow Center'
    },
    { 
      id: 'bulk-operations', 
      label: 'Bulk Operations', 
      icon: '📦',
      description: 'Intelligent Bulk Operations'
    },
    { 
      id: 'bulk-services', 
      label: 'Bulk Services', 
      icon: '📋',
      description: 'Bulk Service Operations'
    },
    { 
      id: 'financial-hub', 
      label: 'Financial Hub', 
      icon: '💰',
      description: 'Financial Management Center'
    },
    { 
      id: 'address-management', 
      label: 'Address Management', 
      icon: '📍',
      description: 'Address & Contact System'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: '📈',
      description: 'Predictive Analytics'
    },
    { 
      id: 'template-manager', 
      label: 'Template Manager', 
      icon: '📄',
      description: 'Download & configure templates'
    },
    { 
      id: 'performance-analytics', 
      label: 'Performance Analytics', 
      icon: '📊',
      description: 'Performance metrics'
    },
    { 
      id: 'processing', 
      label: 'Processing', 
      icon: '🔄',
      description: 'Monitor operations'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: '⚡',
      description: 'Configure parameters'
    }
  ];

  const renderTabContent = () => {
    switch (activeMainTab) {
      case 'overview':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">📊</span>
                System Overview
              </CardTitle>
              <p className="text-muted-foreground">Real-time dashboard with system health, KPIs, and operational alerts</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg border">
                  <h4 className="font-semibold text-primary mb-2">System Health</h4>
                  <p className="text-2xl font-bold text-green-600">99.9%</p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border">
                  <h4 className="font-semibold text-primary mb-2">Active Subscribers</h4>
                  <p className="text-2xl font-bold">24,581</p>
                  <p className="text-sm text-muted-foreground">+5.2% this month</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border">
                  <h4 className="font-semibold text-primary mb-2">Revenue</h4>
                  <p className="text-2xl font-bold">R2.4M</p>
                  <p className="text-sm text-muted-foreground">This quarter</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'customer-intelligence':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">👥</span>
                Customer Intelligence
              </CardTitle>
              <p className="text-muted-foreground">Advanced customer management using intelligent analytics</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">AI-Driven Insights</h4>
                  <p className="text-sm text-muted-foreground">Customer segmentation, churn prediction, and personalized engagement</p>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">360° Customer View</h4>
                  <p className="text-sm text-muted-foreground">Unified profiles with interaction history and preferences</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'subscriber-management':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">👤</span>
                Subscriber Management
              </CardTitle>
              <p className="text-muted-foreground">Comprehensive lifecycle management for subscribers</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Mobile Onboarding</h4>
                  <p className="text-sm text-muted-foreground">KYC workflows and SIM provisioning automation</p>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Real-time Monitoring</h4>
                  <p className="text-sm text-muted-foreground">Usage tracking and alert management</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'agentic-workflows':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                Agentic Workflows
              </CardTitle>
              <p className="text-muted-foreground">Autonomous workflow center for process automation</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Workflow Builder</h4>
                  <p className="text-sm text-muted-foreground">Drag-and-drop interface for creating automated processes</p>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">AI Triggers</h4>
                  <p className="text-sm text-muted-foreground">Intelligent automation with machine learning</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'bulk-operations':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">📦</span>
                Bulk Operations
              </CardTitle>
              <p className="text-muted-foreground">Efficient handling of mass actions for operational scalability</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Batch Processing</h4>
                  <p className="text-sm text-muted-foreground">Import/export subscribers and services in bulk</p>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Audit Trails</h4>
                  <p className="text-sm text-muted-foreground">Complete tracking for compliance and monitoring</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'bulk-services':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">📋</span>
                Bulk Services
              </CardTitle>
              <p className="text-muted-foreground">Management of large-scale service operations</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Group Management</h4>
                  <p className="text-sm text-muted-foreground">Service assignment and management by groups</p>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Scheduled Actions</h4>
                  <p className="text-sm text-muted-foreground">Recurring and scheduled bulk operations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'financial-hub':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">💰</span>
                Financial Hub
              </CardTitle>
              <p className="text-muted-foreground">Centralized financial management for MVNE operations</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <BalanceOverviewSection 
                  balances={balances}
                  isCollapsed={isBalancesCollapsed}
                  onToggleCollapse={setIsBalancesCollapsed}
                />
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Revenue Analytics</h4>
                  <p className="text-sm text-muted-foreground">Real-time financial dashboards and forecasting</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'address-management':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">📍</span>
                Address Management
              </CardTitle>
              <p className="text-muted-foreground">Robust system for managing addresses and contacts</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">✨ Active Feature</h4>
                  <p className="text-sm text-muted-foreground">Mobile-friendly address forms with geolocation integration</p>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Data Validation</h4>
                  <p className="text-sm text-muted-foreground">Duplicate detection and address verification</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'analytics':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">📈</span>
                Analytics
              </CardTitle>
              <p className="text-muted-foreground">Predictive analytics to drive business decisions</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Machine Learning Models</h4>
                  <p className="text-sm text-muted-foreground">Trend prediction and behavioral analysis</p>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Real-time Visualization</h4>
                  <p className="text-sm text-muted-foreground">Interactive dashboards and custom reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'template-manager':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">📄</span>
                Template Manager
              </CardTitle>
              <p className="text-muted-foreground">Download & configure templates</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-700 mb-2">Document Templates</h4>
                  <p className="text-sm text-muted-foreground mb-3">Pre-configured templates for contracts, invoices, and reports</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Download Contract Template
                    </button>
                    <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Download Invoice Template
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Configuration Templates</h4>
                  <p className="text-sm text-muted-foreground">System and service configuration templates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'performance-analytics':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">📊</span>
                Performance Analytics
              </CardTitle>
              <p className="text-muted-foreground">Performance metrics</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-700 mb-1">Response Time</h4>
                    <p className="text-2xl font-bold text-green-600">142ms</p>
                    <p className="text-sm text-muted-foreground">Avg API response</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-700 mb-1">Throughput</h4>
                    <p className="text-2xl font-bold text-orange-600">1,247</p>
                    <p className="text-sm text-muted-foreground">Requests/min</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-700 mb-1">Success Rate</h4>
                    <p className="text-2xl font-bold text-purple-600">99.8%</p>
                    <p className="text-sm text-muted-foreground">Error-free</p>
                  </div>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Performance Monitoring</h4>
                  <p className="text-sm text-muted-foreground">Real-time system performance tracking and alerting</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'processing':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">🔄</span>
                Processing
              </CardTitle>
              <p className="text-muted-foreground">Monitor operations</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-700 mb-2">Active Operations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm">Bulk SIM Provisioning</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Running</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm">Customer Data Export</span>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Queued</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm">Report Generation</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Completed</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Processing Queue</h4>
                  <p className="text-sm text-muted-foreground">Monitor and manage background operations and tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                Settings
              </CardTitle>
              <p className="text-muted-foreground">Configure parameters</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-700 mb-2">System Configuration</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Rate Limiting</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-scaling</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Backup Schedule</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Daily 2AM</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Network Parameters</h4>
                  <p className="text-sm text-muted-foreground">Configure network settings, thresholds, and operational parameters</p>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Security Settings</h4>
                  <p className="text-sm text-muted-foreground">Authentication, authorization, and access control configuration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Select a feature from the navigation above to get started.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold">Addex Hub Platform</h3>
        <p className="text-muted-foreground">Mobile Virtual Network Enabler - Comprehensive MVNE Management</p>
      </div>

      {/* MVNE Tab Navigation */}
      <div className="w-full">
        <TabNavigationSection 
          tabs={mainTabs}
          activeTab={activeMainTab}
          onTabChange={setActiveMainTab}
        />

        {/* Tab Content */}
        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardManager;