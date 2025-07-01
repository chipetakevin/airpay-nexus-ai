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
  RotateCcw
} from 'lucide-react';

interface ExtractionJob {
  id: string;
  type: 'clean' | 'unclean';
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  recordsProcessed: number;
  totalRecords: number;
  startTime?: Date;
  endTime?: Date;
}

const MVNEDataExtractionPanel: React.FC = () => {
  const { toast } = useToast();
  const [extractionJobs, setExtractionJobs] = useState<ExtractionJob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const dataOverview = {
    source: 'DivineMobile20kSimFile',
    type: 'SIM Card Identifiers',
    totalEntries: 20000,
    imsldExample: '555102773010127',
    iccidExample: '89770000131500163'
  };

  const startExtraction = (type: 'clean' | 'unclean') => {
    const newJob: ExtractionJob = {
      id: `job_${Date.now()}`,
      type,
      status: 'running',
      progress: 0,
      recordsProcessed: 0,
      totalRecords: dataOverview.totalEntries,
      startTime: new Date()
    };

    setExtractionJobs(prev => [newJob, ...prev.slice(0, 4)]);
    setIsProcessing(true);

    // Simulate extraction process
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
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
          title: `${type === 'clean' ? 'Clean' : 'Unclean'} Data Extraction Complete! 🎉`,
          description: `Successfully processed ${dataOverview.totalEntries.toLocaleString()} SIM card identifiers`,
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
    }, 500);

    toast({
      title: `${type === 'clean' ? 'Clean' : 'Unclean'} Data Extraction Started`,
      description: `Processing ${dataOverview.totalEntries.toLocaleString()} records...`,
    });
  };

  const getStatusIcon = (status: ExtractionJob['status']) => {
    switch (status) {
      case 'running': return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: ExtractionJob['status']) => {
    switch (status) {
      case 'running': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* MVNE Platform Data Overview */}
      <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            MVNE Platform Data Overview
          </CardTitle>
          <div className="space-y-2 text-gray-600">
            <div><span className="font-semibold">Source:</span> {dataOverview.source}</div>
            <div><span className="font-semibold">Type:</span> {dataOverview.type}</div>
            <div><span className="font-semibold">Total Entries:</span> {dataOverview.totalEntries.toLocaleString()}</div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* IMSLD Section */}
            <Card className="bg-teal-500 text-white">
              <CardHeader className="text-center py-6">
                <CardTitle className="text-xl font-bold">IMSLD</CardTitle>
              </CardHeader>
              <CardContent className="bg-white text-gray-800 space-y-3">
                <div className="text-center">
                  <h4 className="font-semibold text-teal-600">
                    International Mobile Subscriber Identity (IMSI)
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Uniquely Identifies a Subscriber.
                  </p>
                  <div className="mt-3 p-2 bg-gray-100 rounded font-mono text-sm">
                    e.g. {dataOverview.imsldExample}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ICCID Section */}
            <Card className="bg-teal-500 text-white">
              <CardHeader className="text-center py-6">
                <CardTitle className="text-xl font-bold">ICCID</CardTitle>
              </CardHeader>
              <CardContent className="bg-white text-gray-800 space-y-3">
                <div className="text-center">
                  <h4 className="font-semibold text-teal-600">
                    Integrated Circuit Card Identifier (ICCID)
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Uniquely identifies the SIM/ICC itself.
                  </p>
                  <div className="mt-3 p-2 bg-gray-100 rounded font-mono text-sm">
                    e.g. {dataOverview.iccidExample}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <p className="text-gray-700 text-center">
                This dataset represents a collection of SIM card identifiers (IMSI and ICCID), crucial for managing mobile subscribers within an MVNE platform. It enables provisioning, activation, and tracking of SIMs.
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
            Automated Data Extraction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Clean Data Extraction */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-700 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Clean Data Extraction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Extract verified, validated SIM card identifiers with complete IMSI and ICCID pairs.
                </p>
                <Button 
                  onClick={() => startExtraction('clean')}
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
                  Unclean Data Extraction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Extract and process incomplete, corrupted, or unvalidated SIM identifiers for cleanup.
                </p>
                <Button 
                  onClick={() => startExtraction('unclean')}
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
                  Extraction Jobs Status
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
                            {job.type === 'clean' ? 'Clean' : 'Unclean'} Data Extraction
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

export default MVNEDataExtractionPanel;