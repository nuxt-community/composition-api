import { copyFileSync, existsSync, mkdirpSync, readdirSync } from 'fs-extra'
import { join } from 'upath'

import { useNuxt } from '@nuxt/kit'

export function prepareUseStatic() {
  const nuxt = useNuxt()

  const staticPath = join(nuxt.options.buildDir, 'static-json')

  nuxt.hook('builder:prepared', () => {
    mkdirpSync(staticPath)
  })

  nuxt.hook('generate:route', () => {
    mkdirpSync(staticPath)
  })

  nuxt.hook('generate:done', async generator => {
    if (!existsSync(staticPath)) return

    const { distPath } = generator
    readdirSync(staticPath).forEach(file =>
      copyFileSync(join(staticPath, file), join(distPath, file))
    )
  })

  return { staticPath }
}
