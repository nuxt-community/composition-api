<template>
  <main>TTFB: {{ dataset.ttfb }}ms</main>
</template>

<script>
import {
  defineComponent,
  reactive,
  useFetch,
  onMounted,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const dataset = reactive({
      ttfb: -1,
    })
    useFetch(() => {})

    onMounted(() => {
      const entry = globalThis.performance.getEntriesByType('navigation')[0]
      if (entry instanceof PerformanceNavigationTiming) {
        dataset.ttfb = entry.responseStart
      }
    })

    return {
      dataset,
    }
  },
})
</script>
