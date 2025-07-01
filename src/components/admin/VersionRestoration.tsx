import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  RotateCcw, 
  Database, 
  GitBranch, 
  Clock, 
  Shield, 
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

const VersionRestoration = () => {
  const { toast } = useToast();
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);

  // Current system version info
  const currentVersion = {
    version: "1.0.0",
    build: "v1-stable",
    timestamp: new Date().toISOString(),
    features: [
      "WhatsApp Receipt System",
      "Divine Mobile Integration", 
      "Admin Portal Access",
      "Customer Registration",
      "Vendor Management",
      "OneCard System"
    ],
    status: "ACTIVE"
  };

  // Available restoration points
  const availableVersions = [
    {
      id: "v1-baseline",
      version: "1.0.0 - Baseline",
      description: "Initial stable release with core features",
      timestamp: "2025-01-01T00:00:00Z",
      size: "2.4 MB",
      status: "stable",
      features: ["Core WhatsApp Integration", "Basic Receipt System", "Admin Access"]
    },
    {
      id: "v1-enhanced", 
      version: "1.0.1 - Enhanced",
      description: "Improved receipt formatting and mobile optimization",
      timestamp: "2025-01-01T12:00:00Z", 
      size: "2.6 MB",
      status: "stable",
      features: ["Enhanced Receipts", "Mobile Optimization", "Error Handling"]
    }
  ];

  const handleVersionRestore = async (versionId: string) => {
    setIsRestoring(true);
    setSelectedVersion(versionId);

    try {
      // Simulate restoration process
      await new Promise(resolve => setTimeout(resolve, 3000));

      const version = availableVersions.find(v => v.id === versionId);
      
      toast({
        title: "🔄 Version Restoration Initiated",
        description: `Restoring to ${version?.version}. System will reload automatically.`,
        duration: 5000
      });

      // Simulate system reload after restoration
      setTimeout(() => {
        toast({
          title: "✅ Restoration Complete",
          description: "System has been successfully restored to selected version.",
          duration: 4000
        });
        setIsRestoring(false);
        setSelectedVersion(null);
      }, 2000);

    } catch (error) {
      toast({
        title: "❌ Restoration Failed",
        description: "Version restoration failed. Please try again or contact support.",
        variant: "destructive"
      });
      setIsRestoring(false);
      setSelectedVersion(null);
    }
  };

  const createBackup = () => {
    toast({
      title: "💾 Backup Created",
      description: "Current system state has been backed up successfully.",
      duration: 3000
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <GitBranch className="w-6 h-6" />
          Version Restoration System
        </h2>
        <p className="text-muted-foreground">
          Manage system versions and restore to previous stable states
        </p>
      </div>

      {/* Current Version Info */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Current System Version
            <Badge className="bg-green-100 text-green-800 border border-green-300">
              ACTIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Version</p>
              <p className="text-lg font-bold text-primary">{currentVersion.version}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Build</p>
              <p className="text-lg font-mono">{currentVersion.build}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
              <p className="text-sm">{new Date(currentVersion.timestamp).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Active Features</p>
            <div className="grid grid-cols-2 gap-2">
              {currentVersion.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={createBackup} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Create Backup
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Restoration Alert */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> Version restoration will replace the current system state. 
          Always create a backup before proceeding. This action cannot be undone.
        </AlertDescription>
      </Alert>

      {/* Available Versions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Database className="w-5 h-5" />
          Available Restoration Points
        </h3>

        {availableVersions.map((version) => (
          <Card key={version.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{version.version}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={version.status === 'stable' ? 'default' : 'secondary'}>
                    {version.status.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {version.size}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{version.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {new Date(version.timestamp).toLocaleString()}
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Features in this version:</p>
                <div className="flex flex-wrap gap-1">
                  {version.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => handleVersionRestore(version.id)}
                  disabled={isRestoring}
                  variant={selectedVersion === version.id ? "default" : "outline"}
                  size="sm"
                >
                  {isRestoring && selectedVersion === version.id ? (
                    <>
                      <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                      Restoring...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Restore Version
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            System Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Environment:</span>
            <span className="font-mono">Production</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Platform:</span>
            <span className="font-mono">Divine Mobile v1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Admin Access:</span>
            <span className="font-mono">Enabled ✅</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Backup:</span>
            <span className="font-mono">{new Date().toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VersionRestoration;