import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  CreditCard, 
  ShoppingBag, 
  Users, 
  Store, 
  Shield,
  ArrowLeft,
  Zap,
  TrendingUp,
  Bell
} from 'lucide-react';

const MobileDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Smart Deals',
      description: 'Shop Now',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      textColor: 'text-white',
      onClick: () => navigate('/portal?tab=deals')
    },
    {
      title: 'OneCard Dashboard',
      description: 'Manage Card',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      textColor: 'text-white',
      onClick: () => navigate('/portal?tab=onecard')
    },
    {
      title: 'Customer Register',
      description: 'Sign Up',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      textColor: 'text-white',
      onClick: () => navigate('/portal?tab=registration')
    },
    {
      title: 'Vendor Register',
      description: 'Partner with Us',
      icon: <Store className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      textColor: 'text-white',
      onClick: () => navigate('/portal?tab=vendor')
    }
  ];

  const systemStatus = [
    { label: 'Network Status', status: 'Online', color: 'bg-green-500' },
    { label: 'Deals Update', status: 'Active', color: 'bg-blue-500' },
    { label: 'System Health', status: '99.9%', color: 'bg-emerald-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mobile-content-container">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="mobile-heading-medium">Mobile Dashboard</h1>
              <p className="mobile-text-medium">Divine Mobile Services</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold">Welcome to Divine Mobile</h2>
                <p className="text-blue-100">Your complete mobile services platform</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {systemStatus.map((item, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                    <span className="text-xs text-blue-100">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h3 className="mobile-heading-small mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className={`${action.color} ${action.textColor} border-0 cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-98`}
                onClick={action.onClick}
              >
                <CardContent className="p-5 flex flex-col items-center text-center min-h-[120px] justify-center">
                  <div className="mb-3">
                    {action.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-tight">{action.title}</h4>
                    <p className="text-xs opacity-90 mt-1">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* System Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="mobile-heading-small flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              System Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-green-700">Service Availability</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">Live</div>
                <div className="text-sm text-blue-700">Deal Updates</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-purple-600">Enhanced Mobile Experience</div>
                  <div className="text-sm text-purple-700">Optimized for your device</div>
                </div>
                <Shield className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate('/portal')}
            className="mobile-action-button bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Smartphone className="w-5 h-5" />
            Go to Full Portal
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mobile-action-button"
          >
            Return to Home
          </Button>
        </div>

        {/* Bottom spacing for safe area */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default MobileDashboard;