import { useNuxt, addTemplate, NuxtConfig, requireModule } from '@nuxt/kit'
import { join, resolve } from 'upath'

export function isFullStatic(options: NuxtConfig) {
  return (
    !options.dev &&
    !options._legacyGenerate &&
    options.target === 'static' &&
    options.render?.ssr
  )
}

export function isUrl(url: string) {
  return ['http', '//'].some(str => url.startsWith(str))
}

export function resolveRelativePath(...path: string[]) {
  return resolve(__dirname, ...path)
}

export function addResolvedTemplate(
  template: string,
  options: Record<string, any> = {}
) {
  const nuxt = useNuxt()
  const src = resolveRelativePath(`../runtime/templates/${template}`)
  const filename = template.replace('register.mjs', 'register.js')
  const { dst } = addTemplate({
    src,
    fileName: join('composition-api', filename),
    options,
  })

  const templatePath = join(nuxt.options.buildDir, dst)

  return templatePath
}

export function resolveCoreJsVersion() {
  const nuxt = useNuxt()
  let corejsPolyfill = nuxt.options.build.corejs
    ? String(nuxt.options.build.corejs)
    : undefined
  try {
    if (!['2', '3'].includes(corejsPolyfill || '')) {
      // eslint-disable-next-line
      const corejsPkg = requireModule('core-js/package.json')
      corejsPolyfill = corejsPkg.version.slice(0, 1)
    }
  } catch {
    corejsPolyfill = undefined
  }
  return corejsPolyfill
}

export function getNuxtGlobals() {
  const nuxt = useNuxt()

  const globalName = nuxt.options.globalName
  const globalContextFactory =
    (nuxt.options.globals.context as (name: string) => string) ||
    ((globalName: string) => `__${globalName.toUpperCase()}__`)
  const globalNuxtFactory =
    (nuxt.options.globals.nuxt as (name: string) => string) ||
    ((globalName: string) => `$${globalName}`)
  const globalContext = globalContextFactory(globalName)
  const globalNuxt = globalNuxtFactory(globalName)

  return { globalContext, globalNuxt }
}
