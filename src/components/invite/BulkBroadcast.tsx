
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BulkBroadcast = () => {
  const [broadcastNumbers, setBroadcastNumbers] = useState('');
  const { toast } = useToast();

  const generateBulkBroadcastMessage = () => {
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

  const sendBulkBroadcast = () => {
    if (!broadcastNumbers.trim()) {
      toast({
        title: "Phone numbers required",
        description: "Please enter phone numbers for bulk broadcast",
        variant: "destructive"
      });
      return;
    }

    const message = generateBulkBroadcastMessage();
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

  return (
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
  );
};

export default BulkBroadcast;
