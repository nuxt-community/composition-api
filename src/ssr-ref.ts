import { ref, Ref, computed } from '@vue/composition-api'

function getValue<T>(value: T | (() => T)): T {
  if (value instanceof Function) return value()
  return value
}

let data: any = {}

export function setSSRContext(ssrContext: any) {
  data = Object.assign({}, {})
  ssrContext.nuxt.ssrRefs = data
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
  const _ref = ref(val)

  if (value instanceof Function) data[key] = val

  const proxy = computed({
    get: () => _ref.value,
    set: v => {
      data[key] = v
      _ref.value = v
    },
  })

  return proxy as Ref<T>
}
