
import { useToast } from '@/hooks/use-toast';
import { useDivineMobileReceiptGenerator } from '@/components/receipts/DivineMobileReceiptGenerator';
import { generateDivineMobilePDFReceipt } from '@/utils/divineMobilePDFGenerator';
import { useReceiptStorage } from './useReceiptStorage';

export const useDivineMobileReceipts = () => {
  const { toast } = useToast();
  const { saveReceipt } = useReceiptStorage();
  const { 
    processDivineMobileTransaction, 
    sendDivineMobileReceipt,
    generateTransactionId 
  } = useDivineMobileReceiptGenerator();

  const processCompleteTransaction = async (
    transactionData: any,
    profitSharing: any,
    cartItems: any[],
    purchaseMode: string,
    customerPhone: string,
    recipientData: any,
    userType: 'customer' | 'vendor' | 'admin' = 'customer'
  ) => {
    try {
      // Only process if transaction is completed
      if (transactionData.status !== 'completed') {
        console.log('⚠️ Divine Mobile receipt skipped - transaction not completed');
        return;
      }

      console.log('✅ Processing Divine Mobile receipt for completed transaction...');

      // Get customer info
      const customerInfo = getCurrentCustomerInfo();
      const cashbackEarned = profitSharing.customerCashback || profitSharing.registeredCustomerReward || profitSharing.adminCashback || 0;

      // Ensure we have valid transaction amount
      const validAmount = typeof transactionData.amount === 'number' && !isNaN(transactionData.amount) ? transactionData.amount : 0;

      // Process Divine Mobile transaction with proper amount handling
      console.log('💰 RECEIPT AMOUNT TRACKING - Passing validAmount to Divine Mobile:', validAmount);
      const transactionId = processDivineMobileTransaction(
        cartItems,
        customerPhone,
        customerInfo.name,
        userType,
        cashbackEarned,
        validAmount
      );

      // Generate PDF receipt with validated data
      const pdfData = {
        transactionId,
        amount: validAmount,
        customerPhone,
        customerName: customerInfo.name,
        items: cartItems.map(item => ({
          network: item.network || 'Divine Mobile',
          type: item.dealType || 'Digital Service',
          amount: item.amount || (typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'),
          price: typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0
        })),
        timestamp: transactionData.timestamp,
        paymentMethod: 'OneCard Mobile',
        authorizationId: 'AUTH-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
        cashbackEarned: typeof cashbackEarned === 'number' && !isNaN(cashbackEarned) ? cashbackEarned : 0,
        userType
      };

      // Store receipt data
      const receiptRecord = {
        transactionId,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone,
        items: cartItems,
        total: validAmount,
        cashbackEarned: typeof cashbackEarned === 'number' && !isNaN(cashbackEarned) ? cashbackEarned : 0,
        timestamp: transactionData.timestamp,
        purchaseType: purchaseMode === 'self' ? 'self' : 'sender',
        userType
      };

      await saveReceipt(receiptRecord, userType, customerInfo.userId || 'unknown');

      toast({
        title: "Divine Mobile Receipt Delivered! 📱",
        description: "Professional receipt with card-style format sent successfully",
        duration: 4000
      });

      return { success: true, transactionId, pdfData };

    } catch (error) {
      console.error('❌ Error processing Divine Mobile receipt:', error);
      toast({
        title: "Receipt Generation Error",
        description: "Failed to generate Divine Mobile receipt. Transaction completed successfully.",
        variant: "destructive"
      });
      return { success: false };
    }
  };

  const downloadPDFReceipt = (receiptData: any) => {
    try {
      // Validate receipt data before PDF generation
      const validatedData = {
        ...receiptData,
        amount: typeof receiptData.amount === 'number' && !isNaN(receiptData.amount) ? receiptData.amount : 0,
        cashbackEarned: typeof receiptData.cashbackEarned === 'number' && !isNaN(receiptData.cashbackEarned) ? receiptData.cashbackEarned : 0,
        items: receiptData.items.map((item: any) => ({
          ...item,
          price: typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0
        }))
      };

      const doc = generateDivineMobilePDFReceipt(validatedData);
      doc.save(`Divine_Mobile_Receipt_${receiptData.transactionId}.pdf`);
      
      toast({
        title: "📄 PDF Receipt Downloaded",
        description: "Divine Mobile receipt saved to your device",
        duration: 3000
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "PDF Generation Failed",
        description: "Unable to generate PDF receipt",
        variant: "destructive"
      });
    }
  };

  const getCurrentCustomerInfo = () => {
    try {
      const credentials = localStorage.getItem('userCredentials');
      const userData = localStorage.getItem('onecardUser') || 
                     localStorage.getItem('onecardVendor') || 
                     localStorage.getItem('onecardAdmin');
      
      let customerInfo = {
        name: 'Valued Customer',
        email: '',
        phone: '',
        userId: 'unknown'
      };

      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        customerInfo.email = parsedCredentials.email || '';
        customerInfo.phone = parsedCredentials.phone || '';
        customerInfo.userId = parsedCredentials.userId || 'unknown';
      }

      if (userData) {
        const user = JSON.parse(userData);
        if (user.firstName && user.lastName) {
          customerInfo.name = `${user.firstName} ${user.lastName}`;
        }
        customerInfo.phone = user.registeredPhone || user.phone || customerInfo.phone;
      }

      return customerInfo;
    } catch (error) {
      console.error('Error getting customer info:', error);
      return {
        name: 'Valued Customer',
        email: '',
        phone: '',
        userId: 'unknown'
      };
    }
  };

  return {
    processCompleteTransaction,
    downloadPDFReceipt,
    getCurrentCustomerInfo,
    generateTransactionId
  };
};
