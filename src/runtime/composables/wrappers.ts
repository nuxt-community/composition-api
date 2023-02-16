import { computed, ComputedRef, InjectionKey, isRef } from 'vue'
import type { Store } from 'vuex'
import type { VueRouter } from 'vue-router/types/router'
import { useContext } from './context'

import { getCurrentInstance } from './utils'
import { Context } from '@nuxt/types'

/**
 * You might want to create a custom helper to 'convert' a non-Composition API property to a Composition-ready one. `wrapProperty` enables you to do that easily, returning either a computed or a bare property as required.
 * @param property the name of the property you would like to access. For example, `$store` to access `this.$store`.
 * @param makeComputed a boolean indicating whether the helper function should return a computed property or not. Defaults to `true`.
 */
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
 * You might want to create a custom helper to 'convert' a non-Composition Context property to a Composition-ready one. `wrapProperty` enables you to do that easily, returning either a computed or a bare property as required.
 * @param property the name of the property you would like to access. For example, `store` to access `context.store`.
 * @param makeComputed a boolean indicating whether the helper function should return a computed property or not. Defaults to `true`.
 */
export const wrapContextProperty = <
  K extends keyof Context,
  T extends boolean = true
>(
  property: K,
  makeComputed?: T
) => {
  return (): T extends true ? ComputedRef<Context[K]> : Context[K] => {
    const context = useContext()

    return makeComputed !== false && !isRef(context[property])
      ? (computed(() => context[property]) as any)
      : context[property]
  }
}

/**
 * Gain access to the router just like using this.$router in a non-Composition API manner.
 * @example
  ```ts
  import { defineComponent, useRouter } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      const router = useRouter()
      router.push('/')
    }
  })
  ```
 */
export const useRouter = (): VueRouter => {
  const contextRouter = useContext().app.router
  if (contextRouter) return contextRouter

  const vm = getCurrentInstance()
  if (!vm) throw new Error('This must be called within a setup function.')
  return vm.$router
}

/**
 * Gain safe access to the redirect method from Context
 * @example
 ```ts
 import { defineComponent, useRedirect } from '@nuxtjs/composition-api'

 export default defineComponent({
    setup() {
      useRedirect('/')
    }
  })
 ```
 */
export const useRedirect = wrapContextProperty('redirect')

/**
 * Returns `this.$route`, wrapped in a computed - so accessible from `.value`.
 * @example
  ```ts
  import { computed, defineComponent, useRoute } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      const route = useRoute()
      const id = computed(() => route.value.params.id)
    }
  })
  ```
 */
export const useRoute = wrapContextProperty('route')

/**
 * Gain access to the store just like using this.$store in a non-Composition API manner. You can also provide an injection key or custom type to get back a semi-typed store:
 * @example
  ```ts
  import { defineComponent, useStore } from '@nuxtjs/composition-api'

  export interface State {
    count: number
  }

  export const key: InjectionKey<Store<State>> = Symbol()

  export default defineComponent({
    setup() {
      const store = useStore()
      const store = useStore(key)
      const store = useStore<State>()
      // In both of these cases, store.state.count will be typed as a number
    }
  })
  ```
 */
export const useStore = <S>(key?: InjectionKey<S>): Store<S> => {
  return useContext().store
}
