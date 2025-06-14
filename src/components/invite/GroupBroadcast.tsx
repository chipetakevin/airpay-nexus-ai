
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GroupBroadcast = () => {
  const [groupMessage, setGroupMessage] = useState('');
  const { toast } = useToast();

  const generateGroupBroadcastMessage = () => {
    const customMessage = groupMessage || '';
    
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

${customMessage ? `\n📢 *SPECIAL MESSAGE:*\n${customMessage}` : ''}

*React with 🔥 if you want these deals!*

#DivinelyMobile #SouthAfrica #BestDeals #Savings`;
  };

  const sendGroupBroadcast = () => {
    const message = generateGroupBroadcastMessage();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Group broadcast ready!",
      description: "WhatsApp opened with your broadcast message",
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
          <Users className="w-5 h-5 text-purple-600" />
          WhatsApp Group Broadcast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="groupMessage">Custom Group Message (Optional)</Label>
          <Textarea
            id="groupMessage"
            value={groupMessage}
            onChange={(e) => setGroupMessage(e.target.value)}
            placeholder="Add a custom message for your group..."
            className="mt-1 h-20"
          />
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={sendGroupBroadcast}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
          >
            <Users className="w-4 h-4 mr-2" />
            Send Group Broadcast
          </Button>
          
          <Button 
            onClick={copyGroupMessage}
            variant="outline"
            className="w-full border-purple-200 hover:border-purple-300 hover:bg-purple-50"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Group Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupBroadcast;
