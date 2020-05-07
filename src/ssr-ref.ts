import { ref, Ref, onServerPrefetch as prefetch } from '@vue/composition-api'

function getValue<T>(value: T | (() => T)): T {
  if (value instanceof Function) return value()
  return value
}

let ssrContext: any
let injected = false

const refs: [string, Ref<any>][] = []

export function setSSRContext(context: any) {
  ssrContext = ssrContext || context
}

export function injectRefs() {
  if (!process.server || !ssrContext) return

  if (!ssrContext.nuxt.ssrRefs) ssrContext.nuxt.ssrRefs = {}

  refs.forEach(([key, ref]) => {
    ssrContext.nuxt.ssrRefs[key] = JSON.parse(JSON.stringify(ref.value))
  })
}

export const ssrRef = <T>(value: T | (() => T), key?: string): Ref<T> => {
  const val = ref<T>(getValue(value))

  if (!key)
    throw new Error(
      "You must provide a key. You can have it generated automatically by adding 'nuxt-composition-api/babel' to your Babel plugins."
    )

  if (!injected) {
    prefetch(injectRefs)
    injected = true
  }

  if (process.client) {
    const nuxtState = (window as any).__NUXT__
    val.value = (nuxtState.ssrRefs || {})[key!] ?? getValue(value)
  } else {
    refs.push([key, val])
  }

  return val as Ref<T>
}

export const onServerPrefetch = (callback: Function) => {
  prefetch(async () => {
    await callback()
    injectRefs()
  })
}
