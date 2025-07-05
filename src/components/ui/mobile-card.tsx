import React from 'react';
import { cn } from '@/lib/utils';

interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const MobileCard: React.FC<MobileCardProps> = ({
  children,
  className,
  interactive = false,
  onClick
}) => {
  return (
    <div
      className={cn(
        'mobile-card',
        interactive && 'cursor-pointer hover:shadow-md active:scale-[0.98] transition-all',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface MobileCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileCardHeader: React.FC<MobileCardHeaderProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('mobile-card-header', className)}>
      {children}
    </div>
  );
};

interface MobileCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileCardContent: React.FC<MobileCardContentProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('mobile-card-content', className)}>
      {children}
    </div>
  );
};