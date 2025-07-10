import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { 
  Eye, 
  EyeOff, 
  Shield, 
  Key, 
  RefreshCw, 
  Check, 
  X, 
  AlertTriangle,
  Copy,
  Save,
  Clock,
  UserCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  passwordManager, 
  validatePasswordStrength, 
  generatePassword,
  securelyStorePassword,
  getStoredCredentials,
  type UserRole,
  type PasswordMetrics,
  PasswordStrength 
} from '@/utils/passwordManagement';

interface EnhancedPasswordInputProps {
  value: string;
  confirmValue?: string;
  onChange: (value: string) => void;
  onConfirmChange?: (value: string) => void;
  userRole: UserRole;
  userId?: string;
  label?: string;
  confirmLabel?: string;
  showConfirm?: boolean;
  enableAutofill?: boolean;
  enableGeneration?: boolean;
  enableStorage?: boolean;
  showRequirements?: boolean;
  showMetrics?: boolean;
  className?: string;
  error?: string;
  confirmError?: string;
}

const EnhancedPasswordInput: React.FC<EnhancedPasswordInputProps> = ({
  value,
  confirmValue = '',
  onChange,
  onConfirmChange,
  userRole,
  userId,
  label = 'Password',
  confirmLabel = 'Confirm Password',
  showConfirm = true,
  enableAutofill = true,
  enableGeneration = true,
  enableStorage = true,
  showRequirements = true,
  showMetrics = true,
  className = '',
  error,
  confirmError
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [metrics, setMetrics] = useState<PasswordMetrics | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasStoredPassword, setHasStoredPassword] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const { toast } = useToast();

  // Check for stored passwords on mount
  useEffect(() => {
    if (userId && enableAutofill) {
      const stored = getStoredCredentials(userId);
      if (stored) {
        setHasStoredPassword(true);
        // Check if password rotation is needed
        if (passwordManager.shouldRotatePassword(stored)) {
          toast({
            title: "🔄 Password Rotation Reminder",
            description: "Your password will expire soon. Consider updating it.",
            variant: "default"
          });
        }
      }
    }
  }, [userId, enableAutofill]);

  // Validate password strength in real-time
  useEffect(() => {
    if (value.length > 0) {
      const passwordMetrics = validatePasswordStrength(value, userRole);
      setMetrics(passwordMetrics);
      
      // Auto-save if enabled and password is strong enough
      if (autoSaveEnabled && userId && enableStorage && passwordMetrics.score >= 70) {
        securelyStorePassword(userId, value, userRole);
        passwordManager.logPasswordEvent(userId, 'password_auto_saved', {
          strength: passwordMetrics.strength,
          score: passwordMetrics.score
        });
      }
    } else {
      setMetrics(null);
    }
  }, [value, userRole, autoSaveEnabled, userId, enableStorage]);

  const handleGeneratePassword = useCallback(async () => {
    setIsGenerating(true);
    try {
      // Simulate processing time for security
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPassword = generatePassword(userRole, 14);
      onChange(newPassword);
      if (onConfirmChange) {
        onConfirmChange(newPassword);
      }
      
      toast({
        title: "🔐 Secure Password Generated!",
        description: "A cryptographically secure password has been created.",
        duration: 4000
      });

      // Log the generation event
      if (userId) {
        passwordManager.logPasswordEvent(userId, 'password_generated', {
          role: userRole,
          length: newPassword.length
        });
      }
    } finally {
      setIsGenerating(false);
    }
  }, [userRole, onChange, onConfirmChange, userId]);

  const handleAutofill = useCallback(() => {
    if (!userId) return;
    
    const stored = getStoredCredentials(userId);
    if (stored) {
      // In a real implementation, you'd decrypt and use the stored password
      toast({
        title: "🔓 Autofill Available",
        description: "Stored credentials detected. Use with caution.",
        variant: "default"
      });
      
      passwordManager.logPasswordEvent(userId, 'autofill_used', {
        role: userRole
      });
    }
  }, [userId, userRole]);

  const handleCopyPassword = useCallback(async () => {
    if (value) {
      try {
        await navigator.clipboard.writeText(value);
        toast({
          title: "📋 Password Copied",
          description: "Password copied to clipboard (temporary).",
          duration: 2000
        });
        
        // Clear clipboard after 30 seconds for security
        setTimeout(() => {
          navigator.clipboard.writeText('');
        }, 30000);
      } catch (error) {
        toast({
          title: "Copy Failed",
          description: "Unable to copy password to clipboard.",
          variant: "destructive"
        });
      }
    }
  }, [value]);

  const handleManualSave = useCallback(() => {
    if (userId && value && metrics && metrics.score >= 60) {
      securelyStorePassword(userId, value, userRole);
      setHasStoredPassword(true);
      toast({
        title: "💾 Password Saved Securely",
        description: "Password encrypted and stored for future autofill.",
        duration: 3000
      });
      
      passwordManager.logPasswordEvent(userId, 'password_manually_saved', {
        strength: metrics.strength,
        score: metrics.score
      });
    }
  }, [userId, value, metrics, userRole]);

  const getStrengthColor = (strength: PasswordStrength) => {
    switch (strength) {
      case PasswordStrength.EXCELLENT: return 'text-green-600 bg-green-100';
      case PasswordStrength.STRONG: return 'text-blue-600 bg-blue-100';
      case PasswordStrength.GOOD: return 'text-yellow-600 bg-yellow-100';
      case PasswordStrength.FAIR: return 'text-orange-600 bg-orange-100';
      case PasswordStrength.WEAK: return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Password Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-medium">
            {label} *
          </Label>
          <div className="flex items-center gap-2">
            {hasStoredPassword && enableAutofill && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAutofill}
                className="h-6 px-2 text-xs"
              >
                <UserCheck className="w-3 h-3 mr-1" />
                Autofill
              </Button>
            )}
            {enableGeneration && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleGeneratePassword}
                disabled={isGenerating}
                className="h-6 px-2 text-xs"
              >
                {isGenerating ? (
                  <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                ) : (
                  <Key className="w-3 h-3 mr-1" />
                )}
                Generate
              </Button>
            )}
          </div>
        </div>
        
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter secure ${userRole} password`}
            className={`pr-20 ${error ? 'border-red-500' : ''} ${
              metrics?.score && metrics.score >= 70 ? 'border-green-500' : ''
            }`}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {value && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCopyPassword}
                className="h-6 w-6 p-0"
              >
                <Copy className="w-3 h-3" />
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="h-6 w-6 p-0"
            >
              {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </Button>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Confirm Password Input */}
      {showConfirm && onConfirmChange && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            {confirmLabel} *
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmValue}
              onChange={(e) => onConfirmChange(e.target.value)}
              placeholder="Confirm your password"
              className={`pr-10 ${confirmError ? 'border-red-500' : ''} ${
                confirmValue && confirmValue === value ? 'border-green-500' : ''
              }`}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {confirmValue && confirmValue === value && (
                <Check className="w-4 h-4 text-green-500" />
              )}
              {confirmValue && confirmValue !== value && (
                <X className="w-4 h-4 text-red-500" />
              )}
            </div>
          </div>
          {confirmError && <p className="text-red-500 text-sm">{confirmError}</p>}
        </div>
      )}

      {/* Password Metrics */}
      {showMetrics && metrics && (
        <Card className="border-gray-200">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Password Strength</span>
              </div>
              <Badge className={getStrengthColor(metrics.strength)}>
                {metrics.strength.toUpperCase()}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Security Score: {metrics.score}/100</span>
                <span>Crack Time: {metrics.crackTime}</span>
              </div>
              <Progress 
                value={metrics.score} 
                className={`h-2 ${getProgressColor(metrics.score)}`}
              />
            </div>

            {metrics.isCompromised && (
              <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">
                  This password appears in known data breaches
                </span>
              </div>
            )}

            {metrics.feedback.length > 0 && (
              <div className="space-y-1">
                <span className="text-xs font-medium text-gray-700">Suggestions:</span>
                {metrics.feedback.map((feedback, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                    <X className="w-3 h-3 text-red-500" />
                    {feedback}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Password Requirements */}
      {showRequirements && (
        <Card className="border-blue-200 bg-blue-50/30">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Password Requirements
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                {value.length >= 8 ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <X className="w-3 h-3 text-red-500" />
                )}
                <span>At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2">
                {/[A-Z]/.test(value) ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <X className="w-3 h-3 text-red-500" />
                )}
                <span>Uppercase letter</span>
              </div>
              <div className="flex items-center gap-2">
                {/[a-z]/.test(value) ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <X className="w-3 h-3 text-red-500" />
                )}
                <span>Lowercase letter</span>
              </div>
              <div className="flex items-center gap-2">
                {/\d/.test(value) ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <X className="w-3 h-3 text-red-500" />
                )}
                <span>Number</span>
              </div>
              {userRole === 'admin' || userRole === 'vendor' || userRole === 'field_worker' ? (
                <div className="flex items-center gap-2">
                  {/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(value) ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <X className="w-3 h-3 text-red-500" />
                  )}
                  <span>Special character</span>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Advanced Security Options */}
      {enableStorage && userId && (
        <Card className="border-purple-200 bg-purple-50/30">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Save className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Security Options</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Auto-save secure passwords</span>
                  <Clock className="w-3 h-3 text-gray-500" />
                </div>
                <Switch
                  checked={autoSaveEnabled}
                  onCheckedChange={setAutoSaveEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable multi-factor authentication</span>
                <Switch
                  checked={mfaEnabled}
                  onCheckedChange={setMfaEnabled}
                />
              </div>
              
              {value && metrics && metrics.score >= 60 && !hasStoredPassword && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleManualSave}
                  className="w-full"
                >
                  <Save className="w-3 h-3 mr-2" />
                  Save Password Securely
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedPasswordInput;