
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Network, Database, Layers, GitBranch, 
  Users, Shield, BarChart, Zap,
  CheckCircle, AlertTriangle, Clock, TrendingUp
} from 'lucide-react';

const DataMeshManagementPanel = () => {
  const dataDomains = [
    {
      name: 'Customer Domain',
      owner: 'Customer Success Team',
      datasets: 12,
      quality: 98.5,
      status: 'healthy',
      description: 'Customer profiles, interactions, and lifecycle data'
    },
    {
      name: 'Network Domain',
      owner: 'Network Operations',
      datasets: 8,
      quality: 95.2,
      status: 'healthy',
      description: 'Network performance, capacity, and usage metrics'
    },
    {
      name: 'Billing Domain',
      owner: 'Finance Team',
      datasets: 15,
      quality: 99.1,
      status: 'healthy',
      description: 'Billing, payments, and revenue data'
    },
    {
      name: 'Product Domain',
      owner: 'Product Team',
      datasets: 6,
      quality: 96.8,
      status: 'warning',
      description: 'Product catalogs, pricing, and feature usage'
    },
    {
      name: 'Fraud Domain',
      owner: 'Risk Management',
      datasets: 4,
      quality: 99.8,
      status: 'healthy',
      description: 'Fraud detection patterns and risk scores'
    },
    {
      name: 'Marketing Domain',
      owner: 'Marketing Team',
      datasets: 9,
      quality: 94.3,
      status: 'warning',
      description: 'Campaign data, attribution, and customer journeys'
    }
  ];

  const dataProducts = [
    {
      name: 'Customer 360 API',
      domain: 'Customer Domain',
      consumers: 24,
      sla: '99.9%',
      latency: '12ms'
    },
    {
      name: 'Real-time Usage Stream',
      domain: 'Network Domain',
      consumers: 18,
      sla: '99.5%',
      latency: '8ms'
    },
    {
      name: 'Billing Events API',
      domain: 'Billing Domain',
      consumers: 15,
      sla: '99.8%',
      latency: '15ms'
    },
    {
      name: 'Fraud Score Service',
      domain: 'Fraud Domain',
      consumers: 12,
      sla: '99.9%',
      latency: '5ms'
    }
  ];

  const governanceMetrics = [
    { label: 'Data Domains', value: '6', trend: '+1' },
    { label: 'Data Products', value: '34', trend: '+8' },
    { label: 'Avg Quality Score', value: '97.1%', trend: '+2.3%' },
    { label: 'Active Consumers', value: '89', trend: '+12' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          Data Mesh Management Platform
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Decentralized data architecture with domain-driven ownership, federated governance, and self-service data products
        </p>
      </div>

      {/* Governance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {governanceMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
              <div className="text-xs text-green-600 font-medium">
                {metric.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="domains" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="domains">Data Domains</TabsTrigger>
          <TabsTrigger value="products">Data Products</TabsTrigger>
          <TabsTrigger value="lineage">Data Lineage</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
        </TabsList>

        <TabsContent value="domains" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dataDomains.map((domain, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-100 to-cyan-100 text-emerald-700">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{domain.name}</CardTitle>
                        <p className="text-sm text-gray-600">{domain.owner}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(domain.status)}>
                      {getStatusIcon(domain.status)}
                      {domain.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{domain.description}</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                      <div className="text-lg font-bold text-blue-700">{domain.datasets}</div>
                      <div className="text-xs text-blue-600">Datasets</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                      <div className="text-lg font-bold text-green-700">{domain.quality}%</div>
                      <div className="text-xs text-green-600">Quality</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                      <div className="text-lg font-bold text-purple-700">
                        <Users className="w-4 h-4 inline" />
                      </div>
                      <div className="text-xs text-purple-600">Team</div>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300">
                    Manage Domain
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="flex items-center gap-3">
                <Layers className="w-6 h-6 text-blue-600" />
                Data Products Catalog
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {dataProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700">
                        <BarChart className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.domain}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-900">{product.consumers}</div>
                        <div className="text-xs text-gray-600">Consumers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-green-700">{product.sla}</div>
                        <div className="text-xs text-gray-600">SLA</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-blue-700">{product.latency}</div>
                        <div className="text-xs text-gray-600">Latency</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lineage" className="space-y-6">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-3">
                <GitBranch className="w-6 h-6 text-purple-600" />
                Data Lineage Visualization
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 text-center">
                <Network className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Interactive Lineage Graph</h3>
                <p className="text-gray-600 mb-4">
                  Visualize data flow from source systems through transformations to consumption points
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                  Launch Lineage Explorer
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  Data Quality Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="font-medium">Completeness</span>
                    <span className="font-bold text-green-700">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <span className="font-medium">Accuracy</span>
                    <span className="font-bold text-blue-700">96.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <span className="font-medium">Consistency</span>
                    <span className="font-bold text-purple-700">97.8%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <span className="font-medium">Timeliness</span>
                    <span className="font-bold text-orange-700">94.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                  Usage Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <span className="font-medium">API Calls (24h)</span>
                    <span className="font-bold text-blue-700">1.2M</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="font-medium">Data Volume</span>
                    <span className="font-bold text-green-700">2.4TB</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <span className="font-medium">Processing Time</span>
                    <span className="font-bold text-purple-700">12ms</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <span className="font-medium">Error Rate</span>
                    <span className="font-bold text-orange-700">0.02%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataMeshManagementPanel;
