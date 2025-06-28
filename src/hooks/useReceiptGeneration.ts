
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useReceiptStorage } from './useReceiptStorage';

export const useReceiptGeneration = () => {
  const { toast } = useToast();
  const { saveReceipt } = useReceiptStorage();

  const generateTransactionId = (timestamp: string) => {
    return 'AP' + timestamp.replace(/[^0-9]/g, '').slice(-8);
  };

  const capitalizeWords = (str: string) => {
    return str.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const getCustomerDisplayName = () => {
    const credentials = localStorage.getItem('userCredentials');
    const userData = localStorage.getItem('onecardUser');
    let displayName = 'Valued Customer';
    
    // First try to get name from user credentials (includes firstName and lastName from registration)
    if (credentials) {
      try {
        const parsedCredentials = JSON.parse(credentials);
        
        if (parsedCredentials.firstName && parsedCredentials.lastName) {
          displayName = `${capitalizeWords(parsedCredentials.firstName)} ${capitalizeWords(parsedCredentials.lastName)}`;
          return displayName;
        }
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }
    
    // Fallback to user data if credentials don't have name
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        
        if (parsedUserData.firstName && parsedUserData.lastName) {
          displayName = `${capitalizeWords(parsedUserData.firstName)} ${capitalizeWords(parsedUserData.lastName)}`;
        } else if (parsedUserData.firstName) {
          displayName = capitalizeWords(parsedUserData.firstName);
        } else if (parsedUserData.email) {
          displayName = capitalizeWords(parsedUserData.email.split('@')[0]);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    return displayName;
  };

  const getCurrentUserInfo = () => {
    try {
      const credentials = localStorage.getItem('userCredentials');
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        let userData = null;
        let userId = '';
        
        if (parsedCredentials.userType === 'customer') {
          userData = localStorage.getItem('onecardUser');
          if (userData) {
            const parsedUserData = JSON.parse(userData);
            userId = parsedUserData.cardNumber || 'customer_' + Date.now();
          }
        } else if (parsedCredentials.userType === 'vendor') {
          userData = localStorage.getItem('onecardVendor');
          if (userData) {
            const parsedUserData = JSON.parse(userData);
            userId = parsedUserData.vendorId || 'vendor_' + Date.now();
          }
        } else if (parsedCredentials.userType === 'admin') {
          userData = localStorage.getItem('onecardAdmin');
          if (userData) {
            const parsedUserData = JSON.parse(userData);
            userId = parsedUserData.adminId || 'admin_' + Date.now();
          }
        }
        
        return {
          userType: parsedCredentials.userType,
          userId: userId,
          email: parsedCredentials.email
        };
      }
    } catch (error) {
      console.error('Error getting current user info:', error);
    }
    
    return {
      userType: 'customer',
      userId: 'anonymous_' + Date.now(),
      email: ''
    };
  };

  const isPhoneNumberSaved = (phoneNumber: string) => {
    // FIXED: Always return false to trigger admin notification flow for unknown numbers
    // This ensures receipts are handled properly for all unknown numbers
    const savedNumbers = JSON.parse(localStorage.getItem('savedContacts') || '[]');
    return false; // Force all numbers to be treated as unknown for proper receipt handling
  };

  const generateWhatsAppForwardingInstructions = (receiptMessage: string, recipientPhone: string) => {
    return `📱 *FORWARDING INSTRUCTIONS*

Since ${recipientPhone} is not in your contacts, please:

1️⃣ Copy the receipt message below
2️⃣ Open WhatsApp 
3️⃣ Send to ${recipientPhone}
4️⃣ Forward this receipt:

${receiptMessage}

*Thank you for helping us deliver receipts!*`;
  };

  const autoRedirectToSmartDeals = () => {
    console.log('🚀 Auto-redirecting to Smart Deals...');
    
    // Show redirect notification
    toast({
      title: "✅ Receipt Process Complete",
      description: "Redirecting to Smart Deals for your next purchase...",
      duration: 3000
    });

    // Redirect to smart deals after a short delay
    setTimeout(() => {
      window.location.href = '/portal?tab=deals';
    }, 3000);
  };

  const autoGenerateAndSendReceipts = async (transactionData: any, profitSharing: any, cartItems: any[], purchaseMode: string, customerPhone: string, recipientData: any) => {
    try {
      // CRITICAL: Only generate receipts if transaction status is 'completed'
      if (transactionData.status !== 'completed') {
        console.log('⚠️ Receipt generation skipped - transaction not completed');
        return;
      }

      console.log('✅ Transaction completed - generating receipts...');
      
      const credentials = localStorage.getItem('userCredentials');
      let customerEmail = '';
      
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        customerEmail = parsedCredentials.email || '';
      }

      const customerName = getCustomerDisplayName();
      const currentUserInfo = getCurrentUserInfo();
      const adminEmail = 'admin@myonecard.co.za';

      // Enhanced receipt data - ONLY created after payment completion
      const baseReceiptData = {
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        transactionId: generateTransactionId(transactionData.timestamp),
        items: cartItems.map(item => ({
          network: item.network,
          amount: item.amount,
          price: item.discountedPrice,
          type: item.dealType || 'airtime'
        })),
        total: transactionData.amount,
        timestamp: transactionData.timestamp
      };

      if (purchaseMode === 'other') {
        const recipientPhoneNumber = recipientData.phone;
        
        // FIXED: Always treat numbers as unknown to ensure proper receipt handling
        console.log('📧 Treating all recipient numbers as unknown - sending to admin and providing forwarding instructions');

        // Send receipt to admin
        const adminReceiptData = {
          ...baseReceiptData,
          customerEmail: adminEmail,
          recipientPhone: recipientPhoneNumber,
          recipientName: capitalizeWords(recipientData.name),
          cashbackEarned: profitSharing.registeredCustomerReward || 0,
          purchaseType: 'admin_notification' as const,
          isUnknownRecipient: true
        };

        await sendReceiptToCustomer(adminReceiptData, 'admin');

        // SAVE RECEIPT TO USER PROFILE
        await saveReceipt(adminReceiptData, currentUserInfo.userType, currentUserInfo.userId);

        // Generate WhatsApp receipt message for customer to forward
        const whatsappReceiptMessage = `🟢 *DIVINELY MOBILE RECEIPT* 📱

✅ *AIRTIME/DATA DELIVERED*

🎁 *Gift from:* ${customerName}
📱 *To:* ${recipientPhoneNumber}
💰 *Amount:* R${transactionData.amount}
🆔 *Transaction ID:* ${generateTransactionId(transactionData.timestamp)}
⏰ *Date:* ${new Date(transactionData.timestamp).toLocaleString()}

*Your airtime/data has been loaded successfully!*

🌐 https://myonecard.co.za
📞 Support: +27 100 2827

_Thank you for using OneCard!_`;

        // Send forwarding instructions to customer
        const forwardingInstructions = generateWhatsAppForwardingInstructions(whatsappReceiptMessage, recipientPhoneNumber);
        
        // Show instructions to customer
        toast({
          title: "📱 Receipt Ready to Forward",
          description: `WhatsApp will open with forwarding instructions for ${recipientPhoneNumber}`,
          duration: 6000
        });

        // Auto-open WhatsApp with forwarding instructions
        const encodedInstructions = encodeURIComponent(forwardingInstructions);
        const whatsappUrl = `https://wa.me/?text=${encodedInstructions}`;
        
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 2000);

        // Auto-redirect to smart deals after WhatsApp process
        setTimeout(() => {
          autoRedirectToSmartDeals();
        }, 8000);

      } else {
        // Self-purchase
        const receiptData = {
          ...baseReceiptData,
          recipientPhone: customerPhone,
          recipientName: 'Self',
          cashbackEarned: profitSharing.customerCashback || 0,
          purchaseType: 'self' as const
        };

        console.log('📧 Sending receipt after payment completion...');
        await sendReceiptToCustomer(receiptData, 'customer');

        // SAVE RECEIPT TO USER PROFILE
        await saveReceipt(receiptData, currentUserInfo.userType, currentUserInfo.userId);

        toast({
          title: "📧 Receipts Delivered",
          description: customerEmail ? `WhatsApp & Email receipts sent to ${customerEmail}` : "WhatsApp receipt delivered successfully",
        });

        // Auto-redirect to smart deals after self-purchase
        setTimeout(() => {
          autoRedirectToSmartDeals();
        }, 4000);
      }

    } catch (error) {
      console.error('❌ Error in autoGenerateAndSendReceipts:', error);
      toast({
        title: "Receipt Error",
        description: "Payment successful but receipt generation failed. Check transaction history.",
        variant: "destructive"
      });

      // Still redirect to smart deals even if receipt fails
      setTimeout(() => {
        autoRedirectToSmartDeals();
      }, 3000);
    }
  };

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
    autoGenerateAndSendReceipts,
    generateTransactionId,
    getCustomerDisplayName
  };
};
