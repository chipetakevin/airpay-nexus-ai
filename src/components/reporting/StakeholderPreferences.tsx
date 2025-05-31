
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NotificationSettings {
  customers: { email: boolean; whatsapp: boolean; sms: boolean };
  vendors: { email: boolean; whatsapp: boolean; sms: boolean };
  admins: { email: boolean; whatsapp: boolean; sms: boolean };
  unregistered: { email: boolean; whatsapp: boolean; sms: boolean };
}

interface StakeholderPreferencesProps {
  notificationSettings: NotificationSettings;
  onSettingsChange: (settings: NotificationSettings) => void;
}

const StakeholderPreferences = ({
  notificationSettings,
  onSettingsChange
}: StakeholderPreferencesProps) => {
  const handleSettingChange = (group: keyof NotificationSettings, channel: 'email' | 'whatsapp' | 'sms', value: boolean) => {
    onSettingsChange({
      ...notificationSettings,
      [group]: {
        ...notificationSettings[group],
        [channel]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Stakeholder Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(notificationSettings).map(([group, settings]) => (
          <div key={group} className="space-y-2">
            <div className="font-medium text-sm capitalize">{group}</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <input 
                  type="checkbox" 
                  checked={settings.email}
                  onChange={(e) => handleSettingChange(group as keyof NotificationSettings, 'email', e.target.checked)}
                />
                <span>Email</span>
              </div>
              <div className="flex items-center gap-1">
                <input 
                  type="checkbox" 
                  checked={settings.whatsapp}
                  onChange={(e) => handleSettingChange(group as keyof NotificationSettings, 'whatsapp', e.target.checked)}
                />
                <span>WhatsApp</span>
              </div>
              <div className="flex items-center gap-1">
                <input 
                  type="checkbox" 
                  checked={settings.sms}
                  onChange={(e) => handleSettingChange(group as keyof NotificationSettings, 'sms', e.target.checked)}
                />
                <span>SMS</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default StakeholderPreferences;
