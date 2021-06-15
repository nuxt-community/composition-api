import { useNuxt } from '@nuxt/kit'
import { resolveRelativePath } from './utils'

export function registerBabelPlugin() {
  const nuxt = useNuxt()

  /**
   * Add Composition API plugin to inject key automatically
   */

  const babelOptions = nuxt.options.build.babel as any
  babelOptions.plugins = babelOptions.plugins || []

  if (babelOptions.plugins instanceof Function) {
    console.warn(
      'Unable to automatically add Babel plugin. Make sure your custom `build.babel.plugins` returns `@nuxtjs/composition-api/dist/babel-plugin`'
    )
  } else {
    babelOptions.plugins.push(resolveRelativePath('../babel-plugin'))
  }

  /**
   * Opt in to Composition API support in Babel preset
   */

  const actualPresets = nuxt.options.build.babel.presets
  nuxt.options.build.babel.presets = (
    env: any,
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
