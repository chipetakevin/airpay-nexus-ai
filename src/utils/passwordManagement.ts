/**
 * Comprehensive Password Management System
 * Implements enterprise-grade password security, generation, validation, and management
 */

import CryptoJS from 'crypto-js';

// Password strength levels
export enum PasswordStrength {
  WEAK = 'weak',
  FAIR = 'fair',
  GOOD = 'good',
  STRONG = 'strong',
  EXCELLENT = 'excellent'
}

// User role types for password policies
export type UserRole = 'customer' | 'vendor' | 'admin' | 'field_worker';

// Password policy configuration
export interface PasswordPolicy {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  preventReuse: number; // Number of previous passwords to check against
  maxAge: number; // Days before password expires
  lockoutAttempts: number;
  complexityScore: number; // Minimum complexity score required
}

// Password metrics for analysis
export interface PasswordMetrics {
  strength: PasswordStrength;
  score: number;
  feedback: string[];
  entropy: number;
  crackTime: string;
  isCompromised: boolean;
}

// Secure password storage structure
export interface SecurePassword {
  id: string;
  hash: string;
  salt: string;
  createdAt: Date;
  lastUsed: Date;
  expiresAt: Date;
  role: UserRole;
  isActive: boolean;
  failedAttempts: number;
  metadata: {
    strength: PasswordStrength;
    entropy: number;
    policy: string;
  };
}

// Password manager class
export class PasswordManager {
  private static instance: PasswordManager;
  private breachedPasswords: Set<string> = new Set();
  private passwordHistory: Map<string, string[]> = new Map();

  // Role-based password policies
  private policies: Record<UserRole, PasswordPolicy> = {
    customer: {
      minLength: 8,
      maxLength: 128,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: false,
      preventReuse: 3,
      maxAge: 180, // 6 months
      lockoutAttempts: 5,
      complexityScore: 60
    },
    vendor: {
      minLength: 10,
      maxLength: 128,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      preventReuse: 5,
      maxAge: 90, // 3 months
      lockoutAttempts: 3,
      complexityScore: 70
    },
    admin: {
      minLength: 12,
      maxLength: 128,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      preventReuse: 10,
      maxAge: 60, // 2 months
      lockoutAttempts: 3,
      complexityScore: 85
    },
    field_worker: {
      minLength: 8,
      maxLength: 128,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      preventReuse: 3,
      maxAge: 120, // 4 months
      lockoutAttempts: 5,
      complexityScore: 65
    }
  };

  public static getInstance(): PasswordManager {
    if (!PasswordManager.instance) {
      PasswordManager.instance = new PasswordManager();
    }
    return PasswordManager.instance;
  }

  // Generate cryptographically secure password
  public generateSecurePassword(role: UserRole, length?: number): string {
    const policy = this.policies[role];
    const targetLength = length || Math.max(policy.minLength + 2, 12);
    
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let charset = '';
    let password = '';
    
    // Ensure required character types
    if (policy.requireLowercase) {
      charset += lowercase;
      password += this.getRandomChar(lowercase);
    }
    if (policy.requireUppercase) {
      charset += uppercase;
      password += this.getRandomChar(uppercase);
    }
    if (policy.requireNumbers) {
      charset += numbers;
      password += this.getRandomChar(numbers);
    }
    if (policy.requireSpecialChars) {
      charset += specialChars;
      password += this.getRandomChar(specialChars);
    }
    
    // Fill remaining length
    for (let i = password.length; i < targetLength; i++) {
      password += this.getRandomChar(charset);
    }
    
    // Shuffle the password
    return this.shuffleString(password);
  }

  // Validate password against role policy
  public validatePassword(password: string, role: UserRole): PasswordMetrics {
    const policy = this.policies[role];
    const feedback: string[] = [];
    let score = 0;
    
    // Length check
    if (password.length < policy.minLength) {
      feedback.push(`Password must be at least ${policy.minLength} characters long`);
    } else if (password.length >= policy.minLength) {
      score += 20;
    }
    
    if (password.length > policy.maxLength) {
      feedback.push(`Password must not exceed ${policy.maxLength} characters`);
    }
    
    // Character requirements
    if (policy.requireUppercase && !/[A-Z]/.test(password)) {
      feedback.push('Password must contain at least one uppercase letter');
    } else if (policy.requireUppercase) {
      score += 15;
    }
    
    if (policy.requireLowercase && !/[a-z]/.test(password)) {
      feedback.push('Password must contain at least one lowercase letter');
    } else if (policy.requireLowercase) {
      score += 15;
    }
    
    if (policy.requireNumbers && !/\d/.test(password)) {
      feedback.push('Password must contain at least one number');
    } else if (policy.requireNumbers) {
      score += 15;
    }
    
    if (policy.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
      feedback.push('Password must contain at least one special character');
    } else if (policy.requireSpecialChars) {
      score += 15;
    }
    
    // Additional scoring factors
    const entropy = this.calculateEntropy(password);
    score += Math.min(20, Math.floor(entropy / 5));
    
    // Check for common patterns
    if (this.hasCommonPatterns(password)) {
      feedback.push('Avoid common patterns like "123", "abc", or repeated characters');
      score -= 20;
    }
    
    // Check against breached passwords
    const isCompromised = this.breachedPasswords.has(password.toLowerCase());
    if (isCompromised) {
      feedback.push('This password has been found in data breaches');
      score -= 30;
    }
    
    const strength = this.calculateStrength(score);
    const crackTime = this.estimateCrackTime(entropy);
    
    return {
      strength,
      score: Math.max(0, Math.min(100, score)),
      feedback,
      entropy,
      crackTime,
      isCompromised
    };
  }

  // Secure password hashing with salt
  public hashPassword(password: string, salt?: string): { hash: string; salt: string } {
    const passwordSalt = salt || CryptoJS.lib.WordArray.random(32).toString();
    const hash = CryptoJS.PBKDF2(password, passwordSalt, {
      keySize: 64,
      iterations: 100000
    }).toString();
    
    return { hash, salt: passwordSalt };
  }

  // Verify password against hash
  public verifyPassword(password: string, hash: string, salt: string): boolean {
    const computedHash = CryptoJS.PBKDF2(password, salt, {
      keySize: 64,
      iterations: 100000
    }).toString();
    
    return computedHash === hash;
  }

  // Store password securely in encrypted local storage
  public storePassword(userId: string, password: string, role: UserRole): SecurePassword {
    const { hash, salt } = this.hashPassword(password);
    const metrics = this.validatePassword(password, role);
    const policy = this.policies[role];
    
    const securePassword: SecurePassword = {
      id: this.generateId(),
      hash,
      salt,
      createdAt: new Date(),
      lastUsed: new Date(),
      expiresAt: new Date(Date.now() + policy.maxAge * 24 * 60 * 60 * 1000),
      role,
      isActive: true,
      failedAttempts: 0,
      metadata: {
        strength: metrics.strength,
        entropy: metrics.entropy,
        policy: role
      }
    };
    
    // Store in encrypted format
    const encrypted = this.encryptData(JSON.stringify(securePassword));
    localStorage.setItem(`password_${userId}`, encrypted);
    
    // Update password history
    this.updatePasswordHistory(userId, hash);
    
    return securePassword;
  }

  // Auto-fill functionality with security checks
  public getStoredPassword(userId: string): SecurePassword | null {
    try {
      const encrypted = localStorage.getItem(`password_${userId}`);
      if (!encrypted) return null;
      
      const decrypted = this.decryptData(encrypted);
      const stored: SecurePassword = JSON.parse(decrypted);
      
      // Check if password is expired
      if (new Date() > stored.expiresAt) {
        this.removeStoredPassword(userId);
        return null;
      }
      
      return stored;
    } catch (error) {
      console.error('Error retrieving stored password:', error);
      return null;
    }
  }

  // Remove stored password
  public removeStoredPassword(userId: string): void {
    localStorage.removeItem(`password_${userId}`);
    this.passwordHistory.delete(userId);
  }

  // Check password reuse
  public checkPasswordReuse(userId: string, newPassword: string): boolean {
    const history = this.passwordHistory.get(userId) || [];
    const { hash } = this.hashPassword(newPassword);
    return history.includes(hash);
  }

  // Breach monitoring simulation
  public addBreachedPassword(password: string): void {
    this.breachedPasswords.add(password.toLowerCase());
  }

  // Multi-factor authentication integration
  public generateMFAToken(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Password rotation reminder
  public shouldRotatePassword(stored: SecurePassword): boolean {
    const daysUntilExpiry = Math.ceil(
      (stored.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 7; // Warn 7 days before expiry
  }

  // Audit trail logging
  public logPasswordEvent(userId: string, event: string, metadata?: any): void {
    const auditEntry = {
      userId,
      event,
      timestamp: new Date().toISOString(),
      metadata: metadata || {},
      ip: this.getClientIP(),
      userAgent: navigator.userAgent
    };
    
    // Store audit trail
    const auditKey = `password_audit_${userId}`;
    const existing = JSON.parse(localStorage.getItem(auditKey) || '[]');
    existing.push(auditEntry);
    
    // Keep only last 100 entries
    if (existing.length > 100) {
      existing.splice(0, existing.length - 100);
    }
    
    localStorage.setItem(auditKey, JSON.stringify(existing));
  }

  // Private helper methods
  private getRandomChar(charset: string): string {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return charset[array[0] % charset.length];
  }

  private shuffleString(str: string): string {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  }

  private calculateEntropy(password: string): number {
    const charset = new Set(password).size;
    return Math.log2(Math.pow(charset, password.length));
  }

  private calculateStrength(score: number): PasswordStrength {
    if (score >= 90) return PasswordStrength.EXCELLENT;
    if (score >= 75) return PasswordStrength.STRONG;
    if (score >= 60) return PasswordStrength.GOOD;
    if (score >= 40) return PasswordStrength.FAIR;
    return PasswordStrength.WEAK;
  }

  private estimateCrackTime(entropy: number): string {
    const guessesPerSecond = 1e9; // 1 billion guesses per second
    const seconds = Math.pow(2, entropy - 1) / guessesPerSecond;
    
    if (seconds < 60) return 'Less than a minute';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.floor(seconds / 86400)} days`;
    return `${Math.floor(seconds / 31536000)} years`;
  }

  private hasCommonPatterns(password: string): boolean {
    const patterns = [
      /123/,
      /abc/,
      /qwerty/,
      /password/i,
      /(.)\1{2,}/,  // repeated characters
      /0123456789/,
      /abcdefghij/
    ];
    
    return patterns.some(pattern => pattern.test(password));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  private encryptData(data: string): string {
    const key = this.getEncryptionKey();
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  private decryptData(encryptedData: string): string {
    const key = this.getEncryptionKey();
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  private getEncryptionKey(): string {
    // In production, this should be derived from user session or server
    return 'secure-password-manager-key-2024';
  }

  private updatePasswordHistory(userId: string, hash: string): void {
    const history = this.passwordHistory.get(userId) || [];
    history.unshift(hash);
    
    // Keep only the last N passwords based on policy
    const maxHistory = Math.max(...Object.values(this.policies).map(p => p.preventReuse));
    if (history.length > maxHistory) {
      history.splice(maxHistory);
    }
    
    this.passwordHistory.set(userId, history);
  }

  private getClientIP(): string {
    // This would be implemented with a real IP detection service
    return 'Client IP detection not implemented';
  }
}

// Export singleton instance
export const passwordManager = PasswordManager.getInstance();

// Utility functions for React components
export const generatePassword = (role: UserRole, length?: number) => 
  passwordManager.generateSecurePassword(role, length);

export const validatePasswordStrength = (password: string, role: UserRole) => 
  passwordManager.validatePassword(password, role);

export const securelyStorePassword = (userId: string, password: string, role: UserRole) => 
  passwordManager.storePassword(userId, password, role);

export const getStoredCredentials = (userId: string) => 
  passwordManager.getStoredPassword(userId);
