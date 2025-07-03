import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageCircle, 
  Phone, 
  Clock, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Zap
} from 'lucide-react';

interface OTPValidationProps {
  phoneNumber: string;
  onValidationSuccess: (token: string) => void;
  onValidationFailure: (error: string) => void;
}

const OTPValidationSystem: React.FC<OTPValidationProps> = ({
  phoneNumber,
  onValidationSuccess,
  onValidationFailure
}) => {
  const { toast } = useToast();
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const MAX_ATTEMPTS = 3;
  const OTP_VALIDITY = 300; // 5 minutes
  const LOCKOUT_TIME = 900; // 15 minutes

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            if (isLocked) {
              setIsLocked(false);
              setAttempts(0);
              toast({
                title: "Account unlocked",
                description: "You can now request a new OTP",
              });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeRemaining, isLocked, toast]);

  const sendOTP = async () => {
    if (isLocked) {
      toast({
        title: "Account temporarily locked",
        description: `Please wait ${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')} before requesting a new OTP`,
        variant: "destructive"
      });
      return;
    }

    try {
      // Generate OTP (6 digits)
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      
      // Simulate SMS sending delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate 95% success rate for SMS delivery
      if (Math.random() < 0.95) {
        setIsOtpSent(true);
        setTimeRemaining(OTP_VALIDITY);
        
        toast({
          title: "📱 OTP Sent",
          description: `Verification code sent to ${phoneNumber}. Valid for 5 minutes.`,
        });

        // For testing purposes, show OTP in development
        if (process.env.NODE_ENV === 'development') {
          toast({
            title: "🔧 Development Mode",
            description: `Test OTP: ${otp}`,
            variant: "default"
          });
        }
      } else {
        throw new Error('SMS delivery failed');
      }
    } catch (error) {
      toast({
        title: "SMS delivery failed",
        description: "Unable to send OTP. Please check your number and try again.",
        variant: "destructive"
      });
    }
  };

  const validateOTP = async () => {
    if (!otpCode || otpCode.length !== 6) {
      toast({
        title: "Invalid OTP format",
        description: "Please enter the 6-digit code sent to your phone",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (otpCode === generatedOtp) {
        // Success
        onValidationSuccess(`otp_verified_${Date.now()}`);
        toast({
          title: "✅ Number verified",
          description: "Your phone number has been successfully verified",
        });
        setAttempts(0);
      } else {
        // Failed attempt
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= MAX_ATTEMPTS) {
          setIsLocked(true);
          setTimeRemaining(LOCKOUT_TIME);
          setIsOtpSent(false);
          
          toast({
            title: "⚠️ Account locked",
            description: `Too many failed attempts. Account locked for 15 minutes.`,
            variant: "destructive"
          });
          
          onValidationFailure('Too many failed attempts. Account temporarily locked.');
        } else {
          toast({
            title: "❌ Invalid OTP",
            description: `Incorrect code. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`,
            variant: "destructive"
          });
          
          onValidationFailure(`Invalid OTP. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`);
        }
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Network error during OTP validation. Please try again.",
        variant: "destructive"
      });
      onValidationFailure('Network error during validation');
    } finally {
      setIsValidating(false);
    }
  };

  const resendOTP = async () => {
    setOtpCode('');
    setIsOtpSent(false);
    await sendOTP();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    if (isLocked) return 'border-red-200 bg-red-50';
    if (isOtpSent && timeRemaining > 0) return 'border-green-200 bg-green-50';
    return 'border-gray-200 bg-gray-50';
  };

  const getStatusIcon = () => {
    if (isLocked) return <AlertTriangle className="w-5 h-5 text-red-500" />;
    if (isOtpSent && timeRemaining > 0) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <MessageCircle className="w-5 h-5 text-gray-500" />;
  };

  return (
    <Card className={getStatusColor()}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          ICASA-Compliant Number Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Phone Number Display */}
        <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
          <Phone className="w-4 h-4 text-blue-600" />
          <span className="font-medium">{phoneNumber}</span>
          <Badge variant="outline" className="ml-auto">
            {isOtpSent ? 'OTP Sent' : 'Pending Verification'}
          </Badge>
        </div>

        {/* OTP Status */}
        {!isOtpSent && !isLocked && (
          <Alert>
            <Shield className="w-4 h-4" />
            <AlertDescription>
              Number verification is required by ICASA regulations for porting requests. 
              An OTP will be sent to confirm ownership.
            </AlertDescription>
          </Alert>
        )}

        {/* Locked Status */}
        {isLocked && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <AlertDescription>
              <div className="font-medium text-red-800">Account Temporarily Locked</div>
              <div className="text-sm text-red-600 mt-1">
                Too many failed attempts. Please wait {formatTime(timeRemaining)} before trying again.
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* OTP Timer */}
        {isOtpSent && timeRemaining > 0 && (
          <Alert className="border-green-200 bg-green-50">
            <Clock className="w-4 h-4 text-green-600" />
            <AlertDescription>
              <div className="font-medium text-green-800">OTP Active</div>
              <div className="text-sm text-green-600">
                Code expires in: {formatTime(timeRemaining)} | Attempts remaining: {MAX_ATTEMPTS - attempts}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Send OTP Button */}
        {!isOtpSent && !isLocked && (
          <Button 
            onClick={sendOTP}
            className="w-full"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Verification Code
          </Button>
        )}

        {/* OTP Input and Validation */}
        {isOtpSent && timeRemaining > 0 && !isLocked && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Enter 6-digit verification code:
              </label>
              <Input
                type="text"
                placeholder="000000"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={validateOTP}
                disabled={isValidating || otpCode.length !== 6}
                className="w-full"
              >
                {isValidating ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-pulse" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify Code
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline"
                onClick={resendOTP}
                disabled={timeRemaining > 240} // Allow resend after 1 minute
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend OTP
              </Button>
            </div>
          </div>
        )}

        {/* Expired OTP */}
        {isOtpSent && timeRemaining === 0 && !isLocked && (
          <div className="text-center space-y-3">
            <Alert className="border-yellow-200 bg-yellow-50">
              <Clock className="w-4 h-4 text-yellow-600" />
              <AlertDescription>
                <div className="font-medium text-yellow-800">OTP Expired</div>
                <div className="text-sm text-yellow-600">
                  Please request a new verification code
                </div>
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={resendOTP}
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Send New Code
            </Button>
          </div>
        )}

        {/* Help Information */}
        <div className="text-xs text-gray-600 space-y-1">
          <div>• OTP will be sent via SMS to your registered number</div>
          <div>• Code is valid for 5 minutes from time of sending</div>
          <div>• Maximum 3 attempts allowed before temporary lockout</div>
          <div>• Required for ICASA compliance and fraud prevention</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPValidationSystem;