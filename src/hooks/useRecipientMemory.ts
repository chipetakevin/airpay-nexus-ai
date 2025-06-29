import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SavedRecipient {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  network?: string;
  lastUsed: string;
  frequency: number;
  verified?: boolean;
}

interface RecipientData {
  name: string;
  phone: string;
  relationship: string;
}

export const useRecipientMemory = () => {
  const { toast } = useToast();
  const [savedRecipients, setSavedRecipients] = useState<SavedRecipient[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved recipients from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('savedRecipients');
      if (stored) {
        const recipients = JSON.parse(stored);
        setSavedRecipients(recipients);
      }
    } catch (error) {
      console.error('Error loading saved recipients:', error);
    }
  }, []);

  // Auto-detect existing recipient based on phone number
  const detectRecipient = useCallback((phone: string): SavedRecipient | null => {
    if (!phone || phone.length < 10) return null;
    
    // Normalize phone number for comparison
    const normalizedPhone = phone.replace(/\D/g, '');
    
    return savedRecipients.find(recipient => {
      const savedPhone = recipient.phone.replace(/\D/g, '');
      return savedPhone === normalizedPhone;
    }) || null;
  }, [savedRecipients]);

  // Get suggestions based on partial phone or name input
  const getSuggestions = useCallback((input: string): SavedRecipient[] => {
    if (!input || input.length < 2) return [];
    
    const searchTerm = input.toLowerCase();
    
    return savedRecipients
      .filter(recipient => 
        recipient.name.toLowerCase().includes(searchTerm) ||
        recipient.phone.includes(input) ||
        recipient.relationship.toLowerCase().includes(searchTerm)
      )
      .sort((a, b) => {
        // Sort by frequency and last used
        if (b.frequency !== a.frequency) {
          return b.frequency - a.frequency;
        }
        return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
      })
      .slice(0, 5); // Limit to top 5 suggestions
  }, [savedRecipients]);

  // Save or update recipient information
  const saveRecipient = useCallback(async (recipientData: RecipientData, network?: string) => {
    if (!recipientData.phone || !recipientData.name) return;

    setIsLoading(true);
    
    try {
      const normalizedPhone = recipientData.phone.replace(/\D/g, '');
      const existingIndex = savedRecipients.findIndex(r => 
        r.phone.replace(/\D/g, '') === normalizedPhone
      );

      const recipientId = existingIndex >= 0 
        ? savedRecipients[existingIndex].id 
        : `recipient_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const updatedRecipient: SavedRecipient = {
        id: recipientId,
        name: recipientData.name,
        phone: recipientData.phone,
        relationship: recipientData.relationship,
        network: network,
        lastUsed: new Date().toISOString(),
        frequency: existingIndex >= 0 ? savedRecipients[existingIndex].frequency + 1 : 1,
        verified: network ? true : false
      };

      let updatedRecipients: SavedRecipient[];
      
      if (existingIndex >= 0) {
        // Update existing recipient
        updatedRecipients = [...savedRecipients];
        updatedRecipients[existingIndex] = updatedRecipient;
      } else {
        // Add new recipient
        updatedRecipients = [...savedRecipients, updatedRecipient];
      }

      // Keep only the most recent 50 recipients to avoid storage bloat
      updatedRecipients = updatedRecipients
        .sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
        .slice(0, 50);

      setSavedRecipients(updatedRecipients);
      localStorage.setItem('savedRecipients', JSON.stringify(updatedRecipients));

      toast({
        title: "Recipient Saved",
        description: `${recipientData.name} has been saved for future payments`,
        duration: 2000
      });

    } catch (error) {
      console.error('Error saving recipient:', error);
      toast({
        title: "Save Failed",
        description: "Could not save recipient details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [savedRecipients, toast]);

  // Get frequently used recipients
  const getFrequentRecipients = useCallback((limit: number = 3): SavedRecipient[] => {
    return savedRecipients
      .sort((a, b) => {
        // Sort by frequency first, then by recent usage
        if (b.frequency !== a.frequency) {
          return b.frequency - a.frequency;
        }
        return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
      })
      .slice(0, limit);
  }, [savedRecipients]);

  // Remove a saved recipient
  const removeRecipient = useCallback((recipientId: string) => {
    const updatedRecipients = savedRecipients.filter(r => r.id !== recipientId);
    setSavedRecipients(updatedRecipients);
    localStorage.setItem('savedRecipients', JSON.stringify(updatedRecipients));
    
    toast({
      title: "Recipient Removed",
      description: "Recipient has been removed from saved list",
      duration: 2000
    });
  }, [savedRecipients, toast]);

  return {
    savedRecipients,
    isLoading,
    detectRecipient,
    getSuggestions,
    saveRecipient,
    getFrequentRecipients,
    removeRecipient
  };
};
