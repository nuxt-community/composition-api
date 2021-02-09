import { InjectionKey } from '@vue/composition-api'
import type { Store } from 'vuex'

import { getCurrentInstance } from './utils'

const wrapProperty = (
  property: keyof NonNullable<ReturnType<typeof getCurrentInstance>>
) => {
  return () => {
    const vm = getCurrentInstance()
    if (!vm) throw new Error('This must be called within a setup function.')

    return vm[property]
  }
}

/**
 * Gain access to the router just like using this.$router in a non-Composition API manner.
 */
export const useRouter = wrapProperty('$router')

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
