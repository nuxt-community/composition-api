import { resolve, join } from 'path'

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

  const globalName = this.options.globalName || 'nuxt'
  const globalContextFactory =
    this.options.globals?.context ||
    (globalName => `__${globalName.toUpperCase()}__`)
  const globalNuxtFactory =
    this.options.globals?.nuxt || (globalName => `$${globalName}`)
  const globalContext = globalContextFactory(globalName)
  const globalNuxt = globalNuxtFactory(globalName)

  const { dst: entryDst } = this.addTemplate({
    src: resolve(libRoot, 'lib', 'entrypoint.js'),
    fileName: join('composition-api', 'index.js'),
    options: {
      globalContext,
      globalNuxt,
    },
  })

  this.options.build = this.options.build || {}
  this.options.build.babel = this.options.build.babel || {}
  this.options.build.babel.plugins = this.options.build.babel.plugins || []
  this.options.build.babel.plugins.push(join(__dirname, 'babel'))

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
