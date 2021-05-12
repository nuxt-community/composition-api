import { join, resolve } from 'upath'
import type { NuxtConfig } from '@nuxt/types'

const routes = ['/route/a', '/static/1', '/static/2', '/static/3']
const interval = 3000

const isGenerated = process.env.GENERATE === 'true'
const isTesting = process.env.NODE_ENV !== 'development'

const rootDir = resolve(__dirname, '../..')

const inDevelopment = !process.env.TEST_BUILT_MODULE

console.log('Testing', inDevelopment ? 'source' : 'built', 'module')

export default <NuxtConfig>{
  alias: {
    '@nuxtjs/composition-api/dist/runtime/register': join(
      rootDir,
      inDevelopment ? 'src' : 'dist',
      'runtime/register'
    ),
    '@nuxtjs/composition-api/dist/runtime/globals': join(
      rootDir,
      inDevelopment ? 'src' : 'dist',
      'runtime/globals'
    ),
    '@nuxtjs/composition-api': join(
      rootDir,
      inDevelopment ? 'src/index.ts' : 'dist/index.js'
    ),
  },
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
    dir: 'test/fixture/dist',
    crawler: false,
    routes,
    interval,
  },
  buildModules: [
    '@nuxt/typescript-build',
    join(rootDir, inDevelopment ? 'src' : 'dist', 'module'),
  ],
  pwa: {
    icon: false,
    manifest: false,
    workbox: false,
  },
}
