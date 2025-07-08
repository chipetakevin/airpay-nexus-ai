
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, Send, Phone, CreditCard, 
  Activity, Gift, Globe, BarChart, 
  Shield, CheckCircle, AlertTriangle, Wifi,
  Star, Clock, Users, Zap
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
  data?: any;
}

const EnhancedWhatsAppAssistant = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      message: `👋 Welcome to Divine Mobile AI Assistant!
Your intelligent shopping companion for airtime & data!

🌟 What can I help you with today?
1️⃣ Buy Airtime (All Networks)
2️⃣ Purchase Data Bundles  
3️⃣ Check Balance & Usage
4️⃣ Gift Airtime/Data
5️⃣ Manage Active Bundles
6️⃣ International Top-ups
7️⃣ Account Services
8️⃣ Support & Help

${isAuthenticated ? `Hi ${currentUser?.firstName}! 🎯 OneCard Ready` : 'Sign in for personalized service'}

Simply reply with a number or tell me what you need! 💬`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [conversationState, setConversationState] = useState('greeting');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const addMessage = (message: string, type: 'user' | 'bot', data?: any) => {
    const newMessage: Message = {
      id: messages.length + 1,
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
      data
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = async (response: string, delay: number = 1000) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsTyping(false);
    addMessage(response, 'bot');
  };

  const handleQuickAction = (action: string) => {
    addMessage(action, 'user');
    processUserInput(action);
  };

  const processUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('1') || lowerInput.includes('airtime')) {
      handleAirtimeFlow();
    } else if (lowerInput.includes('2') || lowerInput.includes('data')) {
      handleDataFlow();
    } else if (lowerInput.includes('3') || lowerInput.includes('balance')) {
      handleBalanceFlow();
    } else if (lowerInput.includes('4') || lowerInput.includes('gift')) {
      handleGiftFlow();
    } else if (lowerInput.includes('5') || lowerInput.includes('manage')) {
      handleManageFlow();
    } else if (lowerInput.includes('6') || lowerInput.includes('international')) {
      handleInternationalFlow();
    } else if (lowerInput.includes('7') || lowerInput.includes('account')) {
      handleAccountFlow();
    } else if (lowerInput.includes('8') || lowerInput.includes('support') || lowerInput.includes('help')) {
      handleSupportFlow();
    } else {
      handleGeneralResponse(input);
    }
  };

  const handleAirtimeFlow = () => {
    setConversationState('airtime');
    const response = `💰 AIRTIME PURCHASE SERVICE

📱 AVAILABLE NETWORKS:
🔴 Vodacom - Instant delivery
🟡 MTN - 99.9% success rate  
🔵 Cell C - All amounts available
🟣 Telkom - Fast processing

💵 AMOUNT OPTIONS:
• R5 - R50 (Standard)
• R55 - R200 (Popular)
• R250 - R500 (Bulk purchase)

📝 HOW TO ORDER:
Example: "R20 Vodacom airtime for 0821234567"
Or: "R50 MTN airtime for myself"

${isAuthenticated ? `✅ Your registered number: ${currentUser?.registeredPhone}` : '⚠️ Register for instant processing'}

What network and amount do you need?`;
    
    simulateTyping(response, 800);
  };

  const handleDataFlow = () => {
    setConversationState('data');
    const response = `📊 DATA BUNDLES MARKETPLACE

🔥 FEATURED DEALS:
1️⃣ 1GB Vodacom - R29 (30 days) ⭐ Most Popular
2️⃣ 2GB MTN - R49 (30 days) 
3️⃣ 5GB Cell C - R99 (30 days) 💎 Best Value
4️⃣ 10GB Telkom - R149 (30 days)

📱 SOCIAL BUNDLES:
5️⃣ WhatsApp 500MB - R15 (7 days)
6️⃣ Facebook 1GB - R25 (14 days)
7️⃣ YouTube 2GB - R45 (30 days)

🎯 ENTERPRISE BUNDLES:
8️⃣ 20GB Business - R299 (30 days)
9️⃣ 50GB Unlimited - R599 (30 days)

${isAuthenticated ? `🎁 VIP Discount: Additional 5% off` : '💡 Register for exclusive deals'}

Reply with bundle number or describe your needs!`;
    
    simulateTyping(response, 1000);
  };

  const handleBalanceFlow = () => {
    const response = `📊 BALANCE & USAGE CHECKER

📱 AVAILABLE SERVICES:
• Real-time balance inquiry
• Data usage tracking  
• Bundle expiry dates
• Transaction history
• Account statements

${isAuthenticated ? 
`🎯 YOUR ACCOUNT STATUS:
📱 Number: ${currentUser?.registeredPhone}
💳 OneCard: ****${currentUser?.cardNumber?.slice(-4)}
⚡ Status: VIP Customer

📊 Quick Balance Check:
• Current Airtime: R45.20
• Active Data: 2.5GB (expires 15 days)
• Last Top-up: R50 (2 days ago)` :
`📱 BALANCE CHECK GUIDE:
Enter your number: 0821234567
Or say "Check my balance" with registered number`}

Need detailed statement or specific inquiry?`;
    
    simulateTyping(response, 700);
  };

  const handleGiftFlow = () => {
    const response = `🎁 GIFT AIRTIME & DATA SERVICE

💝 GIFTING OPTIONS:
• Airtime gifts (R5 - R500)
• Data bundle gifts  
• International airtime
• Group gifting (multiple recipients)
• Scheduled gifts (birthdays, special dates)

📝 GIFT FORMAT:
"Gift R50 airtime to 0827654321 - Happy Birthday Mom!"

🎯 POPULAR GIFT BUNDLES:
1️⃣ R20 Airtime + Personal Message
2️⃣ 1GB Data Bundle Gift
3️⃣ R50 Combo (R30 airtime + 500MB data)
4️⃣ Custom amount of your choice

${isAuthenticated ? 
`🎁 VIP PERKS:
• Free gift messages
• Delivery confirmations  
• Gift history tracking
• Bulk discount available` :
`💡 Register for gift tracking & confirmations`}

Who would you like to gift today?`;
    
    simulateTyping(response, 900);
  };

  const handleManageFlow = () => {
    const response = `📱 BUNDLE MANAGEMENT CENTER

${isAuthenticated ? 
`🎯 YOUR ACTIVE SERVICES:
📊 Data Bundles:
• 2GB Vodacom - Expires in 15 days
• WhatsApp 500MB - Expires in 25 days
• YouTube 1GB - Expires in 8 days

⚡ QUICK ACTIONS:
1️⃣ Renew expiring bundles
2️⃣ Upgrade current bundle  
3️⃣ Add emergency data
4️⃣ Set auto-renewal
5️⃣ Bundle transfer
6️⃣ Usage alerts setup

💡 SMART RECOMMENDATIONS:
• Your 2GB bundle expires soon - Renew now?
• Upgrade to 5GB and save R20
• Add WhatsApp bundle for R15 extra` :
`📱 BUNDLE MANAGEMENT FEATURES:
• View all active bundles
• Check expiry dates
• Set renewal reminders
• Usage monitoring
• Auto-renewal setup
• Bundle sharing options

🔐 Login required for personal bundle management`}

What would you like to manage today?`;
    
    simulateTyping(response, 1100);
  };

  const handleInternationalFlow = () => {
    const response = `🌍 INTERNATIONAL AIRTIME SERVICE

🗺️ AVAILABLE REGIONS:
🇿🇦 SADC Countries:
🇿🇼 Zimbabwe | 🇧🇼 Botswana | 🇱🇸 Lesotho
🇸🇿 Eswatini | 🇲🇿 Mozambique | 🇿🇲 Zambia

🌍 Popular Destinations:
🇳🇬 Nigeria | 🇬🇭 Ghana | 🇰🇪 Kenya
🇺🇬 Uganda | 🇹🇿 Tanzania | 🇪🇹 Ethiopia

💰 PRICING (USD):
• $5 - $25 (Standard amounts)
• $30 - $100 (Popular range)
• Custom amounts available

📝 ORDER FORMAT:
"Zimbabwe +263771234567 $10"
"Nigeria +2348012345678 $20"

🚀 DELIVERY TIME:
• SADC: Instant - 2 minutes
• Africa: 2 - 5 minutes  
• Processing 24/7

Which country and amount do you need?`;
    
    simulateTyping(response, 1200);
  };

  const handleAccountFlow = () => {
    const response = `🏦 ACCOUNT SERVICES CENTER

${isAuthenticated ? 
`👤 ACCOUNT OVERVIEW:
📱 Name: ${currentUser?.firstName} ${currentUser?.lastName}
💳 OneCard: ****${currentUser?.cardNumber?.slice(-4)}
📞 Phone: ${currentUser?.registeredPhone}
⭐ Status: VIP Customer
🔐 Security: Active

🎯 AVAILABLE SERVICES:
1️⃣ Update personal details
2️⃣ Change PIN/Password  
3️⃣ Add payment methods
4️⃣ Set spending limits
5️⃣ Download statements
6️⃣ Account notifications
7️⃣ Security settings` :
`🔐 ACCOUNT SERVICES:
• Account registration
• Profile management
• Payment methods
• Security settings  
• Transaction history
• Notification preferences

📝 REGISTER NOW:
Quick OneCard registration available
Get instant VIP benefits!`}

🛡️ SECURITY FEATURES:
• 2FA authentication
• Transaction alerts
• Spending controls
• Device management

What account service do you need?`;
    
    simulateTyping(response, 800);
  };

  const handleSupportFlow = () => {
    const response = `🆘 CUSTOMER SUPPORT CENTER

⚡ INSTANT HELP:
• Live chat support (24/7)
• WhatsApp assistance  
• Email support
• Phone support: +27 100 2827

📚 SELF-SERVICE OPTIONS:
1️⃣ Transaction issues
2️⃣ Failed payments
3️⃣ Bundle problems
4️⃣ Account access
5️⃣ Technical support
6️⃣ Refund requests

🔧 TROUBLESHOOTING:
• Clear app cache if slow
• Check network connection
• Verify phone number format
• Confirm payment method

📊 SYSTEM STATUS:
🟢 All services operational
🟢 Payment processing: Normal
🟢 Network connectivity: Excellent

🎯 PRIORITY SUPPORT:
${isAuthenticated ? `VIP Customer - Average response: 30 seconds` : `Standard support - Average response: 2 minutes`}

How can I assist you today?`;
    
    simulateTyping(response, 600);
  };

  const handleGeneralResponse = (input: string) => {
    const response = `🤖 I understand you said "${input}"

I'm here to help with:
✅ Mobile services (airtime, data, bundles)
✅ Account management & support
✅ International services
✅ Gifting & sharing
✅ Technical assistance

💡 QUICK COMMANDS:
• "Balance" → Instant balance check
• "Data deals" → Show all bundles  
• "R50 airtime" → Quick purchase
• "Gift R20 to [number]" → Send gift
• "Help payment" → Payment support

🎯 Or choose from main menu:
1-8 for specific services

What would you like to do? 😊`;
    
    simulateTyping(response, 500);
  };

  const handleSendMessage = () => {
    if (currentInput.trim()) {
      addMessage(currentInput, 'user');
      processUserInput(currentInput);
      setCurrentInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickActionButtons = [
    { icon: CreditCard, label: 'Airtime', action: '1' },
    { icon: Wifi, label: 'Data', action: '2' },
    { icon: BarChart, label: 'Balance', action: '3' },
    { icon: Gift, label: 'Gift', action: '4' },
    { icon: Activity, label: 'Manage', action: '5' },
    { icon: Globe, label: 'International', action: '6' }
  ];

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      {/* WhatsApp Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center relative">
            <MessageCircle className="w-7 h-7 text-green-600" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Divine Mobile AI</h3>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span>Online • Always here to help</span>
            </div>
          </div>
          <div className="flex gap-2">
            {isAuthenticated && (
              <Badge className="bg-yellow-500 text-yellow-900 text-xs">
                <Star className="w-3 h-3 mr-1" />
                VIP
              </Badge>
            )}
            <Badge className="bg-green-800 text-green-100 text-xs">
              AI Agent
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 bg-gray-50 border-b">
        <div className="grid grid-cols-6 gap-2">
          {quickActionButtons.map((btn, index) => (
            <Button
              key={index}
              size="sm"
              variant="outline"
              onClick={() => handleQuickAction(btn.action)}
              className="h-16 flex flex-col items-center justify-center p-1 text-xs hover:bg-blue-50 hover:border-blue-300"
            >
              <btn.icon className="w-4 h-4 mb-1" />
              <span>{btn.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-96 max-h-96">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              msg.type === 'user' 
                ? 'bg-green-600 text-white rounded-br-md shadow-md' 
                : 'bg-white text-gray-900 rounded-bl-md shadow-md border'
            }`}>
              <p className="text-sm whitespace-pre-line leading-relaxed">{msg.message}</p>
              <p className={`text-xs mt-2 ${
                msg.type === 'user' ? 'text-green-200' : 'text-gray-500'
              }`}>
                {msg.timestamp}
                {msg.type === 'user' ? (
                  <CheckCircle className="inline w-3 h-3 ml-1" />
                ) : null}
              </p>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 rounded-2xl rounded-bl-md shadow-md border px-4 py-3">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-xs text-gray-500 ml-2">AI typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
          />
          <Button 
            onClick={handleSendMessage}
            size="sm"
            className="rounded-full bg-green-600 hover:bg-green-700 w-12 h-12 p-0"
            disabled={!currentInput.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 bg-gray-50 border-t flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Shield className="w-3 h-3 text-green-600" />
          <span className="text-gray-600">End-to-end encrypted</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-blue-600" />
          <span className="text-gray-600">PCI DSS Compliant</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedWhatsAppAssistant;
