# Testing Framework Design Document

## Overview

This design outlines a comprehensive testing framework for the blueprints.sanity.io documentation site built with Architect Framework and Enhance SSR. The testing strategy employs a focused approach with unit tests for components and integration tests for the HTTP handlers. The framework will use Node.js built-in testing tools that work well with ES modules and the existing tech stack.

## Architecture

### Testing Stack Selection

**Primary Testing Framework: Node.js Built-in Test Runner**
- Native ES module support (matches project's `"type": "module"`)
- Zero external dependencies - uses Node.js built-in `node:test` module
- Built-in assertions with `node:assert`
- Native coverage reporting with `--experimental-test-coverage`
- Fast execution and minimal setup

**Component Testing: happy-dom**
- Lightweight DOM environment for server-side rendering tests
- Minimal setup for testing HTML output
- Works well with Enhance SSR components
- No browser dependency for unit tests

**CI/CD Integration: GitHub Actions**
- Automated test execution on push and pull requests
- Test result reporting and status checks
- Coverage reporting integration
- Artifact storage for test results

### Test Directory Structure

```
tests/
├── unit/
│   ├── elements/
│   │   ├── bp-layout.test.js
│   │   ├── bp-sidebar.test.js
│   │   ├── bp-code.test.js
│   │   ├── bp-code-json.test.js
│   │   ├── bp-code-ts.test.js
│   │   ├── bp-jsonschema.test.js
│   │   └── bp-debug.test.js
│   ├── ui.test.js
│   └── utils/
│       └── test-helpers.js
├── integration/
│   ├── routing.test.js
│   ├── json-endpoints.test.js
│   └── caching.test.js
└── fixtures/
    ├── sample-pages/
    └── mock-data/
```

## Components and Interfaces

### Unit Testing Components

**Element Test Utilities (`tests/utils/test-helpers.js`)**
```javascript
import { strict as assert } from 'node:assert';

// Utility functions for testing Enhance components
export function renderElement(elementFunction, props = {}) {
  // Render element with mock Enhance context
  const mockContext = { html: (strings, ...values) => String.raw(strings, ...values) };
  return elementFunction.call(mockContext, props);
}

export function createMockState(overrides = {}) {
  // Create mock application state
  return { path: '/', ...overrides };
}

export function assertHTMLStructure(html, expectedStructure) {
  // Validate HTML output structure using Node.js assertions
  assert.ok(html.includes(expectedStructure), `HTML should contain: ${expectedStructure}`);
}
```

**Component Test Pattern**
Each element will follow a consistent testing pattern:
- Render with default props
- Test with various prop combinations
- Validate HTML output structure
- Test error handling for invalid inputs
- Verify accessibility attributes

### Integration Testing Components

**HTTP Handler Testing (`tests/integration/routing.test.js`)**
- Mock Architect's `arc.http` context
- Test both JSON and HTML route handlers
- Validate response status codes and headers
- Test caching behavior
- Error handling for missing files

**Cache Testing (`tests/integration/caching.test.js`)**
- Test file caching between requests
- Validate cache invalidation
- Memory usage monitoring
- Performance impact measurement



## Data Models

### Test Configuration

**Node.js Test Runner Configuration (`package.json` scripts)**
```json
{
  "scripts": {
    "test": "node --test tests/**/*.test.js",
    "test:watch": "node --test --watch tests/**/*.test.js",
    "test:coverage": "node --test --experimental-test-coverage tests/**/*.test.js",
    "test:unit": "node --test tests/unit/**/*.test.js",
    "test:integration": "node --test tests/integration/**/*.test.js"
  }
}
```

**Test Setup (`tests/setup.js`)**
```javascript
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// Global test setup for DOM environment
global.setupDOM = () => {
  // Setup happy-dom or jsdom if needed
};
```

**GitHub Actions Configuration (`.github/workflows/test.yml`)**
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run test:coverage
```

### Test Data Models

**Mock Request Object**
```javascript
const mockRequest = {
  path: '/concepts/stacks',
  rawPath: '/concepts/stacks.html',
  method: 'GET',
  headers: {},
  body: ''
}
```

**Expected Response Structure**
```javascript
const expectedHTMLResponse = {
  html: string,
  statusCode?: number
}

const expectedJSONResponse = {
  statusCode: 200,
  isBase64Encoded: false,
  headers: { 'content-type': 'application/json' },
  body: string
}
```

## Error Handling

### Test Error Categories

**Unit Test Errors**
- Component rendering failures
- Invalid prop handling
- HTML structure validation errors
- Accessibility compliance failures

**Integration Test Errors**
- HTTP handler exceptions
- File system access errors
- Cache corruption issues
- Response format validation errors



### Error Recovery Strategies

**Graceful Degradation Testing**
- Test behavior when syntax highlighting fails
- Validate fallback content for missing files
- Ensure progressive enhancement works without JavaScript
- Test error page rendering for 404s

**Resource Management Testing**
- Validate memory leak prevention in cache system
- Ensure graceful handling of slow file system operations
- Test timeout handling for long-running operations

## Testing Strategy

### Test Execution Phases

**Development Phase**
- Watch mode for rapid feedback during development
- Pre-commit hooks to run relevant tests
- IDE integration for inline test results
- Hot reload for test files

**CI/CD Integration**
- Parallel test execution for faster feedback
- Test result reporting and artifact storage
- Coverage reporting with trend analysis
- Performance regression detection

**Deployment Validation**
- Smoke tests after deployment
- Health check endpoints
- Performance monitoring integration
- Error tracking and alerting

### Coverage Requirements

**Minimum Coverage Thresholds**
- Unit tests: 90% line coverage for components
- Integration tests: 85% coverage for HTTP handlers

**Coverage Exclusions**
- Third-party library code (prismjs, parse5)
- Development-only utilities
- Error handling for system-level failures
- Browser-specific polyfills

### Test Data Management

**Fixture Management**
- Sample HTML pages for testing rendering
- Mock JSON schema files
- Test-specific CSS for styling validation
- Sample error responses

**Test Isolation**
- Each test runs with fresh cache state
- File system mocking for predictable behavior
- Network request mocking for external dependencies
- Database state reset between integration tests

This design provides a robust foundation for ensuring the blueprints.sanity.io site remains reliable, performant, and maintainable as it evolves.