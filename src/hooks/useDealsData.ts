
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Deal } from '@/types/deals';
import { loadDealsFromSupabase, getSampleDeals } from '@/services/dealsService';
import { supabase } from '@/integrations/supabase/client';

export const useDealsData = () => {
  const { toast } = useToast();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [scrapingStatus, setScrapingStatus] = useState<'idle' | 'scraping' | 'completed'>('idle');

  const triggerAutonomousScraping = async () => {
    try {
      setScrapingStatus('scraping');
      console.log('Triggering autonomous deal scraping...');
      
      const { data, error } = await supabase.functions.invoke('autonomous-deal-scraper', {
        body: { trigger: 'manual' }
      });
      
      if (error) {
        console.error('Error triggering scraper:', error);
        toast({
          title: "Scraping Error",
          description: "Failed to trigger autonomous deal scraping",
          variant: "destructive"
        });
      } else {
        console.log('Scraping completed:', data);
        setScrapingStatus('completed');
        
        // Wait a moment then reload deals
        setTimeout(() => {
          loadDeals(false);
          setScrapingStatus('idle');
        }, 2000);
      }
    } catch (error) {
      console.error('Scraping error:', error);
      setScrapingStatus('idle');
    }
  };

  const loadDeals = async (showToast = false) => {
    setIsLoading(true);
    try {
      const dealsData = await loadDealsFromSupabase();
      // Ensure we have both airtime and data deals
      const enhancedDeals = dealsData.length > 0 ? dealsData : getSampleDeals();
      setDeals(enhancedDeals);
      setLastRefresh(new Date());
      
      if (showToast) {
        toast({
          title: "Deals Updated",
          description: "Latest deals have been loaded successfully.",
          duration: 2000
        });
      }
    } catch (error) {
      console.error('Error loading deals:', error);
      if (showToast) {
        toast({
          title: "Error Loading Deals",
          description: "Unable to load deals. Using sample data.",
          variant: "destructive"
        });
      }
      setDeals(getSampleDeals());
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualRefresh = async () => {
    // Trigger autonomous scraping first
    await triggerAutonomousScraping();
    // Then load deals with toast
    loadDeals(true);
  };

  // Check if we should trigger scraping based on last scrape time
  const shouldTriggerScraping = () => {
    const lastScrapeTime = localStorage.getItem('lastScrapeTime');
    if (!lastScrapeTime) return true;
    
    const lastScrape = new Date(lastScrapeTime);
    const now = new Date();
    const timeDiff = now.getTime() - lastScrape.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    
    return hoursDiff >= 24; // Only scrape if 24+ hours have passed
  };

  // Auto-refresh effect with 24-hour autonomous scraping
  useEffect(() => {
    // Initial load
    loadDeals();

    // Check if we need to trigger scraping on initial load
    if (shouldTriggerScraping()) {
      console.log('24 hours have passed, triggering autonomous scraping...');
      triggerAutonomousScraping();
      localStorage.setItem('lastScrapeTime', new Date().toISOString());
    }

    // Set up auto-refresh interval (24 hours = 86400000 milliseconds)
    const autoRefreshInterval = setInterval(async () => {
      console.log('24-hour auto-refresh: triggering autonomous scraping...');
      await triggerAutonomousScraping();
      localStorage.setItem('lastScrapeTime', new Date().toISOString());
    }, 86400000); // 24 hours

    // Cleanup interval on component unmount
    return () => {
      clearInterval(autoRefreshInterval);
    };
  }, []);

  return {
    deals,
    isLoading,
    lastRefresh,
    scrapingStatus,
    handleManualRefresh
  };
};
