import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface BulkActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'sms' | 'topup' | 'rica' | null;
  selectedCustomers: string[];
}

const BulkActionsPanel: React.FC<BulkActionModalProps> = ({ 
  isOpen, onClose, action, selectedCustomers 
}) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  
  // SMS Campaign State
  const [smsMessage, setSmsMessage] = useState('');
  const [campaignName, setCampaignName] = useState('');
  
  // Top-Up State
  const [topUpAmount, setTopUpAmount] = useState(50);
  const [topUpNetwork, setTopUpNetwork] = useState('');
  const [productType, setProductType] = useState('airtime');
  
  // RICA State
  const [ricaUpdateType, setRicaUpdateType] = useState('check_status');
  const [ricaStatus, setRicaStatus] = useState('verified');

  const handleBulkSMSCampaign = async () => {
    if (!smsMessage.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter an SMS message",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const { data, error } = await supabase.functions.invoke('bulk-sms-campaign', {
        body: {
          customerIds: selectedCustomers,
          message: smsMessage,
          campaign_name: campaignName || undefined,
          sender_name: 'Divine Mobile'
        }
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (error) throw error;

      setResults(data);
      
      toast({
        title: "SMS Campaign Completed",
        description: `Sent to ${data.summary.sent} customers successfully`,
      });

    } catch (error: any) {
      console.error('SMS Campaign Error:', error);
      toast({
        title: "SMS Campaign Failed",
        description: error.message || "Failed to send bulk SMS",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkTopUp = async () => {
    if (topUpAmount < 5 || topUpAmount > 1000) {
      toast({
        title: "Invalid Amount",
        description: "Top-up amount must be between R5 and R1000",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 8, 85));
      }, 800);

      const { data, error } = await supabase.functions.invoke('bulk-topup', {
        body: {
          customerIds: selectedCustomers,
          amount: topUpAmount,
          network: topUpNetwork || undefined,
          product_type: productType,
          reference: `BULK_${Date.now()}`
        }
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (error) throw error;

      setResults(data);
      
      toast({
        title: "Bulk Top-Up Completed",
        description: `${data.summary.successful_topups} customers topped up successfully`,
      });

    } catch (error: any) {
      console.error('Bulk Top-Up Error:', error);
      toast({
        title: "Bulk Top-Up Failed",
        description: error.message || "Failed to process bulk top-up",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRICAStatusUpdate = async () => {
    setIsProcessing(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 90));
      }, 1000);

      const { data, error } = await supabase.functions.invoke('rica-status-update', {
        body: {
          customerIds: selectedCustomers,
          update_type: ricaUpdateType,
          rica_status: ricaUpdateType === 'force_update' ? ricaStatus : undefined
        }
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (error) throw error;

      setResults(data);
      
      toast({
        title: "RICA Update Completed",
        description: `${data.summary.updated} customers updated successfully`,
      });

    } catch (error: any) {
      console.error('RICA Update Error:', error);
      toast({
        title: "RICA Update Failed",
        description: error.message || "Failed to update RICA status",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setResults(null);
    setProgress(0);
    setIsProcessing(false);
    setSmsMessage('');
    setCampaignName('');
    setTopUpAmount(50);
    setTopUpNetwork('');
    setProductType('airtime');
    setRicaUpdateType('check_status');
    setRicaStatus('verified');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {action === 'sms' && '📱 Bulk SMS Campaign'}
            {action === 'topup' && '💳 Bulk Top-Up'}
            {action === 'rica' && '🔄 RICA Status Update'}
          </CardTitle>
          <Button variant="outline" onClick={() => { onClose(); resetModal(); }}>
            Close
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>{selectedCustomers.length}</strong> customers selected for bulk operation
            </p>
          </div>

          {/* SMS Campaign Form */}
          {action === 'sms' && !results && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaign-name">Campaign Name (Optional)</Label>
                <Input
                  id="campaign-name"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., January Promotion"
                />
              </div>
              <div>
                <Label htmlFor="sms-message">SMS Message *</Label>
                <Textarea
                  id="sms-message"
                  value={smsMessage}
                  onChange={(e) => setSmsMessage(e.target.value)}
                  placeholder="Your message here... Use {name} to personalize"
                  rows={4}
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {smsMessage.length}/160 characters
                </p>
              </div>
              <Button 
                onClick={handleBulkSMSCampaign}
                disabled={isProcessing || !smsMessage.trim()}
                className="w-full"
              >
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Send Bulk SMS Campaign
              </Button>
            </div>
          )}

          {/* Top-Up Form */}
          {action === 'topup' && !results && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="topup-amount">Top-Up Amount (R5 - R1000) *</Label>
                <Input
                  id="topup-amount"
                  type="number"
                  min="5"
                  max="1000"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="network">Network (Auto-detect if empty)</Label>
                <Select value={topUpNetwork} onValueChange={setTopUpNetwork}>
                  <SelectTrigger>
                    <SelectValue placeholder="Auto-detect from phone number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-detect</SelectItem>
                    <SelectItem value="MTN">MTN</SelectItem>
                    <SelectItem value="Vodacom">Vodacom</SelectItem>
                    <SelectItem value="Cell C">Cell C</SelectItem>
                    <SelectItem value="Telkom">Telkom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="product-type">Product Type</Label>
                <Select value={productType} onValueChange={setProductType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="airtime">Airtime</SelectItem>
                    <SelectItem value="data">Data</SelectItem>
                    <SelectItem value="sms">SMS Bundle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleBulkTopUp}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Process Bulk Top-Up
              </Button>
            </div>
          )}

          {/* RICA Update Form */}
          {action === 'rica' && !results && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="rica-update-type">Update Type</Label>
                <Select value={ricaUpdateType} onValueChange={setRicaUpdateType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="check_status">Check Current Status</SelectItem>
                    <SelectItem value="force_update">Force Status Update</SelectItem>
                    <SelectItem value="bulk_verify">Bulk Verification</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {ricaUpdateType === 'force_update' && (
                <div>
                  <Label htmlFor="rica-status">New RICA Status</Label>
                  <Select value={ricaStatus} onValueChange={setRicaStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <Button 
                onClick={handleRICAStatusUpdate}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Update RICA Status
              </Button>
            </div>
          )}

          {/* Progress Bar */}
          {isProcessing && (
            <div className="space-y-2">
              <Label>Processing...</Label>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-600 text-center">{progress}% Complete</p>
            </div>
          )}

          {/* Results Display */}
          {results && (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Operation Completed Successfully
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-green-600">Total: {results.summary.total_customers || results.summary.total_recipients}</p>
                  </div>
                  <div>
                    <p className="text-green-600">Successful: {results.summary.sent || results.summary.successful_topups || results.summary.updated}</p>
                  </div>
                  <div>
                    <p className="text-green-600">Success Rate: {results.summary.success_rate}</p>
                  </div>
                </div>
              </div>

              {results.failed_customers && results.failed_customers.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                    <XCircle className="mr-2 h-5 w-5" />
                    Failed Operations ({results.failed_customers.length})
                  </h4>
                  <div className="max-h-32 overflow-y-auto">
                    {results.failed_customers.slice(0, 5).map((customer: any, index: number) => (
                      <p key={index} className="text-sm text-red-600">
                        {customer.customer_name} ({customer.msisdn}): {customer.error || customer.error_message}
                      </p>
                    ))}
                    {results.failed_customers.length > 5 && (
                      <p className="text-sm text-red-600">... and {results.failed_customers.length - 5} more</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkActionsPanel;