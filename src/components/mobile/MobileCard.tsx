import React from 'react';
import { cn } from '@/lib/utils';

interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  variant?: 'default' | 'outlined' | 'elevated';
}

interface MobileCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileCardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileCardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface MobileCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const MobileCard: React.FC<MobileCardProps> = ({
  children,
  className,
  onClick,
  interactive = false,
  variant = 'default'
}) => {
  const baseClasses = "mobile-card";
  const variantClasses = {
    default: "",
    outlined: "border-2",
    elevated: "shadow-lg"
  };
  
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      className={cn(
        baseClasses,
        variantClasses[variant],
        interactive && "cursor-pointer hover:shadow-md",
        onClick && "cursor-pointer text-left",
        className
      )}
      onClick={onClick}
      {...(onClick && { type: 'button', role: 'button' })}
    >
      {children}
    </Component>
  );
};

const MobileCardHeader: React.FC<MobileCardHeaderProps> = ({
  children,
  className
}) => (
  <div className={cn("mobile-card-header", className)}>
    {children}
  </div>
);

const MobileCardContent: React.FC<MobileCardContentProps> = ({
  children,
  className
}) => (
  <div className={cn("mobile-card-content", className)}>
    {children}
  </div>
);

const MobileCardFooter: React.FC<MobileCardFooterProps> = ({
  children,
  className
}) => (
  <div className={cn("mobile-card-footer", className)}>
    {children}
  </div>
);

const MobileCardTitle: React.FC<MobileCardTitleProps> = ({
  children,
  className,
  as: Component = 'h3'
}) => (
  <Component className={cn("mobile-card-title", className)}>
    {children}
  </Component>
);

const MobileCardDescription: React.FC<MobileCardDescriptionProps> = ({
  children,
  className
}) => (
  <p className={cn("mobile-card-description", className)}>
    {children}
  </p>
);

export {
  MobileCard,
  MobileCardHeader,
  MobileCardContent,
  MobileCardFooter,
  MobileCardTitle,
  MobileCardDescription
};