
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Store, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUnifiedAuth } from '@/hooks/useUnifiedAuth';

interface VendorLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VendorLoginModal: React.FC<VendorLoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { loginAsVendor } = useUnifiedAuth();

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
    
    const result = await loginAsVendor(email, password);
    
    if (result.success) {
      // Redirect to vendor portal
      setTimeout(() => {
        window.location.href = '/portal?tab=vendor';
      }, 1000);
      
      onClose();
    }
    
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Store className="w-5 h-5 text-blue-600" />
            Vendor Login
          </DialogTitle>
          <DialogDescription>
            Sign in to access your vendor portal and business dashboard
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vendor-email">Email Address</Label>
            <Input
              id="vendor-email"
              type="email"
              placeholder="Enter your business email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vendor-password">Password</Label>
            <div className="relative">
              <Input
                id="vendor-password"
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

          {/* Unified Profile Indicator */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <Shield className="w-4 h-4" />
              <span>Use special password for unified admin access</span>
            </div>
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
  );
};

export default VendorLoginModal;
