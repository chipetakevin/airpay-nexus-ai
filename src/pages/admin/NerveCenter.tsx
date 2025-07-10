import React from 'react';
import { Brain, Lock, Zap, BarChart3, Cpu, Network } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/components/navigation/MobileLayout';

const NerveCenter = () => {
  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <Lock className="w-6 h-6 text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">The Nerve Center</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced Neural Network Operations Platform
            </p>
            <Badge className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 text-sm">
              NEURAL PROCESSING
            </Badge>
          </div>

          {/* Neural Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-pink-600" />
                  <CardTitle className="text-lg">AI Model Manager</CardTitle>
                </div>
                <CardDescription>
                  Train, deploy and manage AI models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Comprehensive AI lifecycle management with automated training, validation, and deployment.
                </p>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">
                  Model Studio
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-purple-600" />
                  <CardTitle className="text-lg">Neural Processing</CardTitle>
                </div>
                <CardDescription>
                  High-performance neural computations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Distributed neural processing with GPU acceleration and parallel computing capabilities.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Processing Center
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                  <CardTitle className="text-lg">Analytics Engine</CardTitle>
                </div>
                <CardDescription>
                  Predictive analytics and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Advanced predictive analytics with real-time insights and automated reporting.
                </p>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Analytics Hub
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-lg">Compute Cluster</CardTitle>
                </div>
                <CardDescription>
                  Distributed computing infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Manage high-performance computing clusters for complex neural network operations.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Cluster Manager
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Network className="w-6 h-6 text-green-600" />
                  <CardTitle className="text-lg">Data Pipeline</CardTitle>
                </div>
                <CardDescription>
                  Automated data processing flows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Build and manage automated data pipelines for ML training and inference workflows.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Pipeline Builder
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-orange-600" />
                  <CardTitle className="text-lg">Neural Monitor</CardTitle>
                </div>
                <CardDescription>
                  Real-time neural network monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Monitor neural network performance, health, and resource utilization in real-time.
                </p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Monitoring Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Neural Operations Command</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Train Model
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Deploy Network
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Run Inference
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  View Metrics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};

export default NerveCenter;