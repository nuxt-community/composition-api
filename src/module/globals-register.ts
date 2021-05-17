import type { ModuleThis } from '@nuxt/types/config/module'
import { withTrailingSlash } from 'ufo'

import { prepareUseStatic } from './static'
import {
  addResolvedTemplate,
  getNuxtGlobals,
  isFullStatic,
  isUrl,
} from './utils'

export function addGlobalsFile(this: ModuleThis) {
  const nuxtOptions = this.options

  const { staticPath } = prepareUseStatic.call(this)
  const { globalContext, globalNuxt } = getNuxtGlobals.call(this)

  const routerBase = withTrailingSlash(nuxtOptions.router.base)
  const publicPath = withTrailingSlash(nuxtOptions.build.publicPath)

  const globals = {
    // useFetch
    isFullStatic: isFullStatic(nuxtOptions),
    // useStatic
    staticPath,
    publicPath: isUrl(publicPath) ? publicPath : routerBase,
    // Throughout
    globalContext,
    globalNuxt,
  }

  const contents = Object.entries(globals)
    .map(([key, value]) => `export const ${key} = ${JSON.stringify(value)}`)
    .join('\n')

  const globalsFile = addResolvedTemplate.call(this, 'globals.mjs', {
    contents,
  })

  nuxtOptions.alias['@nuxtjs/composition-api/dist/runtime/globals'] =
    globalsFile
}
