
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Radio, Sparkles } from 'lucide-react';

const BroadcastingHeader = () => {
  return (
    <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-full">
            <Radio className="w-8 h-8" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          Divinely Mobile Broadcasting Center
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Spread the word about amazing mobile deals to groups and individuals!
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Group Broadcasts
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            Individual Invites
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
};

export default BroadcastingHeader;
