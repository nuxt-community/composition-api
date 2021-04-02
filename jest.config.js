module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  verbose: true,
  setupFiles: ['<rootDir>/test/unit/setup'],
}
