import { computed } from '@vue/composition-api'

import type { Ref } from '@vue/composition-api'
import type { Context } from '@nuxt/types'
import type { Route } from 'vue-router'

import { globalNuxt } from '@nuxtjs/composition-api/dist/globals'
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
  const vm = getCurrentInstance()
  if (!vm) throw new Error('This must be called within a setup function.')

  return {
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
}
