
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, CreditCard, Smartphone, ChevronDown, ChevronUp,
  MessageCircle, Zap, Gift, TrendingUp, Star
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { Link } from 'react-router-dom';

const CustomerProfileDropdown = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  const quickActions = [
    {
      label: 'WhatsApp Shop',
      icon: <MessageCircle className="w-4 h-4" />,
      action: () => {
        const phoneNumber = currentUser.registeredPhone?.replace('+', '') || '27832466539';
        const message = encodeURIComponent(
          `🔥 Hi! Quick shopping request:\n\n` +
          `OneCard: ${currentUser.cardNumber}\n` +
          `Account: ${currentUser.registeredPhone}\n\n` +
          `Please show me today's best deals! 🛒`
        );
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
      },
      color: 'from-green-500 to-emerald-600'
    },
    {
      label: 'Smart Deals',
      icon: <Zap className="w-4 h-4" />,
      action: () => window.location.href = '/portal?tab=onecard',
      color: 'from-blue-500 to-purple-600'
    },
    {
      label: 'Gift Credit',
      icon: <Gift className="w-4 h-4" />,
      action: () => {
        const phoneNumber = currentUser.registeredPhone?.replace('+', '') || '27832466539';
        const message = encodeURIComponent(
          `🎁 Gift Purchase Request:\n\n` +
          `From: ${currentUser.firstName} ${currentUser.lastName}\n` +
          `OneCard: ${currentUser.cardNumber}\n\n` +
          `I'd like to gift airtime/data to someone. Please assist! 💝`
        );
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
      },
      color: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <div className="relative">
      {/* Profile Summary Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {currentUser.firstName?.charAt(0)}{currentUser.lastName?.charAt(0)}
              </div>
              
              {/* Customer Info */}
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-sm">
                  {currentUser.firstName} {currentUser.lastName}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    VIP Customer
                  </Badge>
                  <span className="text-xs text-gray-600">
                    ****{currentUser.cardNumber?.slice(-4)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Expand/Collapse Button */}
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                WhatsApp Ready
              </Badge>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>
        </CardContent>
      </Card>

      {/* Expanded Quick Actions */}
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 animate-fade-in">
          <Card className="shadow-xl border border-gray-200 bg-white">
            <CardContent className="p-4 space-y-4">
              {/* Account Details */}
              <div className="border-b border-gray-200 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">OneCard Account</span>
                  <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <CreditCard className="w-3 h-3" />
                    <span>{currentUser.cardNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Smartphone className="w-3 h-3" />
                    <span>{currentUser.registeredPhone}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Exclusive WhatsApp Shopping</h4>
                <div className="grid grid-cols-1 gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className={`flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r ${action.color} text-white hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200`}
                    >
                      <div className="p-1 bg-white/20 rounded">
                        {action.icon}
                      </div>
                      <span className="font-medium text-sm">{action.label}</span>
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Portal Access */}
              <div className="border-t border-gray-200 pt-3">
                <Link to="/portal?tab=onecard">
                  <Button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Full Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CustomerProfileDropdown;
