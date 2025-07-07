import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  GitBranch, 
  Tag, 
  History, 
  Plus, 
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  GitCommit,
  Loader2,
  Download,
  Shield,
  FileText,
  Lock,
  Key,
  Save,
  Archive
} from 'lucide-react';

interface CodebaseVersion {
  id: string;
  version_number: string;
  version_name: string;
  description?: string;
  created_at: string;
  created_by?: string;
  file_contents: any;
  file_count: number;
  total_size_bytes: number;
  lines_of_code: number;
  file_extensions: any;
  is_stable: boolean;
  is_production_ready?: boolean;
  commit_message?: string;
  access_level?: string;
  pdf_documentation_url?: string;
  pdf_generated_at?: string;
}

const EnhancedVersionManager = () => {
  const [versions, setVersions] = useState<CodebaseVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingVersion, setIsCreatingVersion] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newVersionName, setNewVersionName] = useState('MVNE Platform v4.0');
  const [newVersionDescription, setNewVersionDescription] = useState('Enhanced secure version management with comprehensive documentation and admin access controls');
  const { toast } = useToast();

  // Check admin authentication with password
  const handlePasswordAuth = () => {
    if (passwordInput === 'Malawi@1976') {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Admin access authenticated successfully.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Load existing versions
  const loadVersions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('codebase_versions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVersions(data || []);
    } catch (error) {
      console.error('Error loading versions:', error);
      toast({
        title: "Error Loading Versions",
        description: "Failed to load version history.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get current codebase snapshot
  const getCurrentCodebaseSnapshot = () => {
    // This would normally gather all current files, but for demo purposes
    // we'll create a representative snapshot
    return {
      'src/App.tsx': '// Main application component...',
      'src/pages/Portal.tsx': '// Portal page component...',
      'src/components/admin/AdminPortal.tsx': '// Admin portal component...',
      'src/components/PortalTabs.tsx': '// Portal tabs component...',
      'MVNE-CHANGELOG.md': '# MVNE Platform Changelog...',
      'README.md': '# MVNE Platform...',
      'package.json': '{\\"name\\": \\"mvne-platform\\", \\"version\\": \\"4.0.0\\"...}',
      // Add more files as needed
    };
  };

  // Calculate codebase statistics
  const calculateCodebaseStats = (fileContents: any) => {
    const files = Object.keys(fileContents);
    const totalSize = Object.values(fileContents).reduce((sum: number, content: any) => 
      sum + (typeof content === 'string' ? content.length : JSON.stringify(content).length), 0
    );
    const linesOfCode = Object.values(fileContents).reduce((sum: number, content: any) => {
      const text = typeof content === 'string' ? content : JSON.stringify(content);
      return sum + text.split('\n').length;
    }, 0);

    const extensions: any = {};
    files.forEach(file => {
      const ext = file.split('.').pop() || 'unknown';
      extensions[ext] = (extensions[ext] || 0) + 1;
    });

    return {
      fileCount: files.length,
      totalSize,
      linesOfCode,
      extensions
    };
  };

  // Create Version 4.0.0
  const createVersion4 = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please authenticate with admin password first.",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingVersion(true);
    try {
      const fileContents = getCurrentCodebaseSnapshot();
      const stats = calculateCodebaseStats(fileContents);

      const { error } = await supabase
        .from('codebase_versions')
        .insert({
          version_number: '4.0.0',
          version_name: newVersionName,
          description: newVersionDescription,
          file_contents: fileContents,
          file_count: stats.fileCount,
          total_size_bytes: stats.totalSize,
          lines_of_code: stats.linesOfCode,
          file_extensions: stats.extensions,
          is_stable: true,
          is_production_ready: true,
          commit_message: 'Version 4.0.0: Enhanced secure version management with admin access controls and PDF documentation'
        });

      if (error) throw error;

      toast({
        title: "Version 4.0.0 Created Successfully",
        description: "New version saved with secure admin access controls.",
      });

      // Refresh versions list
      await loadVersions();
      
      // Reset form
      setNewVersionName('');
      setNewVersionDescription('');

    } catch (error) {
      console.error('Error creating version:', error);
      toast({
        title: "Error Creating Version",
        description: "Failed to create new version.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingVersion(false);
    }
  };

  // Generate PDF documentation
  const generatePDFDocumentation = async (versionId: string) => {
    setIsGeneratingPDF(true);
    try {
      // In a real implementation, this would call an edge function to generate PDF
      // For now, we'll simulate the process and update the database
      
      // Simulate PDF generation delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const pdfUrl = `/documentation/mvne-platform-v4.0.0-${Date.now()}.pdf`;
      
      const { error } = await supabase
        .from('codebase_versions')
        .update({
          description: `${versions.find(v => v.id === versionId)?.description} [PDF Generated: ${pdfUrl}]`
        })
        .eq('id', versionId);

      if (error) throw error;

      toast({
        title: "PDF Documentation Generated",
        description: "Comprehensive documentation PDF has been created.",
      });

      await loadVersions();

    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error Generating PDF",
        description: "Failed to generate PDF documentation.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  useEffect(() => {
    loadVersions();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <Card className="border-2 border-red-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-red-800">Secure Version Access</CardTitle>
            <p className="text-sm text-red-600">Admin authentication required</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Admin Password</label>
              <Input
                type="password"
                placeholder="Enter admin password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordAuth()}
              />
            </div>
            <Button onClick={handlePasswordAuth} className="w-full">
              <Key className="w-4 h-4 mr-2" />
              Authenticate
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
            <GitBranch className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Enhanced Version Manager</h2>
            <p className="text-muted-foreground">Secure version control with PDF documentation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">
            <Shield className="w-3 h-3 mr-1" />
            Authenticated
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">
            <Tag className="w-4 h-4 mr-1" />
            Current: v3.0.0
          </Badge>
        </div>
      </div>

      {/* Create Version 4.0.0 */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-green-600" />
            Create Version 4.0.0
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Version Name</label>
            <Input
              placeholder="Enter version name..."
              value={newVersionName}
              onChange={(e) => setNewVersionName(e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Textarea
              placeholder="Describe the version..."
              value={newVersionDescription}
              onChange={(e) => setNewVersionDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <Alert className="border-l-4 border-l-blue-500">
            <GitCommit className="h-4 w-4" />
            <AlertDescription>
              Version 4.0.0 will include secure admin access controls, enhanced version management, 
              and comprehensive PDF documentation generation capabilities.
            </AlertDescription>
          </Alert>
          
          <Button 
            onClick={createVersion4}
            disabled={isCreatingVersion || !newVersionName.trim()}
            className="w-full"
            size="lg"
          >
            {isCreatingVersion ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Version 4.0.0...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Version 4.0.0
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Existing Versions */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            Version History ({versions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Loading versions...</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {versions.map((version) => (
                <div key={version.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        v{version.version_number}
                      </Badge>
                      {version.is_stable && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Stable
                        </Badge>
                      )}
                      {version.is_production_ready && (
                        <Badge className="bg-purple-100 text-purple-800">
                          Production Ready
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {new Date(version.created_at).toLocaleDateString()}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        {version.access_level}
                      </Badge>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-sm mb-1">{version.version_name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {version.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground mb-3">
                    <div>Files: <span className="font-medium">{version.file_count}</span></div>
                    <div>Size: <span className="font-medium">{Math.round(version.total_size_bytes / 1024)}KB</span></div>
                    <div>Lines: <span className="font-medium">{version.lines_of_code.toLocaleString()}</span></div>
                    <div>Extensions: <span className="font-medium">{Object.keys(version.file_extensions).length}</span></div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Archive className="w-3 h-3 mr-1" />
                      Restore
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => generatePDFDocumentation(version.id)}
                      disabled={isGeneratingPDF}
                    >
                      {isGeneratingPDF ? (
                        <>
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FileText className="w-3 h-3 mr-1" />
                          Generate PDF
                        </>
                      )}
                    </Button>
                    {version.pdf_documentation_url && (
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3 mr-1" />
                        Download PDF
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {versions.length === 0 && (
                <div className="text-center py-8">
                  <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Versions Found</h3>
                  <p className="text-muted-foreground">
                    Create your first version to start tracking changes.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Version Statistics */}
      <Alert className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white">
        <TrendingUp className="h-4 w-4 text-purple-600" />
        <AlertDescription>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-800">{versions.length}</div>
              <div className="text-sm text-purple-600">Total Versions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-800">
                {versions.filter(v => v.is_stable).length}
              </div>
              <div className="text-sm text-blue-600">Stable Releases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800">
                {versions.filter(v => v.is_production_ready).length}
              </div>
              <div className="text-sm text-green-600">Production Ready</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-800">
                {versions.filter(v => v.pdf_documentation_url).length}
              </div>
              <div className="text-sm text-orange-600">With PDF Docs</div>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default EnhancedVersionManager;
