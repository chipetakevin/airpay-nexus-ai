
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface DeviceProfile {
  id: string;
  userType: 'customer' | 'vendor' | 'admin';
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  registrationData: any;
  deviceFingerprint: string;
  lastLogin: string;
  isComplete: boolean;
}

export const useDeviceStorage = () => {
  const [deviceProfiles, setDeviceProfiles] = useState<DeviceProfile[]>([]);
  const { toast } = useToast();

  const generateDeviceFingerprint = (): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Device fingerprint', 2, 2);
    }
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join('|');
    
    return btoa(fingerprint).slice(0, 32);
  };

  const saveProfilePermanently = (profileData: Partial<DeviceProfile>) => {
    try {
      const deviceFingerprint = generateDeviceFingerprint();
      const existingProfiles = JSON.parse(localStorage.getItem('deviceProfiles') || '[]');
      
      const profileId = profileData.id || `${profileData.userType}_${Date.now()}`;
      
      const newProfile: DeviceProfile = {
        id: profileId,
        userType: profileData.userType || 'customer',
        email: profileData.email || '',
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        phoneNumber: profileData.phoneNumber || '',
        registrationData: profileData.registrationData || {},
        deviceFingerprint,
        lastLogin: new Date().toISOString(),
        isComplete: profileData.isComplete || false
      };

      // Check if profile exists and update or add
      const profileIndex = existingProfiles.findIndex((p: DeviceProfile) => 
        p.email === newProfile.email && p.userType === newProfile.userType
      );

      if (profileIndex >= 0) {
        existingProfiles[profileIndex] = { ...existingProfiles[profileIndex], ...newProfile };
      } else {
        existingProfiles.push(newProfile);
      }

      localStorage.setItem('deviceProfiles', JSON.stringify(existingProfiles));
      setDeviceProfiles(existingProfiles);

      toast({
        title: "Profile Saved Permanently",
        description: "Your profile is now saved on this device for future seamless access.",
      });

    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Save Error",
        description: "Failed to save profile permanently.",
        variant: "destructive"
      });
    }
  };

  const getDeviceProfiles = (): DeviceProfile[] => {
    try {
      const profiles = JSON.parse(localStorage.getItem('deviceProfiles') || '[]');
      return profiles.filter((p: DeviceProfile) => p.deviceFingerprint === generateDeviceFingerprint());
    } catch (error) {
      console.error('Error retrieving profiles:', error);
      return [];
    }
  };

  const getProfileByEmail = (email: string, userType: string): DeviceProfile | null => {
    const profiles = getDeviceProfiles();
    return profiles.find(p => p.email === email && p.userType === userType) || null;
  };

  useEffect(() => {
    setDeviceProfiles(getDeviceProfiles());
  }, []);

  return {
    deviceProfiles,
    saveProfilePermanently,
    getDeviceProfiles,
    getProfileByEmail
  };
};
