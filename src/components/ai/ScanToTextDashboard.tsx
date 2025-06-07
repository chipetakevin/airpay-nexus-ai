
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ScanText, Camera, FileText, BarChart, 
  Settings, Upload, Eye, CheckCircle,
  TrendingUp, Zap, Shield, Activity
} from 'lucide-react';

// Import agent components
import ImageProcessingAgent from './agents/ImageProcessingAgent';
import OCROrchestrationAgent from './agents/OCROrchestrationAgent';
import DataQualityAgent from './agents/DataQualityAgent';
import ContextualUnderstandingAgent from './agents/ContextualUnderstandingAgent';
import DataEnrichmentAgent from './agents/DataEnrichmentAgent';
import OutputGenerationAgent from './agents/OutputGenerationAgent';
import ProcessingDashboard from './ProcessingDashboard';
import QualityMetrics from './QualityMetrics';

const ScanToTextDashboard = () => {
  const [activeTab, setActiveTab] = useState('processing');

  const systemMetrics = [
    {
      label: 'Documents Processed',
      value: '15,847',
      change: '+23%',
      icon: <FileText className="w-5 h-5" />,
      color: 'text-blue-600'
    },
    {
      label: 'Accuracy Rate',
      value: '99.2%',
      change: '+0.8%',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-600'
    },
    {
      label: 'Processing Speed',
      value: '2.1s',
      change: '-0.4s',
      icon: <Zap className="w-5 h-5" />,
      color: 'text-yellow-600'
    },
    {
      label: 'Active Agents',
      value: '6/6',
      change: 'All Online',
      icon: <Activity className="w-5 h-5" />,
      color: 'text-purple-600'
    }
  ];

  const agentStatus = [
    { name: 'Image Processing', status: 'active', load: '87%', accuracy: '99.5%' },
    { name: 'OCR Orchestration', status: 'active', load: '92%', accuracy: '99.2%' },
    { name: 'Data Quality', status: 'active', load: '74%', accuracy: '98.9%' },
    { name: 'Contextual Understanding', status: 'active', load: '68%', accuracy: '97.8%' },
    { name: 'Data Enrichment', status: 'active', load: '55%', accuracy: '99.1%' },
    { name: 'Output Generation', status: 'active', load: '43%', accuracy: '99.7%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Devine Mobile Scan-to-Text AI
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Enterprise-grade agentic AI system for document processing with unprecedented accuracy and reliability
          </p>
        </div>

        {/* System Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemMetrics.map((metric, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      metric.change.startsWith('+') || metric.change === 'All Online' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 ${metric.color}`}>
                    {metric.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main System Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 w-full max-w-5xl">
              <TabsTrigger value="processing" className="text-xs">Processing</TabsTrigger>
              <TabsTrigger value="agents" className="text-xs">Agents</TabsTrigger>
              <TabsTrigger value="quality" className="text-xs">Quality</TabsTrigger>
              <TabsTrigger value="image" className="text-xs">Image</TabsTrigger>
              <TabsTrigger value="ocr" className="text-xs">OCR</TabsTrigger>
              <TabsTrigger value="context" className="text-xs">Context</TabsTrigger>
              <TabsTrigger value="enrichment" className="text-xs">Enrichment</TabsTrigger>
              <TabsTrigger value="output" className="text-xs">Output</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="processing" className="space-y-6">
            <ProcessingDashboard />
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <QualityMetrics />
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Agent Status Overview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Agent Network Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {agentStatus.map((agent, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            agent.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span className="font-medium">{agent.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">Load: {agent.load}</span>
                          <span className="text-sm text-green-600">Acc: {agent.accuracy}</span>
                          <Badge className={getStatusColor(agent.status)}>
                            {agent.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setActiveTab('processing')}
                      className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                    >
                      <Upload className="w-4 h-4 inline mr-2" />
                      Process Document
                    </button>
                    <button 
                      onClick={() => setActiveTab('quality')}
                      className="w-full text-left p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 inline mr-2" />
                      Quality Monitor
                    </button>
                    <button 
                      onClick={() => setActiveTab('image')}
                      className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors"
                    >
                      <Camera className="w-4 h-4 inline mr-2" />
                      Image Processing
                    </button>
                    <button 
                      onClick={() => setActiveTab('output')}
                      className="w-full text-left p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors"
                    >
                      <FileText className="w-4 h-4 inline mr-2" />
                      Output Generation
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="image">
            <ImageProcessingAgent />
          </TabsContent>

          <TabsContent value="ocr">
            <OCROrchestrationAgent />
          </TabsContent>

          <TabsContent value="context">
            <ContextualUnderstandingAgent />
          </TabsContent>

          <TabsContent value="enrichment">
            <DataEnrichmentAgent />
          </TabsContent>

          <TabsContent value="output">
            <OutputGenerationAgent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ScanToTextDashboard;
