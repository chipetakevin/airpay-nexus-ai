import jsPDF from 'jspdf';

interface Version4DocumentationData {
  version: string;
  versionName: string;
  description: string;
  features: Array<{
    category: string;
    name: string;
    description: string;
    status: 'complete' | 'in-progress' | 'planned';
  }>;
  technicalSpecs: {
    architecture: string[];
    security: string[];
    performance: string[];
    compliance: string[];
  };
  changelog: string;
  codeStats: {
    totalFiles: number;
    totalLines: number;
    totalSize: string;
    languages: Record<string, number>;
  };
}

export const generateVersion4PDF = (data: Version4DocumentationData): jsPDF => {
  const doc = new jsPDF({
    format: 'a4',
    unit: 'mm'
  });

  // Divine Mobile brand colors
  const primaryPurple: [number, number, number] = [79, 70, 229];
  const accentBlue: [number, number, number] = [59, 130, 246];
  const darkGray: [number, number, number] = [31, 41, 55];
  const lightGray: [number, number, number] = [243, 244, 246];
  const successGreen: [number, number, number] = [34, 197, 94];

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = 20;

  // Header with Divine Mobile branding
  doc.setFillColor(...primaryPurple);
  doc.rect(0, 0, pageWidth, 80, 'F');

  // Divine Mobile Logo Area
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, 15, 80, 35, 5, 5, 'F');
  
  // Logo representation
  doc.setFillColor(...primaryPurple);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Divine', margin + 8, 30);
  doc.setTextColor(...accentBlue);
  doc.text('Mobile', margin + 8, 40);

  // Version badge
  doc.setFillColor(...accentBlue);
  doc.roundedRect(pageWidth - 60, 15, 45, 20, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(data.version, pageWidth - 52, 27);

  // Main title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('MVNE Platform Documentation', margin, 95);
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text(data.versionName, margin, 105);

  // Date and metadata
  yPos = 120;
  doc.setTextColor(...darkGray);
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-ZA')} ${new Date().toLocaleTimeString('en-ZA')}`, margin, yPos);
  doc.text('Status: Production Ready ✓', pageWidth - 60, yPos);

  // Executive Summary
  yPos = 140;
  doc.setFillColor(...lightGray);
  doc.rect(margin, yPos, pageWidth - (margin * 2), 50, 'F');
  
  doc.setTextColor(...primaryPurple);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', margin + 5, yPos + 10);
  
  doc.setTextColor(...darkGray);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const summaryText = doc.splitTextToSize(data.description, pageWidth - 30);
  doc.text(summaryText, margin + 5, yPos + 20);

  // Add new page for detailed content
  doc.addPage();
  yPos = 20;

  // Architecture Overview
  doc.setFillColor(...accentBlue);
  doc.rect(0, yPos, pageWidth, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('🏗️ Architecture Overview', margin, yPos + 10);

  yPos += 25;
  doc.setTextColor(...darkGray);
  doc.setFontSize(10);
  data.technicalSpecs.architecture.forEach((item, index) => {
    doc.text(`• ${item}`, margin + 5, yPos);
    yPos += 7;
  });

  // Security Features
  yPos += 10;
  doc.setFillColor(...successGreen);
  doc.rect(0, yPos, pageWidth, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('🛡️ Security Features', margin, yPos + 10);

  yPos += 25;
  doc.setTextColor(...darkGray);
  doc.setFontSize(10);
  data.technicalSpecs.security.forEach((item, index) => {
    doc.text(`• ${item}`, margin + 5, yPos);
    yPos += 7;
  });

  // Features by Category
  yPos += 15;
  doc.setFillColor(...primaryPurple);
  doc.rect(0, yPos, pageWidth, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('✨ Feature Categories', margin, yPos + 10);

  yPos += 25;
  const categories = [...new Set(data.features.map(f => f.category))];
  categories.forEach(category => {
    const categoryFeatures = data.features.filter(f => f.category === category);
    
    doc.setTextColor(...accentBlue);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(category.toUpperCase(), margin, yPos);
    yPos += 8;
    
    doc.setTextColor(...darkGray);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    categoryFeatures.forEach(feature => {
      const statusIcon = feature.status === 'complete' ? '✅' : 
                        feature.status === 'in-progress' ? '🔄' : '📋';
      doc.text(`${statusIcon} ${feature.name}`, margin + 5, yPos);
      yPos += 6;
    });
    yPos += 5;
  });

  // Add new page for technical details
  doc.addPage();
  yPos = 20;

  // Code Statistics
  doc.setFillColor(...darkGray);
  doc.rect(0, yPos, pageWidth, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('📊 Codebase Statistics', margin, yPos + 10);

  yPos += 30;
  
  // Statistics grid
  const stats = [
    ['Total Files', data.codeStats.totalFiles.toString()],
    ['Lines of Code', data.codeStats.totalLines.toLocaleString()],
    ['Total Size', data.codeStats.totalSize],
    ['Languages', Object.keys(data.codeStats.languages).length.toString()]
  ];

  stats.forEach((stat, index) => {
    const x = margin + (index % 2) * 90;
    const y = yPos + Math.floor(index / 2) * 25;
    
    doc.setFillColor(...lightGray);
    doc.rect(x, y, 80, 20, 'F');
    
    doc.setTextColor(...primaryPurple);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(stat[1], x + 5, y + 8);
    
    doc.setTextColor(...darkGray);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(stat[0], x + 5, y + 15);
  });

  yPos += 60;

  // Language breakdown
  doc.setTextColor(...accentBlue);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Language Distribution:', margin, yPos);
  yPos += 10;

  Object.entries(data.codeStats.languages).forEach(([lang, count]) => {
    doc.setTextColor(...darkGray);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${lang}: ${count} files`, margin + 5, yPos);
    yPos += 7;
  });

  // Footer with branding
  const footerY = pageHeight - 20;
  doc.setFillColor(...primaryPurple);
  doc.rect(0, footerY, pageWidth, 20, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Divine Mobile MVNE Platform © 2025 - All Rights Reserved', margin, footerY + 8);
  doc.text(`Document Version: ${data.version} | Generated: ${new Date().toISOString().split('T')[0]}`, margin, footerY + 15);

  // Add page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setTextColor(...darkGray);
    doc.setFontSize(8);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 30, pageHeight - 10);
  }

  return doc;
};

// Helper function to generate sample data for Version 4.0
export const generateVersion4Data = (): Version4DocumentationData => {
  return {
    version: '4.0.0',
    versionName: 'Enhanced Secure Version Management',
    description: 'Version 4.0.0 introduces comprehensive secure version management with admin authentication, PDF documentation generation, and complete codebase snapshots. This major release enhances security, documentation capabilities, and provides advanced version control features for the MVNE platform.',
    features: [
      {
        category: 'Security',
        name: 'Admin Authentication System',
        description: 'Secure password-based access control',
        status: 'complete'
      },
      {
        category: 'Security',
        name: 'Role-based Access Control',
        description: 'Granular permission system',
        status: 'complete'
      },
      {
        category: 'Documentation',
        name: 'PDF Generation',
        description: 'Automated documentation export',
        status: 'complete'
      },
      {
        category: 'Version Control',
        name: 'Codebase Snapshots',
        description: 'Complete code state preservation',
        status: 'complete'
      },
      {
        category: 'Version Control',
        name: 'Version Restoration',
        description: 'Secure rollback capabilities',
        status: 'complete'
      },
      {
        category: 'Analytics',
        name: 'Version Metrics',
        description: 'Detailed version statistics',
        status: 'complete'
      }
    ],
    technicalSpecs: {
      architecture: [
        'React 18 with TypeScript for frontend development',
        'Supabase for backend database and authentication',
        'Tailwind CSS with custom design system',
        'Vite for build tooling and development',
        'Edge Functions for serverless processing'
      ],
      security: [
        'Password-based admin authentication (Malawi@1976)',
        'Row Level Security (RLS) policies',
        'Encrypted data storage with JSONB',
        'Audit logging for all version operations',
        'Session management with timeout controls'
      ],
      performance: [
        'Optimized JSONB storage for large codebases',
        'Efficient query optimization and indexing',
        'Lazy loading for version history',
        'Compressed file storage with metadata',
        'Background processing for heavy operations'
      ],
      compliance: [
        'South African regulatory compliance',
        'POPIA data protection compliance',
        'Comprehensive audit trails',
        'Secure data retention policies',
        'Administrative access controls'
      ]
    },
    changelog: `# Version 4.0.0 Changelog
    
## Major Features
- Enhanced secure version management system
- Admin authentication with password protection
- PDF documentation generation
- Complete codebase snapshot capabilities
- Version restoration and rollback features

## Security Enhancements
- Implemented admin-only access controls
- Added comprehensive audit logging
- Enhanced data encryption and storage

## Technical Improvements
- Optimized database schema for version storage
- Improved error handling and user feedback
- Enhanced mobile responsiveness
- Better performance for large codebases`,
    codeStats: {
      totalFiles: 487,
      totalLines: 45782,
      totalSize: '2.3 MB',
      languages: {
        'TypeScript': 245,
        'TSX': 156,
        'CSS': 23,
        'SQL': 18,
        'JSON': 12,
        'Markdown': 8,
        'JavaScript': 5,
        'Other': 20
      }
    }
  };
};