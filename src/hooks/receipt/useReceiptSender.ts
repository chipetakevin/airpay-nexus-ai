
import { supabase } from '@/integrations/supabase/client';

export const useReceiptSender = () => {
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

      // Enhanced WhatsApp handling for all user types
      if (data?.whatsappUrl) {
        // For customers and recipients, auto-open WhatsApp
        if (recipientType === 'customer' || recipientType === 'recipient') {
          setTimeout(() => {
            window.open(data.whatsappUrl, '_blank');
          }, 1500);
        }
        // For admin notifications, just log (admin gets email notification)
        else if (recipientType === 'admin') {
          console.log('📧 Admin notification sent for unknown recipient');
        }
      }

    } catch (error) {
      console.error(`❌ Error sending receipt to ${recipientType}:`, error);
    }
  };

  return {
    sendReceiptToCustomer
  };
};
