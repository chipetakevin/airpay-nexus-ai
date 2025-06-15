
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Transaction } from '../types/admin';
import { useToast } from '@/hooks/use-toast';

interface WhatsAppHandlerProps {
  transaction?: Transaction;
}

export const WhatsAppHandler = ({ transaction }: WhatsAppHandlerProps) => {
  const { toast } = useToast();

  const handleWhatsAppSend = () => {
    if (!transaction) {
      toast({
        title: "Error",
        description: "No transaction data available for WhatsApp",
        variant: "destructive"
      });
      return;
    }

    try {
      // Format transaction details for WhatsApp with modern styling
      const message = encodeURIComponent(
        `🧾 *DIVINELY MOBILE RECEIPT*\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📱 *Transaction ID:* AP${transaction.timestamp?.replace(/[^0-9]/g, '').slice(-8) || 'N/A'}\n` +
        `🌐 *Network:* ${transaction.network || 'N/A'}\n` +
        `💰 *Amount:* R${transaction.amount?.toFixed(2) || '0.00'}\n` +
        `👤 *Recipient:* ${transaction.recipientName || transaction.recipient_name || 'N/A'}\n` +
        `🎁 *Cashback:* R${(transaction.cashbackEarned || transaction.cashback_earned || 0).toFixed(2)}\n` +
        `📅 *Date:* ${transaction.timestamp ? new Date(transaction.timestamp).toLocaleDateString('en-ZA') : 'N/A'}\n` +
        `✅ *Status:* COMPLETED\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `Thank you for choosing *Divinely Mobile*! 🙏\n` +
        `_OneCard Platform - Your trusted mobile partner_`
      );
      
      // Use a default WhatsApp number for demo purposes
      const phoneNumber = '27832466539';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');

      toast({
        title: "📱 WhatsApp Opened",
        description: "Professional WhatsApp receipt ready to send",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error preparing WhatsApp message:', error);
      toast({
        title: "WhatsApp Error",
        description: "There was an error preparing the WhatsApp message. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button 
      size="sm" 
      variant="outline" 
      onClick={handleWhatsAppSend}
      className="flex-1 text-xs px-2 py-1 h-8 min-w-0 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
    >
      <MessageCircle className="w-3 h-3 mr-1 flex-shrink-0" />
      <span className="truncate">WhatsApp</span>
    </Button>
  );
};
