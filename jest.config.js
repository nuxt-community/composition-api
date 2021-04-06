module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  verbose: true,
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/test/unit/setup'],
  moduleNameMapper: {
    '~composition-api-globals': '<rootDir>/src/globals-mock',
  },
}
