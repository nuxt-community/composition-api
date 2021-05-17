import { copyFileSync, existsSync, mkdirpSync, readdirSync } from 'fs-extra'
import { join } from 'upath'

import type { NuxtOptions } from '@nuxt/types'
import type { ModuleThis } from '@nuxt/types/config/module'

export function prepareUseStatic(this: ModuleThis) {
  const nuxtOptions: NuxtOptions = this.nuxt.options

  const staticPath = join(nuxtOptions.buildDir, 'static-json')

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

  return { staticPath }
}
