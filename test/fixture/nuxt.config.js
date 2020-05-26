// eslint-disable-next-line
const { resolve } = require('path')

const routes = ['/context/a']

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  head: {
    link: [
      {
        rel: "stylesheet", href: "https://newcss.net/lite.css"
      }
    ]
  },
  ...(process.env.NOW_BUILD === 'true'
    ? {
        generate: {
          dir: 'dist/fixture',
          routes
        },
        router: {
          base: '/fixture/',
        },
        build: {
          publicPath: 'fixture',
        },
      }
    : {
      generate: {
        routes,
      }
    }),
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
