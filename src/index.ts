import type { NuxtConfig } from '@nuxt/types'

import { compositionApiModule } from './module'

export default compositionApiModule

const warnToAddModule = () => {
  console.error(
    'You need to add `@nuxtjs/composition-api` to your buildModules in order to use it. See https://composition-api.nuxtjs.org/getting-started/setup.'
  )
  throw new Error(
    'You need to add `@nuxtjs/composition-api` to your buildModules in order to use it. See https://composition-api.nuxtjs.org/getting-started/setup.'
  )
}

// eslint-disable-next-line
Object.keys(require('./entrypoint')).forEach(helper => {
  // eslint-disable-next-line
  // @ts-ignore
  compositionApiModule[helper] = warnToAddModule
})

// eslint-disable-next-line
// @ts-ignore
compositionApiModule.defineNuxtConfig = (config: NuxtConfig) => config
