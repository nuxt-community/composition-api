import { resolve, join } from 'path'
import { readdirSync, copyFileSync, existsSync, mkdirpSync } from 'fs-extra'

import type { Module } from '@nuxt/types'
import normalize from 'normalize-path'

const loadUtils = () => {
  try {
    // Try to load nuxt edge utils first
    return require('@nuxt/utils-edge')
  } catch {
    // if it fails, fall back to normal nuxt utils
    return require('@nuxt/utils')
  }
}

const utils = loadUtils()

const compositionApiModule: Module<any> = function () {
  const libRoot = resolve(__dirname, '..')

  let corejsPolyfill = this.nuxt.options.build.corejs
    ? String(this.nuxt.options.build.corejs)
    : undefined
  try {
    if (!['2', '3'].includes(corejsPolyfill || '')) {
      // eslint-disable-next-line
      const corejsPkg = require('core-js/package.json')
      corejsPolyfill = corejsPkg.version.slice(0, 1)
    }
  } catch {
    corejsPolyfill = undefined
  }

  const { dst: pluginDst } = this.addTemplate({
    src: resolve(libRoot, 'templates', 'plugin.js'),
    fileName: join('composition-api', 'plugin.js'),
    options: {
      corejsPolyfill,
    },
  })

  const { dst: metaPluginDst } = this.addTemplate({
    src: resolve(libRoot, 'templates', 'meta.js'),
    fileName: join('composition-api', 'meta.js'),
  })

  const staticPath = join(this.options.buildDir || '', 'static-json')

  this.nuxt.hook('generate:route', () => {
    mkdirpSync(staticPath)
  })

  this.nuxt.hook('generate:done', async (generator: any) => {
    if (!existsSync(staticPath)) return

    const { distPath } = generator
    readdirSync(staticPath).forEach(file =>
      copyFileSync(join(staticPath, file), join(distPath, file))
    )
  })

  const globalName = this.options.globalName || 'nuxt'
  const globalContextFactory =
    this.options.globals?.context ||
    ((globalName: string) => `__${globalName.toUpperCase()}__`)
  const globalNuxtFactory =
    this.options.globals?.nuxt || ((globalName: string) => `$${globalName}`)
  const globalContext = globalContextFactory(globalName)
  const globalNuxt = globalNuxtFactory(globalName)

  const { dst: entryDst } = this.addTemplate({
    src: resolve(libRoot, 'lib', 'entrypoint.js'),
    fileName: join('composition-api', 'index.js'),
    options: {
      isFullStatic: 'isFullStatic' in utils && utils.isFullStatic(this.options),
      staticPath: normalize(staticPath),
      publicPath: normalize(join(this.options.router?.base || '', '/')),
      globalContext,
      globalNuxt,
    },
  })

  this.options.build = this.options.build || {}
  this.options.build.babel = this.options.build.babel || {}
  this.options.build.babel.plugins = this.options.build.babel.plugins || []
  if (this.options.build.babel.plugins instanceof Function) {
    console.warn(
      'Unable to automatically add Babel plugin. Make sure your custom `build.babel.plugins` returns `@nuxtjs/composition-api/babel`'
    )
  } else {
    this.options.build.babel.plugins.push(join(__dirname, 'babel'))
  }

  this.options.build.transpile = this.options.build.transpile || []
  this.options.build.transpile.push(/@nuxtjs[\\/]composition-api/)

  this.extendBuild(config => {
    config.resolve = config.resolve || {}
    config.resolve.alias = config.resolve.alias || {}
    config.resolve.alias['@nuxtjs/composition-api'] = resolve(
      this.options.buildDir || '',
      entryDst
    )
  })

  this.options.plugins = this.options.plugins || []
  this.options.plugins.unshift(resolve(this.options.buildDir || '', pluginDst))
  if (
    !(this.nuxt.options.buildModules || []).includes('@nuxtjs/pwa') &&
    !this.nuxt.options.modules.includes('@nuxtjs/pwa')
  ) {
    this.options.plugins.push(
      resolve(this.options.buildDir || '', metaPluginDst)
    )
  } else if (this.nuxt.options.dev) {
    console.warn(
      'useMeta is not supported in onGlobalSetup as @nuxtjs/pwa detected.\nSee https://github.com/nuxt-community/composition-api/issues/307'
    )
  }
}

export default compositionApiModule
// eslint-disable-next-line
export const meta = require('../package.json')

export * from './entrypoint'
