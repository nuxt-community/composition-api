import type { NuxtConfig } from '@nuxt/types'

import { name, version } from '../package.json'

import { compositionApiModule } from './module'

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

const helperFunctions: string[] = JSON.parse(`__HELPER_FUNCTIONS__`)
helperFunctions.forEach(helper => {
  // eslint-disable-next-line
  // @ts-ignore
  compositionApiModule[helper] = warnToAddModule
})

// eslint-disable-next-line
// @ts-ignore
compositionApiModule.defineNuxtConfig = (config: NuxtConfig) => config

export default compositionApiModule
