import { getCurrentInstance, computed } from '@vue/composition-api'

import type { Ref } from '@vue/composition-api'
import type { Context } from '@nuxt/types'
import type { Route } from 'vue-router'

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

  callback(
    vm[
      '<%= options.globalNuxt %>'.includes('options')
        ? '$nuxt'
        : ('<%= options.globalNuxt %>' as '$nuxt')
    ].context
  )
}

interface UseContextReturn
  extends Omit<Context, 'route' | 'query' | 'from' | 'params'> {
  route: Ref<Route>
  query: Ref<Route['query']>
  from: Ref<Route['redirectedFrom']>
  params: Ref<Route['params']>
}

/**
 * `useContext` will return the Nuxt context.
 * @example
  ```ts
  import { defineComponent, ref, useContext } from 'nuxt-composition-api'

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
    ...vm[
      '<%= options.globalNuxt %>'.includes('options')
        ? '$nuxt'
        : ('<%= options.globalNuxt %>' as '$nuxt')
    ].context,
    route: computed(() => vm.$route),
    query: computed(() => vm.$route.query),
    from: computed(() => vm.$route.redirectedFrom),
    params: computed(() => vm.$route.params),
  }
}
