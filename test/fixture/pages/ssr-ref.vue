<template>
  <div>
    <div>name-{{ john }}</div>
    <nuxt-link to="/">home</nuxt-link>
  </div>
</template>

<script>
import { defineComponent, ref, computed, useFetch, ssrRef } from '../../..'

export default defineComponent({
  setup() {
    const name = ssrRef('')

    const john = computed(() => name.value)

    if(process.server) name.value = 'third'

    return {
      john,
    }
  },
})
</script>
