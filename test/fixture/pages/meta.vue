<template>
  <div>
    <nuxt-link to="/">link back</nuxt-link>
  </div>
</template>

<script>
import { defineComponent, useMeta, computed } from 'nuxt-composition-api'

const { head, getMeta } = useMeta()

export default defineComponent({
  head,
  setup() {
    const { title } = getMeta()

    title.value = 'newSetTitle'
  },
})
</script>
