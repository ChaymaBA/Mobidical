

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Allows global variables like `expect` and `vi` in tests
    environment: 'node', // Use Node.js environment for backend testing
    setupFiles: ['./vitest.setup.ts'], // Optional setup file for global hooks
    include: ['src/**/__tests__/**/*'],
    exclude: ['node_modules'], // Exclude these directories from tests

    coverage: {
      provider: 'v8', // Use V8 engine for coverage collection
      reporter: ['text', 'json', 'html'], // Coverage formats
      include: ['src/**/*.ts'],
      exclude: [
        'node_modules/',
         'src/**/__tests__/**',
    ],
    },
  },
});

