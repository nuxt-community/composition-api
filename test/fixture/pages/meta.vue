<template>
  <div>
    <nuxt-link to="/">link back</nuxt-link>
  </div>
</template>

<script>
import { defineComponent, useHead, computed } from 'nuxt-composition-api'

const { head, useMeta } = useHead()

export default defineComponent({
  head,
  setup() {
    const { title } = useMeta()

    title.value = 'newSetTitle'
  },
})
</script>
