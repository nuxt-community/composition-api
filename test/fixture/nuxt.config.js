// eslint-disable-next-line
const { resolve } = require('path')

const routes = ['/context/a', '/static/1', '/static/2', '/static/3']

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  serverMiddleware: [
    {
      path: '/api/posts',
      handler: (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify({ id: req.url.slice(1) }))
      },
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
        },
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
