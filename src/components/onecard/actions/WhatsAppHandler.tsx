
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Transaction } from '../types/admin';
import { useToast } from '@/hooks/use-toast';
import { useComprehensiveReceipts } from '@/hooks/useComprehensiveReceipts';

interface WhatsAppHandlerProps {
  transaction?: Transaction;
}

export const WhatsAppHandler = ({ transaction }: WhatsAppHandlerProps) => {
  const { toast } = useToast();
  const { createComprehensiveReceipt, getCustomerInfo } = useComprehensiveReceipts();

  const handleWhatsAppReceipt = async () => {
    if (!transaction) {
      toast({
        title: "Error",
        description: "No transaction data available for WhatsApp receipt",
        variant: "destructive"
      });
      return;
    }

    try {
      const customerInfo = getCustomerInfo();
      
      // Convert transaction to cart items format
      const cartItems = [{
        network: transaction.network || 'DIVINE',
        amount: transaction.amount || 0,
        discountedPrice: transaction.discounted_price || transaction.amount || 0,
        dealType: transaction.transaction_type?.includes('airtime') ? 'airtime' : 'data'
      }];

      const profitSharing = {
        customerCashback: transaction.cashback_earned || transaction.cashbackEarned || 0,
        adminProfit: transaction.admin_fee || 0,
        vendorProfit: transaction.vendor_commission || 0
      };

      const transactionData = {
        ...transaction,
        transactionId: `AP${transaction.timestamp?.replace(/[^0-9]/g, '').slice(-8) || 'N/A'}`,
        status: 'completed',
        customer_phone: transaction.recipient_phone || customerInfo.phone
      };

      console.log('📱 Generating comprehensive WhatsApp receipt...');
      const result = await createComprehensiveReceipt(
        transactionData,
        customerInfo,
        cartItems,
        profitSharing,
        'OneCard Mobile Payment'
      );

      if (result?.success) {
        toast({
          title: "📱 WhatsApp Receipt Sent!",
          description: "Comprehensive receipt opened in WhatsApp",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error generating WhatsApp receipt:', error);
      toast({
        title: "WhatsApp Receipt Failed",
        description: "There was an error generating the WhatsApp receipt. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button 
      size="sm" 
      variant="outline" 
      onClick={handleWhatsAppReceipt}
      className="flex-1 text-xs px-2 py-1 h-8 min-w-0"
    >
      <MessageCircle className="w-3 h-3 mr-1 flex-shrink-0" />
      <span className="truncate">WhatsApp</span>
    </Button>
  );
};
