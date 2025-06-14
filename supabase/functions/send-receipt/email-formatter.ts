
import { ReceiptData } from './types.ts';

export const formatEmailReceipt = (data: ReceiptData): string => {
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
  <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 15px; margin-bottom: 20px; text-align: center;">
    <!-- Divinely Mobile Logo -->
    <div style="display: inline-block; position: relative; margin-bottom: 15px;">
      <div style="width: 60px; height: 60px; background: #34d399; border-radius: 50%; display: inline-block; position: relative; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
        <div style="width: 36px; height: 36px; background: #10b981; border-radius: 50%; position: absolute; top: 12px; left: 12px; display: flex; align-items: center; justify-content: center;">
          <span style="color: white; font-size: 12px; font-weight: bold;">Ø=Ün</span>
        </div>
      </div>
    </div>
    <h1 style="margin: 0; font-size: 28px; font-weight: bold;">DIVINELY MOBILE</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px; font-weight: bold;">📱 Digital Receipt</p>
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
    <div style="margin-bottom: 15px;">
      <!-- Footer Logo -->
      <div style="display: inline-block; position: relative;">
        <div style="width: 40px; height: 40px; background: #10b981; border-radius: 50%; display: inline-block; position: relative;">
          <div style="width: 24px; height: 24px; background: #34d399; border-radius: 50%; position: absolute; top: 8px; left: 8px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 8px; font-weight: bold;">Ø=Ün</span>
          </div>
        </div>
      </div>
    </div>
    <p style="color: #6b7280; margin-bottom: 10px;">Continue shopping for more great deals!</p>
    <a href="https://divinely-mobile.com" style="background: #10b981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">Shop Now</a>
  </div>

  <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
    <p>Need help? Contact us at support@divinely-mobile.com or +27 100 2827</p>
    <p>© 2024 Divinely Mobile. All rights reserved.</p>
    <p><em>Brought To You By OneCard Global Rewards Program</em></p>
  </div>
</body>
</html>`;
};
