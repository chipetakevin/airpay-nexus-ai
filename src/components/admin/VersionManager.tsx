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
  Loader2
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
            <GitBranch className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Intelligent Version Manager</h2>
            <p className="text-muted-foreground">Automated semantic versioning and change tracking</p>
          </div>
        </div>
        <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">
          <Tag className="w-4 h-4 mr-1" />
          v{currentVersion}
        </Badge>
      </div>

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
  );
};

export default VersionManager;