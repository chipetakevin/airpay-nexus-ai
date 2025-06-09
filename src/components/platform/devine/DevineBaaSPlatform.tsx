
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, Shield, Zap, Globe, FileText, Camera,
  ArrowRight, CheckCircle, Clock, Users, Star, Cpu,
  Languages, ScanLine, MapPin, CreditCard
} from 'lucide-react';

const DevineBaaSPlatform = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [activeWorkflow, setActiveWorkflow] = useState('home');

  const languages = [
    { code: 'english', name: 'English', native: 'English' },
    { code: 'afrikaans', name: 'Afrikaans', native: 'Afrikaans' },
    { code: 'zulu', name: 'isiZulu', native: 'isiZulu' },
    { code: 'xhosa', name: 'isiXhosa', native: 'isiXhosa' },
    { code: 'pedi', name: 'Sepedi', native: 'Sepedi' },
    { code: 'tswana', name: 'Setswana', native: 'Setswana' },
    { code: 'sotho', name: 'Sesotho', native: 'Sesotho' },
    { code: 'tsonga', name: 'Xitsonga', native: 'Xitsonga' },
    { code: 'swati', name: 'siSwati', native: 'siSwati' },
    { code: 'venda', name: 'Tshivenda', native: 'Tshivenda' },
    { code: 'ndebele', name: 'isiNdebele', native: 'isiNdebele' }
  ];

  const quickActions = [
    {
      id: 'port-rica',
      title: 'Port & RICA in 5 Minutes',
      description: 'Complete SIM porting and RICA registration instantly',
      icon: <Zap className="w-6 h-6" />,
      gradient: 'from-green-500 to-emerald-600',
      popular: true,
      time: '~5 min'
    },
    {
      id: 'rica-only',
      title: 'RICA Registration',
      description: 'Quick RICA compliance registration',
      icon: <Shield className="w-6 h-6" />,
      gradient: 'from-blue-500 to-purple-600',
      time: '~2 min'
    },
    {
      id: 'port-status',
      title: 'Check Porting Status',
      description: 'Track your number porting progress',
      icon: <Clock className="w-6 h-6" />,
      gradient: 'from-orange-500 to-red-600',
      time: 'Instant'
    },
    {
      id: 'new-sim',
      title: 'New SIM Activation',
      description: 'Activate your new Devine Mobile SIM',
      icon: <Smartphone className="w-6 h-6" />,
      gradient: 'from-purple-500 to-pink-600',
      time: '~3 min'
    }
  ];

  const workflowSteps = [
    {
      step: 1,
      title: 'Language & Welcome',
      description: 'Select preferred language and service',
      icon: <Languages className="w-5 h-5" />,
      status: 'completed'
    },
    {
      step: 2,
      title: 'Smart Document Capture',
      description: 'AI-powered ID and contract scanning',
      icon: <ScanLine className="w-5 h-5" />,
      status: 'active'
    },
    {
      step: 3,
      title: 'AI Verification',
      description: 'Biometric and document validation',
      icon: <Cpu className="w-5 h-5" />,
      status: 'pending'
    },
    {
      step: 4,
      title: 'Provider Integration',
      description: 'Automatic provider communication',
      icon: <Globe className="w-5 h-5" />,
      status: 'pending'
    },
    {
      step: 5,
      title: 'NST Scheduling',
      description: 'Optimal porting window selection',
      icon: <Clock className="w-5 h-5" />,
      status: 'pending'
    },
    {
      step: 6,
      title: 'Activation & RICA',
      description: 'Service activation and compliance',
      icon: <CheckCircle className="w-5 h-5" />,
      status: 'pending'
    }
  ];

  const features = [
    {
      icon: <Cpu className="w-6 h-6 text-blue-600" />,
      title: 'AI-Powered Processing',
      description: '99.7% accuracy in document verification'
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: 'RICA Compliance',
      description: 'Automated ICASA regulation adherence'
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: 'Instant Activation',
      description: 'Complete process in under 5 minutes'
    },
    {
      icon: <Languages className="w-6 h-6 text-purple-600" />,
      title: '11 SA Languages',
      description: 'Native language support for all users'
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-600" />,
      title: 'Address Validation',
      description: 'Municipal database integration'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-indigo-600" />,
      title: 'Credit Integration',
      description: 'Real-time credit bureau checks'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header with Language Selector */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Devine Mobile BaaS</h1>
                <p className="text-sm text-gray-600">Intelligent Porting & RICA Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.native}
                  </option>
                ))}
              </select>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                ICASA Compliant
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <Star className="w-3 h-3 mr-1" />
              #1 Fastest Porting
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Zap className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Port Your Number in 5 Minutes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience South Africa's most advanced autonomous SIM porting and RICA registration platform. 
            AI-powered processing with 99.7% accuracy and full ICASA compliance.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={action.id}
              className="relative overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border-2 hover:border-blue-200"
              onClick={() => setActiveWorkflow(action.id)}
            >
              {action.popular && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-pulse">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${action.gradient} text-white shadow-lg`}>
                    {action.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                      <Badge className="bg-gray-100 text-gray-700 text-xs">
                        {action.time}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{action.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Start Process
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Workflow Progress */}
        {activeWorkflow === 'port-rica' && (
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                Intelligent Porting Workflow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {workflowSteps.map((step, index) => (
                  <div key={step.step} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step.status === 'completed' ? 'bg-green-500 text-white' :
                      step.status === 'active' ? 'bg-blue-500 text-white' :
                      'bg-gray-300 text-gray-600'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : step.step}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                    
                    <div className="p-2 bg-white rounded-lg">
                      {step.icon}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Camera className="w-4 h-4 mr-2" />
                  Start Document Capture
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Platform Features */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 text-center">Platform Intelligence Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                <div className="p-2 bg-gray-50 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h4>
                  <p className="text-gray-600 text-xs">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance & Security Section */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">100% Compliant & Secure</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900">ICASA</div>
                  <div className="text-xs text-gray-600">Compliant</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900">POPIA</div>
                  <div className="text-xs text-gray-600">Certified</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900">99.7%</div>
                  <div className="text-xs text-gray-600">Accuracy</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900">24/7</div>
                  <div className="text-xs text-gray-600">Available</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DevineBaaSPlatform;
