<template>
  <div>
    <nuxt-link to="/">link back</nuxt-link>
  </div>
</template>

<script>
import { defineComponent, useMeta, computed } from 'nuxt-composition-api'

export default defineComponent({
  head: {},
  setup() {
    const { title } = useMeta()

    title.value = 'newSetTitle'
  },
})
</script>
