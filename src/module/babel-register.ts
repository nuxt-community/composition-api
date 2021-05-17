import type { NuxtOptions } from '@nuxt/types'
import type { ModuleThis } from '@nuxt/types/config/module'

export function registerBabelPlugin(this: ModuleThis) {
  const nuxtOptions: NuxtOptions = this.nuxt.options

  /**
   * Add Composition API plugin to inject key automatically
   */

  nuxtOptions.build.babel = nuxtOptions.build.babel || {}
  nuxtOptions.build.babel.plugins = nuxtOptions.build.babel.plugins || []

  if (nuxtOptions.build.babel.plugins instanceof Function) {
    console.warn(
      'Unable to automatically add Babel plugin. Make sure your custom `build.babel.plugins` returns `@nuxtjs/composition-api/dist/babel-plugin`'
    )
  } else {
    nuxtOptions.build.babel.plugins.push(
      require.resolve('@nuxtjs/composition-api/dist/babel-plugin')
    )
  }

  /**
   * Opt in to Composition API support in Babel preset
   */

  const actualPresets = nuxtOptions.build.babel.presets
  nuxtOptions.build.babel.presets = (
    env,
    [defaultPreset, defaultOptions]: [string, Record<string, any>]
  ) => {
    const newOptions = {
      ...defaultOptions,
      jsx: {
        ...(typeof defaultOptions.jsx === 'object' ? defaultOptions.jsx : {}),
        compositionAPI: true,
      },
    }

    if (typeof actualPresets === 'function') {
      return actualPresets(env, [defaultPreset, newOptions])
    }

    return [[defaultPreset, newOptions]]
  }
}
