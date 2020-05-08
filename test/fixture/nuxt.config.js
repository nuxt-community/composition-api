// eslint-disable-next-line
const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  head: {
    title: 'My fixture',
  },
  buildModules: [
    process.env.NODE_ENV === 'test'
      ? require('../..').default
      : require.resolve('../..'),
  ],
  build: {
    extend(config) {
      config.resolve.alias['nuxt-composition-api'] = resolve(__dirname, '../..')
    },
  },
}
