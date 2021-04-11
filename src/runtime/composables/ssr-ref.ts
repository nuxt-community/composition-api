import {
  customRef,
  onServerPrefetch,
  ref,
  shallowRef,
} from '@vue/composition-api'
import type { Ref } from '@vue/composition-api'

import { globalContext, globalNuxt } from '@nuxtjs/composition-api/dist/globals'
import { getCurrentInstance, validateKey } from './utils'

function getValue<T>(value: T | (() => T)): T {
  if (value instanceof Function) return value()
  return value
}

let globalRefs: any = {}

export function setSSRContext(app: any) {
  globalRefs = Object.assign({}, {})
  app.context.ssrContext.nuxt.globalRefs = globalRefs
}

const useServerData = () => {
  let type: 'globalRefs' | 'ssrRefs' = 'globalRefs'

  const vm = getCurrentInstance()

  if (vm) {
    type = 'ssrRefs'
    if (process.server) {
      const { ssrContext } = (vm[globalNuxt] || vm.$options).context
      ;(ssrContext as any).nuxt.ssrRefs = (ssrContext as any).nuxt.ssrRefs || {}
    }
  }

  const setData = (key: string, val: any) => {
    switch (type) {
      case 'globalRefs':
        globalRefs[key] = sanitise(val)
        break
      case 'ssrRefs':
        ;(vm![globalNuxt].context.ssrContext as any).nuxt.ssrRefs[
          key
        ] = sanitise(val)
    }
  }

  return { type, setData }
}

const isProxyable = (val: unknown): val is Record<string, unknown> =>
  !!val && typeof val === 'object'

export const sanitise = (val: unknown) =>
  (val && JSON.parse(JSON.stringify(val))) || val

const ssrValue = <T>(
  value: T | (() => T),
  key: string,
  type: 'globalRefs' | 'ssrRefs' = 'globalRefs'
): T => {
  if (process.client) {
    if (
      process.env.NODE_ENV === 'development' &&
      window[globalNuxt]?.context.isHMR
    ) {
      return getValue(value)
    }
    return (window as any)[globalContext]?.[type]?.[key] ?? getValue(value)
  }
  return getValue(value)
}

/**
 * `ssrRef` will automatically add ref values to `window.__NUXT__` on SSR if they have been changed from their initial value. It can be used outside of components, such as in shared utility functions, and it supports passing a factory function that will generate the initial value of the ref. **At the moment, an `ssrRef` is only suitable for one-offs, unless you provide your own unique key.**
 * @param value This can be an initial value or a factory function that will be executed on server-side to get the initial value.
 * @param key Under the hood, `ssrRef` requires a key to ensure that the ref values match between client and server. If you have added `@nuxtjs/composition-api/module` to your `buildModules`, this will be done automagically by an injected Babel plugin. If you need to do things differently, you can specify a key manually or add `@nuxtjs/composition-api/babel` to your Babel plugins.
 * @example
  ```ts
  import { ssrRef } from '@nuxtjs/composition-api'

  const val = ssrRef('')

  // When hard-reloaded, `val` will be initialised to 'server set'
  if (process.server) val.value = 'server set'

  // When hard-reloaded, the result of myExpensiveSetterFunction() will
  // be encoded in nuxtState and used as the initial value of this ref.
  // If client-loaded, the setter function will run to come up with initial value.
  const val2 = ssrRef(myExpensiveSetterFunction)
  ```
 */
export const ssrRef = <T>(value: T | (() => T), key?: string): Ref<T> => {
  validateKey(key)

  const { type, setData } = useServerData()

  let val = ssrValue(value, key, type)

  if (process.client) return ref(val) as Ref<T>

  if (value instanceof Function) setData(key, val)

  const getProxy = <T extends Record<string | number, any>>(
    track: () => void,
    trigger: () => void,
    observable: T
  ): T =>
    new Proxy(observable, {
      get(target, prop: string) {
        track()
        if (isProxyable(target[prop]))
          return getProxy(track, trigger, target[prop])
        return Reflect.get(target, prop)
      },
      set(obj, prop, newVal) {
        const result = Reflect.set(obj, prop, newVal)
        setData(key, val)
        trigger()
        return result
      },
    })

  const proxy = customRef((track, trigger) => ({
    get: () => {
      track()
      if (isProxyable(val)) return getProxy(track, trigger, val)
      return val
    },
    set: (v: T) => {
      setData(key, v)
      val = v
      trigger()
    },
  }))

  return proxy
}

/**
 * This helper creates a [`shallowRef`](https://vue-composition-api-rfc.netlify.app/api.html#shallowref) (a ref that tracks its own .value mutation but doesn't make its value reactive) that is synced between client & server.
 * @param value This can be an initial value or a factory function that will be executed on server-side to get the initial value.
 * @param key Under the hood, `shallowSsrRef` requires a key to ensure that the ref values match between client and server. If you have added `@nuxtjs/composition-api/module` to your `buildModules`, this will be done automagically by an injected Babel plugin. If you need to do things differently, you can specify a key manually or add `@nuxtjs/composition-api/babel` to your Babel plugins.

 * @example
  ```ts
  import { shallowSsrRef, onMounted } from '@nuxtjs/composition-api'

  const shallow = shallowSsrRef({ v: 'init' })
  if (process.server) shallow.value = { v: 'changed' }

  // On client-side, shallow.value will be { v: changed }
  onMounted(() => {
    // This and other changes outside of setup won't trigger component updates.
    shallow.value.v = 'Hello World'
  })
  ```
 */
export const shallowSsrRef = <T>(
  value: T | (() => T),
  key?: string
): Ref<T> => {
  validateKey(key)
  const { type, setData } = useServerData()

  if (process.client) return shallowRef(ssrValue(value, key, type))

  const _val = getValue(value)

  if (value instanceof Function) {
    setData(key, _val)
  }

  return customRef((track, trigger) => ({
    get() {
      track()
      return _val
    },
    set(newValue: T) {
      setData(key, newValue)
      value = newValue
      trigger()
    },
  }))
}

/**
 * `ssrPromise` runs a promise on the server and serialises the result as a resolved promise for the client. It needs to be run within the `setup()` function but note that it returns a promise which will require special handling. (For example, you cannot just return a promise from setup and use it in the template.)
 * @param value This can be an initial value or a factory function that will be executed on server-side to get the initial value.
 * @param key Under the hood, `ssrPromise` requires a key to ensure that the ref values match between client and server. If you have added `@nuxtjs/composition-api/module` to your `buildModules`, this will be done automagically by an injected Babel plugin. If you need to do things differently, you can specify a key manually or add `@nuxtjs/composition-api/babel` to your Babel plugins.
 * @example

    ```ts
    import {
      defineComponent,
      onBeforeMount,
      ref,
      ssrPromise,
    } from '@nuxtjs/composition-api'

    export default defineComponent({
      setup() {
        const _promise = ssrPromise(async () => myAsyncFunction())
        const resolvedPromise = ref(null)

        onBeforeMount(async () => {
          resolvedPromise.value = await _promise
        })

        return {
          // On the server, this will be null until the promise resolves.
          // On the client, if server-rendered, this will always be the resolved promise.
          resolvedPromise,
        }
      },
    })
    ```
 */
export const ssrPromise = <T>(
  value: () => Promise<T>,
  key?: string
): Promise<T> => {
  validateKey(key)
  const { type, setData } = useServerData()

  const val = ssrValue(value, key, type)
  if (process.client) return Promise.resolve(val)

  onServerPrefetch(async () => {
    setData(key, await val)
  })
  return val
}
