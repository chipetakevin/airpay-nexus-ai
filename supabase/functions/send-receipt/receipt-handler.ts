
import { ReceiptData, corsHeaders } from './types.ts';
import { formatWhatsAppMessage } from './whatsapp-formatter.ts';
import { formatEmailReceipt } from './email-formatter.ts';

export const handleReceiptGeneration = async (receiptData: ReceiptData) => {
  // Generate WhatsApp message
  const whatsappMessage = formatWhatsAppMessage(receiptData);
  const whatsappUrl = `https://wa.me/${receiptData.customerPhone.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
  
  // Generate email receipt
  const emailReceipt = formatEmailReceipt(receiptData);
  
  // Log for demo purposes (in real implementation, use WhatsApp Business API and email service)
  console.log('WhatsApp receipt URL:', whatsappUrl);
  console.log('Email receipt prepared for:', receiptData.customerEmail);

  // Store receipt record for demo purposes
  const receiptRecord = {
    id: receiptData.transactionId,
    customerEmail: receiptData.customerEmail,
    customerPhone: receiptData.customerPhone,
    whatsappUrl,
    emailContent: emailReceipt,
    sentAt: new Date().toISOString(),
    status: 'sent'
  };

  return {
    success: true,
    message: 'Receipt sent successfully',
    whatsappUrl,
    receiptId: receiptData.transactionId
  };
};

export const handleError = (error: Error) => {
  console.error('Error sending receipt:', error);
  return new Response(
    JSON.stringify({ error: error.message }),
    {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    }
  );
};
