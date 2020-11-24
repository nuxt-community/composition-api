import type { Plugin } from '@nuxt/types'
import type { SetupContext } from '@vue/composition-api'
import { getHeadOptions } from './meta'

import { reqRefs } from './req-ref'
import { setSSRContext } from './ssr-ref'

type SetupFunction = (
  this: void,
  props: Record<string, unknown>,
  ctx: SetupContext
) => void | Record<any, any>

let globalSetup: Set<SetupFunction>

/**
 * Run a callback function in the global setup function. This should be called from a Nuxt plugin.
 * @param fn The function to run in the setup function. It receives the global props and context.
 * @example
    ```ts
    import { onGlobalSetup } from '@nuxtjs/composition-api'
    
    export default () => {
      onGlobalSetup(() => {
        provide('globalKey', true)
      })
    }
    ```
 */
export const onGlobalSetup = (fn: SetupFunction) => {
  globalSetup.add(fn)
}

/**
 * @private
 */
export const globalPlugin: Plugin = context => {
  const { setup } = context.app
  globalSetup = new Set<SetupFunction>()
  if (process.server) {
    reqRefs.forEach(reset => reset())
  }

  const { head } = context.app
  Object.assign(context.app, getHeadOptions({ head: head as any }))

  context.app.setup = function (...args) {
    let result = {}
    if (setup instanceof Function) {
      result = setup(...args) || {}
    }
    for (const fn of globalSetup) {
      result = { ...result, ...(fn.call(this, ...args) || {}) }
    }
    return result
  }

  if (!process.server) return
  if (context.app.context.ssrContext) {
    setSSRContext(context.app.context.ssrContext)
  }
}
