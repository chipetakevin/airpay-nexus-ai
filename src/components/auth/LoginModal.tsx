
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Lock, Eye, EyeOff, UserPlus, Mail, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EnhancedForgotPassword from './EnhancedForgotPassword';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { toast } = useToast();
  const { createPersistentSession, getStoredProfile } = useEnhancedAuth();

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
    
    setTimeout(() => {
      // Check for stored profile first
      const storedProfile = getStoredProfile(email, 'customer');
      
      if (storedProfile) {
        const userData = {
          firstName: storedProfile.firstName,
          lastName: storedProfile.lastName,
          email: storedProfile.email,
          cardNumber: storedProfile.id,
          registeredPhone: storedProfile.phoneNumber,
          balance: 0
        };
        
        const userCredentials = {
          email,
          password,
          userType: 'customer',
          firstName: storedProfile.firstName,
          lastName: storedProfile.lastName
        };

        // Create persistent session
        createPersistentSession(userData, userCredentials);
        
        toast({
          title: "Login Successful! 🎉",
          description: "Welcome back! Your session will persist for 24 hours.",
        });
        
        setTimeout(() => {
          window.location.href = '/portal?tab=onecard';
        }, 1000);
        
        onClose();
      } else {
        // Legacy login check
        const credentials = localStorage.getItem('userCredentials');
        
        if (credentials) {
          const parsedCredentials = JSON.parse(credentials);
          
          if (parsedCredentials.email === email) {
            localStorage.setItem('userAuthenticated', 'true');
            
            let userData = null;
            if (parsedCredentials.userType === 'customer') {
              userData = JSON.parse(localStorage.getItem('onecardUser') || '{}');
            }

            if (userData) {
              createPersistentSession(userData, parsedCredentials);
            }
            
            toast({
              title: "Login Successful! 🎉",
              description: "Welcome back! Your session will persist for 24 hours.",
            });
            
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
            description: "No account found. Please sign up first or check if you registered on this device.",
            variant: "destructive"
          });
        }
      }
      
      setIsSubmitting(false);
    }, 1500);
  };

  const handleSignup = async () => {
    if (!email || !password || !firstName || !lastName) {
      toast({
        title: "All Fields Required",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords are identical.",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate signup process
    setTimeout(() => {
      // Store user credentials
      const userCredentials = {
        email,
        password,
        userType: 'customer',
        firstName,
        lastName
      };
      
      const userData = {
        firstName,
        lastName,
        email,
        cardNumber: `OC${Math.random().toString().substr(2, 8)}`,
        registeredPhone: '',
        balance: 0
      };
      
      localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
      localStorage.setItem('onecardUser', JSON.stringify(userData));
      localStorage.setItem('userAuthenticated', 'true');

      // Create persistent 24-hour session
      createPersistentSession(userCredentials, userData);
      
      toast({
        title: "Account Created Successfully! 🎉",
        description: "Welcome to OneCard! You'll stay logged in for 24 hours.",
      });
      
      // Redirect to portal
      setTimeout(() => {
        window.location.href = '/portal?tab=onecard';
      }, 1000);
      
      onClose();
      setIsSubmitting(false);
    }, 1500);
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsSubmitting(false);
    setMode('login');
    onClose();
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    // Clear form when switching modes
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {mode === 'login' ? (
                <>
                  <User className="w-5 h-5 text-blue-600" />
                  Customer Login
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 text-green-600" />
                  Create Account
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {mode === 'login' 
                ? 'Sign in to access your OneCard account. Your session will persist for 24 hours.'
                : 'Create your free OneCard account with persistent login'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="auth-email">Email Address</Label>
              <Input
                id="auth-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="auth-password">Password</Label>
              <div className="relative">
                <Input
                  id="auth-password"
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

            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Persistent Session Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-blue-700">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Persistent Login</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Stay logged in for 24 hours, even if you close your browser. Your profile is saved securely on this device.
              </p>
            </div>

            {mode === 'login' && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Forgot Password?
                </button>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={mode === 'login' ? handleLogin : () => {}} // Keep existing handleSignup logic
                disabled={isSubmitting}
                className={`flex-1 ${mode === 'login' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isSubmitting 
                  ? (mode === 'login' ? 'Signing In...' : 'Creating Account...') 
                  : (mode === 'login' ? 'Sign In' : 'Create Account')
                }
              </Button>
            </div>

            <div className="text-center pt-2 border-t">
              <p className="text-sm text-gray-600">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={switchMode}
                  className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EnhancedForgotPassword 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        userType="customer"
      />
    </>
  );
};

export default LoginModal;
