
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, CheckCircle, Smartphone, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDeviceStorage } from '@/hooks/useDeviceStorage';

interface EnhancedForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  userType?: 'customer' | 'vendor' | 'admin';
}

const EnhancedForgotPassword: React.FC<EnhancedForgotPasswordProps> = ({ 
  isOpen, 
  onClose, 
  userType = 'customer' 
}) => {
  const [step, setStep] = useState<'method' | 'email' | 'phone' | 'code' | 'success'>('method');
  const [recoveryMethod, setRecoveryMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { getProfileByEmail } = useDeviceStorage();

  const handleMethodSelection = (method: 'email' | 'phone') => {
    setRecoveryMethod(method);
    setStep(method);
  };

  const handleSendResetCode = async () => {
    const identifier = recoveryMethod === 'email' ? email : phone;
    
    if (!identifier) {
      toast({
        title: `${recoveryMethod === 'email' ? 'Email' : 'Phone'} Required`,
        description: `Please enter your ${recoveryMethod === 'email' ? 'email address' : 'phone number'}.`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Check if profile exists on device
    if (recoveryMethod === 'email') {
      const profile = getProfileByEmail(email, userType);
      if (!profile) {
        toast({
          title: "Profile Not Found",
          description: "No profile found on this device with that email address.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Simulate sending reset code
    setTimeout(() => {
      const code = Math.random().toString(36).substr(2, 6).toUpperCase();
      
      localStorage.setItem('resetCode', code);
      localStorage.setItem('resetIdentifier', identifier);
      localStorage.setItem('resetMethod', recoveryMethod);
      localStorage.setItem('resetUserType', userType);
      
      toast({
        title: "Reset Code Sent! 📱",
        description: `Verification code sent to your ${recoveryMethod}. Check your ${recoveryMethod === 'email' ? 'inbox and spam folder' : 'messages'}.`,
      });
      
      setStep('code');
      setIsSubmitting(false);
    }, 1500);
  };

  const handleVerifyCode = async () => {
    const storedCode = localStorage.getItem('resetCode');
    const storedIdentifier = localStorage.getItem('resetIdentifier');
    const storedMethod = localStorage.getItem('resetMethod');
    
    if (!resetCode || !newPassword) {
      toast({
        title: "All Fields Required",
        description: "Please enter both the reset code and new password.",
        variant: "destructive"
      });
      return;
    }

    if (resetCode !== storedCode || (recoveryMethod === 'email' ? email : phone) !== storedIdentifier) {
      toast({
        title: "Invalid Code",
        description: "The reset code is incorrect. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      // Update stored credentials with new password
      const credentials = localStorage.getItem('userCredentials');
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        parsedCredentials.password = newPassword;
        parsedCredentials.lastPasswordUpdate = new Date().toISOString();
        localStorage.setItem('userCredentials', JSON.stringify(parsedCredentials));
      }
      
      // Clean up reset data
      localStorage.removeItem('resetCode');
      localStorage.removeItem('resetIdentifier');
      localStorage.removeItem('resetMethod');
      localStorage.removeItem('resetUserType');
      
      setStep('success');
      setIsSubmitting(false);
      
      toast({
        title: "Password Reset Successful! ✅",
        description: "Your password has been updated. You can now login with your new password.",
      });
    }, 1500);
  };

  const handleClose = () => {
    setEmail('');
    setPhone('');
    setResetCode('');
    setNewPassword('');
    setStep('method');
    setIsSubmitting(false);
    onClose();
  };

  const renderMethodSelection = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">
          Choose how you'd like to recover your {userType} account password
        </p>
      </div>
      
      <div className="space-y-3">
        <Button
          onClick={() => handleMethodSelection('email')}
          variant="outline"
          className="w-full h-16 flex flex-col gap-2 border-blue-200 hover:bg-blue-50"
        >
          <Mail className="w-6 h-6 text-blue-600" />
          <span className="text-sm font-medium">Reset via Email</span>
        </Button>
        
        <Button
          onClick={() => handleMethodSelection('phone')}
          variant="outline"
          className="w-full h-16 flex flex-col gap-2 border-green-200 hover:bg-green-50"
        >
          <Smartphone className="w-6 h-6 text-green-600" />
          <span className="text-sm font-medium">Reset via SMS</span>
        </Button>
      </div>
      
      <Button
        variant="ghost"
        onClick={handleClose}
        className="w-full"
      >
        Cancel
      </Button>
    </div>
  );

  const renderInputStep = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`reset-${recoveryMethod}`}>
          {recoveryMethod === 'email' ? 'Email Address' : 'Phone Number'}
        </Label>
        <Input
          id={`reset-${recoveryMethod}`}
          type={recoveryMethod === 'email' ? 'email' : 'tel'}
          placeholder={recoveryMethod === 'email' ? 'Enter your registered email' : 'Enter your registered phone'}
          value={recoveryMethod === 'email' ? email : phone}
          onChange={(e) => recoveryMethod === 'email' ? setEmail(e.target.value) : setPhone(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setStep('method')}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleSendResetCode}
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? 'Sending...' : 'Send Code'}
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-blue-600" />
            Reset {userType.charAt(0).toUpperCase() + userType.slice(1)} Password
          </DialogTitle>
          <DialogDescription>
            {step === 'method' && 'Choose your preferred password recovery method'}
            {step === 'email' && 'Enter your registered email address'}
            {step === 'phone' && 'Enter your registered phone number'}
            {step === 'code' && 'Enter the verification code and set your new password'}
            {step === 'success' && 'Password reset completed successfully'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {step === 'method' && renderMethodSelection()}
          {(step === 'email' || step === 'phone') && renderInputStep()}
          
          {step === 'code' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-code">Verification Code</Label>
                <Input
                  id="reset-code"
                  placeholder="Enter 6-digit code"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value.toUpperCase())}
                  maxLength={6}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password (min 8 characters)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(recoveryMethod)}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleVerifyCode}
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </Button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-4 space-y-4">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Your {userType} password has been successfully reset.
                </p>
                <p className="text-xs text-green-600 bg-green-50 p-2 rounded">
                  ✅ Profile permanently saved on this device for seamless future access
                </p>
              </div>
              
              <Button
                onClick={handleClose}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Continue to Login
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedForgotPassword;
