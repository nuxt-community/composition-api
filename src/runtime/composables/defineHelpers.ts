import {
  Middleware,
  Plugin,
  Module,
  ServerMiddleware,
  NuxtConfig,
} from '@nuxt/types'

export const defineNuxtPlugin = (plugin: Plugin) => plugin
export const defineNuxtMiddleware = (middleware: Middleware) => middleware
/**
 * @deprecated
 */
export const defineNuxtModule = <T extends Record<string, unknown>>(
  module: Module<T>
) => module

/**
 * @deprecated
 */
export const defineNuxtServerMiddleware = (
  serverMiddleware: ServerMiddleware
) => serverMiddleware
/**
 * @deprecated
 */
export const defineNuxtConfig = (config: NuxtConfig) => config
