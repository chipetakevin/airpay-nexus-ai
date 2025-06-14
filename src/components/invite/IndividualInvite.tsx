
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const IndividualInvite = () => {
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

  return (
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
  );
};

export default IndividualInvite;
