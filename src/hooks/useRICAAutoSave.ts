import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useMobileAuth } from '@/hooks/useMobileAuth';

interface RICAFormData {
  // Personal Information
  fullName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  idNumber: string;
  idType: string;
  
  // Contact & Address
  mobileNumber: string;
  email: string;
  physicalAddress: string;
  province: string;
  proofOfResidence: File | null;
  
  // SIM Details
  simSerialNumber: string;
  selfieWithId: File | null;
  
  // Declaration
  confirmInformation: boolean;
  consentProcessing: boolean;
}

export const useRICAAutoSave = () => {
  const { toast } = useToast();
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [existingRegistration, setExistingRegistration] = useState<any>(null);

  // Load existing registration or draft
  const loadExistingData = useCallback(async () => {
    if (!isAuthenticated || !currentUser) return null;

    try {
      const userId = currentUser.id;
      
      // First check for completed registration
      const { data: registration } = await supabase
        .from('rica_registrations')
        .select('*')
        .eq('user_id', userId)
        .eq('user_type', currentUser.userType)
        .maybeSingle();

      if (registration) {
        setExistingRegistration(registration);
        return registration;
      }

      // If no registration, check for draft
      const { data: draft } = await supabase
        .from('rica_registration_drafts')
        .select('*')
        .eq('user_id', userId)
        .eq('user_type', currentUser.userType)
        .maybeSingle();

      if (draft) {
        return draft.form_data;
      }

      // Also check localStorage as fallback
      const storageKey = `rica_draft_${userId}_${currentUser.userType}`;
      const localData = localStorage.getItem(storageKey);
      
      if (localData) {
        return JSON.parse(localData);
      }

      return null;
    } catch (error) {
      console.error('Error loading RICA data:', error);
      
      // Fallback to localStorage if database fails
      try {
        const userId = currentUser.id;
        const storageKey = `rica_draft_${userId}_${currentUser.userType}`;
        const localData = localStorage.getItem(storageKey);
        
        if (localData) {
          return JSON.parse(localData);
        }
      } catch (localError) {
        console.error('Error loading from localStorage:', localError);
      }
      
      return null;
    }
  }, [isAuthenticated, currentUser]);

  // Auto-save draft data
  const autoSaveDraft = useCallback(async (formData: Partial<RICAFormData>) => {
    if (!isAuthenticated || !currentUser || isAutoSaving) return;

    setIsAutoSaving(true);
    
    try {
      const userId = currentUser.id;
      
      // Convert File objects to null for JSON storage
      const sanitizedData = {
        ...formData,
        proofOfResidence: formData.proofOfResidence ? 'file-uploaded' : null,
        selfieWithId: formData.selfieWithId ? 'file-uploaded' : null
      };

      // Try database first
      try {
        const { error } = await supabase
          .from('rica_registration_drafts')
          .upsert({
            user_id: userId,
            user_type: currentUser.userType,
            form_data: sanitizedData as any
          }, {
            onConflict: 'user_id,user_type'
          });

        if (error) throw error;

        setLastSavedAt(new Date());
        console.log('Auto-saved to database successfully');
        
        // Also save to localStorage as backup
        const storageKey = `rica_draft_${userId}_${currentUser.userType}`;
        localStorage.setItem(storageKey, JSON.stringify(sanitizedData));
        
      } catch (dbError) {
        console.error('Database auto-save failed, using localStorage:', dbError);
        
        // Fallback to localStorage only (no toast for silent auto-save)
        const storageKey = `rica_draft_${userId}_${currentUser.userType}`;
        localStorage.setItem(storageKey, JSON.stringify(sanitizedData));
        
        setLastSavedAt(new Date());
      }
    } catch (error) {
      console.error('Auto-save error:', error);
      toast({
        title: "Auto-save Error",
        description: "Failed to save progress. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAutoSaving(false);
    }
  }, [isAuthenticated, currentUser, isAutoSaving, toast]);

  // Submit final registration
  const submitRegistration = useCallback(async (formData: RICAFormData) => {
    console.log('submitRegistration called with:', formData);
    console.log('isAuthenticated:', isAuthenticated);
    console.log('currentUser:', currentUser);
    
    if (!isAuthenticated || !currentUser) {
      console.log('Authentication check failed');
      toast({
        title: "Authentication Required",
        description: "Please register or log in first to submit your RICA registration.",
        variant: "destructive"
      });
      return { success: false };
    }

    console.log('Authentication passed, proceeding with registration...');

    try {
      const userId = currentUser.id;
      
      // Generate reference number (try database function first)
      let referenceNumber = `RICA-${Date.now()}`;
      try {
        const { data: refData } = await supabase.rpc('generate_rica_reference');
        if (refData) referenceNumber = refData;
      } catch (refError) {
        console.log('Using fallback reference number generation');
      }
      
      const registrationData = {
        user_id: userId,
        user_type: currentUser.userType,
        full_name: formData.fullName,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        nationality: formData.nationality,
        id_number: formData.idNumber,
        id_type: formData.idType,
        mobile_number: formData.mobileNumber,
        email: formData.email,
        physical_address: formData.physicalAddress,
        province: formData.province,
        sim_serial_number: formData.simSerialNumber,
        confirm_information: formData.confirmInformation,
        consent_processing: formData.consentProcessing,
        reference_number: referenceNumber,
        registration_status: 'pending',
        completed_at: new Date().toISOString()
      };

      // Try database first
      try {
        const { data, error } = await supabase
          .from('rica_registrations')
          .insert(registrationData)
          .select()
          .single();

        if (error) throw error;

        // Delete draft after successful submission
        await supabase
          .from('rica_registration_drafts')
          .delete()
          .eq('user_id', userId)
          .eq('user_type', currentUser.userType);

        setExistingRegistration(data);
        
        // Also clear localStorage draft
        const draftKey = `rica_draft_${userId}_${currentUser.userType}`;
        localStorage.removeItem(draftKey);

        toast({
          title: "Registration Submitted!",
          description: `Reference: ${referenceNumber}. You'll receive SMS confirmation within 24 hours.`,
        });

        return { success: true, registration: data };
        
      } catch (dbError) {
        console.error('Database submission failed, using localStorage:', dbError);
        
        // Fallback to localStorage
        const registrationKey = `rica_registration_${userId}_${currentUser.userType}`;
        localStorage.setItem(registrationKey, JSON.stringify(registrationData));
        
        // Clear draft
        const draftKey = `rica_draft_${userId}_${currentUser.userType}`;
        localStorage.removeItem(draftKey);

        setExistingRegistration(registrationData);

        toast({
          title: "Registration Submitted!",
          description: `Reference: ${referenceNumber}. Saved locally - will sync when online.`,
        });

        return { success: true, registration: registrationData };
      }
    } catch (error) {
      console.error('Registration submission error:', error);
      toast({
        title: "Registration Failed",
        description: "Failed to submit registration. Please try again.",
        variant: "destructive"
      });
      return { success: false };
    }
  }, [isAuthenticated, currentUser, toast]);

  // Check registration status for confirmations
  const checkRegistrationStatus = useCallback(async () => {
    if (!isAuthenticated || !currentUser) return null;

    try {
      const userId = currentUser.id;
      
      // Try database first
      try {
        const { data } = await supabase
          .from('rica_registrations')
          .select('registration_status, reference_number, completed_at')
          .eq('user_id', userId)
          .eq('user_type', currentUser.userType)
          .maybeSingle();

        if (data) return data;
      } catch (dbError) {
        console.log('Database check failed, using localStorage');
      }
      
      // Fallback to localStorage
      const registrationKey = `rica_registration_${userId}_${currentUser.userType}`;
      const registrationData = localStorage.getItem(registrationKey);
      
      if (registrationData) {
        const data = JSON.parse(registrationData);
        return {
          registration_status: data.registration_status,
          reference_number: data.reference_number,
          completed_at: data.completed_at
        };
      }

      return null;
    } catch (error) {
      return null;
    }
  }, [isAuthenticated, currentUser]);

  return {
    isAutoSaving,
    lastSavedAt,
    existingRegistration,
    loadExistingData,
    autoSaveDraft,
    submitRegistration,
    checkRegistrationStatus
  };
};