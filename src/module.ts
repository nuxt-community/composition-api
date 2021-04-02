import { withTrailingSlash } from 'ufo'

import type { Module, NuxtOptions } from '@nuxt/types'

import { name, version } from '../package.json'

import { prepareUseStatic } from './static'
import {
  addResolvedTemplate,
  getNuxtGlobals,
  isFullStatic,
  isUrl,
  resolveCoreJsVersion,
  resolveRelativePath,
} from './utils'
import { registerBabelPlugin } from './babel-register'

const compositionApiModule: Module<never> = function compositionApiModule() {
  const nuxtOptions: NuxtOptions = this.nuxt.options

  // Register entrypoint (where all user-facing content consumed within vite/webpack is located)

  const { staticPath } = prepareUseStatic.call(this)
  const { globalContext, globalNuxt } = getNuxtGlobals.call(this)

  const routerBase = withTrailingSlash(nuxtOptions.router.base)
  const publicPath = withTrailingSlash(nuxtOptions.build.publicPath)

  const globalsFile = addResolvedTemplate.call(
    this,
    'runtime/templates/globals.js',
    {
      // useFetch
      isFullStatic: isFullStatic(nuxtOptions),
      // useStatic
      staticPath,
      publicPath: isUrl(publicPath) ? publicPath : routerBase,
      // Throughout
      globalContext,
      globalNuxt,
    }
  )

  nuxtOptions.alias['~composition-api-globals'] = globalsFile

  nuxtOptions.alias['@nuxtjs/composition-api'] = resolveRelativePath('index')
  console.log(nuxtOptions.alias['@nuxtjs/composition-api'])

  // Define @vue/composition-api resolution to prevent issues with registrations

  nuxtOptions.alias['@vue/composition-api'] = this.nuxt.resolver.resolveModule(
    '@vue/composition-api'
  )

  // Transpile the Nuxt Composition API to force alias resolution
  // TODO: remove this when we stop shadowing module

  nuxtOptions.build.transpile = nuxtOptions.build.transpile || []
  nuxtOptions.build.transpile.push('@nuxtjs/composition-api')

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

  addResolvedTemplate.call(this, 'runtime/templates/polyfill.client.js', {
    corejsPolyfill: resolveCoreJsVersion.call(this),
  })

  // Plugin to allow running onGlobalSetup
  const globalPlugin = addResolvedTemplate.call(
    this,
    'runtime/templates/plugin.js'
  )

  this.nuxt.hook('modules:done', () => {
    nuxtOptions.plugins.unshift(globalPlugin)
  })

  // TODO: remove
  // Allow setting head() within onGlobalSetup

  if (
    !nuxtOptions.buildModules.includes('@nuxtjs/pwa') &&
    !nuxtOptions.modules.includes('@nuxtjs/pwa')
  ) {
    nuxtOptions.plugins.push(
      addResolvedTemplate.call(this, 'runtime/templates/meta.js')
    )
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
