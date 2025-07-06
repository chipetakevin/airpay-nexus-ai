import { useState, useEffect } from 'react';
import documentationAutoUpdater, { MVNEFeature, addMVNEFeature } from '@/utils/documentationAutoUpdater';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook for automatically updating MVNE documentation when new features are added
 */
export const useDocumentationAutoUpdater = () => {
  const [features, setFeatures] = useState(documentationAutoUpdater.MVNE_FEATURES);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const stats = documentationAutoUpdater.getFeatureStatistics();

  /**
   * Add a new feature and automatically update documentation
   */
  const addFeature = async (feature: Omit<MVNEFeature, 'addedDate' | 'version'>) => {
    setIsUpdating(true);
    try {
      const result = addMVNEFeature(feature);
      const newFeature = result.feature;
      setFeatures([...documentationAutoUpdater.MVNE_FEATURES]);
      
      // Auto-update documentation
      const docResult = documentationAutoUpdater.autoUpdateDocumentation();
      setLastUpdated(docResult.updates.lastUpdated);
      
      toast({
        title: "Feature Added Successfully",
        description: `${newFeature.name} has been added and documentation updated automatically.`,
      });
      
      console.log('🚀 Documentation auto-updated:', docResult);
      return newFeature;
    } catch (error) {
      console.error('Error adding feature:', error);
      toast({
        title: "Error Adding Feature",
        description: "Failed to add feature. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Force update documentation
   */
  const forceUpdateDocumentation = () => {
    setIsUpdating(true);
    try {
      const result = documentationAutoUpdater.autoUpdateDocumentation();
      setLastUpdated(result.updates.lastUpdated);
      
      toast({
        title: "Documentation Updated",
        description: "MVNE documentation has been updated with latest features.",
      });
      
      return result;
    } catch (error) {
      console.error('Error updating documentation:', error);
      toast({
        title: "Update Error",
        description: "Failed to update documentation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Get current production readiness checklist
   */
  const getProductionChecklist = () => {
    return documentationAutoUpdater.generateProductionReadinessChecklist();
  };

  /**
   * Get current core architecture section
   */
  const getCoreArchitecture = () => {
    return documentationAutoUpdater.generateCoreArchitectureSection();
  };

  // Auto-update on component mount
  useEffect(() => {
    const result = documentationAutoUpdater.autoUpdateDocumentation();
    setLastUpdated(result.updates.lastUpdated);
  }, []);

  return {
    features,
    stats,
    lastUpdated,
    isUpdating,
    addFeature,
    forceUpdateDocumentation,
    getProductionChecklist,
    getCoreArchitecture,
  };
};

/**
 * Hook for monitoring documentation updates
 */
export const useDocumentationMonitor = () => {
  const [updateCount, setUpdateCount] = useState(0);
  const [latestFeatures, setLatestFeatures] = useState<MVNEFeature[]>([]);

  useEffect(() => {
    // Monitor for new features added
    const currentFeatures = documentationAutoUpdater.MVNE_FEATURES;
    const recentFeatures = currentFeatures
      .filter(f => {
        const addedDate = new Date(f.addedDate);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return addedDate >= sevenDaysAgo;
      })
      .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());

    setLatestFeatures(recentFeatures);
    setUpdateCount(recentFeatures.length);
  }, []);

  return {
    updateCount,
    latestFeatures,
    hasRecentUpdates: updateCount > 0
  };
};

export default useDocumentationAutoUpdater;