
import { ReceiptData, corsHeaders } from './types.ts';
import { formatWhatsAppMessage, generateWhatsAppUrl, createAdaptiveMessage } from './whatsapp-formatter.ts';
import { formatEmailReceipt } from './email-formatter.ts';

export const handleReceiptGeneration = async (receiptData: ReceiptData) => {
  // Generate adaptive WhatsApp message based on recipient type
  const adaptiveMessage = createAdaptiveMessage(receiptData);
  
  // Generate WhatsApp URLs for different recipients
  const customerWhatsappUrl = generateWhatsAppUrl(receiptData.customerPhone, adaptiveMessage);
  const recipientWhatsappUrl = receiptData.recipientPhone !== receiptData.customerPhone 
    ? generateWhatsAppUrl(receiptData.recipientPhone, adaptiveMessage)
    : customerWhatsappUrl;
  
  // Generate email receipt
  const emailReceipt = formatEmailReceipt(receiptData);
  
  // Enhanced logging for development
  console.log('Receipt generation completed:', {
    transactionId: receiptData.transactionId,
    customerPhone: receiptData.customerPhone,
    recipientPhone: receiptData.recipientPhone,
    purchaseType: receiptData.purchaseType,
    isUnknownRecipient: receiptData.isUnknownRecipient
  });

  // Store receipt record with enhanced data
  const receiptRecord = {
    id: receiptData.transactionId,
    customerEmail: receiptData.customerEmail,
    customerPhone: receiptData.customerPhone,
    recipientPhone: receiptData.recipientPhone,
    customerWhatsappUrl,
    recipientWhatsappUrl,
    adaptiveMessage,
    emailContent: emailReceipt,
    sentAt: new Date().toISOString(),
    status: 'sent',
    purchaseType: receiptData.purchaseType || 'self',
    isUnknownRecipient: receiptData.isUnknownRecipient || false
  };

  return {
    success: true,
    message: 'Receipt generated successfully',
    customerWhatsappUrl,
    recipientWhatsappUrl,
    receiptId: receiptData.transactionId,
    adaptiveMessage,
    purchaseType: receiptData.purchaseType || 'self'
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
