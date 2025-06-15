
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Shield } from 'lucide-react';
import { usePersistentAuth } from '@/hooks/usePersistentAuth';

const SessionIndicator = () => {
  const { getRemainingSessionTime } = usePersistentAuth();
  const [timeRemaining, setTimeRemaining] = useState<{ hours: number; minutes: number } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const remaining = getRemainingSessionTime();
      setTimeRemaining(remaining ? { hours: remaining.hours, minutes: remaining.minutes } : null);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [getRemainingSessionTime]);

  if (!timeRemaining) return null;

  const isExpiringSoon = timeRemaining.hours === 0 && timeRemaining.minutes <= 30;

  return (
    <Badge 
      variant="outline" 
      className={`flex items-center gap-1 text-xs ${
        isExpiringSoon 
          ? 'bg-orange-50 text-orange-700 border-orange-300' 
          : 'bg-green-50 text-green-700 border-green-300'
      }`}
    >
      {isExpiringSoon ? <Clock className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
      {timeRemaining.hours}h {timeRemaining.minutes}m left
    </Badge>
  );
};

export default SessionIndicator;
