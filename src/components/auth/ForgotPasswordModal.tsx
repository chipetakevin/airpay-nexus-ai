
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'email' | 'code' | 'success'>('email');
  const { toast } = useToast();

  const handleSendResetCode = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate sending reset code
    setTimeout(() => {
      const code = Math.random().toString(36).substr(2, 6).toUpperCase();
      
      // Store reset code in localStorage for demo purposes
      localStorage.setItem('resetCode', code);
      localStorage.setItem('resetEmail', email);
      
      toast({
        title: "Reset Code Sent! 📧",
        description: `Verification code sent to ${email}. Check your inbox and spam folder.`,
      });
      
      setIsCodeSent(true);
      setStep('code');
      setIsSubmitting(false);
    }, 1500);
  };

  const handleVerifyCode = async () => {
    const storedCode = localStorage.getItem('resetCode');
    const storedEmail = localStorage.getItem('resetEmail');
    
    if (!resetCode || !newPassword) {
      toast({
        title: "All Fields Required",
        description: "Please enter both the reset code and new password.",
        variant: "destructive"
      });
      return;
    }

    if (resetCode !== storedCode || email !== storedEmail) {
      toast({
        title: "Invalid Code",
        description: "The reset code is incorrect. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate password reset
    setTimeout(() => {
      // Update stored credentials with new password
      const credentials = localStorage.getItem('userCredentials');
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        parsedCredentials.password = newPassword;
        localStorage.setItem('userCredentials', JSON.stringify(parsedCredentials));
      }
      
      localStorage.removeItem('resetCode');
      localStorage.removeItem('resetEmail');
      
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
    setResetCode('');
    setNewPassword('');
    setStep('email');
    setIsCodeSent(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Reset Password
          </DialogTitle>
          <DialogDescription>
            {step === 'email' && 'Enter your email to receive a reset code'}
            {step === 'code' && 'Enter the reset code and your new password'}
            {step === 'success' && 'Password reset completed successfully'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {step === 'email' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email Address</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendResetCode}
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Code'}
                </Button>
              </div>
            </>
          )}

          {step === 'code' && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-code">Reset Code</Label>
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
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep('email')}
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
            </>
          )}

          {step === 'success' && (
            <>
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <p className="text-sm text-gray-600">
                  Your password has been successfully reset. You can now login with your new credentials.
                </p>
              </div>
              
              <Button
                onClick={handleClose}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Continue to Login
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
