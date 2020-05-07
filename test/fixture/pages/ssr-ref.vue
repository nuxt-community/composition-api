<template>
  <div>
    <div>ref-{{ computedVal }}</div>
    <div>function-{{ funcValue }}</div>
    <div>prefetched-{{ prefetchValue }}</div>
    <div>on: {{ asyncValue }}</div>
    <div>no-change: {{ noChange }}</div>
    <nuxt-link to="/">home</nuxt-link>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  useFetch,
  ssrRef,
  onServerPrefetch,
  useAsync,
} from 'nuxt-composition-api'

export function fetcher(result, time = 100) {
  return new Promise(resolve => {
    return setTimeout(() => {
      resolve(result)
    }, time)
  })
}

export default defineComponent({
  setup() {
    const refValue = ssrRef('') // changed => in __NUXT__
    const prefetchValue = ssrRef('') // changed => in __NUXT__
    const funcValue = ssrRef(() => 'runs SSR or client-side') // function => in __NUXT__
    const noChange = ssrRef('initValue') // no Change => not in __NUXT__

    const computedVal = computed(() => refValue.value)

    if (process.server) refValue.value = 'only SSR rendered'

    onServerPrefetch(async () => {
      prefetchValue.value = await fetcher('result', 500)
    })

    const asyncValue = useAsync(() =>
      fetcher(process.server ? 'server' : 'client', 500)
    )

    // Error handeling
    // useAsync(() => {
    //   throw '42'
    // })

    return {
      computedVal,
      funcValue,
      prefetchValue,
      asyncValue,
      noChange,
    }
  },
})
</script>
