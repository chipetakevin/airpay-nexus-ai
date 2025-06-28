
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface StoredReceipt {
  id: string;
  transactionId: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  recipientPhone: string;
  recipientName?: string;
  items: Array<{
    network: string;
    amount: number;
    price: number;
    type: string;
  }>;
  total: number;
  cashbackEarned: number;
  timestamp: string;
  purchaseType: 'self' | 'sender' | 'recipient' | 'admin_notification';
  userType: 'customer' | 'vendor' | 'admin';
  userId: string;
  status: 'sent' | 'delivered' | 'failed';
  whatsappDelivered: boolean;
  emailDelivered: boolean;
}

export const useReceiptStorage = () => {
  const { toast } = useToast();
  const [receipts, setReceipts] = useState<StoredReceipt[]>([]);

  const saveReceipt = async (receiptData: any, userType: string, userId: string) => {
    try {
      const storedReceipt: StoredReceipt = {
        id: `receipt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        transactionId: receiptData.transactionId,
        customerName: receiptData.customerName || 'Unknown Customer',
        customerEmail: receiptData.customerEmail,
        customerPhone: receiptData.customerPhone,
        recipientPhone: receiptData.recipientPhone,
        recipientName: receiptData.recipientName,
        items: receiptData.items || [],
        total: receiptData.total || 0,
        cashbackEarned: receiptData.cashbackEarned || 0,
        timestamp: receiptData.timestamp || new Date().toISOString(),
        purchaseType: receiptData.purchaseType || 'self',
        userType: userType as 'customer' | 'vendor' | 'admin',
        userId: userId,
        status: 'sent',
        whatsappDelivered: true,
        emailDelivered: !!receiptData.customerEmail
      };

      // Save to user-specific receipt storage
      const userReceiptKey = `receipts_${userType}_${userId}`;
      const existingReceipts = JSON.parse(localStorage.getItem(userReceiptKey) || '[]');
      existingReceipts.unshift(storedReceipt); // Add to beginning for chronological order
      localStorage.setItem(userReceiptKey, JSON.stringify(existingReceipts));

      // Also save to global receipt storage for admin access
      const globalReceipts = JSON.parse(localStorage.getItem('allUserReceipts') || '[]');
      globalReceipts.unshift(storedReceipt);
      localStorage.setItem('allUserReceipts', JSON.stringify(globalReceipts));

      console.log(`✅ Receipt saved for ${userType} user ${userId}:`, storedReceipt.transactionId);

      return storedReceipt;
    } catch (error) {
      console.error('❌ Error saving receipt:', error);
      return null;
    }
  };

  const getUserReceipts = (userType: string, userId: string): StoredReceipt[] => {
    try {
      const userReceiptKey = `receipts_${userType}_${userId}`;
      const userReceipts = JSON.parse(localStorage.getItem(userReceiptKey) || '[]');
      return userReceipts;
    } catch (error) {
      console.error('Error loading user receipts:', error);
      return [];
    }
  };

  const getAllReceipts = (): StoredReceipt[] => {
    try {
      // Only admin can access all receipts
      const credentials = localStorage.getItem('userCredentials');
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        if (parsedCredentials.userType === 'admin' || parsedCredentials.password === 'Malawi@1976') {
          return JSON.parse(localStorage.getItem('allUserReceipts') || '[]');
        }
      }
      return [];
    } catch (error) {
      console.error('Error loading all receipts:', error);
      return [];
    }
  };

  const getReceiptsByUserType = (targetUserType: 'customer' | 'vendor' | 'admin'): StoredReceipt[] => {
    try {
      // Only admin can access receipts by user type
      const credentials = localStorage.getItem('userCredentials');
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        if (parsedCredentials.userType === 'admin' || parsedCredentials.password === 'Malawi@1976') {
          const allReceipts = JSON.parse(localStorage.getItem('allUserReceipts') || '[]');
          return allReceipts.filter((receipt: StoredReceipt) => receipt.userType === targetUserType);
        }
      }
      return [];
    } catch (error) {
      console.error('Error loading receipts by user type:', error);
      return [];
    }
  };

  const deleteReceipt = (receiptId: string, userType: string, userId: string) => {
    try {
      // Remove from user-specific storage
      const userReceiptKey = `receipts_${userType}_${userId}`;
      const userReceipts = JSON.parse(localStorage.getItem(userReceiptKey) || '[]');
      const updatedUserReceipts = userReceipts.filter((receipt: StoredReceipt) => receipt.id !== receiptId);
      localStorage.setItem(userReceiptKey, JSON.stringify(updatedUserReceipts));

      // Remove from global storage
      const globalReceipts = JSON.parse(localStorage.getItem('allUserReceipts') || '[]');
      const updatedGlobalReceipts = globalReceipts.filter((receipt: StoredReceipt) => receipt.id !== receiptId);
      localStorage.setItem('allUserReceipts', JSON.stringify(updatedGlobalReceipts));

      toast({
        title: "Receipt Deleted",
        description: "Receipt has been removed from your records",
      });

      return true;
    } catch (error) {
      console.error('Error deleting receipt:', error);
      toast({
        title: "Delete Failed",
        description: "Unable to delete receipt. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    saveReceipt,
    getUserReceipts,
    getAllReceipts,
    getReceiptsByUserType,
    deleteReceipt,
    receipts,
    setReceipts
  };
};
