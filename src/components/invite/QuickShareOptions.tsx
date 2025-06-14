
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const QuickShareOptions = () => {
  const { currentUser } = useMobileAuth();
  const { toast } = useToast();

  const generateWhatsAppMessage = () => {
    const referrerName = currentUser?.firstName || 'Your Friend';
    
    const message = `🔥 *Hey Friend!* 🔥

💎 *DIVINELY MOBILE* - South Africa's #1 Mobile Deals Platform! 📱

🎯 *EXCLUSIVE INVITATION FROM ${referrerName.toUpperCase()}*

🚀 *WHY YOU'LL LOVE IT:*
✅ Up to 50% OFF Airtime & Data
✅ Instant delivery in 30 seconds
✅ All Major Networks (MTN, Vodacom, Cell C, Telkom)
✅ WhatsApp Shopping - No app needed!
✅ Cashback on every purchase
✅ 24/7 AI Assistant support

🎁 *SPECIAL OFFER FOR NEW CUSTOMERS:*
💰 R10 FREE Airtime when you register
🎯 Extra 10% Cashback on first purchase
🔥 VIP access to flash deals

💬 *START SHOPPING NOW:*
Just send "Hi" to this WhatsApp number and our AI will help you get the best deals instantly!

📲 WhatsApp: +27 83 246 6539
🌐 Website: https://divinely-mobile.com

*Join thousands of satisfied customers saving money every day!* 🌟

#DivinelyMobile #BestDeals #SaveMoney #SouthAfrica`;

    return message;
  };

  const generateGroupBroadcastMessage = () => {
    return `🚨 *DIVINELY MOBILE MOVEMENT* 🚨

🔥 *EXPLOSIVE DEALS ALERT!* 🔥

📱 *NEW FLASH DEALS AVAILABLE NOW:*
• MTN Airtime: Up to 45% OFF
• Vodacom Data: Starting from R15
• Cell C Bundles: Massive savings
• Telkom Deals: Limited time only

⚡ *INSTANT BENEFITS:*
✅ 30-second delivery
✅ AI-powered shopping via WhatsApp
✅ Cashback on every purchase
✅ No app download required

🎁 *JOIN THE MOVEMENT:*
💬 WhatsApp: +27 83 246 6539
🌐 https://divinely-mobile.com

*React with 🔥 if you want these deals!*

#DivinelyMobile #SouthAfrica #BestDeals #Savings`;
  };

  const copyMessage = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    
    toast({
      title: "Message copied!",
      description: "You can now paste it anywhere you want to share",
    });
  };

  const copyGroupMessage = () => {
    const message = generateGroupBroadcastMessage();
    navigator.clipboard.writeText(message);
    
    toast({
      title: "Group message copied!",
      description: "Ready to paste in WhatsApp groups",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-green-600" />
          Quick Share Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm">
          Get messages ready for sharing on any platform:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button 
            onClick={copyMessage}
            variant="outline"
            className="border-green-200 hover:border-green-300 hover:bg-green-50"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Personal Message
          </Button>
          
          <Button 
            onClick={copyGroupMessage}
            variant="outline"
            className="border-blue-200 hover:border-blue-300 hover:bg-blue-50"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Group Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickShareOptions;
