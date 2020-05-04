import { ref, onServerPrefetch, getCurrentInstance } from '@vue/composition-api'

function getValue(value: any) {
  if (typeof value === 'function') return value()
  return value
}

export const ssrRef = <T>(value: T, key?: string) => {
  const val = ref<T>(getValue(value))
  const vm = getCurrentInstance()!

  onServerPrefetch(() => {
    if (!vm.$ssrContext.nuxt.ssrRefs) vm.$ssrContext.nuxt.ssrRefs = {}
    vm.$ssrContext.nuxt.ssrRefs[key!] = val.value
  })

  if (process.client) {
    const nuxtState = (window as any).__NUXT__
    val.value = (nuxtState.ssrRefs || {})[key!] ?? getValue(value)
  }

  return val
}
