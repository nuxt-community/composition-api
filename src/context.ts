import { getCurrentInstance } from '@vue/composition-api'

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

  callback(vm.$nuxt.context)
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

  return vm.$nuxt.context
}
