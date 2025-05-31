
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Clock, 
  Database,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AutonomousScrapingStatus = () => {
  const { toast } = useToast();
  const [scrapingStats, setScrapingStats] = useState({
    lastRun: null as Date | null,
    dealsFound: 0,
    retailersScanned: [],
    status: 'idle' as 'idle' | 'running' | 'completed' | 'error'
  });

  const triggerManualScrape = async () => {
    setScrapingStats(prev => ({ ...prev, status: 'running' }));
    
    try {
      const { data, error } = await supabase.functions.invoke('autonomous-deal-scraper');
      
      if (error) throw error;
      
      setScrapingStats({
        lastRun: new Date(),
        dealsFound: data.dealsFound || 0,
        retailersScanned: data.retailers || [],
        status: 'completed'
      });
      
      toast({
        title: "Scraping Completed",
        description: `Found ${data.dealsFound} new deals from SA retailers`,
        duration: 3000
      });
      
    } catch (error) {
      console.error('Manual scrape error:', error);
      setScrapingStats(prev => ({ ...prev, status: 'error' }));
      
      toast({
        title: "Scraping Failed",
        description: "Unable to complete autonomous scraping",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = () => {
    switch (scrapingStats.status) {
      case 'running':
        return <Badge className="bg-orange-100 text-orange-800">Running</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Idle</Badge>;
    }
  };

  const getStatusIcon = () => {
    switch (scrapingStats.status) {
      case 'running':
        return <Loader2 className="w-4 h-4 animate-spin text-orange-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Autonomous Deal Scraper
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Last Run</div>
            <div className="font-semibold">
              {scrapingStats.lastRun ? 
                scrapingStats.lastRun.toLocaleTimeString() : 
                'Never'
              }
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Deals Found</div>
            <div className="font-semibold flex items-center gap-1">
              <Database className="w-4 h-4" />
              {scrapingStats.dealsFound}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm text-gray-600">Status</div>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="font-medium">
              {scrapingStats.status === 'running' ? 'Scanning SA retailers...' :
               scrapingStats.status === 'completed' ? 'Latest scan completed' :
               scrapingStats.status === 'error' ? 'Last scan failed' :
               'Ready to scan'}
            </span>
          </div>
        </div>
        
        {scrapingStats.retailersScanned.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">Retailers Scanned</div>
            <div className="flex flex-wrap gap-1">
              {scrapingStats.retailersScanned.map((retailer, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {retailer}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <Button 
          onClick={triggerManualScrape}
          disabled={scrapingStats.status === 'running'}
          className="w-full"
          size="sm"
        >
          {scrapingStats.status === 'running' ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Scraping in Progress...
            </>
          ) : (
            <>
              <Globe className="w-4 h-4 mr-2" />
              Trigger Manual Scrape
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AutonomousScrapingStatus;
