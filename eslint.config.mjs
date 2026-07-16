import js from '@eslint/js'
import nextConfig from 'eslint-config-next/core-web-vitals'
import globals from 'globals'

export default [
  {
    ignores: ['**/.next/**', '**/dist/**', '**/node_modules/**', '**/next-env.d.ts', 'design/**'],
  },
  js.configs.recommended,
  ...nextConfig,
  {
    files: ['**/*.{ts,tsx}'],
    settings: {
      react: {
        version: '19.2',
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
  {
    files: ['packages/**/*.{ts,tsx}'],
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
]
