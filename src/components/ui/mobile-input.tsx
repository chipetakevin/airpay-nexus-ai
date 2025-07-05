import React from 'react';
import { cn } from '@/lib/utils';

interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const MobileInput: React.FC<MobileInputProps> = ({
  label,
  error,
  helper,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mobile-text-sm font-medium mb-2 text-foreground">
          {label}
        </label>
      )}
      <input
        className={cn(
          'mobile-input',
          error && 'border-destructive focus:ring-destructive',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
      {helper && !error && (
        <p className="mt-1 text-sm text-muted-foreground">{helper}</p>
      )}
    </div>
  );
};