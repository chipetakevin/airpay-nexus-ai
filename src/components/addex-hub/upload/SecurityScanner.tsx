// Security Scanner for MVNE BaaS Platform
// Implements virus scanning, threat detection, and security validation

export interface SecurityScanResult {
  clean: boolean;
  threats: string[];
  warnings: string[];
  scanDetails: {
    fileHash: string;
    scanTime: Date;
    engineVersion: string;
    threatTypes: string[];
    riskScore: number;
  };
  recommendations: string[];
}

export class SecurityScanner {
  private static readonly THREAT_SIGNATURES = {
    // Common malware patterns
    malware: [
      /eval\s*\(\s*['"`]/, // JavaScript eval patterns
      /<script[^>]*>.*?<\/script>/is, // Script injection
      /exec\s*\(\s*['"`]/, // Code execution patterns
      /system\s*\(\s*['"`]/, // System command execution
      /shell_exec\s*\(\s*['"`]/, // Shell execution
      /base64_decode\s*\(/, // Suspicious base64 operations
      /gzinflate\s*\(/, // Compressed payload patterns
    ],
    
    // SQL injection patterns
    sqlInjection: [
      /(\bunion\b.*\bselect\b)|(\bselect\b.*\bunion\b)/i,
      /\b(and|or)\b\s+\d+\s*=\s*\d+/i,
      /\b(drop|delete|insert|update)\b\s+(table|from|into)/i,
      /\bexec\s*\(/i,
      /\bsp_executesql\b/i,
    ],
    
    // XSS patterns
    xss: [
      /<script[^>]*>.*?<\/script>/is,
      /javascript\s*:/i,
      /vbscript\s*:/i,
      /onload\s*=/i,
      /onerror\s*=/i,
      /onclick\s*=/i,
    ],
    
    // File inclusion attacks
    fileInclusion: [
      /\.\.[\/\\]/,
      /\/etc\/passwd/i,
      /\/proc\/self\/environ/i,
      /boot\.ini/i,
      /win\.ini/i,
    ],
    
    // Suspicious file headers
    suspiciousHeaders: [
      /^PK\x03\x04/, // ZIP file header in wrong extension
      /^%PDF-/, // PDF header in wrong extension
      /^\x89PNG/, // PNG header in wrong extension
      /^GIF8/, // GIF header in wrong extension
    ]
  };

  private static readonly RISKY_EXTENSIONS = [
    '.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js',
    '.jar', '.dll', '.sys', '.msi', '.app', '.deb', '.rpm'
  ];

  private static readonly MAX_SCAN_SIZE = 50 * 1024 * 1024; // 50MB scan limit

  static async scanFile(file: File): Promise<SecurityScanResult> {
    try {
      console.log(`🔒 Starting security scan for: ${file.name}`);
      
      const threats: string[] = [];
      const warnings: string[] = [];
      const recommendations: string[] = [];
      let riskScore = 0;

      // Step 1: File Size Validation
      if (file.size > this.MAX_SCAN_SIZE) {
        warnings.push('File exceeds maximum scan size - partial scan performed');
        riskScore += 10;
      }

      // Step 2: File Extension Check
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (this.RISKY_EXTENSIONS.includes(extension)) {
        threats.push(`Potentially dangerous file extension: ${extension}`);
        riskScore += 50;
        recommendations.push('Executable files are not permitted for security reasons');
      }

      // Step 3: Filename Analysis
      const filenameRisk = this.analyzeFilename(file.name);
      if (filenameRisk.risk > 0) {
        warnings.push(...filenameRisk.warnings);
        riskScore += filenameRisk.risk;
        recommendations.push(...filenameRisk.recommendations);
      }

      // Step 4: File Content Scanning
      let content = '';
      let fileHeader = '';
      
      try {
        // Read file content for analysis
        if (file.size < this.MAX_SCAN_SIZE) {
          const arrayBuffer = await file.arrayBuffer();
          const bytes = new Uint8Array(arrayBuffer);
          
          // Extract file header (first 512 bytes)
          fileHeader = Array.from(bytes.slice(0, 512))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
          
          // Convert to text for pattern matching
          content = new TextDecoder('utf-8', { fatal: false }).decode(arrayBuffer);
        } else {
          // For large files, read only first portion
          const blob = file.slice(0, 1024 * 1024); // First 1MB
          content = await blob.text();
        }
      } catch (error) {
        warnings.push('Unable to read file content - binary file detected');
        riskScore += 5;
      }

      // Step 5: Pattern-based Threat Detection
      const threatResults = this.scanForThreats(content, fileHeader);
      threats.push(...threatResults.threats);
      warnings.push(...threatResults.warnings);
      riskScore += threatResults.riskScore;

      // Step 6: File Header Validation
      const headerValidation = this.validateFileHeader(fileHeader, file.name, file.type);
      if (!headerValidation.valid) {
        threats.push('File header mismatch - possible file type spoofing');
        riskScore += 30;
        recommendations.push('File extension does not match actual file type');
      }

      // Step 7: Content Structure Analysis
      const structureAnalysis = this.analyzeFileStructure(content, file.type);
      warnings.push(...structureAnalysis.warnings);
      riskScore += structureAnalysis.riskScore;
      recommendations.push(...structureAnalysis.recommendations);

      // Step 8: Generate File Hash for Tracking
      const fileHash = await this.generateFileHash(file);

      // Step 9: Final Risk Assessment
      const threatTypes = this.categorizeThreatTypes(threats);
      const isClean = threats.length === 0 && riskScore < 30;

      const result: SecurityScanResult = {
        clean: isClean,
        threats,
        warnings,
        scanDetails: {
          fileHash,
          scanTime: new Date(),
          engineVersion: '1.0.0',
          threatTypes,
          riskScore
        },
        recommendations
      };

      console.log(`🔒 Security scan completed:`, {
        filename: file.name,
        clean: isClean,
        riskScore,
        threatsFound: threats.length
      });

      return result;

    } catch (error) {
      console.error('Security scan error:', error);
      return {
        clean: false,
        threats: [`Security scan failed: ${error.message}`],
        warnings: ['Unable to complete security validation'],
        scanDetails: {
          fileHash: '',
          scanTime: new Date(),
          engineVersion: '1.0.0',
          threatTypes: ['scan_error'],
          riskScore: 100
        },
        recommendations: ['Contact security team for manual file validation']
      };
    }
  }

  private static analyzeFilename(filename: string): {
    risk: number;
    warnings: string[];
    recommendations: string[];
  } {
    const warnings: string[] = [];
    const recommendations: string[] = [];
    let risk = 0;

    // Double extensions
    const doubleExtension = /\.[a-zA-Z]{2,4}\.[a-zA-Z]{2,4}$/;
    if (doubleExtension.test(filename)) {
      warnings.push('Filename has multiple extensions - potential masquerading');
      risk += 20;
      recommendations.push('Remove unnecessary file extensions');
    }

    // Suspicious patterns in filename
    const suspiciousPatterns = [
      /password/i, /secret/i, /private/i, /confidential/i,
      /hack/i, /crack/i, /exploit/i, /payload/i,
      /virus/i, /malware/i, /trojan/i, /backdoor/i
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(filename)) {
        warnings.push('Filename contains suspicious keywords');
        risk += 15;
        recommendations.push('Review filename for appropriate content description');
        break;
      }
    }

    // Special characters that might indicate obfuscation
    const specialChars = /[^\w\-_. ]/;
    if (specialChars.test(filename)) {
      warnings.push('Filename contains special characters');
      risk += 5;
      recommendations.push('Use only alphanumeric characters, hyphens, and underscores');
    }

    return { risk, warnings, recommendations };
  }

  private static scanForThreats(content: string, fileHeader: string): {
    threats: string[];
    warnings: string[];
    riskScore: number;
  } {
    const threats: string[] = [];
    const warnings: string[] = [];
    let riskScore = 0;

    // Scan for each threat category
    for (const [category, patterns] of Object.entries(this.THREAT_SIGNATURES)) {
      for (const pattern of patterns) {
        if (pattern.test(content)) {
          threats.push(`${category.toUpperCase()} signature detected`);
          riskScore += 25;
          break; // One detection per category
        }
      }
    }

    // Binary content analysis
    const binaryRatio = this.calculateBinaryRatio(content);
    if (binaryRatio > 0.3 && content.length > 1000) {
      warnings.push('High binary content ratio detected');
      riskScore += 10;
    }

    // Entropy analysis for packed/encrypted content
    const entropy = this.calculateEntropy(content);
    if (entropy > 7.5) {
      warnings.push('High entropy content - possible packed or encrypted data');
      riskScore += 15;
    }

    // Suspicious URL patterns
    const urlPatterns = [
      /https?:\/\/[^\s]+\.(?:tk|ml|ga|cf|biz|info|su)/gi,
      /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/g
    ];

    for (const pattern of urlPatterns) {
      if (pattern.test(content)) {
        warnings.push('Suspicious URLs or IP addresses detected');
        riskScore += 10;
        break;
      }
    }

    return { threats, warnings, riskScore };
  }

  private static validateFileHeader(header: string, filename: string, mimeType: string): {
    valid: boolean;
  } {
    const extension = filename.split('.').pop()?.toLowerCase();
    
    // Common file signatures
    const signatures = {
      'pdf': ['25504446'],
      'jpg': ['ffd8ff'],
      'jpeg': ['ffd8ff'],
      'png': ['89504e47'],
      'gif': ['474946'],
      'zip': ['504b0304', '504b0506'],
      'csv': [''], // Text files don't have specific headers
      'txt': [''],
      'json': [''],
      'xml': ['3c3f786d6c', '3c']
    };

    if (!extension || !signatures[extension]) {
      return { valid: true }; // Unknown extension, can't validate
    }

    const expectedSignatures = signatures[extension];
    if (expectedSignatures.length === 0) {
      return { valid: true }; // Text files
    }

    return {
      valid: expectedSignatures.some(sig => header.toLowerCase().startsWith(sig))
    };
  }

  private static analyzeFileStructure(content: string, mimeType: string): {
    warnings: string[];
    riskScore: number;
    recommendations: string[];
  } {
    const warnings: string[] = [];
    const recommendations: string[] = [];
    let riskScore = 0;

    // Large repetitive patterns (possible padding attacks)
    const repetitivePattern = /(.{10,})\1{5,}/g;
    if (repetitivePattern.test(content)) {
      warnings.push('Repetitive content patterns detected');
      riskScore += 5;
    }

    // Extremely long lines (possible obfuscation)
    const lines = content.split('\n');
    const longLines = lines.filter(line => line.length > 10000);
    if (longLines.length > 0) {
      warnings.push('Extremely long lines detected - possible obfuscation');
      riskScore += 10;
      recommendations.push('Review content for appropriate formatting');
    }

    // High compression ratio indicators
    const compressedPatterns = [
      /\x1f\x8b/g, // GZIP
      /BZ[h0-9]/g, // BZIP2
      /\x37\x7a\xbc\xaf\x27\x1c/g // 7ZIP
    ];

    for (const pattern of compressedPatterns) {
      if (pattern.test(content)) {
        warnings.push('Compressed content detected within file');
        riskScore += 5;
        break;
      }
    }

    return { warnings, riskScore, recommendations };
  }

  private static calculateBinaryRatio(content: string): number {
    if (content.length === 0) return 0;
    
    let binaryChars = 0;
    for (let i = 0; i < content.length; i++) {
      const code = content.charCodeAt(i);
      if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
        binaryChars++;
      }
    }
    
    return binaryChars / content.length;
  }

  private static calculateEntropy(content: string): number {
    if (content.length === 0) return 0;
    
    const freq: { [key: string]: number } = {};
    for (const char of content) {
      freq[char] = (freq[char] || 0) + 1;
    }
    
    let entropy = 0;
    for (const count of Object.values(freq)) {
      const p = count / content.length;
      entropy -= p * Math.log2(p);
    }
    
    return entropy;
  }

  private static categorizeThreatTypes(threats: string[]): string[] {
    const types = new Set<string>();
    
    for (const threat of threats) {
      if (threat.includes('MALWARE')) types.add('malware');
      if (threat.includes('SQL')) types.add('sql_injection');
      if (threat.includes('XSS')) types.add('xss');
      if (threat.includes('FILE')) types.add('file_inclusion');
      if (threat.includes('extension')) types.add('dangerous_extension');
      if (threat.includes('header')) types.add('file_spoofing');
    }
    
    return Array.from(types);
  }

  private static async generateFileHash(file: File): Promise<string> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      console.error('Hash generation error:', error);
      return `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
}