import { Plugin } from '@nuxt/types'

const pluginHooks = new Set<Plugin>()

export const usePlugin = (callback: Plugin) => {
  pluginHooks.add(callback)
}

export const callPluginHooks: Plugin = (ctx, inject) => {
  pluginHooks.forEach(hook => hook(ctx, inject))
}
