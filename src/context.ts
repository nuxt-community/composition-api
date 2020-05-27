import { getCurrentInstance, computed } from '@vue/composition-api'

import type { Context } from '@nuxt/types'

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

  callback(vm['<%= options.globalNuxt %>' as '$nuxt'].context)
}

/**
 * `useContext` which will return the Nuxt context.
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
export const useContext = () => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('This must be called within a setup function.')

  return {
    ...vm['<%= options.globalNuxt %>' as '$nuxt'].context,
    route: computed(() => vm.$route),
    query: computed(() => vm.$route.query),
    from: computed(() => vm.$route.redirectedFrom),
    params: computed(() => vm.$route.params),
  }
}
