
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';
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
  accordionMode?: boolean;
  onToggle?: (isExpanded: boolean) => void;
  persistState?: boolean;
  lazyLoad?: boolean;
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
  className = '',
  accordionMode = false,
  onToggle,
  persistState = true,
  lazyLoad = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();
  const storageKey = `collapsible-${title.replace(/\s+/g, '-').toLowerCase()}`;
  
  // Initialize state with persistence
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (!persistState) return defaultCollapsed;
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : defaultCollapsed;
  });
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasBeenExpanded, setHasBeenExpanded] = useState(!lazyLoad || !isCollapsed);

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

  // Persist state changes
  useEffect(() => {
    if (persistState) {
      localStorage.setItem(storageKey, JSON.stringify(isCollapsed));
    }
  }, [isCollapsed, persistState, storageKey]);

  // Listen for close-all events
  useEffect(() => {
    const handleCloseAll = (e: StorageEvent) => {
      if (e.key === 'collapsible-sections-close-all') {
        setIsCollapsed(true);
        setIsAnimating(false);
      }
    };

    window.addEventListener('storage', handleCloseAll);
    return () => window.removeEventListener('storage', handleCloseAll);
  }, []);

  // Debounced toggle to prevent rapid clicking
  const toggleCollapse = useCallback(() => {
    if (isAnimating) return;
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      setIsAnimating(true);
      const newState = !isCollapsed;
      
      setIsCollapsed(newState);
      
      // Mark as expanded for lazy loading
      if (!newState && lazyLoad && !hasBeenExpanded) {
        setHasBeenExpanded(true);
      }
      
      // Callback for accordion mode
      onToggle?.(newState);
      
      setTimeout(() => setIsAnimating(false), 100);
    }, 50);
  }, [isCollapsed, isAnimating, onToggle, lazyLoad, hasBeenExpanded]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCollapse();
    }
  }, [toggleCollapse]);

  // Outside click detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node) && !isCollapsed) {
        // Only collapse if in accordion mode or explicitly configured
        if (accordionMode) {
          setIsCollapsed(true);
        }
      }
    };

    if (accordionMode) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isCollapsed, accordionMode]);

  return (
    <Card 
      ref={cardRef}
      className={`transition-all duration-500 ease-in-out shadow-sm border-l-4 hover:shadow-lg transform hover:scale-[1.01] focus-within:ring-2 focus-within:ring-blue-200 ${className} ${isAnimating ? 'pointer-events-none' : ''}`}
    >
      <CardHeader 
        id={`header-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="cursor-pointer hover:bg-gray-50/70 active:bg-gray-100/50 transition-all duration-300 py-3 select-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset rounded-t-lg"
        onClick={toggleCollapse}
        role="button"
        tabIndex={0}
        aria-expanded={!isCollapsed}
        aria-controls={`content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        aria-label={`${isCollapsed ? 'Expand' : 'Collapse'} ${title} section`}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`transition-all duration-300 ${isAnimating ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}>
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
                aria-hidden="true"
              >
                {badge}
              </Badge>
            )}
          </div>
          <div
            className="p-1 h-6 w-6 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center"
            aria-hidden="true"
          >
            <ChevronDown 
              className={`w-3 h-3 transition-transform duration-400 ease-in-out ${!isCollapsed ? 'rotate-180' : 'rotate-0'}`} 
            />
          </div>
        </div>
      </CardHeader>
      
      <div 
        ref={contentRef}
        id={`content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        role="region"
        aria-labelledby={`header-${title.replace(/\s+/g, '-').toLowerCase()}`}
        aria-hidden={isCollapsed}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          !isCollapsed 
            ? 'max-h-[2000px] opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
        style={{
          transitionProperty: 'max-height, opacity, padding, margin',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'max-height, opacity'
        }}
      >
        <CardContent 
          className={`pt-0 pb-4 transition-all duration-300 ${!isCollapsed ? 'animate-fade-in' : ''}`}
          tabIndex={!isCollapsed ? 0 : -1}
        >
          {/* Lazy load content only when expanded or previously expanded */}
          {lazyLoad ? (
            hasBeenExpanded ? (
              isComplete && completedContent ? completedContent : children
            ) : (
              <div className="py-4 text-center text-gray-500 text-sm">
                Content will load when expanded...
              </div>
            )
          ) : (
            isComplete && completedContent ? completedContent : children
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default IntelligentCollapsible;
