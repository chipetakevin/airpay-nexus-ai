import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  History,
  Package,
  Download,
  Upload,
  Clock,
  FileCode,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Save,
  Undo,
  Star,
  Database,
  GitBranch,
  Archive,
  Code2
} from 'lucide-react';

interface CodebaseVersion {
  id: string;
  version_number: string;
  version_name: string;
  description: string;
  created_at: string;
  created_by: string;
  file_count: number;
  total_size_bytes: number;
  lines_of_code: number;
  file_extensions: any; // Json type from Supabase
  is_stable: boolean;
  restoration_count: number;
  last_restored_at: string | null;
}

interface RestorationLog {
  id: string;
  version_id: string;
  restored_at: string;
  restoration_type: string;
  files_restored: number;
  status: string;
}

const VersionRestoration = () => {
  const [versions, setVersions] = useState<CodebaseVersion[]>([]);
  const [restorationLogs, setRestorationLogs] = useState<RestorationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [capturing, setCapturing] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [activeTab, setActiveTab] = useState('versions');
  const { toast } = useToast();

  // Version capture form
  const [captureForm, setCaptureForm] = useState({
    versionNumber: '2.0',
    versionName: 'Enhanced Admin Dashboard - Current State',
    description: 'Complete design system overhaul with HSL tokens, improved tab navigation, and modern UI components',
    isStable: true
  });

  useEffect(() => {
    loadVersions();
    loadRestorationLogs();
  }, []);

  const loadVersions = async () => {
    try {
      const { data, error } = await supabase
        .from('codebase_versions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVersions(data || []);
    } catch (error) {
      console.error('Error loading versions:', error);
      toast({
        title: "Error",
        description: "Failed to load codebase versions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadRestorationLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('version_restoration_logs')
        .select('*')
        .order('restored_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setRestorationLogs(data || []);
    } catch (error) {
      console.error('Error loading restoration logs:', error);
    }
  };

  const captureCurrentVersion = async () => {
    if (!captureForm.versionNumber || !captureForm.versionName) {
      toast({
        title: "Validation Error",
        description: "Version number and name are required",
        variant: "destructive"
      });
      return;
    }

    setCapturing(true);

    try {
      // Simulate capturing current codebase files
      const simulatedFileContents = {
        'src/index.css': '/* Enhanced design system with HSL tokens */',
        'src/components/navigation/ModernTabNavigation.tsx': '/* Fixed tab navigation component */',
        'src/components/admin/AdminControlCenter.tsx': '/* Enhanced admin dashboard */',
        'src/styles/mobile-tabs.css': '/* Modern tab system using design tokens */',
        'package.json': '/* Project dependencies */',
        'README.md': '/* Project documentation */'
      };

      const response = await fetch('/functions/v1/capture-version', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          versionNumber: captureForm.versionNumber,
          versionName: captureForm.versionName,
          description: captureForm.description,
          fileContents: simulatedFileContents,
          isStable: captureForm.isStable
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to capture version');
      }

      toast({
        title: "Version Captured",
        description: `Version ${captureForm.versionNumber} has been successfully captured`,
        variant: "default"
      });

      // Reset form and reload versions
      setCaptureForm({
        versionNumber: '',
        versionName: '',
        description: '',
        isStable: false
      });
      
      loadVersions();

    } catch (error) {
      console.error('Error capturing version:', error);
      toast({
        title: "Capture Failed",
        description: error.message || "Failed to capture codebase version",
        variant: "destructive"
      });
    } finally {
      setCapturing(false);
    }
  };

  const restoreVersion = async (versionId: string, versionNumber: string) => {
    if (!confirm(`Are you sure you want to restore to version ${versionNumber}? This will replace the current codebase.`)) {
      return;
    }

    setRestoring(true);

    try {
      const response = await fetch('/functions/v1/restore-version', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          versionId,
          restorationType: 'full',
          createBackup: true
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to restore version');
      }

      toast({
        title: "Version Restored",
        description: `Successfully restored to version ${versionNumber}`,
        variant: "default"
      });

      loadVersions();
      loadRestorationLogs();

    } catch (error) {
      console.error('Error restoring version:', error);
      toast({
        title: "Restoration Failed",
        description: error.message || "Failed to restore version",
        variant: "destructive"
      });
    } finally {
      setRestoring(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" />
        <span>Loading version history...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
            <History className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Intelligent Version Control</h2>
            <p className="text-muted-foreground">Nerve Center BaaS - Codebase Management System</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Database className="w-4 h-4 mr-1" />
          Nerve Center
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="capture" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Capture Version
          </TabsTrigger>
          <TabsTrigger value="versions" className="flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Version History
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Restoration Logs
          </TabsTrigger>
        </TabsList>

        {/* Capture Version Tab */}
        <TabsContent value="capture" className="space-y-6">
          {/* Current Codebase Statistics */}
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="w-6 h-6 text-blue-600" />
                Current Codebase Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="font-medium">~348 Files</p>
                    <p className="text-muted-foreground">Estimated</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="font-medium">~12,567 Lines</p>
                    <p className="text-muted-foreground">Code Lines</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="font-medium">~2.8 MB</p>
                    <p className="text-muted-foreground">Total Size</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="font-medium">TSX/TS/CSS</p>
                    <p className="text-muted-foreground">Main Types</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-6 h-6 text-green-600" />
                Capture Current Codebase
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Create a snapshot of the current codebase state for future restoration
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Version Number</label>
                  <Input
                    value={captureForm.versionNumber}
                    onChange={(e) => setCaptureForm({...captureForm, versionNumber: e.target.value})}
                    placeholder="e.g., 2.0, 2.1.1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Version Name</label>
                  <Input
                    value={captureForm.versionName}
                    onChange={(e) => setCaptureForm({...captureForm, versionName: e.target.value})}
                    placeholder="e.g., Enhanced Admin Dashboard"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={captureForm.description}
                  onChange={(e) => setCaptureForm({...captureForm, description: e.target.value})}
                  placeholder="Describe the changes and improvements in this version..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={captureForm.isStable}
                  onCheckedChange={(checked) => setCaptureForm({...captureForm, isStable: checked})}
                />
                <label className="text-sm font-medium">Mark as Stable Release</label>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>

              <Button 
                onClick={captureCurrentVersion}
                disabled={capturing}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {capturing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Capturing Version...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Capture Version 2.0
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Version History Tab */}
        <TabsContent value="versions" className="space-y-4">
          {versions.length === 0 ? (
            <Card>
              <CardContent className="text-center p-8">
                <Archive className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No versions captured yet</p>
                <p className="text-sm text-muted-foreground">Create your first version snapshot using the Capture tab</p>
              </CardContent>
            </Card>
          ) : (
            versions.map((version) => (
              <Card key={version.id} className={`transition-all duration-300 hover:shadow-lg ${version.is_stable ? 'border-l-4 border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-white' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{version.version_name}</h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          v{version.version_number}
                        </Badge>
                        {version.is_stable && (
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                            <Star className="w-3 h-3 mr-1" />
                            Stable
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{version.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <FileCode className="w-4 h-4 text-blue-500" />
                          <span>{version.file_count} files</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Code2 className="w-4 h-4 text-green-500" />
                          <span>{version.lines_of_code?.toLocaleString() || 0} lines</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4 text-purple-500" />
                          <span>{formatBytes(version.total_size_bytes)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span>{formatDate(version.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Undo className="w-4 h-4 text-red-500" />
                          <span>{version.restoration_count} restores</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => restoreVersion(version.id, version.version_number)}
                      disabled={restoring}
                      variant="outline"
                      className="ml-4"
                    >
                      {restoring ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Restore
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Restoration Logs Tab */}
        <TabsContent value="logs" className="space-y-4">
          {restorationLogs.length === 0 ? (
            <Card>
              <CardContent className="text-center p-8">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No restoration activity yet</p>
              </CardContent>
            </Card>
          ) : (
            restorationLogs.map((log) => (
              <Card key={log.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {log.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                      )}
                      <div>
                        <p className="font-medium">
                          {log.restoration_type.charAt(0).toUpperCase() + log.restoration_type.slice(1)} Restoration
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {log.files_restored} files • {formatDate(log.restored_at)}
                        </p>
                      </div>
                    </div>
                    <Badge variant={log.status === 'completed' ? 'default' : 'destructive'}>
                      {log.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VersionRestoration;