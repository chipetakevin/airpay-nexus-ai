
export interface ReceiptData {
  customerName?: string;
  customerEmail?: string;
  customerPhone: string;
  transactionId: string;
  items: Array<{
    network: string;
    amount: number;
    price: number;
    type: string;
  }>;
  total: number;
  cashbackEarned?: number;
  recipientPhone: string;
  recipientName?: string;
  timestamp: string;
  purchaseType?: 'self' | 'sender' | 'recipient' | 'admin_notification';
  isUnknownRecipient?: boolean;
}

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
