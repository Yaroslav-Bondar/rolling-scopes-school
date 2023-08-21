module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  overrides: [
    {
      files: [
        '*.ts',
        '*.tsx',
        '*.d.ts',
      ],
      plugins: [
        '@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      extends: ['airbnb-base', 'airbnb-typescript/base'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
