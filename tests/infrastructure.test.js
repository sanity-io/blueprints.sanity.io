import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { 
  renderElement, 
  createMockState, 
  assertHTMLStructure,
  createMockRequest
} from './utils/test-helpers.js'

test('test infrastructure setup', async (t) => {
  await t.test('should have working test utilities', () => {
    // Test renderElement utility
    const mockElement = function(props = {}) {
      return this.html`<div class="test">${props.content || 'default'}</div>`
    }
    
    const result = renderElement(mockElement, { content: 'hello' })
    assert.ok(result.includes('hello'))
    assert.ok(result.includes('class="test"'))
  })

  await t.test('should create mock state correctly', () => {
    const state = createMockState({ path: '/test' })
    assert.strictEqual(state.path, '/test')
    assert.ok(state.store)
  })

  await t.test('should validate HTML structure', () => {
    const html = '<div class="container"><p>Content</p></div>'
    assertHTMLStructure(html, 'class="container"')
    assertHTMLStructure(html, '<p>Content</p>')
  })

  await t.test('should create mock request objects', () => {
    const request = createMockRequest({ path: '/test', method: 'POST' })
    assert.strictEqual(request.path, '/test')
    assert.strictEqual(request.method, 'POST')
    assert.ok(request.headers)
  })
})