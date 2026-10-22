const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettier = require('eslint-config-prettier');

module.exports = defineConfig([
  {
    ignores: [
      'dist/**',
      'api/**',
      'node_modules/**',
      '.expo/**',
      'coverage/**',
    ],
  },
  expoConfig,
  prettier,
]);
