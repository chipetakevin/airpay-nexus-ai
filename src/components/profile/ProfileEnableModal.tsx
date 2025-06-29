
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';

interface ProfileEnableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnable: () => void;
}

export const ProfileEnableModal = ({ isOpen, onClose, onEnable }: ProfileEnableModalProps) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleEnable = () => {
    setIsLoading(true);
    
    if (password === 'Malawi@1976') {
      setTimeout(() => {
        onEnable();
        onClose();
        setPassword('');
        setIsLoading(false);
        toast({
          title: "Profile Enabled",
          description: "Your profile has been successfully enabled.",
        });
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Invalid Password",
          description: "The password you entered is incorrect.",
          variant: "destructive"
        });
      }, 1000);
    }
  };

  const handleClose = () => {
    setPassword('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Enable Profile
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="password">Enter Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to enable profile"
              className="mt-1"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleEnable}
              disabled={!password || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Enabling...' : 'Enable Profile'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
