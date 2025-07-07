import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import intelligentVersioning, { VersionChange } from '@/utils/intelligentVersioning';
import { MVNEFeature } from '@/utils/documentationAutoUpdater';
import EnhancedVersionManager from './EnhancedVersionManager';
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
  Shield,
  ExternalLink
} from 'lucide-react';

const VersionManager = () => {
  const [newFeatureName, setNewFeatureName] = useState('');
  const [newFeatureDescription, setNewFeatureDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'core' | 'compliance' | 'integration' | 'security' | 'analytics' | 'operations'>('operations');
  const [isCreatingVersion, setIsCreatingVersion] = useState(false);
  const { toast } = useToast();

  const currentVersion = intelligentVersioning.getCurrentVersion();
  const versionHistory = intelligentVersioning.getVersionHistory();
  const stats = intelligentVersioning.getVersionStatistics();

  const handleCreateFeature = async () => {
    if (!newFeatureName.trim() || !newFeatureDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both feature name and description.",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingVersion(true);
    try {
      const newFeature: MVNEFeature = {
        id: `feature-${Date.now()}`,
        name: newFeatureName,
        description: newFeatureDescription,
        category: selectedCategory,
        status: 'complete',
        addedDate: new Date().toISOString().split('T')[0],
        version: '3.0.0' // Will be updated by version system
      };

      const versionChange = intelligentVersioning.autoIncrementVersion([newFeature]);
      
      if (versionChange) {
        toast({
          title: `Version Updated to ${versionChange.version}`,
          description: `${versionChange.changeType.toUpperCase()} release with new feature: ${newFeatureName}`,
        });
      }

      // Reset form
      setNewFeatureName('');
      setNewFeatureDescription('');
      setSelectedCategory('operations');
      
      // Force re-render by updating state
      window.location.reload();
      
    } catch (error) {
      console.error('Error creating feature:', error);
      toast({
        title: "Error Creating Feature",
        description: "Failed to create feature and update version.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingVersion(false);
    }
  };

  const getImpactIcon = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getChangeTypeColor = (changeType: 'major' | 'minor' | 'patch') => {
    switch (changeType) {
      case 'major': return 'bg-red-100 text-red-800';
      case 'minor': return 'bg-blue-100 text-blue-800';
      case 'patch': return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Version Selection */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
            <GitBranch className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Version Management System</h2>
            <p className="text-muted-foreground">Choose your version management interface</p>
          </div>
        </div>
        <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">
          <Tag className="w-4 h-4 mr-1" />
          v{currentVersion}
        </Badge>
      </div>

      {/* Version Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-blue-600" />
              Standard Version Manager
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Basic version management with feature tracking and automated changelog generation.
              Perfect for development workflow management.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Feature tracking</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Automated versioning</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Changelog generation</span>
            </div>
            <Badge className="bg-green-100 text-green-800">Version 3.0.0 Compatible</Badge>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 relative">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600" />
              Enhanced Version Manager (v4.0.0)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Advanced secure version management with admin authentication, PDF documentation, 
              and comprehensive codebase snapshots.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Secure admin access</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>PDF documentation</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Complete codebase snapshots</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Version restoration</span>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-red-100 text-red-800">Version 4.0.0</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">Admin Required</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Version Manager Link */}
      <Alert className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-white">
        <Shield className="h-4 w-4 text-red-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-red-800 mb-1">Access Version 4.0.0 Enhanced Manager</h4>
              <p className="text-sm text-red-600">
                Secure version management with admin authentication (Password: Malawi@1976)
              </p>
            </div>
            <Button 
              onClick={() => window.open('/enhanced-version-manager', '_blank')}
              className="bg-red-600 hover:bg-red-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Enhanced Manager
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      {/* Standard Version Manager Interface */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Standard Version Manager (v3.0.0)</h3>

        {/* Version Statistics */}
      <Alert className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white">
        <TrendingUp className="h-4 w-4 text-purple-600" />
        <AlertDescription>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-800">{stats.totalReleases}</div>
              <div className="text-sm text-purple-600">Total Releases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-800">{stats.majorReleases}</div>
              <div className="text-sm text-blue-600">Major Releases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800">{stats.minorReleases}</div>
              <div className="text-sm text-green-600">Minor Releases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-800">{stats.totalFeatures}</div>
              <div className="text-sm text-orange-600">Total Features</div>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add New Feature */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-600" />
              Add New Feature
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Feature Name</label>
              <Input
                placeholder="Enter feature name..."
                value={newFeatureName}
                onChange={(e) => setNewFeatureName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Describe the feature..."
                value={newFeatureDescription}
                onChange={(e) => setNewFeatureDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full p-2 border rounded-md"
              >
                <option value="operations">Operations</option>
                <option value="core">Core Platform</option>
                <option value="security">Security</option>
                <option value="compliance">Compliance</option>
                <option value="analytics">Analytics</option>
                <option value="integration">Integration</option>
              </select>
            </div>
            
            <Alert>
              <GitCommit className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Version will be automatically incremented based on feature category and impact.
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={handleCreateFeature}
              disabled={isCreatingVersion || !newFeatureName.trim() || !newFeatureDescription.trim()}
              className="w-full"
              size="lg"
            >
              {isCreatingVersion ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Feature & Updating Version...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Feature & Update Version
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Version History */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              Version History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-96 overflow-y-auto space-y-3">
              {versionHistory.slice(0, 5).map((version) => (
                <div key={version.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getChangeTypeColor(version.changeType)}>
                        v{version.version}
                      </Badge>
                      {getImpactIcon(version.impact)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {version.releaseDate}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {version.description}
                  </p>
                  
                  {version.features.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      +{version.features.length} feature{version.features.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {versionHistory.length === 0 && (
              <div className="text-center text-muted-foreground py-4">
                No version history available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Changelog Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCommit className="w-5 h-5" />
            Generated Changelog Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
              {intelligentVersioning.generateChangelog().substring(0, 1500)}...
            </pre>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Showing first 1500 characters of auto-generated changelog. Full changelog is available in MVNE-CHANGELOG.md
          </p>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default VersionManager;