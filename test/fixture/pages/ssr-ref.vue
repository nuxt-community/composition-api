<template>
  <blockquote>
    <p>
      <code>ref-{{ computedVal }}</code>
    </p>
    <p>
      <code>function-{{ funcValue }}</code>
    </p>
    <p>
      <code>prefetched-{{ prefetchValue }}</code>
    </p>
    <p>
      <code>on: {{ asyncValue }}</code>
    </p>
    <p>
      <code>no-change: {{ noChange }}</code>
    </p>
    <p>
      <code>shallow-{{ shallow.v.deep }}</code>
    </p>
  </blockquote>
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
  shallowSsrRef,
  onMounted,
} from 'nuxt-composition-api'

import { fetcher } from '../utils'

export default defineComponent({
  setup() {
    const refValue = ssrRef('')
    const prefetchValue = ssrRef('')
    const funcValue = ssrRef(() => 'runs SSR or client-side')
    const noChange = ssrRef('initValue')

    const shallow = shallowSsrRef({ v: { deep: 'init' } })
    if (process.server) shallow.value = { v: { deep: 'server' } }
    onMounted(() => {
      shallow.value.v.deep = 'client'
    })

    const computedVal = computed(() => refValue.value)

    if (process.server) refValue.value = 'only SSR rendered'

    onServerPrefetch(async () => {
      prefetchValue.value = await fetcher('result', 500)
    })

    const asyncValue = useAsync(() =>
      fetcher(process.server ? 'server' : 'client', 500)
    )

    return {
      computedVal,
      funcValue,
      prefetchValue,
      asyncValue,
      noChange,
      shallow,
    }
  },
})
</script>
