import React from 'react';
import { CreditCard, Lock, Users, BarChart3, Settings, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/components/navigation/MobileLayout';

const OneCardManagement = () => {
  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <Lock className="w-6 h-6 text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">OneCard Management</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive Card Management & Administration Platform
            </p>
            <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-2 text-sm">
              ADMIN CONTROL
            </Badge>
          </div>

          {/* Management Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-yellow-600" />
                  <CardTitle className="text-lg">User Management</CardTitle>
                </div>
                <CardDescription>
                  Manage all OneCard users and accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Complete user lifecycle management including registration, verification, and account controls.
                </p>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  User Console
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-orange-600" />
                  <CardTitle className="text-lg">Card Operations</CardTitle>
                </div>
                <CardDescription>
                  Issue, manage and control OneCards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Issue new cards, manage existing ones, set limits, and control card functionality.
                </p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Card Center
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 hover:border-red-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-red-600" />
                  <CardTitle className="text-lg">Transaction Analytics</CardTitle>
                </div>
                <CardDescription>
                  Monitor and analyze card transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Real-time transaction monitoring, fraud detection, and comprehensive analytics.
                </p>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Analytics Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-pink-600" />
                  <CardTitle className="text-lg">Security Control</CardTitle>
                </div>
                <CardDescription>
                  Advanced security and compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Comprehensive security controls, compliance monitoring, and risk management.
                </p>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">
                  Security Center
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="w-6 h-6 text-purple-600" />
                  <CardTitle className="text-lg">System Configuration</CardTitle>
                </div>
                <CardDescription>
                  Platform settings and configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Configure platform settings, payment processors, and integration parameters.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Configuration Panel
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-lg">Financial Reports</CardTitle>
                </div>
                <CardDescription>
                  Generate comprehensive reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Generate detailed financial reports, reconciliation data, and compliance documents.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Reports Center
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">OneCard Command Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Issue New Card
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Freeze/Unfreeze
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Transaction Review
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};

export default OneCardManagement;