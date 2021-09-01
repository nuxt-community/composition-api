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
      ttfb: -1
    })
    useFetch(() => {})

    onMounted(() => {
      dataset.ttfb =
        globalThis.performance.getEntriesByType('navigation')[0].responseStart
    })

    return {
      dataset,
    }
  },
})
</script>
