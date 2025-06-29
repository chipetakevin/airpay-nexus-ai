
import { supabase } from '@/integrations/supabase/client';
import { useWhatsAppForwarding } from './useWhatsAppForwarding';

export const useReceiptSender = () => {
  const { handleDirectWhatsAppSend, handleIntelligentWhatsAppRedirect } = useWhatsAppForwarding();

  const sendReceiptToCustomer = async (receiptData: any, recipientType: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-receipt', {
        body: receiptData
      });

      if (error) {
        console.error(`❌ Error sending receipt to ${recipientType}:`, error);
        return;
      }

      console.log(`✅ Receipt sent successfully to ${recipientType}:`, data);

      // Enhanced WhatsApp handling - always try to send directly first
      if (data?.whatsappMessage) {
        const recipientPhone = receiptData.recipientPhone || receiptData.customerPhone;
        const senderPhone = receiptData.customerPhone;
        
        if (recipientType === 'recipient' && recipientPhone !== senderPhone) {
          // For third-party purchases, send to recipient first, then backup to sender
          handleIntelligentWhatsAppRedirect(data.whatsappMessage, recipientPhone, senderPhone);
        } else {
          // For self-purchases or customer receipts, send directly
          handleDirectWhatsAppSend(data.whatsappMessage, recipientPhone);
        }
      }

      // Fallback to URL method if message not available
      else if (data?.whatsappUrl) {
        setTimeout(() => {
          window.open(data.whatsappUrl, '_blank');
        }, 1500);
      }

    } catch (error) {
      console.error(`❌ Error sending receipt to ${recipientType}:`, error);
    }
  };

  const sendReceiptWithFallback = async (receiptData: any, recipientPhone: string, senderPhone: string) => {
    try {
      // Always try to send receipt directly to recipient first
      const recipientReceiptData = {
        ...receiptData,
        customerPhone: recipientPhone,
        recipientPhone: recipientPhone
      };

      const { data, error } = await supabase.functions.invoke('send-receipt', {
        body: recipientReceiptData
      });

      if (data?.whatsappMessage) {
        // Send direct to recipient with fallback to sender
        handleIntelligentWhatsAppRedirect(data.whatsappMessage, recipientPhone, senderPhone);
      }

      // Also send confirmation to sender
      if (recipientPhone !== senderPhone) {
        const senderReceiptData = {
          ...receiptData,
          customerPhone: senderPhone,
          recipientPhone: recipientPhone,
          purchaseType: 'sender_confirmation'
        };

        setTimeout(() => {
          sendReceiptToCustomer(senderReceiptData, 'customer');
        }, 2000);
      }

    } catch (error) {
      console.error('❌ Error in sendReceiptWithFallback:', error);
    }
  };

  return {
    sendReceiptToCustomer,
    sendReceiptWithFallback
  };
};
