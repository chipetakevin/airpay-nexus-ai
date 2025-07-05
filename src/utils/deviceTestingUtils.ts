/**
 * Device Testing Utilities for Nerve Center BaaS
 * Provides comprehensive testing capabilities for device detection and interface verification
 */

export interface DeviceTestProfile {
  name: string;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  touchSupport: boolean;
  expectedDeviceType: 'mobile' | 'tablet' | 'desktop';
  description: string;
}

export interface TestCoverageMatrix {
  testCase: string;
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

// Comprehensive device profiles for testing
export const DEVICE_TEST_PROFILES: DeviceTestProfile[] = [
  // Mobile Devices
  {
    name: 'iPhone 14',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    screenWidth: 390,
    screenHeight: 844,
    touchSupport: true,
    expectedDeviceType: 'mobile',
    description: 'Latest iPhone with modern Safari'
  },
  {
    name: 'Samsung Galaxy S23',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
    screenWidth: 360,
    screenHeight: 780,
    touchSupport: true,
    expectedDeviceType: 'mobile',
    description: 'Android flagship with Chrome'
  },
  {
    name: 'Google Pixel 7',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
    screenWidth: 393,
    screenHeight: 851,
    touchSupport: true,
    expectedDeviceType: 'mobile',
    description: 'Google Pixel with stock Android'
  },
  
  // Tablet Devices
  {
    name: 'iPad Pro 12.9"',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    screenWidth: 1024,
    screenHeight: 1366,
    touchSupport: true,
    expectedDeviceType: 'tablet',
    description: 'Large iPad with iPadOS'
  },
  {
    name: 'Samsung Galaxy Tab S8',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-X706B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
    screenWidth: 800,
    screenHeight: 1280,
    touchSupport: true,
    expectedDeviceType: 'tablet',
    description: 'Android tablet with S Pen support'
  },
  
  // Desktop Devices
  {
    name: 'Windows Desktop',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    screenWidth: 1920,
    screenHeight: 1080,
    touchSupport: false,
    expectedDeviceType: 'desktop',
    description: 'Windows PC with Chrome'
  },
  {
    name: 'MacBook Pro',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    screenWidth: 1440,
    screenHeight: 900,
    touchSupport: false,
    expectedDeviceType: 'desktop',
    description: 'macOS with Chrome browser'
  },
  {
    name: 'Linux Desktop',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    screenWidth: 1366,
    screenHeight: 768,
    touchSupport: false,
    expectedDeviceType: 'desktop',
    description: 'Linux system with Chrome'
  }
];

// Test coverage matrix for Nerve Center BaaS
export const BAAS_TEST_COVERAGE_MATRIX: TestCoverageMatrix[] = [
  { testCase: 'Login Interface', mobile: true, tablet: true, desktop: true },
  { testCase: 'Navigation Menu', mobile: true, tablet: true, desktop: true },
  { testCase: 'Dashboard Layout', mobile: true, tablet: true, desktop: true },
  { testCase: 'Data Entry Forms', mobile: true, tablet: true, desktop: true },
  { testCase: 'File Upload', mobile: true, tablet: true, desktop: true },
  { testCase: 'Settings Panel', mobile: true, tablet: true, desktop: true },
  { testCase: 'Reports Generation', mobile: true, tablet: true, desktop: true },
  { testCase: 'User Management', mobile: false, tablet: true, desktop: true },
  { testCase: 'Admin Controls', mobile: false, tablet: false, desktop: true },
  { testCase: 'Bulk Operations', mobile: false, tablet: true, desktop: true }
];

/**
 * Simulates device characteristics for testing
 */
export const simulateDevice = (profile: DeviceTestProfile) => {
  // Store original values
  const originalUserAgent = navigator.userAgent;
  const originalScreen = { width: screen.width, height: screen.height };
  
  // Mock navigator and screen properties
  Object.defineProperty(navigator, 'userAgent', {
    writable: true,
    value: profile.userAgent
  });
  
  Object.defineProperty(screen, 'width', {
    writable: true,
    value: profile.screenWidth
  });
  
  Object.defineProperty(screen, 'height', {
    writable: true,
    value: profile.screenHeight
  });
  
  // Return cleanup function
  return () => {
    Object.defineProperty(navigator, 'userAgent', {
      writable: true,
      value: originalUserAgent
    });
    
    Object.defineProperty(screen, 'width', {
      writable: true,
      value: originalScreen.width
    });
    
    Object.defineProperty(screen, 'height', {
      writable: true,
      value: originalScreen.height
    });
  };
};

/**
 * Validates device detection accuracy
 */
export const validateDeviceDetection = (
  detectedType: 'mobile' | 'tablet' | 'desktop',
  expectedType: 'mobile' | 'tablet' | 'desktop',
  deviceName: string
): { passed: boolean; message: string } => {
  const passed = detectedType === expectedType;
  const message = passed 
    ? `✅ ${deviceName}: Correctly detected as ${detectedType}`
    : `❌ ${deviceName}: Expected ${expectedType}, got ${detectedType}`;
  
  return { passed, message };
};

/**
 * Runs comprehensive device detection tests
 */
export const runDeviceDetectionTests = (detectionHook: () => any) => {
  const results: Array<{ device: string; passed: boolean; message: string }> = [];
  
  DEVICE_TEST_PROFILES.forEach(profile => {
    const cleanup = simulateDevice(profile);
    
    try {
      const detection = detectionHook();
      const validation = validateDeviceDetection(
        detection.deviceType,
        profile.expectedDeviceType,
        profile.name
      );
      
      results.push({
        device: profile.name,
        passed: validation.passed,
        message: validation.message
      });
    } catch (error) {
      results.push({
        device: profile.name,
        passed: false,
        message: `❌ ${profile.name}: Test failed with error: ${error}`
      });
    } finally {
      cleanup();
    }
  });
  
  return results;
};

/**
 * Generates test coverage report
 */
export const generateCoverageReport = () => {
  const totalTests = BAAS_TEST_COVERAGE_MATRIX.length;
  const mobileTests = BAAS_TEST_COVERAGE_MATRIX.filter(t => t.mobile).length;
  const tabletTests = BAAS_TEST_COVERAGE_MATRIX.filter(t => t.tablet).length;
  const desktopTests = BAAS_TEST_COVERAGE_MATRIX.filter(t => t.desktop).length;
  
  return {
    summary: {
      totalTestCases: totalTests,
      mobileSupported: mobileTests,
      tabletSupported: tabletTests,
      desktopSupported: desktopTests,
      mobileCoverage: Math.round((mobileTests / totalTests) * 100),
      tabletCoverage: Math.round((tabletTests / totalTests) * 100),
      desktopCoverage: Math.round((desktopTests / totalTests) * 100)
    },
    matrix: BAAS_TEST_COVERAGE_MATRIX,
    recommendations: [
      mobileTests < totalTests ? 'Consider mobile-first design for better mobile coverage' : null,
      tabletTests < totalTests ? 'Tablet interface could be enhanced for better coverage' : null,
      desktopTests < totalTests ? 'Desktop interface has gaps in functionality' : null
    ].filter(Boolean)
  };
};

/**
 * Device-specific interface validation
 */
export const validateInterfaceSeparation = (
  currentDevice: 'mobile' | 'tablet' | 'desktop',
  expectedElements: {
    mobile?: string[];
    tablet?: string[];
    desktop?: string[];
  }
) => {
  const results: { element: string; shouldBeVisible: boolean; isVisible: boolean; passed: boolean }[] = [];
  
  Object.entries(expectedElements).forEach(([deviceType, elements]) => {
    elements?.forEach(elementSelector => {
      const shouldBeVisible = deviceType === currentDevice;
      const element = document.querySelector(elementSelector);
      const isVisible = element && window.getComputedStyle(element).display !== 'none';
      
      results.push({
        element: elementSelector,
        shouldBeVisible,
        isVisible: !!isVisible,
        passed: shouldBeVisible === !!isVisible
      });
    });
  });
  
  return results;
};