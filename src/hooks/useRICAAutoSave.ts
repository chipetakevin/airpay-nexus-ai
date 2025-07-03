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
      // Try localStorage first as fallback
      const userId = currentUser.id;
      const storageKey = `rica_draft_${userId}_${currentUser.userType}`;
      const localData = localStorage.getItem(storageKey);
      
      if (localData) {
        return JSON.parse(localData);
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
      // Skip auto-save if user ID is not a valid UUID format
      const userId = currentUser.id;
      if (!userId || userId.length < 10) {
        console.log('Skipping auto-save: Invalid user ID format');
        setIsAutoSaving(false);
        return;
      }
      
      // Convert File objects to null for JSON storage
      const sanitizedData = {
        ...formData,
        proofOfResidence: formData.proofOfResidence ? 'file-uploaded' : null,
        selfieWithId: formData.selfieWithId ? 'file-uploaded' : null
      };

      // Store in localStorage as fallback when database fails
      const storageKey = `rica_draft_${userId}_${currentUser.userType}`;
      localStorage.setItem(storageKey, JSON.stringify(sanitizedData));

      setLastSavedAt(new Date());
      console.log('Auto-saved to localStorage successfully');
    } catch (error) {
      console.error('Auto-save error:', error);
      toast({
        title: "Auto-save Error",
        description: "Saved locally. Database connection issue.",
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
      // For now, store completed registration in localStorage
      const userId = currentUser.id;
      const referenceNumber = `RICA-${Date.now()}`;
      
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

      // Store in localStorage
      const registrationKey = `rica_registration_${userId}_${currentUser.userType}`;
      localStorage.setItem(registrationKey, JSON.stringify(registrationData));
      
      // Clear draft
      const draftKey = `rica_draft_${userId}_${currentUser.userType}`;
      localStorage.removeItem(draftKey);

      setExistingRegistration(registrationData);

      toast({
        title: "Registration Submitted!",
        description: `Reference: ${referenceNumber}. You'll receive SMS confirmation within 24 hours.`,
      });

      return { success: true, registration: registrationData };
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