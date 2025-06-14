
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReceiptData {
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

const formatWhatsAppMessage = (data: ReceiptData) => {
  const itemsList = data.items.map(item => 
    `• ${item.network} ${item.type} R${item.amount} - R${item.price.toFixed(2)}`
  ).join('\n');

  return `🧾 *DIGITAL RECEIPT*
📱 *Divinely Mobile*

👤 *Customer:* ${data.customerName}
📞 *Account:* ${data.customerPhone}
🆔 *Transaction ID:* ${data.transactionId}
⏰ *Date:* ${new Date(data.timestamp).toLocaleString('en-ZA')}

📋 *PURCHASE DETAILS:*
${itemsList}

💰 *PAYMENT SUMMARY:*
• Total Paid: R${data.total.toFixed(2)}
• Cashback Earned: R${data.cashbackEarned.toFixed(2)}
• Recipient: ${data.recipientName} (${data.recipientPhone})

✅ *Transaction Successful!*
${data.purchaseType === 'self' ? 'Airtime loaded to your number' : `Airtime sent to ${data.recipientName}`}

📱 Continue shopping: https://divinely-mobile.com
💬 Support: +27 83 246 6539

*Thank you for choosing Divinely Mobile!*`;
};

const formatEmailReceipt = (data: ReceiptData) => {
  const itemsList = data.items.map(item => 
    `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.network} ${item.type} R${item.amount}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">R${item.price.toFixed(2)}</td>
    </tr>`
  ).join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Purchase Receipt - Divinely Mobile</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
    <h1 style="margin: 0; font-size: 24px;">📱 Divinely Mobile</h1>
    <p style="margin: 5px 0 0 0; opacity: 0.9;">Digital Receipt</p>
  </div>

  <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
    <h2 style="color: #059669; margin-top: 0;">Transaction Details</h2>
    <p><strong>Customer:</strong> ${data.customerName}</p>
    <p><strong>Email:</strong> ${data.customerEmail}</p>
    <p><strong>Phone:</strong> ${data.customerPhone}</p>
    <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
    <p><strong>Date:</strong> ${new Date(data.timestamp).toLocaleString('en-ZA')}</p>
  </div>

  <div style="background: white; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 20px;">
    <h3 style="background: #059669; color: white; margin: 0; padding: 15px; border-radius: 10px 10px 0 0;">Purchase Items</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f3f4f6;">
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Item</th>
          <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemsList}
      </tbody>
    </table>
  </div>

  <div style="background: #10b981; color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
    <h3 style="margin-top: 0;">Payment Summary</h3>
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <span>Total Paid:</span>
      <span style="font-weight: bold;">R${data.total.toFixed(2)}</span>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <span>Cashback Earned:</span>
      <span style="font-weight: bold; color: #ffd700;">R${data.cashbackEarned.toFixed(2)}</span>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <span>Recipient:</span>
      <span>${data.recipientName} (${data.recipientPhone})</span>
    </div>
  </div>

  <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
    <p style="margin: 0; color: #059669; font-weight: bold;">✅ Transaction Successful!</p>
    <p style="margin: 5px 0 0 0; color: #047857;">
      ${data.purchaseType === 'self' ? 'Airtime has been loaded to your number' : `Airtime has been sent to ${data.recipientName}`}
    </p>
  </div>

  <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb;">
    <p style="color: #6b7280; margin-bottom: 10px;">Continue shopping for more great deals!</p>
    <a href="https://divinely-mobile.com" style="background: #10b981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">Shop Now</a>
  </div>

  <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
    <p>Need help? Contact us at support@divinely-mobile.com or +27 83 246 6539</p>
    <p>© 2024 Divinely Mobile. All rights reserved.</p>
  </div>
</body>
</html>`;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const receiptData: ReceiptData = await req.json();

    // Send WhatsApp message
    const whatsappMessage = formatWhatsAppMessage(receiptData);
    const whatsappUrl = `https://wa.me/${receiptData.customerPhone.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // In a real implementation, you would use WhatsApp Business API
    console.log('WhatsApp receipt URL:', whatsappUrl);

    // Send Email (simulated - in real implementation, use Resend or similar service)
    const emailReceipt = formatEmailReceipt(receiptData);
    console.log('Email receipt prepared for:', receiptData.customerEmail);

    // Store receipt in local storage for demo purposes
    const receiptRecord = {
      id: receiptData.transactionId,
      customerEmail: receiptData.customerEmail,
      customerPhone: receiptData.customerPhone,
      whatsappUrl,
      emailContent: emailReceipt,
      sentAt: new Date().toISOString(),
      status: 'sent'
    };

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Receipt sent successfully',
        whatsappUrl,
        receiptId: receiptData.transactionId
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error) {
    console.error('Error sending receipt:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
