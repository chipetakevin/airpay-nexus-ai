import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

interface EnhancedToggleProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  label?: string
  enabledLabel?: string
  disabledLabel?: string
  showIcons?: boolean
  showLabels?: boolean
  loading?: boolean
  size?: "sm" | "default" | "lg"
  variant?: "default" | "success" | "warning"
}

const EnhancedToggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  EnhancedToggleProps
>(({ 
  className, 
  label,
  enabledLabel = "Enabled",
  disabledLabel = "Disabled",
  showIcons = true,
  showLabels = true,
  loading = false,
  size = "default",
  variant = "default",
  checked,
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: "h-4 w-7",
    default: "h-6 w-11",
    lg: "h-7 w-12"
  }

  const thumbSizeClasses = {
    sm: "h-3 w-3 data-[state=checked]:translate-x-3",
    default: "h-5 w-5 data-[state=checked]:translate-x-5",
    lg: "h-6 w-6 data-[state=checked]:translate-x-5"
  }

  const iconSizeClasses = {
    sm: "h-3 w-3",
    default: "h-4 w-4",
    lg: "h-5 w-5"
  }

  const getStateStyles = () => {
    if (loading) {
      return "bg-muted border-muted-foreground/20"
    }
    
    if (checked) {
      switch (variant) {
        case "success":
          return "bg-toggle-track-enabled border-toggle-enabled shadow-toggle-thumb-shadow"
        case "warning":
          return "bg-feature-pending-border border-feature-pending-text"
        default:
          return "bg-toggle-track-enabled border-toggle-enabled shadow-toggle-thumb-shadow"
      }
    }
    
    return "bg-toggle-track-disabled border-toggle-disabled"
  }

  const getThumbStyles = () => {
    if (loading) {
      return "bg-muted-foreground"
    }
    return "bg-toggle-thumb shadow-[var(--toggle-thumb-shadow)]"
  }

  const currentLabel = checked ? enabledLabel : disabledLabel
  const StateIcon = loading ? Loader2 : (checked ? CheckCircle : XCircle)
  const iconColorClass = loading ? "text-muted-foreground" : (checked ? "text-toggle-enabled" : "text-toggle-disabled")

  return (
    <div className="flex items-center space-x-3">
      {label && (
        <span className="text-sm font-medium text-foreground">
          {label}
        </span>
      )}
      
      <div className="flex items-center space-x-2">
        <SwitchPrimitives.Root
          className={cn(
            "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            sizeClasses[size],
            getStateStyles(),
            loading && "cursor-not-allowed",
            className
          )}
          disabled={loading || props.disabled}
          checked={checked}
          {...props}
          ref={ref}
        >
          <SwitchPrimitives.Thumb
            className={cn(
              "pointer-events-none block rounded-full ring-0 transition-transform data-[state=unchecked]:translate-x-0",
              thumbSizeClasses[size],
              getThumbStyles()
            )}
          />
        </SwitchPrimitives.Root>

        {showLabels && (
          <div className="flex items-center space-x-2">
            {showIcons && (
              <StateIcon 
                className={cn(
                  iconSizeClasses[size],
                  iconColorClass,
                  loading && "animate-spin"
                )}
              />
            )}
            <span 
              className={cn(
                "text-sm font-medium transition-colors",
                loading ? "text-muted-foreground" : (
                  checked ? "text-toggle-enabled" : "text-toggle-disabled"
                )
              )}
            >
              {currentLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  )
})

EnhancedToggle.displayName = "EnhancedToggle"

export { EnhancedToggle }