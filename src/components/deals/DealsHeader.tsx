
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Bell } from 'lucide-react';

interface DealsHeaderProps {
  lastRefresh: Date;
  scrapingStatus: 'idle' | 'scraping' | 'completed';
  isLoading: boolean;
  onManualRefresh: () => void;
}

const DealsHeader = ({ lastRefresh, scrapingStatus, isLoading, onManualRefresh }: DealsHeaderProps) => {
  const formatLastRefresh = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return `${diffInMinutes}m ago`;
    }
  };

  const getScrapingStatusIndicator = () => {
    switch (scrapingStatus) {
      case 'scraping':
        return (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-orange-600">Scraping retailers...</span>
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-blue-600">Fresh deals loaded</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600">Auto-scraping: 60s</span>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 className="text-xl font-bold mb-2">🔍 Smart Airtime & Data Deals</h3>
        <p className="text-gray-600 text-sm">AI-powered deal discovery from top SA retailers</p>
        <div className="flex flex-col sm:flex-row gap-2 mt-1">
          <span className="text-xs text-gray-500">Last updated: {formatLastRefresh(lastRefresh)}</span>
          {getScrapingStatusIndicator()}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Scanning: Takealot, Game, Vodacom, MTN, Cell C & more
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onManualRefresh}
          disabled={isLoading || scrapingStatus === 'scraping'}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading || scrapingStatus === 'scraping' ? 'animate-spin' : ''}`} />
          {scrapingStatus === 'scraping' ? 'Scraping...' : 'Refresh'}
        </Button>
        <Button size="sm" variant="outline" className="flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Alerts
        </Button>
      </div>
    </div>
  );
};

export default DealsHeader;
