#!/usr/bin/env node

/**
 * Automated Code Quality and Consistency Checker
 * Runs various checks to ensure codebase consistency
 */

import { execSync } from 'child_process';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

class CodeQualityChecker {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passed = [];
  }

  log(type, message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${type.toUpperCase()}: ${message}`);
  }

  addError(message) {
    this.errors.push(message);
    this.log('error', message);
  }

  addWarning(message) {
    this.warnings.push(message);
    this.log('warn', message);
  }

  addPassed(message) {
    this.passed.push(message);
    this.log('info', message);
  }

  // Check file naming conventions
  checkFileNaming() {
    this.log('info', 'Checking file naming conventions...');
    
    const checkDirectory = (dir, basePath = '') => {
      const items = readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = join(dir, item);
        const relativePath = join(basePath, item);
        const stat = statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Skip node_modules and dist
          if (!['node_modules', 'dist', '.git'].includes(item)) {
            checkDirectory(fullPath, relativePath);
          }
        } else {
          // Check file naming conventions
          const ext = extname(item);
          const name = item.replace(ext, '');
          
          // TypeScript/JavaScript files should use camelCase or kebab-case
          if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
            if (!/^[a-z][a-zA-Z0-9]*$|^[a-z][a-z0-9-]*[a-z0-9]$/.test(name)) {
              this.addWarning(`File naming: ${relativePath} should use camelCase or kebab-case`);
            }
          }
          
          // Component files should be PascalCase
          if (['.tsx', '.jsx'].includes(ext) && relativePath.includes('components/')) {
            if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
              this.addWarning(`Component file: ${relativePath} should use PascalCase`);
            }
          }
          
          // CSS files should use kebab-case
          if (['.css', '.scss', '.less'].includes(ext)) {
            if (!/^[a-z][a-z0-9-]*[a-z0-9]$|^[a-z]$/.test(name)) {
              this.addWarning(`CSS file: ${relativePath} should use kebab-case`);
            }
          }
        }
      });
    };
    
    checkDirectory('./src', '');
    this.addPassed('File naming convention check completed');
  }

  // Check import consistency
  checkImportConsistency() {
    this.log('info', 'Checking import consistency...');
    
    const checkFile = (filePath) => {
      try {
        const content = readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        let importSection = true;
        let lastImportType = '';
        let hasReactImport = false;
        
        lines.forEach((line, index) => {
          const trimmedLine = line.trim();
          
          if (trimmedLine.startsWith('import ')) {
            if (!importSection) {
              this.addWarning(`${filePath}:${index + 1} - Import statement found after non-import code`);
            }
            
            // Check React import for JSX files
            if (trimmedLine.includes('react') || trimmedLine.includes('React')) {
              hasReactImport = true;
            }
            
            // Check import grouping
            const isExternal = !trimmedLine.includes('./') && !trimmedLine.includes('../') && !trimmedLine.includes('@/');
            const currentImportType = isExternal ? 'external' : 'internal';
            
            if (lastImportType && lastImportType !== currentImportType && currentImportType === 'external') {
              this.addWarning(`${filePath}:${index + 1} - External imports should come before internal imports`);
            }
            
            lastImportType = currentImportType;
          } else if (trimmedLine && !trimmedLine.startsWith('//') && !trimmedLine.startsWith('/*')) {
            importSection = false;
          }
        });
        
        // Check if JSX files have proper React handling
        if ((filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) && content.includes('<') && content.includes('>')) {
          // For newer React (17+), we don't need React import for JSX
          this.addPassed(`${filePath} - JSX file properly configured`);
        }
        
      } catch (error) {
        this.addError(`Failed to check imports in ${filePath}: ${error.message}`);
      }
    };
    
    const checkDirectory = (dir) => {
      const items = readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);
        
        if (stat.isDirectory() && !['node_modules', 'dist', '.git'].includes(item)) {
          checkDirectory(fullPath);
        } else if (['.ts', '.tsx', '.js', '.jsx'].includes(extname(item))) {
          checkFile(fullPath);
        }
      });
    };
    
    checkDirectory('./src');
    this.addPassed('Import consistency check completed');
  }

  // Check component structure consistency
  checkComponentStructure() {
    this.log('info', 'Checking component structure...');
    
    const checkComponentFile = (filePath) => {
      try {
        const content = readFileSync(filePath, 'utf8');
        const fileName = filePath.split('/').pop().replace(/\.(tsx|jsx)$/, '');
        
        // Check if component is properly exported
        const hasDefaultExport = content.includes('export default') || content.includes('export { ' + fileName + ' as default }');
        const hasNamedExport = content.includes('export const ' + fileName) || content.includes('export function ' + fileName);
        
        if (!hasDefaultExport && !hasNamedExport) {
          this.addWarning(`${filePath} - Component should have proper export`);
        }
        
        // Check for TypeScript prop types
        if (filePath.endsWith('.tsx')) {
          if (content.includes('props:') && !content.includes('interface') && !content.includes('type ')) {
            this.addWarning(`${filePath} - TypeScript component should define prop types`);
          }
        }
        
        // Check for consistent component declaration
        const hasFunctionComponent = content.includes('const ' + fileName + ' = ') || content.includes('function ' + fileName);
        if (!hasFunctionComponent) {
          this.addWarning(`${filePath} - Component name should match file name`);
        }
        
      } catch (error) {
        this.addError(`Failed to check component structure in ${filePath}: ${error.message}`);
      }
    };
    
    const findComponentFiles = (dir) => {
      const items = readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);
        
        if (stat.isDirectory() && !['node_modules', 'dist', '.git'].includes(item)) {
          findComponentFiles(fullPath);
        } else if (item.endsWith('.tsx') || item.endsWith('.jsx')) {
          checkComponentFile(fullPath);
        }
      });
    };
    
    findComponentFiles('./src');
    this.addPassed('Component structure check completed');
  }

  // Check CSS/styling consistency
  checkStylingConsistency() {
    this.log('info', 'Checking styling consistency...');
    
    const checkForDirectColors = (filePath) => {
      try {
        const content = readFileSync(filePath, 'utf8');
        
        // Check for direct color usage instead of design tokens
        const directColorPatterns = [
          /text-white(?!\-)/g,
          /text-black(?!\-)/g,
          /bg-white(?!\-)/g,
          /bg-black(?!\-)/g,
          /border-white(?!\-)/g,
          /border-black(?!\-)/g,
          /#[0-9a-fA-F]{3,6}/g, // Hex colors
          /rgb\([^)]+\)/g,      // RGB colors
          /rgba\([^)]+\)/g      // RGBA colors
        ];
        
        directColorPatterns.forEach(pattern => {
          const matches = content.match(pattern);
          if (matches) {
            matches.forEach(match => {
              this.addWarning(`${filePath} - Direct color usage detected: "${match}". Use design system tokens instead.`);
            });
          }
        });
        
        // Check for proper semantic class usage
        if (content.includes('className=') || content.includes('class=')) {
          if (!content.includes('text-foreground') && !content.includes('bg-background') && 
              !content.includes('text-muted') && content.includes('text-')) {
            // File uses Tailwind classes, check if using semantic ones
            const hasSemanticClasses = content.includes('text-foreground') || 
                                     content.includes('text-muted-foreground') ||
                                     content.includes('bg-background') ||
                                     content.includes('bg-card');
            
            if (!hasSemanticClasses && content.match(/text-\w+|bg-\w+/)) {
              this.addWarning(`${filePath} - Consider using semantic design tokens for better theming`);
            }
          }
        }
        
      } catch (error) {
        this.addError(`Failed to check styling in ${filePath}: ${error.message}`);
      }
    };
    
    const checkDirectory = (dir) => {
      const items = readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);
        
        if (stat.isDirectory() && !['node_modules', 'dist', '.git'].includes(item)) {
          checkDirectory(fullPath);
        } else if (['.tsx', '.jsx', '.css', '.scss'].includes(extname(item))) {
          checkForDirectColors(fullPath);
        }
      });
    };
    
    checkDirectory('./src');
    this.addPassed('Styling consistency check completed');
  }

  // Run all checks
  async runAllChecks() {
    this.log('info', 'Starting comprehensive code quality checks...');
    
    try {
      // Run linting
      this.log('info', 'Running ESLint...');
      execSync('npx eslint src --ext .ts,.tsx,.js,.jsx', { stdio: 'inherit' });
      this.addPassed('ESLint checks passed');
    } catch (error) {
      this.addError('ESLint found issues - please fix them');
    }
    
    try {
      // Run Prettier check
      this.log('info', 'Checking Prettier formatting...');
      execSync('npx prettier --check src', { stdio: 'inherit' });
      this.addPassed('Prettier formatting is consistent');
    } catch (error) {
      this.addError('Prettier formatting issues found - run "npm run format" to fix');
    }
    
    // Custom checks
    this.checkFileNaming();
    this.checkImportConsistency();
    this.checkComponentStructure();
    this.checkStylingConsistency();
    
    // Summary
    this.printSummary();
  }
  
  printSummary() {
    console.log('\n' + '='.repeat(50));
    console.log('CODE QUALITY SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${this.passed.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    console.log(`❌ Errors: ${this.errors.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n🔴 ERRORS FOUND:');
      this.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    if (this.warnings.length > 0) {
      console.log('\n🟡 WARNINGS:');
      this.warnings.forEach(warning => console.log(`  - ${warning}`));
    }
    
    console.log('\n' + '='.repeat(50));
    
    // Exit with error code if there are errors
    if (this.errors.length > 0) {
      process.exit(1);
    }
  }
}

// Run the checker
const checker = new CodeQualityChecker();
checker.runAllChecks().catch(error => {
  console.error('Code quality check failed:', error);
  process.exit(1);
});