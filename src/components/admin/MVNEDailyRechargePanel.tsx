import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Download, 
  Upload, 
  Database, 
  DatabaseZap, 
  Scan, 
  ScanText, 
  FileSearch, 
  CheckCircle,
  AlertTriangle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Users,
  DollarSign,
  Package
} from 'lucide-react';

interface RechargeExtractionJob {
  id: string;
  type: 'clean' | 'unclean';
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  recordsProcessed: number;
  totalRecords: number;
  startTime?: Date;
  endTime?: Date;
}

const MVNEDailyRechargePanel: React.FC = () => {
  const { toast } = useToast();
  const [extractionJobs, setExtractionJobs] = useState<RechargeExtractionJob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const rechargeOverview = {
    source: 'Divine: Jailly, recharge.ret harge.cov',
    type: 'Daily Recharge Records',
    totalRecharges: 2560,
    uniqueSubscribers: 534,
    totalRechargeAmount: 51302.0,
    mostCommonRateplan: 'Divine Prepaid Package',
    mostCommonDescription: 'DoubleYourAirtime'
  };

  const structuredFields = [
    { field: 'Vtv Name', description: 'Airtual Network Name' },
    { field: 'MSISON', description: 'Mobile Tootual Informational Inceptive Clerating Number)' },
    { field: 'ICCID', description: 'Intromtdd Opnns Card taol.thre (OM.ond IF)' },
    { field: 'Recharge: Date', description: 'Date of the recharge' }
  ];

  const usageFields = [
    { field: 'RIX mane', description: 'Retcrasciated with the recharge' },
    { field: 'Amount', description: 'Bxtchnge predunt' },
    { field: 'Description', description: 'Description of the recharge type Avg. Pingy, Gold-&Hacayntrne' }
  ];

  const startRechargeExtraction = (type: 'clean' | 'unclean') => {
    const newJob: RechargeExtractionJob = {
      id: `recharge_job_${Date.now()}`,
      type,
      status: 'running',
      progress: 0,
      recordsProcessed: 0,
      totalRecords: rechargeOverview.totalRecharges,
      startTime: new Date()
    };

    setExtractionJobs(prev => [newJob, ...prev.slice(0, 4)]);
    setIsProcessing(true);

    // Simulate extraction process
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setIsProcessing(false);
        
        setExtractionJobs(prev => 
          prev.map(job => 
            job.id === newJob.id 
              ? { 
                  ...job, 
                  status: 'completed', 
                  progress: 100, 
                  recordsProcessed: job.totalRecords,
                  endTime: new Date() 
                }
              : job
          )
        );

        toast({
          title: `${type === 'clean' ? 'Clean' : 'Unclean'} Recharge Data Extraction Complete! 📊`,
          description: `Successfully processed ${rechargeOverview.totalRecharges.toLocaleString()} recharge records`,
        });
      } else {
        setExtractionJobs(prev => 
          prev.map(job => 
            job.id === newJob.id 
              ? { 
                  ...job, 
                  progress: Math.round(progress), 
                  recordsProcessed: Math.round((progress / 100) * job.totalRecords) 
                }
              : job
          )
        );
      }
    }, 600);

    toast({
      title: `${type === 'clean' ? 'Clean' : 'Unclean'} Recharge Data Extraction Started`,
      description: `Processing ${rechargeOverview.totalRecharges.toLocaleString()} daily recharge records...`,
    });
  };

  const getStatusIcon = (status: RechargeExtractionJob['status']) => {
    switch (status) {
      case 'running': return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: RechargeExtractionJob['status']) => {
    switch (status) {
      case 'running': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* MVNE Platform Daily Recharge Overview */}
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            MVNE Platform Daily Recharge Overview
          </CardTitle>
          <div className="space-y-2 text-gray-600">
            <div><span className="font-semibold">Source:</span> {rechargeOverview.source}</div>
            <div><span className="font-semibold">Type:</span> {rechargeOverview.type}</div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  <h3 className="text-lg font-semibold">Total Recharges</h3>
                </div>
                <div className="text-3xl font-bold">{rechargeOverview.totalRecharges.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 mr-2" />
                  <h3 className="text-lg font-semibold">Unique Subscribers</h3>
                </div>
                <div className="text-3xl font-bold">{rechargeOverview.uniqueSubscribers}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="w-6 h-6 mr-2" />
                  <h3 className="text-lg font-semibold">Total Recharge Amount</h3>
                </div>
                <div className="text-3xl font-bold">R{rechargeOverview.totalRechargeAmount.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Package className="w-6 h-6 mr-2" />
                  <h3 className="text-lg font-semibold">Most Common Rateplan</h3>
                </div>
                <div className="text-lg font-semibold">{rechargeOverview.mostCommonRateplan}</div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Most Common Description</h3>
                <div className="text-xl font-bold text-gray-800">{rechargeOverview.mostCommonDescription}</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">DoubleYourAirtime</h3>
                <div className="text-xl font-bold text-gray-800">Active Promotion</div>
              </CardContent>
            </Card>
          </div>

          {/* Structured and Usage Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Structured Fields */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Structured Fields</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {structuredFields.map((field, index) => (
                  <div key={index} className="border-b pb-2">
                    <div className="font-semibold text-sm">{field.field}</div>
                    <div className="text-xs text-gray-600">{field.description}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Usage Fields */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Usage Fields</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {usageFields.map((field, index) => (
                  <div key={index} className="border-b pb-2">
                    <div className="font-semibold text-sm">{field.field}</div>
                    <div className="text-xs text-gray-600">{field.description}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <p className="text-gray-700 text-center">
                This dataset provides a daily creation of recharge activity within the BPiPA clothing, sticzing coigles 
                into sliccoltes benwees popular end points, and comprehensive tracking of Divine Mobile customer recharge patterns.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Data Extraction Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DatabaseZap className="w-5 h-5" />
            Automated Recharge Data Extraction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Clean Data Extraction */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-700 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Clean Recharge Data Extraction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Extract verified, validated daily recharge records with complete transaction details and subscriber information.
                </p>
                <Button 
                  onClick={() => startRechargeExtraction('clean')}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Clean Extraction
                </Button>
              </CardContent>
            </Card>

            {/* Unclean Data Extraction */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-lg text-amber-700 flex items-center gap-2">
                  <ScanText className="w-5 h-5" />
                  Unclean Recharge Data Extraction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Extract and process incomplete, corrupted, or unvalidated recharge records for cleanup and validation.
                </p>
                <Button 
                  onClick={() => startRechargeExtraction('unclean')}
                  disabled={isProcessing}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  <Scan className="w-4 h-4 mr-2" />
                  Start Unclean Extraction
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Extraction Jobs Status */}
          {extractionJobs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileSearch className="w-5 h-5" />
                  Recharge Data Extraction Jobs Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {extractionJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(job.status)}
                          <span className="font-medium">
                            {job.type === 'clean' ? 'Clean' : 'Unclean'} Recharge Data Extraction
                          </span>
                          <Badge 
                            className={`${getStatusColor(job.status)} text-white`}
                          >
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {job.recordsProcessed.toLocaleString()} / {job.totalRecords.toLocaleString()}
                        </span>
                      </div>
                      
                      <Progress value={job.progress} className="h-2" />
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{job.progress}% complete</span>
                        {job.endTime && (
                          <span>
                            Completed in {Math.round((job.endTime.getTime() - job.startTime!.getTime()) / 1000)}s
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MVNEDailyRechargePanel;