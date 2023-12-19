/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['src/**/*.ts'],
      rules: {
        quotes: [2, 'double',{
          "allowTemplateLiterals":true
        }],
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-unused-vars': 0,
  },
};
