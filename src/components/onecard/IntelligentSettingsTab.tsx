import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Save, Settings, Users, DollarSign, Bell, Shield, Database, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsState {
  programEnabled: boolean;
  programName: string;
  programDescription: string;
  currency: string;
  annualCashbackLimit: number;
  resetDate: string;
  rates: {
    customer: number;
    vendor: number;
    admin: number;
    fieldWorker: number;
    premium: number;
  };
  adminFees: {
    customer: number;
    vendor: number;
    admin: number;
  };
  multipliers: {
    customer: number;
    vendor: number;
    admin: number;
    premium: number;
  };
  eligibility: {
    minPurchase: number;
    eligiblePaymentMethods: string[];
    geographicRestrictions: boolean;
    excludedCategories: string[];
  };
  distribution: {
    vendorShare: number;
    adminShare: number;
    customerShare: number;
  };
  redemption: {
    minRedemption: number;
    expiryDays: number;
    redemptionMethods: string[];
  };
  notifications: {
    adminAlerts: boolean;
    userNotifications: boolean;
    promotionAnnouncements: boolean;
  };
}

const IntelligentSettingsTab = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SettingsState>({
    programEnabled: true,
    programName: 'OneCard Cashback Rewards',
    programDescription: 'Intelligent cashback program with multi-tier benefits',
    currency: 'ZAR',
    annualCashbackLimit: 50000,
    resetDate: '2025-01-01',
    rates: {
      customer: 2.5,
      vendor: 8.0,
      admin: 3.75,
      fieldWorker: 12.0,
      premium: 5.0
    },
    adminFees: {
      customer: 2.0,
      vendor: 2.0,
      admin: 0.0
    },
    multipliers: {
      customer: 1.0,
      vendor: 1.0,
      admin: 1.5,
      premium: 2.0
    },
    eligibility: {
      minPurchase: 10,
      eligiblePaymentMethods: ['credit_card', 'debit_card', 'wallet'],
      geographicRestrictions: false,
      excludedCategories: ['gambling', 'tobacco']
    },
    distribution: {
      vendorShare: 75,
      adminShare: 12.5,
      customerShare: 12.5
    },
    redemption: {
      minRedemption: 50,
      expiryDays: 365,
      redemptionMethods: ['cash', 'store_credit', 'voucher']
    },
    notifications: {
      adminAlerts: true,
      userNotifications: true,
      promotionAnnouncements: true
    }
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('onecardSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Get user info for permissions
    const credentials = localStorage.getItem('userCredentials');
    if (credentials) {
      try {
        const parsedCredentials = JSON.parse(credentials);
        setUserInfo(parsedCredentials);
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }
  }, []);

  const updateSettings = (section: keyof SettingsState, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const updateRootSetting = (key: keyof SettingsState, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    localStorage.setItem('onecardSettings', JSON.stringify(settings));
    setHasChanges(false);
    toast({
      title: "Settings Saved",
      description: "OneCard cashback settings have been updated successfully.",
    });
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      programEnabled: true,
      programName: 'OneCard Cashback Rewards',
      programDescription: 'Intelligent cashback program with multi-tier benefits',
      currency: 'ZAR',
      annualCashbackLimit: 50000,
      resetDate: '2025-01-01',
      rates: {
        customer: 2.5,
        vendor: 8.0,
        admin: 3.75,
        fieldWorker: 12.0,
        premium: 5.0
      },
      adminFees: {
        customer: 2.0,
        vendor: 2.0,
        admin: 0.0
      },
      multipliers: {
        customer: 1.0,
        vendor: 1.0,
        admin: 1.5,
        premium: 2.0
      },
      eligibility: {
        minPurchase: 10,
        eligiblePaymentMethods: ['credit_card', 'debit_card', 'wallet'],
        geographicRestrictions: false,
        excludedCategories: ['gambling', 'tobacco']
      },
      distribution: {
        vendorShare: 75,
        adminShare: 12.5,
        customerShare: 12.5
      },
      redemption: {
        minRedemption: 50,
        expiryDays: 365,
        redemptionMethods: ['cash', 'store_credit', 'voucher']
      },
      notifications: {
        adminAlerts: true,
        userNotifications: true,
        promotionAnnouncements: true
      }
    };
    setSettings(defaultSettings);
    setHasChanges(true);
  };

  const isAdmin = userInfo?.userType === 'admin' || userInfo?.password === 'Malawi@1976';

  if (!isAdmin) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Shield className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Access Restricted</h3>
          <p className="text-muted-foreground text-center">
            Cashback settings are only accessible to administrators.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6" />
            OneCard Cashback Settings
          </h1>
          <p className="text-muted-foreground">
            Configure and optimize your intelligent cashback rewards program
          </p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <Badge variant="secondary" className="animate-pulse">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Unsaved Changes
            </Badge>
          )}
          <Button onClick={resetToDefaults} variant="outline" size="sm">
            Reset Defaults
          </Button>
          <Button onClick={saveSettings} disabled={!hasChanges} className="gap-2">
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="rates">Rates & Tiers</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="redemption">Redemption</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Program Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="program-enabled"
                  checked={settings.programEnabled}
                  onCheckedChange={(checked) => updateRootSetting('programEnabled', checked)}
                />
                <Label htmlFor="program-enabled">Enable Cashback Program</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="program-name">Program Name</Label>
                  <Input
                    id="program-name"
                    value={settings.programName}
                    onChange={(e) => updateRootSetting('programName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={settings.currency}
                    onChange={(e) => updateRootSetting('currency', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="program-description">Program Description</Label>
                <Input
                  id="program-description"
                  value={settings.programDescription}
                  onChange={(e) => updateRootSetting('programDescription', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="annual-limit">Annual Cashback Limit ({settings.currency})</Label>
                  <Input
                    id="annual-limit"
                    type="number"
                    value={settings.annualCashbackLimit}
                    onChange={(e) => updateRootSetting('annualCashbackLimit', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="reset-date">Annual Reset Date</Label>
                  <Input
                    id="reset-date"
                    type="date"
                    value={settings.resetDate}
                    onChange={(e) => updateRootSetting('resetDate', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rates & Tiers */}
        <TabsContent value="rates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Cashback Rates Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">User Type</th>
                      <th className="text-left p-2">Cashback Rate (%)</th>
                      <th className="text-left p-2">Admin Fee (%)</th>
                      <th className="text-left p-2">Multiplier</th>
                      <th className="text-left p-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Customer</td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={settings.rates.customer}
                          onChange={(e) => updateSettings('rates', 'customer', Number(e.target.value))}
                          className="w-20"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={settings.adminFees.customer}
                          onChange={(e) => updateSettings('adminFees', 'customer', Number(e.target.value))}
                          className="w-20"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={settings.multipliers.customer}
                          onChange={(e) => updateSettings('multipliers', 'customer', Number(e.target.value))}
                          className="w-20"
                        />
                      </td>
                      <td className="p-2 text-sm text-muted-foreground">Base customer rate</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Vendor</td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={settings.rates.vendor}
                          onChange={(e) => updateSettings('rates', 'vendor', Number(e.target.value))}
                          className="w-20"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={settings.adminFees.vendor}
                          onChange={(e) => updateSettings('adminFees', 'vendor', Number(e.target.value))}
                          className="w-20"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={settings.multipliers.vendor}
                          onChange={(e) => updateSettings('multipliers', 'vendor', Number(e.target.value))}
                          className="w-20"
                        />
                      </td>
                      <td className="p-2 text-sm text-muted-foreground">Profit + cashback</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Admin User</td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={settings.rates.admin}
                          onChange={(e) => updateSettings('rates', 'admin', Number(e.target.value))}
                          className="w-20"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={settings.adminFees.admin}
                          onChange={(e) => updateSettings('adminFees', 'admin', Number(e.target.value))}
                          className="w-20"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={settings.multipliers.admin}
                          onChange={(e) => updateSettings('multipliers', 'admin', Number(e.target.value))}
                          className="w-20"
                        />
                      </td>
                      <td className="p-2 text-sm text-muted-foreground">Enhanced rate, no fees</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Field Worker</td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={settings.rates.fieldWorker}
                          onChange={(e) => updateSettings('rates', 'fieldWorker', Number(e.target.value))}
                          className="w-20"
                        />
                      </td>
                      <td className="p-2">
                        <span className="text-muted-foreground">N/A</span>
                      </td>
                      <td className="p-2">
                        <span className="text-muted-foreground">N/A</span>
                      </td>
                      <td className="p-2 text-sm text-muted-foreground">Commission on activations</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Premium/VIP</td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={settings.rates.premium}
                          onChange={(e) => updateSettings('rates', 'premium', Number(e.target.value))}
                          className="w-20"
                        />
                      </td>
                      <td className="p-2">
                        <span className="text-muted-foreground">Same as customer</span>
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={settings.multipliers.premium}
                          onChange={(e) => updateSettings('multipliers', 'premium', Number(e.target.value))}
                          className="w-20"
                        />
                      </td>
                      <td className="p-2 text-sm text-muted-foreground">Enhanced multiplier</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Eligibility & Conditions */}
        <TabsContent value="eligibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Eligibility & Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min-purchase">Minimum Purchase Amount ({settings.currency})</Label>
                  <Input
                    id="min-purchase"
                    type="number"
                    value={settings.eligibility.minPurchase}
                    onChange={(e) => updateSettings('eligibility', 'minPurchase', Number(e.target.value))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="geo-restrictions"
                    checked={settings.eligibility.geographicRestrictions}
                    onCheckedChange={(checked) => updateSettings('eligibility', 'geographicRestrictions', checked)}
                  />
                  <Label htmlFor="geo-restrictions">Enable Geographic Restrictions</Label>
                </div>
              </div>

              <div>
                <Label>Eligible Payment Methods</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['credit_card', 'debit_card', 'wallet', 'bank_transfer', 'mobile_money'].map((method) => (
                    <Badge
                      key={method}
                      variant={settings.eligibility.eligiblePaymentMethods.includes(method) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => {
                        const methods = settings.eligibility.eligiblePaymentMethods.includes(method)
                          ? settings.eligibility.eligiblePaymentMethods.filter(m => m !== method)
                          : [...settings.eligibility.eligiblePaymentMethods, method];
                        updateSettings('eligibility', 'eligiblePaymentMethods', methods);
                      }}
                    >
                      {method.replace('_', ' ').toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Excluded Categories</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['gambling', 'tobacco', 'alcohol', 'adult_content', 'cryptocurrency'].map((category) => (
                    <Badge
                      key={category}
                      variant={settings.eligibility.excludedCategories.includes(category) ? 'destructive' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => {
                        const categories = settings.eligibility.excludedCategories.includes(category)
                          ? settings.eligibility.excludedCategories.filter(c => c !== category)
                          : [...settings.eligibility.excludedCategories, category];
                        updateSettings('eligibility', 'excludedCategories', categories);
                      }}
                    >
                      {category.replace('_', ' ').toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distribution Rules */}
        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Profit Distribution Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="vendor-share">Vendor Share (%)</Label>
                  <Input
                    id="vendor-share"
                    type="number"
                    value={settings.distribution.vendorShare}
                    onChange={(e) => updateSettings('distribution', 'vendorShare', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="admin-share">Admin Share (%)</Label>
                  <Input
                    id="admin-share"
                    type="number"
                    value={settings.distribution.adminShare}
                    onChange={(e) => updateSettings('distribution', 'adminShare', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="customer-share">Customer Cashback (%)</Label>
                  <Input
                    id="customer-share"
                    type="number"
                    value={settings.distribution.customerShare}
                    onChange={(e) => updateSettings('distribution', 'customerShare', Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Distribution Preview</h4>
                <div className="text-sm text-muted-foreground">
                  For every R100 transaction profit:
                  <ul className="mt-2 space-y-1">
                    <li>• Vendor receives: R{settings.distribution.vendorShare}</li>
                    <li>• Admin receives: R{settings.distribution.adminShare}</li>
                    <li>• Customer cashback: R{settings.distribution.customerShare}</li>
                    <li>• Total: R{settings.distribution.vendorShare + settings.distribution.adminShare + settings.distribution.customerShare}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Redemption & Expiry */}
        <TabsContent value="redemption" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Redemption & Expiry Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min-redemption">Minimum Redemption ({settings.currency})</Label>
                  <Input
                    id="min-redemption"
                    type="number"
                    value={settings.redemption.minRedemption}
                    onChange={(e) => updateSettings('redemption', 'minRedemption', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="expiry-days">Reward Expiry (Days)</Label>
                  <Input
                    id="expiry-days"
                    type="number"
                    value={settings.redemption.expiryDays}
                    onChange={(e) => updateSettings('redemption', 'expiryDays', Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label>Redemption Methods</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['cash', 'store_credit', 'voucher', 'bank_transfer', 'mobile_money'].map((method) => (
                    <Badge
                      key={method}
                      variant={settings.redemption.redemptionMethods.includes(method) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => {
                        const methods = settings.redemption.redemptionMethods.includes(method)
                          ? settings.redemption.redemptionMethods.filter(m => m !== method)
                          : [...settings.redemption.redemptionMethods, method];
                        updateSettings('redemption', 'redemptionMethods', methods);
                      }}
                    >
                      {method.replace('_', ' ').toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications & Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="admin-alerts"
                    checked={settings.notifications.adminAlerts}
                    onCheckedChange={(checked) => updateSettings('notifications', 'adminAlerts', checked)}
                  />
                  <Label htmlFor="admin-alerts">Admin Alerts for Unusual Activity</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="user-notifications"
                    checked={settings.notifications.userNotifications}
                    onCheckedChange={(checked) => updateSettings('notifications', 'userNotifications', checked)}
                  />
                  <Label htmlFor="user-notifications">User Notifications for Cashback</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="promotion-announcements"
                    checked={settings.notifications.promotionAnnouncements}
                    onCheckedChange={(checked) => updateSettings('notifications', 'promotionAnnouncements', checked)}
                  />
                  <Label htmlFor="promotion-announcements">Promotion Announcements</Label>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Analytics Integration</h4>
                <p className="text-sm text-blue-700">
                  Real-time dashboards and analytics are automatically enabled for all settings changes.
                  Access comprehensive reports via the Reports and AI Analytics tabs.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntelligentSettingsTab;