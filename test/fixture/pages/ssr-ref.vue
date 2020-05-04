<template>
  <div>
    <div>ref-{{ computedVal }}</div>
    <div>function-{{ funcValue }}</div>
    <nuxt-link to="/">home</nuxt-link>
  </div>
</template>

<script>
import { defineComponent, ref, computed, useFetch, ssrRef } from '../../..'

export default defineComponent({
  setup() {
    const refValue = ssrRef('')
    const funcValue = ssrRef(() => 'runs SSR or client-side')

    const computedVal = computed(() => refValue.value)

    if (process.server) refValue.value = 'only SSR rendered'

    return {
      computedVal,
      funcValue,
    }
  },
})
</script>
