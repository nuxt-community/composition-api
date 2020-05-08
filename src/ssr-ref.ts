import { ref, Ref, computed } from '@vue/composition-api'
import { onServerPrefetchEnd } from './server-prefetch'

function getValue<T>(value: T | (() => T)): T {
  if (value instanceof Function) return value()
  return value
}

let data: any = {}

export function setSSRContext(ssrContext: any) {
  ssrContext.nuxt.ssrRefs = data
}

function clone<T>(obj: T): T {
  if (typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj))
  } else {
    return obj
  }
}

/**
 * Creates a Ref that is in sync with the client.
 */
export const ssrRef = <T>(value: T | (() => T), key?: string): Ref<T> => {
  if (!key) {
    throw new Error(
      "You must provide a key. You can have it generated automatically by adding 'nuxt-composition-api/babel' to your Babel plugins."
    )
  }

  if (process.client) {
    return ref((window as any).__NUXT__?.ssrRefs?.[key] ?? getValue(value))
  }

  if (typeof value === 'function') {
    const _ref = ref(getValue(value)) as Ref<T>
    onServerPrefetchEnd(() => (data[key] = _ref.value))

    return _ref
  } else {
    const val = getValue(value)
    const initVal = clone(val)
    const _ref = ref(val) as Ref<T>

    onServerPrefetchEnd(() => {
      if (initVal !== _ref.value) {
        data[key] = _ref.value
      }
    })

    return _ref
  }
}

// TODO: remove when https://github.com/vuejs/composition-api/pull/311 is merged
function shallowRef<T>(value: T): Ref<T> {
  return computed({
    get: () => value,
    set: v => (value = v),
  })
}

/**
 * Creates a shallowRef that is in sync with the client.
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
      (window as any).__NUXT__?.ssrRefs?.[key] ?? getValue(value)
    )
  }

  let _val = getValue(value)

  if (typeof value === 'function') {
    data[key] = _val
  }

  return computed({
    get: () => _val,
    set: v => {
      _val = v
      data[key] = v
    },
  })
}
