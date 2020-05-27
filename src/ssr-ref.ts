import { ref, computed } from '@vue/composition-api'
import type { Ref } from '@vue/composition-api'

function getValue<T>(value: T | (() => T)): T {
  if (value instanceof Function) return value()
  return value
}

let data: any = {}

export function setSSRContext(ssrContext: any) {
  data = Object.assign({}, {})
  ssrContext.nuxt.ssrRefs = data
}

const isProxyable = (val: unknown): val is Record<string, unknown> =>
  val && typeof val === 'object'

const sanitise = (val: unknown) =>
  (val && JSON.parse(JSON.stringify(val))) || val

/**
 * `ssrRef` will automatically add ref values to `window.__NUXT__` on SSR if they have been changed from their initial value. It can be used outside of components, such as in shared utility functions, and it supports passing a factory function that will generate the initial value of the ref. **At the moment, an `ssrRef` is only suitable for one-offs, unless you provide your own unique key.**
 * @param value This can be an initial value or a factory function that will be executed on server-side to get the initial value.
 * @param key Under the hood, `ssrRef` requires a key to ensure that the ref values match between client and server. If you have added `nuxt-composition-api` to your `buildModules`, this will be done automagically by an injected Babel plugin. If you need to do things differently, you can specify a key manually or add `nuxt-composition-api/babel` to your Babel plugins.
 * @example
  ```ts
  import { ssrRef } from 'nuxt-composition-api'

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
  if (!key) {
    throw new Error(
      "You must provide a key. You can have it generated automatically by adding 'nuxt-composition-api/babel' to your Babel plugins."
    )
  }

  if (process.client) {
    return ref(
      (window as any)['<%= options.globalContext %>']?.ssrRefs?.[key] ??
        getValue(value)
    )
  }

  const val = getValue(value)
  const _ref = ref(val)

  if (value instanceof Function) data[key] = sanitise(val)

  const getProxy = <T extends Record<string | number, any>>(observable: T): T =>
    new Proxy(observable, {
      get(target, prop: string | number) {
        if (isProxyable(target[prop])) return getProxy(target[prop])
        return Reflect.get(target, prop)
      },
      set(obj, prop, val) {
        const result = Reflect.set(obj, prop, val)
        data[key] = sanitise(_ref.value)
        return result
      },
    })

  const proxy = computed({
    get: () => (isProxyable(_ref.value) ? getProxy(_ref.value) : _ref.value),
    set: v => {
      data[key] = sanitise(v)
      _ref.value = v
    },
  })

  return proxy as Ref<T>
}

// TODO: remove when https://github.com/vuejs/composition-api/pull/311 is merged
function shallowRef<T>(value: T): Ref<T> {
  return computed({
    get: () => value,
    set: v => (value = v),
  })
}

/**
 * This helper creates a [`shallowRef`](https://vue-composition-api-rfc.netlify.app/api.html#shallowref) (a ref that tracks its own .value mutation but doesn't make its value reactive) that is synced between client & server.
 * @param value This can be an initial value or a factory function that will be executed on server-side to get the initial value.
 * @param key Under the hood, `shallowSsrRef` requires a key to ensure that the ref values match between client and server. If you have added `nuxt-composition-api` to your `buildModules`, this will be done automagically by an injected Babel plugin. If you need to do things differently, you can specify a key manually or add `nuxt-composition-api/babel` to your Babel plugins.
 
 * @example
  ```ts
  import { shallowSsrRef, onMounted } from 'nuxt-composition-api'

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
  if (!key) {
    throw new Error(
      "You must provide a key. You can have it generated automatically by adding 'nuxt-composition-api/babel' to your Babel plugins."
    )
  }

  if (process.client) {
    return shallowRef(
      (window as any)['<%= options.globalContext %>']?.ssrRefs?.[key] ??
        getValue(value)
    )
  }

  let _val = getValue(value)

  if (value instanceof Function) {
    data[key] = sanitise(_val)
  }

  return computed({
    get: () => _val,
    set: v => {
      data[key] = sanitise(v)
      _val = v
    },
  })
}
