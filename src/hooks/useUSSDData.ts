import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface USSDCode {
  id: string;
  code: string;
  description: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

interface USSDMenuItem {
  id: string;
  ussd_code_id: string;
  parent_id: string | null;
  name: string;
  level: number;
  display_order: number;
  service_id: string | null;
  status: 'active' | 'inactive';
}

interface WhatsAppSession {
  id: string;
  session_id: string;
  user_id: string | null;
  whatsapp_number: string;
  start_time: string;
  end_time: string | null;
  status: 'active' | 'ended' | 'suspended';
  last_activity: string;
  platform: string;
  chatbot_state: any;
  fallback_triggered: boolean;
}

export const useUSSDData = () => {
  const [ussdCodes, setUssdCodes] = useState<USSDCode[]>([]);
  const [menuItems, setMenuItems] = useState<USSDMenuItem[]>([]);
  const [whatsappSessions, setWhatsappSessions] = useState<WhatsAppSession[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch USSD Codes
  const fetchUSSDCodes = async () => {
    try {
      const { data, error } = await supabase
        .from('ussd_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUssdCodes(data || []);
    } catch (error) {
      console.error('Error fetching USSD codes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch USSD codes",
        variant: "destructive",
      });
    }
  };

  // Fetch Menu Items
  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('ussd_menu_items')
        .select('*')
        .order('level', { ascending: true })
        .order('display_order', { ascending: true });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  // Fetch WhatsApp Sessions
  const fetchWhatsAppSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_sessions')
        .select('*')
        .order('start_time', { ascending: false })
        .limit(50);

      if (error) throw error;
      setWhatsappSessions(data || []);
    } catch (error) {
      console.error('Error fetching WhatsApp sessions:', error);
    }
  };

  // Fetch Customers
  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('comprehensive_user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // Create USSD Code
  const createUSSDCode = async (codeData: Omit<USSDCode, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('ussd_codes')
        .insert([codeData])
        .select()
        .single();

      if (error) throw error;
      
      setUssdCodes(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "USSD code created successfully",
      });
      return data;
    } catch (error) {
      console.error('Error creating USSD code:', error);
      toast({
        title: "Error",
        description: "Failed to create USSD code",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Update USSD Code
  const updateUSSDCode = async (id: string, updates: Partial<USSDCode>) => {
    try {
      const { data, error } = await supabase
        .from('ussd_codes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setUssdCodes(prev => prev.map(code => code.id === id ? data : code));
      toast({
        title: "Success",
        description: "USSD code updated successfully",
      });
      return data;
    } catch (error) {
      console.error('Error updating USSD code:', error);
      toast({
        title: "Error",
        description: "Failed to update USSD code",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Delete USSD Code
  const deleteUSSDCode = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ussd_codes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setUssdCodes(prev => prev.filter(code => code.id !== id));
      toast({
        title: "Success",
        description: "USSD code deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting USSD code:', error);
      toast({
        title: "Error",
        description: "Failed to delete USSD code",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Create Menu Item
  const createMenuItem = async (menuData: Omit<USSDMenuItem, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('ussd_menu_items')
        .insert([menuData])
        .select()
        .single();

      if (error) throw error;
      
      setMenuItems(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Menu item created successfully",
      });
      return data;
    } catch (error) {
      console.error('Error creating menu item:', error);
      toast({
        title: "Error",
        description: "Failed to create menu item",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Search customers with advanced filters
  const searchCustomers = async (filters: any) => {
    try {
      let query = supabase.from('comprehensive_user_profiles').select('*');

      // Apply filters
      if (filters.search) {
        query = query.or(`full_name.ilike.%${filters.search}%,phone.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
      }
      
      if (filters.platform) {
        query = query.contains('registered_platforms', [filters.platform]);
      }
      
      if (filters.status) {
        query = query.eq('verification_status', filters.status);
      }
      
      if (filters.dateRange) {
        query = query.gte('created_at', filters.dateRange.from);
        query = query.lte('created_at', filters.dateRange.to);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
      return data;
    } catch (error) {
      console.error('Error searching customers:', error);
      toast({
        title: "Error",
        description: "Failed to search customers",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Real-time subscriptions
  useEffect(() => {
    // Initial data fetch
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchUSSDCodes(),
        fetchMenuItems(),
        fetchWhatsAppSessions(),
        fetchCustomers(),
      ]);
      setLoading(false);
    };

    fetchData();

    // Set up real-time subscriptions
    const ussdCodesSubscription = supabase
      .channel('ussd_codes_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ussd_codes' }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setUssdCodes(prev => [payload.new as USSDCode, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setUssdCodes(prev => prev.map(code => 
              code.id === payload.new.id ? payload.new as USSDCode : code
            ));
          } else if (payload.eventType === 'DELETE') {
            setUssdCodes(prev => prev.filter(code => code.id !== payload.old.id));
          }
        })
      .subscribe();

    const sessionsSubscription = supabase
      .channel('whatsapp_sessions_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'whatsapp_sessions' }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setWhatsappSessions(prev => [payload.new as WhatsAppSession, ...prev.slice(0, 49)]);
          } else if (payload.eventType === 'UPDATE') {
            setWhatsappSessions(prev => prev.map(session => 
              session.id === payload.new.id ? payload.new as WhatsAppSession : session
            ));
          }
        })
      .subscribe();

    return () => {
      ussdCodesSubscription.unsubscribe();
      sessionsSubscription.unsubscribe();
    };
  }, []);

  return {
    // Data
    ussdCodes,
    menuItems,
    whatsappSessions,
    customers,
    loading,
    
    // USSD Code operations
    createUSSDCode,
    updateUSSDCode,
    deleteUSSDCode,
    
    // Menu operations
    createMenuItem,
    
    // Customer operations
    searchCustomers,
    
    // Refresh functions
    refetch: () => {
      fetchUSSDCodes();
      fetchMenuItems();
      fetchWhatsAppSessions();
      fetchCustomers();
    }
  };
};