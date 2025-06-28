
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

      // Auto-redirect to WhatsApp with receipt ONLY after successful payment and for customer
      if (data?.whatsappUrl && recipientType === 'customer') {
        setTimeout(() => {
          window.open(data.whatsappUrl, '_blank');
        }, 2000);
      }

    } catch (error) {
      console.error(`❌ Error sending receipt to ${recipientType}:`, error);
    }
  };

  return {
    sendReceiptToCustomer
  };
};
