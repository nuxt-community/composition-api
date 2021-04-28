module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  verbose: true,
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/test/unit/setup'],
  moduleNameMapper: {
    '@nuxtjs/composition-api/dist/globals': '<rootDir>/src/globals',
    '@nuxtjs/composition-api/dist/register': '<rootDir>/src/register',
  },
}
