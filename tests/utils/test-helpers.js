import { strict as assert } from 'node:assert';

/**
 * Utility functions for testing Enhance components
 */

/**
 * Render an Enhance element with mock context
 * @param {Function} elementFunction - The element function to render
 * @param {Object} props - Props to pass to the element
 * @returns {string} Rendered HTML string
 */
export function renderElement(elementFunction, props = {}) {
  // Create mock Enhance context with html template function
  const mockContext = { 
    html: (strings, ...values) => {
      // Simple template literal implementation
      let result = strings[0];
      for (let i = 0; i < values.length; i++) {
        result += String(values[i]) + strings[i + 1];
      }
      return result;
    }
  };
  
  // Call the element function with mock context and props
  return elementFunction.call(mockContext, props);
}

/**
 * Create mock application state for testing
 * @param {Object} overrides - State properties to override
 * @returns {Object} Mock state object
 */
export function createMockState(overrides = {}) {
  return { 
    path: '/', 
    store: {},
    ...overrides 
  };
}

/**
 * Assert that HTML contains expected structure
 * @param {string} html - HTML string to validate
 * @param {string} expectedStructure - Expected HTML content or structure
 */
export function assertHTMLStructure(html, expectedStructure) {
  assert.ok(
    html.includes(expectedStructure), 
    `HTML should contain: ${expectedStructure}\nActual HTML: ${html}`
  );
}

/**
 * Assert that HTML has proper accessibility attributes
 * @param {string} html - HTML string to validate
 * @param {Array<string>} expectedAttributes - Array of expected attributes
 */
export function assertAccessibilityAttributes(html, expectedAttributes) {
  expectedAttributes.forEach(attr => {
    assert.ok(
      html.includes(attr),
      `HTML should contain accessibility attribute: ${attr}`
    );
  });
}

/**
 * Create mock request object for testing HTTP handlers
 * @param {Object} overrides - Request properties to override
 * @returns {Object} Mock request object
 */
export function createMockRequest(overrides = {}) {
  return {
    path: '/',
    rawPath: '/',
    method: 'GET',
    headers: {},
    body: '',
    ...overrides
  };
}

/**
 * Create mock response object for testing HTTP handlers
 * @returns {Object} Mock response object with assertion helpers
 */
export function createMockResponse() {
  const response = {
    statusCode: 200,
    headers: {},
    body: '',
    isBase64Encoded: false
  };
  
  return {
    ...response,
    assertStatus: (expectedStatus) => {
      assert.strictEqual(response.statusCode, expectedStatus);
    },
    assertHeader: (headerName, expectedValue) => {
      assert.strictEqual(response.headers[headerName], expectedValue);
    },
    assertBodyContains: (expectedContent) => {
      assert.ok(
        response.body.includes(expectedContent),
        `Response body should contain: ${expectedContent}`
      );
    }
  };
}

/**
 * Validate HTML document structure
 * @param {string} html - Complete HTML document
 */
export function assertValidHTMLDocument(html) {
  // Check for basic HTML document structure
  assert.ok(html.includes('<!DOCTYPE html>'), 'Should have DOCTYPE declaration');
  assert.ok(html.includes('<html'), 'Should have html tag');
  assert.ok(html.includes('<head>'), 'Should have head section');
  assert.ok(html.includes('<body>'), 'Should have body section');
  assert.ok(html.includes('</html>'), 'Should close html tag');
}

/**
 * Assert that code highlighting is applied correctly
 * @param {string} html - HTML with highlighted code
 * @param {string} language - Expected language class
 */
export function assertCodeHighlighting(html, language) {
  assert.ok(
    html.includes(`language-${language}`),
    `Should contain language class: language-${language}`
  );
  assert.ok(
    html.includes('<pre') || html.includes('<code'),
    'Should contain code or pre elements'
  );
}