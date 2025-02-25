// eslint.config.js
const typescriptEslintParser = require('@typescript-eslint/parser');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import');
const nodePlugin = require('eslint-plugin-node');

module.exports = [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        // Define any globals here; for example, `console` or `process`
        process: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      import: importPlugin,
      node: nodePlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/order': ['warn', { 'newlines-between': 'always' }],
      'no-console': 'warn',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        },
      },
    },
  },
];
