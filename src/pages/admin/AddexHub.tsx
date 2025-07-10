import React from 'react';
import { Satellite, Lock, Settings, BarChart3, Globe, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/components/navigation/MobileLayout';

const AddexHub = () => {
  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Satellite className="w-8 h-8 text-white" />
              </div>
              <Lock className="w-6 h-6 text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Addex Hub Platform</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced Telecom Infrastructure Management System
            </p>
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm">
              TELECOM INFRASTRUCTURE
            </Badge>
          </div>

          {/* Platform Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-lg">Network Management</CardTitle>
                </div>
                <CardDescription>
                  Centralized control of telecom infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Monitor and manage network components, base stations, and connectivity across multiple regions.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Access Network Center
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                  <CardTitle className="text-lg">Analytics Dashboard</CardTitle>
                </div>
                <CardDescription>
                  Real-time performance monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Track network performance, usage statistics, and operational metrics in real-time.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="w-6 h-6 text-indigo-600" />
                  <CardTitle className="text-lg">Global Coverage</CardTitle>
                </div>
                <CardDescription>
                  Worldwide infrastructure management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Manage telecom infrastructure across multiple countries and regions from a single platform.
                </p>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Global View
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  <CardTitle className="text-lg">Security Center</CardTitle>
                </div>
                <CardDescription>
                  Advanced security and compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Comprehensive security monitoring, threat detection, and compliance management.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Security Console
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Satellite className="w-6 h-6 text-orange-600" />
                  <CardTitle className="text-lg">Satellite Control</CardTitle>
                </div>
                <CardDescription>
                  Satellite communication management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Control and monitor satellite communications, orbital positioning, and signal quality.
                </p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Satellite Console
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 hover:border-red-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="w-6 h-6 text-red-600" />
                  <CardTitle className="text-lg">Maintenance Hub</CardTitle>
                </div>
                <CardDescription>
                  Predictive maintenance & alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  AI-powered predictive maintenance, automated alerts, and maintenance scheduling.
                </p>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Maintenance Center
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Platform Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  System Health Check
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Generate Reports
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Emergency Protocols
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};

export default AddexHub;