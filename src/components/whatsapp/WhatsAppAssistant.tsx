import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, Send, Phone, CreditCard, 
  Activity, Gift, Globe, BarChart, 
  Shield, CheckCircle, AlertTriangle, Wifi
} from 'lucide-react';

const WhatsAppAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: `👋 Welcome to Divinely Mobile!
Your one-stop shop for airtime & data right here in WhatsApp!

🌟 What can I help you with today?
1️⃣ Buy Airtime
2️⃣ Purchase Data Bundles  
3️⃣ Check Balance
4️⃣ Gift Airtime/Data
5️⃣ Manage Bundles
6️⃣ International Airtime

Simply reply with a number or tell me what you need! 💬`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [conversationState, setConversationState] = useState('greeting');
  const [activeSelection, setActiveSelection] = useState(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const addMessage = (message: string, type: 'user' | 'bot') => {
    const newMessage = {
      id: messages.length + 1,
      type,
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const quickPurchaseOptions = [
    {
      id: 'airtime',
      title: 'Buy Airtime',
      icon: <CreditCard className="w-4 h-4" />,
      color: 'bg-green-600 hover:bg-green-700',
      amounts: ['R10', 'R20', 'R50', 'R100'],
      action: () => handleQuickAction('1')
    },
    {
      id: 'data',
      title: 'Data Bundles',
      icon: <Wifi className="w-4 h-4" />,
      color: 'bg-blue-600 hover:bg-blue-700',
      amounts: ['1GB', '2GB', '5GB', '10GB'],
      action: () => handleQuickAction('2')
    },
    {
      id: 'balance',
      title: 'Check Balance',
      icon: <BarChart className="w-4 h-4" />,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => handleQuickAction('3')
    },
    {
      id: 'gift',
      title: 'Gift Services',
      icon: <Gift className="w-4 h-4" />,
      color: 'bg-orange-600 hover:bg-orange-700',
      amounts: ['R25', 'R50', 'R100', '2GB'],
      action: () => handleQuickAction('4')
    },
    {
      id: 'manage',
      title: 'Manage Bundles',
      icon: <Activity className="w-4 h-4" />,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      action: () => handleQuickAction('5')
    },
    {
      id: 'international',
      title: 'International',
      icon: <Globe className="w-4 h-4" />,
      color: 'bg-teal-600 hover:bg-teal-700',
      action: () => handleQuickAction('6')
    }
  ];

  const handleQuickAction = (action: string) => {
    addMessage(action, 'user');
    processUserInput(action);
  };

  const handleQuickPurchase = (optionId: string, amount?: string) => {
    const option = quickPurchaseOptions.find(opt => opt.id === optionId);
    if (!option) return;

    const message = amount 
      ? `Quick ${option.title}: ${amount}`
      : `Quick ${option.title}`;
    
    addMessage(message, 'user');
    
    // Process the quick purchase
    if (amount) {
      const response = `✅ Processing ${option.title} - ${amount}
      
Please confirm:
📱 Phone number: [Your number]
💰 Amount: ${amount}
      
Reply "CONFIRM" to proceed or provide your phone number.`;
      setTimeout(() => addMessage(response, 'bot'), 500);
    } else {
      processUserInput(optionId);
    }
    
    setActiveSelection(null);
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
    } else if (lowerInput.includes('help')) {
      handleHelpFlow();
    } else {
      handleGeneralResponse(input);
    }
  };

  const handleAirtimeFlow = () => {
    setConversationState('airtime');
    const response = `💰 AIRTIME PURCHASE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 REQUIRED INFORMATION:

📱 Phone Number:
   • Your number OR recipient's number
   • Format: 082 123 4567 or 0821234567

💵 Amount:
   • Minimum: R5
   • Maximum: R500
   • Popular: R10, R20, R50, R100

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ QUICK EXAMPLES:

🔸 "Buy R20 airtime for 0821234567"
🔸 "R50 airtime for me"
🔸 "Airtime R100 for 0827654321"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 Just type your request above!`;
    
    setTimeout(() => addMessage(response, 'bot'), 500);
  };

  const handleDataFlow = () => {
    setConversationState('data');
    const response = `📊 DATA BUNDLES AVAILABLE
Choose your bundle:

🔥 POPULAR BUNDLES:
1️⃣ 1GB - R29 (30 days)
2️⃣ 2GB - R49 (30 days)
3️⃣ 5GB - R99 (30 days)
4️⃣ 10GB - R149 (30 days)

📱 WHATSAPP BUNDLES:
5️⃣ WhatsApp 200MB - R9 (7 days)
6️⃣ WhatsApp 500MB - R19 (30 days)

💬 Reply with number or say "Show all bundles" for complete list`;
    
    setTimeout(() => addMessage(response, 'bot'), 500);
  };

  const handleBalanceFlow = () => {
    const response = `📊 BALANCE CHECK
Please provide the phone number to check:
📱 Number: [Phone number]

Or simply say "Check my balance" if using your registered number.`;
    
    setTimeout(() => addMessage(response, 'bot'), 500);
  };

  const handleGiftFlow = () => {
    const response = `🎁 GIFT AIRTIME/DATA
Please provide:
👤 Recipient's number: [Phone number]
🎯 Gift type: [Airtime amount or Data bundle]
💌 Optional message: [Personal message]

Example: "Gift R50 airtime to 0827654321 with message Happy Birthday!"`;
    
    setTimeout(() => addMessage(response, 'bot'), 500);
  };

  const handleManageFlow = () => {
    const response = `📱 BUNDLE MANAGEMENT
Current active bundles:

🔄 Active Data:
• 2GB expires in 15 days
• WhatsApp 500MB expires in 25 days

⚡ QUICK ACTIONS:
1️⃣ Renew expiring bundles
2️⃣ Upgrade current bundle
3️⃣ Add extra data
4️⃣ Set auto-renewal

What would you like to do?`;
    
    setTimeout(() => addMessage(response, 'bot'), 500);
  };

  const handleInternationalFlow = () => {
    const response = `🌍 INTERNATIONAL AIRTIME
Available countries:
🇿🇼 Zimbabwe | 🇧🇼 Botswana | 🇱🇸 Lesotho
🇸🇿 Swaziland | 🇲🇿 Mozambique | 🇿🇲 Zambia

Enter: Country + Phone number + Amount
Example: "Zimbabwe 0912345678 $10"`;
    
    setTimeout(() => addMessage(response, 'bot'), 500);
  };

  const handleHelpFlow = () => {
    const response = `🆘 HELP & QUICK COMMANDS

⚡ QUICK COMMANDS:
• "Balance" → Instant balance check
• "Data" → Show data bundles
• "Airtime R[amount]" → Quick airtime purchase
• "Gift [amount] to [number]" → Quick gifting
• "History" → Show recent transactions

🔒 SECURITY NOTICE
• Your data is protected with bank-grade encryption
• We never store your payment details
• All transactions are logged for your security
• Report suspicious activity immediately

📞 Need human support? Type "Support" to connect with our team!`;
    
    setTimeout(() => addMessage(response, 'bot'), 500);
  };

  const handleGeneralResponse = (input: string) => {
    const response = `I understand you said "${input}". 

I can help you with:
• Airtime purchases
• Data bundles
• Balance checks
• Gifting services
• Bundle management
• International airtime

Just tell me what you need, or type a number from the main menu! 😊`;
    
    setTimeout(() => addMessage(response, 'bot'), 500);
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

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white relative">
      {/* WhatsApp Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex items-center gap-3 sticky top-0 z-10">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold">Divinely Mobile Assistant</h3>
          <p className="text-xs opacity-90">Online • Always here to help</p>
        </div>
        <Badge className="ml-auto bg-green-800">AI Agent</Badge>
      </div>

      {/* Enhanced Quick Purchase Panel - Always Visible */}
      <div className="bg-gray-50 border-b p-3 sticky top-[88px] z-10">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {quickPurchaseOptions.map((option) => (
            <div key={option.id} className="relative">
              <Button
                size="sm"
                onClick={() => setActiveSelection(activeSelection === option.id ? null : option.id)}
                className={`w-full h-12 text-xs flex flex-col items-center justify-center ${option.color} text-white transition-all duration-200 ${
                  activeSelection === option.id ? 'scale-105 shadow-lg' : ''
                }`}
              >
                {option.icon}
                <span className="text-xs mt-1 leading-none">{option.title.split(' ')[0]}</span>
              </Button>
              
              {/* Quick Amount Selection */}
              {activeSelection === option.id && option.amounts && (
                <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg p-2 mt-1 z-20">
                  <div className="text-xs font-medium text-gray-700 mb-2">Quick Select:</div>
                  <div className="grid grid-cols-2 gap-1">
                    {option.amounts.map((amount) => (
                      <Button
                        key={amount}
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickPurchase(option.id, amount)}
                        className="text-xs h-8 hover:bg-green-50 hover:border-green-300"
                      >
                        {amount}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Traditional Quick Actions */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleQuickAction('1')}
            className="whitespace-nowrap flex items-center gap-1"
          >
            <CreditCard className="w-3 h-3" />
            Airtime
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleQuickAction('2')}
            className="whitespace-nowrap flex items-center gap-1"
          >
            <Activity className="w-3 h-3" />
            Data
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleQuickAction('3')}
            className="whitespace-nowrap flex items-center gap-1"
          >
            <BarChart className="w-3 h-3" />
            Balance
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleQuickAction('4')}
            className="whitespace-nowrap flex items-center gap-1"
          >
            <Gift className="w-3 h-3" />
            Gift
          </Button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100" style={{ paddingTop: '120px' }}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.type === 'user' 
                ? 'bg-green-600 text-white rounded-br-none' 
                : 'bg-white text-gray-900 rounded-bl-none shadow'
            }`}>
              <p className="text-sm whitespace-pre-line">{msg.message}</p>
              <p className={`text-xs mt-1 ${
                msg.type === 'user' ? 'text-green-200' : 'text-gray-500'
              }`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t flex items-center gap-2 sticky bottom-0">
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Button 
          onClick={handleSendMessage}
          size="sm"
          className="rounded-full bg-green-600 hover:bg-green-700"
          disabled={!currentInput.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 bg-gray-50 border-t flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-600" />
          <span className="text-gray-600">Secure & Encrypted</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-3 h-3 text-blue-600" />
          <span className="text-gray-600">PCI Compliant</span>
        </div>
      </div>

      {/* Overlay to close quick selection when clicking outside */}
      {activeSelection && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setActiveSelection(null)}
        />
      )}
    </div>
  );
};

export default WhatsAppAssistant;
