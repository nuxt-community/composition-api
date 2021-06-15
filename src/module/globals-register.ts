import { useNuxt } from '@nuxt/kit'
import { withTrailingSlash } from 'ufo'

import { prepareUseStatic } from './static'
import {
  addResolvedTemplate,
  getNuxtGlobals,
  isFullStatic,
  isUrl,
} from './utils'

export function addGlobalsFile() {
  const nuxt = useNuxt()

  const { staticPath } = prepareUseStatic()
  const { globalContext, globalNuxt } = getNuxtGlobals()

  const routerBase = withTrailingSlash(nuxt.options.router.base)
  const publicPath = withTrailingSlash(nuxt.options.build.publicPath)

  const globals = {
    // useFetch
    isFullStatic: isFullStatic(nuxt.options),
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

  const globalsFile = addResolvedTemplate('globals.mjs', {
    contents,
  })

  nuxt.options.alias['@nuxtjs/composition-api/dist/runtime/globals'] =
    globalsFile
}
