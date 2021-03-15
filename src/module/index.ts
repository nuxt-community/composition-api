import { basename, join } from 'upath'
import { withTrailingSlash } from 'ufo'
import { readdirSync, copyFileSync, existsSync, mkdirpSync } from 'fs-extra'

import type { Module, NuxtConfig, ServerMiddleware } from '@nuxt/types'
import type { ModuleThis } from '@nuxt/types/config/module'

import { name, version } from '../../package.json'

import { compositionApiPlugin } from './vite'

function isFullStatic(options: NuxtConfig) {
  return (
    !options.dev &&
    !options._legacyGenerate &&
    options.target === 'static' &&
    options.render?.ssr
  )
}

function isUrl(url: string) {
  return ['http', '//'].some(str => url.startsWith(str))
}

function addResolvedTemplate(
  this: ModuleThis,
  template: string,
  options: Record<string, any> = {}
) {
  const src = require.resolve(`@nuxtjs/composition-api/${template}`)
  return this.addTemplate({
    src,
    fileName: join('composition-api', basename(src)),
    options,
  })
}

const compositionApiModule: Module<any> = function compositionApiModule() {
  let corejsPolyfill = this.nuxt.options.build.corejs
    ? String(this.nuxt.options.build.corejs)
    : undefined
  try {
    if (!['2', '3'].includes(corejsPolyfill || '')) {
      // eslint-disable-next-line
      const corejsPkg = this.nuxt.resolver.requireModule('core-js/package.json')
      corejsPolyfill = corejsPkg.version.slice(0, 1)
    }
  } catch {
    corejsPolyfill = undefined
  }

  const { dst: pluginDst } = addResolvedTemplate.call(
    this,
    'templates/plugin.js'
  )
  const { dst: metaDst } = addResolvedTemplate.call(this, 'templates/meta.js')

  addResolvedTemplate.call(this, 'templates/polyfill.client.js', {
    corejsPolyfill,
  })

  const staticPath = join(this.options.buildDir || '', 'static-json')

  this.nuxt.hook('builder:prepared', () => {
    mkdirpSync(staticPath)
  })

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

  const routerBase = withTrailingSlash(this.options.router?.base)
  const publicPath = withTrailingSlash(this.options.build?.publicPath)

  const { dst: entryDst } = addResolvedTemplate.call(this, 'entrypoint', {
    isFullStatic: isFullStatic(this.nuxt.options),
    staticPath: staticPath,
    publicPath: isUrl(publicPath) ? publicPath : routerBase,
    globalContext,
    globalNuxt,
  })

  const entryFile = join(this.options.buildDir || '', entryDst)

  this.options.build.transpile = this.options.build.transpile || []
  this.options.build.transpile.push('@nuxtjs/composition-api')

  if (!this.nuxt.options.dev) {
    this.options.build.transpile.push('@vue/composition-api')
  }

  // Fake alias to prevent shadowing actual node_module
  this.options.alias['@nuxtjs/composition-api'] = entryFile

  this.nuxt.hook('vite:extend', (ctx: any) => {
    ctx.config.plugins.push(compositionApiPlugin())
    ctx.config.optimizeDeps.exclude.push('@vue/composition-api')
    ctx.config.resolve.alias['~nuxtjs-composition-api'] = entryFile
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

  const actualPresets = this.options.build.babel.presets

  this.options.build.babel.presets = (
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

  this.options.plugins = this.options.plugins || []
  this.options.plugins.unshift(join(this.options.buildDir || '', pluginDst))
  if (
    !(this.nuxt.options.buildModules || []).includes('@nuxtjs/pwa') &&
    !this.nuxt.options.modules.includes('@nuxtjs/pwa')
  ) {
    this.options.plugins.push(join(this.options.buildDir || '', metaDst))
  } else if (this.nuxt.options.dev) {
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

const warnToAddModule = () => {
  console.error(
    'You need to add `@nuxtjs/composition-api` to your buildModules in order to use it. See https://composition-api.nuxtjs.org/getting-started/setup.'
  )
  throw new Error(
    'You need to add `@nuxtjs/composition-api` to your buildModules in order to use it. See https://composition-api.nuxtjs.org/getting-started/setup.'
  )
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
const helperFunctions: string[] = JSON.parse(`__HELPER_FUNCTIONS__`)
helperFunctions.forEach(helper => {
  // @ts-ignore
  compositionApiModule[helper] = warnToAddModule
})

// @ts-ignore
compositionApiModule.defineNuxtConfig = (config: NuxtConfig) => config
// @ts-ignore
compositionApiModule.defineServerMiddleware = (smw: ServerMiddleware) => smw
// @ts-ignore
compositionApiModule.defineNuxtModule = (mod: Module<any>) => mod
/* eslint-enable @typescript-eslint/ban-ts-comment */

export default compositionApiModule
