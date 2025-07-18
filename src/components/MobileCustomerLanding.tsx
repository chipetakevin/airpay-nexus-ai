
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, Zap, CreditCard, Gift, TrendingUp, 
  Star, Smartphone, Shield, Clock, CheckCircle,
  ArrowRight, Sparkles, Users, ChevronDown, ChevronUp,
  Phone, Eye, EyeOff, Activity, Globe, Briefcase
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { Link } from 'react-router-dom';
import DivineBaaSCard from '@/components/home/DivineBaaSCard';

const MobileCustomerLanding = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [isAccountExpanded, setIsAccountExpanded] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(false);
  const [isPlatformExpanded, setIsPlatformExpanded] = useState(false);
  const [isQuickAccessExpanded, setIsQuickAccessExpanded] = useState(false);
  const [isEarningExpanded, setIsEarningExpanded] = useState(false);

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  const toggleAccountExpanded = () => {
    setIsAccountExpanded(!isAccountExpanded);
  };

  const togglePhoneVisibility = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };

  const toggleFeaturesExpanded = () => {
    setIsFeaturesExpanded(!isFeaturesExpanded);
  };

  const togglePlatformExpanded = () => {
    setIsPlatformExpanded(!isPlatformExpanded);
  };

  const toggleQuickAccessExpanded = () => {
    setIsQuickAccessExpanded(!isQuickAccessExpanded);
  };

  const toggleEarningExpanded = () => {
    setIsEarningExpanded(!isEarningExpanded);
  };

  const quickShopActions = [
    {
      title: 'WhatsApp Express Shop',
      description: 'Shop instantly via WhatsApp - No app needed!',
      icon: <MessageCircle className="w-6 h-6" />,
      action: () => {
        window.location.href = '/portal?tab=deals';
      },
      gradient: 'from-green-500 to-emerald-600',
      badge: 'Instant',
      popular: true
    }
  ];

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            VIP Customer
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Smart Deals Ready
          </Badge>
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome back, {currentUser.firstName}!
        </h2>
        <p className="text-sm text-gray-600">
          Your exclusive smart deals shopping experience is ready
        </p>
      </div>

      {/* Collapsible Account Summary */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-200">
        <CardHeader 
          className="cursor-pointer hover:bg-blue-50/50 transition-colors"
          onClick={toggleAccountExpanded}
        >
          <CardTitle className="flex items-center justify-between text-gray-900 text-base">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" />
              Your OneCard Account
            </div>
            {isAccountExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </CardTitle>
        </CardHeader>
        
        {isAccountExpanded && (
          <CardContent className="space-y-4 animate-fade-in">
            {/* Registered Phone */}
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">Registered Phone</span>
                </div>
                <div 
                  className="flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 rounded-lg p-2 transition-colors"
                  onClick={togglePhoneVisibility}
                >
                  <div className="text-lg font-bold text-blue-800">
                    {showPhoneNumber ? '+27832466659' : '•••••••••••••'}
                  </div>
                  {showPhoneNumber ? (
                    <EyeOff className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Eye className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <p className="text-xs text-blue-600">Click to {showPhoneNumber ? 'hide' : 'reveal'}</p>
              </div>
            </div>

            {/* Platform Statistics */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Platform Statistics
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {/* Happy Customers */}
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-purple-200">
                  <div className="text-center">
                    <div className="text-xl font-bold text-yellow-600 mb-1">50K+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                </div>
                
                {/* Rewards Earned */}
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-200">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600 mb-1">R2.5M+</div>
                    <div className="text-sm text-gray-600">Rewards Earned</div>
                  </div>
                </div>
                
                {/* Uptime */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-200">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600 mb-1">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Deals Portal */}
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-gray-900">Smart Deals Portal</h4>
                    <Badge className="bg-purple-100 text-purple-700 text-xs">VIP Only</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Browse exclusive customer deals</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Tap to access smart deals</span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Gift & Share */}
            <div className="bg-white rounded-lg p-4 border border-pink-200">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white">
                  <Gift className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-gray-900">Gift & Share</h4>
                    <Badge className="bg-pink-100 text-pink-700 text-xs">Social</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Send airtime/data to loved ones</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Tap to access smart deals</span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <Link to="/portal?tab=deals">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mt-4">
                <TrendingUp className="w-4 h-4 mr-2" />
                Access Smart Deals
              </Button>
            </Link>
          </CardContent>
        )}
      </Card>

      {/* Quick Shop Actions */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-blue-600" />
          Quick Shopping
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {quickShopActions.map((action, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border-2 hover:border-blue-200"
              onClick={action.action}
            >
              {action.popular && (
                <div className="absolute top-2 right-2 z-10">
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
                      <h4 className="text-base font-semibold text-gray-900">{action.title}</h4>
                      <Badge className="bg-gray-100 text-gray-700 text-xs">
                        {action.badge}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{action.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Tap to access smart deals
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Collapsible Unified Mobile Platform */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
        <CardHeader 
          className="cursor-pointer hover:bg-orange-50/50 transition-colors"
          onClick={togglePlatformExpanded}
        >
          <CardTitle className="flex items-center justify-between text-gray-900 text-base">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-orange-600" />
              Unified Mobile Platform
            </div>
            {isPlatformExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </CardTitle>
        </CardHeader>
        
        {isPlatformExpanded && (
          <CardContent className="space-y-4 animate-fade-in">
            <div className="text-center space-y-4">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                All-in-One Mobile Solutions
              </div>
              <p className="text-sm text-gray-600">
                Complete mobile services ecosystem - from RICA to enterprise banking solutions
              </p>
              
              <DivineBaaSCard />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Collapsible Quick Access Features */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
        <CardHeader 
          className="cursor-pointer hover:bg-blue-50/50 transition-colors"
          onClick={toggleQuickAccessExpanded}
        >
          <CardTitle className="flex items-center justify-between text-gray-900 text-base">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              Quick Access Features
            </div>
            {isQuickAccessExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </CardTitle>
        </CardHeader>
        
        {isQuickAccessExpanded && (
          <CardContent className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-xl border">
                <Shield className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <div className="text-lg font-bold text-gray-900">99.7%</div>
                <div className="text-sm text-gray-600">Success</div>
                <div className="text-xs text-gray-500 mt-1">RICA Rate</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-xl border">
                <Zap className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="text-lg font-bold text-gray-900">5 Minutes</div>
                <div className="text-sm text-gray-600">Avg Porting</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-xl border">
                <Globe className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <div className="text-sm font-bold text-gray-900">Enterprise</div>
                <div className="text-sm text-gray-600">BaaS Ready</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-xl border">
                <Sparkles className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                <div className="text-sm font-bold text-gray-900">AI Powered</div>
                <div className="text-sm text-gray-600">Platform</div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Collapsible Earning Potential */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
        <CardHeader 
          className="cursor-pointer hover:bg-purple-50/50 transition-colors"
          onClick={toggleEarningExpanded}
        >
          <CardTitle className="flex items-center justify-between text-gray-900 text-base">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              Join Our Thriving Community
            </div>
            {isEarningExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </CardTitle>
        </CardHeader>
        
        {isEarningExpanded && (
          <CardContent className="space-y-4 animate-fade-in">
            <div className="text-center space-y-4">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Discover Your Earning Potential
              </div>
              <p className="text-sm text-gray-600">
                See how profitable the Divine Mobile platform is for each user type when purchasing R100 weekly
              </p>
              
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-200">
                <div className="flex items-center gap-3 justify-center mb-3">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  <span className="text-base font-semibold text-green-800">Weekly R100 Potential</span>
                </div>
                <p className="text-sm text-gray-600">
                  Experience consistent earnings through our platform ecosystem
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Collapsible Exclusive Features */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
        <CardHeader 
          className="cursor-pointer hover:bg-purple-50/50 transition-colors"
          onClick={toggleFeaturesExpanded}
        >
          <CardTitle className="flex items-center justify-between text-gray-900 text-base">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-purple-600" />
              Why Choose Smart Deals Shopping?
            </div>
            {isFeaturesExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </CardTitle>
        </CardHeader>
        
        {isFeaturesExpanded && (
          <CardContent className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Shield className="w-4 h-4 text-green-600" />,
                  title: 'Secure Smart Shopping',
                  description: 'Bank-grade security for all transactions'
                },
                {
                  icon: <Clock className="w-4 h-4 text-blue-600" />,
                  title: 'Instant Delivery',
                  description: 'Airtime loaded within 30 seconds'
                },
                {
                  icon: <Star className="w-4 h-4 text-yellow-600" />,
                  title: 'VIP Customer Benefits',
                  description: 'Exclusive deals and cashback rewards'
                },
                {
                  icon: <Users className="w-4 h-4 text-purple-600" />,
                  title: '24/7 Smart Support',
                  description: 'Always available intelligent assistance'
                }
              ].map((feature, index) => (
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
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default MobileCustomerLanding;
