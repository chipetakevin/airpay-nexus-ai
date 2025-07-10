// Compliance Validation for South African MVNE Standards
// Implements POPIA, ICASA, and MVNE regulatory compliance checks

import { ProcessingResult } from './DocumentProcessor';

export interface ComplianceResult {
  compliant: boolean;
  errors: string[];
  warnings: string[];
  checks: {
    popia: boolean;
    icasa: boolean;
    mvne: boolean;
    dataRetention: boolean;
    securityRequirements: boolean;
  };
  recommendations: string[];
}

export class ComplianceValidator {
  private static readonly POPIA_REQUIREMENTS = {
    personalDataFields: [
      'id_number', 'phone', 'email', 'name', 'address', 'date_of_birth',
      'financial_info', 'location_data', 'biometric_data'
    ],
    consentRequired: true,
    dataMinimization: true,
    purposeLimitation: true,
    retentionLimits: {
      customer_data: 7 * 365, // 7 years in days
      rica_data: 5 * 365, // 5 years
      billing_data: 5 * 365,
      marketing_data: 3 * 365
    }
  };

  private static readonly ICASA_REQUIREMENTS = {
    licenseRequirements: ['mvno_license', 'spectrum_license'],
    interceptionCapable: true,
    qualityStandards: true,
    emergencyServices: true,
    numbering: {
      msisdnFormat: /^(27|0)[0-9]{9}$/,
      shortCodeFormat: /^[0-9]{3,5}$/
    }
  };

  private static readonly MVNE_REQUIREMENTS = {
    technicalStandards: ['gsm', 'umts', 'lte', '5g'],
    billingCompliance: true,
    roamingSupport: true,
    interconnection: true,
    qosMonitoring: true,
    fraudDetection: true
  };

  static async validateDocument(
    processingResult: ProcessingResult, 
    filename: string
  ): Promise<ComplianceResult> {
    try {
      console.log(`🔍 Validating compliance for: ${filename}`);
      
      const errors: string[] = [];
      const warnings: string[] = [];
      const recommendations: string[] = [];
      
      // Initialize compliance checks
      const checks = {
        popia: true,
        icasa: true,
        mvne: true,
        dataRetention: true,
        securityRequirements: true
      };

      // POPIA Compliance Validation
      const popiaResult = this.validatePOPIA(processingResult);
      if (!popiaResult.compliant) {
        checks.popia = false;
        errors.push(...popiaResult.errors);
        warnings.push(...popiaResult.warnings);
      }
      recommendations.push(...popiaResult.recommendations);

      // ICASA Compliance Validation
      const icasaResult = this.validateICASA(processingResult);
      if (!icasaResult.compliant) {
        checks.icasa = false;
        errors.push(...icasaResult.errors);
        warnings.push(...icasaResult.warnings);
      }
      recommendations.push(...icasaResult.recommendations);

      // MVNE Standards Validation
      const mvneResult = this.validateMVNE(processingResult);
      if (!mvneResult.compliant) {
        checks.mvne = false;
        errors.push(...mvneResult.errors);
        warnings.push(...mvneResult.warnings);
      }
      recommendations.push(...mvneResult.recommendations);

      // Data Retention Compliance
      const retentionResult = this.validateDataRetention(processingResult);
      if (!retentionResult.compliant) {
        checks.dataRetention = false;
        errors.push(...retentionResult.errors);
        warnings.push(...retentionResult.warnings);
      }
      recommendations.push(...retentionResult.recommendations);

      // Security Requirements Validation
      const securityResult = this.validateSecurityRequirements(processingResult, filename);
      if (!securityResult.compliant) {
        checks.securityRequirements = false;
        errors.push(...securityResult.errors);
        warnings.push(...securityResult.warnings);
      }
      recommendations.push(...securityResult.recommendations);

      const overallCompliant = Object.values(checks).every(check => check === true);

      const result: ComplianceResult = {
        compliant: overallCompliant,
        errors: [...new Set(errors)], // Remove duplicates
        warnings: [...new Set(warnings)],
        checks,
        recommendations: [...new Set(recommendations)]
      };

      console.log(`✅ Compliance validation completed:`, result);
      return result;

    } catch (error) {
      console.error('Compliance validation error:', error);
      return {
        compliant: false,
        errors: [`Validation system error: ${error.message}`],
        warnings: [],
        checks: {
          popia: false,
          icasa: false,
          mvne: false,
          dataRetention: false,
          securityRequirements: false
        },
        recommendations: ['Contact system administrator for validation error resolution']
      };
    }
  }

  private static validatePOPIA(processingResult: ProcessingResult): ComplianceResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Check for personal data presence
    const hasPersonalData = this.POPIA_REQUIREMENTS.personalDataFields.some(field => 
      processingResult.dataFields.includes(field) ||
      Object.keys(processingResult.extractedData).some(key => 
        key.toLowerCase().includes(field.replace('_', ''))
      )
    );

    if (hasPersonalData) {
      // Validate consent requirements
      const hasConsentField = processingResult.dataFields.some(field => 
        field.toLowerCase().includes('consent') || 
        field.toLowerCase().includes('agreement')
      );
      
      if (!hasConsentField) {
        errors.push('POPIA: Personal data detected without explicit consent field');
        recommendations.push('Add consent/agreement fields for personal data processing');
      }

      // Check for data minimization
      if (processingResult.dataFields.length > 20) {
        warnings.push('POPIA: Large number of data fields - review data minimization principles');
        recommendations.push('Collect only necessary data fields as per POPIA data minimization');
      }

      // Validate purpose limitation
      if (processingResult.documentType === 'unknown') {
        warnings.push('POPIA: Document purpose unclear - may violate purpose limitation');
        recommendations.push('Clearly define document purpose for POPIA compliance');
      }
    }

    // Check for sensitive personal information
    const hasSensitiveData = ['id_number', 'biometric_data', 'health_info', 'financial_info']
      .some(field => processingResult.dataFields.includes(field));
    
    if (hasSensitiveData) {
      warnings.push('POPIA: Sensitive personal information detected - enhanced protection required');
      recommendations.push('Implement additional security measures for sensitive data');
    }

    return {
      compliant: errors.length === 0,
      errors,
      warnings,
      checks: { popia: true, icasa: true, mvne: true, dataRetention: true, securityRequirements: true },
      recommendations
    };
  }

  private static validateICASA(processingResult: ProcessingResult): ComplianceResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Validate MSISDN format compliance
    if (processingResult.extractedData.msisdn || processingResult.extractedData.phone) {
      const phoneNumbers = [
        ...(processingResult.extractedData.msisdn || []),
        ...(processingResult.extractedData.phone || [])
      ];

      const invalidNumbers = phoneNumbers.filter(number => 
        !this.ICASA_REQUIREMENTS.numbering.msisdnFormat.test(number.replace(/\s+/g, ''))
      );

      if (invalidNumbers.length > 0) {
        errors.push(`ICASA: Invalid MSISDN format detected - ${invalidNumbers.length} numbers`);
        recommendations.push('Ensure all MSISDNs follow ICASA numbering plan (27XXXXXXXXX or 0XXXXXXXXX)');
      }
    }

    // Check for service activation compliance
    if (processingResult.documentType === 'service_activation') {
      const requiredFields = ['msisdn', 'plan_code', 'activation_date'];
      const missingFields = requiredFields.filter(field => 
        !processingResult.dataFields.includes(field)
      );

      if (missingFields.length > 0) {
        errors.push(`ICASA: Missing required service activation fields: ${missingFields.join(', ')}`);
        recommendations.push('Include all mandatory fields for ICASA service activation compliance');
      }
    }

    // Emergency services capability check
    if (processingResult.documentType === 'customer_onboarding') {
      const hasEmergencyInfo = processingResult.dataFields.some(field => 
        field.toLowerCase().includes('emergency') || 
        field.toLowerCase().includes('location')
      );

      if (!hasEmergencyInfo) {
        warnings.push('ICASA: No emergency services information - required for location services');
        recommendations.push('Include emergency contact and location service consent');
      }
    }

    return {
      compliant: errors.length === 0,
      errors,
      warnings,
      checks: { popia: true, icasa: true, mvne: true, dataRetention: true, securityRequirements: true },
      recommendations
    };
  }

  private static validateMVNE(processingResult: ProcessingResult): ComplianceResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Validate billing compliance for MVNE operations
    if (processingResult.documentType === 'billing_data') {
      const requiredBillingFields = ['amount', 'currency', 'date', 'customer_id'];
      const missingFields = requiredBillingFields.filter(field => 
        !processingResult.dataFields.includes(field) &&
        !Object.keys(processingResult.extractedData).some(key => key.includes(field))
      );

      if (missingFields.length > 0) {
        errors.push(`MVNE: Missing billing compliance fields: ${missingFields.join(', ')}`);
        recommendations.push('Include all mandatory billing fields for MVNE compliance');
      }

      // Currency validation for South African operations
      if (processingResult.extractedData.amount) {
        const hasZAR = JSON.stringify(processingResult.extractedData).toLowerCase().includes('zar') ||
                      JSON.stringify(processingResult.extractedData).includes('r ') ||
                      JSON.stringify(processingResult.extractedData).includes('r.');
        
        if (!hasZAR) {
          warnings.push('MVNE: Currency not specified - ensure ZAR compliance for South African operations');
          recommendations.push('Specify currency (ZAR) for all financial transactions');
        }
      }
    }

    // Network quality and performance compliance
    if (processingResult.documentType === 'network_data') {
      const qosFields = ['latency', 'throughput', 'quality', 'signal_strength'];
      const hasQoSData = qosFields.some(field => 
        processingResult.dataFields.includes(field) ||
        Object.keys(processingResult.extractedData).some(key => key.includes(field))
      );

      if (!hasQoSData) {
        warnings.push('MVNE: No QoS metrics detected - required for network performance monitoring');
        recommendations.push('Include quality of service metrics for MVNE compliance');
      }
    }

    // Fraud detection compliance
    if (processingResult.documentType === 'customer_onboarding' || 
        processingResult.documentType === 'service_activation') {
      
      const fraudFields = ['verification_status', 'risk_score', 'validation_method'];
      const hasFraudData = fraudFields.some(field => 
        processingResult.dataFields.includes(field) ||
        Object.keys(processingResult.extractedData).some(key => key.includes(field))
      );

      if (!hasFraudData) {
        warnings.push('MVNE: No fraud detection indicators - implement fraud prevention measures');
        recommendations.push('Add fraud detection and risk assessment fields');
      }
    }

    return {
      compliant: errors.length === 0,
      errors,
      warnings,
      checks: { popia: true, icasa: true, mvne: true, dataRetention: true, securityRequirements: true },
      recommendations
    };
  }

  private static validateDataRetention(processingResult: ProcessingResult): ComplianceResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Check for retention period specification
    const hasRetentionInfo = processingResult.dataFields.some(field => 
      field.toLowerCase().includes('retention') || 
      field.toLowerCase().includes('expiry') ||
      field.toLowerCase().includes('delete')
    );

    if (!hasRetentionInfo) {
      warnings.push('Data Retention: No retention policy fields detected');
      recommendations.push('Include data retention and deletion date fields');
    }

    // Validate retention periods based on document type
    const retentionPeriod = this.POPIA_REQUIREMENTS.retentionLimits[processingResult.documentType];
    if (retentionPeriod) {
      recommendations.push(
        `Data should be retained for maximum ${Math.floor(retentionPeriod / 365)} years as per POPIA requirements`
      );
    } else {
      warnings.push('Data Retention: Unknown document type - verify appropriate retention period');
      recommendations.push('Define specific retention period based on data type and purpose');
    }

    // Check for archival and deletion procedures
    if (processingResult.recordCount && processingResult.recordCount > 1000) {
      warnings.push('Data Retention: Large dataset - ensure automated retention management');
      recommendations.push('Implement automated data archival and deletion for large datasets');
    }

    return {
      compliant: errors.length === 0,
      errors,
      warnings,
      checks: { popia: true, icasa: true, mvne: true, dataRetention: true, securityRequirements: true },
      recommendations
    };
  }

  private static validateSecurityRequirements(
    processingResult: ProcessingResult, 
    filename: string
  ): ComplianceResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Risk-based security validation
    if (processingResult.riskLevel === 'high') {
      recommendations.push('High-risk document: Implement additional encryption and access controls');
      recommendations.push('Require multi-factor authentication for access');
      recommendations.push('Enable enhanced audit logging');
    }

    // Filename security validation
    const unsafeChars = /[<>:"/\\|?*\x00-\x1f]/;
    if (unsafeChars.test(filename)) {
      errors.push('Security: Filename contains unsafe characters');
      recommendations.push('Sanitize filenames to prevent security vulnerabilities');
    }

    // Check for encryption indicators
    const hasEncryptionInfo = processingResult.dataFields.some(field => 
      field.toLowerCase().includes('encrypted') || 
      field.toLowerCase().includes('hash') ||
      field.toLowerCase().includes('signature')
    );

    if (processingResult.riskLevel === 'high' && !hasEncryptionInfo) {
      warnings.push('Security: High-risk data without encryption indicators');
      recommendations.push('Encrypt sensitive data fields before storage');
    }

    // Access control validation
    if (processingResult.documentType === 'rica_compliance' || 
        processingResult.documentType === 'financial_report') {
      recommendations.push('Restricted document type: Implement role-based access controls');
      recommendations.push('Require administrative approval for access');
    }

    // Data anonymization check for bulk operations
    if (processingResult.recordCount && processingResult.recordCount > 100) {
      const hasPersonalData = this.POPIA_REQUIREMENTS.personalDataFields.some(field => 
        processingResult.dataFields.includes(field)
      );

      if (hasPersonalData) {
        warnings.push('Security: Large dataset with personal data - consider anonymization');
        recommendations.push('Implement data anonymization for bulk processing operations');
      }
    }

    return {
      compliant: errors.length === 0,
      errors,
      warnings,
      checks: { popia: true, icasa: true, mvne: true, dataRetention: true, securityRequirements: true },
      recommendations
    };
  }
}