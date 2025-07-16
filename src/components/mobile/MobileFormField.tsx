import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface MobileFormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helper?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  autoComplete?: string;
}

const MobileFormField: React.FC<MobileFormFieldProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helper,
  required = false,
  disabled = false,
  className,
  icon,
  autoComplete
}) => {
  return (
    <div className={cn("mobile-input-group", className)}>
      <Label 
        htmlFor={id}
        className="mobile-input-label"
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <div className="mobile-input-wrapper">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          autoComplete={autoComplete}
          className={cn(
            "mobile-input",
            icon && "pl-10",
            error && "mobile-input-error"
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${id}-error` : helper ? `${id}-helper` : undefined
          }
        />
      </div>
      
      {error && (
        <div id={`${id}-error`} className="mobile-input-error-text" role="alert">
          {error}
        </div>
      )}
      
      {helper && !error && (
        <div id={`${id}-helper`} className="mobile-input-helper">
          {helper}
        </div>
      )}
    </div>
  );
};

export default MobileFormField;