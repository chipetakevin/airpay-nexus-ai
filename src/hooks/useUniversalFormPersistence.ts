import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePermanentFormStorage } from './usePermanentFormStorage';

interface UniversalFormConfig {
  formType: 'customer' | 'vendor' | 'admin' | 'fieldworker' | 'banking';
  initialData: any;
  autoSaveDelay?: number;
  showPersistenceStatus?: boolean;
}

export const useUniversalFormPersistence = <T extends Record<string, any>>(
  config: UniversalFormConfig
) => {
  const { toast } = useToast();
  const { 
    savePermanently, 
    loadPermanentData, 
    autoSave, 
    autoFillForm, 
    clearPermanentData,
    isAutoSaving,
    lastSaved
  } = usePermanentFormStorage(config.formType);

  const [formData, setFormData] = useState<T>(config.initialData);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Enhanced initialization with auto-fill
  useEffect(() => {
    if (!isInitialized) {
      const initializeForm = async () => {
        try {
          const savedData = loadPermanentData();
          if (savedData && Object.keys(savedData).length > 0) {
            console.log(`🔄 Auto-filling ${config.formType} form with saved data...`, savedData);
            
            const mergedData = {
              ...config.initialData,
              ...savedData
            };
            
            setFormData(mergedData);
            
            toast({
              title: `📝 ${config.formType.charAt(0).toUpperCase() + config.formType.slice(1)} Form Auto-Filled!`,
              description: "Your previously saved information has been restored.",
              duration: 3000
            });
          } else {
            console.log(`ℹ️ No saved ${config.formType} data found - starting with clean form`);
          }
        } catch (error) {
          console.error(`Error initializing ${config.formType} form:`, error);
        } finally {
          setIsInitialized(true);
        }
      };

      initializeForm();
    }
  }, [isInitialized, config.formType, config.initialData, loadPermanentData, toast]);

  // Enhanced input change handler with auto-save
  const handleInputChange = useCallback((field: keyof T, value: any) => {
    const updatedFormData = {
      ...formData,
      [field]: value
    };
    
    setFormData(updatedFormData);
    setHasUnsavedChanges(true);
    
    // Enhanced auto-save with optimized debouncing
    autoSave(updatedFormData, config.autoSaveDelay || 800);
    
    // Mark as saved after auto-save completes
    setTimeout(() => {
      setHasUnsavedChanges(false);
    }, (config.autoSaveDelay || 800) + 100);
    
    return updatedFormData;
  }, [formData, autoSave, config.autoSaveDelay]);

  // Bulk update handler
  const updateFormData = useCallback((updates: Partial<T>) => {
    const updatedFormData = {
      ...formData,
      ...updates
    };
    
    setFormData(updatedFormData);
    setHasUnsavedChanges(true);
    
    // Auto-save bulk updates
    autoSave(updatedFormData, config.autoSaveDelay || 800);
    
    return updatedFormData;
  }, [formData, autoSave, config.autoSaveDelay]);

  // Force save handler
  const forceSave = useCallback(async (showToast: boolean = true) => {
    try {
      const success = await savePermanently(formData, showToast);
      if (success) {
        setHasUnsavedChanges(false);
      }
      return success;
    } catch (error) {
      console.error(`Failed to force save ${config.formType} form:`, error);
      return false;
    }
  }, [formData, savePermanently, config.formType]);

  // Reset form handler
  const resetForm = useCallback(() => {
    setFormData(config.initialData);
    setHasUnsavedChanges(false);
    clearPermanentData(false); // Don't show confirmation for programmatic reset
  }, [config.initialData, clearPermanentData]);

  // Before unload protection
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `${config.formType}_sync` && e.newValue) {
        console.log(`🔄 Cross-tab sync detected for ${config.formType}`);
        // Optionally reload form data from storage
        const savedData = loadPermanentData();
        if (savedData) {
          setFormData(prev => ({ ...prev, ...savedData }));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [config.formType, loadPermanentData]);

  return {
    // Form data and state
    formData,
    isInitialized,
    hasUnsavedChanges,
    
    // Form handlers
    handleInputChange,
    updateFormData,
    resetForm,
    
    // Persistence handlers
    forceSave,
    clearData: clearPermanentData,
    
    // Status indicators
    isAutoSaving,
    lastSaved,
    
    // Configuration
    formType: config.formType
  };
};