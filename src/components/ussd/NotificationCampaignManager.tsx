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
  Send,
  Users,
  Calendar,
  BarChart3,
  Plus,
  Play,
  Pause,
  Eye,
  MessageSquare,
  Globe,
  Smartphone,
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2,
  Edit
} from 'lucide-react';

interface Campaign {
  id: string;
  campaign_name: string;
  campaign_type: string;
  message_template: any;
  target_audience: string;
  total_recipients: number;
  messages_sent: number;
  messages_delivered: number;
  messages_failed: number;
  campaign_status: string;
  scheduled_at: string | null;
  created_at: string;
}

interface Language {
  language_code: string;
  language_name: string;
  native_name: string;
}

const NotificationCampaignManager = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [activeTab, setActiveTab] = useState('campaigns');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const [newCampaign, setNewCampaign] = useState({
    campaign_name: '',
    campaign_type: 'sim_activation',
    target_audience: 'all',
    message_template: {} as Record<string, string>,
    scheduled_at: ''
  });

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    fetchCampaigns();
    fetchLanguages();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('ussd_notification_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast({
        title: "Error",
        description: "Failed to fetch campaigns.",
        variant: "destructive"
      });
    }
  };

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
    }
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.campaign_name || Object.keys(newCampaign.message_template).length === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide campaign name and at least one message template.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('ussd_notification_campaigns')
        .insert([{
          ...newCampaign,
          scheduled_at: newCampaign.scheduled_at || null
        }])
        .select()
        .single();

      if (error) throw error;

      setCampaigns(prev => [data, ...prev]);
      setNewCampaign({
        campaign_name: '',
        campaign_type: 'sim_activation',
        target_audience: 'all',
        message_template: {},
        scheduled_at: ''
      });
      setShowCreateForm(false);

      toast({
        title: "Success",
        description: "Campaign created successfully.",
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create campaign.",
        variant: "destructive"
      });
    }
  };

  const handleLanguageMessageUpdate = () => {
    setNewCampaign(prev => ({
      ...prev,
      message_template: {
        ...prev.message_template,
        [selectedLanguage]: currentMessage
      }
    }));
    setCurrentMessage('');
    
    toast({
      title: "Message Added",
      description: `Message template added for ${languages.find(l => l.language_code === selectedLanguage)?.language_name}`,
    });
  };

  const triggerCampaign = async (campaignId: string) => {
    try {
      // In a real implementation, this would trigger the USSD/SMS sending system
      const { error } = await supabase
        .from('ussd_notification_campaigns')
        .update({ campaign_status: 'running', started_at: new Date().toISOString() })
        .eq('id', campaignId);

      if (error) throw error;

      await fetchCampaigns();
      
      toast({
        title: "Campaign Started",
        description: "Notification campaign has been initiated.",
      });
    } catch (error) {
      console.error('Error starting campaign:', error);
      toast({
        title: "Error",
        description: "Failed to start campaign.",
        variant: "destructive"
      });
    }
  };

  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'running': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const CampaignsList = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold">Notification Campaigns</h3>
          <p className="text-sm text-muted-foreground">Manage USSD and SMS notification campaigns</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {campaigns.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No campaigns yet. Create your first campaign!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">{campaign.campaign_name}</h4>
                      <Badge 
                        variant="secondary" 
                        className={`text-white ${getCampaignStatusColor(campaign.campaign_status)}`}
                      >
                        {campaign.campaign_status}
                      </Badge>
                      <Badge variant="outline">
                        {campaign.campaign_type.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>{campaign.total_recipients} recipients</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4 text-green-500" />
                        <span>{campaign.messages_sent} sent</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>{campaign.messages_delivered} delivered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span>{campaign.messages_failed} failed</span>
                      </div>
                    </div>
                    
                    {campaign.scheduled_at && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Scheduled: {new Date(campaign.scheduled_at).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-row lg:flex-col gap-2">
                    {campaign.campaign_status === 'draft' && (
                      <Button
                        size="sm"
                        onClick={() => triggerCampaign(campaign.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const CreateCampaignForm = () => (
    <Card className="border-green-200 bg-green-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5 text-green-600" />
          Create New Campaign
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Campaign Name</label>
            <Input
              placeholder="e.g., SIM Activation Welcome"
              value={newCampaign.campaign_name}
              onChange={(e) => setNewCampaign(prev => ({ ...prev, campaign_name: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Campaign Type</label>
            <Select 
              value={newCampaign.campaign_type} 
              onValueChange={(value) => setNewCampaign(prev => ({ ...prev, campaign_type: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sim_activation">SIM Activation</SelectItem>
                <SelectItem value="rica_reminder">RICA Reminder</SelectItem>
                <SelectItem value="bulk_notification">Bulk Notification</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Target Audience</label>
            <Select 
              value={newCampaign.target_audience} 
              onValueChange={(value) => setNewCampaign(prev => ({ ...prev, target_audience: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="pending_activation">Pending Activation</SelectItem>
                <SelectItem value="rica_pending">RICA Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Schedule (Optional)</label>
            <Input
              type="datetime-local"
              value={newCampaign.scheduled_at}
              onChange={(e) => setNewCampaign(prev => ({ ...prev, scheduled_at: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Message Templates by Language</label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
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
          </div>

          <div>
            <Textarea
              placeholder="Enter message template for selected language..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              rows={4}
            />
            <Button 
              onClick={handleLanguageMessageUpdate}
              className="mt-2 w-full sm:w-auto"
              disabled={!currentMessage.trim()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Message Template
            </Button>
          </div>

          {Object.keys(newCampaign.message_template).length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Added Templates:</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(newCampaign.message_template).map((langCode) => (
                  <Badge key={langCode} variant="secondary">
                    {languages.find(l => l.language_code === langCode)?.language_name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button onClick={handleCreateCampaign} className="bg-green-600 hover:bg-green-700">
            <Send className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
          <Button variant="outline" onClick={() => setShowCreateForm(false)}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 md:p-6 border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-primary">Notification Campaign Manager</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Bulk USSD & SMS notifications for SIM activation and RICA compliance
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-blue-600">
              {campaigns.filter(c => c.campaign_status === 'running').length}
            </div>
            <div className="text-muted-foreground">Active</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-green-600">
              {campaigns.filter(c => c.campaign_status === 'completed').length}
            </div>
            <div className="text-muted-foreground">Completed</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-yellow-600">
              {campaigns.reduce((sum, c) => sum + c.messages_sent, 0)}
            </div>
            <div className="text-muted-foreground">Messages Sent</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-emerald-600">
              {campaigns.reduce((sum, c) => sum + c.messages_delivered, 0)}
            </div>
            <div className="text-muted-foreground">Delivered</div>
          </div>
        </div>
      </div>

      {showCreateForm && <CreateCampaignForm />}
      <CampaignsList />
    </div>
  );
};

export default NotificationCampaignManager;