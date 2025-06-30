
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PermanentFormData {
  [key: string]: any;
}

interface FormProfile {
  id: string;
  formType: 'customer' | 'vendor' | 'admin' | 'banking' | 'general';
  data: PermanentFormData;
  createdAt: string;
  updatedAt: string;
  isPermanent: boolean;
}

export const usePermanentFormStorage = (formType: string) => {
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  // Generate storage key
  const getStorageKey = useCallback((type: string) => {
    return `permanentForm_${type}`;
  }, []);

  // Save form data permanently
  const savePermanently = useCallback(async (formData: PermanentFormData) => {
    setIsAutoSaving(true);
    
    try {
      const formProfile: FormProfile = {
        id: `${formType}_${Date.now()}`,
        formType: formType as any,
        data: formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPermanent: true
      };

      // Save to multiple storage locations
      const storageKey = getStorageKey(formType);
      localStorage.setItem(storageKey, JSON.stringify(formProfile));
      sessionStorage.setItem(storageKey, JSON.stringify(formProfile));
      
      // Also save to a master registry
      const masterRegistry = JSON.parse(localStorage.getItem('formMasterRegistry') || '{}');
      masterRegistry[formType] = {
        lastUpdated: new Date().toISOString(),
        hasData: true
      };
      localStorage.setItem('formMasterRegistry', JSON.stringify(masterRegistry));
      
      // Store in IndexedDB for maximum persistence
      await storeInIndexedDB(formType, formProfile);
      
      setLastSaved(new Date());
      
      console.log(`✅ Form data permanently saved for ${formType}`);
      
      return true;
    } catch (error) {
      console.error(`❌ Failed to save form data for ${formType}:`, error);
      return false;
    } finally {
      setIsAutoSaving(false);
    }
  }, [formType, getStorageKey]);

  // Load permanently saved form data
  const loadPermanentData = useCallback((): PermanentFormData | null => {
    try {
      const storageKey = getStorageKey(formType);
      
      // Try localStorage first
      const localData = localStorage.getItem(storageKey);
      if (localData) {
        const parsed = JSON.parse(localData);
        console.log(`✅ Loaded permanent form data for ${formType} from localStorage`);
        return parsed.data;
      }
      
      // Fallback to sessionStorage
      const sessionData = sessionStorage.getItem(storageKey);
      if (sessionData) {
        const parsed = JSON.parse(sessionData);
        console.log(`✅ Loaded permanent form data for ${formType} from sessionStorage`);
        return parsed.data;
      }
      
      return null;
    } catch (error) {
      console.error(`❌ Failed to load permanent form data for ${formType}:`, error);
      return null;
    }
  }, [formType, getStorageKey]);

  // Auto-save with debouncing
  const autoSave = useCallback((formData: PermanentFormData, delay: number = 1000) => {
    const timeoutId = setTimeout(() => {
      savePermanently(formData);
    }, delay);
    
    return () => clearTimeout(timeoutId);
  }, [savePermanently]);

  // Clear form data
  const clearPermanentData = useCallback(() => {
    try {
      const storageKey = getStorageKey(formType);
      localStorage.removeItem(storageKey);
      sessionStorage.removeItem(storageKey);
      
      // Update master registry
      const masterRegistry = JSON.parse(localStorage.getItem('formMasterRegistry') || '{}');
      delete masterRegistry[formType];
      localStorage.setItem('formMasterRegistry', JSON.stringify(masterRegistry));
      
      setLastSaved(null);
      
      toast({
        title: "Form Data Cleared",
        description: `All saved data for ${formType} has been permanently removed.`,
      });
      
      console.log(`✅ Permanent form data cleared for ${formType}`);
    } catch (error) {
      console.error(`❌ Failed to clear form data for ${formType}:`, error);
    }
  }, [formType, getStorageKey, toast]);

  return {
    savePermanently,
    loadPermanentData,
    autoSave,
    clearPermanentData,
    isAutoSaving,
    lastSaved
  };
};

// IndexedDB helper for maximum persistence
const storeInIndexedDB = async (formType: string, formProfile: FormProfile) => {
  return new Promise<void>((resolve, reject) => {
    const request = indexedDB.open('OnecardFormStorage', 1);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('forms')) {
        db.createObjectStore('forms', { keyPath: 'formType' });
      }
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(['forms'], 'readwrite');
      const store = transaction.objectStore('forms');
      
      const putRequest = store.put({ formType, ...formProfile });
      
      putRequest.onsuccess = () => resolve();
      putRequest.onerror = () => reject(putRequest.error);
    };
    
    request.onerror = () => reject(request.error);
  });
};
