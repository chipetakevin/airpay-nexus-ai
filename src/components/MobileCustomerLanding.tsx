
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, Zap, CreditCard, Gift, TrendingUp, 
  Star, Smartphone, Shield, Clock, CheckCircle,
  ArrowRight, Sparkles, Users
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { Link } from 'react-router-dom';

const MobileCustomerLanding = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  const quickShopActions = [
    {
      title: 'WhatsApp Express Shop',
      description: 'Shop instantly via WhatsApp - No app needed!',
      icon: <MessageCircle className="w-6 h-6" />,
      action: () => {
        const phoneNumber = currentUser.registeredPhone?.replace('+', '') || '27832466539';
        const message = encodeURIComponent(
          `🛒 Express Shopping Request\n\n` +
          `Customer: ${currentUser.firstName} ${currentUser.lastName}\n` +
          `OneCard: ${currentUser.cardNumber}\n` +
          `Phone: ${currentUser.registeredPhone}\n\n` +
          `Show me today's hottest deals! 🔥`
        );
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
      },
      gradient: 'from-green-500 to-emerald-600',
      badge: 'Instant',
      popular: true
    },
    {
      title: 'Smart Deals Portal',
      description: 'Browse exclusive customer deals',
      icon: <Zap className="w-6 h-6" />,
      action: () => window.location.href = '/portal?tab=onecard',
      gradient: 'from-blue-500 to-purple-600',
      badge: 'VIP Only'
    },
    {
      title: 'Gift & Share',
      description: 'Send airtime/data to loved ones',
      icon: <Gift className="w-6 h-6" />,
      action: () => {
        const phoneNumber = currentUser.registeredPhone?.replace('+', '') || '27832466539';
        const message = encodeURIComponent(
          `🎁 Gift Purchase\n\n` +
          `From: ${currentUser.firstName} ${currentUser.lastName}\n` +
          `OneCard: ${currentUser.cardNumber}\n\n` +
          `I want to gift airtime/data. Please help! 💝`
        );
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
      },
      gradient: 'from-pink-500 to-rose-600',
      badge: 'Social'
    }
  ];

  const exclusiveFeatures = [
    {
      icon: <Shield className="w-5 h-5 text-green-600" />,
      title: 'Secure WhatsApp Shopping',
      description: 'Bank-grade security for all transactions'
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      title: 'Instant Delivery',
      description: 'Airtime loaded within 30 seconds'
    },
    {
      icon: <Star className="w-5 h-5 text-yellow-600" />,
      title: 'VIP Customer Benefits',
      description: 'Exclusive deals and cashback rewards'
    },
    {
      icon: <Users className="w-5 h-5 text-purple-600" />,
      title: '24/7 AI Assistant',
      description: 'Always available WhatsApp support'
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
            WhatsApp Ready
          </Badge>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome back, {currentUser.firstName}!
        </h2>
        <p className="text-gray-600">
          Your exclusive WhatsApp shopping experience is ready
        </p>
      </div>

      {/* Quick Shop Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-blue-600" />
          Mobile-First Shopping
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
                      <h4 className="text-lg font-semibold text-gray-900">{action.title}</h4>
                      <Badge className="bg-gray-100 text-gray-700 text-xs">
                        {action.badge}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{action.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Tap to start shopping
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

      {/* Account Summary */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <CreditCard className="w-5 h-5 text-blue-600" />
            Your OneCard Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <p className="text-xs text-gray-600 mb-1">OneCard Number</p>
              <p className="font-bold text-gray-900">****{currentUser.cardNumber?.slice(-4)}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <p className="text-xs text-gray-600 mb-1">Registered Phone</p>
              <p className="font-bold text-gray-900">{currentUser.registeredPhone}</p>
            </div>
          </div>
          
          <Link to="/portal?tab=onecard">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mt-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Full Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Exclusive Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Why Choose WhatsApp Shopping?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exclusiveFeatures.map((feature, index) => (
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
    </div>
  );
};

export default MobileCustomerLanding;
