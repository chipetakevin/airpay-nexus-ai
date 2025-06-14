
export interface ReceiptData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  recipientPhone: string;
  recipientName: string;
  transactionId: string;
  items: Array<{
    network: string;
    amount: number;
    price: number;
    type: string;
  }>;
  total: number;
  cashbackEarned: number;
  timestamp: string;
  purchaseType: 'self' | 'other';
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
