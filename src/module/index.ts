import type { Module, NuxtOptions } from '@nuxt/types'
import { resolve } from 'upath'

import { name, version } from '../../package.json'

import { registerBabelPlugin } from './babel-register'
import { addGlobalsFile } from './globals-register'
import { addResolvedTemplate, resolveCoreJsVersion } from './utils'

const compositionApiModule: Module<never> = function compositionApiModule() {
  const nuxt = this.nuxt as { options: NuxtOptions }

  // Register globals file where Nuxt config can be accessed from live library

  addGlobalsFile.call(this)

  // Force transpilation of this library (to enable resolution of globals file)

  const runtimeDir = resolve(__dirname, '../runtime')
  nuxt.options.build.transpile = nuxt.options.build.transpile || []
  nuxt.options.build.transpile.push('@nuxtjs/composition-api', runtimeDir)

  // Turn off webpack4 module context for .mjs files (as it appears to have some issues)

  this.extendBuild(config => {
    if (!config.module) return

    config.module.rules.forEach(rule => {
      if (rule.test instanceof RegExp && rule.test.test('index.mjs')) {
        rule.type = 'javascript/auto'
      }
    })

    config.module.rules.unshift({
      test: /\.mjs$/,
      type: 'javascript/auto',
      include: [/node_modules/],
    })
  })

  // If we're using nuxt-vite, register vite plugin for injecting keys

  this.nuxt.hook('vite:extend', async (ctx: any) => {
    const { compositionApiPlugin } = await import('./vite-plugin')
    ctx.config.plugins.push(compositionApiPlugin())
  })

  // If we're using Babel, register Babel plugin for injecting keys

  registerBabelPlugin.call(this)

  // Add appropriate corejs polyfill for IE support

  addResolvedTemplate.call(this, 'polyfill.client.mjs', {
    corejsPolyfill: resolveCoreJsVersion.call(this),
  })

  // Plugin to allow running onGlobalSetup
  const globalPlugin = addResolvedTemplate.call(this, 'plugin.mjs')

  // Allow setting head() within onGlobalSetup
  const metaPlugin = addResolvedTemplate.call(this, 'meta.mjs')

  this.nuxt.hook('modules:done', () => {
    nuxt.options.plugins.push(metaPlugin)
    nuxt.options.plugins.unshift(globalPlugin)
  })

  if (!this.nuxt.options.capi?.disableMigrationWarning) {
    this.nuxt.hook('build:done', () => {
      console.info(
        "`Nuxt Bridge has now been released in beta.` It has full composition API support and it's strongly recommended to migrate from `@nuxtjs/composition-api`, if possible, by following the steps at `https://v3.nuxtjs.org/getting-started/bridge`. Feedback welcome at `https://github.com/nuxt-community/composition-api/discussions/585`.\n"
      )
    })
  }
}

// eslint-disable-next-line
// @ts-ignore
compositionApiModule.meta = {
  name,
  version,
}

export default compositionApiModule
