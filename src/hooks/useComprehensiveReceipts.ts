
import { useEnhancedReceiptGenerator } from '@/components/receipts/EnhancedReceiptGenerator';
import { useToast } from '@/hooks/use-toast';

export const useComprehensiveReceipts = () => {
  const { 
    generateReceiptNumber, 
    formatDateTime, 
    processComprehensiveReceipt 
  } = useEnhancedReceiptGenerator();
  const { toast } = useToast();

  const createComprehensiveReceipt = async (
    transactionData: any,
    customerData: any,
    cartItems: any[],
    profitSharing: any,
    paymentMethod: string = 'Mobile Payment',
    vendorData?: any
  ) => {
    try {
      const receiptNo = generateReceiptNumber();
      const formattedDateTime = formatDateTime(transactionData.timestamp);
      
      // Map cart items to receipt format
      const receiptItems = cartItems.map(item => ({
        name: `${item.network?.toUpperCase() || 'DIVINELY'} ${item.dealType?.toUpperCase() || 'AIRTIME'} R${item.amount}`,
        quantity: 1,
        unitPrice: item.discountedPrice || item.price,
        subtotal: item.discountedPrice || item.price,
        network: item.network,
        type: item.dealType || 'airtime'
      }));

      const subtotal = receiptItems.reduce((sum, item) => sum + item.subtotal, 0);
      const cashbackEarned = profitSharing.customerCashback || profitSharing.registeredCustomerReward || 0;

      const comprehensiveReceiptData = {
        receiptNo,
        transactionId: transactionData.transactionId || `AP${Date.now().toString().slice(-8)}`,
        dateTime: formattedDateTime,
        customer: {
          name: customerData.name || customerData.firstName + ' ' + customerData.lastName || 'Valued Customer',
          mobile: customerData.phone || customerData.mobile || transactionData.customer_phone,
          email: customerData.email
        },
        items: receiptItems,
        subtotal,
        discounts: 0,
        tax: 0,
        totalPaid: subtotal,
        paymentMethod,
        cashbackEarned,
        deliveryPhone: transactionData.recipient_phone || customerData.phone,
        vendor: vendorData ? {
          name: vendorData.name || vendorData.firstName + ' ' + vendorData.lastName,
          id: vendorData.vendorId || vendorData.id,
          commission: profitSharing.vendorProfit || 0
        } : undefined,
        admin: {
          fee: profitSharing.adminProfit || 0,
          notes: 'OneCard Platform Transaction'
        }
      };

      // Process and send comprehensive receipt
      const result = await processComprehensiveReceipt(comprehensiveReceiptData);
      
      if (result.success) {
        console.log('✅ Comprehensive receipt generated and sent successfully');
        
        // Store receipt locally for history
        const existingReceipts = JSON.parse(localStorage.getItem('comprehensiveReceipts') || '[]');
        existingReceipts.push({
          ...comprehensiveReceiptData,
          createdAt: new Date().toISOString(),
          status: 'sent'
        });
        localStorage.setItem('comprehensiveReceipts', JSON.stringify(existingReceipts));
        
        return result;
      }
      
      return result;
    } catch (error) {
      console.error('❌ Error creating comprehensive receipt:', error);
      toast({
        title: "Receipt Generation Error",
        description: "Failed to generate comprehensive receipt. Transaction completed successfully.",
        variant: "destructive"
      });
      return { success: false };
    }
  };

  const getCustomerInfo = () => {
    try {
      const userCredentials = localStorage.getItem('userCredentials');
      const userData = localStorage.getItem('onecardUser') || 
                     localStorage.getItem('onecardVendor') || 
                     localStorage.getItem('onecardAdmin');
      
      let customerInfo = {
        name: 'Valued Customer',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      };

      if (userCredentials) {
        const credentials = JSON.parse(userCredentials);
        customerInfo.email = credentials.email || '';
        customerInfo.phone = credentials.phone || '';
        customerInfo.firstName = credentials.firstName || '';
        customerInfo.lastName = credentials.lastName || '';
      }

      if (userData) {
        const user = JSON.parse(userData);
        customerInfo.firstName = user.firstName || customerInfo.firstName;
        customerInfo.lastName = user.lastName || customerInfo.lastName;
        customerInfo.phone = user.registeredPhone || user.phone || customerInfo.phone;
      }

      if (customerInfo.firstName && customerInfo.lastName) {
        customerInfo.name = `${customerInfo.firstName} ${customerInfo.lastName}`;
      }

      return customerInfo;
    } catch (error) {
      console.error('Error getting customer info:', error);
      return {
        name: 'Valued Customer',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      };
    }
  };

  return {
    createComprehensiveReceipt,
    getCustomerInfo,
    generateReceiptNumber,
    formatDateTime
  };
};
