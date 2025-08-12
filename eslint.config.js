export default [
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { console: 'readonly', process: 'readonly', global: 'writable', window: 'readonly', document: 'readonly', Prism: 'readonly' }
    },
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  },
  { files: ['tests/**/*.js'], languageOptions: { globals: { test: 'readonly' } } },
  { ignores: ['node_modules/**', '.arc/**'] }
]