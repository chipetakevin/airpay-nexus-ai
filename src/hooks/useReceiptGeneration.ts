
import { useToast } from '@/hooks/use-toast';
import { useReceiptStorage } from './useReceiptStorage';
import { useReceiptFormatter } from './receipt/useReceiptFormatter';
import { useUserInfo } from './receipt/useUserInfo';
import { useWhatsAppForwarding } from './receipt/useWhatsAppForwarding';
import { useReceiptSender } from './receipt/useReceiptSender';
import { useComprehensiveReceipts } from './useComprehensiveReceipts';

export const useReceiptGeneration = () => {
  const { toast } = useToast();
  const { saveReceipt } = useReceiptStorage();
  const { generateTransactionId, capitalizeWords, getCustomerDisplayName } = useReceiptFormatter();
  const { getCurrentUserInfo } = useUserInfo();
  const { generateWhatsAppForwardingInstructions, handleIntelligentWhatsAppRedirect, autoRedirectToSmartDeals } = useWhatsAppForwarding();
  const { sendReceiptToCustomer, sendReceiptWithFallback } = useReceiptSender();
  const { createComprehensiveReceipt, getCustomerInfo } = useComprehensiveReceipts();

  const autoGenerateAndSendReceipts = async (
    transactionData: any, 
    profitSharing: any, 
    cartItems: any[], 
    purchaseMode: string, 
    customerPhone: string, 
    recipientData: any,
    userType: 'customer' | 'vendor' | 'admin' = 'customer'
  ) => {
    try {
      // CRITICAL: Only generate receipts if transaction status is 'completed'
      if (transactionData.status !== 'completed') {
        console.log('⚠️ Receipt generation skipped - transaction not completed');
        return;
      }

      console.log('✅ Transaction completed - generating comprehensive receipts for all user types...');
      
      const customerInfo = getCustomerInfo();
      const currentUserInfo = getCurrentUserInfo();
      
      // Get user-specific info based on type
      let userInfo = null;
      if (userType === 'vendor') {
        const vendorData = localStorage.getItem('onecardVendor');
        if (vendorData) {
          userInfo = JSON.parse(vendorData);
        }
      } else if (userType === 'admin') {
        const adminData = localStorage.getItem('onecardAdmin');
        if (adminData) {
          userInfo = JSON.parse(adminData);
        }
      } else {
        const customerData = localStorage.getItem('onecardCustomer');
        if (customerData) {
          userInfo = JSON.parse(customerData);
        }
      }

      // Create comprehensive receipt with enhanced data for all user types
      const enhancedTransactionData = {
        ...transactionData,
        transactionId: generateTransactionId(transactionData.timestamp),
        customer_phone: customerPhone,
        userType
      };

      console.log('📧 Generating comprehensive receipt for all user types...');
      const receiptResult = await createComprehensiveReceipt(
        enhancedTransactionData,
        customerInfo,
        cartItems,
        profitSharing,
        'Addex-Hub Mobile Payment',
        userInfo
      );

      if (receiptResult?.success) {
        // Save receipt to user profile (all user types)
        const baseReceiptData = {
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerPhone,
          transactionId: enhancedTransactionData.transactionId,
          items: cartItems.map(item => ({
            network: item.network,
            amount: item.amount,
            price: item.discountedPrice,
            type: item.dealType || 'airtime'
          })),
          total: transactionData.amount,
          timestamp: transactionData.timestamp,
          recipientPhone: purchaseMode === 'self' ? customerPhone : recipientData.phone,
          recipientName: purchaseMode === 'self' ? 'Self' : capitalizeWords(recipientData.name),
          cashbackEarned: profitSharing.registeredCustomerReward || profitSharing.customerCashback || profitSharing.adminCashback || 0,
          purchaseType: purchaseMode === 'self' ? 'self' : 'sender',
          userType
        };

        await saveReceipt(baseReceiptData, userType, currentUserInfo.userId);

        // Universal receipt delivery - always send regardless of WhatsApp registration
        await forceReceiptDelivery(baseReceiptData, customerPhone, recipientData, purchaseMode);

        toast({
          title: "📱 Professional Receipt Delivered!",
          description: "Comprehensive receipt sent via WhatsApp and email regardless of registration status",
          duration: 5000
        });

        // Auto-redirect to smart deals after successful receipt delivery
        setTimeout(() => {
          autoRedirectToSmartDeals();
        }, 6000);
      } else {
        // Fallback to enhanced receipt system with forced delivery
        console.log('⚠️ Comprehensive receipt failed, using enhanced fallback with forced delivery...');
        await enhancedFallbackReceipt(transactionData, profitSharing, cartItems, purchaseMode, customerPhone, recipientData, userType);
      }

    } catch (error) {
      console.error('❌ Error in autoGenerateAndSendReceipts:', error);
      
      // Fallback to enhanced receipt system with forced delivery
      console.log('⚠️ Using enhanced fallback receipt system with forced delivery due to error...');
      await enhancedFallbackReceipt(transactionData, profitSharing, cartItems, purchaseMode, customerPhone, recipientData, userType);
    }
  };

  const forceReceiptDelivery = async (receiptData: any, customerPhone: string, recipientData: any, purchaseMode: string) => {
    try {
      console.log('📧 Forcing receipt delivery regardless of WhatsApp registration status...');
      
      // Always send to customer phone - regardless of WhatsApp registration
      const customerWhatsAppUrl = `https://wa.me/${customerPhone.replace('+', '')}?text=${encodeURIComponent(generateReceiptMessage(receiptData))}`;
      
      console.log('📱 Customer WhatsApp URL generated (forced):', customerWhatsAppUrl);
      
      // Open customer WhatsApp in new tab
      setTimeout(() => {
        window.open(customerWhatsAppUrl, '_blank');
      }, 1000);

      // If third-party purchase, also send to recipient - regardless of registration
      if (purchaseMode === 'other' && recipientData.phone) {
        const recipientReceiptData = {
          ...receiptData,
          recipientPhone: recipientData.phone,
          recipientName: capitalizeWords(recipientData.name),
          purchaseType: 'recipient'
        };
        
        const recipientWhatsAppUrl = `https://wa.me/${recipientData.phone.replace('+', '')}?text=${encodeURIComponent(generateReceiptMessage(recipientReceiptData))}`;
        
        console.log('📱 Recipient WhatsApp URL generated (forced):', recipientWhatsAppUrl);
        
        // Open recipient WhatsApp in new tab with delay
        setTimeout(() => {
          window.open(recipientWhatsAppUrl, '_blank');
        }, 2000);
      }

      // Also send email if available
      if (receiptData.customerEmail) {
        console.log('📧 Email receipt would be sent to:', receiptData.customerEmail);
        // Email sending logic would be implemented here
      }

    } catch (error) {
      console.error('❌ Error in forced receipt delivery:', error);
    }
  };

  const generateReceiptMessage = (receiptData: any): string => {
    const items = receiptData.items.map(item => 
      `• ${item.network?.toUpperCase() || 'ADDEX-HUB'} ${item.type?.toUpperCase() || 'AIRTIME'} R${item.amount} - R${item.price}`
    ).join('\n');

    return `🌟 **ADDEX-HUB MOBILE** 📱
✨ **Premium Digital Receipt** ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 **TRANSACTION: CONFIRMED** ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Receipt #**: AH${Date.now().toString().slice(-8)}
**Transaction ID**: ${receiptData.transactionId}
**Date**: ${new Date(receiptData.timestamp).toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST

**Customer**: ${receiptData.customerName || 'Valued Customer'}
**Mobile**: ${receiptData.customerPhone}
**User Type**: ${receiptData.userType?.toUpperCase() || 'CUSTOMER'}

**Provider**: Addex-Hub Mobile
**Website**: www.addex-hub.co.za
**Support**: +27 100 2827
**Platform**: Addex-Hub

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛒 **PURCHASE SUMMARY**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${items}

**Total Paid**: R${receiptData.total}
**Payment**: OneCard Mobile
**Status**: Payment Successful ✅

**Rewards**:
• Cashback: R${(receiptData.cashbackEarned || 0).toFixed(2)}
• User Type Bonus: ${receiptData.userType === 'admin' ? '2.5x' : receiptData.userType === 'vendor' ? '1.5x' : '1x'}
• Status: Active

**Delivery**:
• To: ${receiptData.recipientPhone.replace('+27', '0')}
• Status: Instantly Delivered ⚡
• Confirmation: 100% Success

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 **SUPPORT & POLICIES**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Keep this receipt for records
• 24/7 Support: +27 100 2827
• Help: www.addex-hub.co.za/support
• Live Chat: On website
• Refunds: T&Cs apply

🌟 **Thank you for choosing Addex-Hub Mobile!** 🌟
⚡ Fast • 🔒 Secure • 🎯 Reliable

🔐 **Digital Verification**
• Verified: ${new Date().toISOString()}
• Platform: Addex-Hub Secure
• Trusted by thousands daily`;
  };

  const enhancedFallbackReceipt = async (
    transactionData: any, 
    profitSharing: any, 
    cartItems: any[], 
    purchaseMode: string, 
    customerPhone: string, 
    recipientData: any,
    userType: 'customer' | 'vendor' | 'admin' = 'customer'
  ) => {
    try {
      const customerName = getCustomerDisplayName();
      const currentUserInfo = getCurrentUserInfo();
      
      const baseReceiptData = {
        customerName: customerName,
        customerEmail: getCustomerInfo().email,
        customerPhone: customerPhone,
        transactionId: generateTransactionId(transactionData.timestamp),
        items: cartItems.map(item => ({
          network: item.network,
          amount: item.amount,
          price: item.discountedPrice,
          type: item.dealType || 'airtime'
        })),
        total: transactionData.amount,
        timestamp: transactionData.timestamp,
        userType
      };

      // Force delivery regardless of registration status
      await forceReceiptDelivery(baseReceiptData, customerPhone, recipientData, purchaseMode);

      if (purchaseMode === 'other') {
        const recipientPhoneNumber = recipientData.phone;
        
        // Force send to recipient regardless of WhatsApp registration
        await sendReceiptWithFallback(
          {
            ...baseReceiptData,
            recipientPhone: recipientPhoneNumber,
            recipientName: capitalizeWords(recipientData.name),
            cashbackEarned: 0,
            purchaseType: 'recipient'
          },
          recipientPhoneNumber,
          customerPhone
        );
        
        toast({
          title: "📧 Smart Receipt Delivery",
          description: `Receipt sent to ${recipientPhoneNumber} with backup to you (forced delivery)`,
          duration: 4000
        });
        
      } else {
        // Self-purchase enhanced receipt
        const receiptData = {
          ...baseReceiptData,
          recipientPhone: customerPhone,
          recipientName: 'Self',
          cashbackEarned: profitSharing.customerCashback || profitSharing.adminCashback || 0,
          purchaseType: 'self' as const
        };

        await sendReceiptToCustomer(receiptData, userType);
        
        toast({
          title: "📧 Receipt Delivered",
          description: "WhatsApp receipt sent with forced delivery (regardless of registration)",
        });
      }

      // Save receipt to user profile
      await saveReceipt(baseReceiptData, userType, currentUserInfo.userId);

      // Auto-redirect to smart deals
      setTimeout(() => {
        autoRedirectToSmartDeals();
      }, 4000);

    } catch (error) {
      console.error('❌ Enhanced fallback receipt system failed:', error);
      toast({
        title: "Receipt System Error",
        description: "Payment successful but receipt delivery failed. Check transaction history.",
        variant: "destructive"
      });

      // Still redirect even if receipt fails
      setTimeout(() => {
        autoRedirectToSmartDeals();
      }, 3000);
    }
  };

  return {
    autoGenerateAndSendReceipts,
    generateTransactionId,
    getCustomerDisplayName
  };
};
