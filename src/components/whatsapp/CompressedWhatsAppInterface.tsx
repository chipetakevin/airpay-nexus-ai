
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, CreditCard, Wifi, BarChart, Gift, 
  ChevronUp, ChevronDown, Zap, Star, Send
} from 'lucide-react';
import { useScrollingInterface } from '@/hooks/useScrollingInterface';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const CompressedWhatsAppInterface = () => {
  const { isVisible, isScrolling, isMobile } = useScrollingInterface();
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentInput, setCurrentInput] = useState('');

  const quickActions = [
    { icon: CreditCard, label: 'Airtime', color: 'text-blue-600' },
    { icon: Wifi, label: 'Data', color: 'text-green-600' },
    { icon: BarChart, label: 'Balance', color: 'text-purple-600' },
    { icon: Gift, label: 'Gift', color: 'text-orange-600' }
  ];

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    // Implement quick action logic here
  };

  const handleSendMessage = () => {
    if (currentInput.trim()) {
      console.log('Sending message:', currentInput);
      setCurrentInput('');
    }
  };

  if (!isMobile) {
    return null; // Only show on mobile
  }

  return (
    <div 
      className={`fixed bottom-20 left-4 right-4 z-40 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-50'
      } ${isScrolling ? 'scale-95' : 'scale-100'}`}
    >
      <Card className="bg-white shadow-2xl border-2 border-green-200 rounded-2xl overflow-hidden">
        {/* Compressed Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Devine Mobile AI</h3>
                <div className="flex items-center gap-1 text-xs opacity-90">
                  <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></div>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {isAuthenticated && (
                <Badge className="bg-yellow-500 text-yellow-900 text-xs px-2 py-1">
                  <Star className="w-3 h-3 mr-1" />
                </Badge>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white hover:bg-white/20 p-1 h-6 w-6"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions - Always Visible */}
        <div className="p-2 bg-gray-50">
          <div className="grid grid-cols-4 gap-1">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                onClick={() => handleQuickAction(action.label)}
                className="h-12 flex flex-col items-center justify-center p-1 text-xs hover:bg-blue-50"
              >
                <action.icon className={`w-4 h-4 mb-1 ${action.color}`} />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Expandable Content */}
        <div className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-80' : 'max-h-0'
        }`}>
          {/* Messages Area */}
          <div className="p-3 bg-gray-50 max-h-48 overflow-y-auto">
            <div className="bg-white rounded-xl p-3 mb-2 shadow-sm">
              <div className="flex items-start gap-2">
                <span className="text-lg">👋</span>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Welcome to Devine Mobile!
                  </p>
                  <p className="text-xs text-gray-600">
                    {isAuthenticated 
                      ? `Hi ${currentUser?.firstName}! Ready to shop?` 
                      : 'Your mobile shopping assistant'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Quick Options:</p>
                  <div className="space-y-1">
                    <div className="text-xs bg-blue-50 rounded px-2 py-1">1️⃣ Buy Airtime</div>
                    <div className="text-xs bg-green-50 rounded px-2 py-1">2️⃣ Data Bundles</div>
                    <div className="text-xs bg-purple-50 rounded px-2 py-1">3️⃣ Check Balance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-2 bg-white border-t">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Type here..."
                className="flex-1 px-3 py-2 text-sm border rounded-full focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <Button 
                onClick={handleSendMessage}
                size="sm"
                className="rounded-full bg-green-600 hover:bg-green-700 w-8 h-8 p-0"
                disabled={!currentInput.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="px-3 py-2 bg-gray-50 border-t flex items-center justify-center text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Secure
            </span>
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              AI Powered
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CompressedWhatsAppInterface;
