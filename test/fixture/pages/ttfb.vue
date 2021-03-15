<template>
  <main>TTFB: {{ ttfb }}ms</main>
</template>

<script>
import {
  defineComponent,
  ref,
  useFetch,
  onMounted,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    useFetch(() => {})

    const ttfb = ref(-1)
    onMounted(() => {
      ttfb.value = globalThis.performance.getEntriesByType(
        'navigation'
      )[0].responseStart
    })

    return {
      ttfb,
    }
  },
})
</script>
