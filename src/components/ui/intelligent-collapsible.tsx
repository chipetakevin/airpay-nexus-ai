
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
  defaultCollapsed = true,
  isComplete = false,
  completedContent,
  className = ''
}) => {
  // Initialize with defaultCollapsed value immediately
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-collapse when complete with smooth animation
  useEffect(() => {
    if (isComplete && !isCollapsed) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsCollapsed(true);
        setIsAnimating(false);
      }, 150);
    }
  }, [isComplete]);

  const toggleCollapse = () => {
    if (isAnimating) return; // Prevent rapid clicking
    
    setIsAnimating(true);
    setTimeout(() => {
      setIsCollapsed(!isCollapsed);
      setIsAnimating(false);
    }, 50);
  };

  return (
    <Card className={`transition-all duration-500 ease-in-out shadow-sm border-l-4 hover:shadow-md transform hover:scale-[1.01] ${className} ${isAnimating ? 'pointer-events-none' : ''}`}>
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50/70 active:bg-gray-100/50 transition-all duration-300 py-3 select-none"
        onClick={toggleCollapse}
        role="button"
        tabIndex={0}
        aria-expanded={!isCollapsed}
        aria-controls={`content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCollapse();
          }
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`transition-transform duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
                {icon}
              </div>
              <h3 className="text-base font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-200">
                {title}
              </h3>
            </div>
            {badge && (
              <Badge 
                variant={badgeVariant} 
                className="ml-2 text-xs px-2 py-1 transition-all duration-200 hover:scale-105"
              >
                {badge}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-6 w-6 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
            tabIndex={-1}
          >
            <div className={`transition-transform duration-300 ease-in-out ${!isCollapsed ? 'rotate-180' : 'rotate-0'}`}>
              <ChevronDown className="w-3 h-3" />
            </div>
          </Button>
        </div>
      </CardHeader>
      
      <div 
        id={`content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          !isCollapsed 
            ? 'max-h-[1000px] opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
        style={{
          transitionProperty: 'max-height, opacity, padding',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <CardContent className={`pt-0 pb-4 transition-all duration-300 ${!isCollapsed ? 'animate-fade-in' : ''}`}>
          {isComplete && completedContent ? completedContent : children}
        </CardContent>
      </div>
    </Card>
  );
};

export default IntelligentCollapsible;
