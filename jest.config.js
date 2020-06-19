module.exports = {
  verbose: true,
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['test', '.babelrc.js'],
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/test/unit/setup'],
}
