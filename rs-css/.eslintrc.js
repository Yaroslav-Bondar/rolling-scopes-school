// module.exports = {
//   env: {
//     browser: true,
//     es2021: true
//   },
//   extends: 'standard-with-typescript',
//   overrides: [
//   ],
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module'
//   },
//   rules: {
//   }
// }

/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  'rules': {
    'semi': ['error', 'never'],
    'quotes': [2, 'single']
  },
  root: true
}
