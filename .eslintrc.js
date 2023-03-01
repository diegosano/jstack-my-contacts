module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 0,
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'consistent-return': 'off',
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_|next',
    }],
  },
};
