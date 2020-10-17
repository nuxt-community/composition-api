<template>
  <main>
    <code> reqRefCounter: {{ reqRefCounter }} </code>
    <code> ssrRefCounter: {{ ssrRefCounter }} </code>
    <code> reqSsrRefCounter: {{ reqSsrRefCounter }} </code>
  </main>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import { reqRefCounter, reqSsrRefCounter, ssrRefCounter } from '../state'

export default defineComponent({
  setup() {
    reqRefCounter.value++
    if (process.server) ssrRefCounter.value++
    if (process.server) reqSsrRefCounter.value++

    return {
      reqRefCounter,
      ssrRefCounter,
      reqSsrRefCounter,
    }
  },
})
</script>
