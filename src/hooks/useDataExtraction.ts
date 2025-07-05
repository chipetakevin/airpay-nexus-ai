import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ExtractionOptions {
  table: string;
  columns?: string[];
  filters?: Record<string, any>;
  limit?: number;
  offset?: number;
  orderBy?: { column: string; ascending: boolean };
}

interface ExtractionResult {
  data: any[];
  count: number;
  error?: string;
}

interface ExportOptions {
  format: 'csv' | 'json' | 'excel';
  filename?: string;
  includeHeaders?: boolean;
}

export const useDataExtraction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const extractData = useCallback(async (options: ExtractionOptions): Promise<ExtractionResult> => {
    setIsLoading(true);
    setProgress(0);

    try {
      let query = supabase
        .from(options.table as any)
        .select(options.columns?.join(',') || '*', { count: 'exact' });

      // Apply filters
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            if (Array.isArray(value)) {
              query = query.in(key, value);
            } else if (typeof value === 'string' && value.includes('*')) {
              query = query.like(key, value.replace(/\*/g, '%'));
            } else {
              query = query.eq(key, value);
            }
          }
        });
      }

      // Apply ordering
      if (options.orderBy) {
        query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending });
      }

      // Apply pagination
      if (options.limit) {
        query = query.limit(options.limit);
      }
      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 1000) - 1);
      }

      setProgress(50);

      const { data, error, count } = await query;

      if (error) {
        throw new Error(error.message);
      }

      setProgress(100);

      return {
        data: data || [],
        count: count || 0
      };

    } catch (error: any) {
      console.error('Data extraction error:', error);
      return {
        data: [],
        count: 0,
        error: error.message
      };
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  }, []);

  const extractIncrementalData = useCallback(async (
    table: string,
    lastUpdated: string,
    options?: Partial<ExtractionOptions>
  ): Promise<ExtractionResult> => {
    return extractData({
      table,
      ...options,
      filters: {
        ...options?.filters,
        updated_at: `gte.${lastUpdated}`
      }
    });
  }, [extractData]);

  const exportData = useCallback(async (
    data: any[],
    options: ExportOptions
  ): Promise<string> => {
    try {
      const filename = options.filename || `export_${Date.now()}`;
      
      switch (options.format) {
        case 'csv':
          return exportToCSV(data, filename, options.includeHeaders);
        case 'json':
          return exportToJSON(data, filename);
        case 'excel':
          return exportToExcel(data, filename, options.includeHeaders);
        default:
          throw new Error('Unsupported export format');
      }
    } catch (error: any) {
      console.error('Export error:', error);
      throw error;
    }
  }, []);

  const exportToCSV = (data: any[], filename: string, includeHeaders = true): string => {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvContent = [];

    if (includeHeaders) {
      csvContent.push(headers.join(','));
    }

    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        if (value === null || value === undefined) return '';
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvContent.push(values.join(','));
    });

    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return url;
  };

  const exportToJSON = (data: any[], filename: string): string => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return url;
  };

  const exportToExcel = (data: any[], filename: string, includeHeaders = true): string => {
    // For Excel export, we'll create a simple HTML table that Excel can open
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    let htmlContent = '<table>';

    if (includeHeaders) {
      htmlContent += '<thead><tr>';
      headers.forEach(header => {
        htmlContent += `<th>${header}</th>`;
      });
      htmlContent += '</tr></thead>';
    }

    htmlContent += '<tbody>';
    data.forEach(row => {
      htmlContent += '<tr>';
      headers.forEach(header => {
        const value = row[header] || '';
        htmlContent += `<td>${value}</td>`;
      });
      htmlContent += '</tr>';
    });
    htmlContent += '</tbody></table>';

    const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return url;
  };

  const batchExtract = useCallback(async (
    tables: string[],
    batchSize = 1000,
    onProgress?: (completed: number, total: number) => void
  ): Promise<Record<string, any[]>> => {
    const results: Record<string, any[]> = {};
    
    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      const { data } = await extractData({ table, limit: batchSize });
      results[table] = data;
      
      if (onProgress) {
        onProgress(i + 1, tables.length);
      }
    }

    return results;
  }, [extractData]);

  const validateDataQuality = useCallback((data: any[]): {
    issues: string[];
    quality: number;
  } => {
    if (data.length === 0) {
      return { issues: ['No data found'], quality: 0 };
    }

    const issues: string[] = [];
    const sample = data.slice(0, Math.min(100, data.length));
    
    // Check for missing values
    const fields = Object.keys(sample[0]);
    fields.forEach(field => {
      const missingCount = sample.filter(row => 
        row[field] === null || row[field] === undefined || row[field] === ''
      ).length;
      
      const missingPercent = (missingCount / sample.length) * 100;
      if (missingPercent > 20) {
        issues.push(`Field '${field}' has ${missingPercent.toFixed(1)}% missing values`);
      }
    });

    // Check for duplicates
    const uniqueRows = new Set(sample.map(row => JSON.stringify(row)));
    if (uniqueRows.size < sample.length) {
      const duplicatePercent = ((sample.length - uniqueRows.size) / sample.length) * 100;
      issues.push(`${duplicatePercent.toFixed(1)}% duplicate records found`);
    }

    // Calculate quality score
    const quality = Math.max(0, 100 - (issues.length * 10));

    return { issues, quality };
  }, []);

  return {
    extractData,
    extractIncrementalData,
    exportData,
    batchExtract,
    validateDataQuality,
    isLoading,
    progress
  };
};