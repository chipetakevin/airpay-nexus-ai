import React from 'react';
import { Zap, Lock, Code, Database, Cloud, Cpu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/components/navigation/MobileLayout';

const ApiToolkit = () => {
  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <Lock className="w-6 h-6 text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">API Toolkit</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mobile Network Operator Integration Platform
            </p>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-sm">
              MNO INTEGRATION
            </Badge>
          </div>

          {/* API Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="w-6 h-6 text-purple-600" />
                  <CardTitle className="text-lg">API Gateway</CardTitle>
                </div>
                <CardDescription>
                  Centralized API management and routing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Manage all MNO APIs through a single, secure gateway with authentication and rate limiting.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Gateway Console
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="w-6 h-6 text-pink-600" />
                  <CardTitle className="text-lg">Data Mapping</CardTitle>
                </div>
                <CardDescription>
                  Schema transformation and validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Transform and validate data between different MNO formats and standards.
                </p>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">
                  Data Console
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Cloud className="w-6 h-6 text-orange-600" />
                  <CardTitle className="text-lg">Cloud Integration</CardTitle>
                </div>
                <CardDescription>
                  Multi-cloud deployment and scaling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Deploy and scale API integrations across multiple cloud providers and regions.
                </p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Cloud Manager
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-lg">Performance Monitor</CardTitle>
                </div>
                <CardDescription>
                  Real-time API performance tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Monitor API response times, error rates, and throughput across all MNO integrations.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Performance Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="w-6 h-6 text-green-600" />
                  <CardTitle className="text-lg">SDK Generator</CardTitle>
                </div>
                <CardDescription>
                  Auto-generate client libraries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Automatically generate SDKs and client libraries for multiple programming languages.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  SDK Builder
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="w-6 h-6 text-indigo-600" />
                  <CardTitle className="text-lg">Integration Hub</CardTitle>
                </div>
                <CardDescription>
                  Pre-built MNO connectors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Ready-to-use connectors for major MNOs worldwide with standardized interfaces.
                </p>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Integration Library
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">API Management Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  API Documentation
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Test Endpoints
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Generate Keys
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Monitor Usage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ApiToolkit;