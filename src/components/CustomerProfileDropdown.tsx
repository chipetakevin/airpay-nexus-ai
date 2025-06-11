import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, CreditCard, Smartphone, ChevronDown, ChevronUp,
  MessageCircle, Zap, Gift, TrendingUp, Star, LogOut
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CustomerProfileDropdown = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  const handleLogout = () => {
    // Only clear authentication flags, keep user data for future registrations
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userCredentials');
    
    toast({
      title: "Logged Out Successfully",
      description: "Your account information has been saved for future logins.",
      duration: 3000,
    });
    
    // Redirect to heroes section (main landing page)
    window.location.href = '/';
  };

  const quickActions = [
    {
      label: 'WhatsApp Business',
      icon: <MessageCircle className="w-4 h-4" />,
      action: () => {
        const phoneNumber = currentUser.registeredPhone?.replace('+', '') || '27832466539';
        const message = encodeURIComponent(
          `🔥 Hi! Quick business request:\n\n` +
          `OneCard: ${currentUser.cardNumber}\n` +
          `Account: ${currentUser.registeredPhone}\n\n` +
          `Please help me with business services! 💼`
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
      label: 'OneCard Cash Back Rewards',
      icon: <Gift className="w-4 h-4" />,
      action: () => {
        // Navigate to OneCard rewards page featuring AirPay gold card
        window.location.href = '/portal?tab=onecard&section=rewards';
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
              {/* Quick Actions - Enhanced Mobile Experience */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Exclusive WhatsApp Business</h4>
                <div className="grid grid-cols-1 gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className={`flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r ${action.color} text-white hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 min-h-[44px] active:scale-[0.98]`}
                    >
                      <div className="p-1 bg-white/20 rounded">
                        {action.icon}
                      </div>
                      <span className="font-medium text-sm flex-1 text-left">{action.label}</span>
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
                  <Button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 min-h-[44px] transition-all duration-300 mb-3">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Full Dashboard
                  </Button>
                </Link>
              </div>

              {/* Logout Option - Properly positioned with clear spacing */}
              <div className="border-t border-gray-200 pt-3">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group w-full text-left min-h-[44px] border border-red-200"
                >
                  <div className="p-2 bg-red-100 rounded-lg">
                    <LogOut className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 group-hover:text-red-600">Logout</div>
                    <div className="text-xs text-gray-500">Sign out of your account</div>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CustomerProfileDropdown;
