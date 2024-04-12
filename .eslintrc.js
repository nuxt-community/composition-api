module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 1,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  extends: [
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
}
