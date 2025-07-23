/**
 * Global test setup for the testing framework
 * This file configures the testing environment for Node.js built-in test runner
 */

// Set up global test environment
global.setupTestEnvironment = () => {
  // Configure any global test settings here
  process.env.NODE_ENV = 'test';
  
  // Suppress console output during tests unless explicitly needed
  if (!process.env.VERBOSE_TESTS) {
    const originalConsole = { ...console };
    console.log = () => {};
    console.info = () => {};
    console.warn = () => {};
    
    // Restore console for test failures
    global.restoreConsole = () => {
      Object.assign(console, originalConsole);
    };
  }
};

// Initialize test environment
global.setupTestEnvironment();