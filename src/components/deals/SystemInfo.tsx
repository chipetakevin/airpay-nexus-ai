
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';

const SystemInfo = () => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-blue-900">AI-Powered Deal Discovery</span>
        </div>
        <p className="text-sm text-blue-800">
          Our intelligent system continuously monitors 50+ vendors across South Africa, 
          using advanced web scraping and machine learning to find you the best airtime deals in real-time.
        </p>
      </CardContent>
    </Card>
  );
};

export default SystemInfo;
