import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Globe,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  MessageSquare,
  Menu,
  Languages,
  Settings,
  CheckCircle,
  AlertCircle,
  Play,
  Phone
} from 'lucide-react';

interface Language {
  language_code: string;
  language_name: string;
  native_name: string;
  is_active: boolean;
}

interface MenuConfiguration {
  id: string;
  menu_key: string;
  language_code: string;
  menu_text: string;
  menu_options: any;
  is_active: boolean;
}

interface USSDSession {
  id: string;
  session_id: string;
  phone_number: string;
  current_menu: string;
  language_preference: string;
  session_status: string;
  last_activity_at: string;
}

const MultiLanguageUSSDMenu = () => {
  const { toast } = useToast();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [menuConfigurations, setMenuConfigurations] = useState<MenuConfiguration[]>([]);
  const [activeSessions, setActiveSessions] = useState<USSDSession[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedMenuKey, setSelectedMenuKey] = useState('main_menu');
  const [editingConfig, setEditingConfig] = useState<MenuConfiguration | null>(null);
  const [activeTab, setActiveTab] = useState('menus');

  const menuKeys = [
    { key: 'main_menu', label: 'Main Menu', description: 'Primary USSD menu' },
    { key: 'activation_menu', label: 'Activation Menu', description: 'SIM activation options' },
    { key: 'language_menu', label: 'Language Menu', description: 'Language selection' },
    { key: 'opt_out_confirm', label: 'Opt-out Confirmation', description: 'Unsubscribe confirmation' },
    { key: 'rica_menu', label: 'RICA Menu', description: 'RICA compliance options' },
    { key: 'help_menu', label: 'Help Menu', description: 'Support and assistance' }
  ];

  const [newMenuConfig, setNewMenuConfig] = useState({
    menu_key: 'main_menu',
    language_code: 'en',
    menu_text: '',
    menu_options: {} as Record<string, string>
  });

  useEffect(() => {
    fetchLanguages();
    fetchMenuConfigurations();
    fetchActiveSessions();
  }, []);

  const fetchLanguages = async () => {
    try {
      const { data, error } = await supabase
        .from('south_african_languages')
        .select('*')
        .eq('is_active', true)
        .order('language_name');

      if (error) throw error;
      setLanguages(data || []);
    } catch (error) {
      console.error('Error fetching languages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch languages.",
        variant: "destructive"
      });
    }
  };

  const fetchMenuConfigurations = async () => {
    try {
      const { data, error } = await supabase
        .from('ussd_menu_configurations')
        .select('*')
        .order('menu_key, language_code');

      if (error) throw error;
      setMenuConfigurations(data || []);
    } catch (error) {
      console.error('Error fetching menu configurations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch menu configurations.",
        variant: "destructive"
      });
    }
  };

  const fetchActiveSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('ussd_session_states')
        .select('*')
        .eq('session_status', 'active')
        .order('last_activity_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setActiveSessions(data || []);
    } catch (error) {
      console.error('Error fetching active sessions:', error);
    }
  };

  const saveMenuConfiguration = async () => {
    if (!newMenuConfig.menu_text.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide menu text.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('ussd_menu_configurations')
        .upsert([{
          menu_key: newMenuConfig.menu_key,
          language_code: newMenuConfig.language_code,
          menu_text: newMenuConfig.menu_text,
          menu_options: newMenuConfig.menu_options,
          is_active: true
        }], {
          onConflict: 'menu_key,language_code'
        });

      if (error) throw error;

      await fetchMenuConfigurations();
      setNewMenuConfig({
        menu_key: 'main_menu',
        language_code: 'en',
        menu_text: '',
        menu_options: {}
      });

      toast({
        title: "Success",
        description: "Menu configuration saved successfully.",
      });
    } catch (error) {
      console.error('Error saving menu configuration:', error);
      toast({
        title: "Error",
        description: "Failed to save menu configuration.",
        variant: "destructive"
      });
    }
  };

  const simulateUSSDSession = async (menuKey: string, language: string) => {
    const config = menuConfigurations.find(
      c => c.menu_key === menuKey && c.language_code === language
    );

    if (!config) {
      toast({
        title: "Menu Not Found",
        description: `No menu configuration found for ${menuKey} in ${language}`,
        variant: "destructive"
      });
      return;
    }

    // Create a simulated session
    const sessionId = `sim_${Date.now()}`;
    try {
      const { error } = await supabase
        .from('ussd_session_states')
        .insert([{
          session_id: sessionId,
          phone_number: '+27123456789', // Simulated number
          current_menu: menuKey,
          language_preference: language,
          session_status: 'active',
          session_data: { simulated: true }
        }]);

      if (error) throw error;

      await fetchActiveSessions();

      toast({
        title: "USSD Session Simulated",
        description: `Test session created for ${menuKey} in ${language}`,
      });
    } catch (error) {
      console.error('Error creating simulation:', error);
      toast({
        title: "Error",
        description: "Failed to create simulation.",
        variant: "destructive"
      });
    }
  };

  const getLanguageDisplay = (code: string) => {
    const lang = languages.find(l => l.language_code === code);
    return lang ? `${lang.language_name} (${lang.native_name})` : code;
  };

  const getMenuCoverage = () => {
    const totalPossibleConfigs = menuKeys.length * languages.length;
    const existingConfigs = menuConfigurations.filter(c => c.is_active).length;
    return Math.round((existingConfigs / totalPossibleConfigs) * 100);
  };

  const MenuConfigurationTab = () => (
    <div className="space-y-6">
      {/* Menu Configuration Form */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" />
            Configure USSD Menu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Menu Type</label>
              <Select 
                value={newMenuConfig.menu_key} 
                onValueChange={(value) => setNewMenuConfig(prev => ({ ...prev, menu_key: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {menuKeys.map((menu) => (
                    <SelectItem key={menu.key} value={menu.key}>
                      {menu.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <Select 
                value={newMenuConfig.language_code} 
                onValueChange={(value) => setNewMenuConfig(prev => ({ ...prev, language_code: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.language_code} value={lang.language_code}>
                      {lang.language_name} ({lang.native_name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={() => simulateUSSDSession(newMenuConfig.menu_key, newMenuConfig.language_code)}
                variant="outline"
                className="w-full"
              >
                <Play className="w-4 h-4 mr-2" />
                Test Menu
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Menu Text</label>
            <Textarea
              placeholder="Enter the USSD menu text..."
              value={newMenuConfig.menu_text}
              onChange={(e) => setNewMenuConfig(prev => ({ ...prev, menu_text: e.target.value }))}
              rows={6}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use \n for line breaks. Keep messages under 160 characters for optimal display.
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={saveMenuConfiguration} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Configurations */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Menu className="w-5 h-5 text-primary" />
              Menu Configurations
            </CardTitle>
            <Badge variant="secondary">
              {getMenuCoverage()}% Coverage
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {menuKeys.map((menuKey) => (
              <div key={menuKey.key} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{menuKey.label}</h4>
                    <p className="text-sm text-muted-foreground">{menuKey.description}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {languages.map((lang) => {
                      const config = menuConfigurations.find(
                        c => c.menu_key === menuKey.key && c.language_code === lang.language_code
                      );
                      return (
                        <Badge 
                          key={lang.language_code}
                          variant={config ? "default" : "secondary"}
                          className={config ? "bg-green-500" : "bg-gray-300"}
                        >
                          {lang.language_code.toUpperCase()}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                
                <div className="grid gap-2">
                  {menuConfigurations
                    .filter(c => c.menu_key === menuKey.key)
                    .map((config) => (
                      <div key={`${config.menu_key}-${config.language_code}`} 
                           className="bg-muted/50 p-3 rounded border-l-4 border-l-blue-500">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Globe className="w-4 h-4 text-blue-500" />
                              <span className="font-medium text-sm">
                                {getLanguageDisplay(config.language_code)}
                              </span>
                            </div>
                            <div className="font-mono text-xs bg-white p-2 rounded border">
                              {config.menu_text.split('\\n').map((line, i) => (
                                <div key={i}>{line}</div>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => simulateUSSDSession(config.menu_key, config.language_code)}
                            >
                              <Play className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ActiveSessionsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Active USSD Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeSessions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Phone className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No active USSD sessions.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <div className="font-mono font-medium">{session.phone_number}</div>
                      <div className="text-sm text-muted-foreground">
                        Menu: {session.current_menu} | {getLanguageDisplay(session.language_preference)}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(session.last_activity_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-4 md:p-6 border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Languages className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Multi-Language USSD Menus</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Configure USSD menus for all South African languages
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-purple-600">
              {languages.length}
            </div>
            <div className="text-muted-foreground">Languages</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-blue-600">
              {menuKeys.length}
            </div>
            <div className="text-muted-foreground">Menu Types</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-green-600">
              {menuConfigurations.filter(c => c.is_active).length}
            </div>
            <div className="text-muted-foreground">Configured</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-orange-600">
              {activeSessions.length}
            </div>
            <div className="text-muted-foreground">Active</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="menus" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Menu Configuration
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Active Sessions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="menus">
          <MenuConfigurationTab />
        </TabsContent>

        <TabsContent value="sessions">
          <ActiveSessionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiLanguageUSSDMenu;
