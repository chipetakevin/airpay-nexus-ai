
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TabContentContainerProps {
  icon: string;
  title: string;
  description: string;
  badges: Array<{
    text: string;
    className: string;
  }>;
  headerGradient: string;
  children: React.ReactNode;
}

const TabContentContainer = ({ 
  icon, 
  title, 
  description, 
  badges, 
  headerGradient, 
  children 
}: TabContentContainerProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-200">
      <CardHeader className={`bg-gradient-to-r ${headerGradient} rounded-t-xl border-b border-gray-100 p-4 md:p-6`}>
        <CardTitle className="flex items-center gap-3 md:gap-4 text-lg md:text-xl">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-xl md:text-2xl">{icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 md:gap-3">
              {title}
              {badges.map((badge, index) => (
                <Badge key={index} className={badge.className}>
                  {badge.text}
                </Badge>
              ))}
            </div>
            <p className="text-gray-600 text-sm md:text-base font-normal mt-1 md:mt-2">{description}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default TabContentContainer;
