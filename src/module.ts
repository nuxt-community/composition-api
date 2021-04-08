import type { Module, NuxtOptions } from '@nuxt/types'

import { name, version } from '../package.json'

import { registerBabelPlugin } from './babel-register'
import { addGlobalsFile } from './globals'
import {
  addResolvedTemplate,
  resolveCoreJsVersion,
  resolveRelativePath,
} from './utils'

const compositionApiModule: Module<never> = function compositionApiModule() {
  const nuxtOptions: NuxtOptions = this.nuxt.options

  // Register globals file where Nuxt config can be accessed from live library

  addGlobalsFile.call(this)

  // Define @vue/composition-api resolution to prevent using different versions of @vue/composition-api

  nuxtOptions.alias['@vue/composition-api'] = this.nuxt.resolver.resolveModule(
    '@vue/composition-api/dist/vue-composition-api.esm.js'
  )

  // Register the Vue Composition API before any other layouts

  this.addLayout(resolveRelativePath('runtime/templates/layout.js'), '0')

  // If we're using nuxt-vite, register vite plugin & inject configuration

  this.nuxt.hook('vite:extend', async (ctx: any) => {
    const { compositionApiPlugin } = await import('./vite-plugin')
    ctx.config.plugins.push(compositionApiPlugin())
  })

  // If we're using Babel, register Babel plugin for injecting keys

  registerBabelPlugin.call(this)

  // Add appropriate corejs polyfill for IE support

  addResolvedTemplate.call(this, 'polyfill.client.js', {
    corejsPolyfill: resolveCoreJsVersion.call(this),
  })

  // Plugin to allow running onGlobalSetup
  const globalPlugin = addResolvedTemplate.call(this, 'plugin.js')

  this.nuxt.hook('modules:done', () => {
    nuxtOptions.plugins.unshift(globalPlugin)
  })

  // TODO: remove
  // Allow setting head() within onGlobalSetup

  if (
    !nuxtOptions.buildModules.includes('@nuxtjs/pwa') &&
    !nuxtOptions.modules.includes('@nuxtjs/pwa')
  ) {
    nuxtOptions.plugins.push(addResolvedTemplate.call(this, 'meta.js'))
  } else if (nuxtOptions.dev) {
    console.warn(
      'useMeta is not supported in onGlobalSetup as @nuxtjs/pwa detected.\nSee https://github.com/nuxt-community/composition-api/issues/307'
    )
  }
}

// eslint-disable-next-line
// @ts-ignore
compositionApiModule.meta = {
  name,
  version,
}

export default compositionApiModule
// export * from './defineHelpers'
