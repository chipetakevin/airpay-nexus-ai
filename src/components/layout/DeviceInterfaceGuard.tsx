import React from 'react';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface DeviceInterfaceGuardProps {
  children: React.ReactNode;
  allowedDevices: Array<'mobile' | 'tablet' | 'desktop'>;
  fallbackMessage?: string;
  className?: string;
}

/**
 * Device Interface Guard - Ensures strict separation between device interfaces
 * Prevents mobile users from seeing desktop layouts and vice versa
 */
export const DeviceInterfaceGuard: React.FC<DeviceInterfaceGuardProps> = ({
  children,
  allowedDevices,
  fallbackMessage,
  className = ''
}) => {
  const { deviceType, isMobile, isTablet, isDesktop } = useMobileDetection();

  // Strict device checking
  const isDeviceAllowed = allowedDevices.includes(deviceType);

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('DeviceInterfaceGuard:', {
      deviceType,
      allowedDevices,
      isDeviceAllowed,
      detection: { isMobile, isTablet, isDesktop }
    });
  }

  // Block access if device not allowed
  if (!isDeviceAllowed) {
    const defaultMessage = `This interface is optimized for ${allowedDevices.join(', ')} devices. Current device: ${deviceType}`;
    
    return (
      <div className={`device-interface-guard ${className}`}>
        <Alert className="border-orange-200 bg-orange-50 text-orange-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {fallbackMessage || defaultMessage}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
};

/**
 * Mobile-only interface guard
 */
export const MobileOnlyGuard: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <DeviceInterfaceGuard 
    allowedDevices={['mobile']} 
    fallbackMessage="This feature is available on mobile devices only."
    className={className}
  >
    {children}
  </DeviceInterfaceGuard>
);

/**
 * Desktop-only interface guard
 */
export const DesktopOnlyGuard: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <DeviceInterfaceGuard 
    allowedDevices={['desktop']} 
    fallbackMessage="This feature requires a desktop computer for optimal experience."
    className={className}
  >
    {children}
  </DeviceInterfaceGuard>
);

/**
 * Touch device guard (mobile + tablet)
 */
export const TouchDeviceGuard: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <DeviceInterfaceGuard 
    allowedDevices={['mobile', 'tablet']} 
    fallbackMessage="This interface is optimized for touch devices."
    className={className}
  >
    {children}
  </DeviceInterfaceGuard>
);

/**
 * Non-mobile guard (tablet + desktop)
 */
export const NonMobileGuard: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <DeviceInterfaceGuard 
    allowedDevices={['tablet', 'desktop']} 
    fallbackMessage="This feature requires a larger screen for optimal experience."
    className={className}
  >
    {children}
  </DeviceInterfaceGuard>
);