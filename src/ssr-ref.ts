import { ref, Ref } from '@vue/composition-api'
import { onServerPrefetchEnd } from './server-prefetch'

function getValue(value: any): any {
  if (typeof value === 'function') return value()
  return value
}

let data: any = {}

export function setSSRContext(ssrContext: any) {
  ssrContext.nuxt.ssrRefs = data
}

/**
 * Creates a Ref wich is in sync with the client.
 */
export const ssrRef = <T>(value: T, key?: string): Ref<T> => {
  if (!key) {
    throw new Error(
      "You must provide a key. You can have it generated automatically by adding 'nuxt-composition-api/babel' to your Babel plugins."
    )
  }

  if (process.server) {
    if (typeof value === 'function') {
      const sref = ref(getValue(value)) as Ref<T>
      onServerPrefetchEnd(() => (data[key] = sref.value))

      return sref
    } else {
      const val = getValue(value)
      const initVal =
        typeof val === 'object' ? JSON.parse(JSON.stringify(val)) : val
      const sref = ref(val) as Ref<T>

      onServerPrefetchEnd(() =>
        initVal !== sref.value ? (data[key] = sref.value) : null
      )

      return sref
    }
  } else {
    return ref((window as any).__NUXT__?.ssrRefs?.[key] ?? getValue(value))
  }
}
