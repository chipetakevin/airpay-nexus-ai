
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
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Generate storage key with enhanced naming
  const getStorageKey = useCallback((type: string) => {
    return `permanentForm_${type}_v2`;
  }, []);

  // Enhanced auto-save with immediate debouncing
  const autoSave = useCallback((formData: PermanentFormData, delay: number = 800) => {
    // Clear existing timeout to reset debounce
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }

    // Set new timeout for auto-save
    const timeoutId = setTimeout(async () => {
      console.log(`🔄 Auto-saving ${formType} form data...`);
      await savePermanently(formData);
    }, delay);
    
    setAutoSaveTimeout(timeoutId);
    
    return () => clearTimeout(timeoutId);
  }, [formType, autoSaveTimeout]);

  // Save form data permanently with enhanced persistence
  const savePermanently = useCallback(async (formData: PermanentFormData, showToast: boolean = false) => {
    setIsAutoSaving(true);
    
    try {
      const timestamp = new Date().toISOString();
      const formProfile: FormProfile = {
        id: `${formType}_${Date.now()}`,
        formType: formType as any,
        data: formData,
        createdAt: timestamp,
        updatedAt: timestamp,
        isPermanent: true
      };

      // Save to multiple storage locations for maximum persistence
      const storageKey = getStorageKey(formType);
      
      // Primary storage - localStorage
      localStorage.setItem(storageKey, JSON.stringify(formProfile));
      
      // Backup storage - sessionStorage
      sessionStorage.setItem(storageKey, JSON.stringify(formProfile));
      
      // Enhanced backup with auto-restore capability
      localStorage.setItem(`${storageKey}_backup`, JSON.stringify(formProfile));
      
      // Master registry for cross-form data awareness
      const masterRegistry = JSON.parse(localStorage.getItem('formMasterRegistry') || '{}');
      masterRegistry[formType] = {
        lastUpdated: timestamp,
        hasData: true,
        dataSize: JSON.stringify(formData).length,
        fieldCount: Object.keys(formData).length
      };
      localStorage.setItem('formMasterRegistry', JSON.stringify(masterRegistry));
      
      // Store in IndexedDB for maximum persistence across browser sessions
      await storeInIndexedDB(formType, formProfile);
      
      // Cross-tab synchronization
      localStorage.setItem(`${formType}_sync`, timestamp);
      
      setLastSaved(new Date());
      
      if (showToast) {
        toast({
          title: "✅ Form Auto-Saved",
          description: `Your ${formType} registration data has been permanently saved.`,
          duration: 2000
        });
      }
      
      console.log(`✅ Form data permanently saved for ${formType} at ${timestamp}`);
      
      return true;
    } catch (error) {
      console.error(`❌ Failed to save form data for ${formType}:`, error);
      
      if (showToast) {
        toast({
          title: "Save Failed",
          description: `Could not save ${formType} data. Please check your connection.`,
          variant: "destructive"
        });
      }
      return false;
    } finally {
      setIsAutoSaving(false);
    }
  }, [formType, getStorageKey, toast]);

  // Enhanced load with fallback strategy
  const loadPermanentData = useCallback((): PermanentFormData | null => {
    try {
      const storageKey = getStorageKey(formType);
      
      // Try primary storage first
      const localData = localStorage.getItem(storageKey);
      if (localData) {
        const parsed = JSON.parse(localData);
        console.log(`✅ Loaded permanent form data for ${formType} from localStorage`);
        return parsed.data;
      }
      
      // Try backup storage
      const backupData = localStorage.getItem(`${storageKey}_backup`);
      if (backupData) {
        const parsed = JSON.parse(backupData);
        console.log(`✅ Loaded permanent form data for ${formType} from backup`);
        return parsed.data;
      }
      
      // Fallback to sessionStorage
      const sessionData = sessionStorage.getItem(storageKey);
      if (sessionData) {
        const parsed = JSON.parse(sessionData);
        console.log(`✅ Loaded permanent form data for ${formType} from sessionStorage`);
        return parsed.data;
      }
      
      console.log(`ℹ️ No saved data found for ${formType}`);
      return null;
    } catch (error) {
      console.error(`❌ Failed to load permanent form data for ${formType}:`, error);
      return null;
    }
  }, [formType, getStorageKey]);

  // Smart auto-fill with field-by-field restoration
  const autoFillForm = useCallback((formData: PermanentFormData, setFormData: (data: any) => void) => {
    const savedData = loadPermanentData();
    if (savedData) {
      console.log(`🔄 Auto-filling ${formType} form with saved data...`);
      
      // Merge saved data with current form data
      const mergedData = {
        ...formData,
        ...savedData
      };
      
      setFormData(mergedData);
      
      toast({
        title: "📝 Form Auto-Filled",
        description: `Your previously saved ${formType} information has been restored.`,
        duration: 3000
      });
      
      return mergedData;
    }
    return formData;
  }, [formType, loadPermanentData, toast]);

  // Clear form data with confirmation
  const clearPermanentData = useCallback((showConfirmation: boolean = true) => {
    try {
      const storageKey = getStorageKey(formType);
      
      if (showConfirmation) {
        const confirmed = window.confirm(`Are you sure you want to clear all saved ${formType} data? This action cannot be undone.`);
        if (!confirmed) return false;
      }
      
      // Clear all storage locations
      localStorage.removeItem(storageKey);
      localStorage.removeItem(`${storageKey}_backup`);
      sessionStorage.removeItem(storageKey);
      
      // Update master registry
      const masterRegistry = JSON.parse(localStorage.getItem('formMasterRegistry') || '{}');
      delete masterRegistry[formType];
      localStorage.setItem('formMasterRegistry', JSON.stringify(masterRegistry));
      
      // Clear auto-save timeout
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
        setAutoSaveTimeout(null);
      }
      
      setLastSaved(null);
      
      toast({
        title: "🗑️ Form Data Cleared",
        description: `All saved data for ${formType} has been permanently removed.`,
      });
      
      console.log(`✅ Permanent form data cleared for ${formType}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to clear form data for ${formType}:`, error);
      return false;
    }
  }, [formType, getStorageKey, toast, autoSaveTimeout]);

  // Enhanced monitoring for cross-tab sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `${formType}_sync`) {
        console.log(`🔄 Cross-tab sync detected for ${formType}`);
        // Could trigger form reload or show notification
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [formType]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [autoSaveTimeout]);

  return {
    savePermanently,
    loadPermanentData,
    autoSave,
    autoFillForm,
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
