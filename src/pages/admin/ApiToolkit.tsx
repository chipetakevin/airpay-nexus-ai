import React from 'react';
import { Zap, Lock, Code, Database, Cloud, Cpu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/components/navigation/MobileLayout';

const ApiToolkit = () => {
  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-3 sm:p-4 lg:p-6">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Enhanced Mobile-First Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <Lock className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              API Toolkit
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Mobile Network Operator Integration Platform
            </p>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              MNO INTEGRATION
            </Badge>
          </div>

          {/* Mobile-Optimized Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 sm:px-0">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 text-sm sm:text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                    <span className="text-blue-600 text-xs">▶</span>
                  </div>
                </div>
                Send Request
              </div>
            </Button>
            
            <Button variant="outline" className="flex-1 border-2 border-gray-300 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-xl hover:bg-gray-50 transition-all duration-300">
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border border-gray-400 rounded-sm"></div>
                Copy as cURL
              </div>
            </Button>
            
            <Button variant="outline" className="sm:w-auto border-2 border-gray-300 py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-medium rounded-xl hover:bg-gray-50 transition-all duration-300">
              <div className="w-5 h-5 border-b-2 border-gray-400"></div>
            </Button>
          </div>

          {/* Enhanced Mobile API Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
            <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <Code className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">API Gateway</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  Centralized API management and routing
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  Manage all MNO APIs through a single, secure gateway with authentication and rate limiting.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-sm py-2.5">
                  Gateway Console
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                    <Database className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">Data Mapping</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  Schema transformation and validation
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  Transform and validate data between different MNO formats and standards.
                </p>
                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-sm py-2.5">
                  Data Console
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg group sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">Cloud Integration</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  Multi-cloud deployment and scaling
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  Deploy and scale API integrations across multiple cloud providers and regions.
                </p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-sm py-2.5">
                  Cloud Manager
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">Performance Monitor</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  Real-time API performance tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  Monitor API response times, error rates, and throughput across all MNO integrations.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm py-2.5">
                  Performance Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Code className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">SDK Generator</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  Auto-generate client libraries
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  Automatically generate SDKs and client libraries for multiple programming languages.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-sm py-2.5">
                  SDK Builder
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                    <Database className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">Integration Hub</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  Pre-built MNO connectors
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  Ready-to-use connectors for major MNOs worldwide with standardized interfaces.
                </p>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-sm py-2.5">
                  Integration Library
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Mobile Quick Actions */}
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white mx-4 sm:mx-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl sm:text-2xl text-center">API Management Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 py-3 text-sm font-medium">
                  <div className="flex flex-col items-center gap-1">
                    <span>📚</span>
                    <span>API Docs</span>
                  </div>
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 py-3 text-sm font-medium">
                  <div className="flex flex-col items-center gap-1">
                    <span>🧪</span>
                    <span>Test APIs</span>
                  </div>
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 py-3 text-sm font-medium">
                  <div className="flex flex-col items-center gap-1">
                    <span>🔑</span>
                    <span>API Keys</span>
                  </div>
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 py-3 text-sm font-medium">
                  <div className="flex flex-col items-center gap-1">
                    <span>📊</span>
                    <span>Usage</span>
                  </div>
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