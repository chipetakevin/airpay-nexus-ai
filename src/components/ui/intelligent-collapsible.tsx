
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IntelligentCollapsibleProps {
  title: string;
  icon: React.ReactNode;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  isComplete?: boolean;
  completedContent?: React.ReactNode;
  className?: string;
}

const IntelligentCollapsible: React.FC<IntelligentCollapsibleProps> = ({
  title,
  icon,
  badge,
  badgeVariant = 'default',
  children,
  defaultCollapsed = false,
  isComplete = false,
  completedContent,
  className = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  // Auto-collapse when complete
  useEffect(() => {
    if (isComplete && !isCollapsed) {
      setIsCollapsed(true);
    }
  }, [isComplete]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card className={`transition-all duration-300 ${className}`}>
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={toggleCollapse}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {icon}
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            {badge && (
              <Badge variant={badgeVariant} className="ml-2">
                {badge}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-auto hover:bg-gray-100"
          >
            {isCollapsed ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent className="pt-0">
          {isComplete && completedContent ? completedContent : children}
        </CardContent>
      )}
    </Card>
  );
};

export default IntelligentCollapsible;
