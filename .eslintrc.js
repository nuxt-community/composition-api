module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    'prettier/prettier': [
      1,
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
        arrowParens: 'avoid',
      },
    ],
    '@typescript-eslint/no-inferrable-types': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
  },
  extends: [
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
}
