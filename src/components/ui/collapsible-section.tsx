import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CollapsibleSectionProps {
  children: React.ReactNode;
  className?: string;
  defaultVisible?: boolean;
  showToggleButton?: boolean;
  showCloseButton?: boolean;
  onToggle?: (isVisible: boolean) => void;
  onClose?: () => void;
  toggleButtonText?: {
    show: string;
    hide: string;
  };
  animationDuration?: number;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  children,
  className = "",
  defaultVisible = true,
  showToggleButton = true,
  showCloseButton = false,
  onToggle,
  onClose,
  toggleButtonText = { show: "Show", hide: "Hide" },
  animationDuration = 500
}) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const handleToggle = async () => {
    if (isCollapsing) return;

    setIsCollapsing(true);
    const newVisibility = !isVisible;

    if (newVisibility) {
      // Showing: Set height first, then animate
      setIsVisible(true);
      setTimeout(() => {
        setIsCollapsing(false);
      }, animationDuration);
    } else {
      // Hiding: Animate first, then set visibility
      setTimeout(() => {
        setIsVisible(false);
        setIsCollapsing(false);
      }, animationDuration);
    }

    onToggle?.(newVisibility);
  };

  const handleClose = async () => {
    if (isCollapsing) return;

    setIsCollapsing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsCollapsing(false);
      onClose?.();
    }, animationDuration);
  };

  if (!isVisible && !isCollapsing) {
    return null;
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Control Buttons */}
      {(showToggleButton || showCloseButton) && (
        <div className="flex items-center gap-2 mb-3">
          {showToggleButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggle}
              disabled={isCollapsing}
              className="flex items-center gap-2 text-sm"
            >
              {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {isVisible ? toggleButtonText.hide : toggleButtonText.show}
            </Button>
          )}
          
          {showCloseButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={isCollapsing}
              className="flex items-center gap-2 text-sm text-destructive hover:text-destructive"
            >
              <X className="w-4 h-4" />
              Close
            </Button>
          )}
        </div>
      )}

      {/* Collapsible Content */}
      <div
        ref={contentRef}
        className={cn(
          "transition-all duration-500 ease-in-out",
          isCollapsing && !isVisible && "opacity-0",
          isCollapsing && isVisible && "opacity-100"
        )}
        style={{
          height: isCollapsing && !isVisible 
            ? '0px' 
            : isVisible 
              ? `${contentHeight}px` 
              : 'auto',
          overflow: isCollapsing ? 'hidden' : 'visible'
        }}
      >
        <div className={cn(
          "transition-opacity duration-300",
          isCollapsing && !isVisible && "opacity-0",
          "opacity-100"
        )}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;