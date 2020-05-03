import { Plugin, Context } from '@nuxt/types'

interface Inject {
  (key: string, value: any): void
}

interface LocalPlugin {
  (ctx: Context, inject: Inject): any
}

const pluginHooks = new Set<Plugin>()
const callbacks = new WeakMap<Plugin, (value?: any) => void>()

let hasRun = false
let globalContext: Context
let globalInject: Inject

export const useAsyncPlugin = <T extends LocalPlugin>(
  callback: T
): Promise<ReturnType<T>> => {
  if (hasRun) {
    return callback(globalContext, globalInject)
  } else {
    return new Promise(resolve => {
      pluginHooks.add(callback)
      callbacks.set(callback, resolve)
    })
  }
}

export const callPluginHooks: Plugin = (ctx, inject) => {
  globalContext = ctx
  globalInject = inject

  pluginHooks.forEach(hook => {
    hook(ctx, inject)
  })

  hasRun = true
}
