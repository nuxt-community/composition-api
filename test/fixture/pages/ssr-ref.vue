<template>
  <div>
    <div>ref-{{ computedVal }}</div>
    <div>function-{{ funcValue }}</div>
    <div>prefetched-{{ prefetchValue }}</div>
    <nuxt-link to="/">home</nuxt-link>
  </div>
</template>

<script>
import { defineComponent, ref, computed, useFetch, ssrRef, onServerPrefetch } from 'nuxt-composition-api'

export function fetcher(result, time = 100) {
  return new Promise(resolve => {
    return setTimeout(() => {
      resolve(result)
    }, time)
  })
}

export default defineComponent({
  setup() {
    const refValue = ssrRef('')
    const prefetchValue = ssrRef('')
    const funcValue = ssrRef(() => 'runs SSR or client-side')

    const computedVal = computed(() => refValue.value)

    if (process.server) refValue.value = 'only SSR rendered'

    onServerPrefetch(async () => {
      prefetchValue.value = await fetcher('result', 500)
    })

    return {
      computedVal,
      funcValue,
      prefetchValue,
    }
  },
})
</script>
