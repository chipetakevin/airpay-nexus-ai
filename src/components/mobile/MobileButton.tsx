import React from 'react';
import { cn } from '@/lib/utils';

interface MobileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'default' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  ariaLabel?: string;
}

const MobileButton: React.FC<MobileButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  disabled = false,
  loading = false,
  className,
  icon,
  iconPosition = 'left',
  ariaLabel
}) => {
  const baseClasses = "mobile-button mobile-focus-ring";
  
  const variantClasses = {
    primary: "mobile-button-primary",
    secondary: "mobile-button-secondary", 
    outline: "mobile-button-outline",
    ghost: "mobile-button-ghost"
  };
  
  const sizeClasses = {
    small: "mobile-button-small",
    default: "",
    large: "mobile-button-large"
  };

  const LoadingSpinner = () => (
    <svg
      className="animate-spin w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "mobile-button-full",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && icon}
      <span className={loading ? "opacity-0" : ""}>{children}</span>
      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  );
};

export default MobileButton;