import { resolve, join } from 'path'
import { rmdirSync, readdirSync, copyFileSync, existsSync, mkdirSync } from 'fs'

import type { Module } from '@nuxt/types'

const compositionApiModule: Module<any> = function () {
  const libRoot = resolve(__dirname, '..')

  let corejsPolyfill
  try {
    // eslint-disable-next-line
    const corejsPkg = require('core-js/package.json')
    corejsPolyfill = corejsPkg.version.slice(0, 1)
  } catch {
    corejsPolyfill = undefined
  }

  const { dst: pluginDst } = this.addTemplate({
    src: resolve(libRoot, 'lib', 'plugin.js'),
    fileName: join('composition-api', 'plugin.js'),
    options: {
      corejsPolyfill,
    },
  })

  const staticPath = join(this.options.buildDir || '', 'static-json')

  this.nuxt.hook('generate:before', () => {
    if (existsSync(staticPath)) rmdirSync(staticPath)
    mkdirSync(staticPath)
  })

  this.nuxt.hook('generate:done', async (generator: any) => {
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
      staticPath,
      publicPath: join(this.options.router?.base || '', '/'),
      globalContext,
      globalNuxt,
    },
  })

  this.options.build = this.options.build || {}
  this.options.build.babel = this.options.build.babel || {}
  this.options.build.babel.plugins = this.options.build.babel.plugins || []
  if (this.options.build.babel.plugins instanceof Function) {
    console.warn(
      'Unable to automatically add Babel plugin. Make sure your custom `build.babel.plugins` returns `nuxt-composition-api/babel`'
    )
  } else {
    this.options.build.babel.plugins.push(join(__dirname, 'babel'))
  }

  this.options.build.transpile = this.options.build.transpile || []
  this.options.build.transpile.push(/nuxt-composition-api/)

  this.extendBuild(config => {
    config.resolve = config.resolve || {}
    config.resolve.alias = config.resolve.alias || {}
    config.resolve.alias['nuxt-composition-api'] = resolve(
      this.options.buildDir || '',
      entryDst
    )
  })

  this.options.plugins = this.options.plugins || []
  this.options.plugins.unshift(resolve(this.options.buildDir || '', pluginDst))
}

export default compositionApiModule
// eslint-disable-next-line
export const meta = require('../package.json')

export * from './entrypoint'
