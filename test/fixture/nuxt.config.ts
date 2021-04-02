import { resolve } from 'upath'
import type { NuxtConfig } from '@nuxt/types'
import compositionAPIModule from '../../src/module'

const routes = ['/route/a', '/static/1', '/static/2', '/static/3']
const interval = 3000

const isGenerated = [process.env.GENERATE, process.env.NOW_BUILD].includes(
  'true'
)
const isPublic = process.env.NOW_BUILD === 'true'
const isTesting = process.env.NODE_ENV !== 'development' && !isPublic

const rootDir = resolve(__dirname, '../..')

export default <NuxtConfig>{
  target: isGenerated ? 'static' : 'server',
  publicRuntimeConfig: {
    globalInject: 'injected',
  },
  rootDir,
  srcDir: __dirname,
  plugins: ['~/plugins/global.js'],
  serverMiddleware: [
    {
      path: '/api/posts',
      handler: '~/api/posts',
    },
  ],
  head: {
    titleTemplate: title => `${title} - fixture`,
    noscript: [
      {
        innerHTML: 'Test',
      },
    ],
    link: isTesting
      ? []
      : [
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
  generate: {
    dir: isPublic ? 'dist/fixture' : undefined,
    crawler: false,
    routes,
    interval,
  },
  router: {
    base: isPublic ? '/fixture/' : undefined,
  },
  build: {
    publicPath: isPublic ? 'fixture' : undefined,
  },
  buildModules: [
    '@nuxt/typescript-build',
    compositionAPIModule as any
  ],
  pwa: {
    icon: false,
    manifest: false,
    workbox: false,
  },
}
