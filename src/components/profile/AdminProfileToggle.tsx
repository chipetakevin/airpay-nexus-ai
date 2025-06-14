
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Shield, Lock } from 'lucide-react';

interface AdminProfileToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const AdminProfileToggle = ({ isEnabled, onToggle }: AdminProfileToggleProps) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<boolean | null>(null);
  const { toast } = useToast();

  const handleToggleClick = (checked: boolean) => {
    setPendingAction(checked);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    if (password !== 'Malawi@1976') {
      toast({
        title: "Invalid Password",
        description: "The admin password you entered is incorrect.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      if (pendingAction !== null) {
        onToggle(pendingAction);
        toast({
          title: pendingAction ? "Profile Enabled" : "Profile Disabled",
          description: `Profile has been ${pendingAction ? 'enabled' : 'disabled'} successfully.`,
        });
      }
      
      setIsLoading(false);
      setShowPasswordModal(false);
      setPassword('');
      setPendingAction(null);
    }, 1000);
  };

  const handleClose = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPendingAction(null);
  };

  return (
    <>
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
        <Shield className="w-5 h-5 text-red-600" />
        <div className="flex-1">
          <Label htmlFor="profile-toggle" className="text-sm font-medium text-red-800">
            Admin Profile Control
          </Label>
          <p className="text-xs text-red-600 mt-1">
            Toggle profile availability with admin password
          </p>
        </div>
        <Switch
          id="profile-toggle"
          checked={isEnabled}
          onCheckedChange={handleToggleClick}
        />
      </div>

      <Dialog open={showPasswordModal} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-600" />
              Admin Authentication Required
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              Enter admin password to {pendingAction ? 'enable' : 'disable'} this profile.
            </div>
            <div>
              <Label htmlFor="admin-password">Admin Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="mt-1"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handlePasswordSubmit}
                disabled={!password || isLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                {isLoading ? 'Processing...' : 'Confirm'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
