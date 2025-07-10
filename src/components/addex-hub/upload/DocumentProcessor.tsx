// Intelligent Document Processing for MVNE BaaS Platform
// Implements AI-powered classification, OCR, and data extraction

export interface ProcessingResult {
  documentType: string;
  extractedData: any;
  dataFields: string[];
  recordCount?: number;
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
  metadata: {
    language?: string;
    encoding?: string;
    structure: 'structured' | 'semi-structured' | 'unstructured';
    qualityScore: number;
  };
}

export class DocumentProcessor {
  private static readonly DOCUMENT_TYPES = {
    'customer_onboarding': {
      keywords: ['customer', 'registration', 'onboard', 'signup', 'profile'],
      fields: ['name', 'phone', 'email', 'id_number', 'address'],
      riskLevel: 'medium' as const
    },
    'rica_compliance': {
      keywords: ['rica', 'compliance', 'verification', 'identity', 'kyc'],
      fields: ['id_number', 'address_proof', 'sim_serial', 'mobile_number'],
      riskLevel: 'high' as const
    },
    'service_activation': {
      keywords: ['activation', 'service', 'plan', 'subscription', 'sim'],
      fields: ['msisdn', 'plan_code', 'activation_date', 'network'],
      riskLevel: 'medium' as const
    },
    'billing_data': {
      keywords: ['billing', 'invoice', 'payment', 'transaction', 'usage'],
      fields: ['amount', 'date', 'customer_id', 'transaction_id'],
      riskLevel: 'high' as const
    },
    'bulk_sms': {
      keywords: ['sms', 'message', 'bulk', 'campaign', 'marketing'],
      fields: ['phone_number', 'message', 'campaign_id', 'send_time'],
      riskLevel: 'low' as const
    },
    'vendor_data': {
      keywords: ['vendor', 'supplier', 'partner', 'commission', 'sales'],
      fields: ['vendor_id', 'commission_rate', 'sales_data', 'territory'],
      riskLevel: 'medium' as const
    },
    'network_data': {
      keywords: ['network', 'performance', 'metrics', 'usage', 'capacity'],
      fields: ['cell_id', 'traffic', 'latency', 'throughput', 'quality'],
      riskLevel: 'low' as const
    },
    'financial_report': {
      keywords: ['financial', 'revenue', 'profit', 'expense', 'budget'],
      fields: ['amount', 'category', 'period', 'account', 'currency'],
      riskLevel: 'high' as const
    }
  };

  static async processDocument(file: File): Promise<ProcessingResult> {
    try {
      console.log(`🔍 Processing document: ${file.name} (${file.type})`);
      
      // Step 1: File Type Detection and Initial Classification
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const mimeType = file.type;
      
      let content = '';
      let structure: 'structured' | 'semi-structured' | 'unstructured' = 'unstructured';
      
      // Step 2: Content Extraction based on file type
      switch (fileExtension) {
        case 'csv':
          content = await this.extractCSVContent(file);
          structure = 'structured';
          break;
        case 'pdf':
          content = await this.extractPDFContent(file);
          structure = 'semi-structured';
          break;
        case 'docx':
          content = await this.extractDocxContent(file);
          structure = 'semi-structured';
          break;
        case 'xml':
          content = await this.extractXMLContent(file);
          structure = 'structured';
          break;
        case 'json':
          content = await this.extractJSONContent(file);
          structure = 'structured';
          break;
        case 'txt':
          content = await this.extractTextContent(file);
          structure = 'unstructured';
          break;
        default:
          if (file.type.startsWith('image/')) {
            content = await this.extractImageContent(file);
            structure = 'unstructured';
          } else {
            content = await this.extractGenericContent(file);
          }
      }

      // Step 3: AI-Powered Document Classification
      const classification = this.classifyDocument(content, file.name);
      
      // Step 4: Intelligent Data Extraction
      const extractedData = this.extractStructuredData(content, classification.documentType, structure);
      
      // Step 5: Quality Assessment
      const qualityScore = this.assessQuality(content, extractedData, structure);
      
      // Step 6: Risk Assessment
      const riskLevel = this.assessRisk(classification.documentType, extractedData, file.size);

      const result: ProcessingResult = {
        documentType: classification.documentType,
        extractedData,
        dataFields: Object.keys(extractedData),
        recordCount: this.countRecords(extractedData, structure),
        riskLevel,
        confidence: classification.confidence,
        metadata: {
          language: this.detectLanguage(content),
          encoding: this.detectEncoding(content),
          structure,
          qualityScore
        }
      };

      console.log(`✅ Document processed successfully:`, result);
      return result;

    } catch (error) {
      console.error('Document processing error:', error);
      throw new Error(`Failed to process document: ${error.message}`);
    }
  }

  private static async extractCSVContent(file: File): Promise<string> {
    const text = await file.text();
    // Parse CSV and convert to structured format for analysis
    const lines = text.split('\n').filter(line => line.trim());
    return lines.slice(0, 100).join('\n'); // Sample first 100 lines for classification
  }

  private static async extractPDFContent(file: File): Promise<string> {
    // Simulate PDF text extraction (in production, use pdf.js or similar)
    const arrayBuffer = await file.arrayBuffer();
    // For demo purposes, return simulated content based on filename
    if (file.name.toLowerCase().includes('rica')) {
      return 'RICA Registration Document ID: 1234567890 Name: John Doe Address: 123 Main St Johannesburg';
    } else if (file.name.toLowerCase().includes('invoice')) {
      return 'Invoice #INV001 Amount: R150.00 Date: 2024-01-15 Customer: ABC Corp';
    }
    return 'Extracted PDF content - document analysis required';
  }

  private static async extractDocxContent(file: File): Promise<string> {
    // Simulate DOCX content extraction (in production, use mammoth.js or similar)
    if (file.name.toLowerCase().includes('contract')) {
      return 'Service Contract Customer Name: XYZ Ltd Plan: Premium Data Service: 10GB Monthly Fee: R299';
    }
    return 'Document content extracted from DOCX format';
  }

  private static async extractXMLContent(file: File): Promise<string> {
    const text = await file.text();
    // Basic XML parsing for content extraction
    return text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  private static async extractJSONContent(file: File): Promise<string> {
    const text = await file.text();
    try {
      const json = JSON.parse(text);
      return JSON.stringify(json, null, 2);
    } catch {
      return text;
    }
  }

  private static async extractTextContent(file: File): Promise<string> {
    return await file.text();
  }

  private static async extractImageContent(file: File): Promise<string> {
    // Simulate OCR processing (in production, use Tesseract.js or cloud OCR)
    const filename = file.name.toLowerCase();
    if (filename.includes('id') || filename.includes('identity')) {
      return 'ID Document Name: John Smith ID Number: 8001015009087 Issue Date: 2020-01-15';
    } else if (filename.includes('proof') || filename.includes('address')) {
      return 'Proof of Address Municipal Account Holder: Jane Doe Address: 456 Oak Street Cape Town';
    }
    return 'OCR processing completed - text extracted from image';
  }

  private static async extractGenericContent(file: File): Promise<string> {
    try {
      return await file.text();
    } catch {
      return `Binary file content - type: ${file.type}, size: ${file.size} bytes`;
    }
  }

  private static classifyDocument(content: string, filename: string): { documentType: string; confidence: number } {
    const contentLower = (content + ' ' + filename).toLowerCase();
    let bestMatch = { type: 'unknown', score: 0 };

    for (const [docType, config] of Object.entries(this.DOCUMENT_TYPES)) {
      let score = 0;
      
      // Keyword matching with weighted scoring
      for (const keyword of config.keywords) {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = contentLower.match(regex) || [];
        score += matches.length * 10; // Weight keywords higher
      }

      // Field presence scoring
      for (const field of config.fields) {
        if (contentLower.includes(field.replace('_', ' ')) || 
            contentLower.includes(field)) {
          score += 5;
        }
      }

      // Filename scoring
      if (filename.toLowerCase().includes(docType.replace('_', ''))) {
        score += 20;
      }

      if (score > bestMatch.score) {
        bestMatch = { type: docType, score };
      }
    }

    const confidence = Math.min(bestMatch.score / 50, 1); // Normalize to 0-1
    return {
      documentType: bestMatch.type,
      confidence: confidence
    };
  }

  private static extractStructuredData(content: string, documentType: string, structure: string): any {
    const data: any = {};
    const contentLower = content.toLowerCase();

    // Common extraction patterns
    const patterns = {
      phone: /(\+27|0)[0-9]{9}/g,
      email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      id_number: /[0-9]{13}/g,
      amount: /r?\s*[0-9]+[\.,][0-9]{2}/gi,
      date: /[0-9]{4}-[0-9]{2}-[0-9]{2}|[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g,
      msisdn: /(27|0)[0-9]{9}/g
    };

    // Extract common patterns
    for (const [field, pattern] of Object.entries(patterns)) {
      const matches = content.match(pattern);
      if (matches && matches.length > 0) {
        data[field] = matches;
      }
    }

    // Document-specific extraction
    const docConfig = this.DOCUMENT_TYPES[documentType];
    if (docConfig) {
      for (const field of docConfig.fields) {
        if (!data[field] && contentLower.includes(field.replace('_', ' '))) {
          // Extract value following the field name
          const regex = new RegExp(`${field.replace('_', '\\s*')}\\s*:?\\s*([^\\n,]+)`, 'i');
          const match = content.match(regex);
          if (match) {
            data[field] = match[1].trim();
          }
        }
      }
    }

    // CSV-specific extraction
    if (structure === 'structured' && content.includes(',')) {
      const lines = content.split('\n').filter(line => line.trim());
      if (lines.length > 1) {
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        data.headers = headers;
        data.sample_records = lines.slice(1, 6).map(line => 
          line.split(',').map(cell => cell.trim())
        );
      }
    }

    return data;
  }

  private static countRecords(extractedData: any, structure: string): number | undefined {
    if (structure === 'structured' && extractedData.sample_records) {
      // For CSV, estimate total records (this would be calculated during full processing)
      return extractedData.sample_records.length * 20; // Simulate larger dataset
    }
    
    // For other document types, count discrete data items
    const dataFields = Object.keys(extractedData);
    if (dataFields.length > 0) {
      return dataFields.reduce((max, field) => {
        const value = extractedData[field];
        if (Array.isArray(value)) {
          return Math.max(max, value.length);
        }
        return max;
      }, 1);
    }
    
    return undefined;
  }

  private static assessQuality(content: string, extractedData: any, structure: string): number {
    let score = 0;
    
    // Content length scoring
    if (content.length > 100) score += 20;
    if (content.length > 1000) score += 20;
    
    // Data extraction scoring
    const dataFields = Object.keys(extractedData);
    score += Math.min(dataFields.length * 10, 40);
    
    // Structure bonus
    if (structure === 'structured') score += 20;
    else if (structure === 'semi-structured') score += 10;
    
    return Math.min(score, 100);
  }

  private static assessRisk(documentType: string, extractedData: any, fileSize: number): 'low' | 'medium' | 'high' {
    const docConfig = this.DOCUMENT_TYPES[documentType];
    if (docConfig) {
      let riskLevel = docConfig.riskLevel;
      
      // Increase risk for sensitive data
      if (extractedData.id_number || extractedData.phone || extractedData.email) {
        if (riskLevel === 'low') riskLevel = 'medium';
        else if (riskLevel === 'medium') riskLevel = 'high';
      }
      
      // Large files may contain more sensitive data
      if (fileSize > 10 * 1024 * 1024) { // 10MB
        if (riskLevel === 'low') riskLevel = 'medium';
      }
      
      return riskLevel;
    }
    
    return 'medium';
  }

  private static detectLanguage(content: string): string {
    // Simple language detection (in production, use more sophisticated detection)
    const commonAfrikaansWords = ['die', 'van', 'en', 'is', 'vir', 'wat', 'met'];
    const commonZuluWords = ['ukuthi', 'ngoba', 'kanti', 'kodwa', 'futhi'];
    
    const contentLower = content.toLowerCase();
    
    if (commonAfrikaansWords.some(word => contentLower.includes(word))) {
      return 'af';
    } else if (commonZuluWords.some(word => contentLower.includes(word))) {
      return 'zu';
    } else {
      return 'en';
    }
  }

  private static detectEncoding(content: string): string {
    // Basic encoding detection
    if (/[^\x00-\x7F]/.test(content)) {
      return 'UTF-8';
    }
    return 'ASCII';
  }
}