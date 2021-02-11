import { computed, ComputedRef, InjectionKey } from '@vue/composition-api'
import type { Store } from 'vuex'

import { getCurrentInstance } from './utils'

export const wrapProperty = <
  K extends keyof NonNullable<ReturnType<typeof getCurrentInstance>>,
  T extends boolean = true
>(
  property: K,
  makeComputed?: T
) => {
  return (): T extends true
    ? ComputedRef<NonNullable<ReturnType<typeof getCurrentInstance>>[K]>
    : NonNullable<ReturnType<typeof getCurrentInstance>>[K] => {
    const vm = getCurrentInstance()
    if (!vm) throw new Error('This must be called within a setup function.')

    return makeComputed !== false
      ? (computed(() => vm[property]) as any)
      : vm[property]
  }
}

/**
 * Gain access to the router just like using this.$router in a non-Composition API manner.
 */
export const useRouter = wrapProperty('$router', false)

/**
 * Gain access to the route just like using this.$route in a non-Composition API manner.
 */
export const useRoute = wrapProperty('$route')

/**
 * Gain access to the store just like using this.$store in a non-Composition API manner.
 */
export const useStore = <S>(key?: InjectionKey<S>): Store<S> => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('This must be called within a setup function.')

  return vm.$store
}
