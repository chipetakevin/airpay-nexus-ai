import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface OneCardAccount {
  id: string;
  user_id: string;
  user_type: string;
  onecard_number: string;
  onecard_type: string;
  cashback_balance: number;
  total_earned: number;
  total_spent: number;
  is_active: boolean;
  is_verified: boolean;
  verification_level?: string;
  created_at: string;
  updated_at: string;
}

export interface InternationalPaymentCard {
  id: string;
  card_type: string;
  card_brand: string;
  last_four_digits: string;
  expiry_month: number;
  expiry_year: number;
  cardholder_name: string;
  billing_country: string;
  is_primary: boolean;
  is_verified: boolean;
}

export const useOneCardSystem = () => {
  const { toast } = useToast();
  const [oneCardAccount, setOneCardAccount] = useState<OneCardAccount | null>(null);
  const [paymentCards, setPaymentCards] = useState<InternationalPaymentCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Create OneCard account for any user type
  const createOneCardAccount = useCallback(async (
    userId: string,
    userType: 'customer' | 'vendor' | 'admin' | 'field_worker' | 'support',
    oneCardType: 'standard' | 'gold' | 'platinum' | 'enterprise' = 'standard'
  ) => {
    setIsLoading(true);
    
    try {
      console.log('🎯 Creating OneCard account:', { userId, userType, oneCardType });
      
      const { data, error } = await supabase.rpc('create_onecard_account', {
        user_id_param: userId,
        user_type_param: userType,
        onecard_type_param: oneCardType
      });

      if (error) {
        throw error;
      }

      console.log('✅ OneCard account created:', data);
      
      // Fetch the created account
      const { data: accountData, error: fetchError } = await supabase
        .from('onecard_accounts')
        .select('*')
        .eq('onecard_number', data)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      setOneCardAccount(accountData);
      
      toast({
        title: "OneCard Created! 💳",
        description: `Your ${oneCardType.toUpperCase()} OneCard ${data} is ready!`,
        duration: 5000
      });

      return data; // Return the OneCard number
    } catch (error) {
      console.error('❌ Failed to create OneCard account:', error);
      toast({
        title: "OneCard Creation Failed",
        description: "Unable to create your OneCard. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Get existing OneCard account
  const getOneCardAccount = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('onecard_accounts')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (data) {
        setOneCardAccount(data);
        return data;
      }

      return null;
    } catch (error) {
      console.error('❌ Failed to fetch OneCard account:', error);
      return null;
    }
  }, []);

  // Add international payment card
  const addPaymentCard = useCallback(async (cardData: {
    userId: string;
    oneCardAccountId: string;
    cardType: string;
    cardBrand: string;
    lastFourDigits: string;
    expiryMonth: number;
    expiryYear: number;
    cardholderName: string;
    billingCountry: string;
    billingAddress?: any;
    isPrimary?: boolean;
  }) => {
    setIsLoading(true);
    
    try {
      console.log('💳 Adding payment card:', cardData);

      // If this is set as primary, unset other primary cards
      if (cardData.isPrimary) {
        await supabase
          .from('international_payment_cards')
          .update({ is_primary: false })
          .eq('user_id', cardData.userId);
      }

      const { data, error } = await supabase
        .from('international_payment_cards')
        .insert({
          user_id: cardData.userId,
          onecard_account_id: cardData.oneCardAccountId,
          card_type: cardData.cardType,
          card_brand: cardData.cardBrand,
          last_four_digits: cardData.lastFourDigits,
          expiry_month: cardData.expiryMonth,
          expiry_year: cardData.expiryYear,
          cardholder_name: cardData.cardholderName,
          billing_country: cardData.billingCountry,
          billing_address: cardData.billingAddress || {},
          is_primary: cardData.isPrimary || false,
          is_verified: false // Will need verification process
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update local state
      setPaymentCards(prev => [...prev, data]);
      
      toast({
        title: "Payment Card Added! 💳",
        description: `${cardData.cardBrand} ending in ${cardData.lastFourDigits} has been added securely.`,
        duration: 3000
      });

      return data;
    } catch (error) {
      console.error('❌ Failed to add payment card:', error);
      toast({
        title: "Card Addition Failed",
        description: "Unable to add payment card. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Get user's payment cards
  const getPaymentCards = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('international_payment_cards')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('is_primary', { ascending: false });

      if (error) {
        throw error;
      }

      setPaymentCards(data || []);
      return data || [];
    } catch (error) {
      console.error('❌ Failed to fetch payment cards:', error);
      return [];
    }
  }, []);

  // Update cashback balance
  const updateCashbackBalance = useCallback(async (
    oneCardAccountId: string,
    amount: number,
    transactionType: 'earning' | 'redemption'
  ) => {
    try {
      console.log('💰 Updating cashback balance:', { oneCardAccountId, amount, transactionType });

      const { data, error } = await supabase.rpc('update_cashback_balance', {
        onecard_account_id_param: oneCardAccountId,
        amount_param: amount,
        transaction_type_param: transactionType
      });

      if (error) {
        throw error;
      }

      // Refresh OneCard account data
      if (oneCardAccount && oneCardAccount.id === oneCardAccountId) {
        const updatedBalance = transactionType === 'earning' 
          ? oneCardAccount.cashback_balance + amount
          : oneCardAccount.cashback_balance - amount;
        
        setOneCardAccount(prev => prev ? {
          ...prev,
          cashback_balance: updatedBalance,
          total_earned: transactionType === 'earning' 
            ? prev.total_earned + amount 
            : prev.total_earned,
          updated_at: new Date().toISOString()
        } : null);
      }

      return data;
    } catch (error) {
      console.error('❌ Failed to update cashback balance:', error);
      throw error;
    }
  }, [oneCardAccount]);

  // Initialize OneCard system for a user
  const initializeOneCardSystem = useCallback(async (
    userId: string,
    userType: 'customer' | 'vendor' | 'admin' | 'field_worker' | 'support'
  ) => {
    try {
      console.log('🚀 Initializing OneCard system for user:', { userId, userType });
      
      // Check if user already has OneCard account
      let account = await getOneCardAccount(userId);
      
      if (!account) {
        // Create new OneCard account
        const oneCardType = userType === 'admin' ? 'platinum' : 
                           userType === 'vendor' ? 'gold' : 'standard';
        
        const oneCardNumber = await createOneCardAccount(userId, userType, oneCardType);
        account = await getOneCardAccount(userId);
      }

      // Load payment cards
      await getPaymentCards(userId);

      console.log('✅ OneCard system initialized:', account);
      return account;
    } catch (error) {
      console.error('❌ Failed to initialize OneCard system:', error);
      throw error;
    }
  }, [createOneCardAccount, getOneCardAccount, getPaymentCards]);

  return {
    oneCardAccount,
    paymentCards,
    isLoading,
    createOneCardAccount,
    getOneCardAccount,
    addPaymentCard,
    getPaymentCards,
    updateCashbackBalance,
    initializeOneCardSystem
  };
};