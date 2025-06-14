
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Share2, MessageCircle, Copy, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const InviteFriendTab = () => {
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
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

  const copyMessage = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    
    toast({
      title: "Message copied!",
      description: "You can now paste it anywhere you want to share",
    });
  };

  const shareViaOtherPlatforms = () => {
    const message = generateWhatsAppMessage();
    const shareData = {
      title: 'Divinely Mobile - Best Mobile Deals',
      text: message,
      url: 'https://divinely-mobile.com'
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      copyMessage();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-full">
              <UserPlus className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Invite A Friend
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Share amazing mobile deals with friends and earn rewards together!
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              R10 Free Airtime
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
              Extra 10% Cashback
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Invite Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-pink-600" />
              Send WhatsApp Invitation
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
              <p className="text-xs text-gray-500 mt-1">
                Enter with or without country code
              </p>
            </div>

            <Button 
              onClick={sendWhatsAppInvite}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Send WhatsApp Invite
            </Button>
          </CardContent>
        </Card>

        {/* Quick Share Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-purple-600" />
              Quick Share Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm">
              Get the invitation message and share it however you prefer:
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={copyMessage}
                variant="outline"
                className="w-full border-pink-200 hover:border-pink-300 hover:bg-pink-50"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Message
              </Button>
              
              <Button 
                onClick={shareViaOtherPlatforms}
                variant="outline"
                className="w-full border-purple-200 hover:border-purple-300 hover:bg-purple-50"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share via Other Apps
              </Button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Share on social media, SMS, email, or any platform you prefer!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benefits Preview */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-center text-green-800">
            🎁 What Your Friends Get
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-semibold text-green-800">R10 Free Airtime</div>
              <div className="text-sm text-gray-600">On registration</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-green-800">10% Extra Cashback</div>
              <div className="text-sm text-gray-600">First purchase</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-green-800">Instant Deals</div>
              <div className="text-sm text-gray-600">VIP access</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteFriendTab;
