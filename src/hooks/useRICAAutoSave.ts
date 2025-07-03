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
      // First check for completed registration
      const { data: registration } = await supabase
        .from('rica_registrations')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('user_type', currentUser.userType)
        .single();

      if (registration) {
        setExistingRegistration(registration);
        return registration;
      }

      // If no registration, check for draft
      const { data: draft } = await supabase
        .from('rica_registration_drafts')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('user_type', currentUser.userType)
        .single();

      if (draft) {
        return draft.form_data;
      }

      return null;
    } catch (error) {
      console.error('Error loading RICA data:', error);
      return null;
    }
  }, [isAuthenticated, currentUser]);

  // Auto-save draft data
  const autoSaveDraft = useCallback(async (formData: Partial<RICAFormData>) => {
    if (!isAuthenticated || !currentUser || isAutoSaving) return;

    setIsAutoSaving(true);
    
    try {
      // Convert File objects to null for JSON storage
      const sanitizedData = {
        ...formData,
        proofOfResidence: formData.proofOfResidence ? 'file-uploaded' : null,
        selfieWithId: formData.selfieWithId ? 'file-uploaded' : null
      };

      const { error } = await supabase
        .from('rica_registration_drafts')
        .upsert({
          user_id: currentUser.id,
          user_type: currentUser.userType,
          form_data: sanitizedData as any
        });

      if (error) throw error;

      setLastSavedAt(new Date());
    } catch (error) {
      console.error('Auto-save error:', error);
      toast({
        title: "Auto-save Error",
        description: "Failed to save your progress. Please check your connection.",
        variant: "destructive"
      });
    } finally {
      setIsAutoSaving(false);
    }
  }, [isAuthenticated, currentUser, isAutoSaving, toast]);

  // Submit final registration
  const submitRegistration = useCallback(async (formData: RICAFormData) => {
    if (!isAuthenticated || !currentUser) return { success: false };

    try {
      // Generate reference number
      const { data: refData } = await supabase.rpc('generate_rica_reference');
      const referenceNumber = refData || `RICA-${Date.now()}`;

      const registrationData = {
        user_id: currentUser.id,
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
        completed_at: new Date().toISOString()
      };

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
        .eq('user_id', currentUser.id)
        .eq('user_type', currentUser.userType);

      setExistingRegistration(data);

      toast({
        title: "Registration Submitted!",
        description: `Reference: ${referenceNumber}. You'll receive SMS confirmation within 24 hours.`,
      });

      return { success: true, registration: data };
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
      const { data } = await supabase
        .from('rica_registrations')
        .select('registration_status, reference_number, completed_at')
        .eq('user_id', currentUser.id)
        .eq('user_type', currentUser.userType)
        .single();

      return data;
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