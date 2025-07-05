import { supabase } from '@/integrations/supabase/client';

export interface UniversalFormData {
  formType: 'customer' | 'vendor' | 'admin' | 'staff' | 'field_worker' | 'rica' | 'banking' | 'onecard' | 'payment_card';
  formData: Record<string, any>;
  userId?: string;
  isComplete?: boolean;
  submissionSource?: 'web' | 'mobile' | 'api';
}

export interface LocalStorageOptions {
  storageKey: string;
  storageType?: 'localStorage' | 'sessionStorage';
  formReferenceId?: string;
}

class UniversalDataStorageService {
  
  // Store data both locally and in database simultaneously
  async storeUniversalData(data: UniversalFormData, localOptions: LocalStorageOptions) {
    const results = {
      localStorage: false,
      database: false,
      errors: [] as string[]
    };

    try {
      // 1. Store in local storage first (immediate persistence)
      await this.storeLocalData(data.formData, localOptions);
      results.localStorage = true;
      console.log('✅ Data stored locally:', localOptions.storageKey);

      // 2. Store in database (permanent backup)
      const dbResult = await this.storeDatabaseData(data);
      if (dbResult.success) {
        results.database = true;
        console.log('✅ Data stored in database:', data.formType);

        // 3. Mirror local storage in database for redundancy
        await this.mirrorLocalStorage(data.userId, localOptions, dbResult.formSubmissionId);
      } else {
        results.errors.push(dbResult.error || 'Database storage failed');
      }

    } catch (error) {
      console.error('❌ Universal data storage error:', error);
      results.errors.push(error instanceof Error ? error.message : 'Unknown error');
    }

    return results;
  }

  // Store data in local storage with multiple redundancy
  private async storeLocalData(formData: Record<string, any>, options: LocalStorageOptions) {
    const { storageKey, storageType = 'localStorage' } = options;
    
    const dataToStore = {
      ...formData,
      timestamp: new Date().toISOString(),
      version: 1,
      isPermanent: true
    };

    try {
      // Primary storage
      if (storageType === 'localStorage') {
        localStorage.setItem(storageKey, JSON.stringify(dataToStore));
        // Backup storage
        localStorage.setItem(`${storageKey}_backup`, JSON.stringify(dataToStore));
      } else {
        sessionStorage.setItem(storageKey, JSON.stringify(dataToStore));
        sessionStorage.setItem(`${storageKey}_backup`, JSON.stringify(dataToStore));
      }

      // Also store in the alternate storage type for redundancy
      const alternateStorage = storageType === 'localStorage' ? sessionStorage : localStorage;
      alternateStorage.setItem(`${storageKey}_mirror`, JSON.stringify(dataToStore));

      console.log(`✅ Local data stored: ${storageKey}`);
    } catch (error) {
      console.error('❌ Local storage error:', error);
      throw error;
    }
  }

  // Store data in Supabase database
  private async storeDatabaseData(data: UniversalFormData) {
    try {
      const { data: result, error } = await supabase
        .from('universal_form_submissions')
        .insert({
          user_id: data.userId,
          form_type: data.formType,
          form_data: data.formData,
          submission_source: data.submissionSource || 'web',
          is_complete: data.isComplete || false,
          ip_address: await this.getClientIP(),
          user_agent: navigator.userAgent
        })
        .select('id')
        .single();

      if (error) {
        console.error('❌ Database storage error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, formSubmissionId: result.id };
    } catch (error) {
      console.error('❌ Database storage error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Mirror local storage in database for redundancy
  private async mirrorLocalStorage(userId: string | undefined, options: LocalStorageOptions, formReferenceId: string) {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('local_storage_mirror')
        .insert({
          user_id: userId,
          storage_key: options.storageKey,
          storage_data: JSON.parse(localStorage.getItem(options.storageKey) || '{}'),
          storage_type: options.storageType || 'localStorage',
          form_reference_id: formReferenceId,
          sync_status: 'synced'
        });

      if (error) {
        console.error('❌ Local storage mirror error:', error);
      } else {
        console.log('✅ Local storage mirrored in database');
      }
    } catch (error) {
      console.error('❌ Local storage mirror error:', error);
    }
  }

  // Store comprehensive user profile
  async storeUserProfile(userId: string, userType: string, profileData: Record<string, any>) {
    try {
      const { data, error } = await supabase
        .from('comprehensive_user_profiles')
        .upsert({
          user_id: userId,
          user_type: userType,
          ...profileData,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,user_type'
        })
        .select('id')
        .single();

      if (error) {
        console.error('❌ User profile storage error:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ User profile stored:', userType);
      return { success: true, profileId: data.id };
    } catch (error) {
      console.error('❌ User profile storage error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Store banking information
  async storeBankingProfile(userId: string, userType: string, bankingData: Record<string, any>) {
    try {
      const { data, error } = await supabase
        .from('banking_profiles')
        .insert({
          user_id: userId,
          user_type: userType,
          bank_name: bankingData.bankName,
          branch_code: bankingData.branchCode,
          account_number: bankingData.accountNumber,
          account_type: bankingData.accountType || 'savings',
          account_holder_name: bankingData.accountHolderName || `${bankingData.firstName} ${bankingData.lastName}`,
          is_primary: bankingData.isPrimary || true,
          is_verified: false
        })
        .select('id')
        .single();

      if (error) {
        console.error('❌ Banking profile storage error:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Banking profile stored');
      return { success: true, bankingId: data.id };
    } catch (error) {
      console.error('❌ Banking profile storage error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Store payment card information
  async storePaymentCard(userId: string, userType: string, cardData: Record<string, any>) {
    try {
      const { data, error } = await supabase
        .from('payment_cards')
        .insert({
          user_id: userId,
          user_type: userType,
          card_type: cardData.cardType,
          last_four_digits: cardData.lastFourDigits,
          expiry_month: cardData.expiryMonth,
          expiry_year: cardData.expiryYear,
          cardholder_name: cardData.cardholderName,
          is_primary: cardData.isPrimary || false,
          billing_address: cardData.billingAddress || {}
        })
        .select('id')
        .single();

      if (error) {
        console.error('❌ Payment card storage error:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Payment card stored');
      return { success: true, cardId: data.id };
    } catch (error) {
      console.error('❌ Payment card storage error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Store RICA registration
  async storeRICARegistration(userId: string, ricaData: Record<string, any>) {
    try {
      const { data, error } = await supabase
        .from('enhanced_rica_registrations')
        .insert({
          user_id: userId,
          full_name: ricaData.fullName,
          id_number: ricaData.idNumber,
          id_type: ricaData.idType || 'SA_ID',
          date_of_birth: ricaData.dateOfBirth,
          gender: ricaData.gender,
          nationality: ricaData.nationality || 'South African',
          mobile_number: ricaData.mobileNumber,
          email: ricaData.email,
          physical_address: ricaData.physicalAddress,
          province: ricaData.province,
          sim_serial_number: ricaData.simSerialNumber,
          network_provider: ricaData.networkProvider,
          confirm_information: ricaData.confirmInformation || false,
          consent_processing: ricaData.consentProcessing || false,
          registration_status: 'pending'
        })
        .select('id')
        .single();

      if (error) {
        console.error('❌ RICA registration storage error:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ RICA registration stored');
      return { success: true, ricaId: data.id };
    } catch (error) {
      console.error('❌ RICA registration storage error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Store OneCard rewards
  async storeOneCardReward(userId: string, userType: string, rewardData: Record<string, any>) {
    try {
      const { data, error } = await supabase
        .from('onecard_rewards')
        .insert({
          user_id: userId,
          user_type: userType,
          transaction_id: rewardData.transactionId,
          reward_type: rewardData.rewardType,
          reward_amount: rewardData.rewardAmount,
          base_transaction_amount: rewardData.baseTransactionAmount,
          reward_percentage: rewardData.rewardPercentage,
          reward_description: rewardData.rewardDescription,
          reward_source: rewardData.rewardSource || 'purchase',
          status: 'pending'
        })
        .select('id')
        .single();

      if (error) {
        console.error('❌ OneCard reward storage error:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ OneCard reward stored');
      return { success: true, rewardId: data.id };
    } catch (error) {
      console.error('❌ OneCard reward storage error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Get client IP address (fallback method)
  private async getClientIP(): Promise<string | null> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.warn('Could not get client IP:', error);
      return null;
    }
  }

  // Sync local storage with database
  async syncLocalWithDatabase(userId: string) {
    try {
      const { data: mirrors, error } = await supabase
        .from('local_storage_mirror')
        .select('*')
        .eq('user_id', userId)
        .eq('sync_status', 'pending');

      if (error) {
        console.error('❌ Sync error:', error);
        return { success: false, error: error.message };
      }

      for (const mirror of mirrors || []) {
        try {
          // Update local storage with database data
          localStorage.setItem(mirror.storage_key, JSON.stringify(mirror.storage_data));
          
          // Mark as synced
          await supabase
            .from('local_storage_mirror')
            .update({ sync_status: 'synced', last_sync_at: new Date().toISOString() })
            .eq('id', mirror.id);
            
        } catch (error) {
          console.error(`❌ Failed to sync ${mirror.storage_key}:`, error);
        }
      }

      console.log('✅ Local storage synced with database');
      return { success: true };
    } catch (error) {
      console.error('❌ Sync error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Load user data from database
  async loadUserData(userId: string, userType?: string) {
    try {
      const queries = [
        supabase.from('comprehensive_user_profiles').select('*').eq('user_id', userId),
        supabase.from('banking_profiles').select('*').eq('user_id', userId),
        supabase.from('payment_cards').select('*').eq('user_id', userId),
        supabase.from('onecard_rewards').select('*').eq('user_id', userId)
      ];

      if (userType) {
        queries[0] = queries[0].eq('user_type', userType);
      }

      const [profileResult, bankingResult, cardsResult, rewardsResult] = await Promise.all(queries);

      return {
        success: true,
        data: {
          profile: profileResult.data?.[0],
          banking: bankingResult.data || [],
          cards: cardsResult.data || [],
          rewards: rewardsResult.data || []
        }
      };
    } catch (error) {
      console.error('❌ Load user data error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

export const universalDataStorage = new UniversalDataStorageService();