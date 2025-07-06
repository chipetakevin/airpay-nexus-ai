/**
 * Intelligent Version Management System for MVNE Platform
 * Automatically manages semantic versioning based on feature additions
 */

import { MVNEFeature } from './documentationAutoUpdater';

export interface VersionChange {
  id: string;
  version: string;
  changeType: 'major' | 'minor' | 'patch';
  features: MVNEFeature[];
  releaseDate: string;
  description: string;
  breaking: boolean;
  impact: 'high' | 'medium' | 'low';
}

export interface SemanticVersion {
  major: number;
  minor: number;
  patch: number;
}

// Current version state
let currentVersion: SemanticVersion = { major: 3, minor: 0, patch: 0 };
let versionHistory: VersionChange[] = [];

/**
 * Parse version string to semantic version object
 */
export const parseVersion = (versionString: string): SemanticVersion => {
  const parts = versionString.split('.').map(Number);
  return {
    major: parts[0] || 3,
    minor: parts[1] || 0,
    patch: parts[2] || 0
  };
};

/**
 * Convert semantic version to string
 */
export const versionToString = (version: SemanticVersion): string => {
  return `${version.major}.${version.minor}.${version.patch}`;
};

/**
 * Determine version increment type based on feature characteristics
 */
export const determineVersionIncrement = (features: MVNEFeature[]): 'major' | 'minor' | 'patch' => {
  const hasBreakingChanges = features.some(f => 
    f.category === 'core' || 
    f.description.toLowerCase().includes('breaking') ||
    f.description.toLowerCase().includes('major')
  );
  
  const hasNewFeatures = features.some(f => 
    f.category === 'operations' || 
    f.category === 'integration' ||
    f.category === 'analytics' ||
    f.status === 'complete'
  );
  
  const hasBugFixes = features.some(f => 
    f.description.toLowerCase().includes('fix') ||
    f.description.toLowerCase().includes('bug') ||
    f.description.toLowerCase().includes('patch')
  );

  // Determine increment type
  if (hasBreakingChanges) return 'major';
  if (hasNewFeatures) return 'minor';
  if (hasBugFixes) return 'patch';
  
  return 'patch'; // Default to patch
};

/**
 * Increment version based on change type
 */
export const incrementVersion = (version: SemanticVersion, incrementType: 'major' | 'minor' | 'patch'): SemanticVersion => {
  const newVersion = { ...version };
  
  switch (incrementType) {
    case 'major':
      newVersion.major += 1;
      newVersion.minor = 0;
      newVersion.patch = 0;
      break;
    case 'minor':
      newVersion.minor += 1;
      newVersion.patch = 0;
      break;
    case 'patch':
      newVersion.patch += 1;
      break;
  }
  
  return newVersion;
};

/**
 * Calculate impact level based on features
 */
export const calculateImpact = (features: MVNEFeature[], changeType: 'major' | 'minor' | 'patch'): 'high' | 'medium' | 'low' => {
  if (changeType === 'major') return 'high';
  if (changeType === 'minor' && features.length > 3) return 'high';
  if (changeType === 'minor') return 'medium';
  return 'low';
};

/**
 * Generate version change description
 */
export const generateVersionDescription = (features: MVNEFeature[], changeType: 'major' | 'minor' | 'patch'): string => {
  const featureCategories = [...new Set(features.map(f => f.category))];
  const featureCount = features.length;
  
  const categoryDescriptions = {
    'core': 'Core Platform Updates',
    'security': 'Security Enhancements',
    'compliance': 'Compliance Features',
    'operations': 'Operational Improvements',
    'analytics': 'Analytics & Reporting',
    'integration': 'Integration Capabilities'
  };
  
  let description = '';
  
  if (changeType === 'major') {
    description = `Major platform release with ${featureCount} significant updates`;
  } else if (changeType === 'minor') {
    description = `Feature release adding ${featureCount} new capabilities`;
  } else {
    description = `Maintenance release with ${featureCount} improvements`;
  }
  
  if (featureCategories.length > 0) {
    const categoryNames = featureCategories
      .map(cat => categoryDescriptions[cat as keyof typeof categoryDescriptions] || cat)
      .join(', ');
    description += ` in ${categoryNames}`;
  }
  
  return description;
};

/**
 * Create new version change record
 */
export const createVersionChange = (newFeatures: MVNEFeature[]): VersionChange => {
  const changeType = determineVersionIncrement(newFeatures);
  const newVersion = incrementVersion(currentVersion, changeType);
  const impact = calculateImpact(newFeatures, changeType);
  const description = generateVersionDescription(newFeatures, changeType);
  
  const versionChange: VersionChange = {
    id: `v${versionToString(newVersion)}-${Date.now()}`,
    version: versionToString(newVersion),
    changeType,
    features: newFeatures,
    releaseDate: new Date().toISOString().split('T')[0],
    description,
    breaking: changeType === 'major',
    impact
  };
  
  // Update current version
  currentVersion = newVersion;
  versionHistory.push(versionChange);
  
  console.log(`🚀 Version updated to ${versionChange.version} (${changeType})`);
  return versionChange;
};

/**
 * Get current version string
 */
export const getCurrentVersion = (): string => {
  return versionToString(currentVersion);
};

/**
 * Get version history
 */
export const getVersionHistory = (): VersionChange[] => {
  return [...versionHistory].sort((a, b) => 
    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );
};

/**
 * Generate changelog markdown
 */
export const generateChangelog = (): string => {
  let changelog = '# MVNE Platform Changelog\n\n';
  changelog += '*Automatically generated version history and feature tracking*\n\n';
  changelog += '---\n\n';
  
  const sortedHistory = getVersionHistory();
  
  sortedHistory.forEach(change => {
    changelog += `## Version ${change.version} - ${change.releaseDate}\n\n`;
    
    // Version metadata
    changelog += `**Release Type:** ${change.changeType.toUpperCase()} ${change.breaking ? '(BREAKING CHANGES)' : ''}\n`;
    changelog += `**Impact Level:** ${change.impact.toUpperCase()}\n`;
    changelog += `**Description:** ${change.description}\n\n`;
    
    // Features added
    if (change.features.length > 0) {
      changelog += '### 🎯 Features Added\n\n';
      
      // Group features by category
      const groupedFeatures = change.features.reduce((groups, feature) => {
        const category = feature.category;
        if (!groups[category]) groups[category] = [];
        groups[category].push(feature);
        return groups;
      }, {} as Record<string, MVNEFeature[]>);
      
      Object.entries(groupedFeatures).forEach(([category, features]) => {
        const categoryIcons = {
          'core': '🏗️',
          'security': '🛡️',
          'compliance': '⚖️',
          'operations': '⚙️',
          'analytics': '📊',
          'integration': '🔄'
        };
        
        changelog += `#### ${categoryIcons[category as keyof typeof categoryIcons] || '✨'} ${category.toUpperCase()}\n\n`;
        
        features.forEach(feature => {
          changelog += `- **${feature.name}**: ${feature.description}\n`;
        });
        changelog += '\n';
      });
    }
    
    changelog += '---\n\n';
  });
  
  // Footer
  changelog += '## Version History Summary\n\n';
  changelog += `- **Total Versions:** ${sortedHistory.length}\n`;
  changelog += `- **Current Version:** ${getCurrentVersion()}\n`;
  changelog += `- **Last Updated:** ${new Date().toLocaleDateString()}\n`;
  changelog += `- **Platform Status:** Production Ready ✅\n\n`;
  
  changelog += '*This changelog is automatically updated when new features are added to the MVNE platform.*';
  
  return changelog;
};

/**
 * Check if version should be incremented based on new features
 */
export const shouldIncrementVersion = (newFeatures: MVNEFeature[]): boolean => {
  return newFeatures.length > 0;
};

/**
 * Auto-increment version when new features are detected
 */
export const autoIncrementVersion = (newFeatures: MVNEFeature[]): VersionChange | null => {
  if (!shouldIncrementVersion(newFeatures)) {
    return null;
  }
  
  return createVersionChange(newFeatures);
};

/**
 * Get version statistics
 */
export const getVersionStatistics = () => {
  const history = getVersionHistory();
  const majorReleases = history.filter(v => v.changeType === 'major').length;
  const minorReleases = history.filter(v => v.changeType === 'minor').length;
  const patchReleases = history.filter(v => v.changeType === 'patch').length;
  const totalFeatures = history.reduce((sum, v) => sum + v.features.length, 0);
  
  return {
    currentVersion: getCurrentVersion(),
    totalReleases: history.length,
    majorReleases,
    minorReleases,
    patchReleases,
    totalFeatures,
    lastReleaseDate: history[0]?.releaseDate || new Date().toISOString().split('T')[0]
  };
};

// Initialize with base version
versionHistory.push({
  id: 'v3.0.0-base',
  version: '3.0.0',
  changeType: 'major',
  features: [],
  releaseDate: '2025-07-06',
  description: 'Initial MVNE Platform v3.0 - Complete enterprise-grade solution',
  breaking: true,
  impact: 'high'
});

export default {
  getCurrentVersion,
  createVersionChange,
  autoIncrementVersion,
  generateChangelog,
  getVersionHistory,
  getVersionStatistics,
  shouldIncrementVersion
};