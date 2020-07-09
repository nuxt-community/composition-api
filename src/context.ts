import { getCurrentInstance, computed, ref } from '@vue/composition-api'

import type { Ref } from '@vue/composition-api'
import type { Context } from '@nuxt/types'
import type { Route } from 'vue-router'

import { globalNuxt } from './globals'

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

  callback(vm[globalNuxt].context)
}

interface UseContextReturn
  extends Omit<Context, 'route' | 'query' | 'from' | 'params'> {
  route: Ref<Route>
  query: Ref<Route['query']>
  from: Ref<Route['redirectedFrom']>
  params: Ref<Route['params']>
}

// static context, including long-lived references to route
// based on route value, which can change.
let _context!: UseContextReturn

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

  if (_context === undefined) {
    _context = {
      ...vm[globalNuxt].context,
      route: ref(vm.$route),
      query: computed(() => _context.route.value.query),
      from: computed(() => _context.route.value.from),
      params: computed(() => _context.route.value.query.params),
    }
  } else {
    const {route, query, from, params, ...rest} = vm[globalNuxt].context
    Object.assign(_context, rest)
    _context.route.value = vm.$route
  }
  return _context
}
