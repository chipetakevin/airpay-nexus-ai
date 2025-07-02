import { useState } from 'react';

// Enhanced security validation patterns
const SECURITY_PATTERNS = {
  XSS_DETECTION: /<script|javascript:|on\w+\s*=|<iframe|<object|<embed/gi,
  SQL_INJECTION: /(\b(select|insert|update|delete|drop|union|exec|script)\b)|(['";])/gi,
  PATH_TRAVERSAL: /(\.\.|\/\.\.|\\\.\.)/g,
  PHONE_MASK: /(\d{3})(\d{3})(\d{4})/,
  ID_MASK: /(\d{6})(\d{7})/,
  EMAIL_MASK: /(.{2})[^@]*(.{2})(@.*)/
};

export interface SecurityAuditLog {
  timestamp: string;
  action: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  fieldName?: string;
  validationResult: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  details?: string;
}

export const useEnhancedSecurity = () => {
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>([]);
  const [securityViolations, setSecurityViolations] = useState<number>(0);

  // Enhanced input sanitization with security logging
  const sanitizeAndValidateInput = (input: string, fieldName: string): {
    sanitized: string;
    isSecure: boolean;
    violations: string[];
  } => {
    let violations: string[] = [];
    let sanitized = input;
    let riskLevel: 'low' | 'medium' | 'high' = 'low';

    // Check for XSS attempts
    if (SECURITY_PATTERNS.XSS_DETECTION.test(input)) {
      violations.push('XSS attempt detected');
      riskLevel = 'high';
      sanitized = input.replace(SECURITY_PATTERNS.XSS_DETECTION, '');
    }

    // Check for SQL injection attempts
    if (SECURITY_PATTERNS.SQL_INJECTION.test(input)) {
      violations.push('SQL injection attempt detected');
      riskLevel = 'high';
      sanitized = input.replace(SECURITY_PATTERNS.SQL_INJECTION, '');
    }

    // Check for path traversal attempts
    if (SECURITY_PATTERNS.PATH_TRAVERSAL.test(input)) {
      violations.push('Path traversal attempt detected');
      riskLevel = 'medium';
      sanitized = input.replace(SECURITY_PATTERNS.PATH_TRAVERSAL, '');
    }

    // Remove potentially harmful HTML tags
    sanitized = sanitized
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();

    // Log security audit
    const auditLog: SecurityAuditLog = {
      timestamp: new Date().toISOString(),
      action: 'input_validation',
      fieldName,
      validationResult: violations.length === 0,
      riskLevel,
      details: violations.length > 0 ? violations.join(', ') : 'Input validated successfully'
    };

    setAuditLogs(prev => [...prev.slice(-99), auditLog]); // Keep last 100 logs

    if (violations.length > 0) {
      setSecurityViolations(prev => prev + 1);
    }

    return {
      sanitized,
      isSecure: violations.length === 0,
      violations
    };
  };

  // Data masking for sensitive information
  const maskSensitiveData = (value: string, type: 'phone' | 'id' | 'email'): string => {
    switch (type) {
      case 'phone':
        return value.replace(SECURITY_PATTERNS.PHONE_MASK, '$1 *** $3');
      case 'id':
        return value.replace(SECURITY_PATTERNS.ID_MASK, '$1*******');
      case 'email':
        return value.replace(SECURITY_PATTERNS.EMAIL_MASK, '$1***$2$3');
      default:
        return value;
    }
  };

  // File upload security validation
  const validateFileUpload = (file: File): {
    isValid: boolean;
    violations: string[];
    sanitizedName: string;
  } => {
    const violations: string[] = [];
    let sanitizedName = file.name;

    // Check file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      violations.push('Invalid file type. Only PDF, JPG, and PNG files are allowed.');
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      violations.push('File size exceeds 5MB limit.');
    }

    // Sanitize filename
    sanitizedName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/\.{2,}/g, '.')
      .substring(0, 255);

    // Check for suspicious file extensions
    const suspiciousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.com'];
    if (suspiciousExtensions.some(ext => sanitizedName.toLowerCase().includes(ext))) {
      violations.push('Suspicious file extension detected.');
    }

    // Log file upload validation
    const auditLog: SecurityAuditLog = {
      timestamp: new Date().toISOString(),
      action: 'file_upload_validation',
      validationResult: violations.length === 0,
      riskLevel: violations.length > 0 ? 'medium' : 'low',
      details: `File: ${sanitizedName}, Size: ${file.size}, Type: ${file.type}`
    };

    setAuditLogs(prev => [...prev.slice(-99), auditLog]);

    return {
      isValid: violations.length === 0,
      violations,
      sanitizedName
    };
  };

  // Generate security token for form submission
  const generateSecurityToken = (): string => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 15);
    return btoa(`${timestamp}-${random}`);
  };

  // Rate limiting check
  const checkRateLimit = (identifier: string, maxAttempts: number = 5, windowMs: number = 60000): boolean => {
    const key = `rateLimit_${identifier}`;
    const now = Date.now();
    const attempts = JSON.parse(localStorage.getItem(key) || '[]');
    
    // Remove expired attempts
    const validAttempts = attempts.filter((attempt: number) => now - attempt < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    localStorage.setItem(key, JSON.stringify(validAttempts));
    return true;
  };

  // Clear security logs
  const clearSecurityLogs = () => {
    setAuditLogs([]);
    setSecurityViolations(0);
  };

  return {
    sanitizeAndValidateInput,
    maskSensitiveData,
    validateFileUpload,
    generateSecurityToken,
    checkRateLimit,
    auditLogs,
    securityViolations,
    clearSecurityLogs
  };
};