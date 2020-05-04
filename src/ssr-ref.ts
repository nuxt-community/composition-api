import {
  ref,
  onServerPrefetch as prefetch,
  getCurrentInstance,
  Ref,
} from '@vue/composition-api'

function getValue(value: any) {
  if (typeof value === 'function') return value()
  return value
}

let ssrContext: any

const refs: [string, Ref<any>][] = []

export function injectRefs() {
  if (!process.server) return

  if (!ssrContext.nuxt.ssrRefs) ssrContext.nuxt.ssrRefs = {}

  refs.forEach(([key, ref]) => {
    ssrContext.nuxt.ssrRefs[key] = ref.value
  })
}

export const ssrRef = <T>(value: T, key?: string) => {
  const val = ref<T>(getValue(value))
  const vm = getCurrentInstance()!

  if (!key)
    throw new Error(
      "You must provide a key. You can have it generated automatically by adding 'nuxt-composition-api/babel' to your Babel plugins."
    )

  if (!ssrContext) {
    ssrContext = ssrContext || vm.$ssrContext
    prefetch(injectRefs)
  }

  if (process.client) {
    const nuxtState = (window as any).__NUXT__
    val.value = (nuxtState.ssrRefs || {})[key!] ?? getValue(value)
  } else {
    refs.push([key, val])
  }

  return val
}

export const onServerPrefetch = (callback: Function) => {
  prefetch(async () => {
    await callback()
    injectRefs()
  })
}
