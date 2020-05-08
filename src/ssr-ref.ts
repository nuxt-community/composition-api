import { ref, Ref } from '@vue/composition-api'
import { onFinalServerPrefetch } from './server-prefetch'

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

  const val = getValue(value)
  const initVal = clone(val)
  const _ref = ref(val) as Ref<T>

  onFinalServerPrefetch(() => {
    if (value instanceof Function || initVal !== _ref.value)
      data[key] = _ref.value
  })

  return _ref
}
