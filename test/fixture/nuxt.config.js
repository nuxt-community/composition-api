// eslint-disable-next-line
const { resolve } = require('path')

const routes = ['/context/a', '/static/1', '/static/2', '/static/3']
const interval = 2000

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  plugins: [resolve(__dirname, './plugins/global.js')],
  serverMiddleware: [
    {
      path: '/api/posts',
      handler: './api/posts',
    },
  ],
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://newcss.net/lite.css',
      },
    ],
  },
  ...(process.env.GLOBALS === 'true'
    ? {
        globalName: 'bob',
        globals: {
          nuxt: globalName => `$my${globalName}`,
        },
      }
    : {}),
  ...(process.env.NOW_BUILD === 'true'
    ? {
        generate: {
          dir: 'dist/fixture',
          routes,
          interval,
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
          interval,
        },
      }),
  buildModules: [
    process.env.NODE_ENV === 'test'
      ? require('../..').default
      : require.resolve('../..'),
  ],
}
