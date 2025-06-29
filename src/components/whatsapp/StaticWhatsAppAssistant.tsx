
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Smartphone, CreditCard, Wifi, Phone, Gift, Zap, Users } from 'lucide-react';

const StaticWhatsAppAssistant = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const quickActions = [
    {
      id: 1,
      icon: <CreditCard className="w-4 h-4" />,
      title: "Buy Airtime",
      description: "Instant top-ups for all networks",
      response: "Great choice! I can help you buy airtime for any network. Simply tell me:\n• Which network (MTN, Vodacom, Cell C, Telkom)\n• Amount (R5 - R1000)\n• Phone number\n\nReply with your details to get started!"
    },
    {
      id: 2,
      icon: <Wifi className="w-4 h-4" />,
      title: "Purchase Data Bundles",
      description: "High-speed internet packages",
      response: "Perfect! I have amazing data deals available:\n• Daily bundles (100MB - 1GB)\n• Weekly bundles (1GB - 5GB)\n• Monthly bundles (1GB - 30GB)\n\nWhich data bundle interests you? Just reply with your preference!"
    },
    {
      id: 3,
      icon: <Phone className="w-4 h-4" />,
      title: "Check Balance",
      description: "View your current balance",
      response: "I can help you check your balance instantly! Just send me:\n• Your phone number\n• Network provider\n\nI'll get your balance information right away. Quick and secure!"
    },
    {
      id: 4,
      icon: <Gift className="w-4 h-4" />,
      title: "Gift Airtime/Data",
      description: "Send to friends & family",
      response: "How thoughtful! Gifting is easy:\n• Choose airtime or data\n• Enter recipient's number\n• Select amount\n• Add a personal message\n\nYour loved ones will receive it instantly!"
    },
    {
      id: 5,
      icon: <Zap className="w-4 h-4" />,
      title: "Manage Bundles",
      description: "View and control your packages",
      response: "I'll help you manage all your bundles:\n• View active bundles\n• Check expiry dates\n• Renew expiring bundles\n• Cancel unwanted bundles\n\nWhat would you like to manage today?"
    },
    {
      id: 6,
      icon: <Users className="w-4 h-4" />,
      title: "International Airtime",
      description: "Global top-up services",
      response: "Send airtime worldwide! I support:\n• 150+ countries\n• All major networks\n• Instant delivery\n• Competitive rates\n\nWhich country are you sending to?"
    }
  ];

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
    setShowWelcome(false);
  };

  const handleStartWhatsApp = () => {
    const message = encodeURIComponent(
      `👋 Hi Devine Mobile!\n\n` +
      `I'm interested in your mobile services. Can you help me get started?\n\n` +
      `What services do you offer?`
    );
    window.open(`https://wa.me/27832466539?text=${message}`, '_blank');
  };

  const handleBackToOptions = () => {
    setSelectedOption(null);
    setShowWelcome(true);
  };

  return (
    <div className="bg-white rounded-t-3xl overflow-hidden">
      {/* WhatsApp Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Devine Mobile Assistant</h3>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span>Online • Always here to help</span>
            </div>
          </div>
          <Badge className="bg-green-800 text-green-100 px-2 py-1 text-xs">
            AI Agent
          </Badge>
        </div>
      </div>

      {/* Quick Action Tabs */}
      <div className="bg-gray-50 p-2 border-b">
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-white rounded-lg border shadow-sm">
            <CreditCard className="w-5 h-5 mx-auto mb-1 text-blue-600" />
            <span className="text-xs font-medium text-gray-700">Airtime</span>
          </div>
          <div className="text-center p-2 bg-white rounded-lg border shadow-sm">
            <Wifi className="w-5 h-5 mx-auto mb-1 text-green-600" />
            <span className="text-xs font-medium text-gray-700">Data</span>
          </div>
          <div className="text-center p-2 bg-white rounded-lg border shadow-sm">
            <Phone className="w-5 h-5 mx-auto mb-1 text-purple-600" />
            <span className="text-xs font-medium text-gray-700">Balance</span>
          </div>
        </div>
      </div>

      {/* Chat Content */}
      <div className="px-4 py-4 min-h-[400px] max-h-[400px] overflow-hidden">
        {showWelcome && !selectedOption && (
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-2xl p-4">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-xl">👋</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Welcome to Devine Mobile!</p>
                  <p className="text-gray-700 text-sm mb-3">
                    Your one-stop shop for airtime & data right here in WhatsApp!
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">⭐</span>
                  <span className="font-semibold text-gray-900 text-sm">What can I help you with today?</span>
                </div>
                
                <div className="space-y-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleOptionSelect(action.id)}
                      className="flex items-center gap-3 p-2 bg-white rounded-lg border hover:bg-blue-50 transition-colors cursor-pointer w-full text-left"
                    >
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                        {action.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm truncate">{action.title}</div>
                        <div className="text-xs text-gray-600 truncate">{action.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-sm text-gray-700 mb-1">
                  Simply select an option above or tell me what you need! 💬
                </p>
                <p className="text-xs text-gray-500">Available 24/7</p>
              </div>
            </div>
          </div>
        )}

        {selectedOption && (
          <div className="space-y-4">
            <div className="bg-blue-600 text-white rounded-2xl p-3 ml-8">
              <p className="text-sm">
                {quickActions.find(action => action.id === selectedOption)?.title}
              </p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-4">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm mb-2">Devine Mobile Assistant</p>
                  <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {quickActions.find(action => action.id === selectedOption)?.response}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-2 border-t border-gray-200">
                <button
                  onClick={handleBackToOptions}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Back to options
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="p-4 bg-gray-50 border-t">
        <Button 
          onClick={handleStartWhatsApp}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 text-base font-semibold"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Continue on WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default StaticWhatsAppAssistant;
