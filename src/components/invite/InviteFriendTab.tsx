
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { UserPlus, Share2, MessageCircle, Copy, Sparkles, Users, Radio, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const InviteFriendTab = () => {
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
  const [groupMessage, setGroupMessage] = useState('');
  const [broadcastNumbers, setBroadcastNumbers] = useState('');
  const { currentUser } = useMobileAuth();
  const { toast } = useToast();

  const generateWhatsAppMessage = () => {
    const friendNameToUse = friendName || 'Friend';
    const referrerName = currentUser?.firstName || 'Your Friend';
    
    const message = `🔥 *Hey ${friendNameToUse}!* 🔥

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
    const customMessage = groupMessage || generateWhatsAppMessage();
    
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

  const sendWhatsAppInvite = () => {
    if (!friendPhone) {
      toast({
        title: "Phone number required",
        description: "Please enter your friend's phone number",
        variant: "destructive"
      });
      return;
    }

    const message = generateWhatsAppMessage();
    const cleanPhone = friendPhone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('27') ? cleanPhone : `27${cleanPhone.replace(/^0/, '')}`;
    
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp opened!",
      description: `Invitation message ready to send to ${friendName || 'your friend'}`,
    });
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

  const sendBulkBroadcast = () => {
    if (!broadcastNumbers.trim()) {
      toast({
        title: "Phone numbers required",
        description: "Please enter phone numbers for bulk broadcast",
        variant: "destructive"
      });
      return;
    }

    const message = generateGroupBroadcastMessage();
    const numbers = broadcastNumbers.split('\n').filter(num => num.trim());
    
    numbers.forEach((number, index) => {
      setTimeout(() => {
        const cleanPhone = number.trim().replace(/\D/g, '');
        const formattedPhone = cleanPhone.startsWith('27') ? cleanPhone : `27${cleanPhone.replace(/^0/, '')}`;
        const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      }, index * 1000);
    });
    
    toast({
      title: "Bulk broadcast started!",
      description: `Sending to ${numbers.length} numbers`,
    });
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
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-full">
              <Radio className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Divinely Mobile Broadcasting Center
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Spread the word about amazing mobile deals to groups and individuals!
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              Group Broadcasts
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
              Individual Invites
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Broadcasting Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Individual Invite */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-pink-600" />
              Individual Friend Invite
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="friendName">Friend's Name (Optional)</Label>
              <Input
                id="friendName"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                placeholder="Enter your friend's name"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="friendPhone">Friend's Phone Number *</Label>
              <Input
                id="friendPhone"
                value={friendPhone}
                onChange={(e) => setFriendPhone(e.target.value)}
                placeholder="083 123 4567 or +27831234567"
                className="mt-1"
                type="tel"
              />
            </div>

            <Button 
              onClick={sendWhatsAppInvite}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Send Personal Invite
            </Button>
          </CardContent>
        </Card>

        {/* Group Broadcast */}
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
      </div>

      {/* Bulk Broadcast Section */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Send className="w-5 h-5" />
            Bulk WhatsApp Broadcast
          </CardTitle>
          <p className="text-blue-600 text-sm">
            Send to multiple numbers at once (one per line)
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="broadcastNumbers">Phone Numbers (One per line)</Label>
            <Textarea
              id="broadcastNumbers"
              value={broadcastNumbers}
              onChange={(e) => setBroadcastNumbers(e.target.value)}
              placeholder="083 123 4567&#10;084 567 8901&#10;+27835551234"
              className="mt-1 h-32"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter phone numbers one per line. Include country code or local format.
            </p>
          </div>

          <Button 
            onClick={sendBulkBroadcast}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
          >
            <Send className="w-4 h-4 mr-2" />
            Start Bulk Broadcast
          </Button>
        </CardContent>
      </Card>

      {/* Quick Share Options */}
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

      {/* Benefits Preview */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-center text-green-800">
            🎁 What Your Network Gets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-semibold text-green-800">R10 Free Airtime</div>
              <div className="text-sm text-gray-600">New member bonus</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-green-800">10% Extra Cashback</div>
              <div className="text-sm text-gray-600">First purchase reward</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-green-800">Instant Access</div>
              <div className="text-sm text-gray-600">VIP deal notifications</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteFriendTab;
