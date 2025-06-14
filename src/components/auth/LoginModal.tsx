
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ForgotPasswordModal from './ForgotPasswordModal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "All Fields Required",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate login process
    setTimeout(() => {
      const credentials = localStorage.getItem('userCredentials');
      
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        
        if (parsedCredentials.email === email) {
          // Set authentication flags
          localStorage.setItem('userAuthenticated', 'true');
          
          toast({
            title: "Login Successful! 🎉",
            description: "Welcome back! Redirecting to Smart Deals.",
          });
          
          // Redirect to portal
          setTimeout(() => {
            window.location.href = '/portal?tab=onecard';
          }, 1000);
          
          onClose();
        } else {
          toast({
            title: "Invalid Credentials",
            description: "Email or password is incorrect.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Account Not Found",
          description: "No account found with this email. Please register first.",
          variant: "destructive"
        });
      }
      
      setIsSubmitting(false);
    }, 1500);
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Customer Login
            </DialogTitle>
            <DialogDescription>
              Sign in to access your OneCard account and Smart Deals
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email Address</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </button>
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
                onClick={handleLogin}
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ForgotPasswordModal 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  );
};

export default LoginModal;
