module.exports = {
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['test', '.babelrc.js'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}
