import { useToast } from '@/hooks/use-toast';

interface EmailReceiptData {
  receiptNo: string;
  transactionId: string;
  dateTime: string;
  customer: {
    name: string;
    mobile: string;
    email: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    network: string;
    type: string;
  }>;
  subtotal: number;
  discounts: number;
  totalPaid: number;
  paymentMethod: string;
  cashbackEarned: number;
  deliveryPhone: string;
  vendor?: {
    name: string;
    id: string;
    commission: number;
  };
}

export const useEmailReceiptService = () => {
  const { toast } = useToast();

  const generateDetailedEmailHTML = (data: EmailReceiptData): string => {
    const itemsRows = data.items.map(item => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; text-align: left;">${item.name.replace('DIVINELY', 'ADDEX-HUB')}</td>
        <td style="padding: 12px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; text-align: right;">R${item.unitPrice.toFixed(2)}</td>
        <td style="padding: 12px; text-align: right; font-weight: bold;">R${item.subtotal.toFixed(2)}</td>
      </tr>
    `).join('');

    const loyaltyPoints = Math.round(data.totalPaid * 2);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Addex-Hub Mobile - Detailed Receipt</title>
      </head>
      <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8fafc;">
        <div style="max-width: 700px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
          
          <!-- Enhanced Header -->
          <div style="background: linear-gradient(135deg, #75B8FA, #5A92D4, #4F7FBD); color: white; padding: 40px 30px; text-align: center; position: relative;">
            <div style="background: rgba(255,255,255,0.1); display: inline-flex; align-items: center; padding: 15px 25px; border-radius: 30px; margin-bottom: 20px; backdrop-filter: blur(10px);">
              <div style="width: 32px; height: 32px; background: white; border-radius: 8px; margin-right: 15px; display: flex; align-items: center; justify-content: center;">
                <span style="color: #75B8FA; font-size: 20px;">👑</span>
              </div>
              <span style="font-size: 20px; font-weight: bold; letter-spacing: 0.5px;">ADDEX-HUB MOBILE</span>
            </div>
            <h1 style="margin: 0; font-size: 32px; font-weight: bold; letter-spacing: -0.5px;">DETAILED RECEIPT</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Complete Transaction Record</p>
            
            <!-- Success Badge -->
            <div style="display: inline-flex; align-items: center; background: rgba(34, 197, 94, 0.9); padding: 8px 20px; border-radius: 20px; margin-top: 15px;">
              <span style="font-size: 14px; font-weight: bold;">✓ TRANSACTION SUCCESSFUL</span>
            </div>
          </div>

          <!-- Transaction Overview -->
          <div style="padding: 30px; background: linear-gradient(135deg, #f8fafc, #e2e8f0); border-bottom: 3px solid #75B8FA;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h3 style="color: #75B8FA; margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">📋 TRANSACTION DETAILS</h3>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Receipt No:</strong> ${data.receiptNo}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Transaction ID:</strong> ${data.transactionId}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Date & Time:</strong> ${data.dateTime}</p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h3 style="color: #75B8FA; margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">👤 CUSTOMER DETAILS</h3>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Name:</strong> ${data.customer.name}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Mobile:</strong> ${data.customer.mobile}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Email:</strong> ${data.customer.email}</p>
              </div>
            </div>
          </div>

          <!-- Service Provider Info -->
          <div style="padding: 20px 30px; background: white; border-bottom: 1px solid #e5e7eb;">
            <div style="background: linear-gradient(135deg, #f1f5f9, #e2e8f0); padding: 15px; border-radius: 8px; border-left: 4px solid #75B8FA;">
              <h3 style="color: #75B8FA; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">🏢 SERVICE PROVIDER</h3>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; font-size: 14px;">
                <span><strong>Provider:</strong> Addex-Hub Mobile</span>
                <span><strong>Website:</strong> www.addex-hub.co.za</span>
                <span><strong>Support:</strong> +27 100 2827</span>
              </div>
            </div>
          </div>

          <!-- Detailed Purchase Table -->
          <div style="padding: 30px;">
            <h3 style="color: #75B8FA; margin: 0 0 20px 0; font-size: 20px; font-weight: bold;">🛒 DETAILED PURCHASE BREAKDOWN</h3>
            <div style="overflow-x: auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                  <tr style="background: linear-gradient(135deg, #75B8FA, #5A92D4);">
                    <th style="padding: 15px 12px; text-align: left; font-weight: bold; color: white; font-size: 14px;">Service Description</th>
                    <th style="padding: 15px 12px; text-align: center; font-weight: bold; color: white; font-size: 14px;">Qty</th>
                    <th style="padding: 15px 12px; text-align: right; font-weight: bold; color: white; font-size: 14px;">Unit Price</th>
                    <th style="padding: 15px 12px; text-align: right; font-weight: bold; color: white; font-size: 14px;">Total</th>
                  </tr>
                </thead>
                <tbody style="background: white;">
                  ${itemsRows}
                </tbody>
              </table>
            </div>

            <!-- Enhanced Payment Summary -->
            <div style="background: linear-gradient(135deg, #22c55e, #16a34a); padding: 25px; border-radius: 12px; margin-top: 20px; color: white;">
              <h4 style="margin: 0 0 15px 0; font-size: 18px; font-weight: bold;">💳 COMPLETE PAYMENT BREAKDOWN</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
                    <span>Subtotal:</span>
                    <span>R${data.subtotal.toFixed(2)}</span>
                  </div>
                  ${data.discounts > 0 ? `
                  <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
                    <span>Discounts:</span>
                    <span>-R${data.discounts.toFixed(2)}</span>
                  </div>` : ''}
                  <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; border-top: 2px solid rgba(255,255,255,0.3); padding-top: 10px; margin-top: 10px;">
                    <span>TOTAL PAID:</span>
                    <span>R${data.totalPaid.toFixed(2)}</span>
                  </div>
                </div>
                <div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
                    <span>Payment Method:</span>
                    <span>${data.paymentMethod}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
                    <span>Cashback Earned:</span>
                    <span>R${data.cashbackEarned.toFixed(2)}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 14px;">
                    <span>Loyalty Points:</span>
                    <span>+${loyaltyPoints} pts</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Status and Delivery -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
              <div style="background: #dcfce7; padding: 20px; border-radius: 12px; border-left: 4px solid #22c55e;">
                <h4 style="margin: 0 0 10px 0; color: #166534; font-size: 16px; font-weight: bold;">✅ DELIVERY STATUS</h4>
                <p style="margin: 0; font-size: 14px; color: #166534; font-weight: bold;">Successfully Delivered</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #166534;">To: ${data.deliveryPhone}</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #166534;">Status: Instantly Processed ⚡</p>
              </div>
              <div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b;">
                <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px; font-weight: bold;">🎁 REWARDS SUMMARY</h4>
                <p style="margin: 0; font-size: 16px; font-weight: bold; color: #92400e;">R${data.cashbackEarned.toFixed(2)} Cashback</p>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #92400e;">+${loyaltyPoints} Loyalty Points</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #92400e;">VIP Status: Active</p>
              </div>
            </div>

            ${data.vendor ? `
            <!-- Agent Information -->
            <div style="background: #ede9fe; padding: 20px; border-radius: 12px; margin-top: 20px; border-left: 4px solid #7c3aed;">
              <h4 style="margin: 0 0 15px 0; color: #6b21a8; font-size: 18px; font-weight: bold;">👔 AGENT INFORMATION</h4>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                <div>
                  <p style="margin: 0; font-size: 14px; color: #6b21a8;"><strong>Agent Name:</strong></p>
                  <p style="margin: 5px 0; font-size: 14px; color: #6b21a8;">${data.vendor.name}</p>
                </div>
                <div>
                  <p style="margin: 0; font-size: 14px; color: #6b21a8;"><strong>Agent ID:</strong></p>
                  <p style="margin: 5px 0; font-size: 14px; color: #6b21a8;">${data.vendor.id}</p>
                </div>
                <div>
                  <p style="margin: 0; font-size: 14px; color: #6b21a8;"><strong>Commission:</strong></p>
                  <p style="margin: 5px 0; font-size: 14px; color: #6b21a8; font-weight: bold;">R${data.vendor.commission.toFixed(2)}</p>
                </div>
              </div>
            </div>` : ''}
          </div>

          <!-- Enhanced Footer -->
          <div style="background: linear-gradient(135deg, #1f2937, #111827); color: white; padding: 30px; text-align: center;">
            <h3 style="margin: 0 0 15px 0; color: white; font-size: 20px;">Thank you for choosing Addex-Hub Mobile!</h3>
            <p style="margin: 0 0 20px 0; opacity: 0.8; font-style: italic; font-size: 16px;">⚡ Fast • 🔒 Secure • 🎯 Reliable</p>
            
            <div style="border-top: 1px solid #374151; padding-top: 20px; margin-top: 20px;">
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 15px;">
                <div>
                  <p style="margin: 0; font-size: 14px; opacity: 0.7;">📋 Keep for Records</p>
                </div>
                <div>
                  <p style="margin: 0; font-size: 14px; opacity: 0.7;">📞 24/7 Support</p>
                  <p style="margin: 0; font-size: 12px; opacity: 0.6;">+27 100 2827</p>
                </div>
                <div>
                  <p style="margin: 0; font-size: 14px; opacity: 0.7;">🌐 Website</p>
                  <p style="margin: 0; font-size: 12px; opacity: 0.6;">www.addex-hub.co.za</p>
                </div>
              </div>
              <p style="margin: 0; font-size: 11px; opacity: 0.5;">Digital Verification: ${new Date().toISOString()} | Platform: Addex-Hub Secure</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const sendDetailedEmailReceipt = async (receiptData: EmailReceiptData) => {
    try {
      // Simulate email sending (in a real app, this would call your email service)
      const emailHTML = generateDetailedEmailHTML(receiptData);
      
      // Store email receipt locally for demo purposes
      const emailReceipt = {
        to: receiptData.customer.email,
        subject: `Addex-Hub Mobile - Detailed Receipt #${receiptData.receiptNo}`,
        html: emailHTML,
        sentAt: new Date().toISOString(),
        receiptNo: receiptData.receiptNo,
        transactionId: receiptData.transactionId
      };

      const existingEmails = JSON.parse(localStorage.getItem('emailReceipts') || '[]');
      existingEmails.push(emailReceipt);
      localStorage.setItem('emailReceipts', JSON.stringify(existingEmails));

      console.log('📧 Detailed email receipt prepared for:', receiptData.customer.email);
      
      toast({
        title: "📧 Detailed Receipt Emailed!",
        description: `Comprehensive receipt sent to ${receiptData.customer.email}`,
        duration: 4000
      });

      return { success: true, emailHTML };
    } catch (error) {
      console.error('Error sending detailed email receipt:', error);
      toast({
        title: "Email Receipt Failed",
        description: "Unable to send detailed email receipt",
        variant: "destructive"
      });
      return { success: false };
    }
  };

  return {
    generateDetailedEmailHTML,
    sendDetailedEmailReceipt
  };
};