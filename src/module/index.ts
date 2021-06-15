import { defineNuxtModule, extendBuild, resolveModule } from '@nuxt/kit'
import { resolve } from 'upath'
import type { Configuration } from 'webpack'

import { name } from '../../package.json'

import { registerBabelPlugin } from './babel-register'
import { addGlobalsFile } from './globals-register'
import { addResolvedTemplate, resolveCoreJsVersion } from './utils'

export default defineNuxtModule({
  name,
  setup(_options, nuxt) {
    const nuxtOptions = nuxt.options

    // Register globals file where Nuxt config can be accessed from live library

    addGlobalsFile()

    // Force transpilation of this library (to enable resolution of globals file)

    const runtimeDir = resolve(__dirname, 'runtime')
    nuxtOptions.build.transpile.push('@nuxtjs/composition-api', runtimeDir)

    // Define @vue/composition-api resolution to prevent using different versions of @vue/composition-api

    nuxtOptions.alias['@vue/composition-api'] =
      nuxtOptions.alias['@vue/composition-api'] ||
      resolveModule('@vue/composition-api/dist/vue-composition-api.esm.js')

    // Define @nuxtjs/composition-api resolution to ensure plugins register global context successfully

    nuxtOptions.alias['@nuxtjs/composition-api'] =
      nuxtOptions.alias['@nuxtjs/composition-api'] ||
      resolveModule('@nuxtjs/composition-api').replace('.js', '.mjs')

    // Register the Vue Composition API for webpack

    const registration = addResolvedTemplate('register.mjs')
    nuxt.hook('webpack:config', (config: Configuration[]) => {
      config.forEach(config => {
        const entry = config.entry as Record<string, string[]>
        entry.app.unshift(registration)
      })
    })

    // Turn off webpack4 module context for .mjs files (as it appears to have some issues)

    extendBuild((config: Configuration) => {
      if (!config.module) return

      config.module.rules.forEach(rule => {
        if (rule.test instanceof RegExp && rule.test.test('index.mjs')) {
          rule.type = 'javascript/auto'
        }
      })
    })

    // If we're using nuxt-vite, register vite plugin & inject configuration

    const viteMiddleware = addResolvedTemplate('middleware.mjs')
    nuxt.hook('vite:extend', async ctx => {
      const { compositionApiPlugin } = await import('./vite-plugin')
      ctx.config.plugins.push(compositionApiPlugin())
      ctx.config.resolve.alias['./middleware.js'] = viteMiddleware
    })

    // If we're using Babel, register Babel plugin for injecting keys

    registerBabelPlugin()

    // Add appropriate corejs polyfill for IE support

    addResolvedTemplate('polyfill.client.mjs', {
      corejsPolyfill: resolveCoreJsVersion(),
    })

    // Plugin to allow running onGlobalSetup
    const globalPlugin = addResolvedTemplate('plugin.mjs')

    // Allow setting head() within onGlobalSetup
    const metaPlugin = addResolvedTemplate('meta.mjs')

    nuxt.hook('modules:done', () => {
      nuxtOptions.plugins.push(metaPlugin)
      nuxtOptions.plugins.unshift(globalPlugin)
    })
  },
})
