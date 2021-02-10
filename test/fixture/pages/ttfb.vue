<template>
  <main>TTFB: {{ ttfb }}ms</main>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  useFetch,
  onMounted,
} from '@nuxtjs/composition-api'
import ChildComp from '../components/comp.vue'

import { fetcher } from '../utils'

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
