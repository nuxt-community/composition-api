import { computed } from 'vue'

import type { Ref } from 'vue'
import type { Context } from '@nuxt/types'
import type { Route } from 'vue-router'

import { getContext } from 'unctx'
import { globalNuxt } from '@nuxtjs/composition-api/dist/runtime/globals'
import { getCurrentInstance } from './utils'

interface ContextCallback {
  (context: Context): void
}

/**
 * @deprecated
 * Recommend using `useContext` instead
 */
export const withContext = (callback: ContextCallback) => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('This must be called within a setup function.')

  callback((vm[globalNuxt] || vm.$options).context)
}

interface UseContextReturn
  extends Omit<Context, 'route' | 'query' | 'from' | 'params'> {
  route: Ref<Route>
  query: Ref<Route['query']>
  from: Ref<Context['from']>
  params: Ref<Route['params']>
}

const nuxtCtx = getContext<UseContextReturn>('nuxt-context')

/**
 * Ensures that the setup function passed in has access to the Nuxt instance via `useContext`.
 *
 * @param context useContext response
 * @param setup The function to call
 * @param args Function's arguments
 */
export function callWithContext<T extends (...args: any[]) => any>(
  context: UseContextReturn,
  setup: T,
  args?: Parameters<T>
) {
  const fn: () => ReturnType<T> = () =>
    args ? setup(...(args as Parameters<T>)) : setup()
  if (process.server) {
    return nuxtCtx.callAsync(context, fn)
  } else {
    // In client side we could assume nuxt app is singleton
    nuxtCtx.set(context)
    return fn()
  }
}

/**
 * `useContext` will return the Nuxt context.
 * @example
  ```ts
  import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      const { store } = useContext()
      store.dispatch('myAction')
    },
  })
  ```
 */
export const useContext = (): UseContextReturn => {
  const nuxtContext = nuxtCtx.tryUse()

  if (!nuxtContext) {
    const vm = getCurrentInstance()
    if (!vm) {
      throw new Error('This must be called within a setup function.')
    }

    const context = {
      ...(vm[globalNuxt] || vm.$options).context,
      /**
       * @deprecated To smooth your upgrade to Nuxt 3, it is recommended not to access `route` from `useContext` but rather to use the `useRoute` helper function.
       */
      route: computed(() => vm.$route),
      /**
       * @deprecated To smooth your upgrade to Nuxt 3, it is recommended not to access `query` from `useContext` but rather to use the `useRoute` helper function.
       */
      query: computed(() => vm.$route.query),
      /**
       * @deprecated To smooth your upgrade to Nuxt 3, it is recommended not to access `from` from `useContext` but rather to use the `useRoute` helper function.
       */
      from: computed(() => (vm[globalNuxt] || vm.$options).context.from),
      /**
       * @deprecated To smooth your upgrade to Nuxt 3, it is recommended not to access `params` from `useContext` but rather to use the `useRoute` helper function.
       */
      params: computed(() => vm.$route.params),
    }

    if (process.client) nuxtCtx.set(context)
    return context
  }

  return nuxtContext
}
